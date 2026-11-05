"use client";

import { useEffect, useRef, useState } from "react";

// ── Tweak this to change minimum display time ─────────────────────────
const MIN_DISPLAY_MS = 1200;
// ─────────────────────────────────────────────────────────────────────

const HG          = 140; // glass interior height px
const GLASS_TOP   = 150; // glass top inside scene
const SPOUT_BOTTOM = 73; // where stream starts

export default function PageLoader() {
  const [hidden, setHidden]   = useState(false);
  const sceneRef              = useRef<HTMLDivElement>(null);
  const levelRef              = useRef<HTMLDivElement>(null);
  const streamRef             = useRef<HTMLDivElement>(null);
  const rafRef                = useRef<number>(0);
  const pRef                  = useRef(0);
  const doneRef               = useRef(false);
  const startRef              = useRef(0);
  const prevRef               = useRef(0);
  const pageLoadedRef         = useRef(false);

  function render(p: number) {
    const y = HG - (p / 100) * (HG * 0.9);
    if (levelRef.current)
      levelRef.current.style.transform = `translateY(${y.toFixed(2)}px)`;
    if (streamRef.current)
      streamRef.current.style.height =
        Math.max(0, GLASS_TOP + y - SPOUT_BOTTOM + 2).toFixed(1) + "px";
  }

  function finish() {
    if (doneRef.current) return;
    doneRef.current = true;
    if (sceneRef.current) {
      sceneRef.current.classList.remove("pl-open");
      sceneRef.current.classList.add("pl-closed");
    }
    setTimeout(() => setHidden(true), 800 + 300); // stream drains + fade
  }

  useEffect(() => {
    if (document.readyState === "complete") {
      pageLoadedRef.current = true;
    } else {
      window.addEventListener("load", () => { pageLoadedRef.current = true; }, { once: true });
    }

    pRef.current   = 0;
    doneRef.current = false;
    startRef.current = prevRef.current = performance.now();
    render(0);

    // Open tap after 150ms
    const openTimer = setTimeout(() => {
      sceneRef.current?.classList.add("pl-open");
    }, 150);

    function tick(now: number) {
      const dt      = Math.min(0.05, (now - prevRef.current) / 1000) || 0.016;
      prevRef.current = now;
      const elapsed = now - startRef.current;
      const ready   = pageLoadedRef.current && elapsed >= MIN_DISPLAY_MS;
      const t       = Math.max(0, elapsed - 600);
      const target  = ready ? 100 : 88 * (1 - Math.exp(-t / 800));
      pRef.current += (target - pRef.current) * (1 - Math.exp(-(ready ? 2.2 : 2.6) * dt));
      render(pRef.current);
      if (ready && pRef.current > 99.7) { render(100); finish(); return; }
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      clearTimeout(openTimer);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (hidden) return null;

  return (
    <>
      <noscript><style>{`#page-loader{display:none}`}</style></noscript>

      <div id="page-loader" role="status" aria-live="polite" aria-label="Loading page">

        <div className="pl-scene" id="pl-scene" ref={sceneRef}>

          {/* Faucet */}
          <svg className="pl-faucet" viewBox="0 0 220 100" aria-hidden="true">
            {/* Stem cap */}
            <rect x="67" y="15" width="8" height="8" fill="#d4a23a"/>
            {/* Hex bonnet */}
            <rect x="60" y="22" width="22" height="14" rx="2.5" fill="#b5832a"/>
            {/* T-handle bar (knob) */}
            <g className="pl-knob">
              <rect x="42" y="6" width="58" height="9" rx="4.5" fill="#d4a23a"/>
            </g>
            {/* Body tube + bend + spout */}
            <path d="M40 38 H88 Q121 38 121 62 V66 H99 V62 Q99 58 88 58 H40 Z" fill="#d4a23a"/>
            {/* Spout end / hex nut */}
            <rect x="96" y="64" width="28" height="9" rx="2.5" fill="#b5832a"/>
            {/* Stem */}
            <rect x="30" y="33" width="14" height="30" rx="3" fill="#b5832a"/>
            {/* Threaded inlet */}
            <rect x="13" y="38" width="17" height="20" rx="2.5" fill="#d4a23a"/>
          </svg>

          {/* Water stream */}
          <div className="pl-stream" id="pl-stream" ref={streamRef}>
            <i />
          </div>

          {/* Glass */}
          <div className="pl-glass-wrap">
            <div className="pl-glass">
              <div className="pl-level" id="pl-level" ref={levelRef}>
                {/* Back wave layer */}
                <div className="pl-layer pl-back">
                  <svg className="pl-wave" viewBox="0 0 220 40" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M0 10 Q27.5 0 55 10 T110 10 T165 10 T220 10 V40 H0 Z"/>
                  </svg>
                  <div className="pl-fill" />
                </div>
                {/* Front wave layer */}
                <div className="pl-layer pl-front">
                  <svg className="pl-wave" viewBox="0 0 220 40" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M0 10 Q27.5 0 55 10 T110 10 T165 10 T220 10 V40 H0 Z"/>
                  </svg>
                  <div className="pl-fill" />
                </div>
                {/* Ripple rings */}
                <div className="pl-ripple" />
                <div className="pl-ripple pl-r2" />
              </div>
            </div>
            {/* Glass outline */}
            <svg className="pl-outline" viewBox="0 0 110 140" aria-hidden="true">
              <path d="M0 0 L10 134 Q11 140 17 140 H93 Q99 140 100 134 L110 0"/>
            </svg>
          </div>

        </div>

        <p className="pl-loading-text">Loading</p>

      </div>
    </>
  );
}
