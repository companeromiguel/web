import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found – TMCWD",
};

export default function NotFound() {
  return (
    <div className="fixed inset-0 pt-[72px] flex flex-col items-center justify-center overflow-hidden bg-[#0a2a4a]">

      {/* ── Animated water background ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">

        {/* Deep gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a2a4a] via-[#0d3d6e] to-[#0a5a8a]" />

        {/* Bubble 1 */}
        <div className="absolute left-[15%] bottom-0 w-3 h-3 rounded-full bg-white/10 animate-[bubble1_6s_ease-in_infinite]" />
        {/* Bubble 2 */}
        <div className="absolute left-[35%] bottom-0 w-2 h-2 rounded-full bg-white/10 animate-[bubble2_8s_ease-in_1.5s_infinite]" />
        {/* Bubble 3 */}
        <div className="absolute left-[55%] bottom-0 w-4 h-4 rounded-full bg-white/10 animate-[bubble1_7s_ease-in_3s_infinite]" />
        {/* Bubble 4 */}
        <div className="absolute left-[75%] bottom-0 w-2 h-2 rounded-full bg-white/10 animate-[bubble2_9s_ease-in_0.5s_infinite]" />
        {/* Bubble 5 */}
        <div className="absolute left-[88%] bottom-0 w-3 h-3 rounded-full bg-white/10 animate-[bubble1_5s_ease-in_2s_infinite]" />

        {/* Wave 1 — slow */}
        <svg className="absolute bottom-0 left-0 w-[200%] animate-[wave-slow_8s_linear_infinite]" viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,120 L0,120 Z" fill="rgba(255,255,255,0.06)" />
        </svg>
        {/* Wave 2 — faster, offset */}
        <svg className="absolute bottom-0 left-0 w-[200%] animate-[wave-fast_5s_linear_infinite]" viewBox="0 0 1440 90" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,45 C180,80 360,10 540,45 C720,80 900,10 1080,45 C1260,80 1440,10 1440,45 L1440,90 L0,90 Z" fill="rgba(255,255,255,0.04)" />
        </svg>
        {/* Wave 3 — mid */}
        <svg className="absolute bottom-0 left-0 w-[200%] animate-[wave-mid_6.5s_linear_0.5s_infinite]" viewBox="0 0 1440 70" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,35 C360,65 720,5 1080,35 C1260,50 1380,25 1440,35 L1440,70 L0,70 Z" fill="rgba(5,145,212,0.08)" />
        </svg>

      </div>

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">

        {/* 404 */}
        <h1 className="font-heading font-bold leading-none text-white/90 tracking-tight"
          style={{ fontSize: "clamp(8rem, 25vw, 20rem)", textShadow: "0 0 60px rgba(5,145,212,0.7)" }}>
          404
        </h1>

        <p className="mt-2 text-lg sm:text-xl font-semibold text-white/80">
          This page is underwater.
        </p>
        <p className="mt-2 text-sm text-white/45 max-w-xs">
          The page you're looking for couldn't be found. It may have been moved or no longer exists.
        </p>

        {/* CTA */}
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0591D4] hover:bg-[#0480bc] px-7 py-3 text-sm font-semibold text-white transition-colors shadow-lg shadow-[#0591D4]/30"
        >
          ← Back to Home
        </Link>

        {/* Subtle branding */}
        <p className="mt-6 text-xs text-white/20">
          Trece Martires City Water District
        </p>

      </div>

      {/* ── Keyframe styles ── */}
      <style>{`
        @keyframes bubble1 {
          0%   { transform: translateY(0) scale(1);   opacity: 0.15; }
          50%  { opacity: 0.25; }
          100% { transform: translateY(-100vh) scale(1.4); opacity: 0; }
        }
        @keyframes bubble2 {
          0%   { transform: translateY(0) scale(1);   opacity: 0.1; }
          50%  { opacity: 0.2; }
          100% { transform: translateY(-100vh) scale(1.2); opacity: 0; }
        }
      `}</style>

    </div>
  );
}
