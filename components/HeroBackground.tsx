"use client";

/**
 * HeroBackground — CSS crossfade slideshow cycling through 3 images.
 *
 * Three layers are stacked at absolute inset-0.
 * Each layer runs the same keyframe animation but with a staggered
 * animation-delay so only one image is visible at a time.
 *
 * Timing per cycle (19.5s total):
 *   5s hold → 1.5s fade-out → 5s hold → 1.5s fade-out → 5s hold → 1.5s fade-out
 *   Layer offsets: bgv1 = 0s, bgv2 = 6.5s, bgv3 = 13s
 *
 * To add a 4th image: set cycle to 26s, add a layer with delay 19.5s,
 * and update the @keyframes percentages in globals.css accordingly.
 */
export default function HeroBackground() {
  return (
    <>
      {/* ── Image layers — lowest z stacks behind higher ones ─────── */}

      {/* Layer 1 — bgv1.jpg — visible first */}
      <div
        className="absolute inset-0 hero-slide hero-slide-1"
        style={{ backgroundImage: "url('/bgv1.jpg')" }}
        aria-hidden="true"
      />

      {/* Layer 2 — bgv2.jpg — fades in after bgv1 */}
      <div
        className="absolute inset-0 hero-slide hero-slide-2"
        style={{ backgroundImage: "url('/bgv2.jpg')" }}
        aria-hidden="true"
      />

      {/* Layer 3 — bgv3.jpg — fades in after bgv2 */}
      <div
        className="absolute inset-0 hero-slide hero-slide-3"
        style={{ backgroundImage: "url('/bgv3.jpg')" }}
        aria-hidden="true"
      />

      {/* ── Dark overlay ──────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-gray-700 opacity-60" aria-hidden="true" />
    </>
  );
}
