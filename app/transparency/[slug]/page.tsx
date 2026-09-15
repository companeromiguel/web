import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import DocumentLibrary from "@/components/transparency/DocumentLibrary";
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
  const sections = slug === "procurement"
    ? [...new Set(all.map(doc => doc.year))].map(year => ({ id: "year-" + year, title: String(year), documents: all.filter(doc => doc.year === year) }))
    : page.groups.map((group, index) => ({ id: group === "Related ARTA documents" ? "arta" : "documents-" + index, title: group, documents: all.filter(doc => doc.group === group) }));
  return <>
    <PageHeader title={page.title} description={sectionDescriptions[page.title]}>
      <nav aria-label="Breadcrumb" className="text-xs text-[#2A2A29]/60">
        <Link href="/" className="hover:underline">Home</Link><span aria-hidden="true"> / </span>
        <Link href="/transparency/" className="hover:underline">Transparency</Link><span aria-hidden="true"> / </span>
        <span aria-current="page">{page.title}</span>
      </nav>
    </PageHeader>
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
      <nav aria-label="Document sections" className="mt-6 flex flex-wrap gap-2">
        {sections.map(section => <a key={section.id} href={"#" + section.id} className="rounded border border-[#A9C6D8] px-3 py-2 text-sm text-[#0591D4] hover:underline">{section.title}</a>)}
      </nav>
      {sections.map(section => <section key={section.id} id={section.id} aria-labelledby={section.id + "-heading"} className="mt-14 scroll-mt-24">
        <div className="mb-6">
          <h2 id={section.id + "-heading"} className="font-heading text-xl font-semibold text-[#2A2A29]">{section.title}</h2>
          <p className="mt-1 text-sm text-[#2A2A29]/60">{sectionDescriptions[slug === "procurement" ? "Annual procurement plans" : section.title]}</p>
        </div>
        <DocumentLibrary documents={section.documents} />
      </section>)}
      {slug === "seal" && <aside className="mt-10 bg-[#F7FAFB] p-5">
        <Link href="/transparency/citizens-charter/#arta" className="text-sm font-medium text-[#0591D4] underline underline-offset-4">Related ARTA documents</Link>
      </aside>}
    </div>
    </div>
  </>;
}
