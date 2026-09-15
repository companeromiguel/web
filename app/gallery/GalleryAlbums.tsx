"use client";

import Image from "next/image";
import { ChevronDown, Images, X } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import styles from "./GalleryAlbums.module.css";

export interface GalleryImage { src: string; alt: string; }
export interface GallerySection { id: string; title: string; images: GalleryImage[]; }

const filters = ["All", "2019", "2018", "2017", "Earlier"] as const;
const albumYear = (title: string) => title.match(/\b(20\d{2})\b/)?.[1] ?? "Archive";
const displayTitle = (title: string) => title.replace(/^20\d{2}\s+/, "");

export default function GalleryAlbums({ sections }: { sections: GallerySection[] }) {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [openId, setOpenId] = useState<string | null>(null);
  const panelRef = useRef<HTMLElement>(null);
  const sorted = useMemo(() => [...sections].sort((a, b) => (Number(albumYear(b.title)) || 0) - (Number(albumYear(a.title)) || 0)), [sections]);
  const visible = sorted.filter((album) => filter === "All" || (filter === "Earlier" ? albumYear(album.title) === "Archive" || Number(albumYear(album.title)) < 2017 : albumYear(album.title) === filter));
  const openAlbum = sections.find((album) => album.id === openId);

  const open = (id: string) => {
    setOpenId(id);
    requestAnimationFrame(() => panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  return <>
    <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div><p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#43738D]">TMCWD through the years</p><h2 className="mt-2 font-heading text-2xl font-semibold tracking-tight text-[#087FB8]">Photo albums</h2></div>
      <p className="text-xs text-[#52616B]">{sections.length} albums · {sections.reduce((sum, album) => sum + album.images.length, 0)} photos</p>
    </div>

    <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter albums by year">
      {filters.map((item) => <button key={item} type="button" aria-pressed={filter === item} onClick={() => { setFilter(item); setOpenId(null); }} className={`cursor-pointer rounded-full border px-4 py-2 text-xs font-medium transition-colors ${filter === item ? "border-[#0591D4] bg-[#0591D4] text-white" : "border-[#BBD6E5] bg-white/70 text-[#31576E] hover:border-[#0591D4]"}`}>{item}</button>)}
    </div>

    {openAlbum && <section ref={panelRef} aria-labelledby="open-album-title" className="mb-10 scroll-mt-24 rounded-2xl border border-white/80 bg-white/90 p-5 shadow-[0_12px_40px_rgba(35,82,110,0.10)] backdrop-blur-sm sm:p-7">
      <div className="mb-6 flex items-start justify-between gap-5">
        <div><p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#43738D]">{albumYear(openAlbum.title)} · {openAlbum.images.length} photos</p><h2 id="open-album-title" className="mt-2 font-heading text-2xl font-semibold text-[#294C61]">{displayTitle(openAlbum.title)}</h2></div>
        <button type="button" onClick={() => setOpenId(null)} aria-label="Close album" className="inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#C7DCE8] p-0 leading-none text-[#31576E] hover:border-[#0591D4] hover:text-[#0591D4]"><X className="block shrink-0" size={18} aria-hidden="true" /></button>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {openAlbum.images.map((image, index) => <figure key={image.src} className="relative overflow-hidden rounded-xl bg-[#DDEBF3]" style={{ aspectRatio: "4 / 3" }}><Image src={image.src} alt={image.alt} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" className="object-cover" /><figcaption className="sr-only">Photo {index + 1} of {openAlbum.images.length}</figcaption></figure>)}
      </div>
    </section>}

    <ol className="grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
      {visible.map((album) => { const cover = album.images[0]; const expanded = album.id === openId; return <li key={album.id}>
        <button type="button" onClick={() => expanded ? setOpenId(null) : open(album.id)} aria-expanded={expanded} className="group block h-full w-full cursor-pointer overflow-hidden rounded-2xl border border-white/80 bg-white/90 text-left shadow-[0_10px_35px_rgba(35,82,110,0.08)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(35,82,110,0.14)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0591D4]">
          <div className="relative overflow-hidden bg-[#DDEBF3]" style={{ aspectRatio: "4 / 3" }}>{cover && <Image src={cover.src} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />}<span className={styles.yearBadge}>{albumYear(album.title)}</span></div>
          <div className="p-5 sm:p-6"><p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#4B7186]">TMCWD photo album</p><h3 className="mt-2 font-heading text-lg font-semibold leading-snug text-[#294C61]">{displayTitle(album.title)}</h3><div className="mt-4 flex items-center justify-between gap-4 text-xs text-[#52616B]"><span className="inline-flex items-center gap-1.5"><Images size={14} aria-hidden="true" />{album.images.length} photos</span><span className="inline-flex items-center gap-1 text-[#087FB8]">View album <ChevronDown className={`transition-transform ${expanded ? "rotate-180" : ""}`} size={15} aria-hidden="true" /></span></div></div>
        </button>
      </li>; })}
    </ol>
  </>;
}
