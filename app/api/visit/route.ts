/**
 * GET /api/visit
 *
 * IP-based unique visit counter backed by Upstash Redis.
 *
 * Algorithm:
 *  1. Extract the visitor IP from request headers (Vercel sets x-forwarded-for).
 *  2. Hash the IP with SHA-256 — raw IPs are never stored.
 *  3. Check Redis for key `visit:ip:<hash>`.
 *     - If it exists → this IP already counted in the last 24 h → return total only.
 *     - If not → set the key with 86400 s TTL, increment `visit:total`.
 *  4. Return { value: <total>, counted: <boolean> }.
 *
 * Falls back gracefully if Redis is unreachable — returns { value: 0 }.
 *
 * Required environment variables:
 *   UPSTASH_REDIS_REST_URL
 *   UPSTASH_REDIS_REST_TOKEN
 */

import { NextRequest, NextResponse } from "next/server";

const REDIS_URL   = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const TOTAL_KEY   = "visit:total";
const IP_TTL      = 86400; // 24 hours in seconds

/** SHA-256 hash of the IP — keeps raw IPs out of Redis. */
async function hashIp(ip: string): Promise<string> {
  const data    = new TextEncoder().encode(ip);
  const hashBuf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Single Upstash REST call. */
async function redis(command: unknown[]): Promise<unknown> {
  const res = await fetch(`${REDIS_URL}`, {
    method:  "POST",
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
  });
  const json = await res.json() as { result: unknown };
  return json.result;
}

/** Extract the real client IP from Vercel / standard proxy headers. */
function getIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

export async function GET(req: NextRequest) {
  if (!REDIS_URL || !REDIS_TOKEN) {
    return NextResponse.json({ value: 0 }, { status: 200 });
  }

  try {
    const ip   = getIp(req);
    const hash = await hashIp(ip);
    const ipKey = `visit:ip:${hash}`;

    // SET NX (only set if not exists) with TTL — returns "OK" if set, null if already existed
    const setResult = await redis(["SET", ipKey, "1", "EX", IP_TTL, "NX"]);
    const isNew     = setResult === "OK";

    let total: number;

    if (isNew) {
      // New unique visitor — increment total
      total = (await redis(["INCR", TOTAL_KEY])) as number;
    } else {
      // Already counted — just read the total
      const raw = await redis(["GET", TOTAL_KEY]);
      total = raw ? parseInt(raw as string, 10) : 0;
    }

    return NextResponse.json(
      { value: total, counted: isNew },
      {
        status: 200,
        headers: {
          // Don't cache at CDN — each visitor needs a fresh check
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (err) {
    console.error("[visit] Redis error:", err);
    return NextResponse.json({ value: 0 }, { status: 200 });
  }
}
