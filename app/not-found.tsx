import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found – TMCWD",
};

export default function NotFound() {
  return (
    <div className="fixed inset-0 pt-[72px] flex flex-col items-center justify-center overflow-hidden bg-[#0a2a4a]">

      {/* ── Deep water background ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a2a4a] via-[#0d3d6e] to-[#0a5a8a]" />

        {/* Rising bubbles */}
        <div className="absolute left-[8%]  bottom-0 w-2 h-2 rounded-full bg-white/10 animate-[bubble1_7s_ease-in_0s_infinite]" />
        <div className="absolute left-[22%] bottom-0 w-3 h-3 rounded-full bg-white/10 animate-[bubble2_9s_ease-in_1s_infinite]" />
        <div className="absolute left-[48%] bottom-0 w-2 h-2 rounded-full bg-white/10 animate-[bubble1_6s_ease-in_2.5s_infinite]" />
        <div className="absolute left-[68%] bottom-0 w-4 h-4 rounded-full bg-white/10 animate-[bubble2_8s_ease-in_0.5s_infinite]" />
        <div className="absolute left-[85%] bottom-0 w-2 h-2 rounded-full bg-white/10 animate-[bubble1_5s_ease-in_3s_infinite]" />

        {/* Floor waves */}
        <svg className="absolute bottom-0 left-0 w-[200%] animate-[waveSlide_8s_linear_infinite]" viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,120 L0,120 Z" fill="rgba(255,255,255,0.06)" />
        </svg>
        <svg className="absolute bottom-0 left-0 w-[200%] animate-[waveSlide_5s_linear_infinite]" viewBox="0 0 1440 90" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,45 C180,80 360,10 540,45 C720,80 900,10 1080,45 C1260,80 1440,10 1440,45 L1440,90 L0,90 Z" fill="rgba(255,255,255,0.04)" />
        </svg>
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-0 w-full">

        {/* ── Full-width leaking pipe SVG ── */}
        <div className="w-full" aria-hidden="true">
          <svg
            viewBox="0 0 1000 260"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* ══════════════════════════════════════
                PUDDLE & RIPPLES (drawn first = behind)
            ══════════════════════════════════════ */}
            <ellipse cx="500" cy="218" rx="0" ry="0" fill="#0591D4" opacity="0.18">
              <animate attributeName="rx" values="0;320;320" dur="5s" fill="freeze" />
              <animate attributeName="ry" values="0;18;18" dur="5s" fill="freeze" />
              <animate attributeName="opacity" values="0;0.18;0.18" dur="5s" fill="freeze" />
            </ellipse>
            {/* Ripple 1 */}
            <ellipse cx="500" cy="218" rx="60" ry="8" fill="none" stroke="#0591D4" strokeWidth="1.2" opacity="0">
              <animate attributeName="rx" values="60;260;260" dur="2.4s" begin="4s" repeatCount="indefinite" />
              <animate attributeName="ry" values="8;20;20" dur="2.4s" begin="4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0;0" dur="2.4s" begin="4s" repeatCount="indefinite" />
            </ellipse>
            {/* Ripple 2 */}
            <ellipse cx="500" cy="218" rx="60" ry="8" fill="none" stroke="#0591D4" strokeWidth="1" opacity="0">
              <animate attributeName="rx" values="60;260;260" dur="2.4s" begin="5.2s" repeatCount="indefinite" />
              <animate attributeName="ry" values="8;20;20" dur="2.4s" begin="5.2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0;0" dur="2.4s" begin="5.2s" repeatCount="indefinite" />
            </ellipse>
            {/* Ripple 3 — left puddle */}
            <ellipse cx="240" cy="218" rx="40" ry="6" fill="none" stroke="#0591D4" strokeWidth="0.9" opacity="0">
              <animate attributeName="rx" values="40;120;120" dur="2s" begin="4.8s" repeatCount="indefinite" />
              <animate attributeName="ry" values="6;14;14" dur="2s" begin="4.8s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0;0" dur="2s" begin="4.8s" repeatCount="indefinite" />
            </ellipse>
            {/* Ripple 4 — right puddle */}
            <ellipse cx="760" cy="218" rx="40" ry="6" fill="none" stroke="#0591D4" strokeWidth="0.9" opacity="0">
              <animate attributeName="rx" values="40;120;120" dur="2.2s" begin="5.5s" repeatCount="indefinite" />
              <animate attributeName="ry" values="6;14;14" dur="2.2s" begin="5.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0;0" dur="2.2s" begin="5.5s" repeatCount="indefinite" />
            </ellipse>

            {/* ══════════════════════════════════════
                FALLING DROPS (behind pipe shadow)
            ══════════════════════════════════════ */}

            {/* --- CRACK A (x≈240) drops --- */}
            <ellipse cx="240" cy="148" rx="4" ry="6" fill="#5edbff" opacity="0">
              <animate attributeName="cy" values="148;215;215" dur="1.1s" begin="0s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;0.9;0" dur="1.1s" begin="0s" repeatCount="indefinite" />
              <animate attributeName="ry" values="6;9;2" dur="1.1s" begin="0s" repeatCount="indefinite" />
            </ellipse>
            <ellipse cx="240" cy="148" rx="3.5" ry="5" fill="#5edbff" opacity="0">
              <animate attributeName="cy" values="148;215;215" dur="1.1s" begin="0.55s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;0.85;0" dur="1.1s" begin="0.55s" repeatCount="indefinite" />
              <animate attributeName="ry" values="5;8;2" dur="1.1s" begin="0.55s" repeatCount="indefinite" />
            </ellipse>

            {/* --- CRACK B (x≈500) drops — biggest leak --- */}
            <ellipse cx="500" cy="148" rx="5" ry="7" fill="#5edbff" opacity="0">
              <animate attributeName="cy" values="148;215;215" dur="0.9s" begin="0s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;1;0" dur="0.9s" begin="0s" repeatCount="indefinite" />
              <animate attributeName="ry" values="7;11;2" dur="0.9s" begin="0s" repeatCount="indefinite" />
            </ellipse>
            <ellipse cx="500" cy="148" rx="4" ry="6" fill="#5edbff" opacity="0">
              <animate attributeName="cy" values="148;215;215" dur="0.9s" begin="0.45s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;0.9;0" dur="0.9s" begin="0.45s" repeatCount="indefinite" />
              <animate attributeName="ry" values="6;10;2" dur="0.9s" begin="0.45s" repeatCount="indefinite" />
            </ellipse>
            <ellipse cx="497" cy="148" rx="3" ry="5" fill="#5edbff" opacity="0">
              <animate attributeName="cy" values="148;215;215" dur="0.9s" begin="0.22s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;0.85;0" dur="0.9s" begin="0.22s" repeatCount="indefinite" />
            </ellipse>

            {/* --- CRACK C (x≈760) drops --- */}
            <ellipse cx="760" cy="148" rx="4" ry="6" fill="#5edbff" opacity="0">
              <animate attributeName="cy" values="148;215;215" dur="1.2s" begin="0.3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;0.9;0" dur="1.2s" begin="0.3s" repeatCount="indefinite" />
              <animate attributeName="ry" values="6;9;2" dur="1.2s" begin="0.3s" repeatCount="indefinite" />
            </ellipse>
            <ellipse cx="760" cy="148" rx="3.5" ry="5" fill="#5edbff" opacity="0">
              <animate attributeName="cy" values="148;215;215" dur="1.2s" begin="0.9s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;0.85;0" dur="1.2s" begin="0.9s" repeatCount="indefinite" />
              <animate attributeName="ry" values="5;8;2" dur="1.2s" begin="0.9s" repeatCount="indefinite" />
            </ellipse>

            {/* ══════════════════════════════════════
                PIPE BODY
            ══════════════════════════════════════ */}

            {/* Shadow under pipe */}
            <rect x="0" y="142" width="1000" height="12" rx="0" fill="rgba(0,0,0,0.25)" />

            {/* Main pipe barrel */}
            <rect x="0" y="88" width="1000" height="62" fill="#1a6a9a" />

            {/* Top highlight */}
            <rect x="0" y="88" width="1000" height="14" fill="#2a8ac4" opacity="0.55" />
            {/* Top edge glint */}
            <rect x="0" y="88" width="1000" height="3" fill="white" opacity="0.12" />

            {/* Bottom shadow rim */}
            <rect x="0" y="136" width="1000" height="14" fill="#0a3d5e" opacity="0.7" />
            {/* Bottom edge */}
            <rect x="0" y="148" width="1000" height="2" fill="rgba(0,0,0,0.4)" />

            {/* Pipe belly mid-tone band */}
            <rect x="0" y="108" width="1000" height="22" fill="#1878ad" opacity="0.35" />

            {/* ── Collar rings ── */}
            {/* Collar 1 */}
            <rect x="148" y="82" width="22" height="74" fill="#0d4d75" />
            <rect x="152" y="86" width="14" height="66" fill="#1a6a9a" />
            <rect x="152" y="86" width="14" height="8"  fill="#2a8ac4" opacity="0.4" />
            <rect x="148" y="82" width="22" height="3"  fill="white" opacity="0.08" />

            {/* Collar 2 */}
            <rect x="378" y="82" width="22" height="74" fill="#0d4d75" />
            <rect x="382" y="86" width="14" height="66" fill="#1a6a9a" />
            <rect x="382" y="86" width="14" height="8"  fill="#2a8ac4" opacity="0.4" />
            <rect x="378" y="82" width="22" height="3"  fill="white" opacity="0.08" />

            {/* Collar 3 */}
            <rect x="600" y="82" width="22" height="74" fill="#0d4d75" />
            <rect x="604" y="86" width="14" height="66" fill="#1a6a9a" />
            <rect x="604" y="86" width="14" height="8"  fill="#2a8ac4" opacity="0.4" />
            <rect x="600" y="82" width="22" height="3"  fill="white" opacity="0.08" />

            {/* Collar 4 */}
            <rect x="830" y="82" width="22" height="74" fill="#0d4d75" />
            <rect x="834" y="86" width="14" height="66" fill="#1a6a9a" />
            <rect x="834" y="86" width="14" height="8"  fill="#2a8ac4" opacity="0.4" />
            <rect x="830" y="82" width="22" height="3"  fill="white" opacity="0.08" />

            {/* ══════════════════════════════════════
                CRACKS
            ══════════════════════════════════════ */}

            {/* ── Crack A — left third ── */}
            <path d="M234 100 L237 110 L242 104 L245 118" stroke="#073a5e" strokeWidth="3" fill="none" strokeLinecap="round" />
            <circle cx="240" cy="120" r="5" fill="#073a5e" />
            <ellipse cx="240" cy="120" rx="14" ry="7" fill="#7a3010" opacity="0.22" />

            {/* ── Crack B — center (biggest) ── */}
            <path d="M492 96 L496 108 L502 100 L506 116" stroke="#073a5e" strokeWidth="4" fill="none" strokeLinecap="round" />
            <circle cx="500" cy="118" r="7" fill="#073a5e" />
            <ellipse cx="500" cy="118" rx="20" ry="9" fill="#7a3010" opacity="0.25" />

            {/* ── Crack C — right third ── */}
            <path d="M754 100 L757 110 L762 104 L765 118" stroke="#073a5e" strokeWidth="3" fill="none" strokeLinecap="round" />
            <circle cx="760" cy="120" r="5" fill="#073a5e" />
            <ellipse cx="760" cy="120" rx="14" ry="7" fill="#7a3010" opacity="0.22" />

            {/* ══════════════════════════════════════
                SPRAY JETS (above pipe)
            ══════════════════════════════════════ */}

            {/* --- Crack A jets --- */}
            <line x1="240" y1="114" x2="210" y2="76" stroke="#5edbff" strokeWidth="2" strokeLinecap="round" opacity="0">
              <animate attributeName="opacity" values="0;0.7;0" dur="0.45s" repeatCount="indefinite" />
              <animate attributeName="x2" values="210;200;210" dur="0.45s" repeatCount="indefinite" />
              <animate attributeName="y2" values="76;70;76" dur="0.45s" repeatCount="indefinite" />
            </line>
            <line x1="240" y1="114" x2="240" y2="62" stroke="#5edbff" strokeWidth="2.5" strokeLinecap="round" opacity="0">
              <animate attributeName="opacity" values="0;0.9;0.5;0.9;0" dur="0.55s" repeatCount="indefinite" />
              <animate attributeName="y2" values="62;50;56;50;62" dur="0.55s" repeatCount="indefinite" />
            </line>
            <line x1="240" y1="114" x2="270" y2="76" stroke="#5edbff" strokeWidth="2" strokeLinecap="round" opacity="0">
              <animate attributeName="opacity" values="0;0.7;0" dur="0.45s" begin="0.22s" repeatCount="indefinite" />
              <animate attributeName="x2" values="270;280;270" dur="0.45s" begin="0.22s" repeatCount="indefinite" />
              <animate attributeName="y2" values="76;70;76" dur="0.45s" begin="0.22s" repeatCount="indefinite" />
            </line>
            {/* Particles A */}
            <circle cx="220" cy="72" r="3" fill="#5edbff" opacity="0">
              <animate attributeName="opacity" values="0;0.9;0" dur="0.5s" begin="0.1s" repeatCount="indefinite" />
              <animate attributeName="cy" values="72;58;52" dur="0.5s" begin="0.1s" repeatCount="indefinite" />
              <animate attributeName="cx" values="220;210;204" dur="0.5s" begin="0.1s" repeatCount="indefinite" />
            </circle>
            <circle cx="240" cy="56" r="3.5" fill="#5edbff" opacity="0">
              <animate attributeName="opacity" values="0;1;0" dur="0.55s" begin="0s" repeatCount="indefinite" />
              <animate attributeName="cy" values="56;42;36" dur="0.55s" begin="0s" repeatCount="indefinite" />
            </circle>
            <circle cx="260" cy="72" r="2.5" fill="#5edbff" opacity="0">
              <animate attributeName="opacity" values="0;0.85;0" dur="0.5s" begin="0.28s" repeatCount="indefinite" />
              <animate attributeName="cy" values="72;58;52" dur="0.5s" begin="0.28s" repeatCount="indefinite" />
              <animate attributeName="cx" values="260;270;276" dur="0.5s" begin="0.28s" repeatCount="indefinite" />
            </circle>

            {/* --- Crack B jets (tallest, most dramatic) --- */}
            <line x1="500" y1="112" x2="456" y2="60" stroke="#5edbff" strokeWidth="2.5" strokeLinecap="round" opacity="0">
              <animate attributeName="opacity" values="0;0.75;0" dur="0.4s" repeatCount="indefinite" />
              <animate attributeName="x2" values="456;444;456" dur="0.4s" repeatCount="indefinite" />
              <animate attributeName="y2" values="60;52;60" dur="0.4s" repeatCount="indefinite" />
            </line>
            <line x1="500" y1="112" x2="500" y2="44" stroke="#5edbff" strokeWidth="3.5" strokeLinecap="round" opacity="0">
              <animate attributeName="opacity" values="0;1;0.6;1;0" dur="0.5s" repeatCount="indefinite" />
              <animate attributeName="y2" values="44;28;36;28;44" dur="0.5s" repeatCount="indefinite" />
            </line>
            <line x1="500" y1="112" x2="544" y2="60" stroke="#5edbff" strokeWidth="2.5" strokeLinecap="round" opacity="0">
              <animate attributeName="opacity" values="0;0.75;0" dur="0.4s" begin="0.2s" repeatCount="indefinite" />
              <animate attributeName="x2" values="544;556;544" dur="0.4s" begin="0.2s" repeatCount="indefinite" />
              <animate attributeName="y2" values="60;52;60" dur="0.4s" begin="0.2s" repeatCount="indefinite" />
            </line>
            {/* Extra angled jets B */}
            <line x1="500" y1="112" x2="472" y2="78" stroke="#5edbff" strokeWidth="2" strokeLinecap="round" opacity="0">
              <animate attributeName="opacity" values="0;0.65;0" dur="0.38s" begin="0.1s" repeatCount="indefinite" />
            </line>
            <line x1="500" y1="112" x2="528" y2="78" stroke="#5edbff" strokeWidth="2" strokeLinecap="round" opacity="0">
              <animate attributeName="opacity" values="0;0.65;0" dur="0.38s" begin="0.29s" repeatCount="indefinite" />
            </line>
            {/* Particles B */}
            <circle cx="462" cy="56" r="4" fill="#5edbff" opacity="0">
              <animate attributeName="opacity" values="0;1;0" dur="0.45s" begin="0.08s" repeatCount="indefinite" />
              <animate attributeName="cy" values="56;38;30" dur="0.45s" begin="0.08s" repeatCount="indefinite" />
              <animate attributeName="cx" values="462;450;444" dur="0.45s" begin="0.08s" repeatCount="indefinite" />
            </circle>
            <circle cx="500" cy="38" r="5" fill="#5edbff" opacity="0">
              <animate attributeName="opacity" values="0;1;0" dur="0.5s" begin="0s" repeatCount="indefinite" />
              <animate attributeName="cy" values="38;18;10" dur="0.5s" begin="0s" repeatCount="indefinite" />
            </circle>
            <circle cx="538" cy="56" r="4" fill="#5edbff" opacity="0">
              <animate attributeName="opacity" values="0;1;0" dur="0.45s" begin="0.25s" repeatCount="indefinite" />
              <animate attributeName="cy" values="56;38;30" dur="0.45s" begin="0.25s" repeatCount="indefinite" />
              <animate attributeName="cx" values="538;550;556" dur="0.45s" begin="0.25s" repeatCount="indefinite" />
            </circle>
            <circle cx="484" cy="44" r="3" fill="#5edbff" opacity="0">
              <animate attributeName="opacity" values="0;0.9;0" dur="0.42s" begin="0.15s" repeatCount="indefinite" />
              <animate attributeName="cy" values="44;28;22" dur="0.42s" begin="0.15s" repeatCount="indefinite" />
              <animate attributeName="cx" values="484;476;472" dur="0.42s" begin="0.15s" repeatCount="indefinite" />
            </circle>
            <circle cx="516" cy="44" r="3" fill="#5edbff" opacity="0">
              <animate attributeName="opacity" values="0;0.9;0" dur="0.42s" begin="0.32s" repeatCount="indefinite" />
              <animate attributeName="cy" values="44;28;22" dur="0.42s" begin="0.32s" repeatCount="indefinite" />
              <animate attributeName="cx" values="516;524;528" dur="0.42s" begin="0.32s" repeatCount="indefinite" />
            </circle>

            {/* --- Crack C jets --- */}
            <line x1="760" y1="114" x2="730" y2="76" stroke="#5edbff" strokeWidth="2" strokeLinecap="round" opacity="0">
              <animate attributeName="opacity" values="0;0.7;0" dur="0.45s" begin="0.15s" repeatCount="indefinite" />
              <animate attributeName="x2" values="730;720;730" dur="0.45s" begin="0.15s" repeatCount="indefinite" />
              <animate attributeName="y2" values="76;70;76" dur="0.45s" begin="0.15s" repeatCount="indefinite" />
            </line>
            <line x1="760" y1="114" x2="760" y2="62" stroke="#5edbff" strokeWidth="2.5" strokeLinecap="round" opacity="0">
              <animate attributeName="opacity" values="0;0.9;0.5;0.9;0" dur="0.55s" begin="0.1s" repeatCount="indefinite" />
              <animate attributeName="y2" values="62;50;56;50;62" dur="0.55s" begin="0.1s" repeatCount="indefinite" />
            </line>
            <line x1="760" y1="114" x2="790" y2="76" stroke="#5edbff" strokeWidth="2" strokeLinecap="round" opacity="0">
              <animate attributeName="opacity" values="0;0.7;0" dur="0.45s" begin="0.35s" repeatCount="indefinite" />
              <animate attributeName="x2" values="790;800;790" dur="0.45s" begin="0.35s" repeatCount="indefinite" />
              <animate attributeName="y2" values="76;70;76" dur="0.45s" begin="0.35s" repeatCount="indefinite" />
            </line>
            {/* Particles C */}
            <circle cx="740" cy="72" r="3" fill="#5edbff" opacity="0">
              <animate attributeName="opacity" values="0;0.9;0" dur="0.5s" begin="0.18s" repeatCount="indefinite" />
              <animate attributeName="cy" values="72;58;52" dur="0.5s" begin="0.18s" repeatCount="indefinite" />
              <animate attributeName="cx" values="740;730;724" dur="0.5s" begin="0.18s" repeatCount="indefinite" />
            </circle>
            <circle cx="760" cy="56" r="3.5" fill="#5edbff" opacity="0">
              <animate attributeName="opacity" values="0;1;0" dur="0.55s" begin="0.1s" repeatCount="indefinite" />
              <animate attributeName="cy" values="56;42;36" dur="0.55s" begin="0.1s" repeatCount="indefinite" />
            </circle>
            <circle cx="780" cy="72" r="2.5" fill="#5edbff" opacity="0">
              <animate attributeName="opacity" values="0;0.85;0" dur="0.5s" begin="0.38s" repeatCount="indefinite" />
              <animate attributeName="cy" values="72;58;52" dur="0.5s" begin="0.38s" repeatCount="indefinite" />
              <animate attributeName="cx" values="780;790;796" dur="0.5s" begin="0.38s" repeatCount="indefinite" />
            </circle>

            {/* ══════════════════════════════════════
                WRENCH (bottom-right, near pipe)
            ══════════════════════════════════════ */}
            <g transform="translate(900,178) rotate(-35)">
              <rect x="-6" y="-26" width="12" height="52" rx="4" fill="#4a4a5a" />
              <ellipse cx="0" cy="-26" rx="13" ry="10" fill="none" stroke="#4a4a5a" strokeWidth="6" />
              <ellipse cx="0" cy="26"  rx="10" ry="7"  fill="none" stroke="#4a4a5a" strokeWidth="5" />
              <rect x="-3" y="-26" width="6" height="52" rx="2" fill="#5a5a6a" opacity="0.4" />
            </g>

          </svg>
        </div>

        {/* ── Text block ── */}
        <div className="px-6 -mt-4">
          <h1
            className="font-heading font-bold leading-none text-white/90 tracking-tight"
            style={{ fontSize: "clamp(5rem, 18vw, 13rem)", textShadow: "0 0 60px rgba(5,145,212,0.7)" }}
          >
            404
          </h1>

          <p className="mt-2 text-lg sm:text-xl font-semibold text-white/80">
            This page has sprung a leak.
          </p>
          <p className="mt-2 text-sm text-white/45 max-w-xs mx-auto">
            The page you're looking for couldn't be found. It may have been moved or no longer exists.
          </p>

          <Link
            href="/"
            className="mt-8 mb-2 inline-flex items-center gap-2 rounded-full bg-[#0591D4] hover:bg-[#0480bc] px-7 py-3 text-sm font-semibold text-white transition-colors shadow-lg shadow-[#0591D4]/30"
          >
            ← Back to Home
          </Link>

          <p className="mt-4 text-xs text-white/20">
            Trece Martires City Water District
          </p>
        </div>
      </div>

      {/* ── Keyframes ── */}
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
        @keyframes waveSlide {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
