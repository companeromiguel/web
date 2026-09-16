import type { Metadata } from "next";
import Link from "next/link";
import TransparencyWaveBackground from "@/components/TransparencyWaveBackground";
import TransparencyHero from "@/components/transparency/TransparencyHero";
import { transparencyPages, documentsFor, sectionDescriptions } from "@/lib/transparency";

export const metadata: Metadata = { title: "Transparency" };
export default function TransparencyPage() {
  return <>
    <TransparencyHero title="Transparency" description="Access public documents, bid opportunities, procurement plans, and information about TMCWD services and accountability." isOverview />
    <div className="relative isolate overflow-hidden bg-[#EEF4F8]">
    <TransparencyWaveBackground animated />
    <div className="relative z-10 mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:px-8">
      <section className="border border-[#E8EEF2] bg-[#F7FAFB] p-6">
        <h2 className="font-heading text-xl font-semibold text-[#2A2A29]">
          <Link href="/transparency/bidding/" className="hover:text-[#0591D4] hover:underline">Bidding</Link>
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#2A2A29]/65">Bid opportunities, bid bulletins, notices of award, and notices to proceed.</p>
        <Link href="/transparency/bidding/" className="mt-5 inline-block text-sm font-medium text-[#0591D4] underline underline-offset-4">View bid opportunities</Link>
      </section>
      {transparencyPages.map(page => <section key={page.slug} id={page.slug} className="scroll-mt-24 border border-[#E8EEF2] bg-[#F7FAFB] p-6">
        <h2 className="font-heading text-xl font-semibold text-[#2A2A29]">
          <Link href={`/transparency/${page.slug}/`} className="hover:text-[#0591D4] hover:underline">{page.title}</Link>
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#2A2A29]/65">{sectionDescriptions[page.title]}</p>
        <p className="mt-3 text-sm text-[#2A2A29]/60">{documentsFor(page.groups).length} PDF documents</p>
        <Link href={`/transparency/${page.slug}/`} className="mt-5 inline-block text-sm font-medium text-[#0591D4] underline underline-offset-4">View documents<span className="sr-only">: {page.title}</span></Link>
      </section>)}
    </div>
    </div>
  </>;
}
