"use client";

import { useEffect, useRef, useState } from "react";

/* ── Founding date — update if exact date changes ── */
const FOUNDED = new Date("1998-07-17T00:00:00");

interface Stat {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
}

const stats: Stat[] = [
  { value: 33,    suffix: "",   label: "Barangays Served"   },
  { value: 24000, suffix: "+",  label: "Active Connections" },
  { value: 24,    suffix: "/7", label: "Emergency Response" },
];

/* ── Years elapsed since founding ── */
function useYearsOfService() {
  const [years, setYears] = useState(0);

  useEffect(() => {
    function calc() {
      const now = new Date();
      let y = now.getFullYear() - FOUNDED.getFullYear();
      // subtract 1 if anniversary hasn't occurred yet this year
      const anniversary = new Date(now.getFullYear(), FOUNDED.getMonth(), FOUNDED.getDate());
      if (now < anniversary) y--;
      setYears(y);
    }
    calc();
  }, []);

  return years;
}

/* ── Years of Service tile ── */
function ServiceTimer() {
  const years = useYearsOfService();

  return (
    <div className="flex flex-col items-center text-center px-4 py-5">
      <span className="font-heading text-3xl sm:text-4xl font-bold text-[#370A77] leading-none tabular-nums">
        {years}<span className="text-[#0591D4]">+</span>
      </span>
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
    <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 mb-12">
      <ServiceTimer />
      {stats.map((stat) => (
        <StatItem key={stat.label} stat={stat} animate={animate} />
      ))}
    </div>
  );
}
