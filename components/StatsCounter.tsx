"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const govLogos = [
  { src: "/gov.ph.png",                        alt: "gov.ph",                href: "https://www.gov.ph/",          label: "gov.ph",             internal: false },
  { src: "/bago.ph.png",                       alt: "Bagong Pilipinas",       href: "https://www.officialgazette.gov.ph/2023/07/03/memorandum-circular-no-24-s-2023/", label: "Bagong Pilipinas", internal: false },
  { src: "/transparency-seal-square_orig.png", alt: "Transparency Seal",      href: "/transparency/seal/",          label: "Transparency Seal",  internal: true  },
  { src: "/foi.png",                           alt: "Freedom of Information",  href: "https://www.foi.gov.ph/",     label: "FOI",                internal: false },
];

// Created March 26, 1997; LWUA recognition followed July 17, 1998.
// Source: https://tmcwaterdistrict.weebly.com/history-of-tmcwd.html
const ESTABLISHED_YEAR = 1997;

// Unique key stored in Redis — not used client-side anymore but kept for reference
// const VISIT_COUNTER_KEY = "tmcwd-website-visits-2025";

interface Stat {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
}

const stats: Stat[] = [
  // City geography, not a claim about TMCWD service coverage.
  // Source: https://trecemartirescity.gov.ph/history/
  { value: 13,    suffix: "",  label: "Barangays in Trece Martires City" },
  { value: 36000, suffix: "+", label: "Active Connections" },
];

function useCountUp(target: number, decimals = 0, duration = 1800, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start || target === 0) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((eased * target).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, decimals, duration, start]);

  return count;
}

function StatItem({ stat, animate }: { stat: Stat; animate: boolean }) {
  const count = useCountUp(stat.value, stat.decimals ?? 0, 1800, animate);
  const display = stat.decimals ? count.toFixed(stat.decimals) : Math.round(count).toLocaleString();

  return (
    <div className="flex flex-col items-center text-center px-4 py-5">
      <span className="font-heading text-3xl sm:text-4xl font-bold text-[#370A77] leading-none tabular-nums">
        {display}
        <span className="text-[#0591D4]">{stat.suffix}</span>
      </span>
      <span className="mt-2 text-xs font-medium uppercase tracking-[0.12em] text-[#2A2A29]/50 leading-tight">
        {stat.label}
      </span>
    </div>
  );
}

function VisitCounterItem({ animate }: { animate: boolean }) {
  const [visits, setVisits] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    fetch("/api/visit")
      .then((res) => res.json())
      .then((data: { value?: number }) => {
        const count = data.value ?? 0;
        if (count > 0) {
          setVisits(count);
          setLoaded(true);
        }
      })
      .catch(() => {
        // Silently fail — don't break the page if Redis is unreachable
      });
  }, []);

  const count = useCountUp(visits, 0, 1800, animate && loaded);
  const display = Math.round(count).toLocaleString();

  return (
    <div className="flex flex-col items-center text-center px-4 py-5">
      <span className="font-heading text-3xl sm:text-4xl font-bold text-[#370A77] leading-none tabular-nums">
        {loaded ? display : <span className="text-[#2A2A29]/30">—</span>}
      </span>
      <span className="mt-2 text-xs font-medium uppercase tracking-[0.12em] text-[#2A2A29]/50 leading-tight">
        Visits
      </span>
    </div>
  );
}

export default function StatsCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="mb-12">

      {/* ── Government logos ─────────────────────────────────────── */}
      <div className="bg-[#DEEEFA]/40
                      mx-[calc(-50vw+50%)] w-screen flex justify-evenly items-center flex-wrap py-4">
        {govLogos.map(({ src, alt, href, label, internal }) => (
          internal ? (
            <Link
              key={src}
              href={href}
              className="flex flex-col items-center gap-1.5 shrink-0 group"
              aria-label={alt}
            >
              <Image
                src={src}
                alt={alt}
                width={80}
                height={80}
                className="size-20 object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-150"
              />
            </Link>
          ) : (
            <a
              key={src}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5 shrink-0 group"
              aria-label={alt}
            >
              <Image
                src={src}
                alt={alt}
                width={80}
                height={80}
                className="size-20 object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-150"
              />
              {label === "gov.ph" && (
                <span className="text-xs font-semibold text-[#370A77]/70 group-hover:text-[#370A77] transition-colors">
                  {label}
                </span>
              )}
            </a>
          )
        ))}
      </div>

      {/* ── Stats grid ───────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col items-center text-center px-4 py-5">
          <span className="font-heading text-3xl sm:text-4xl font-bold text-[#370A77] leading-none tabular-nums">
            {ESTABLISHED_YEAR}
          </span>
          <span className="mt-2 text-xs font-medium uppercase tracking-[0.12em] text-[#2A2A29]/50 leading-tight">
            Established
          </span>
        </div>
        {stats.map((stat) => (
          <StatItem key={stat.label} stat={stat} animate={animate} />
        ))}
        <VisitCounterItem animate={animate} />
      </div>

    </div>
  );
}
