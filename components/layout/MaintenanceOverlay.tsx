"use client";

// ─────────────────────────────────────────────────────────────
// MAINTENANCE MODE
// Set MAINTENANCE_MODE to true to show the overlay.
// Set it to false to disable and restore the site.
// ─────────────────────────────────────────────────────────────
const MAINTENANCE_MODE = false;

export default function MaintenanceOverlay() {
  if (!MAINTENANCE_MODE) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center overflow-hidden"
      role="alert"
      aria-live="assertive"
      aria-label="Website under maintenance"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-[#030d1a] via-[#061e35] to-[#0a3a5c]" />

        {/* Deep underwater glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full bg-[#0591D4]/10 blur-[120px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#370A77]/15 blur-[100px]" />

        {/* Bubbles — many sizes */}
        {[
          { l:"4%",  w:"w-1.5", h:"h-1.5", dur:"9s",  del:"0s",   cls:"bubble1" },
          { l:"10%", w:"w-3",   h:"h-3",   dur:"11s", del:"1.2s", cls:"bubble2" },
          { l:"18%", w:"w-1.5", h:"h-1.5", dur:"7s",  del:"0.5s", cls:"bubble1" },
          { l:"26%", w:"w-2",   h:"h-2",   dur:"10s", del:"2s",   cls:"bubble2" },
          { l:"34%", w:"w-4",   h:"h-4",   dur:"8s",  del:"3s",   cls:"bubble1" },
          { l:"42%", w:"w-1.5", h:"h-1.5", dur:"12s", del:"0.8s", cls:"bubble2" },
          { l:"50%", w:"w-2.5", h:"h-2.5", dur:"9s",  del:"1.5s", cls:"bubble1" },
          { l:"58%", w:"w-1.5", h:"h-1.5", dur:"7s",  del:"4s",   cls:"bubble2" },
          { l:"66%", w:"w-3",   h:"h-3",   dur:"10s", del:"0.3s", cls:"bubble1" },
          { l:"74%", w:"w-1.5", h:"h-1.5", dur:"8s",  del:"2.5s", cls:"bubble2" },
          { l:"82%", w:"w-2",   h:"h-2",   dur:"11s", del:"1s",   cls:"bubble1" },
          { l:"90%", w:"w-1.5", h:"h-1.5", dur:"9s",  del:"3.5s", cls:"bubble2" },
          { l:"96%", w:"w-2.5", h:"h-2.5", dur:"7s",  del:"0.7s", cls:"bubble1" },
        ].map((b, i) => (
          <div key={i} className={`absolute bottom-0 ${b.w} ${b.h} rounded-full bg-[#0591D4]/25`}
            style={{ left: b.l, animation: `${b.cls} ${b.dur} ease-in ${b.del} infinite` }} />
        ))}

        {/* Wave layers */}
        <svg className="absolute bottom-0 left-0 w-[200%] animate-[waveSlide_10s_linear_infinite]" viewBox="0 0 1440 160" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,80 C240,140 480,20 720,80 C960,140 1200,20 1440,80 L1440,160 L0,160 Z" fill="rgba(5,145,212,0.12)" />
        </svg>
        <svg className="absolute bottom-0 left-0 w-[200%] animate-[waveSlide_7s_linear_0.5s_infinite]" viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,60 C180,100 360,20 540,60 C720,100 900,20 1080,60 C1260,100 1440,20 1440,60 L1440,120 L0,120 Z" fill="rgba(255,255,255,0.04)" />
        </svg>
        <svg className="absolute bottom-0 left-0 w-[200%] animate-[waveSlideRev_9s_linear_infinite]" viewBox="0 0 1440 90" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,45 C360,80 720,10 1080,45 C1260,62 1380,32 1440,45 L1440,90 L0,90 Z" fill="rgba(36,178,234,0.06)" />
        </svg>

        {/* Horizontal pipe — left side */}
        <svg className="absolute left-0 top-1/2 -translate-y-1/2 opacity-[0.07] w-32" viewBox="0 0 128 60" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="20" width="128" height="20" rx="4" fill="white"/>
          <rect x="0" y="18" width="128" height="5" fill="rgba(255,255,255,0.3)"/>
          <rect x="80" y="13" width="12" height="34" rx="3" fill="white"/>
          <rect x="100" y="13" width="12" height="34" rx="3" fill="white"/>
        </svg>

        {/* Horizontal pipe — right side */}
        <svg className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.07] w-32 scale-x-[-1]" viewBox="0 0 128 60" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="20" width="128" height="20" rx="4" fill="white"/>
          <rect x="0" y="18" width="128" height="5" fill="rgba(255,255,255,0.3)"/>
          <rect x="80" y="13" width="12" height="34" rx="3" fill="white"/>
          <rect x="100" y="13" width="12" height="34" rx="3" fill="white"/>
        </svg>

        {/* Water drop top-left corner */}
        <svg className="absolute top-8 left-8 opacity-[0.06] w-16 h-16" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
          <path d="M32 4 C32 4 10 28 10 40 a22 22 0 0 0 44 0 C54 28 32 4 32 4Z" fill="white"/>
        </svg>
        {/* Water drop top-right corner */}
        <svg className="absolute top-8 right-8 opacity-[0.06] w-12 h-12" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
          <path d="M32 4 C32 4 10 28 10 40 a22 22 0 0 0 44 0 C54 28 32 4 32 4Z" fill="white"/>
        </svg>
        {/* Water drop bottom-left */}
        <svg className="absolute bottom-28 left-12 opacity-[0.05] w-10 h-10" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
          <path d="M32 4 C32 4 10 28 10 40 a22 22 0 0 0 44 0 C54 28 32 4 32 4Z" fill="white"/>
        </svg>

        {/* ── Cracked screen effect — impact from bottom-left ── */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="crackGlow" cx="180" cy="580" r="60" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="white" stopOpacity="0.1"/>
              <stop offset="100%" stopColor="white" stopOpacity="0"/>
            </radialGradient>
          </defs>
          <g fill="none" strokeLinecap="round">
            {/* Impact point rings — bottom left */}
            <circle cx="180" cy="580" r="8"  stroke="rgba(255,255,255,0.28)" strokeWidth="1.2" fill="rgba(255,255,255,0.06)"/>
            <circle cx="180" cy="580" r="18" stroke="rgba(255,255,255,0.15)" strokeWidth="0.9"/>
            <circle cx="180" cy="580" r="32" stroke="rgba(255,255,255,0.08)" strokeWidth="0.7"/>

            {/* Main fractures radiating from bottom-left */}
            {/* Crack 1 — long diagonal up-right (main) */}
            <path d="M180 580 L260 500 L360 420 L480 330 L600 250 L720 180 L860 110 L1000 60" stroke="rgba(255,255,255,0.22)" strokeWidth="1.4"/>
            {/* Crack 2 — up toward top-center */}
            <path d="M180 580 L220 460 L260 340 L290 220 L310 100 L320 0" stroke="rgba(255,255,255,0.18)" strokeWidth="1.1"/>
            {/* Crack 3 — up-right mid */}
            <path d="M180 580 L300 520 L440 460 L580 400 L720 350 L880 300 L1000 270" stroke="rgba(255,255,255,0.16)" strokeWidth="1"/>
            {/* Crack 4 — sharp up-left toward top */}
            <path d="M180 580 L140 460 L100 330 L60 200 L20 80 L0 0" stroke="rgba(255,255,255,0.14)" strokeWidth="1"/>
            {/* Crack 5 — toward right edge mid */}
            <path d="M180 580 L340 560 L500 540 L680 520 L860 510 L1000 505" stroke="rgba(255,255,255,0.13)" strokeWidth="0.9"/>
            {/* Crack 6 — bottom right diagonal */}
            <path d="M180 580 L320 620 L480 650 L660 670 L820 685 L1000 695" stroke="rgba(255,255,255,0.12)" strokeWidth="0.9"/>
            {/* Crack 7 — short up toward top-left corner */}
            <path d="M180 580 L120 500 L60 400 L20 300 L0 200" stroke="rgba(255,255,255,0.13)" strokeWidth="0.9"/>
            {/* Crack 8 — near horizontal right */}
            <path d="M180 580 L360 570 L560 558 L760 548 L940 540 L1000 538" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8"/>

            {/* Secondary branch cracks */}
            <path d="M260 500 L300 480 L350 470 L400 460" stroke="rgba(255,255,255,0.12)" strokeWidth="0.7"/>
            <path d="M360 420 L390 440 L430 455 L460 460" stroke="rgba(255,255,255,0.1)" strokeWidth="0.6"/>
            <path d="M480 330 L510 350 L550 365 L580 370" stroke="rgba(255,255,255,0.1)" strokeWidth="0.6"/>
            <path d="M220 460 L250 470 L290 478 L320 480" stroke="rgba(255,255,255,0.1)" strokeWidth="0.6"/>
            <path d="M140 460 L170 455 L200 448 L230 440" stroke="rgba(255,255,255,0.1)" strokeWidth="0.6"/>
            <path d="M100 330 L130 340 L160 348 L190 350" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5"/>
            <path d="M300 520 L310 540 L325 560 L330 580" stroke="rgba(255,255,255,0.09)" strokeWidth="0.6"/>
            <path d="M600 250 L620 270 L640 290 L650 310" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5"/>
            <path d="M720 180 L740 200 L755 225 L760 248" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5"/>

            {/* Tiny hairline cracks near impact */}
            <path d="M180 580 L200 595 L225 608 L240 615" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
            <path d="M180 580 L162 595 L145 610 L130 618" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
            <path d="M180 580 L175 600 L172 622 L170 640" stroke="rgba(255,255,255,0.09)" strokeWidth="0.5"/>
          </g>
          <circle cx="180" cy="580" r="60" fill="url(#crackGlow)"/>
        </svg>
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-xl w-full">

        {/* Logo */}
        <div className="relative mb-5">
          <div className="absolute inset-0 rounded-full bg-[#0591D4]/20 animate-ping" style={{ animationDuration: "3s" }}/>
          <img src="/logo.png" alt="TMCWD Seal" className="relative w-16 h-16 drop-shadow-[0_0_16px_rgba(5,145,212,0.6)]"/>
        </div>

        {/* Org name */}
        <p className="text-[9px] font-bold tracking-[0.3em] text-[#0591D4]/70 uppercase mb-3">
          Trece Martires City Water District
        </p>

        {/* Heading */}
        <h1
          className="text-3xl sm:text-5xl font-bold text-white/90 tracking-tight mb-2 leading-tight"
          style={{ fontFamily: "var(--font-source-serif), Georgia, serif", textShadow: "0 0 40px rgba(5,145,212,0.5)" }}
        >
          Under Maintenance
        </h1>

        <p className="text-sm sm:text-base font-semibold text-[#24B2EA] mb-4 tracking-wide">
          We'll be right back!
        </p>

        {/* Wave divider */}
        <svg className="w-48 h-6 mb-4 opacity-40" viewBox="0 0 200 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,12 C33,0 67,24 100,12 C133,0 167,24 200,12" stroke="#0591D4" strokeWidth="1.5" fill="none"/>
        </svg>

        <p className="text-sm text-white/40 leading-relaxed mb-6 max-w-sm">
          We are currently performing scheduled maintenance to improve our services.
          We apologize for the inconvenience and will be back shortly.
        </p>

        {/* Status badge */}
        <div className="flex items-center gap-2 border border-[#0591D4]/30 rounded-full px-4 py-1.5 mb-8 bg-[#0591D4]/10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0591D4] opacity-75"/>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0591D4]"/>
          </span>
          <span className="text-xs font-medium text-[#0591D4]">Maintenance in progress</span>
        </div>

        {/* Contact */}
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/25 mb-3">For urgent concerns</p>
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
          <a href="tel:+639178050391"
            className="flex items-center gap-2 text-sm text-[#0591D4] hover:text-[#24B2EA] transition-colors">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"/>
            </svg>
            +63 917 805 0391
          </a>
          <span className="hidden sm:block text-white/15">·</span>
          <a href="mailto:tmcwd@yahoo.com"
            className="flex items-center gap-2 text-sm text-[#0591D4] hover:text-[#24B2EA] transition-colors">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"/>
            </svg>
            tmcwd@yahoo.com
          </a>
        </div>

        <p className="text-[10px] text-white/15">© {new Date().getFullYear()} Trece Martires City Water District</p>
      </div>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes bubble1 {
          0%   { transform: translateY(0) scale(1);   opacity: 0.2; }
          50%  { opacity: 0.35; }
          100% { transform: translateY(-100vh) scale(1.5); opacity: 0; }
        }
        @keyframes bubble2 {
          0%   { transform: translateY(0) scale(1);   opacity: 0.12; }
          50%  { opacity: 0.22; }
          100% { transform: translateY(-100vh) scale(1.3); opacity: 0; }
        }
        @keyframes waveSlide {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes waveSlideRev {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
