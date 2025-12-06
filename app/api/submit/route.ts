import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { submissionRateLimit, getClientIP } from "@/lib/rate-limit";
import { Resend } from "resend";
import { z } from "zod";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// File validation schema
const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const submissionSchema = z.object({
  title: z.string().min(5).max(200),
  description: z.string().min(20).max(5000),
  county: z.string().optional(),
  category: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = getClientIP(request);
    
    if (submissionRateLimit) {
      const { success, limit, remaining, reset } = await submissionRateLimit.limit(ip);

      if (!success) {
        return NextResponse.json(
          {
            error: "Rate limit exceeded",
            message: "You have exceeded the submission limit. Please try again later.",
          },
          {
            status: 429,
            headers: {
              "X-RateLimit-Limit": limit.toString(),
              "X-RateLimit-Remaining": remaining.toString(),
              "X-RateLimit-Reset": new Date(reset).toISOString(),
              "Retry-After": Math.ceil((reset - Date.now()) / 1000).toString(),
            },
          }
        );
      }
    } else {
      // Fallback: Log warning if rate limiting not configured
      console.warn("Rate limiting not configured. Please set up Upstash Redis.");
    }

    const formData = await request.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const county = formData.get("county") as string | null;
    const category = formData.get("category") as string | null;
    const email = formData.get("email") as string | null;

    // Validate input
    const validation = submissionSchema.safeParse({
      title,
      description,
      county: county || undefined,
      category: category || undefined,
      email: email || undefined,
    });

    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.error.errors },
        { status: 400 }
      );
    }

    // Validate and process files
    const files = formData.getAll("files") as File[];
    const fileUrls: string[] = [];

    if (files.length > 0) {
      // Validate file count
      if (files.length > 10) {
        return NextResponse.json(
          { error: "Maximum 10 files allowed per submission" },
          { status: 400 }
        );
      }

      const supabase = await createClient();

      for (const file of files) {
        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
          return NextResponse.json(
            { error: `File ${file.name} exceeds 15MB limit` },
            { status: 400 }
          );
        }

        // Validate file type
        if (!ALLOWED_TYPES.includes(file.type)) {
          return NextResponse.json(
            { error: `File type ${file.type} not allowed` },
            { status: 400 }
          );
        }

        // Generate unique filename
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `submissions/${fileName}`;

        // Convert File to ArrayBuffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload to Supabase Storage (private bucket)
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("submissions")
          .upload(filePath, buffer, {
            contentType: file.type,
            upsert: false,
            cacheControl: "3600",
          });

        if (uploadError) {
          console.error("Upload error:", uploadError);
          return NextResponse.json(
            { error: "Failed to upload file", details: uploadError.message },
            { status: 500 }
          );
        }

        // Get signed URL (30 days expiry)
        const { data: urlData } = await supabase.storage
          .from("submissions")
          .createSignedUrl(filePath, 60 * 60 * 24 * 30);

        if (urlData) {
          fileUrls.push(urlData.signedUrl);
        }
      }
    }

    // Save submission to database
    const supabase = await createClient();
    
    // Find county ID if county name provided
    let countyId = null;
    if (county) {
      const { data: countyData } = await supabase
        .from("counties")
        .select("id")
        .ilike("name", `%${county}%`)
        .single();
      
      if (countyData) {
        countyId = countyData.id;
      }
    }

    const { data: submission, error: dbError } = await supabase
      .from("submissions")
      .insert({
        title: validation.data.title,
        description: validation.data.description,
        county_id: countyId,
        category: validation.data.category || null,
        file_urls: fileUrls.length > 0 ? fileUrls : null,
        submitter_email: validation.data.email || null,
        status: "pending",
        reviewed: false,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        { error: "Failed to save submission", details: dbError.message },
        { status: 500 }
      );
    }

    // Send admin notification email
    if (resend && process.env.ADMIN_EMAIL) {
      try {
        await resend.emails.send({
          from: "People's Auditor <notifications@peoplesauditor.ke>",
          to: process.env.ADMIN_EMAIL,
          subject: `New Evidence Submission: ${validation.data.title.substring(0, 50)}`,
          html: `
            <h2>New Evidence Submission</h2>
            <p><strong>Title:</strong> ${validation.data.title}</p>
            <p><strong>Category:</strong> ${validation.data.category || "N/A"}</p>
            <p><strong>County:</strong> ${validation.data.county || "N/A"}</p>
            <p><strong>Files:</strong> ${fileUrls.length} file(s) uploaded</p>
            <p><strong>Description:</strong></p>
            <p>${validation.data.description}</p>
            <p><a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://peoplesauditor.ke"}/admin/submissions/${submission.id}">Review Submission</a></p>
          `,
        });
      } catch (emailError) {
        // Log but don't fail the submission
        console.error("Email notification failed:", emailError);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Evidence submitted successfully. We will review it anonymously.",
        submissionId: submission.id,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Submission error:", error);
    return NextResponse.json(
      { error: "Internal server error", message: error.message },
      { status: 500 }
    );
  }
}
