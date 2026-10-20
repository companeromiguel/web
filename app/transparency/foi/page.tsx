import type { Metadata } from "next";
import Link from "next/link";
import TransparencyHero from "@/components/transparency/TransparencyHero";
import DocumentLibrary from "@/components/transparency/DocumentLibrary";
import TransparencyWaveBackground from "@/components/TransparencyWaveBackground";
import { documents, sectionDescriptions } from "@/lib/transparency";

export const metadata: Metadata = {
  title: "Freedom of Information",
  description: "Read the TMCWD FOI manual and request guides, view certification records, and access the FOI registry and reports.",
};

function getDoc(id: string) {
  const doc = documents.find(d => d.id === id);
  if (!doc) throw new Error(`Document not found: ${id}`);
  return doc;
}

const foiReports = [
  {
    label: "Agency Information Inventory",
    href: "https://www.foi.gov.ph/agencies/tmcwd/",
    description: "View TMCWD's information inventory on the FOI portal.",
  },
  {
    label: "FOI Registry",
    href: "https://www.foi.gov.ph/agencies/tmcwd/",
    description: "Track FOI requests filed with TMCWD on the FOI portal.",
  },
  {
    label: "FOI Summary Report",
    href: "https://www.foi.gov.ph/agencies/tmcwd/",
    description: "Summary report of FOI requests received and resolved by TMCWD.",
  },
];

export default function FoiPage() {
  const peoplesManual = getDoc("foi-peoples-freedom-of-information-manual-2025");
  const englishGuide  = getDoc("foi-english");
  const tagalogGuide  = getDoc("foi-tagalog");
  const certification = getDoc("foi-07-certification");
  const isoCert       = getDoc("foi-iso-certification-of-core-process");

  const sections = [
    { id: "peoples-manual",   label: "I. FOI People's Manual" },
    { id: "one-page-manual",  label: "II. One Page FOI Manual" },
    { id: "foi-reports",      label: "III. FOI Reports" },
    { id: "tmcwd-foi-program", label: "IV. TMCWD FOI Program" },
  ];

  return <>
    <TransparencyHero
      title="Freedom of Information"
      description={sectionDescriptions["Freedom of Information"]}
      sealSrc="/foi.png"
      sealAlt="Freedom of Information Philippines"
      sealHref="https://www.foi.gov.ph/agencies/tmcwd/"
      sealWhiteBg
    />
    <div className="relative isolate overflow-hidden bg-[#EEF4F8]">
      <TransparencyWaveBackground animated />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

        {/* Section navigation */}
        <nav aria-label="Document sections" className="flex flex-wrap gap-2">
          {sections.map(s => (
            <a key={s.id} href={"#" + s.id} className="rounded border border-[#A9C6D8] px-3 py-2 text-sm text-[#0591D4] hover:underline">
              {s.label}
            </a>
          ))}
        </nav>

        {/* I. FOI People's Manual */}
        <section id="peoples-manual" aria-labelledby="peoples-manual-heading" className="mt-14 scroll-mt-24">
          <div className="mb-6">
            <h2 id="peoples-manual-heading" className="font-heading text-xl font-semibold text-[#2A2A29]">
              I. FOI People's Manual
            </h2>
            <p className="mt-1 text-sm text-[#2A2A29]/60">
              The agency FOI manual covering information requests, responsible officers, processing procedures, appeals, fees, and request forms.
            </p>
          </div>
          <DocumentLibrary documents={[peoplesManual]} />
        </section>

        {/* II. One Page FOI Manual */}
        <section id="one-page-manual" aria-labelledby="one-page-manual-heading" className="mt-14 scroll-mt-24">
          <div className="mb-6">
            <h2 id="one-page-manual-heading" className="font-heading text-xl font-semibold text-[#2A2A29]">
              II. One Page FOI Manual
            </h2>
            <p className="mt-1 text-sm text-[#2A2A29]/60">
              Quick-reference guides for submitting a Freedom of Information request, available in English and Tagalog.
            </p>
          </div>
          <div className="space-y-4">
            <div>
              <p className="mb-3 text-sm font-medium text-[#2A2A29]">One Page FOI Manual (English)</p>
              <DocumentLibrary documents={[englishGuide]} />
            </div>
            <div>
              <p className="mb-3 text-sm font-medium text-[#2A2A29]">One Page FOI Manual (Tagalog)</p>
              <DocumentLibrary documents={[tagalogGuide]} />
            </div>
          </div>
        </section>

        {/* III. FOI Reports */}
        <section id="foi-reports" aria-labelledby="foi-reports-heading" className="mt-14 scroll-mt-24">
          <div className="mb-6">
            <h2 id="foi-reports-heading" className="font-heading text-xl font-semibold text-[#2A2A29]">
              III. FOI Reports
            </h2>
            <p className="mt-1 text-sm text-[#2A2A29]/60">
              Agency information inventory, FOI registry, and summary reports hosted on the national FOI portal.
            </p>
          </div>
          <ul className="space-y-3">
            {foiReports.map(report => (
              <li key={report.label} className="border border-[#E8EEF2] bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="font-heading text-base font-semibold text-[#2A2A29]">{report.label}</p>
                    <p className="mt-1 text-sm text-[#2A2A29]/65">{report.description}</p>
                  </div>
                  <a
                    href={report.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 rounded border border-[#0591D4]/30 px-4 py-2 text-sm font-medium text-[#0591D4] hover:bg-[#0591D4]/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0591D4]"
                  >
                    View on FOI portal<span className="sr-only">: {report.label} (new tab)</span>
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* IV. TMCWD FOI Program */}
        <section id="tmcwd-foi-program" aria-labelledby="tmcwd-foi-program-heading" className="mt-14 scroll-mt-24">
          <div className="mb-6">
            <h2 id="tmcwd-foi-program-heading" className="font-heading text-xl font-semibold text-[#2A2A29]">
              IV. TMCWD FOI Program
            </h2>
            <p className="mt-1 text-sm text-[#2A2A29]/60">
              Certification records and supporting documents for TMCWD's FOI compliance program.
            </p>
          </div>
          <DocumentLibrary documents={[certification, isoCert]} />
        </section>

        {/* Back link */}
        <div className="mt-14">
          <Link
            href="/transparency/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#0591D4] hover:text-[#047ab5] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Back to Transparency
          </Link>
        </div>

      </div>
    </div>
  </>;
}
