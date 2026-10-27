import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceHero from "@/components/services/ServiceHero";
import SummaryCards from "@/components/services/SummaryCards";
import ServiceInfoTable from "@/components/services/ServiceInfoTable";
import ChecklistTable from "@/components/services/ChecklistTable";
import ProcessTable from "@/components/services/ProcessTable";
import WaterRatesTable from "@/components/services/WaterRatesTable";
import NewWaterChecklist from "@/components/services/NewWaterChecklist";
import TransparencyWaveBackground from "@/components/TransparencyWaveBackground";
import { serviceGuides } from "@/lib/service-charter";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return Object.keys(serviceGuides).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = serviceGuides[slug];
  return guide ? { title: guide.title, description: guide.description } : {};
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = serviceGuides[slug];
  if (!guide) notFound();

  const tables = guide.charterTables;

  return (
    <>
      <ServiceHero title={guide.title} description={guide.description} slug={slug} />

      <div className="relative isolate overflow-hidden bg-[#EEF4F8]">
        <TransparencyWaveBackground animated />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

          <SummaryCards guide={guide} />

          {/* ── What to prepare ── */}
          <section aria-labelledby="requirements-heading" className="mt-14">
            <div className="mb-6">
              <h2
                id="requirements-heading"
                className="font-heading text-xl font-semibold text-[#2A2A29]"
              >
                {slug === "feedback" ? "Contact channels" : "What to prepare"}
              </h2>
              <p className="mt-1 text-sm text-[#2A2A29]/60">
                {slug === "feedback"
                  ? "Options listed in the Citizen's Charter."
                  : "Documents and account information listed in the Citizen's Charter."}
              </p>
            </div>

            {/* New water application gets the full expandable checklist by applicant type */}
            {slug === "new-water-application" ? (
              <NewWaterChecklist />
            ) : (
              <>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {guide.requirements.map((requirement) => (
                    <li
                      key={requirement}
                      className="flex gap-3 border border-[#E8EEF2] bg-white p-4 text-sm leading-relaxed text-[#2A2A29]/75 shadow-sm"
                    >
                      <span aria-hidden="true" className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#0591D4]" />
                      {slug === "feedback" && requirement.startsWith("Facebook:") ? (
                        <a
                          href="https://www.facebook.com/tmcwdCMUHelpDesk/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0591D4] underline underline-offset-4 hover:text-[#0473A8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0591D4]"
                        >
                          {requirement}
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      ) : requirement}
                    </li>
                  ))}
                </ul>
                {guide.requirementsNote && (
                  <p className="mt-4 bg-[#F7FAFB] px-4 py-3 text-sm leading-relaxed text-[#2A2A29]/70">
                    {guide.requirementsNote}
                  </p>
                )}
              </>
            )}
          </section>

          {/* ── How it works ── */}
          <section aria-labelledby="process-heading" className="mt-14">
            <div className="mb-6">
              <h2
                id="process-heading"
                className="font-heading text-xl font-semibold text-[#2A2A29]"
              >
                {slug === "feedback" ? "How submissions are handled" : "How it works"}
              </h2>
              <p className="mt-1 text-sm text-[#2A2A29]/60">
                {slug === "feedback"
                  ? "The process described in the 2025 Citizen's Charter."
                  : "A plain-language guide to the service steps."}
              </p>
            </div>
            <ol className="grid gap-4 md:grid-cols-3">
              {guide.steps.map((step, index) => (
                <li key={step.title} className="border border-[#E8EEF2] bg-white p-5 shadow-sm">
                  <span className="text-xs font-semibold uppercase tracking-wide text-[#0591D4]">
                    Step {index + 1}
                  </span>
                  <h3 className="mt-2 font-heading text-base font-semibold text-[#2A2A29]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#2A2A29]/65">{step.detail}</p>
                </li>
              ))}
            </ol>
            {guide.note && (
              <p className="mt-4 text-xs leading-relaxed text-[#2A2A29]/60">{guide.note}</p>
            )}
          </section>

          {/* ── Extra section (e.g. Payment platforms cards) ── */}
          {guide.extraSection && (
            <section aria-labelledby="extra-heading" className="mt-14">
              <div className="mb-6">
                <h2
                  id="extra-heading"
                  className="font-heading text-xl font-semibold text-[#2A2A29]"
                >
                  {guide.extraSection.title}
                </h2>
                <p className="mt-1 text-sm text-[#2A2A29]/60">{guide.extraSection.description}</p>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {guide.extraSection.items.map((item) => (
                  <div key={item.title} className="border border-[#E8EEF2] bg-[#F7FAFB] p-5">
                    <h3 className="font-heading text-base font-semibold text-[#2A2A29]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#2A2A29]/65">{item.detail}</p>
                    {item.note && (
                      <p className="mt-3 text-xs font-medium text-[#0591D4]">{item.note}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── Citizen's Charter reference — HTML tables for all services ── */}
          {tables && (
            <section aria-labelledby="charter-tables-heading" className="mt-14">
              <div className="mb-6">
                <h2
                  id="charter-tables-heading"
                  className="font-heading text-xl font-semibold text-[#2A2A29]"
                >
                  Citizen&apos;s Charter reference
                </h2>
                <p className="mt-1 text-sm text-[#2A2A29]/60">
                  Official details from the 2025 Citizen&apos;s Charter.
                </p>
              </div>

              {/* Service info key/value block */}
              <div className="mb-8">
                <ServiceInfoTable info={tables.serviceInfo} />
              </div>

              {/* Checklist of requirements */}
              <div className="mb-8">
                <ChecklistTable rows={tables.checklist} />
              </div>

              {/* Client steps / agency actions process table */}
              <div className="mb-8">
                <ProcessTable
                  caption={`${guide.title} — service process`}
                  rows={tables.process}
                  totalFees={tables.processTotalFees}
                  totalTime={tables.processTotalTime}
                />
              </div>

              {/* Schedule of water rates — only on new-water-application */}
              {slug === "new-water-application" && (
                <div className="mb-8">
                  <WaterRatesTable />
                </div>
              )}

              {/* Extra table (e.g. TABLE 2. Payment Platforms / CCB contact info) */}
              {tables.extraTable && (
                <div className="mb-8">
                  <div className="charter-table-wrap">
                    <table className="charter-table">
                      <caption>{tables.extraTable.caption}</caption>
                      <thead>
                        <tr className="charter-thead-primary">
                          {tables.extraTable.headers.map((h) => (
                            <th key={h} scope="col" className="text-center">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {tables.extraTable.rows.map((row, i) => (
                          <tr key={i}>
                            {row.map((cell, j) => (
                              <td key={j} className={j > 0 ? "text-center" : ""}>
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </section>
          )}

        </div>
      </div>
    </>
  );
}
