import type { Metadata } from "next";
import PageHeader, { Breadcrumb } from "@/components/layout/PageHeader";
import AllAnnouncementsFeed from "@/components/AllAnnouncementsFeed";

export const metadata: Metadata = {
  title: "Announcements",
  description:
    "Official announcements, service advisories, and updates from the Trece Martires City Water District.",
};

export default function NewsPage() {
  return (
    <>
      <PageHeader
        title="Announcements"
        description="Latest posts and advisories from the official TMCWD Facebook page."
      >
        <Breadcrumb current="Announcements" />
      </PageHeader>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">

        {/* Live Facebook feed */}
        <AllAnnouncementsFeed />

        {/* Footer note */}
        <p className="mt-10 text-xs text-[#2A2A29]/35 text-center">
          Posts are sourced from the{" "}
          <a
            href="https://www.facebook.com/tmcwdCMUHelpDesk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0591D4] hover:underline"
          >
            official TMCWD Facebook page
          </a>
          . For urgent concerns, call{" "}
          <a href="tel:+63464191234" className="text-[#0591D4] hover:underline">
            (046) 419-1234
          </a>
          .
        </p>
      </div>
    </>
  );
}
