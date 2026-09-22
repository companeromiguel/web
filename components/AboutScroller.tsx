"use client";

import { useEffect, useRef, useState } from "react";

const paragraphs = [
  <>
    The Trece Martires City Water District (TMCWD) is a government-owned and
    controlled corporation created under Presidential Decree No. 198, the{" "}
    <em>Provincial Water Utilities Act of 1973</em>.
  </>,
  <>
    Situated at the center of Cavite Province, Trece Martires City — formerly
    known as <em>Quintana</em> — is strategically accessible to all adjoining
    cities and municipalities. Once a semi-agricultural area, the city opened
    its doors to industrial and commercial development in the 1990s, spurring
    rapid population growth as people from adjacent provinces and municipalities
    flocked to the area.
  </>,
  <>
    The sudden influx of residents created a pressing demand for a reliable
    supply of clean drinking water. With no other alternatives, local officials
    sought the technical support of the Local Water Utilities Administration
    (LWUA), leading to the formal establishment of TMCWD — now serving the
    city&apos;s growing community of concessionaires, including the many
    resettlers who call Trece Martires home.
  </>,
  <>
    The district is governed by a Board of Directors appointed by LWUA and
    remains committed to the delivery of safe, adequate, and affordable water
    to every household within its franchise area.
  </>,
];

export default function AboutScroller({ syncRef }: { syncRef?: React.RefObject<HTMLDivElement | null> }) {
  const [expanded, setExpanded] = useState(false);
  const [windowHeight, setWindowHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const target = syncRef?.current;
    if (!target) return;

    const update = () => setWindowHeight(target.offsetHeight);
    update();

    const ro = new ResizeObserver(update);
    ro.observe(target);
    return () => ro.disconnect();
  }, [syncRef]);

  return (
    <div>
      {expanded ? (
        /* ── Expanded: all paragraphs visible, no clip ── */
        <div className="text-sm text-white/85 leading-relaxed space-y-4">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      ) : (
        /* ── Default: auto-scrolling window ── */
        <div
          className="about-scroller-window"
          style={windowHeight ? { height: windowHeight } : undefined}
        >
          <div className="about-scroller-track">
            {[0, 1].map((copy) => (
              <div
                key={copy}
                aria-hidden={copy === 1 ? "true" : undefined}
                className="about-scroller-copy text-sm text-white/85 leading-relaxed space-y-4"
              >
                {paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Toggle button */}
      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="inline-flex min-h-10 shrink-0 items-center gap-1.5 whitespace-nowrap text-xs font-medium text-white/70 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded"
          aria-expanded={expanded}
        >
          {expanded ? (
            <>
              <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
              </svg>
              Show less
            </>
          ) : (
            <>
              <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
              Read more
            </>
          )}
        </button>
      </div>
    </div>
  );
}
