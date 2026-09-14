"use client";

/**
 * HeroBackground — CSS crossfade slideshow between static images.
 *
 * Each image layer sits stacked at absolute inset-0.
 * Layer 1 (bgv1.jpg) fades out then back in on a loop.
 * Layer 2 (bgv2.jpg) is offset by half the cycle so it's visible
 * while layer 1 is invisible — producing a seamless A→B→A crossfade.
 *
 * Timing: 5s visible → 1.5s fade → 5s visible → 1.5s fade = 13s total cycle.
 * Controlled entirely by the CSS animations defined in globals.css.
 *
 * To add more slides, duplicate a layer and adjust animation-delay and the
 * keyframe percentages to divide the cycle evenly across N images.
 */
export default function HeroBackground() {
  return (
    <>
      {/* ── Image layers ──────────────────────────────────────────── */}

      {/* Layer 1 — bgv1.jpg — starts fully visible */}
      <div
        className="absolute inset-0 bg-cover bg-center hero-slide hero-slide-1"
        style={{ backgroundImage: "url('/bgv1.jpg')" }}
        aria-hidden="true"
      />

      {/* Layer 2 — bgv2.jpg — starts invisible, fades in while layer 1 fades out */}
      <div
        className="absolute inset-0 bg-cover bg-center hero-slide hero-slide-2"
        style={{ backgroundImage: "url('/bgv2.jpg')" }}
        aria-hidden="true"
      />

      {/* ── Dark overlay — same as before ─────────────────────────── */}
      <div className="absolute inset-0 bg-gray-700 opacity-60" aria-hidden="true" />
    </>
  );
}
