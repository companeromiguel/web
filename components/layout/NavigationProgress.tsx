"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * NavigationProgress
 *
 * A thin YouTube-style progress bar that appears at the very top of the
 * page whenever the pathname changes (i.e. the user navigates).
 *
 * How it works:
 * - On pathname change → bar slides from 0 → 85% (fast, gives immediate feedback)
 * - After a short delay → bar completes to 100% and fades out
 * - z-index 100 puts it above the header (z-50) and AccessibilityWidget (z-55)
 */
export default function NavigationProgress() {
  const pathname              = usePathname();
  const [visible, setVisible] = useState(false);
  const [width, setWidth]     = useState(0);
  const [opacity, setOpacity] = useState(1);
  const timerRef              = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevPathname          = useRef(pathname);

  useEffect(() => {
    // Don't fire on the very first render
    if (prevPathname.current === pathname) return;
    prevPathname.current = pathname;

    // Clear any in-flight timers
    if (timerRef.current) clearTimeout(timerRef.current);

    // Start the bar
    setOpacity(1);
    setVisible(true);
    setWidth(0);

    // Small delay so the state flush happens before animating
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setWidth(85);
      });
    });

    // Complete and fade out after navigation settles
    timerRef.current = setTimeout(() => {
      setWidth(100);
      timerRef.current = setTimeout(() => {
        setOpacity(0);
        timerRef.current = setTimeout(() => {
          setVisible(false);
          setWidth(0);
          setOpacity(1);
        }, 300); // matches fade-out transition
      }, 200); // hold at 100% briefly
    }, 300);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [pathname]);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position:   "fixed",
        top:        0,
        left:       0,
        right:      0,
        height:     "3px",
        zIndex:     100,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          height:     "100%",
          width:      `${width}%`,
          opacity,
          background: "linear-gradient(90deg, #0591D4, #24B2EA)",
          boxShadow:  "0 0 8px rgba(5,145,212,0.7)",
          transition: width === 0
            ? "none"
            : width === 100
              ? "width 0.2s ease-out, opacity 0.3s ease"
              : "width 0.4s cubic-bezier(0.1, 0.6, 0.4, 1), opacity 0.3s ease",
        }}
      />
    </div>
  );
}
