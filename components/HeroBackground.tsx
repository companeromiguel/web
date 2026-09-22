"use client";

import { useEffect, useState } from "react";


const slides = ["/img1.jpg", "/img2.jpg", "/img3.jpg", "/img4.jpg", "/img5.png"];

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
      {slides.map((src, index) => <div
        key={src}
        className="home-slideshow-image"
        style={{ position: "absolute", inset: 0, backgroundImage: `url('${src}')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", opacity: active === index ? 1 : 0, transition: "opacity 1s ease-in-out" }}
      />)}
      <div className="home-slideshow-overlay" style={{ position: "absolute", inset: 0, background: "rgb(31 41 55 / 55%)" }} />
    </div>
  </>;
}
