"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { DistrictEvent } from "@/lib/events";

export default function EventsArchive({ events }: { events: DistrictEvent[] }) {
  const [year, setYear] = useState("All");
  const [category, setCategory] = useState("All");
  const years = [...new Set(events.map((event) => event.year))].sort().reverse();
  const categories = [...new Set(events.map((event) => event.category))].sort();
  const visible = events.filter((event) => (year === "All" || event.year === year) && (category === "All" || event.category === category));
  const selectClass = "mt-2 block w-full min-w-0 rounded-xl border border-[#BBD6E5] bg-[#F5FAFD] px-3 py-3 text-sm text-[#294C61] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087FB8] sm:w-44";

  return <section aria-labelledby="past-events-title" className="space-y-6">
    <div className="flex flex-col gap-6 rounded-2xl border border-[#C4DAE7] bg-white p-6 shadow-[0_6px_24px_rgba(35,82,110,0.08)] sm:p-8 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#43738D]">TMCWD through the years</p>
        <h2 id="past-events-title" className="mt-2 font-heading text-3xl font-semibold tracking-tight text-[#087FB8]">Past activities</h2>
        <p className="mt-3 text-sm leading-6 text-[#52616B]">Explore community programs and district milestones from our photo archive.</p>
      </div>
      <div className="grid shrink-0 grid-cols-1 gap-4 min-[360px]:grid-cols-2">
        <label className="text-xs font-semibold text-[#43738D]">Year<select className={selectClass} value={year} onChange={(event) => setYear(event.target.value)}><option value="All">All years</option>{years.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="text-xs font-semibold text-[#43738D]">Category<select className={selectClass} value={category} onChange={(event) => setCategory(event.target.value)}><option value="All">All categories</option>{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
      </div>
    </div>
    <p role="status" className="text-xs font-medium text-[#43738D]">{visible.length} {visible.length === 1 ? "activity" : "activities"}</p>
    {visible.length ? <ul className="grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
      {visible.map((event) => <li key={event.albumId}>
        <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#C4DAE7] bg-white shadow-[0_8px_24px_rgba(35,82,110,0.10)] transition-[border-color,box-shadow] duration-200 hover:border-[#83B8D5] hover:shadow-[0_14px_32px_rgba(35,82,110,0.16)]">
          <div className="relative aspect-[4/3] overflow-hidden bg-[#EAF5FB]">
            <Image src={event.image} alt={event.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" />
            <time dateTime={event.year} className="absolute left-4 top-4 rounded-full border border-white/80 bg-white px-3 py-1.5 shadow-sm text-xs font-semibold text-[#294C61]">{event.year}</time>
          </div>
          <div className="flex flex-1 flex-col p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#087FB8]">{event.category}</p>
            <h3 className="mt-2 font-heading text-xl font-semibold leading-snug text-[#087FB8]">{event.title}</h3>
            <p className="mb-6 mt-3 text-sm leading-6 text-[#52616B]">{event.description}</p>
            <Link href={`/gallery/#${event.albumId}`} aria-label={`View photos: ${event.title}`} className="mt-auto inline-flex w-full items-center justify-between gap-2 border-t border-[#E0EBF2] pt-4 text-sm font-semibold text-[#087FB8] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087FB8]">View photos <ArrowUpRight size={16} aria-hidden="true" /></Link>
          </div>
        </article>
      </li>)}
    </ul> : <div className="rounded-2xl border border-dashed border-[#9DBFD3] bg-white shadow-sm px-6 py-12 text-center">
      <p className="text-sm text-[#52616B]">No activities match this year and category.</p>
      <button type="button" onClick={() => { setYear("All"); setCategory("All"); }} className="mt-4 cursor-pointer text-sm font-semibold text-[#087FB8] hover:underline">Clear filters</button>
    </div>}
  </section>;
}
