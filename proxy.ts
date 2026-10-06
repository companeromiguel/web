/**
 * Proxy (formerly Middleware) — Rate Limiting for API routes
 *
 * Applies a sliding-window rate limit to all /api/* routes.
 * Uses the request IP address as the identifier.
 *
 * Limits: 30 requests per minute per IP on API routes.
 * Non-API routes pass through without any rate limiting.
 *
 * Note: This uses in-memory storage via a Map. On Vercel, each serverless
 * function instance has its own memory, so limits are per-instance rather
 * than globally shared. For a low-traffic public site this is sufficient.
 * For stricter global limiting, swap the store for Vercel KV + @upstash/ratelimit.
 */

import { NextRequest, NextResponse } from "next/server";

// --- Configuration ---
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 30;      // max requests per window per IP

// --- In-memory store ---
interface RateLimitEntry {
  count: number;
  windowStart: number;
}

const store = new Map<string, RateLimitEntry>();

// Clean up stale entries every 5 minutes to prevent memory leaks
let lastCleanup = Date.now();
function cleanupStore() {
  const now = Date.now();
  if (now - lastCleanup < 5 * 60 * 1000) return;
  lastCleanup = now;
  for (const [key, entry] of store.entries()) {
    if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
      store.delete(key);
    }
  }
}

function getRateLimitHeaders(count: number, remaining: number, resetAt: number) {
  return {
    "X-RateLimit-Limit": String(RATE_LIMIT_MAX_REQUESTS),
    "X-RateLimit-Remaining": String(Math.max(0, remaining)),
    "X-RateLimit-Reset": String(Math.ceil(resetAt / 1000)),
  };
}

export function proxy(request: NextRequest) {
  // Only rate limit API routes
  if (!request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  cleanupStore();

  // Get client IP — Vercel sets x-forwarded-for
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  const now = Date.now();
  const entry = store.get(ip);

  // If no entry or window has expired, start a fresh window
  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    store.set(ip, { count: 1, windowStart: now });
    const headers = getRateLimitHeaders(1, RATE_LIMIT_MAX_REQUESTS - 1, now + RATE_LIMIT_WINDOW_MS);
    const response = NextResponse.next();
    Object.entries(headers).forEach(([k, v]) => response.headers.set(k, v));
    return response;
  }

  // Within the current window — increment
  entry.count += 1;
  store.set(ip, entry);

  const remaining = RATE_LIMIT_MAX_REQUESTS - entry.count;
  const resetAt = entry.windowStart + RATE_LIMIT_WINDOW_MS;
  const headers = getRateLimitHeaders(entry.count, remaining, resetAt);

  if (entry.count > RATE_LIMIT_MAX_REQUESTS) {
    // Too many requests — return 429
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          ...headers,
          "Retry-After": String(Math.ceil((resetAt - now) / 1000)),
        },
      }
    );
  }

  // Within limit — pass through with rate limit headers
  const response = NextResponse.next();
  Object.entries(headers).forEach(([k, v]) => response.headers.set(k, v));
  return response;
}

export const config = {
  // Run proxy on all API routes only
  matcher: "/api/:path*",
};
