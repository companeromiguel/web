"use client";

import { useEffect, useRef, useState, useCallback, CSSProperties } from "react";
import styles from "./AccessibilityWidget.module.css";

/* ── Font size: 0 = normal, 1 = large (112%), 2 = larger (125%), 3 = largest (140%) */
type FontLevel = 0 | 1 | 2 | 3;

interface A11yState {
  fontLevel: FontLevel;
  grayscale: boolean;
  highContrast: boolean;
  negativeContrast: boolean;
  lightBackground: boolean;
  linksUnderline: boolean;
  readableFont: boolean;
}

const DEFAULT_STATE: A11yState = {
  fontLevel: 0,
  grayscale: false,
  highContrast: false,
  negativeContrast: false,
  lightBackground: false,
  linksUnderline: false,
  readableFont: false,
};

const STORAGE_KEY   = "tmcwd-a11y-v2";
const POSITION_KEY  = "tmcwd-a11y-pos";
const BUTTON_SIZE   = 44;
const DRAG_THRESHOLD = 6;

interface WidgetPos {
  edge: "left" | "right";
  top: number; // px from top of viewport, button center
}

// During drag we track raw x/y of the button center
interface DragLive {
  x: number;
  y: number;
}

function defaultPos(): WidgetPos {
  return { edge: "right", top: typeof window !== "undefined" ? window.innerHeight * 0.35 : 300 };
}

function loadPos(): WidgetPos {
  if (typeof window === "undefined") return defaultPos();
  try {
    const raw = localStorage.getItem(POSITION_KEY);
    if (raw) return { ...defaultPos(), ...JSON.parse(raw) };
  } catch {}
  return defaultPos();
}

function savePos(p: WidgetPos) {
  try { localStorage.setItem(POSITION_KEY, JSON.stringify(p)); } catch {}
}

function load(): A11yState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch {}
  return DEFAULT_STATE;
}

function applyState(s: A11yState) {
  const root = document.documentElement;
  root.classList.remove("a11y-font-large", "a11y-font-larger", "a11y-font-largest");
  if (s.fontLevel === 1) root.classList.add("a11y-font-large");
  else if (s.fontLevel === 2) root.classList.add("a11y-font-larger");
  else if (s.fontLevel === 3) root.classList.add("a11y-font-largest");
  root.classList.toggle("a11y-grayscale",          s.grayscale);
  root.classList.toggle("a11y-high-contrast",      s.highContrast);
  root.classList.toggle("a11y-negative-contrast",  s.negativeContrast);
  root.classList.toggle("a11y-light-background",   s.lightBackground);
  root.classList.toggle("a11y-links-underline",    s.linksUnderline);
  root.classList.toggle("a11y-readable-font",      s.readableFont);
}

function save(s: A11yState) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch {}
}

/* ── SVG icons ────────────────────────────────────────────────────── */
function IconIncreaseText() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <circle cx="12" cy="12" r="9" strokeWidth={1.5} />
      <text x="12" y="16" textAnchor="middle" fontSize="10" fontWeight="700"
        fill="currentColor" stroke="none" fontFamily="Arial,sans-serif">A+</text>
    </svg>
  );
}
function IconDecreaseText() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <circle cx="12" cy="12" r="9" strokeWidth={1.5} />
      <text x="12" y="16" textAnchor="middle" fontSize="10" fontWeight="700"
        fill="currentColor" stroke="none" fontFamily="Arial,sans-serif">A-</text>
    </svg>
  );
}
function IconGrayscale() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <rect x="3" y="6" width="18" height="3" rx="1" />
      <rect x="3" y="11" width="18" height="3" rx="1" opacity=".6" />
      <rect x="3" y="16" width="18" height="3" rx="1" opacity=".3" />
    </svg>
  );
}
function IconHighContrast() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={1.8} />
      <path d="M12 3a9 9 0 0 1 0 18V3z" fill="currentColor" />
    </svg>
  );
}
function IconNegativeContrast() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="currentColor" />
      <path d="M12 3a9 9 0 0 1 0 18V3z" fill="none" stroke="currentColor"
        strokeWidth={0} style={{ fill: "var(--a11y-icon-bg, #fff)" }} />
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={1.8} fill="none" />
      <path d="M12 3v18A9 9 0 0 0 12 3z"
        style={{ fill: "var(--a11y-icon-bg, #fff)" }} />
    </svg>
  );
}
function IconLightBackground() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path strokeLinecap="round" d="M12 3v2M12 19v2M3 12h2M19 12h2M5.64 5.64l1.41 1.41M16.95 16.95l1.41 1.41M5.64 18.36l1.41-1.41M16.95 7.05l1.41-1.41" />
    </svg>
  );
}
function IconLinksUnderline() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      <line x1="4" y1="20" x2="20" y2="20" strokeWidth={2} />
    </svg>
  );
}
function IconReadableFont() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h10M4 18h13" />
    </svg>
  );
}
function IconReset() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M3 12a9 9 0 1 0 2.6-6.36L3 8" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v5h5" />
    </svg>
  );
}

/* ── Main component ───────────────────────────────────────────────── */
export default function AccessibilityWidget() {
  const [open, setOpen]         = useState(false);
  const [state, setState]       = useState<A11yState>(DEFAULT_STATE);
  const [pos, setPos]           = useState<WidgetPos | null>(null);
  const [dragLive, setDragLive] = useState<DragLive | null>(null); // non-null = currently dragging

  const panelRef   = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Drag tracking refs — no re-render during move, only setDragLive does
  const dragStart = useRef<{ px: number; py: number; startX: number; startY: number } | null>(null);
  const hasMoved  = useRef(false);

  // Load saved preferences + position on mount
  useEffect(() => {
    const saved = load();
    setState(saved);
    applyState(saved);
    setPos(loadPos());
  }, []);

  // Close panel on outside click or Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); triggerRef.current?.focus(); }
    };
    const onMouse = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        e.target !== triggerRef.current
      ) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onMouse);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onMouse);
    };
  }, [open]);

  /* ── Drag handlers ── */
  const onPointerDown = useCallback((e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    e.currentTarget.setPointerCapture(e.pointerId);

    // Starting button-center position
    const startX = e.clientX;
    const startY = e.clientY;
    dragStart.current = { px: startX, py: startY, startX, startY };
    hasMoved.current  = false;
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLButtonElement>) => {
    if (!dragStart.current || !pos) return;
    const dx = e.clientX - dragStart.current.px;
    const dy = e.clientY - dragStart.current.py;

    if (!hasMoved.current && Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
    hasMoved.current = true;

    // Button center follows the pointer exactly
    const snappedY = Math.max(BUTTON_SIZE / 2, Math.min(window.innerHeight - BUTTON_SIZE / 2, e.clientY));
    const snappedX = Math.max(BUTTON_SIZE / 2, Math.min(window.innerWidth  - BUTTON_SIZE / 2, e.clientX));

    setDragLive({ x: snappedX, y: snappedY });
  }, [pos]);

  const onPointerUp = useCallback((e: React.PointerEvent<HTMLButtonElement>) => {
    if (!dragStart.current) return;
    e.currentTarget.releasePointerCapture(e.pointerId);

    if (hasMoved.current) {
      // Snap to nearest edge
      const snapEdge: "left" | "right" = e.clientX < window.innerWidth / 2 ? "left" : "right";
      const clampedTop = Math.max(
        BUTTON_SIZE / 2,
        Math.min(window.innerHeight - BUTTON_SIZE / 2, e.clientY)
      );
      const newPos: WidgetPos = { edge: snapEdge, top: clampedTop };
      setPos(newPos);
      savePos(newPos);
      setDragLive(null);
      setOpen(false);
    } else {
      // Tap/click — toggle panel
      setDragLive(null);
      setOpen((v) => !v);
    }

    dragStart.current = null;
    hasMoved.current  = false;
  }, []);

  function update(patch: Partial<A11yState>) {
    setState((prev) => {
      const next = { ...prev, ...patch };
      applyState(next);
      save(next);
      return next;
    });
  }

  function increaseText() { update({ fontLevel: Math.min(3, state.fontLevel + 1) as FontLevel }); }
  function decreaseText() { update({ fontLevel: Math.max(0, state.fontLevel - 1) as FontLevel }); }
  function resetAll() { setState(DEFAULT_STATE); applyState(DEFAULT_STATE); save(DEFAULT_STATE); }

  const isModified =
    state.fontLevel !== 0 || state.grayscale || state.highContrast ||
    state.negativeContrast || state.lightBackground ||
    state.linksUnderline || state.readableFont;

  if (!pos) return null;

  const isDragging = dragLive !== null;
  const isRight    = isDragging
    ? dragLive.x >= window.innerWidth / 2
    : pos.edge === "right";

  /* ── Root position ── */
  let rootStyle: CSSProperties;
  if (isDragging) {
    // Free-floating: center the button on the pointer
    rootStyle = {
      top:   dragLive.y - BUTTON_SIZE / 2,
      left:  dragLive.x - BUTTON_SIZE / 2,
      right: "auto",
      transition: "none",
      filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.35))",
      transform: "scale(1.08)",
      zIndex: 9999,
    };
  } else {
    rootStyle = {
      top:   pos.top - BUTTON_SIZE / 2,
      left:  pos.edge === "right" ? undefined : 0,
      right: pos.edge === "right" ? 0 : undefined,
      alignItems: pos.edge === "right" ? "flex-end" : "flex-start",
    };
  }

  const triggerStyle: CSSProperties = {
    borderRadius: isDragging
      ? "8px"
      : isRight ? "6px 0 0 6px" : "0 6px 6px 0",
    cursor: isDragging ? "grabbing" : "grab",
  };

  const panelStyle: CSSProperties = {
    position: "fixed",
    top: Math.max(8, Math.min(window.innerHeight - 500, pos.top - BUTTON_SIZE / 2)),
    left:  pos.edge === "right" ? undefined : BUTTON_SIZE + 8,
    right: pos.edge === "right" ? BUTTON_SIZE + 8 : undefined,
    borderRadius: pos.edge === "right" ? "14px 0 0 14px" : "0 14px 14px 0",
  };

  return (
    <div
      className={`${styles.root} ${isDragging ? styles.rootDragging : ""}`}
      style={rootStyle}
    >
      {open && !isDragging && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Accessibility Tools"
          aria-modal="true"
          className={styles.panel}
          style={panelStyle}
        >
          {/* Header */}
          <div className={styles.panelHeader}>
            <div className={styles.panelIconWrap} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
                <circle cx="12" cy="4.5" r="1.75" fill="currentColor" stroke="none" />
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M8 8.5h8M12 8.5v5m0 0-2.5 4m2.5-4 2.5 4" />
              </svg>
            </div>
            <span className={styles.panelTitle}>Accessibility Tools</span>
            <button
              type="button"
              aria-label="Close accessibility panel"
              onClick={() => { setOpen(false); triggerRef.current?.focus(); }}
              className={styles.closeBtn}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Option rows */}
          <ul className={styles.list} role="list">
            <li>
              <button type="button"
                className={`${styles.row} ${state.fontLevel > 0 ? styles.rowActive : ""}`}
                onClick={increaseText} disabled={state.fontLevel >= 3}
                aria-label={`Increase text size (current level ${state.fontLevel} of 3)`}>
                <span className={styles.rowIcon}><IconIncreaseText /></span>
                <span className={styles.rowLabel}>Increase Text</span>
                {state.fontLevel > 0 && <span className={styles.badge} aria-hidden="true">+{state.fontLevel}</span>}
              </button>
            </li>
            <li>
              <button type="button"
                className={`${styles.row} ${state.fontLevel > 0 ? styles.rowActive : ""}`}
                onClick={decreaseText} disabled={state.fontLevel <= 0}
                aria-label={`Decrease text size (current level ${state.fontLevel} of 3)`}>
                <span className={styles.rowIcon}><IconDecreaseText /></span>
                <span className={styles.rowLabel}>Decrease Text</span>
              </button>
            </li>
            <li role="separator" className={styles.divider} />
            <li>
              <button type="button"
                className={`${styles.row} ${state.grayscale ? styles.rowActive : ""}`}
                onClick={() => update({ grayscale: !state.grayscale })} aria-pressed={state.grayscale}>
                <span className={styles.rowIcon}><IconGrayscale /></span>
                <span className={styles.rowLabel}>Grayscale</span>
                {state.grayscale && <span className={styles.checkmark} aria-hidden="true">✓</span>}
              </button>
            </li>
            <li>
              <button type="button"
                className={`${styles.row} ${state.highContrast ? styles.rowActive : ""}`}
                onClick={() => update({ highContrast: !state.highContrast })} aria-pressed={state.highContrast}>
                <span className={styles.rowIcon}><IconHighContrast /></span>
                <span className={styles.rowLabel}>High Contrast</span>
                {state.highContrast && <span className={styles.checkmark} aria-hidden="true">✓</span>}
              </button>
            </li>
            <li>
              <button type="button"
                className={`${styles.row} ${state.negativeContrast ? styles.rowActive : ""}`}
                onClick={() => update({ negativeContrast: !state.negativeContrast })} aria-pressed={state.negativeContrast}>
                <span className={styles.rowIcon}><IconNegativeContrast /></span>
                <span className={styles.rowLabel}>Negative Contrast</span>
                {state.negativeContrast && <span className={styles.checkmark} aria-hidden="true">✓</span>}
              </button>
            </li>
            <li>
              <button type="button"
                className={`${styles.row} ${state.lightBackground ? styles.rowActive : ""}`}
                onClick={() => update({ lightBackground: !state.lightBackground })} aria-pressed={state.lightBackground}>
                <span className={styles.rowIcon}><IconLightBackground /></span>
                <span className={styles.rowLabel}>Light Background</span>
                {state.lightBackground && <span className={styles.checkmark} aria-hidden="true">✓</span>}
              </button>
            </li>
            <li role="separator" className={styles.divider} />
            <li>
              <button type="button"
                className={`${styles.row} ${state.linksUnderline ? styles.rowActive : ""}`}
                onClick={() => update({ linksUnderline: !state.linksUnderline })} aria-pressed={state.linksUnderline}>
                <span className={styles.rowIcon}><IconLinksUnderline /></span>
                <span className={styles.rowLabel}>Links Underline</span>
                {state.linksUnderline && <span className={styles.checkmark} aria-hidden="true">✓</span>}
              </button>
            </li>
            <li>
              <button type="button"
                className={`${styles.row} ${state.readableFont ? styles.rowActive : ""}`}
                onClick={() => update({ readableFont: !state.readableFont })} aria-pressed={state.readableFont}>
                <span className={styles.rowIcon}><IconReadableFont /></span>
                <span className={styles.rowLabel}>Readable Font</span>
                {state.readableFont && <span className={styles.checkmark} aria-hidden="true">✓</span>}
              </button>
            </li>
            <li role="separator" className={styles.divider} />
            <li>
              <button type="button" className={styles.rowReset} onClick={resetAll}
                disabled={!isModified} aria-label="Reset all accessibility settings to default">
                <span className={styles.rowIcon}><IconReset /></span>
                <span className={styles.rowLabel}>Reset</span>
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* Draggable trigger button */}
      <button
        ref={triggerRef}
        type="button"
        aria-label="Accessibility options — drag to reposition"
        aria-expanded={open}
        aria-haspopup="dialog"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        style={triggerStyle}
        className={`${styles.trigger} ${isModified ? styles.triggerActive : ""}`}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
          <circle cx="12" cy="4.5" r="1.75" fill="currentColor" stroke="none" />
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M8 8.5h8M12 8.5v5m0 0-2.5 4m2.5-4 2.5 4" />
        </svg>
        {isModified && <span className={styles.dot} aria-hidden="true" />}
      </button>
    </div>
  );
}
