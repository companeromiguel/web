"use client";

import { useEffect, useState } from "react";

const FEED_URL = "https://rss.app/feeds/dh4pEwkgk0tRDCjs.xml";
/*
 * rss2json converts any RSS/Atom feed to JSON and serves it with open
 * CORS headers — works from any device/origin without a proxy.
 */
const API_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(FEED_URL)}`;
const MAX_ITEMS = 4;

// Unicode bold/italic math chars used by Facebook → plain ASCII
function normalizeTitle(title: string): string {
  const map: Record<number, string> = {};
  "𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭".split("").forEach((c, i) => {
    map[c.codePointAt(0)!] = String.fromCharCode(65 + i);
  });
  "𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇".split("").forEach((c, i) => {
    map[c.codePointAt(0)!] = String.fromCharCode(97 + i);
  });
  "𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵".split("").forEach((c, i) => {
    map[c.codePointAt(0)!] = String.fromCharCode(48 + i);
  });
  return [...title].map((ch) => map[ch.codePointAt(0)!] ?? ch).join("").trim();
}

// Decode HTML entities in URLs (e.g. &amp; → &)
function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
}

// Extract the first <img src="..."> from HTML
function extractImage(html: string): string | null {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? decodeHtmlEntities(match[1]) : null;
}

// Upgrade Facebook CDN image to 960×960
function toFb960(url: string): string {
  try {
    const u = new URL(url);
    u.pathname = u.pathname.replace(/\/s\d+x\d+\//g, "/s960x960/");
    if (u.hostname.includes("fbcdn")) {
      ["w", "h"].forEach((p) => u.searchParams.delete(p));
    }
    return u.toString();
  } catch {
    return url;
  }
}

// Strip HTML to plain text
function htmlToText(html: string): string {
  return html
    .replace(/<img[^>]*>/gi, "")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("en-PH", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function formatDateIso(dateStr: string): string {
  try {
    return new Date(dateStr).toISOString().split("T")[0];
  } catch {
    return "";
  }
}

interface FeedItem {
  title: string;
  link: string;
  pubDate: string;
  snippet: string;
  image: string | null;
}

// rss2json response shape
interface Rss2JsonItem {
  title?: string;
  link?: string;
  pubDate?: string;
  content?: string;
  description?: string;
  thumbnail?: string;
  enclosure?: { link?: string; type?: string };
}

interface Rss2JsonResponse {
  status: string;
  items: Rss2JsonItem[];
}

export default function AnnouncementsFeed() {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data: Rss2JsonResponse) => {
        if (data.status !== "ok") throw new Error("Feed error");

        const parsed: FeedItem[] = data.items.slice(0, MAX_ITEMS).map((item) => {
          const rawHtml = item.content ?? item.description ?? "";

          // Image priority: enclosure → thumbnail → first <img> in HTML
          // Decode HTML entities (&amp; → &) since rss2json encodes URLs
          const rawImage =
            (item.enclosure?.type?.startsWith("image/") && item.enclosure.link
              ? decodeHtmlEntities(item.enclosure.link)
              : null) ||
            (item.thumbnail ? decodeHtmlEntities(item.thumbnail) : null) ||
            extractImage(rawHtml) ||
            null;

          const image = rawImage ? toFb960(rawImage) : null;
          const plainText = htmlToText(rawHtml);
          const snippet = plainText.slice(0, 160);

          return {
            title: normalizeTitle(item.title ?? "Untitled"),
            link: item.link ?? "#",
            pubDate: item.pubDate ?? "",
            snippet: snippet + (plainText.length > 160 ? "…" : ""),
            image,
          };
        });

        setItems(parsed);
        setStatus("ok");
      })
      .catch(() => setStatus("error"));
  }, []);

  /* ── Loading skeleton ── */
  if (status === "loading") {
    return (
      /* Mobile: horizontal snap scroll — same structure as the real cards */
      <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5 overflow-x-auto snap-x snap-mandatory pb-3 sm:pb-0 sm:overflow-visible animate-pulse">
        {[1, 2, 3, 4].map((n) => (
          <div
            key={n}
            className="rounded-xl overflow-hidden border border-[#E8EEF2] shrink-0 w-[75vw] sm:w-auto snap-start"
          >
            <div className="bg-[#E8EEF2] aspect-square w-full" />
            <div className="p-4 space-y-2">
              <div className="h-2.5 bg-[#E8EEF2] rounded w-1/3" />
              <div className="h-3 bg-[#E8EEF2] rounded w-full" />
              <div className="h-3 bg-[#E8EEF2] rounded w-4/5" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  /* ── Error state ── */
  if (status === "error") {
    return (
      <p className="py-6 text-sm text-[#2A2A29]/40">
        Unable to load announcements right now.{" "}
        <a
          href="https://www.facebook.com/tmcwdCMUHelpDesk"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#0591D4] hover:underline"
        >
          View on Facebook →
        </a>
      </p>
    );
  }

  /* ── Card grid / carousel ── */
  return (
    /*
     * Mobile  : horizontal snap carousel — cards are 75vw wide, peek the
     *           next card to hint that more exist. Negative mx pulls the
     *           scroll track to full bleed, px restores the inner padding.
     * sm+     : regular 2-col grid
     * lg+     : 4-col grid
     */
    <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5 overflow-x-auto snap-x snap-mandatory pb-3 sm:pb-0 sm:overflow-visible -mx-4 px-4 sm:mx-0 sm:px-0">
      {items.map((item) => (
        <a
          key={item.link}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col rounded-xl overflow-hidden border border-[#E8EEF2] hover:border-[#A1CBE1] hover:shadow-md transition-all duration-200 bg-white shrink-0 w-[75vw] sm:w-auto snap-start"
        >
          {/* Image — full natural dimensions */}
          {item.image ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={item.image}
              alt=""
              aria-hidden="true"
              width={960}
              height={960}
              className="w-full h-auto block"
            />
          ) : (
            <div className="w-full aspect-square bg-[#DEEEFA] flex items-center justify-center shrink-0">
              <svg className="size-10 text-[#A1CBE1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5" />
              </svg>
            </div>
          )}

          {/* Text */}
          <div className="flex flex-col flex-1 p-4 gap-2">
            <time
              className="text-[11px] text-[#2A2A29]/35 tabular-nums"
              dateTime={formatDateIso(item.pubDate)}
            >
              {formatDate(item.pubDate)}
            </time>
            <p className="text-sm font-medium text-[#2A2A29] group-hover:text-[#0591D4] transition-colors leading-snug line-clamp-2">
              {item.title}
            </p>
            {item.snippet && (
              <p className="text-xs text-[#2A2A29]/55 leading-relaxed line-clamp-3 mt-auto">
                {item.snippet}
              </p>
            )}
          </div>
        </a>
      ))}
    </div>
  );
}
