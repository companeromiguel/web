"use client";

import { useEffect, useRef, useState } from "react";

/* ── Change this to the exact TMCWD founding date/time ── */
const FOUNDED = new Date("1998-07-17T00:00:00");

interface Stat {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
}

const stats: Stat[] = [
  {
    value: 33,
    suffix: "",
    label: "Barangays Served",
  },
  {
    value: 24000,
    suffix: "+",
    label: "Active Connections",
  },
  {
    value: 24,
    suffix: "/7",
    label: "Emergency Response",
  },
];

/* ── Elapsed time breakdown from FOUNDED to now ── */
function useElapsed() {
  const [elapsed, setElapsed] = useState({ yy: 0, mo: 0, dd: 0, hh: 0, mm: 0, ss: 0 });

  useEffect(() => {
    function calc() {
      const now = new Date();

      let years  = now.getFullYear() - FOUNDED.getFullYear();
      let months = now.getMonth()    - FOUNDED.getMonth();
      let days   = now.getDate()     - FOUNDED.getDate();
      let hours  = now.getHours()    - FOUNDED.getHours();
      let mins   = now.getMinutes()  - FOUNDED.getMinutes();
      let secs   = now.getSeconds()  - FOUNDED.getSeconds();

      if (secs  < 0) { secs  += 60; mins--; }
      if (mins  < 0) { mins  += 60; hours--; }
      if (hours < 0) { hours += 24; days--; }
      if (days  < 0) {
        months--;
        // days in the previous month
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
      }
      if (months < 0) { months += 12; years--; }

      setElapsed({ yy: years, mo: months, dd: days, hh: hours, mm: mins, ss: secs });
    }

    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, []);

  return elapsed;
}

/* ── Pad a number to 2 digits ── */
function pad(n: number) {
  return String(n).padStart(2, "0");
}

/* ── Live service duration tile ── */
function ServiceTimer() {
  const { yy, mo, dd, hh, mm, ss } = useElapsed();

  return (
    <div className="flex flex-col items-center text-center px-4 py-5">
      {/* Timer display */}
      <div className="font-heading font-bold text-[#370A77] leading-none tabular-nums">
        {/* Years — larger */}
        <span className="text-3xl sm:text-4xl">{yy}</span>
        <span className="text-xl sm:text-2xl text-[#0591D4]">y </span>
        <span className="text-2xl sm:text-3xl">{pad(mo)}</span>
        <span className="text-lg sm:text-xl text-[#0591D4]">m </span>
        <span className="text-2xl sm:text-3xl">{pad(dd)}</span>
        <span className="text-lg sm:text-xl text-[#0591D4]">d</span>
        {/* Time on second line */}
        <div className="text-xl sm:text-2xl mt-0.5">
          <span>{pad(hh)}</span>
          <span className="text-[#0591D4]">h </span>
          <span>{pad(mm)}</span>
          <span className="text-[#0591D4]">m </span>
          <span>{pad(ss)}</span>
          <span className="text-[#0591D4]">s</span>
        </div>
      </div>
      <span className="mt-2 text-xs font-medium uppercase tracking-[0.12em] text-[#2A2A29]/50 leading-tight">
        Years of Service
      </span>
    </div>
  );
}

/* ── Count-up animation hook ── */
function useCountUp(target: number, decimals = 0, duration = 1800, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
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
    <div
      ref={ref}
      className="grid grid-cols-2 lg:grid-cols-4 mb-12"
    >
      {/* Live timer occupies the first slot */}
      <ServiceTimer />

      {/* Regular count-up stats */}
      {stats.map((stat) => (
        <StatItem key={stat.label} stat={stat} animate={animate} />
      ))}
    </div>
  );
}
