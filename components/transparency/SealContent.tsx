"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import DocumentLibrary from "./DocumentLibrary";
import type { TransparencyDocument } from "@/lib/transparency";

interface Props {
  financialDocs:   TransparencyDocument[];
  budgetDocs:      TransparencyDocument[];
  procurementDocs: TransparencyDocument[];
  rankingDocs:     TransparencyDocument[];
  salnDocs:        TransparencyDocument[];
}

function SectionHeading({ roman, title, id }: { roman?: string; title: string; id: string }) {
  return (
    <div className="mb-6">
      {roman && <p className="text-xs font-semibold uppercase tracking-widest text-[#0591D4]">{roman}</p>}
      <h2 id={id + "-heading"} className="mt-1 font-heading text-xl font-semibold text-[#2A2A29]">{title}</h2>
    </div>
  );
}

const navSections = [
  { id: "financial",   roman: "I",    title: "Annual Financial Report" },
  { id: "budgets",     roman: "II",   title: "Approved Budgets" },
  { id: "procurement", roman: "III",  title: "Annual Procurement Plan" },
  { id: "saln",        roman: "IV",   title: "Financial Disclosures" },
  { id: "foi",         roman: "V",    title: "FOI Manual" },
  { id: "other",       roman: "VI",   title: "Other Good Governance Conditions" },
];

export default function SealContent({
  financialDocs,
  budgetDocs,
  procurementDocs,
  rankingDocs,
  salnDocs,
}: Props) {
  // Collect all unique years across all document groups (excluding year=0)
  const allYears = useMemo(() => {
    const all = [...financialDocs, ...budgetDocs, ...procurementDocs, ...rankingDocs, ...salnDocs];
    return [...new Set(all.map(d => d.year).filter(y => y > 0))].sort((a, b) => b - a);
  }, [financialDocs, budgetDocs, procurementDocs, rankingDocs, salnDocs]);

  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  function filter(docs: TransparencyDocument[]) {
    if (selectedYear === null) return docs;
    return docs.filter(d => d.year === selectedYear);
  }

  const fDocs = filter(financialDocs);
  const bDocs = filter(budgetDocs);
  const pDocs = filter(procurementDocs);
  const rDocs = filter(rankingDocs);
  const sDocs = filter(salnDocs);

  const btnBase = "rounded border px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0591D4]";
  const btnActive = "border-[#0591D4] bg-[#0591D4] text-white";
  const btnInactive = "border-[#A9C6D8] bg-[#F7FAFB] text-[#0591D4] hover:border-[#0591D4] hover:bg-[#EEF4F8]";

  return (
    <>
      {/* ── Year filter ── */}
      <div
        className="flex flex-wrap items-center gap-2"
        role="group"
        aria-label="Filter documents by year"
      >
        <button
          type="button"
          aria-pressed={selectedYear === null}
          onClick={() => setSelectedYear(null)}
          className={`${btnBase} ${selectedYear === null ? btnActive : btnInactive}`}
        >
          All
        </button>
        {allYears.map(year => (
          <button
            key={year}
            type="button"
            aria-pressed={selectedYear === year}
            onClick={() => setSelectedYear(selectedYear === year ? null : year)}
            className={`${btnBase} ${selectedYear === year ? btnActive : btnInactive}`}
          >
            {year}
          </button>
        ))}
      </div>

      {/* ── Section nav ── */}
      <nav aria-label="Document sections" className="mt-4 flex flex-wrap gap-2">
        {navSections.map(s => (
          <a
            key={s.id}
            href={"#" + s.id}
            className="rounded border border-[#A9C6D8] px-3 py-2 text-sm text-[#0591D4] hover:underline"
          >
            <span className="mr-1 font-semibold">{s.roman}.</span>{s.title}
          </a>
        ))}
      </nav>

      {/* ── I. Annual Financial Report ── */}
      {fDocs.length > 0 && (
        <section id="financial" aria-labelledby="financial-heading" className="mt-14 scroll-mt-24">
          <SectionHeading roman="I." title="Annual Financial Report" id="financial" />
          <DocumentLibrary documents={fDocs} />
        </section>
      )}

      {/* ── II. Approved Budgets ── */}
      {bDocs.length > 0 && (
        <section id="budgets" aria-labelledby="budgets-heading" className="mt-14 scroll-mt-24">
          <SectionHeading roman="II." title="Approved Budgets and Corresponding Targets" id="budgets" />
          <DocumentLibrary documents={bDocs} />
        </section>
      )}

      {/* ── III. Annual Procurement Plan ── */}
      {(pDocs.length > 0 || rDocs.length > 0) && (
        <section id="procurement" aria-labelledby="procurement-heading" className="mt-14 scroll-mt-24">
          <SectionHeading roman="III." title="Annual Procurement Plan" id="procurement" />
          <div className="space-y-10">
            {pDocs.length > 0 && (
              <div>
                <h3 className="mb-4 font-heading text-base font-semibold text-[#2A2A29]">
                  APP for Common-Use Supplies and Equipment (APP-CSE)
                </h3>
                <DocumentLibrary documents={pDocs} />
              </div>
            )}
            {rDocs.length > 0 && (
              <div>
                <h3 className="mb-4 font-heading text-base font-semibold text-[#2A2A29]">
                  Guidelines on the Grant of PBB — Performance-Based Bonus Ranking
                </h3>
                <DocumentLibrary documents={rDocs} />
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── IV. SALN / Financial Disclosures ── */}
      {sDocs.length > 0 && (
        <section id="saln" aria-labelledby="saln-heading" className="mt-14 scroll-mt-24">
          <SectionHeading roman="IV." title="The Agency Review and Compliance Procedure of Statements and Financial Disclosures" id="saln" />
          <DocumentLibrary documents={sDocs} />
        </section>
      )}

      {/* ── V. FOI — always visible, not year-filtered ── */}
      <section id="foi" aria-labelledby="foi-heading" className="mt-14 scroll-mt-24">
        <SectionHeading roman="V." title="The Final People's Freedom of Information (FOI) Manual signed by head of agency; Agency Information Inventory" id="foi" />
        <div className="border border-[#E8EEF2] bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-heading text-base font-semibold text-[#2A2A29]">
                FOI People's Manual, One Page FOI Manual, and FOI Reports
              </p>
              <p className="mt-1 text-sm text-[#2A2A29]/60">
                Full FOI documents including English and Tagalog guides, and the agency information inventory.
              </p>
            </div>
            <Link
              href="/transparency/foi/"
              className="shrink-0 rounded border border-[#0591D4]/30 px-4 py-2 text-sm font-medium text-[#0591D4] hover:bg-[#0591D4]/5"
            >
              View FOI page
            </Link>
          </div>
        </div>
      </section>

      {/* ── VI. Other Good Governance Conditions ── */}
      {sDocs.length > 0 && (
        <section id="other" aria-labelledby="other-heading" className="mt-14 scroll-mt-24">
          <SectionHeading roman="VI." title="Other Good Governance Conditions" id="other" />
          <div>
            <h3 className="mb-4 font-heading text-base font-semibold text-[#2A2A29]">SALN Certification</h3>
            <DocumentLibrary documents={sDocs} />
          </div>
        </section>
      )}

      {/* Empty state when a year filter returns nothing */}
      {selectedYear !== null &&
        fDocs.length === 0 && bDocs.length === 0 &&
        pDocs.length === 0 && rDocs.length === 0 && sDocs.length === 0 && (
        <div className="mt-14 rounded-xl border border-dashed border-[#A9C6D8] bg-white px-6 py-12 text-center">
          <p className="text-sm text-[#2A2A29]/50">No documents available for {selectedYear}.</p>
          <button
            type="button"
            onClick={() => setSelectedYear(null)}
            className="mt-3 text-sm font-medium text-[#0591D4] hover:underline"
          >
            Show all years
          </button>
        </div>
      )}

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
    </>
  );
}
