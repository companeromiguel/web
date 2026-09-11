"use client";

const paragraphs = [
  <>
    The Trece Martires City Water District (TMCWD) is a government-owned and
    controlled corporation created under Presidential Decree No. 198, the{" "}
    <em>Provincial Water Utilities Act of 1973</em>.
  </>,
  <>
    Situated at the center of Cavite Province, Trece Martires City — formerly
    known as <em>Quintana</em> — is strategically accessible to all adjoining
    cities and municipalities. Once a semi-agricultural area, the city opened
    its doors to industrial and commercial development in the 1990s, spurring
    rapid population growth as people from adjacent provinces and municipalities
    flocked to the area.
  </>,
  <>
    The sudden influx of residents created a pressing demand for a reliable
    supply of clean drinking water. With no other alternatives, local officials
    sought the technical support of the Local Water Utilities Administration
    (LWUA), leading to the formal establishment of TMCWD — now serving the
    city&apos;s growing community of concessionaires, including the many
    resettlers who call Trece Martires home.
  </>,
  <>
    The district is governed by a Board of Directors appointed by LWUA and
    remains committed to the delivery of safe, adequate, and affordable water
    to every household within its franchise area.
  </>,
];

export default function AboutScroller() {
  return (
    /*
     * Outer — fixed visible window with fade masks top & bottom.
     * overflow-hidden clips the text outside this window.
     */
    <div className="about-scroller-window">
      {/*
       * Inner — doubled content in one continuous block.
       * The animation shifts it up by exactly 50% (one full copy),
       * then snaps back to 0 — making the loop invisible.
       */}
      <div className="about-scroller-track">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1 ? "true" : undefined}
            className="about-scroller-copy text-sm text-white/85 leading-relaxed space-y-4"
          >
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
