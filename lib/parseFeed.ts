/**
 * Shared RSS feed parser — fetches rss.app directly (open CORS headers)
 * and extracts items from the raw XML using the browser's DOMParser.
 */

export interface FeedItem {
  title: string;
  link: string;
  pubDate: string;
  body: string;
  image: string | null;
}

const FEED_URL = "https://rss.app/feeds/dh4pEwkgk0tRDCjs.xml";

// Unicode bold/italic math chars used by Facebook → plain ASCII
function normalizeTitle(title: string): string {
  const map: Record<number, string> = {};
  "𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭".split("").forEach((c, i) => { map[c.codePointAt(0)!] = String.fromCharCode(65 + i); });
  "𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇".split("").forEach((c, i) => { map[c.codePointAt(0)!] = String.fromCharCode(97 + i); });
  "𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵".split("").forEach((c, i)          => { map[c.codePointAt(0)!] = String.fromCharCode(48 + i); });
  return [...title].map((ch) => map[ch.codePointAt(0)!] ?? ch).join("").trim();
}

function decodeEntities(str: string): string {
  return str.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#039;/g, "'");
}

function extractImage(html: string): string | null {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? decodeEntities(match[1]) : null;
}

function toFb960(url: string): string {
  try {
    const u = new URL(url);
    u.pathname = u.pathname.replace(/\/s\d+x\d+\//g, "/s960x960/");
    if (u.hostname.includes("fbcdn")) ["w", "h"].forEach((p) => u.searchParams.delete(p));
    return u.toString();
  } catch { return url; }
}

function htmlToText(html: string): string {
  return html
    .replace(/<img[^>]*>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export async function fetchFeed(maxItems = 20): Promise<FeedItem[]> {
  const res = await fetch(`${FEED_URL}?_=${Date.now()}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const xml = await res.text();

  const doc = new DOMParser().parseFromString(xml, "text/xml");
  const items = Array.from(doc.querySelectorAll("item")).slice(0, maxItems);

  return items.map((item) => {
    const title   = item.querySelector("title")?.textContent ?? "Untitled";
    const link    = item.querySelector("link")?.textContent ?? "#";
    const pubDate = item.querySelector("pubDate")?.textContent ?? "";

    // Content: prefer content:encoded, fall back to description
    const encoded = item.getElementsByTagNameNS("http://purl.org/rss/1.0/modules/content/", "encoded")[0];
    const rawHtml = encoded?.textContent ?? item.querySelector("description")?.textContent ?? "";

    // Image: prefer media:content url, fall back to first <img> in HTML
    const mediaContent = item.getElementsByTagNameNS("http://search.yahoo.com/mrss/", "content")[0];
    const mediaUrl     = mediaContent?.getAttribute("url") ?? null;
    const rawImage     = mediaUrl ? decodeEntities(mediaUrl) : extractImage(rawHtml);

    return {
      title:   normalizeTitle(title),
      link:    link.trim(),
      pubDate: pubDate.trim(),
      body:    htmlToText(rawHtml),
      image:   rawImage ? toFb960(rawImage) : null,
    };
  });
}
