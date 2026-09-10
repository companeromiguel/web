import type { Metadata } from "next";
import PageHeader, { Breadcrumb } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Water Quality",
  description:
    "Consumer Confidence Reports, bacteriological and physical-chemical test results for TMCWD water supply.",
};

const reports = [
  { year: "[YEAR]", period: "Annual", label: "Consumer Confidence Report", fileSize: "[X] MB", href: "#" },
];

const parameters = [
  { name: "Total Coliform",         standard: "0 MPN/100 mL", result: "[ADD]", status: "—" },
  { name: "E. coli",                standard: "0 MPN/100 mL", result: "[ADD]", status: "—" },
  { name: "Turbidity",              standard: "≤ 5 NTU",       result: "[ADD]", status: "—" },
  { name: "Free Residual Chlorine", standard: "0.3–1.5 mg/L", result: "[ADD]", status: "—" },
  { name: "pH",                     standard: "6.5–8.5",       result: "[ADD]", status: "—" },
  { name: "Total Dissolved Solids", standard: "≤ 500 mg/L",   result: "[ADD]", status: "—" },
  { name: "Hardness",               standard: "≤ 300 mg/L",   result: "[ADD]", status: "—" },
  { name: "Iron",                   standard: "≤ 0.3 mg/L",   result: "[ADD]", status: "—" },
];

const thClass = "px-4 py-3 text-left text-xs font-semibold text-[#2A2A29]/50 uppercase tracking-wide border-b border-[#E8EEF2]";
const tdClass = "px-4 py-3 text-sm text-[#2A2A29] border-b border-[#E8EEF2]";

export default function WaterQualityPage() {
  return (
    <>
      <PageHeader
        title="Water Quality"
        description="TMCWD monitors water quality in accordance with Philippine National Standards for Drinking Water (PNSDW) and reports results annually through the Consumer Confidence Report."
      >
        <Breadcrumb current="Water Quality" />
      </PageHeader>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-16">

        {/* Consumer Confidence Reports */}
        <section aria-labelledby="ccr-heading">
          <h2 id="ccr-heading" className="font-heading text-lg font-semibold text-[#2A2A29] mb-1">
            Consumer Confidence Reports
          </h2>
          <p className="text-sm text-[#2A2A29]/60 mb-6 max-w-2xl">
            Annual report on drinking water quality delivered to consumers, as required under the
            Philippine Clean Water Act and LWUA regulations.
          </p>

          {reports.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F7FAFB]">
                    <th className={thClass}>Year</th>
                    <th className={thClass}>Period</th>
                    <th className={thClass}>Report</th>
                    <th className={thClass}>Size</th>
                    <th className={thClass}>Download</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((r, i) => (
                    <tr key={i} className="hover:bg-[#F7FAFB] transition-colors">
                      <td className={tdClass}>{r.year}</td>
                      <td className={tdClass}>{r.period}</td>
                      <td className={tdClass}>{r.label}</td>
                      <td className={`${tdClass} text-[#2A2A29]/45`}>{r.fileSize}</td>
                      <td className={tdClass}>
                        <a href={r.href} className="text-[#0591D4] hover:underline font-medium text-xs"
                          aria-label={`Download ${r.label} for ${r.year}`}>
                          PDF ↓
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-[#2A2A29]/50 bg-[#F7FAFB] border-l-2 border-[#A1CBE1] px-5 py-4">
              Reports will be posted here once available.
            </p>
          )}
        </section>

        {/* Latest test results */}
        <section aria-labelledby="results-heading">
          <h2 id="results-heading" className="font-heading text-lg font-semibold text-[#2A2A29] mb-1">
            Latest Test Results
          </h2>
          <p className="text-sm text-[#2A2A29]/60 mb-6 max-w-2xl">
            Selected parameters from the most recent laboratory analysis.
            Full results are in the Consumer Confidence Report.{" "}
            <strong className="font-medium text-[#2A2A29]/80">Sampling date: [ADD DATE]</strong>
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F7FAFB]">
                  <th className={thClass}>Parameter</th>
                  <th className={thClass}>PNSDW Limit</th>
                  <th className={thClass}>Result</th>
                  <th className={thClass}>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {parameters.map((p) => (
                  <tr key={p.name} className="hover:bg-[#F7FAFB] transition-colors">
                    <td className={`${tdClass} font-medium`}>{p.name}</td>
                    <td className={`${tdClass} text-[#2A2A29]/55 font-mono text-xs`}>{p.standard}</td>
                    <td className={tdClass}>{p.result}</td>
                    <td className={`${tdClass} text-[#2A2A29]/45`}>{p.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Monitoring programme */}
        <section aria-labelledby="monitoring-heading" className="bg-[#F7FAFB] border-l-2 border-[#0591D4] px-6 py-6">
          <h2 id="monitoring-heading" className="font-heading text-base font-semibold text-[#2A2A29] mb-3">
            Monitoring Programme
          </h2>
          <div className="text-sm text-[#2A2A29]/70 space-y-3 leading-relaxed max-w-2xl">
            <p>
              Water samples are collected from [ADD: number] sampling points across the
              distribution system on a [ADD: frequency] basis and analysed by{" "}
              [ADD: accredited laboratory name], accredited by the Department of Health.
            </p>
            <p>[ADD: Notes on source water, treatment process, or special monitoring activities.]</p>
          </div>
        </section>

      </div>
    </>
  );
}
