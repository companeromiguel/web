"use client";

import { useEffect, useState } from "react";
import { fetchFeed, type FeedItem } from "@/lib/parseFeed";

function formatDate(dateStr: string): string {
  try { return new Date(dateStr).toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" }); }
  catch { return dateStr; }
}
function formatDateIso(dateStr: string): string {
  try { return new Date(dateStr).toISOString().split("T")[0]; } catch { return ""; }
}

export default function AllAnnouncementsFeed() {
  const [items, setItems]   = useState<FeedItem[]>([]);
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");

  useEffect(() => {
    fetchFeed(20)
      .then((data) => { setItems(data); setStatus("ok"); })
      .catch(() => setStatus("error"));
  }, []);

  /* ── Loading skeleton ── */
  if (status === "loading") {
    return (
      <div className="space-y-6 animate-pulse">
        {[1, 2, 3, 4, 5].map((n) => (
          <div key={n} className="flex gap-5 rounded-2xl border border-[#E8EEF2] overflow-hidden bg-white p-4">
            <div className="shrink-0 w-28 h-28 sm:w-36 sm:h-36 rounded-xl bg-[#E8EEF2]" />
            <div className="flex-1 space-y-2 py-1">
              <div className="h-2.5 bg-[#E8EEF2] rounded w-1/4" />
              <div className="h-4 bg-[#E8EEF2] rounded w-3/4" />
              <div className="h-3 bg-[#E8EEF2] rounded w-full" />
              <div className="h-3 bg-[#E8EEF2] rounded w-5/6" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  /* ── Error state ── */
  if (status === "error") {
    return (
      <div className="rounded-2xl border border-[#E8EEF2] bg-white px-6 py-10 text-center">
        <p className="text-sm text-[#2A2A29]/50 mb-3">Unable to load announcements right now.</p>
        <a href="https://www.facebook.com/tmcwdCMUHelpDesk" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#0591D4] hover:underline">
          View on Facebook →
        </a>
      </div>
    );
  }

  /* ── Full feed list ── */
  return (
    <div className="space-y-5">
      {items.map((item) => (
        <a
          key={item.link}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col sm:flex-row gap-0 rounded-2xl border border-[#E8EEF2] hover:border-[#A1CBE1] hover:shadow-md transition-all duration-200 bg-white overflow-hidden"
        >
          {item.image ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={item.image} alt="" aria-hidden="true" width={960} height={960}
              className="sm:w-52 sm:h-52 w-full h-56 object-cover shrink-0" />
          ) : (
            <div className="sm:w-52 sm:h-52 w-full h-40 bg-[#DEEEFA] flex items-center justify-center shrink-0">
              <svg className="size-10 text-[#A1CBE1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5" />
              </svg>
            </div>
          )}
          <div className="flex flex-col flex-1 p-5 gap-2 min-w-0">
            <time className="text-[11px] text-[#2A2A29]/35 tabular-nums" dateTime={formatDateIso(item.pubDate)}>
              {formatDate(item.pubDate)}
            </time>
            <p className="font-heading text-base font-semibold text-[#370A77] group-hover:text-[#0591D4] transition-colors leading-snug line-clamp-2">
              {item.title}
            </p>
            {item.body && (
              <p className="text-sm text-[#2A2A29]/60 leading-relaxed line-clamp-3">
                {item.body}
              </p>
            )}
            <span className="mt-auto text-xs font-medium text-[#0591D4] group-hover:underline">
              Read on Facebook →
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}
