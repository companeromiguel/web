import type { Metadata } from "next";
import Link from "next/link";
import PageHeader, { Breadcrumb } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Transparency",
  description:
    "TMCWD public disclosures: Full Disclosure Policy postings, FOI, procurement plans, Citizen's Charter, and financial reports.",
};

const sections = [
  { id: "full-disclosure",  label: "Full Disclosure Policy" },
  { id: "foi",              label: "Freedom of Information" },
  { id: "procurement",      label: "Procurement Plan"       },
  { id: "citizens-charter", label: "Citizen's Charter"      },
  { id: "financials",       label: "Financial Reports"      },
] as const;

const fdpDocuments = [
  { period: "[Quarter/Year]", document: "Statement of Allotment, Obligations and Balances",     href: "#" },
  { period: "[Quarter/Year]", document: "Quarterly Physical and Financial Report of Operations", href: "#" },
  { period: "[Quarter/Year]", document: "Annual Budget",                                         href: "#" },
  { period: "[Quarter/Year]", document: "Annual Procurement Plan",                               href: "#" },
  { period: "[Quarter/Year]", document: "Bids and Awards Committee Report",                      href: "#" },
];

const financialReports = [
  { year: "[YEAR]", document: "Audited Financial Statements",            href: "#" },
  { year: "[YEAR]", document: "Annual Report to LWUA",                   href: "#" },
  { year: "[YEAR]", document: "Commission on Audit (COA) Annual Report", href: "#" },
];

const thClass = "px-4 py-3 text-left text-xs font-semibold text-[#2A2A29]/50 uppercase tracking-wide border-b border-[#E8EEF2] bg-[#F7FAFB]";
const tdClass = "px-4 py-3 text-sm text-[#2A2A29] border-b border-[#E8EEF2]";

function DocTable({ columns, rows }: { columns: string[]; rows: { cells: string[]; href: string }[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr>
            {columns.map((col) => <th key={col} className={thClass}>{col}</th>)}
            <th className={thClass}>Download</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-[#F7FAFB] transition-colors">
              {row.cells.map((cell, j) => <td key={j} className={tdClass}>{cell}</td>)}
              <td className={tdClass}>
                <a href={row.href} className="text-[#0591D4] hover:underline font-medium text-xs">PDF ↓</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function TransparencyPage() {
  return (
    <>
      <PageHeader
        title="Transparency"
        description="Public disclosures required under the Full Disclosure Policy, Republic Act 9184, and other applicable laws and regulations."
      >
        <Breadcrumb current="Transparency" />
        {/* Section pill nav */}
        <nav aria-label="On-page sections" className="mt-5 flex flex-wrap gap-2">
          {sections.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className="text-xs font-medium text-[#370A77] border border-[#370A77]/20 hover:border-[#370A77] hover:bg-[#370A77]/5 px-3 py-1 transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>
      </PageHeader>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-16">

        {/* Full Disclosure Policy */}
        <section id="full-disclosure" aria-labelledby="fdp-heading">
          <h2 id="fdp-heading" className="font-heading text-lg font-semibold text-[#2A2A29] mb-1">
            Full Disclosure Policy
          </h2>
          <p className="text-sm text-[#2A2A29]/60 mb-6 max-w-2xl">
            Documents posted pursuant to DILG Memorandum Circular and the national
            government&apos;s Full Disclosure Policy (FDP) for GOCCs.
          </p>
          <DocTable
            columns={["Period", "Document"]}
            rows={fdpDocuments.map(({ period, document, href }) => ({ cells: [period, document], href }))}
          />
        </section>

        {/* Freedom of Information */}
        <section id="foi" aria-labelledby="foi-heading">
          <h2 id="foi-heading" className="font-heading text-lg font-semibold text-[#2A2A29] mb-1">
            Freedom of Information
          </h2>
          <p className="text-sm text-[#2A2A29]/60 mb-5 max-w-2xl">
            Pursuant to Executive Order No. 2, s. 2016, any Filipino citizen may request access
            to official records held by TMCWD.
          </p>
          <div className="bg-[#F7FAFB] border-l-2 border-[#0591D4] px-6 py-5 max-w-2xl text-sm text-[#2A2A29]/70 space-y-2">
            <p className="font-semibold text-[#2A2A29] text-sm">How to file an FOI request</p>
            <ol className="list-decimal pl-4 space-y-1.5">
              <li>Fill out the FOI request form (at the TMCWD main office or by email).</li>
              <li>Submit to the designated FOI Receiving Officer.</li>
              <li>TMCWD will respond within <strong className="text-[#2A2A29]">[ADD: X] working days</strong>.</li>
              <li>
                If denied, file a complaint at the{" "}
                <a href="https://www.foi.gov.ph" className="text-[#0591D4] hover:underline"
                  target="_blank" rel="noopener noreferrer">eFOI Portal</a>.
              </li>
            </ol>
            <p className="text-[#2A2A29]/50 pt-1">[ADD: Contact person, form download link, and grounds for denial.]</p>
          </div>
        </section>

        {/* Annual Procurement Plan */}
        <section id="procurement" aria-labelledby="procurement-heading">
          <h2 id="procurement-heading" className="font-heading text-lg font-semibold text-[#2A2A29] mb-1">
            Annual Procurement Plan
          </h2>
          <p className="text-sm text-[#2A2A29]/60 mb-6 max-w-2xl">
            Posted pursuant to Republic Act 9184 and its Revised Implementing Rules and Regulations.
          </p>
          <DocTable
            columns={["Year", "Document"]}
            rows={fdpDocuments.slice(3, 4).map(({ period, document, href }) => ({ cells: [period, document], href }))}
          />
          <p className="mt-4 text-xs text-[#2A2A29]/45">
            Bid notices and awards are also published on{" "}
            <a href="https://www.philgeps.gov.ph" className="text-[#0591D4] hover:underline"
              target="_blank" rel="noopener noreferrer">PhilGEPS</a>.
          </p>
        </section>

        {/* Citizen's Charter */}
        <section id="citizens-charter" aria-labelledby="charter-heading">
          <h2 id="charter-heading" className="font-heading text-lg font-semibold text-[#2A2A29] mb-1">
            Citizen&apos;s Charter
          </h2>
          <p className="text-sm text-[#2A2A29]/60 mb-6 max-w-2xl">
            Required under Republic Act 11032 (Ease of Doing Business Act). Describes all
            TMCWD frontline services, step-by-step procedures, responsible officers, fees,
            and turnaround times.
          </p>
          <div className="bg-[#F7FAFB] border border-[#E8EEF2] px-6 py-5 max-w-sm flex items-center justify-between gap-4">
            <div>
              <p className="font-medium text-sm text-[#2A2A29]">TMCWD Citizen&apos;s Charter</p>
              <p className="text-xs text-[#2A2A29]/45 mt-0.5">[Year] Edition · [X] pages</p>
            </div>
            <a href="#" className="shrink-0 text-xs font-semibold text-[#0591D4] hover:underline whitespace-nowrap">
              Download PDF ↓
            </a>
          </div>
          <p className="mt-5 text-sm text-[#2A2A29]/55 max-w-2xl">
            [ADD: List frontline services covered — new connections, meter disputes, billing,
            water quality complaints, etc.]
          </p>
        </section>

        {/* Financial Reports */}
        <section id="financials" aria-labelledby="financials-heading">
          <h2 id="financials-heading" className="font-heading text-lg font-semibold text-[#2A2A29] mb-1">
            Financial Reports
          </h2>
          <p className="text-sm text-[#2A2A29]/60 mb-6 max-w-2xl">
            Audited financial statements and annual reports submitted to COA and LWUA.
          </p>
          <DocTable
            columns={["Year", "Document"]}
            rows={financialReports.map(({ year, document, href }) => ({ cells: [year, document], href }))}
          />
        </section>

      </div>
    </>
  );
}
