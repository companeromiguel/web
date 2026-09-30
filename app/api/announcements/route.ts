/**
 * GET /api/announcements
 *
 * Server-side proxy to the Facebook Graph API /{page}/posts endpoint.
 * Credentials (App ID + Secret) stay on the server — never exposed to the browser.
 *
 * Required Vercel environment variables:
 *   FACEBOOK_APP_ID      — from developers.facebook.com → Your App → Settings → Basic
 *   FACEBOOK_APP_SECRET  — same location as above
 *   FACEBOOK_PAGE_ID     — numeric Page ID or vanity name, e.g. "tmcwdCMUHelpDesk"
 *
 * The response is cached for 5 minutes (revalidate: 300) by Vercel's CDN,
 * so the Graph API is not hammered on every page load.
 */

import { NextResponse } from "next/server";

// Shape returned by the Graph API for each post
interface GraphPost {
  id: string;
  message?: string;
  story?: string;
  full_picture?: string;
  permalink_url: string;
  created_time: string;
}

interface GraphResponse {
  data: GraphPost[];
  error?: { message: string; code: number };
}

export async function GET() {
  const { FACEBOOK_APP_ID, FACEBOOK_APP_SECRET, FACEBOOK_PAGE_ID } = process.env;

  if (!FACEBOOK_APP_ID || !FACEBOOK_APP_SECRET || !FACEBOOK_PAGE_ID) {
    return NextResponse.json(
      { error: "Missing Facebook credentials in environment variables." },
      { status: 500 }
    );
  }

  // App Access Token — format: {app_id}|{app_secret}
  // This is safe to use server-side; it never reaches the browser.
  const token = `${FACEBOOK_APP_ID}|${FACEBOOK_APP_SECRET}`;
  const fields = "id,message,story,full_picture,permalink_url,created_time";
  const url =
    `https://graph.facebook.com/v20.0/${FACEBOOK_PAGE_ID}/posts` +
    `?fields=${fields}&limit=20&access_token=${token}`;

  try {
    const res = await fetch(url, {
      // Cache the Graph API response for 5 minutes on Vercel's CDN edge
      next: { revalidate: 300 },
    });

    const json: GraphResponse = await res.json();

    if (!res.ok || json.error) {
      console.error("[announcements] Graph API error:", json.error);
      return NextResponse.json(
        { error: json.error?.message ?? `HTTP ${res.status}` },
        { status: 502 }
      );
    }

    return NextResponse.json(json.data ?? [], {
      headers: {
        // Allow the client-side fetch in the browser to receive this response
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
      },
    });
  } catch (err) {
    console.error("[announcements] fetch failed:", err);
    return NextResponse.json({ error: "Failed to reach Facebook Graph API." }, { status: 502 });
  }
}
