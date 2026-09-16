"use client";

/**
 * HeroBackground — CSS crossfade slideshow cycling through 5 images.
 * img1.jpg → img2.jpg → img3.jpg → img4.jpg → img5.png → repeat
 *
 * Technique: layers stacked by z-index, each fades OUT revealing the one below.
 * Combined opacity across the stack is always 1 — no dark flash ever.
 *
 * Cycle = 20s  (3s hold + 1s fade) × 5 images
 * Delays:
 *   Layer 5 (bottom): z-index 1, delay -16s
 *   Layer 4:          z-index 2, delay -12s
 *   Layer 3:          z-index 3, delay  -8s
 *   Layer 2:          z-index 4, delay  -4s
 *   Layer 1 (top):    z-index 5, delay   0s
 */
export default function HeroBackground() {
  return (
    <>
      {/* Layer 5 — img5.png — bottom base */}
      <div
        className="absolute inset-0 hero-slide hero-slide-5"
        style={{ backgroundImage: "url('/img5.png')" }}
        aria-hidden="true"
      />

      {/* Layer 4 — img4.jpg */}
      <div
        className="absolute inset-0 hero-slide hero-slide-4"
        style={{ backgroundImage: "url('/img4.jpg')" }}
        aria-hidden="true"
      />

      {/* Layer 3 — img3.jpg */}
      <div
        className="absolute inset-0 hero-slide hero-slide-3"
        style={{ backgroundImage: "url('/img3.jpg')" }}
        aria-hidden="true"
      />

      {/* Layer 2 — img2.jpg */}
      <div
        className="absolute inset-0 hero-slide hero-slide-2"
        style={{ backgroundImage: "url('/img2.jpg')" }}
        aria-hidden="true"
      />

      {/* Layer 1 — img1.jpg — top, visible first */}
      <div
        className="absolute inset-0 hero-slide hero-slide-1"
        style={{ backgroundImage: "url('/img1.jpg')" }}
        aria-hidden="true"
      />

      {/* Dark overlay — above all image layers, below text */}
      <div className="absolute inset-0 bg-gray-700 opacity-60" style={{ zIndex: 10 }} aria-hidden="true" />
    </>
  );
}
