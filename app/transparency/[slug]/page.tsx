import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import TransparencyHero from "@/components/transparency/TransparencyHero";
import DocumentLibrary from "@/components/transparency/DocumentLibrary";
import SealYearFilter from "@/components/transparency/SealYearFilter";
import TransparencyWaveBackground from "@/components/TransparencyWaveBackground";
import { documentsFor, transparencyPages, sectionDescriptions } from "@/lib/transparency";

interface Props { params: Promise<{ slug: string }> }
export function generateStaticParams() { return transparencyPages.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = transparencyPages.find(item => item.slug === slug);
  return { title: page?.title ?? "Transparency", description: page ? sectionDescriptions[page.title] : undefined };
}
export default async function TransparencyDetail({ params }: Props) {
  const { slug } = await params;
  const page = transparencyPages.find(item => item.slug === slug);
  if (!page) notFound();
  const all = documentsFor(page.groups);
  const sections = page.groups.map((group, index) => ({ id: group === "Related ARTA documents" ? "arta" : "documents-" + index, title: group, documents: all.filter(doc => doc.group === group) }));
  const sealHref = slug === "foi"
    ? "https://www.foi.gov.ph/agencies/tmcwd/"
    : slug === "seal"
    ? "/transparency/seal/"
    : undefined;

  return <>
    <TransparencyHero
      title={page.title}
      description={sectionDescriptions[page.title]}
      sealSrc={slug === "foi" ? "/foi.png" : undefined}
      sealAlt={slug === "foi" ? "Freedom of Information Philippines" : undefined}
      sealHref={sealHref}
    />
    <div className="relative isolate overflow-hidden bg-[#EEF4F8]">
    <TransparencyWaveBackground animated />
    <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-4 sm:grid-cols-3">
        {[["Documents", String(all.length)], ["Format", "PDF"], ["Access", "Preview, open or download"]].map(([label, value]) =>
          <div key={label} className="border border-[#E8EEF2] bg-[#F7FAFB] p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-[#0591D4]">{label}</p>
            <p className="mt-2 font-heading text-lg font-semibold text-[#2A2A29]">{value}</p>
          </div>)}
      </div>
      {slug === "seal" && (
        <div className="mt-6">
          <Link
            href="/transparency/citizens-charter/#arta"
            className="rounded border border-[#A9C6D8] px-3 py-2 text-sm text-[#0591D4] hover:underline"
          >
            Related ARTA Documents
          </Link>
        </div>
      )}
      <nav aria-label="Document sections" className="mt-6 flex flex-wrap gap-2">
        {sections.map(section => <a key={section.id} href={"#" + section.id} className="rounded border border-[#A9C6D8] px-3 py-2 text-sm text-[#0591D4] hover:underline">{section.title}</a>)}
      </nav>
      {slug === "seal" ? (
        <SealYearFilter sections={sections} allDocuments={all} sectionDescriptions={sectionDescriptions} />
      ) : (
        sections.map(section => <section key={section.id} id={section.id} aria-labelledby={section.id + "-heading"} className="mt-14 scroll-mt-24">
          <div className="mb-6">
            <h2 id={section.id + "-heading"} className="font-heading text-xl font-semibold text-[#2A2A29]">{section.title}</h2>
            <p className="mt-1 text-sm text-[#2A2A29]/60">{sectionDescriptions[section.title]}</p>
          </div>
          <DocumentLibrary documents={section.documents} />
        </section>)
      )}
      {slug === "citizens-charter" && (
        <div id="arta-back" className="mt-10">
          <Link
            href="/transparency/seal/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#0591D4] hover:text-[#047ab5] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Back to Transparency Seal
          </Link>
        </div>
      )}
    </div>
    </div>
  </>;
}
