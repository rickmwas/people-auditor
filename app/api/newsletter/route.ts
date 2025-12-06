import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { newsletterRateLimit, getClientIP } from "@/lib/rate-limit";
import { z } from "zod";

const newsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = getClientIP(request);
    
    if (newsletterRateLimit) {
      const { success, limit, remaining, reset } = await newsletterRateLimit.limit(ip);

      if (!success) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded",
          message: "Too many subscription attempts. Please try again later.",
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
    }

    const body = await request.json();
    
    // Validate input
    const validation = newsletterSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.error.errors },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Insert subscriber
    const { error } = await supabase.from("subscribers").insert({
      email: validation.data.email,
      name: validation.data.name || null,
      verified: false,
    });

    if (error) {
      // If email already exists, that's okay
      if (error.code === "23505") {
        return NextResponse.json(
          { message: "Already subscribed" },
          {
            status: 200,
            headers: {
              "X-RateLimit-Limit": limit.toString(),
              "X-RateLimit-Remaining": remaining.toString(),
            },
          }
        );
      }
      throw error;
    }

    // In production, send verification email via Resend here

    return NextResponse.json(
      { message: "Successfully subscribed" },
      {
        status: 200,
        headers: {
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
        },
      }
    );
  } catch (error: any) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}
