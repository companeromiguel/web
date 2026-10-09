"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en-PH">
      <body>
        <div className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden bg-[#0a2a4a]">

          {/* ── Animated water background ── */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a3a] via-[#2d1060] to-[#370A77]" />

            {/* Bubbles */}
            <div className="absolute left-[15%] bottom-0 w-3 h-3 rounded-full bg-white/10 animate-[bubble1_6s_ease-in_infinite]" />
            <div className="absolute left-[35%] bottom-0 w-2 h-2 rounded-full bg-white/10 animate-[bubble2_8s_ease-in_1.5s_infinite]" />
            <div className="absolute left-[55%] bottom-0 w-4 h-4 rounded-full bg-white/10 animate-[bubble1_7s_ease-in_3s_infinite]" />
            <div className="absolute left-[75%] bottom-0 w-2 h-2 rounded-full bg-white/10 animate-[bubble2_9s_ease-in_0.5s_infinite]" />
            <div className="absolute left-[88%] bottom-0 w-3 h-3 rounded-full bg-white/10 animate-[bubble1_5s_ease-in_2s_infinite]" />

            {/* Waves */}
            <svg className="absolute bottom-0 left-0 w-[200%] animate-[wave-slow_8s_linear_infinite]" viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,120 L0,120 Z" fill="rgba(255,255,255,0.06)" />
            </svg>
            <svg className="absolute bottom-0 left-0 w-[200%] animate-[wave-fast_5s_linear_infinite]" viewBox="0 0 1440 90" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,45 C180,80 360,10 540,45 C720,80 900,10 1080,45 C1260,80 1440,10 1440,45 L1440,90 L0,90 Z" fill="rgba(255,255,255,0.04)" />
            </svg>
            <svg className="absolute bottom-0 left-0 w-[200%] animate-[wave-mid_6.5s_linear_0.5s_infinite]" viewBox="0 0 1440 70" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,35 C360,65 720,5 1080,35 C1260,50 1380,25 1440,35 L1440,70 L0,70 Z" fill="rgba(55,10,119,0.12)" />
            </svg>
          </div>

          {/* ── Content ── */}
          <div className="relative z-10 flex flex-col items-center text-center px-6">

            {/* 500 */}
            <h1
              className="font-bold leading-none text-white/90 tracking-tight"
              style={{
                fontFamily: "var(--font-source-serif), Georgia, serif",
                fontSize: "clamp(8rem, 25vw, 20rem)",
                textShadow: "0 0 60px rgba(55,10,119,0.8)",
              }}
            >
              500
            </h1>

            <p className="mt-2 text-lg sm:text-xl font-semibold text-white/80">
              Something went wrong on our end.
            </p>
            <p className="mt-2 text-sm text-white/45 max-w-xs">
              Our team has been notified. Please try again in a moment.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={reset}
                className="inline-flex items-center gap-2 rounded-full bg-[#370A77] hover:bg-[#4a0ea0] border border-white/20 px-7 py-3 text-sm font-semibold text-white transition-colors shadow-lg shadow-[#370A77]/40"
              >
                ↻ Try Again
              </button>
              <a
                href="/"
                className="inline-flex items-center gap-2 rounded-full bg-[#0591D4] hover:bg-[#0480bc] px-7 py-3 text-sm font-semibold text-white transition-colors shadow-lg shadow-[#0591D4]/30"
              >
                ← Back to Home
              </a>
            </div>

            <p className="mt-6 text-xs text-white/20">
              Trece Martires City Water District
            </p>
          </div>

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
            @keyframes wave-slow {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            @keyframes wave-fast {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            @keyframes wave-mid {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}</style>
        </div>
      </body>
    </html>
  );
}
