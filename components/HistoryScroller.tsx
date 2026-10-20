"use client";

import { useEffect, useRef, useState } from "react";

/* ── Content ──────────────────────────────────────────────────── */

const staffRows: [string, string][] = [
  ["Mr. Tito S. Delos Santos",   "Administrative / Finance Section"],
  ["Mr. Ernesto T. Tabor",        "Commercial Section"],
  ["Mr. Joselito N. Martal",      "Engineering Section"],
  ["Mr. Joel A. Espineli",        "Maintenance Section"],
  ["Ms. Angela R. Nuestro",       "Personnel / Supply Officer"],
  ["Ms. Zenaida L. Panganiban",   "Clerk Processor"],
  ["Mr. Romeo C. Poniente",       "Water Resources Facilities Operator B"],
  ["Mr. Librado E. Avilla",       "Water Resources Facilities Operator B"],
  ["Mr. Menandro I. Guinday",     "Water Resources Facilities Operator B"],
  ["Mr. Reynante A. Vicedo",      "Water Resources Facilities Operator B"],
  ["Mr. Gener DS. Apostol",       "Water Resources Facilities Operator B"],
  ["Mr. Ramon DR. Rosarda",       "Water Sewerage Maintenance Man B"],
];

function HistoryContent() {
  return (
    <div className="history-scroller-body">
      <p>Almost 20 years have passed since Trece Martires City Water District was created. Many concessionaires — particularly newly resettled residents — have wondered how it all began.</p>
      <p>At the center of Cavite Province sits a place once known as <em>Quintana</em> — today&apos;s Trece Martires City. Strategically accessible to all adjoining cities and municipalities, the city became the seat of the Provincial Capitol, a source of deep pride for its residents.</p>
      <p>Development planners firmly believed the city would become a prime business hub. Part of the local administration&apos;s strategy was opening the door for foreign and local investors, leading to rapid industrialization during the 1990s, when semi-agricultural land was offered to the industrial and commercial sector.</p>
      <p>With continuous development came population growth. The sudden influx of people from adjacent provinces, cities, and municipalities created pressing needs. All sectors called on local officials to address the urgent demand for a dependable supply of safe drinking water. Having no other alternative, the city turned to the Local Water Utilities Administration (LWUA) for technical support and services.</p>
      <p>On the 26th day of March 1997, the City Council passed Resolution No. 97-045 with overwhelming approval. The commitment of Local Chief Executive Hon. Prudencio M. Panganiban was reflected in the resolution. All legal requirements contained in PD 198 were complied with. On the same date, the Deed of Transfer was signed. On July 17, 1998, LWUA issued Conditional Certificate of Conformance No. 574, formally recognizing TMCWD. All physical facilities, including sites, rights of way, assets, receivables, and other properties of the TMC Waterworks System were transferred to the district. The City Government subsidized the first year of operational expenses, providing additional stability.</p>
      <p>A new Board of Directors was appointed by the Local Chief Executive: Ms. Martina A. Panganiban as Chair, alongside Ms. Leticia F. Villanueva, Mr. Vivencio M. Limbo, Mr. Pablito Q. Lontoc, Mr. Dennis Rasing, and Engr. Juanito N. Angeles as acting General Manager. In the district&apos;s first year, Mr. Rasing tendered his resignation and Engr. Angeles left for health reasons. Dr. Lea S. Lontoc was appointed to the Board. Mr. Eduardo M. Romen was appointed full-pledge General Manager, envisioning that within five years every household within the district&apos;s jurisdiction would have an adequate supply of water.</p>
      <p>The district&apos;s workforce in its first two years consisted of approximately twelve personnel:</p>
      <table className="history-scroller-table">
        <tbody>
          {staffRows.map(([name, role]) => (
            <tr key={name}><td>{name}</td><td>{role}</td></tr>
          ))}
        </tbody>
      </table>
      <p>On July 1, 2001, Mr. Eduardo M. Romen was formally appointed as General Manager, supervising 18 hardworking employees. In 2003, Mayor Hon. Melencio L. De Sagun Jr. appointed Mr. Benigno P. Colorado as a member of the Board in lieu of Ms. Panganiban. Mr. Colorado&apos;s corporate approach expressed wisdom, integrity, and sincerity in leadership.</p>
      <p>In early 2004, Mr. Vivencio M. Limbo was elected new Board chairperson. That same month, Dr. Veronica G. De Sagun, representing the Professional Sector, filled the resulting vacancy. An optometrist and active in civic and religious organizations, she was also Chairperson of the Local Tourism, Culture and Arts office — dedicated to preserving the legacy of the thirteen martyrs and rekindling the arts and culture of the Treceñians.</p>
      <p>In 2008, Acting General Manager Tito S. Delos Santos expanded services to 11 barangays with approximately 15,000 water users. From January 2009, General Manager Juliet R. Ocampo, together with the newly appointed Board — Dr. Veronica G. De Sagun, Ms. Narcisa L. Montano, Ms. Ruth S. Villar, Ms. Thelma V. Nuestro, and Ms. Lolita G. Aure — pushed to reach more than 20,000 concessionaires across 12 barangays and subdivisions. The District engaged in environmental programs including Tree Planting, Sagip Ilog, Brigada Eskwela, medical missions, World Water Day celebrations, and Alay Lakad.</p>
      <p>In 2015, the new TMCWD building was fully operational and blessed on December 8, 2015. On February 16, 2016, the District transferred from its former office beside the CSC building to the new facility.</p>
      <p>The District received an unsolicited proposal from PrimeWater on November 4, 2015, and an updated proposal on May 25, 2017, covering financing, development, rehabilitation, expansion, operation, and maintenance of the Water Supply and Septage Management System. After evaluation, the Board issued Resolution No. 2017-06-040B on June 8, 2017, accepting the proposal &quot;in principle&quot; and creating a Joint Venture Selection Committee (JVSC). Negotiations were held across September and October 2017, resulting in agreement on basic terms.</p>
      <p>The Board declared PrimeWater as the Original Proponent via Resolution No. 2017-12-077 dated December 21, 2017. Following publication of the Invitation to Apply for Eligibility and to Submit Proposal (IAESP) in Business Mirror on January 3, 2018, no competing proponent submitted a proposal by the January 17 deadline. The JVSC recommended awarding the contract to PrimeWater Infrastructure Corporation.</p>
      <p>The Ceremonial Signing of the Joint Venture Contract was held on April 10, 2018 at the 3rd floor of the TMCWD building. This partnership aspires to achieve the highest levels of service coverage while ensuring water quality meets established standards and tariffs remain fair and reasonable. A Septage Management System will also be implemented, addressing sanitation services for households and establishments throughout Trece Martires.</p>
    </div>
  );
}

/* ── Scroller ─────────────────────────────────────────────────── */

const SPEED = 25; // px per second

export default function HistoryScroller() {
  const [expanded, setExpanded] = useState(false);
  const viewportRef  = useRef<HTMLDivElement>(null);
  const rafRef       = useRef<number>(0);
  const prevTsRef    = useRef<number>(-1);   // -1 = not started yet
  const manualRef    = useRef(false);
  const resumeTimer  = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (expanded) return;
    const el = viewportRef.current;
    if (!el) return;

    function tick(ts: number) {
      if (!el) return;

      if (!manualRef.current) {
        if (prevTsRef.current < 0) {
          prevTsRef.current = ts;
        } else {
          const dt = (ts - prevTsRef.current) / 1000;
          prevTsRef.current = ts;
          const maxScroll = el.scrollHeight - el.clientHeight;
          if (maxScroll > 0) {
            const next = el.scrollTop + SPEED * dt;
            el.scrollTop = next >= maxScroll ? 0 : next;
          }
        }
      } else {
        prevTsRef.current = ts;
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      prevTsRef.current = -1;
    };
  }, [expanded]);

  function pauseForUser() {
    manualRef.current = true;
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      manualRef.current = false;
    }, 3000);
  }

  return (
    <div className="history-scroller-root">
      {expanded ? (
        <div className="history-scroller-expanded">
          <HistoryContent />
        </div>
      ) : (
        <div
          ref={viewportRef}
          className="history-scroller-window"
          onWheel={pauseForUser}
          onPointerDown={pauseForUser}
          onTouchStart={pauseForUser}
        >
          <HistoryContent />
        </div>
      )}

      <div className="history-scroller-footer">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="history-scroller-btn"
        >
          {expanded ? (
            <>
              <svg className="history-scroller-btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
              </svg>
              Show less
            </>
          ) : (
            <>
              <svg className="history-scroller-btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
              Read full history
            </>
          )}
        </button>
      </div>
    </div>
  );
}
