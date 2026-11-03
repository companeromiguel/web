/**
 * SectionWaveBackground
 *
 * Three-layer animated wave overlay used in the blue (#3B9FD8) homepage
 * sections (About TMCWD and Find Us). Drop it as the first child of a
 * `relative overflow-hidden` section — it fills the section via
 * `absolute inset-0` and is fully pointer-events-none.
 */
export default function SectionWaveBackground() {
  return (
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
  );
}
