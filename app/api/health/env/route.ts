import { NextResponse } from "next/server";
import { checkEnvironmentVariables } from "@/lib/env-check";

/**
 * Environment variables diagnostic endpoint
 * GET /api/health/env
 * 
 * Use this to check if all required environment variables are set
 * Safe to expose as it only shows variable names, not full values
 */
export async function GET() {
  try {
    const result = checkEnvironmentVariables();

    return NextResponse.json(
      {
        status: result.allSet ? "ok" : "error",
        timestamp: new Date().toISOString(),
        variables: result.checks.map((check) => ({
          name: check.name,
          isSet: check.isSet,
          required: check.required,
          // Don't expose full values for security
          valuePreview: check.isSet
            ? `${check.value?.substring(0, 10)}...`
            : undefined,
        })),
        errors: result.errors,
        recommendations: [
          result.allSet
            ? "All required variables are set!"
            : "Please check your .env.local file",
          "Make sure to restart your dev server after changing .env.local",
          "Variables starting with NEXT_PUBLIC_ are exposed to the browser",
        ],
      },
      {
        status: result.allSet ? 200 : 500,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

