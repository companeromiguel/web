"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import styles from "./BackToTop.module.css";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 100);
    const initialFrame = window.requestAnimationFrame(updateVisibility);
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => {
      window.cancelAnimationFrame(initialFrame);
      window.removeEventListener("scroll", updateVisibility);
    };
  }, []);

  return <button type="button" className={`${styles.button} ${visible ? styles.visible : ""}`} aria-label="Back to top" aria-hidden={!visible} tabIndex={visible ? 0 : -1} title="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })}>
    <ChevronUp className="block shrink-0" size={24} strokeWidth={2.5} aria-hidden="true" />
  </button>;
}
