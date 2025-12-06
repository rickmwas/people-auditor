/**
 * Environment Variable Diagnostics
 * Use this to check if all required environment variables are set
 */

export interface EnvCheckResult {
  name: string;
  isSet: boolean;
  value: string | undefined;
  required: boolean;
  error?: string;
}

export function checkEnvironmentVariables(): {
  allSet: boolean;
  checks: EnvCheckResult[];
  errors: string[];
} {
  const checks: EnvCheckResult[] = [];
  const errors: string[] = [];

  // Required variables
  const requiredVars = [
    {
      name: "NEXT_PUBLIC_SUPABASE_URL",
      required: true,
      description: "Supabase project URL",
    },
    {
      name: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
      required: true,
      description: "Supabase anonymous key",
    },
    {
      name: "SUPABASE_SERVICE_ROLE_KEY",
      required: true,
      description: "Supabase service role key (server-side only)",
    },
  ];

  // Optional but recommended
  const optionalVars = [
    {
      name: "UPSTASH_REDIS_REST_URL",
      required: false,
      description: "Upstash Redis URL (or use KV_REST_API_URL)",
    },
    {
      name: "UPSTASH_REDIS_REST_TOKEN",
      required: false,
      description: "Upstash Redis token (or use KV_REST_API_TOKEN)",
    },
    {
      name: "KV_REST_API_URL",
      required: false,
      description: "Vercel KV URL (alternative to Upstash)",
    },
    {
      name: "KV_REST_API_TOKEN",
      required: false,
      description: "Vercel KV token (alternative to Upstash)",
    },
    {
      name: "RESEND_API_KEY",
      required: false,
      description: "Resend API key for email notifications",
    },
    {
      name: "ADMIN_EMAIL",
      required: false,
      description: "Admin email for notifications",
    },
    {
      name: "NEXT_PUBLIC_UMAMI_WEBSITE_ID",
      required: false,
      description: "Umami analytics website ID",
    },
    {
      name: "NEXT_PUBLIC_SITE_URL",
      required: false,
      description: "Site URL for production",
    },
  ];

  // Check required variables
  for (const varDef of requiredVars) {
    const value = process.env[varDef.name];
    const isSet = !!value && value.trim() !== "";

    if (!isSet && varDef.required) {
      errors.push(`Missing required variable: ${varDef.name}`);
    }

    checks.push({
      name: varDef.name,
      isSet,
      value: isSet ? (value.length > 20 ? `${value.substring(0, 20)}...` : value) : undefined,
      required: varDef.required,
      error: !isSet && varDef.required ? `Required but not set` : undefined,
    });
  }

  // Check optional variables
  for (const varDef of optionalVars) {
    const value = process.env[varDef.name];
    const isSet = !!value && value.trim() !== "";

    checks.push({
      name: varDef.name,
      isSet,
      value: isSet ? (value.length > 20 ? `${value.substring(0, 20)}...` : value) : undefined,
      required: varDef.required,
    });
  }

  // Validate format
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (supabaseUrl && !supabaseUrl.startsWith("https://") && !supabaseUrl.startsWith("http://")) {
    errors.push("NEXT_PUBLIC_SUPABASE_URL should start with https://");
  }

  if (supabaseUrl && !supabaseUrl.includes(".supabase.co")) {
    errors.push("NEXT_PUBLIC_SUPABASE_URL should be a valid Supabase URL (containing .supabase.co)");
  }

  // Check rate limiting setup
  const hasUpstash = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN;
  const hasVercelKV = process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN;

  if (!hasUpstash && !hasVercelKV) {
    errors.push(
      "Warning: No rate limiting configured. Set up either Upstash Redis (UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN) or Vercel KV (KV_REST_API_URL + KV_REST_API_TOKEN)"
    );
  }

  return {
    allSet: errors.length === 0,
    checks,
    errors,
  };
}

/**
 * Print environment variable status to console
 */
export function printEnvStatus() {
  const result = checkEnvironmentVariables();

  console.log("\n=== Environment Variables Status ===\n");

  result.checks.forEach((check) => {
    const status = check.isSet ? "✅" : check.required ? "❌" : "⚠️";
    const label = check.required ? "[REQUIRED]" : "[OPTIONAL]";
    console.log(`${status} ${check.name} ${label}`);
    if (check.value) {
      console.log(`   Value: ${check.value}`);
    }
    if (check.error) {
      console.log(`   Error: ${check.error}`);
    }
  });

  if (result.errors.length > 0) {
    console.log("\n❌ Errors found:\n");
    result.errors.forEach((error) => {
      console.log(`   - ${error}`);
    });
  } else {
    console.log("\n✅ All required variables are set!\n");
  }

  return result;
}

