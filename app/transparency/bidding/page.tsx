import DocumentLibrary from "@/components/transparency/DocumentLibrary";
import biddingDocuments from "@/lib/bidding-documents.json";
import type { Metadata } from "next";
import Link from "next/link";
import TransparencyHero from "@/components/transparency/TransparencyHero";
import TransparencyWaveBackground from "@/components/TransparencyWaveBackground";

export const metadata: Metadata = {
  title: "Bidding",
  description: "TMCWD bid opportunities, bid bulletins, notices of award, and notices to proceed.",
};

const projects = [
  "Supply and Delivery of Two (2) Units 5-Cubic Meter Siphon/Vacuum Truck for the Septage Management System of Trece Martires City Water District",
  "Supply and Delivery of One (1) Unit Ground Penetrating Radar for Construction and Maintenance Division of Trece Martires City Water District",
];
const sourceUrl = "https://tmcwaterdistrict.weebly.com/2026.html";
const documents = biddingDocuments.map((doc, index) => ({
  ...doc,
  title: index < 2 ? projects[index] : "Supplemental Bid Bulletin No. 1",
  summary: index === 2 ? "Ground Penetrating Radar project" : undefined,
}));

export default function BiddingPage() {
  return <>
    <TransparencyHero title="TMCWD Bid Opportunities" description="Bid opportunities and related project documents from Trece Martires City Water District." breadcrumb="Bidding" />
    <div className="relative isolate overflow-hidden bg-[#EEF4F8]">
      <TransparencyWaveBackground animated />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {[["Documents", String(documents.length)], ["Format", "PDF"], ["Access", "Preview, open or download"]].map(([label, value]) =>
            <div key={label} className="border border-[#E8EEF2] bg-[#F7FAFB] p-5">
              <p className="text-xs font-medium uppercase tracking-wide text-[#0591D4]">{label}</p>
              <p className="mt-2 font-heading text-lg font-semibold text-[#2A2A29]">{value}</p>
            </div>)}
        </div>
        <nav aria-label="Document sections" className="mt-6 flex flex-wrap gap-2">
          <a href="#year-2026" className="rounded border border-[#A9C6D8] px-3 py-2 text-sm text-[#0591D4] hover:underline">2026</a>
        </nav>
        <section id="year-2026" aria-labelledby="year-2026-heading" className="mt-14 scroll-mt-24">
          <div className="mb-6">
            <h2 id="year-2026-heading" className="font-heading text-xl font-semibold text-[#2A2A29]">2026</h2>
            <p className="mt-1 text-sm text-[#2A2A29]/60">Bidding documents and the supplemental bid bulletin for the 2026 projects.</p>
          </div>
          <div className="space-y-6">
            {projects.map((project, index) => (
              <article key={project} aria-labelledby={`project-${index}-heading`} className="border border-[#E8EEF2] bg-white shadow-sm">
                <div className="grid lg:grid-cols-[2fr_3fr]">
                  <div className="border-b border-[#E8EEF2] bg-[#F7FAFB] p-5 sm:p-6 lg:border-b-0 lg:border-r">
                    <p className="text-xs font-medium uppercase tracking-wide text-[#0591D4]">Bid opportunity · 2026</p>
                    <h3 id={`project-${index}-heading`} className="mt-3 font-heading text-lg font-semibold leading-relaxed text-[#2A2A29]">{project}</h3>
                  </div>
                  <div className="min-w-0 space-y-4 p-5 sm:p-6">
                    <DocumentLibrary documents={[
                      { ...documents[index], title: "Bidding Document", summary: undefined },
                      ...(index === 1 ? [{ ...documents[2], title: "Bid Bulletin — Supplemental No. 1", summary: undefined }] : []),
                    ]} />
                    <ul className="divide-y divide-[#E8EEF2] border border-[#E8EEF2] bg-[#F7FAFB] px-5">
                      {(index === 0 ? ["Bid Bulletin", "Notice of Award", "Notice to Proceed"] : ["Notice of Award", "Notice to Proceed"]).map(type => (
                        <li key={type} className="flex flex-wrap items-center justify-between gap-2 py-4">
                          <span className="text-sm font-medium text-[#2A2A29]">{type}</span>
                          <span className="text-xs text-[#2A2A29]/60">Not yet available</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
        <aside className="mt-10 bg-[#F7FAFB] p-5">
          <Link href="/transparency/procurement/" className="text-sm font-medium text-[#0591D4] underline underline-offset-4">View annual procurement plans</Link>
        </aside>
        <p className="mt-8 text-xs text-[#2A2A29]/60">Source: <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="text-[#0591D4] underline underline-offset-4">TMCWD 2026 bid opportunities</a>. Documents open in a new tab.</p>
      </div>
    </div>
  </>;
}
