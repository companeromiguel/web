"use client";

/**
 * HeroBackground — looping video with a still-image fallback.
 *
 * HOW TO USE:
 *   1. Create a video that cycles between your backgrounds with whatever
 *      transition you like (liquid morph, dissolve, etc.) in your video editor.
 *   2. Export as MP4 (H.264, web-optimised / "fast start").
 *      Recommended: 1920×1080, 30fps, ~3–8 MB for a 10–20s loop.
 *   3. Drop the file into /public/ and name it hero.mp4
 *   4. Optionally export a WebM version (hero.webm) for better compression
 *      on Chrome/Firefox — the <source> order below prefers WebM first.
 *   5. The video will autoplay, loop, and be muted (required by all browsers
 *      for autoplay without user interaction).
 *
 * FALLBACK:
 *   If the browser can't play video (or the file isn't there yet),
 *   it falls back to bgv1.jpg via the CSS background on the wrapper div.
 */
export default function HeroBackground() {
  return (
    <>
      {/* Video layer — covers the full hero, object-fit:cover like background-size:cover */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-[url('/bgv1.jpg')]"
        aria-hidden="true"
      >
        <video
          className="w-full h-full object-cover"
          /*
           * ── ADJUST THIS TO REFRAME THE VIDEO ON MOBILE ──
           * Format:  object-position: X Y
           * X = how far from the left  (e.g. 30% = slightly right of center)
           * Y = how far from the top   (e.g. center = vertically centered)
           *
           * Examples:
           *   "70% center"  → shows right-of-center area
           *   "80% center"  → shows more to the right
           *   "60% center"  → a bit right of center
           *
           * Current value: 70% — tweak until it looks right on your phone.
           */
          style={{ objectPosition: "70% center" }}
          autoPlay
          loop
          muted
          playsInline          /* required on iOS to prevent fullscreen takeover */
          preload="auto"       /* start loading immediately */
          aria-hidden="true"
        >
          {/* WebM first — better compression on Chrome/Firefox */}
          <source src="/hero.webm" type="video/webm" />
          {/* MP4 fallback — universal support */}
          <source src="/bg1.mp4"  type="video/mp4"  />
          {/* If neither plays, the parent div's bg-[url('/bgv1.jpg')] shows */}
        </video>
      </div>

      {/* Dark overlay — sits above the video, same as before */}
      <div className="absolute inset-0 bg-gray-700 opacity-60" aria-hidden="true" />
    </>
  );
}
