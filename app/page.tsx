import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Trece Martires City Water District",
  description:
    "Official website of the Trece Martires City Water District — providing safe, reliable water service to Trece Martires City, Cavite.",
};

const quickLinks = [
  {
    title: "Water Quality",
    description: "Consumer Confidence Report and latest test results.",
    href: "/water-quality/",
  },
  {
    title: "Transparency",
    description: "Full Disclosure Policy, procurement plans, financial reports.",
    href: "/transparency/",
  },
  {
    title: "Citizen's Charter",
    description: "Service standards, turnaround times, how to file a complaint.",
    href: "/transparency/#citizens-charter",
  },
  {
    title: "Board Meetings",
    description: "Agendas, minutes, and resolutions from Board sessions.",
    href: "/board-meetings/",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Skip link ─────────────────────────────────────────── */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:text-[#370A77] focus:px-4 focus:py-2 focus:text-sm focus:shadow-md focus:outline-none"
      >
        Skip to main content
      </a>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        aria-labelledby="hero-heading"
        className="hero-section relative text-white overflow-hidden min-h-screen flex flex-col"
        style={{
          backgroundImage: "url('/bgv2.jpg')",
          backgroundSize: "cover",
        }}
      >
        {/* Dark contrast overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#370A77]/75 via-[#1a0a3d]/65 to-[#0591D4]/40"
          aria-hidden="true"
        />

        <div className="relative w-full px-4 sm:px-6 lg:px-8 pt-28 pb-16 lg:pt-32 lg:pb-20 flex flex-col min-h-[inherit]">

          {/* Bottom-right: headline + tagline + CTA */}
          <div className="absolute bottom-8 right-4 sm:right-6 lg:right-8 text-right max-w-sm">
            <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight tracking-tight mb-3">
              Serbisyong Malinis,<br />Tapat, at Maaasahan.
            </h1>
            <p className="text-sm text-white/70 leading-relaxed mb-6">
              Magandang serbisyo&apos;y maipagkakaloob, lalo na&apos;t kaagapay mamamayan ng lungsod
            </p>
            <div className="flex flex-wrap gap-3 items-center justify-end">
              <Link
                href="/contact/"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                Contact us →
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ── Quick actions ────────────────────────────────────── */}
      <section aria-label="Quick actions" className="bg-[#EEF4F8] border-b border-[#D6E6F0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ul className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#D6E6F0] list-none p-0">

            {/* Pay Bill */}
            <li>
              <Link
                href="/contact/"
                className="group flex flex-col items-center gap-3 py-7 px-4 hover:bg-[#E2EEF5] transition-colors text-center"
              >
                <span className="flex items-center justify-center size-12 rounded-full bg-[#DEEEFA] group-hover:bg-[#0591D4]/15 transition-colors">
                  <svg className="size-6 text-[#0591D4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                  </svg>
                </span>
                <span className="text-sm font-medium text-[#2A2A29] group-hover:text-[#0591D4] transition-colors">
                  Pay Bill
                </span>
              </Link>
            </li>

            {/* Report a Leak / Outage */}
            <li>
              <Link
                href="/contact/"
                className="group flex flex-col items-center gap-3 py-7 px-4 hover:bg-[#E2EEF5] transition-colors text-center"
              >
                <span className="flex items-center justify-center size-12 rounded-full bg-[#DEEEFA] group-hover:bg-[#0591D4]/15 transition-colors">
                  <svg className="size-6 text-[#0591D4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                  </svg>
                </span>
                <span className="text-sm font-medium text-[#2A2A29] group-hover:text-[#0591D4] transition-colors">
                  Report a Leak / Outage
                </span>
              </Link>
            </li>

            {/* Service Application */}
            <li>
              <Link
                href="/contact/"
                className="group flex flex-col items-center gap-3 py-7 px-4 hover:bg-[#E2EEF5] transition-colors text-center"
              >
                <span className="flex items-center justify-center size-12 rounded-full bg-[#DEEEFA] group-hover:bg-[#0591D4]/15 transition-colors">
                  <svg className="size-6 text-[#0591D4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                  </svg>
                </span>
                <span className="text-sm font-medium text-[#2A2A29] group-hover:text-[#0591D4] transition-colors">
                  Service Application
                </span>
              </Link>
            </li>

            {/* Water Advisory */}
            <li>
              <Link
                href="/news/"
                className="group flex flex-col items-center gap-3 py-7 px-4 hover:bg-[#E2EEF5] transition-colors text-center"
              >
                <span className="flex items-center justify-center size-12 rounded-full bg-[#DEEEFA] group-hover:bg-[#0591D4]/15 transition-colors">
                  <svg className="size-6 text-[#0591D4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                  </svg>
                </span>
                <span className="text-sm font-medium text-[#2A2A29] group-hover:text-[#0591D4] transition-colors">
                  Water Advisory
                </span>
              </Link>
            </li>

          </ul>
        </div>
      </section>

      {/* ── Quick access ─────────────────────────────────────── */}
      <section aria-labelledby="quicklinks-heading" className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <h2
            id="quicklinks-heading"
            className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-[#2A2A29]/40 mb-8"
          >
            Services &amp; Information
          </h2>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 list-none p-0">
            {quickLinks.map(({ title, description, href }, i) => (
              <li key={href}>
                <Link href={href} className="group block">
                  <span className="block text-[11px] text-[#2A2A29]/35 font-mono mb-3 tabular-nums">
                    0{i + 1}
                  </span>
                  <span className="block font-heading text-base font-semibold text-[#370A77] group-hover:text-[#0591D4] transition-colors leading-snug">
                    {title}
                  </span>
                  <span className="block mt-2 text-sm text-[#2A2A29]/60 leading-relaxed">
                    {description}
                  </span>
                  <span
                    className="block mt-4 w-6 h-px bg-[#0591D4] group-hover:w-10 transition-all duration-200"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── About ────────────────────────────────────────────── */}
      <section aria-labelledby="about-heading" className="bg-[#3B9FD8] relative overflow-hidden">

        {/* Water splash wave animation */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {/* Wave 1 — main splash, slower */}
          <svg
            className="absolute bottom-0 left-0 w-[200%] h-24 animate-wave-slow"
            viewBox="0 0 1440 96"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,48 C180,96 360,0 540,48 C720,96 900,0 1080,48 C1260,96 1440,0 1440,48 L1440,96 L0,96 Z"
              fill="rgba(255,255,255,0.08)"
            />
          </svg>
          {/* Wave 2 — faster, offset */}
          <svg
            className="absolute bottom-0 left-0 w-[200%] h-16 animate-wave-fast"
            viewBox="0 0 1440 64"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,32 C120,64 240,0 360,32 C480,64 600,0 720,32 C840,64 960,0 1080,32 C1200,64 1320,0 1440,32 L1440,64 L0,64 Z"
              fill="rgba(255,255,255,0.06)"
            />
          </svg>
          {/* Wave 3 — top ripple */}
          <svg
            className="absolute top-0 left-0 w-[200%] h-12 animate-wave-mid"
            viewBox="0 0 1440 48"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,24 C240,48 480,0 720,24 C960,48 1200,0 1440,24 L1440,0 L0,0 Z"
              fill="rgba(0,80,140,0.15)"
            />
          </svg>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative z-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-start">

            <div className="lg:col-span-4">
              <h2
                id="about-heading"
                className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-white/60 mb-2"
              >
                About TMCWD
              </h2>
              <Link
                href="/transparency/"
                className="mt-4 inline-block text-xs font-medium text-white/80 hover:text-white hover:underline"
              >
                Public disclosures →
              </Link>
            </div>

            <div className="mt-8 lg:mt-0 lg:col-span-8 text-sm text-white/85 space-y-4 leading-relaxed max-w-2xl">
              <p>
                The Trece Martires City Water District (TMCWD) is a
                government-owned and controlled corporation created under
                Presidential Decree No. 198, the{" "}
                <em>Provincial Water Utilities Act of 1973</em>.
              </p>
              <p>
                [ADD: Brief history, service area description, and mandate
                statement.]
              </p>
              <p>
                The district is governed by a Board of Directors appointed by
                the Local Water Utilities Administration (LWUA) and is committed
                to the delivery of safe, adequate, and affordable water to every
                household within its franchise area.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── Announcements ────────────────────────────────────── */}
      <section aria-labelledby="news-heading" className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">

          <div className="flex items-center justify-between mb-10">
            <h2
              id="news-heading"
              className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-[#2A2A29]/40"
            >
              Announcements
            </h2>
            <Link href="/news/" className="text-xs font-medium text-[#0591D4] hover:underline">
              All →
            </Link>
          </div>

          <ul className="divide-y divide-[#E8EEF2] list-none p-0">
            {[1, 2, 3].map((n) => (
              <li
                key={n}
                className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8 py-5"
              >
                <time
                  className="shrink-0 text-xs text-[#2A2A29]/35 w-28 tabular-nums"
                  dateTime="2026-01-01"
                >
                  [DATE]
                </time>
                <div>
                  <p className="text-sm font-medium text-[#2A2A29]">
                    [ADD: Announcement headline #{n}]
                  </p>
                  <p className="mt-1 text-sm text-[#2A2A29]/55">
                    [ADD: One-sentence summary.]
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
