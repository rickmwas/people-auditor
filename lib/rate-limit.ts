import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Create Redis client (uses Vercel KV or Upstash Redis)
// Fallback to in-memory if Redis not configured (for development)
const redisUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

const redis = redisUrl && redisToken
  ? new Redis({
      url: redisUrl,
      token: redisToken,
    })
  : null;

// Rate limiter for submissions: 5 per hour per IP
export const submissionRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "1 h"),
      analytics: true,
      prefix: "@peoples-auditor/submissions",
    })
  : null;

// Rate limiter for newsletter: 3 per hour per IP
export const newsletterRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(3, "1 h"),
      analytics: true,
      prefix: "@peoples-auditor/newsletter",
    })
  : null;

// Rate limiter for general forms: 10 per minute per IP
export const formRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, "1 m"),
      analytics: true,
      prefix: "@peoples-auditor/forms",
    })
  : null;

// Get client IP address
export function getClientIP(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  const cfConnectingIP = request.headers.get("cf-connecting-ip");

  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  if (realIP) {
    return realIP;
  }
  if (cfConnectingIP) {
    return cfConnectingIP;
  }
  return "unknown";
}

