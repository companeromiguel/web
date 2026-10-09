/**
 * GET /api/announcements
 *
 * Server-side proxy to the Facebook Graph API /{page}/posts endpoint.
 * Automatically refreshes the Page Access Token using the App ID + Secret
 * so you never have to manually regenerate it.
 *
 * Required environment variables (in .env.local and Vercel dashboard):
 *   FB_PAGE_ID           — numeric Page ID (107672617284821)
 *   FB_PAGE_ACCESS_TOKEN — Page Access Token from Graph API Explorer
 *   FB_APP_ID            — App ID
 *   FB_APP_SECRET        — App Secret
 *
 * Token refresh flow:
 *   1. Try fetching posts with the current token
 *   2. If token is expired (code 190), exchange it for a fresh long-lived token
 *   3. Store the new token in memory for subsequent requests
 *   4. Retry the posts fetch with the new token
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
  data?: GraphPost[];
  error?: { message: string; code: number; error_subcode?: number };
}

interface TokenResponse {
  access_token?: string;
  error?: { message: string };
}

// In-memory token cache — persists across requests within the same serverless instance
let cachedToken: string | null = null;
let cachedTokenExpiry: number  = 0; // unix ms

/**
 * Exchange any token for a long-lived Page Access Token (valid ~60 days).
 * Then derive the Page token from the long-lived user token.
 */
async function refreshPageToken(
  appId: string,
  appSecret: string,
  pageId: string,
  currentToken: string
): Promise<string | null> {
  try {
    // Step 1: Exchange for long-lived user token
    const llRes = await fetch(
      `https://graph.facebook.com/v21.0/oauth/access_token` +
      `?grant_type=fb_exchange_token` +
      `&client_id=${appId}` +
      `&client_secret=${appSecret}` +
      `&fb_exchange_token=${currentToken}`
    );
    const llJson: TokenResponse = await llRes.json();

    if (!llRes.ok || !llJson.access_token) {
      console.error("[announcements] Failed to get long-lived token:", llJson.error);
      return null;
    }

    const longLivedUserToken = llJson.access_token;

    // Step 2: Use the long-lived user token to get a Page Access Token
    const pageRes = await fetch(
      `https://graph.facebook.com/v21.0/${pageId}` +
      `?fields=access_token` +
      `&access_token=${longLivedUserToken}`
    );
    const pageJson: { access_token?: string; error?: { message: string } } = await pageRes.json();

    if (!pageRes.ok || !pageJson.access_token) {
      console.error("[announcements] Failed to get page token:", pageJson.error);
      return null;
    }

    console.log("[announcements] Token refreshed successfully");
    return pageJson.access_token;
  } catch (err) {
    console.error("[announcements] Token refresh failed:", err);
    return null;
  }
}

async function fetchPosts(token: string, pageId: string): Promise<GraphResponse> {
  const fields = "id,message,story,full_picture,permalink_url,created_time";
  const url =
    `https://graph.facebook.com/v21.0/${pageId}/posts` +
    `?fields=${fields}&limit=20&access_token=${token}`;

  const res = await fetch(url, { next: { revalidate: 300 } });
  return res.json();
}

export async function GET() {
  const pageId    = process.env.FB_PAGE_ID;
  const appId     = process.env.FB_APP_ID;
  const appSecret = process.env.FB_APP_SECRET;
  const envToken  = process.env.FB_PAGE_ACCESS_TOKEN;

  if (!pageId || !appId || !appSecret || !envToken) {
    return NextResponse.json([], { status: 200 });
  }

  // Use cached token if still valid (refresh 5 days before expiry)
  const now = Date.now();
  let token = (cachedToken && cachedTokenExpiry - now > 5 * 24 * 60 * 60 * 1000)
    ? cachedToken
    : envToken;

  try {
    let json = await fetchPosts(token, pageId);

    // Token expired — try to refresh automatically
    if (json.error && (json.error.code === 190 || json.error.code === 102)) {
      console.log("[announcements] Token expired, refreshing...");

      const newToken = await refreshPageToken(appId, appSecret, pageId, envToken);

      if (newToken) {
        // Cache the new token for ~55 days
        cachedToken       = newToken;
        cachedTokenExpiry = now + 55 * 24 * 60 * 60 * 1000;

        // Retry with new token
        json = await fetchPosts(newToken, pageId);
      }
    }

    if (json.error) {
      console.error("[announcements] Graph API error:", json.error);
      return NextResponse.json(
        { error: json.error.message },
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
