"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function SplashScreen() {
  const [phase, setPhase] = useState<"enter" | "hold" | "exit" | "done">("enter");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"), 800);
    const t2 = setTimeout(() => setPhase("exit"), 2000);
    const t3 = setTimeout(() => setPhase("done"), 2700);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={[
        "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white",
        "transition-opacity duration-700 ease-in-out",
        phase === "exit" ? "opacity-0" : "opacity-100",
      ].join(" ")}
      aria-hidden="true"
    >
      {/* Logo — fades and scales in */}
      <div
        className={[
          "transition-all duration-700 ease-out",
          phase === "enter"
            ? "opacity-0 scale-90"
            : "opacity-100 scale-100",
        ].join(" ")}
      >
        <Image
          src="/logo.png"
          alt=""
          width={72}
          height={72}
          className="size-[72px]"
          priority
        />
      </div>

      {/* Thin animated line below logo */}
      <div className="mt-8 w-12 h-px bg-[#E8EEF2] overflow-hidden relative">
        <div
          className={[
            "absolute inset-y-0 left-0 bg-[#0591D4] transition-all ease-in-out",
            phase === "enter" ? "w-0 duration-0" : "w-full duration-[1400ms]",
          ].join(" ")}
        />
      </div>
    </div>
  );
}
