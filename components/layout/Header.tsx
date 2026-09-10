"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { primaryNav } from "@/lib/nav";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">

      {/* ── Main bar ─────────────────────────────────────────── */}
      <div
        className={[
          "backdrop-blur-2xl transition-all duration-500",
          scrolled ? "bg-[#1a6a9a]/75" : "bg-white/5",
        ].join(" ")}
      >
        <div
          className={[
            "w-full pl-2 pr-4 sm:pr-6 lg:pr-8 flex items-center transition-all duration-500",
            scrolled ? "h-14" : "h-[72px]",
          ].join(" ")}
        >
          {/* Wordmark */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image
              src="/logo.png"
              alt="TMCWD seal"
              width={52}
              height={52}
              className={[
                "shrink-0 transition-all duration-500",
                scrolled ? "size-8" : "size-[52px]",
              ].join(" ")}
              priority
            />
            <span
              className={[
                "font-semibold text-white tracking-tight transition-all duration-500",
                scrolled ? "text-sm" : "text-base",
              ].join(" ")}
            >
              Trece Martires City Water District
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            aria-label="Primary navigation"
            className="hidden lg:flex items-center gap-6 ml-auto"
          >
            {primaryNav.map(({ label, href }) => {
              const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "text-sm transition-colors duration-150 whitespace-nowrap",
                    active
                      ? "text-white font-medium"
                      : "text-white/60 hover:text-white/90 font-normal",
                  ].join(" ")}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden ml-auto text-white/70 hover:text-white transition-colors p-1"
          >
            {menuOpen ? (
              <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ──────────────────────────────────────── */}
      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          className="lg:hidden backdrop-blur-2xl bg-white/8 border-t border-white/10"
        >
          <ul className="w-full px-4 py-2 flex flex-col">
            {primaryNav.map(({ label, href }) => {
              const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={[
                      "block py-2.5 text-sm transition-colors border-b border-white/5 last:border-0",
                      active ? "text-white font-medium" : "text-white/60 hover:text-white",
                    ].join(" ")}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
