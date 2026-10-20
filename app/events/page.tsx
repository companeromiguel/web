import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import TransparencyWaveBackground from "@/components/TransparencyWaveBackground";
import AnnouncementHero from "@/components/layout/AnnouncementHero";
import { districtEvents } from "@/lib/events";
import EventsArchive from "./EventsArchive";

export const metadata: Metadata = {
  title: "Events",
  description: "Explore TMCWD community activities, environmental programs, training, and milestones through the years.",
};

export default function EventsPage() {
  const featured = districtEvents[0];
  return <>
    <AnnouncementHero slug="events" eyebrow="News & Updates" title="Events"
      description="Community activities, shared milestones, and moments from the life of our water district."
      breadcrumb={[{ label: "Home", href: "/" }, { label: "Events" }]} />
    <div className="relative isolate overflow-hidden bg-[#EEF4F8]">
    <TransparencyWaveBackground animated />
    <div className="relative z-10 mx-auto max-w-7xl space-y-8 px-4 py-10 sm:space-y-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <section aria-labelledby="featured-event-title" className="grid overflow-hidden rounded-3xl border border-[#C4DAE7] bg-white shadow-[0_12px_40px_rgba(35,82,110,0.12)] md:grid-cols-2">
        <div className="relative min-h-64 md:min-h-96">
          <Image src={featured.image} alt="TMCWD fire drill during its 2019 disaster preparedness activities" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
        </div>
        <div className="flex flex-col items-start justify-center p-6 sm:p-10 lg:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#087FB8]">Featured from the archive</p>
          <p className="mt-5 text-sm text-[#52616B]">{featured.year} / {featured.category}</p>
          <h2 id="featured-event-title" className="mt-3 font-heading text-3xl font-semibold leading-tight tracking-tight text-[#087FB8] lg:text-4xl">{featured.title}</h2>
          <p className="mt-5 text-sm leading-7 text-[#52616B]">{featured.description}</p>
          <Link href={`/gallery/#${featured.albumId}`} className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#087FB8] px-5 py-3 text-sm font-semibold text-white hover:bg-[#066B9C] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087FB8]">View photos <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
      </section>

      <EventsArchive events={districtEvents} />
    </div>
    </div>
  </>;
}
