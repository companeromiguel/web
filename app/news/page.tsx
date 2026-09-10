import type { Metadata } from "next";
import PageHeader, { Breadcrumb } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "News & Announcements",
  description:
    "Official announcements, service advisories, and news from the Trece Martires City Water District.",
};

interface Post {
  slug: string;
  date: string;
  dateISO: string;
  category: "Advisory" | "News" | "Notice";
  headline: string;
  summary: string;
}

const posts: Post[] = [
  {
    slug:    "placeholder-1",
    date:    "[Month DD, YYYY]",
    dateISO: "2026-01-01",
    category: "Advisory",
    headline: "[ADD: Service advisory headline]",
    summary:  "[ADD: One or two sentences — area affected, duration, reason.]",
  },
  {
    slug:    "placeholder-2",
    date:    "[Month DD, YYYY]",
    dateISO: "2026-01-01",
    category: "News",
    headline: "[ADD: News headline]",
    summary:  "[ADD: Brief summary of the announcement.]",
  },
  {
    slug:    "placeholder-3",
    date:    "[Month DD, YYYY]",
    dateISO: "2026-01-01",
    category: "Notice",
    headline: "[ADD: Public notice headline]",
    summary:  "[ADD: Brief summary.]",
  },
];

const categoryStyle: Record<Post["category"], string> = {
  Advisory: "text-[#2A2A29] bg-[#D7CCCD]",
  News:     "text-[#370A77] bg-[#DEEEFA]",
  Notice:   "text-amber-800 bg-amber-50",
};

export default function NewsPage() {
  return (
    <>
      <PageHeader
        title="News & Announcements"
        description="Official service advisories, public notices, and updates from the Trece Martires City Water District."
      >
        <Breadcrumb current="News & Announcements" />
      </PageHeader>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {posts.length === 0 ? (
          <p className="text-sm text-[#2A2A29]/50 bg-[#F7FAFB] border-l-2 border-[#A1CBE1] px-5 py-4">
            No announcements at this time.
          </p>
        ) : (
          <ol className="divide-y divide-[#E8EEF2] list-none p-0" aria-label="Announcements">
            {posts.map((post) => (
              <li
                key={post.slug}
                className="flex flex-col sm:flex-row gap-4 sm:gap-10 py-7"
              >
                {/* Date + category */}
                <div className="sm:w-36 shrink-0 flex sm:flex-col gap-3 sm:gap-1.5 items-start">
                  <time dateTime={post.dateISO} className="text-xs text-[#2A2A29]/40 tabular-nums">
                    {post.date}
                  </time>
                  <span className={[
                    "text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5",
                    categoryStyle[post.category],
                  ].join(" ")}>
                    {post.category}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <p className="font-heading text-base font-semibold text-[#2A2A29] leading-snug">
                    {/* Wrap in <Link href={`/news/${post.slug}/`}> once post pages are built */}
                    {post.headline}
                  </p>
                  <p className="mt-1.5 text-sm text-[#2A2A29]/60 leading-relaxed">
                    {post.summary}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        )}

        <p className="mt-12 text-xs text-[#2A2A29]/35">
          For urgent service inquiries, call{" "}
          <a href="tel:+63464191234" className="text-[#0591D4] hover:underline">(046) 419-1234</a>
          {" "}or email{" "}
          <a href="mailto:info@tmcwd.gov.ph" className="text-[#0591D4] hover:underline">info@tmcwd.gov.ph</a>.
        </p>
      </div>
    </>
  );
}
