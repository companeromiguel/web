"use client";

import { useRef } from "react";
import Link from "next/link";
import AboutScroller from "./AboutScroller";

export default function AboutSection() {
  const leftColRef = useRef<HTMLDivElement>(null);

  return (
    <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-start">

      {/* ── Left column ── */}
      <div className="lg:col-span-4" ref={leftColRef}>

        {/* ── Mission & Vision cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
          <div className="rounded-xl bg-white/10 border border-white/20 px-4 py-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50 mb-2 flex items-center gap-1.5">
              <svg className="size-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
              Mission
            </p>
            <p className="text-sm text-white/85 leading-relaxed italic">
              &ldquo;To induce and directly persuade the clientele to actively participate in the responsibility of protecting and preserving the water resources of the City of Trece Martires.

              Motivate the people to properly utilize this precious nature&apos;s gift for the benefit of the Treceños now and beyond.

              The organization is amenable to uphold and conserve this valuable commodity as a relevant source of life.

              To serve the concessionaires with utmost sincerity, honesty, and prompt service.&rdquo;
            </p>
          </div>
          <div className="rounded-xl bg-white/10 border border-white/20 px-4 py-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50 mb-2 flex items-center gap-1.5">
              <svg className="size-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
              Vision
            </p>
            <p className="text-sm text-white/85 leading-relaxed italic">
              &ldquo;An institution perpetrated to provide the community a sufficient, reliable, sustainable, and affordable supply of drinkable water for the general well-being of the Treceños as its primary concern.&rdquo;
            </p>
          </div>
        </div>

        {/* ── About label ── */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-x-5 gap-y-2">
          <h2
            id="about-heading"
            className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-white/60"
          >
            About TMCWD
          </h2>
          <Link
            href="/about/"
            className="inline-flex min-h-10 items-center gap-1.5 whitespace-nowrap rounded text-xs font-medium text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            View full profile
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      {/* ── Right column: history scroller ── */}
      <div className="mt-8 lg:mt-0 lg:col-span-8 max-w-2xl">
        <AboutScroller syncRef={leftColRef} />
      </div>

    </div>
  );
}
