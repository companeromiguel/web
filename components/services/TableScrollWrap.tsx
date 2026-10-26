"use client";

/**
 * TableScrollWrap
 * Replaces the plain `charter-table-wrap` div for tables that are likely
 * to overflow on mobile (ProcessTable, WaterRatesTable).
 *
 * Features:
 *  - Shows a "← scroll →" hint on small screens only
 *  - Hides the right-edge fade gradient once the user scrolls to the end
 *  - Adds `scrolled-right` class when fully scrolled so CSS hides the fade
 */

import { useRef, useEffect, useState } from "react";

interface TableScrollWrapProps {
  children: React.ReactNode;
  /** Label for the scroll hint — defaults to "Scroll left or right to see all columns" */
  hint?: string;
}

export default function TableScrollWrap({
  children,
  hint = "Scroll left or right to see all columns",
}: TableScrollWrapProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [overflows, setOverflows] = useState(false);
  const [atEnd, setAtEnd]         = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    function check() {
      if (!el) return;
      const scrollable = el.scrollWidth > el.clientWidth + 2; // 2px tolerance
      setOverflows(scrollable);
      setAtEnd(!scrollable || el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
    }

    check();
    el.addEventListener("scroll", check, { passive: true });
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", check);
      ro.disconnect();
    };
  }, []);

  return (
    <div>
      {/* Scroll hint — only visible on small screens when table actually overflows */}
      {overflows && (
        <p
          aria-hidden="true"
          className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-[#0591D4] sm:hidden"
        >
          <svg className="size-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 12m0 0 4.5-9M3 12h18m0 0-4.5-9M21 12l-4.5 9" />
          </svg>
          {hint}
        </p>
      )}
      <div
        ref={wrapRef}
        className={`charter-table-wrap${atEnd ? " scrolled-right" : ""}`}
      >
        {children}
      </div>
    </div>
  );
}
