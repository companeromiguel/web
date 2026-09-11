import type { Metadata } from "next";
import Link from "next/link";
import AnnouncementsFeed from "@/components/AnnouncementsFeed";
import AboutScroller from "@/components/AboutScroller";

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
          backgroundImage: "url('/bgv4.png')",
          backgroundSize: "cover",
          backgroundPosition: "left center", /* mobile: show left side of image */
          opacity: 1, /* ← background section opacity (keep at 1, control bg via overlay below) */
        }}
      >
        {/* ─────────────────────────────────────────────────────────────
            HERO OVERLAY — tweak these two values to adjust the look:
              • bg-gray-[N]  → overlay shade: gray-700 = dark, gray-400 = mid, gray-100 = light
              • opacity-[N]  → overlay strength: 0 = invisible, 100 = fully opaque
            ───────────────────────────────────────────────────────────── */}
        <div
          className="absolute inset-0 bg-gray-700 opacity-60"
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
                className="group flex flex-row items-center gap-2.5 py-3.5 px-4 hover:bg-[#E2EEF5] transition-colors"
              >
                <span className="flex items-center justify-center size-8 rounded-full bg-[#DEEEFA] group-hover:bg-[#0591D4]/15 transition-colors shrink-0">
                  <svg className="size-4 text-[#0591D4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                  </svg>
                </span>
                <span className="text-xs font-medium text-[#2A2A29] group-hover:text-[#0591D4] transition-colors leading-tight">
                  Pay Bill
                </span>
              </Link>
            </li>

            {/* Report a Leak / Outage */}
            <li>
              <Link
                href="/contact/"
                className="group flex flex-row items-center gap-2.5 py-3.5 px-4 hover:bg-[#E2EEF5] transition-colors"
              >
                <span className="flex items-center justify-center size-8 rounded-full bg-[#DEEEFA] group-hover:bg-[#0591D4]/15 transition-colors shrink-0">
                  <svg className="size-4 text-[#0591D4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                  </svg>
                </span>
                <span className="text-xs font-medium text-[#2A2A29] group-hover:text-[#0591D4] transition-colors leading-tight">
                  Report a Leak / Outage
                </span>
              </Link>
            </li>

            {/* Service Application */}
            <li>
              <Link
                href="/contact/"
                className="group flex flex-row items-center gap-2.5 py-3.5 px-4 hover:bg-[#E2EEF5] transition-colors"
              >
                <span className="flex items-center justify-center size-8 rounded-full bg-[#DEEEFA] group-hover:bg-[#0591D4]/15 transition-colors shrink-0">
                  <svg className="size-4 text-[#0591D4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                  </svg>
                </span>
                <span className="text-xs font-medium text-[#2A2A29] group-hover:text-[#0591D4] transition-colors leading-tight">
                  Service Application
                </span>
              </Link>
            </li>

            {/* Water Advisory */}
            <li>
              <Link
                href="/news/"
                className="group flex flex-row items-center gap-2.5 py-3.5 px-4 hover:bg-[#E2EEF5] transition-colors"
              >
                <span className="flex items-center justify-center size-8 rounded-full bg-[#DEEEFA] group-hover:bg-[#0591D4]/15 transition-colors shrink-0">
                  <svg className="size-4 text-[#0591D4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                  </svg>
                </span>
                <span className="text-xs font-medium text-[#2A2A29] group-hover:text-[#0591D4] transition-colors leading-tight">
                  Water Advisory
                </span>
              </Link>
            </li>

          </ul>
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

          <AnnouncementsFeed />
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

            {/* Auto-scroll text container */}
            <div className="mt-8 lg:mt-0 lg:col-span-8 max-w-2xl">
              <AboutScroller />
            </div>

          </div>
        </div>
      </section>

      {/* ── Quick access ─────────────────────────────────────── */}
      <section aria-labelledby="quicklinks-heading" className="bg-[#EEF4F8]">
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

      {/* ── Find Us / Location ───────────────────────────────── */}
      <section aria-labelledby="location-heading" className="bg-[#3B9FD8] relative overflow-hidden">

        {/* ── Same three-wave animation as About TMCWD ── */}
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

            {/* Left label column — mirrors About TMCWD */}
            <div className="lg:col-span-4">
              <h2
                id="location-heading"
                className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-white/60 mb-2"
              >
                Find Us
              </h2>

              {/* Address block sits under the label on desktop */}
              <div className="mt-6 space-y-5 text-sm text-white/85 leading-relaxed">

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/45 mb-1">
                    Address
                  </p>
                  <address className="not-italic text-white/90 font-medium leading-snug">
                    Trece Martires City Water District<br />
                    2nd Floor, TMCWD Building<br />
                    Governor's Drive, Brgy. San Agustin<br />
                    Trece Martires City, Cavite 4109
                  </address>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/45 mb-1">
                    Office Hours
                  </p>
                  <p className="text-white/90">Monday – Friday, 8:00 AM – 5:00 PM</p>
                  <p className="text-xs text-white/50 mt-0.5">Closed on weekends &amp; public holidays</p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/45 mb-1">
                    Contact
                  </p>
                  <ul className="space-y-1 list-none p-0">
                    <li>
                      <a href="mailto:tmcwd@yahoo.com" className="text-white/85 hover:text-white hover:underline transition-colors">
                        tmcwd@yahoo.com
                      </a>
                    </li>
                    <li>
                      <a href="tel:[ADD-PHONE]" className="text-white/85 hover:text-white hover:underline transition-colors">
                        [ADD: Phone number]
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Get Directions CTA */}
                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <a
                    href="https://www.google.com/maps/place/Trece+Martires+City+Water+District/@14.2819697,120.8644118,17z"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-white/15 border border-white/30 backdrop-blur-sm px-4 py-2.5 text-xs font-semibold text-white hover:bg-white/25 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#3B9FD8]"
                  >
                    <svg className="size-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                    Get Directions
                  </a>
                  <Link
                    href="/contact/"
                    className="text-xs font-medium text-white/80 hover:text-white hover:underline transition-colors"
                  >
                    Contact page →
                  </Link>
                </div>

              </div>
            </div>

            {/* Right — embedded map
                 Stacks below info on mobile (mt-10), sits beside it on desktop (lg:col-span-8).
                 Height: 250px on mobile → 380px on lg+.
                 overflow-hidden on the wrapper clips to rounded corners without blocking
                 touch events — the iframe itself handles pinch-zoom and tap-to-open natively. */}
            <div className="mt-10 lg:mt-0 lg:col-span-8">
              <div className="w-full overflow-hidden rounded-2xl border border-white/20 shadow-lg h-[250px] lg:h-[380px]">
                <iframe
                  title="Trece Martires City Water District — Office Location"
                  /*
                   * CID 10092507030261381943 is the unique Google Business identifier
                   * for the TMCWD listing — this is the most reliable embed method,
                   * pinning exactly the verified business regardless of name/address changes.
                   */
                  src="https://maps.google.com/maps?cid=10092507030261381943&output=embed"
                  width="100%"
                  height="100%"
                  allow="geolocation; fullscreen"
                  style={{
                    border: 0,
                    display: "block",
                    /* touchAction auto ensures the browser doesn't suppress pinch-zoom
                       or tap gestures on touch devices. */
                    touchAction: "auto",
                    /* Blend the map into the blue section: light desaturation +
                       a gentle hue push toward brand cyan keeps it readable.   */
                    filter: "grayscale(15%) contrast(100%) saturate(120%) hue-rotate(185deg)",
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
