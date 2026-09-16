import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import PageHeader, { Breadcrumb } from "@/components/layout/PageHeader";
import SummaryCards from "@/components/services/SummaryCards";
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
  const referencePages = guide.sourcePages ?? guide.pages.map((page) => ({
    page,
    title: guide.title,
    src: `/Service%20Charter/${page}.png`,
    width: 1684,
    height: 1191,
  }));

  return (
    <>
      <PageHeader title={guide.title} description={guide.description}>
        <Breadcrumb current={guide.title} />
      </PageHeader>

      <div className="relative isolate overflow-hidden bg-[#EEF4F8]">
        <TransparencyWaveBackground animated />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <SummaryCards guide={guide} />

        <section aria-labelledby="requirements-heading" className="mt-14">
          <div className="mb-6">
            <h2 id="requirements-heading" className="font-heading text-xl font-semibold text-[#2A2A29]">{slug === "feedback" ? "Contact channels" : "What to prepare"}</h2>
            <p className="mt-1 text-sm text-[#2A2A29]/60">{slug === "feedback" ? "Options listed in the Citizen's Charter." : "Documents and account information listed in the Citizen's Charter."}</p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {guide.requirements.map((requirement) => (
              <li key={requirement} className="flex gap-3 border border-[#E8EEF2] bg-white p-4 text-sm leading-relaxed text-[#2A2A29]/75 shadow-sm">
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
          {guide.requirementsNote && <p className="mt-4 bg-[#F7FAFB] px-4 py-3 text-sm leading-relaxed text-[#2A2A29]/70">{guide.requirementsNote}</p>}
        </section>

        <section aria-labelledby="process-heading" className="mt-14">
          <div className="mb-6">
            <h2 id="process-heading" className="font-heading text-xl font-semibold text-[#2A2A29]">{slug === "feedback" ? "How submissions are handled" : "How it works"}</h2>
            <p className="mt-1 text-sm text-[#2A2A29]/60">{slug === "feedback" ? "The process described in the 2025 Citizen's Charter." : "A plain-language guide to the service steps."}</p>
          </div>
          <ol className="grid gap-4 md:grid-cols-3">
            {guide.steps.map((step, index) => (
              <li key={step.title} className="border border-[#E8EEF2] bg-white p-5 shadow-sm">
                <span className="text-xs font-semibold uppercase tracking-wide text-[#0591D4]">Step {index + 1}</span>
                <h3 className="mt-2 font-heading text-base font-semibold text-[#2A2A29]">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#2A2A29]/65">{step.detail}</p>
              </li>
            ))}
          </ol>
          {guide.note && <p className="mt-4 text-xs leading-relaxed text-[#2A2A29]/60">{guide.note}</p>}
        </section>

        {guide.extraSection && (
          <section aria-labelledby="extra-heading" className="mt-14">
            <div className="mb-6">
              <h2 id="extra-heading" className="font-heading text-xl font-semibold text-[#2A2A29]">{guide.extraSection.title}</h2>
              <p className="mt-1 text-sm text-[#2A2A29]/60">{guide.extraSection.description}</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {guide.extraSection.items.map((item) => (
                <div key={item.title} className="border border-[#E8EEF2] bg-[#F7FAFB] p-5">
                  <h3 className="font-heading text-base font-semibold text-[#2A2A29]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#2A2A29]/65">{item.detail}</p>
                  {item.note && <p className="mt-3 text-xs font-medium text-[#0591D4]">{item.note}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        <section aria-labelledby="guide-heading" className="mt-14">
          <div className="mb-6">
            <h2 id="guide-heading" className="font-heading text-xl font-semibold text-[#2A2A29]">Citizen&apos;s Charter reference</h2>
            <p className="mt-1 text-sm text-[#2A2A29]/60">The original pages in order. Open an image for a larger view.</p>
          </div>
          <p className="mb-3 text-sm font-medium text-[#0591D4] md:hidden">Swipe left or right to view the pages.</p>
          <div role="region" aria-label="Citizen's Charter reference photos" tabIndex={0} className="flex snap-x snap-mandatory items-start gap-4 overflow-x-auto overscroll-x-contain pb-4 focus-visible:outline-2 focus-visible:outline-[#0591D4] md:block md:space-y-8 md:overflow-visible md:pb-0">
            {referencePages.map(({ page, title, src, width, height }) => (
                <article key={page} className="w-full min-w-0 shrink-0 snap-start snap-always overflow-hidden border border-[#E8EEF2] bg-white shadow-sm">
                  <div className="flex items-center justify-between gap-3 border-b border-[#E8EEF2] bg-[#F7FAFB] px-5 py-3">
                    <h3 className="font-heading text-sm font-semibold text-[#2A2A29]">{title}</h3>
                    <span className="shrink-0 text-xs font-medium text-[#2A2A29]/50">Page {page}</span>
                  </div>
                  <a href={src} target="_blank" rel="noopener noreferrer" aria-label={`Open ${guide.title} page ${page} in a new tab`} className="block focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#0591D4]">
                    <Image src={src} alt={`TMCWD Citizen's Charter, page ${page}: ${title}`} width={width} height={height} className="h-auto w-full" sizes="(max-width: 1280px) 100vw, 1152px" />
                  </a>
                </article>
              ))}
          </div>
        </section>
      </div>
      </div>
    </>
  );
}
