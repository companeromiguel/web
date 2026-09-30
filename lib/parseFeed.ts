/**
 * Announcement feed client — fetches from our own /api/announcements proxy,
 * which calls the Facebook Graph API server-side (credentials never hit the browser).
 *
 * The FeedItem interface is kept identical to the old RSS version so that
 * AnnouncementsFeed.tsx and AllAnnouncementsFeed.tsx need no changes.
 */

export interface FeedItem {
  title: string;
  link: string;
  pubDate: string;
  body: string;
  image: string | null;
}

// Shape returned by /api/announcements (mirrors Graph API post fields)
interface GraphPost {
  id: string;
  message?: string;
  story?: string;
  full_picture?: string;
  permalink_url: string;
  created_time: string;
}

// Unicode bold/italic math chars used by Facebook → plain ASCII
function normalizeText(text: string): string {
  const map: Record<number, string> = {};
  "𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭".split("").forEach((c, i) => { map[c.codePointAt(0)!] = String.fromCharCode(65 + i); });
  "𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇".split("").forEach((c, i) => { map[c.codePointAt(0)!] = String.fromCharCode(97 + i); });
  "𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵".split("").forEach((c, i)          => { map[c.codePointAt(0)!] = String.fromCharCode(48 + i); });
  return [...text].map((ch) => map[ch.codePointAt(0)!] ?? ch).join("").trim();
}

/**
 * Derive a short title from a Facebook post's message.
 * Takes the first non-empty line, capped at 120 characters.
 */
function titleFromMessage(message: string): string {
  const firstLine = message.split("\n").find((l) => l.trim().length > 0) ?? message;
  const normalized = normalizeText(firstLine.trim());
  return normalized.length > 120 ? normalized.slice(0, 117) + "…" : normalized;
}

export async function fetchFeed(maxItems = 20): Promise<FeedItem[]> {
  // In the browser this hits our Next.js API route (relative URL works fine).
  // During SSR/RSC it would need an absolute URL, but both consuming components
  // are "use client" + useEffect, so this always runs in the browser.
  const res = await fetch("/api/announcements", { cache: "no-store" });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const posts: GraphPost[] = await res.json();

  // If the API returned an error object instead of an array, throw so the
  // component falls into its error state gracefully.
  if (!Array.isArray(posts)) throw new Error("Unexpected response from /api/announcements");

  return posts.slice(0, maxItems).map((post): FeedItem => {
    const message = post.message ?? "";
    const title   = message
      ? titleFromMessage(message)
      : normalizeText(post.story ?? "Facebook Post");

    return {
      title,
      link:    post.permalink_url,
      pubDate: post.created_time,         // ISO 8601 — Date constructor handles it fine
      body:    normalizeText(message),
      image:   post.full_picture ?? null,
    };
  });
}
