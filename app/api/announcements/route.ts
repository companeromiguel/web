/**
 * GET /api/announcements
 *
 * Server-side proxy to the Facebook Graph API /{page}/posts endpoint.
 * Uses a Page Access Token stored in environment variables — never exposed to the browser.
 *
 * Required environment variables (in .env.local and Vercel dashboard):
 *   FB_PAGE_ID           — numeric Page ID (107672617284821)
 *   FB_PAGE_ACCESS_TOKEN — Page Access Token from Graph API Explorer
 *   FB_APP_ID            — App ID (for token refresh)
 *   FB_APP_SECRET        — App Secret (for token refresh)
 *
 * Response is cached for 5 minutes.
 */

import { NextResponse } from "next/server";

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
  const pageId    = process.env.FB_PAGE_ID;
  const pageToken = process.env.FB_PAGE_ACCESS_TOKEN;

  if (!pageId || !pageToken) {
    return NextResponse.json([], { status: 200 });
  }

  const fields = "id,message,story,full_picture,permalink_url,created_time";
  const url =
    `https://graph.facebook.com/v21.0/${pageId}/posts` +
    `?fields=${fields}&limit=20&access_token=${pageToken}`;

  try {
    const res = await fetch(url, {
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
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
      },
    });
  } catch (err) {
    console.error("[announcements] fetch failed:", err);
    return NextResponse.json(
      { error: "Failed to reach Facebook Graph API." },
      { status: 502 }
    );
  }
}
