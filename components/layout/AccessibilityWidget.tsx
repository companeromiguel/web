"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./AccessibilityWidget.module.css";

type FontSize = "normal" | "large" | "larger";
type Contrast = "normal" | "high";

const STORAGE_KEY = "tmcwd-a11y";

function load(): { fontSize: FontSize; contrast: Contrast; reduceMotion: boolean } {
  if (typeof window === "undefined") return { fontSize: "normal", contrast: "normal", reduceMotion: false };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { fontSize: "normal", contrast: "normal", reduceMotion: false, ...JSON.parse(raw) };
  } catch {}
  return { fontSize: "normal", contrast: "normal", reduceMotion: false };
}

export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [fontSize, setFontSizeState] = useState<FontSize>("normal");
  const [contrast, setContrastState] = useState<Contrast>("normal");
  const [reduceMotion, setReduceMotionState] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const saved = load();
    applyAll(saved.fontSize, saved.contrast, saved.reduceMotion);
    setFontSizeState(saved.fontSize);
    setContrastState(saved.contrast);
    setReduceMotionState(saved.reduceMotion);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); triggerRef.current?.focus(); }
    };
    const onClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node) && e.target !== triggerRef.current)
        setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  function applyAll(fs: FontSize, ct: Contrast, rm: boolean) {
    const root = document.documentElement;
    root.classList.remove("a11y-font-large", "a11y-font-larger");
    if (fs !== "normal") root.classList.add(`a11y-font-${fs}`);
    root.classList.toggle("a11y-high-contrast", ct === "high");
    root.classList.toggle("a11y-reduce-motion", rm);
  }

  function save(fs: FontSize, ct: Contrast, rm: boolean) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ fontSize: fs, contrast: ct, reduceMotion: rm })); } catch {}
  }

  function setFontSize(fs: FontSize)    { setFontSizeState(fs);     applyAll(fs, contrast, reduceMotion); save(fs, contrast, reduceMotion); }
  function setContrast(ct: Contrast)    { setContrastState(ct);     applyAll(fontSize, ct, reduceMotion); save(fontSize, ct, reduceMotion); }
  function setReduceMotion(rm: boolean) { setReduceMotionState(rm); applyAll(fontSize, contrast, rm);     save(fontSize, contrast, rm); }

  function reset() {
    setFontSizeState("normal"); setContrastState("normal"); setReduceMotionState(false);
    applyAll("normal", "normal", false); save("normal", "normal", false);
  }

  const isModified = fontSize !== "normal" || contrast === "high" || reduceMotion;

  return (
    <div className={styles.root}>
      {/* Panel opens upward */}
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Accessibility options"
          aria-modal="true"
          className={styles.panel}
        >
          <div className={styles.panelHeader}>
            <span className={styles.panelTitle}>Accessibility</span>
            <button type="button" aria-label="Close accessibility panel"
              onClick={() => { setOpen(false); triggerRef.current?.focus(); }}
              className={styles.closeBtn}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className={styles.group}>
            <p className={styles.groupLabel}>Text size</p>
            <div className={styles.btnRow}>
              {(["normal", "large", "larger"] as FontSize[]).map((size) => (
                <button key={size} type="button" onClick={() => setFontSize(size)} aria-pressed={fontSize === size}
                  className={`${styles.optBtn} ${fontSize === size ? styles.active : ""}`}>
                  {size === "normal" ? "A" : size === "large" ? "A+" : "A++"}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.group}>
            <p className={styles.groupLabel}>Contrast</p>
            <div className={styles.btnRow}>
              <button type="button" onClick={() => setContrast("normal")} aria-pressed={contrast === "normal"}
                className={`${styles.optBtn} ${contrast === "normal" ? styles.active : ""}`}>Normal</button>
              <button type="button" onClick={() => setContrast("high")} aria-pressed={contrast === "high"}
                className={`${styles.optBtn} ${contrast === "high" ? styles.active : ""}`}>High</button>
            </div>
          </div>

          <div className={styles.group}>
            <label className={styles.toggle}>
              <span className={styles.groupLabel} style={{ margin: 0 }}>Reduce motion</span>
              <button type="button" role="switch" aria-checked={reduceMotion}
                onClick={() => setReduceMotion(!reduceMotion)}
                className={`${styles.switch} ${reduceMotion ? styles.switchOn : ""}`}>
                <span className={styles.switchThumb} />
              </button>
            </label>
          </div>

          <button type="button" onClick={reset} className={styles.resetBtn}>
            Reset to defaults
          </button>
        </div>
      )}

      {/* Trigger */}
      <button
        ref={triggerRef}
        type="button"
        aria-label="Accessibility options"
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((v) => !v)}
        className={`${styles.trigger} ${isModified ? styles.triggerActive : ""}`}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
          <circle cx="12" cy="4.5" r="1.75" fill="currentColor" stroke="none" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 8.5h8M12 8.5v5m0 0-2.5 4m2.5-4 2.5 4" />
        </svg>
        {isModified && <span className={styles.dot} aria-hidden="true" />}
      </button>
    </div>
  );
}
