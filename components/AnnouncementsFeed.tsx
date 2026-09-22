"use client";

import { useEffect, useState } from "react";
import { fetchFeed, type FeedItem } from "@/lib/parseFeed";

function formatDate(dateStr: string): string {
  try { return new Date(dateStr).toLocaleDateString("en-PH", { year: "numeric", month: "short", day: "numeric" }); }
  catch { return dateStr; }
}
function formatDateIso(dateStr: string): string {
  try { return new Date(dateStr).toISOString().split("T")[0]; } catch { return ""; }
}

export default function AnnouncementsFeed() {
  const [items, setItems]   = useState<FeedItem[]>([]);
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");

  useEffect(() => {
    fetchFeed(4)
      .then((data) => { setItems(data); setStatus("ok"); })
      .catch(() => setStatus("error"));
  }, []);

  /* ── Loading skeleton ── */
  if (status === "loading") {
    return (
      <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5 overflow-x-auto snap-x snap-mandatory pb-3 sm:pb-0 sm:overflow-visible -mx-4 px-4 sm:mx-0 sm:px-0 animate-pulse">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="rounded-xl overflow-hidden border border-[#E8EEF2] shrink-0 w-[75vw] sm:w-auto snap-start">
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
        <a href="https://www.facebook.com/tmcwdCMUHelpDesk" target="_blank" rel="noopener noreferrer" className="text-[#0591D4] hover:underline">
          View on Facebook →
        </a>
      </p>
    );
  }

  /* ── Card carousel / grid ── */
  return (
    <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5 overflow-x-auto snap-x snap-mandatory pb-3 sm:pb-0 sm:overflow-visible -mx-4 px-4 sm:mx-0 sm:px-0">
      {items.map((item) => (
        <a
          key={item.link}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col rounded-xl overflow-hidden border border-[#E8EEF2] hover:border-[#A1CBE1] hover:shadow-md transition-all duration-200 bg-white shrink-0 w-[75vw] sm:w-auto snap-start"
        >
          {item.image ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={item.image} alt="" aria-hidden="true" width={960} height={960} className="w-full h-auto block" />
          ) : (
            <div className="w-full aspect-square bg-[#DEEEFA] flex items-center justify-center shrink-0">
              <svg className="size-10 text-[#A1CBE1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5" />
              </svg>
            </div>
          )}
          <div className="flex flex-col flex-1 p-4 gap-2">
            <time className="text-[11px] text-[#2A2A29]/35 tabular-nums" dateTime={formatDateIso(item.pubDate)}>
              {formatDate(item.pubDate)}
            </time>
            <p className="text-sm font-medium text-[#2A2A29] group-hover:text-[#0591D4] transition-colors leading-snug line-clamp-2">
              {item.title}
            </p>
            {item.body && (
              <p className="text-xs text-[#2A2A29]/55 leading-relaxed line-clamp-3 mt-auto">
                {item.body}
              </p>
            )}
          </div>
        </a>
      ))}
    </div>
  );
}
