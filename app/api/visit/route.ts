/**
 * /api/visit
 *
 * GET  — returns the current total without incrementing (read-only)
 * POST — increments visit:total and returns the new value
 *
 * Deduplication is handled client-side via localStorage (device ID + 24 h
 * timestamp), so the server just trusts the client to only POST when it
 * should. This gives per-device counting without refresh-spamming.
 *
 * Required env vars:
 *   UPSTASH_REDIS_REST_URL
 *   UPSTASH_REDIS_REST_TOKEN
 */

import { NextResponse } from "next/server";

const REDIS_URL   = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const TOTAL_KEY   = "visit:total";

async function redis(command: unknown[]): Promise<unknown> {
  const res = await fetch(REDIS_URL!, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  const json = await res.json() as { result: unknown };
  return json.result;
}

/** GET — read current total, no side effects */
export async function GET() {
  if (!REDIS_URL || !REDIS_TOKEN) {
    return NextResponse.json({ value: 0 });
  }
  try {
    const raw = await redis(["GET", TOTAL_KEY]);
    const value = raw ? parseInt(raw as string, 10) : 0;
    return NextResponse.json({ value }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ value: 0 });
  }
}

/** POST — increment total, return new value */
export async function POST() {
  if (!REDIS_URL || !REDIS_TOKEN) {
    return NextResponse.json({ value: 0 });
  }
  try {
    const value = (await redis(["INCR", TOTAL_KEY])) as number;
    return NextResponse.json({ value }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ value: 0 });
  }
}
