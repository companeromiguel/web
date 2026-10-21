import type { Metadata } from "next";
import PageHeader, { Breadcrumb } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "How to Pay Online – TMCWD",
  description:
    "Step-by-step guide on how to pay your TMCWD water bill online using GCash.",
};

export default function HowToPayOnlinePage() {
  return (
    <>
      <PageHeader
        title="How to Pay Online"
        description="Watch the video guide below to learn how to pay your water bill online using GCash."
      >
        <Breadcrumb
          items={[{ label: "Online Bill Inquiry", href: "/online-bill-inquiry/" }]}
          current="How to Pay Online"
        />
      </PageHeader>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="overflow-hidden rounded-2xl shadow-lg bg-black aspect-video">
          <video
            className="w-full h-full"
            controls
            muted
            playsInline
            aria-label="How to pay your TMCWD water bill online using GCash"
          >
            <source src="/gcash.mp4" type="video/mp4" />
            {/* Add a WebVTT captions file at /gcash.vtt to satisfy WCAG 1.2.2.
                Until then this track element is present but the file is missing,
                which is preferable to having no track element at all. */}
            <track
              kind="captions"
              src="/gcash.vtt"
              srcLang="fil"
              label="Filipino"
              default
            />
            Your browser does not support HTML5 video.
          </video>
        </div>
      </div>
    </>
  );
}
