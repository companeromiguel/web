"use client";

import { useEffect, useState } from "react";


const slides: { src: string; position?: string }[] = [
  { src: "/imgv3.jpg", position: "45% center" },
  { src: "/img2.jpg" },
  { src: "/img3.jpg" },
  { src: "/img4.jpg" },
  { src: "/imgv2.jpg" },
];

export default function HeroBackground() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive(current => (current + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  return <>
    <div className="home-slideshow-background" style={{ position: "absolute", inset: 0, zIndex: 0, background: "#123b60", pointerEvents: "none" }} aria-hidden="true">
      {slides.map(({ src, position }, index) => <div
        key={src}
        className="home-slideshow-image"
        style={{ position: "absolute", inset: 0, backgroundImage: `url('${src}')`, backgroundSize: "cover", backgroundPosition: position ?? "center", backgroundRepeat: "no-repeat", opacity: active === index ? 1 : 0, transition: "opacity 1s ease-in-out" }}
      />)}
      <div className="home-slideshow-overlay" style={{ position: "absolute", inset: 0, background: "rgb(31 41 55 / 55%)" }} />
    </div>
  </>;
}
