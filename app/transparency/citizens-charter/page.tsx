import type { Metadata } from "next";
import Link from "next/link";
import TransparencyHero from "@/components/transparency/TransparencyHero";
import DocumentLibrary from "@/components/transparency/DocumentLibrary";
import TransparencyWaveBackground from "@/components/TransparencyWaveBackground";
import { documents } from "@/lib/transparency";

export const metadata: Metadata = {
  title: "Citizen's Charter",
  description:
    "TMCWD compliance with the Anti-Red Tape Authority and the Ease of Doing Business and Efficient Delivery of Government Services Act (RA 11032).",
};

function getDoc(id: string) {
  const doc = documents.find((d) => d.id === id);
  if (!doc) throw new Error(`Document not found: ${id}`);
  return doc;
}

const sections = [
  { id: "citizens-charter",        label: "I. Citizen's Charter" },
  { id: "cart",                     label: "II. Committee on Anti-Red Tape (CART)" },
  { id: "client-satisfaction",      label: "III. Client Satisfaction Measurement Report" },
  { id: "reengineering-plan",       label: "IV. Whole-of-Government Initial Re-engineering Plan" },
  { id: "zero-backlog",             label: "V. Zero Backlog Report" },
  { id: "three-signatories",        label: "VI. Three (3) Signatories Rule" },
];

export default function CitizensCharterPage() {
  const charterDoc        = getDoc("citizen-charter-citizenscharter-2025-1st-revision");
  const cartOfficeOrder   = getDoc("arta-cart-office-order");
  const reengineeringPlan = getDoc("arta-tmcwd-initial-reengineering-plan");

  return (
    <>
      <TransparencyHero
        title="Citizen's Charter"
        description="TMCWD compliance with the Anti-Red Tape Authority (ARTA) and the Ease of Doing Business and Efficient Delivery of Government Services Act (RA 11032)."
      />
      <div className="relative isolate overflow-hidden bg-[#EEF4F8]">
        <TransparencyWaveBackground animated />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

          {/* Page heading */}
          <div className="mb-8 border-b border-[#C4DAE7] pb-6">
            <p className="text-xs font-medium uppercase tracking-widest text-[#0591D4]">RA 11032 Compliance</p>
            <h2 className="mt-2 font-heading text-2xl font-semibold text-[#2A2A29]">
              Anti-Red Tape Authority (ARTA) and Ease of Doing Business and Efficient Delivery of Government Services (RA 11032) Compliance
            </h2>
          </div>

          {/* Section navigation */}
          <nav aria-label="Document sections" className="flex flex-wrap gap-2">
            {sections.map((s) => (
              <a
                key={s.id}
                href={"#" + s.id}
                className="rounded border border-[#A9C6D8] px-3 py-2 text-sm text-[#0591D4] hover:underline"
              >
                {s.label}
              </a>
            ))}
          </nav>

          {/* I. Citizen's Charter */}
          <section id="citizens-charter" aria-labelledby="citizens-charter-heading" className="mt-14 scroll-mt-24">
            <div className="mb-6">
              <h3 id="citizens-charter-heading" className="font-heading text-xl font-semibold text-[#2A2A29]">
                I. Citizen's Charter
              </h3>
            </div>
            <DocumentLibrary documents={[{ ...charterDoc, title: "Citizen's Charter Handbook 2025 (1st Edition)" }]} />
          </section>

          {/* II. Committee on Anti-Red Tape (CART) */}
          <section id="cart" aria-labelledby="cart-heading" className="mt-14 scroll-mt-24">
            <div className="mb-6">
              <h3 id="cart-heading" className="font-heading text-xl font-semibold text-[#2A2A29]">
                II. Committee on Anti-Red Tape (CART)
              </h3>
            </div>
            <div className="space-y-4">
              <DocumentLibrary documents={[{ ...cartOfficeOrder, title: "Office Order" }]} />
              {/* CART Directory — not yet available */}
              <div className="flex items-center justify-between border border-[#E8EEF2] bg-white p-5 shadow-sm">
                <div>
                  <p className="font-heading text-base font-semibold text-[#2A2A29]">CART Directory</p>
                  <p className="mt-1 text-sm text-[#2A2A29]/60">Directory of the Committee on Anti-Red Tape members.</p>
                </div>
                <span className="shrink-0 rounded border border-[#E8EEF2] bg-[#F7FAFB] px-4 py-2 text-sm text-[#2A2A29]/50">
                  Coming soon
                </span>
              </div>
            </div>
          </section>

          {/* III. Client Satisfaction Measurement Report */}
          <section id="client-satisfaction" aria-labelledby="client-satisfaction-heading" className="mt-14 scroll-mt-24">
            <div className="mb-6">
              <h3 id="client-satisfaction-heading" className="font-heading text-xl font-semibold text-[#2A2A29]">
                III. Client Satisfaction Measurement Report
              </h3>
            </div>
            <div className="border border-[#C4DAE7] bg-white p-6 shadow-sm">
              <p className="text-sm leading-relaxed text-[#2A2A29]/80">
                For compliance, since Trece Martires City Water District implemented its Citizen's Charter in April 2025.
                As mandated by Section 3(b), Rule IV of RA 11032, client satisfaction feedback shall be gathered for all
                services offered by the district. All data gathered within the end of 2025 will be summarized and the
                agency will adopt the Guidelines on the Implementation of the Harmonized Client Satisfaction Measurement.
              </p>
            </div>
          </section>

          {/* IV. Whole-of-Government Initial Re-engineering Plan */}
          <section id="reengineering-plan" aria-labelledby="reengineering-plan-heading" className="mt-14 scroll-mt-24">
            <div className="mb-6">
              <h3 id="reengineering-plan-heading" className="font-heading text-xl font-semibold text-[#2A2A29]">
                IV. Whole-of-Government Initial Re-engineering Plan
              </h3>
            </div>
            <DocumentLibrary documents={[{ ...reengineeringPlan, title: "TMCWD Initial Re-engineering Plan" }]} />
          </section>

          {/* V. Zero Backlog Report */}
          <section id="zero-backlog" aria-labelledby="zero-backlog-heading" className="mt-14 scroll-mt-24">
            <div className="mb-6">
              <h3 id="zero-backlog-heading" className="font-heading text-xl font-semibold text-[#2A2A29]">
                V. Zero Backlog Report
              </h3>
            </div>
            {/* Zero Backlog Certification 2025 — not yet available */}
            <div className="flex items-center justify-between border border-[#E8EEF2] bg-white p-5 shadow-sm">
              <div>
                <p className="font-heading text-base font-semibold text-[#2A2A29]">Zero Backlog Certification 2025</p>
                <p className="mt-1 text-sm text-[#2A2A29]/60">Certification that the district has cleared its pending transactions backlog.</p>
              </div>
              <span className="shrink-0 rounded border border-[#E8EEF2] bg-[#F7FAFB] px-4 py-2 text-sm text-[#2A2A29]/50">
                Coming soon
              </span>
            </div>
          </section>

          {/* VI. Three (3) Signatories Rule */}
          <section id="three-signatories" aria-labelledby="three-signatories-heading" className="mt-14 scroll-mt-24">
            <div className="mb-6">
              <h3 id="three-signatories-heading" className="font-heading text-xl font-semibold text-[#2A2A29]">
                VI. Three (3) Signatories Rule
              </h3>
            </div>
            {/* Office Memorandum — not yet available */}
            <div className="flex items-center justify-between border border-[#E8EEF2] bg-white p-5 shadow-sm">
              <div>
                <p className="font-heading text-base font-semibold text-[#2A2A29]">Office Memorandum</p>
                <p className="mt-1 text-sm text-[#2A2A29]/60">
                  Office memorandum implementing the three-signatories rule in compliance with RA 11032.
                </p>
              </div>
              <span className="shrink-0 rounded border border-[#E8EEF2] bg-[#F7FAFB] px-4 py-2 text-sm text-[#2A2A29]/50">
                Coming soon
              </span>
            </div>
          </section>

          {/* Back link */}
          <div className="mt-14">
            <Link
              href="/transparency/"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#0591D4] transition-colors hover:text-[#047ab5]"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
              Back to Transparency
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
