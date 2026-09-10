"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function SplashScreen() {
  const [phase, setPhase] = useState<"visible" | "fading" | "done">("visible");

  useEffect(() => {
    // Logo appears → hold → fade out
    const fadeTimer = setTimeout(() => setPhase("fading"), 2200);
    const doneTimer = setTimeout(() => setPhase("done"), 3000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={[
        "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#370A77]",
        "transition-opacity duration-700 ease-in-out",
        phase === "fading" ? "opacity-0 pointer-events-none" : "opacity-100",
      ].join(" ")}
      aria-hidden="true"
    >
      {/* Logo */}
      <div
        className={[
          "transition-all duration-700 ease-out",
          phase === "visible" ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4",
        ].join(" ")}
        style={{ animationFillMode: "both" }}
      >
        <Image
          src="/logo.png"
          alt=""
          width={96}
          height={96}
          className="size-24 drop-shadow-xl animate-splash-logo"
          priority
        />
      </div>

      {/* Org name */}
      <div
        className={[
          "mt-5 text-center transition-all duration-700 delay-300 ease-out",
          phase === "visible" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
        ].join(" ")}
      >
        <p className="text-white font-bold text-lg tracking-tight leading-snug">
          Trece Martires City
        </p>
        <p className="text-white/70 text-sm mt-0.5 tracking-wide">
          Water District
        </p>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white/10">
        <div className="h-full bg-[#24B2EA] animate-splash-bar" />
      </div>
    </div>
  );
}
