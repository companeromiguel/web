const layers = [
  {
    "d": "M0,280 C200,220 400,320 600,260 C800,200 1000,300 1200,250 C1320,225 1400,260 1440,255 L1440,400 L0,400 Z",
    "fill": "rgba(5,145,212,0.06)",
    "motion": "animate-wave-slow"
  },
  {
    "d": "M0,320 C150,280 350,360 550,310 C750,260 950,340 1150,300 C1300,270 1400,305 1440,300 L1440,400 L0,400 Z",
    "fill": "rgba(5,145,212,0.04)",
    "motion": "animate-wave-mid"
  },
  {
    "d": "M0,355 C180,330 360,370 540,348 C720,326 900,362 1080,345 C1260,328 1380,350 1440,348 L1440,400 L0,400 Z",
    "fill": "rgba(36,178,234,0.05)",
    "motion": "animate-wave-fast"
  },
  {
    "d": "M0,40 C240,80 480,10 720,50 C960,90 1200,20 1440,55 L1440,0 L0,0 Z",
    "fill": "rgba(55,10,119,0.02)",
    "motion": "animate-wave-mid"
  },
  {
    "d": "M0,160 C300,120 600,200 900,150 C1100,115 1300,160 1440,145 L1440,180 C1300,195 1100,150 900,185 C600,230 300,155 0,195 Z",
    "fill": "rgba(5,145,212,0.03)",
    "motion": "animate-wave-slow"
  }
];

/** Home's pale-blue waves, with optional motion using its wave animation timings. */
export default function TransparencyWaveBackground({ animated = false }: { animated?: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-br from-[#e8f4fb] via-[#f2f8fc] to-[#ddeef7]" />
      {layers.map(({ d, fill, motion }, index) => (
        <svg
          key={index}
          className={animated
            ? `absolute top-0 left-0 h-full w-[200%] ${motion} motion-reduce:animate-none!`
            : "absolute inset-0 w-full h-full"}
          style={animated ? { animationDirection: index % 2 === 0 ? "alternate" : "alternate-reverse" } : undefined}
          viewBox="0 0 1440 400"
          preserveAspectRatio={animated ? "none" : "xMidYMid slice"}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={d} fill={fill} />
        </svg>
      ))}
    </div>
  );
}
