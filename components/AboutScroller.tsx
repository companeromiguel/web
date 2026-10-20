"use client";

import { useEffect, useRef, useState } from "react";

const paragraphs = [
  <>Almost 20 years when Trece Martires City Water District was created. Many of our concessionaires particularly newly resettlers were amazed and asked how it all started.</>,
  <>At the center of the Cavite Province, situated a small place known as Trece Martires City, a component city formerly called as QUINTANA. Strategically it is accessible to all adjoining cities and municipalities of the province. Significantly, the Trecenians were so proud that is has become the seat of the Provincial Capitol.</>,
  <>Development planners and practitioners firmly believing that this City would soon become a prime business hub a highly urbanized place. Part of the development strategies of local administration is that they open the door for foreign and local investors thus leading to the rapid industrialization of Trece Martires City. It was on the decade of ninety&apos;s (90&apos;s) when the local government offered its semi-agricultural land to the industrial and commercial sector.</>,
  <>The cyclical flow of the development in Trece Martires City is continuously growing-up with the corresponding population growth rate. The sudden influx of the people from various adjacent provinces, cities, and municipalities creates pressing issues. An existence over the commonality of needs for a certain problem bothers the local city officials. All sectors were calling their attention to heed their dire need for desirable supply of drinkable WATER. Having no other alternatives, they resorted to avail the technical support and services of the Local Water Utilities Administration (LWUA).</>,
  <>On the 26th day of March 1997, the City Council passed Resolution No. 97-045 with an overwhelming approval from all the local city legislators. The commitment of the Local Chief Executive Hon. Prudencio M. Panganiban, to look after for the general well-being of his constituents, in terms of domestic water services, profoundly approved the said resolution. All the legal impediments contained in PD 198 have been religiously complied. Upon its creation, the Trece Martires City Water District (TMCWD) is very fortunate, that on the same date, the Deed of Transfer was signed. And on July 17, 1998 the Local Water Utilities Administration (LWUA) has approved and issued the conditional Certificate of Conformance No. 574, that legally recognizing the existence of Trece Martires City Water District. All the existing physical facilities, including sites, rights of way, assets, receivables and other properties owned by TMC Waterworks System are transferred, ceded, conveyed and turned-over to TRECE MARTIRES CITY WATER DISTRICT. Relevantly, the City Government subsidized the one-year operational expenses of the district thus making it more stable.</>,
  <>Initially, a new set of Board of Directors was appointed by the Local Chief Executive; Ms. Martina A. Panganiban – Chair, Ms. Leticia F. Villanueva, Mr. Vivencio M. Limbo, Mr. Pablito Q. Lontoc, Mr. Dennis Rasing and Engr. Juanito N. Angeles as acting General Manager. However, on its first year as a member of the Board of Directors; Mr. Dennis Rasing tendered his resignation for personal reason. While the General Manager – Engr. Juanito N. Angeles amicably left his post for health reason. A new member of the Board of Director was appointed in the person of Dr. Lea S. Lontoc, a representative from educational sector. On the other hand, a well-experienced and energetic man, Mr. Eduardo M. Romen, an educator by profession was appointed as the full pledge General Manager of Trece Martires City Water District. He envisions that within a span of Five (5) years, every household within the jurisdiction of the district, will be having an adequate supply of precious water to drink.</>,
  <>The organizational structure of the district is not totally completed without the presence of the office personnel who were given their respective duties and responsibilities. On its two consecutive years in operation the employees were discharging their multiple functions just to meet the desired goal of the district. Initially the workforce is composed only of about twelve (12) personnel&apos;s: Mr. Tito S. Delos Santos (Administrative / Finance Section), Mr. Ernesto T. Tabor (Commercial Section), Mr. Joselito N. Martal (Engineering Section), Mr. Joel A. Espineli (Maintenance Section), Ms. Angela R. Nuestro (Personnel / Supply Officer), Ms. Zenaida L. Panganiban (Clerk Processor), Mr. Romeo C. Poniente, Mr. Librado E. Avilla, Mr. Menandro I. Guinday, Mr. Reynante A. Vicedo, Mr. Gener DS. Apostol (Water Res. Fac. Optr. B), and Mr. Ramon DR. Rosarda (Water Sew. Maint. Man B).</>,
  <>On July 1, 2001, Mr. Eduardo M. Romen was appointed as General Manager. He supervised 18 hardworking employees. Furthermore, on the year 2003, the newly elected Hon. Melencio L. De Sagun Jr. appointed Mr. Benigno P. Colorado as member of the board in lieu of Ms. Panganiban. The appointment of Mr. Colorado to head the District is considered by far the most substantive. His well-enhanced expertise in the field of public service, which is considered an asset to further develop the operations of the district. The corporate approach he had utilized and imposed in the District is a crystal-clear expression of his wisdom, integrity and sincerity as a leader. He thinks like a man of action and act like a man of thought.</>,
  <>It is a common knowledge that nothing is permanent in this world. Nobody is indispensable in his / her job. A great number of opportunities and challenges laid a head of every individual. No matter how hard it is, we have to be clever and intelligent enough to face such challenges. Challenges convert into changes, which in turn become reality, an event that makes us aware that we have to move on. It is in this trail of thought that the management of the District responded positively to the changes in the directorship level. A new chairman of the Board was elected, in the person of Mr. Vivencio M. Limbo, replacing the former head that run in the mayoralty election in the City.</>,
  <>On January 2004, Dr. Veronica G. De Sagun who is representing the Professional Sector immediately filled the vacancy in the Board. A kind woman who is always wanted to extend her arms for the good and well-being of her constituents, specifically the needy or marginalized sectors. She is an Optometrist by profession and occupies various positions in several civic and religious organizations. She is at present Chairperson of the Local Tourism, Culture and Arts of Trece Martires City. A position that has been given the tasks to rekindle and preserved the historical events appertaining to the thirteen (13) martyrs. She is also amenable in the revival of the arts and culture of the Treceñians. Her presence in the District has been proven worthy by giving her views and insights on how to further develop the Trece Martires City Water District. With the appointment of Dr. Veronica de Sagun, the office looks forward to better coordination by and between the Water District and City Government, which will definitely foster better management and improvement.</>,
  <>On 2008, Acting General Manager Tito S. Delos Santos tried increasing the number of concessionaires and then district catered services into 11 barangays with approximately 15,000 water users. From January 2009 to present, GM Juliet R. Ocampo together with the newly appointed Board of Directors namely Dr. Veronica G. De Sagun, Ms. Narcisa L. Montano, Ms. Ruth S. Villar, Ms. Thelma V. Nuestro and Ms. Lolita G. Aure, made an effort to achieve more than 20,000 concessionaires from 12 barangays and subdivisions in the locality of Trece Martires. The District also supports environmental protection and preservation by continuous implementation of Tree Planting Program, Sagip Ilog Program and other activities conducted by Task Force El Niño and Task Force La Niña. As of corporate social obligation, TMCWD supports and participates in the annual Brigada Eskwela, medical missions, World Water Day Celebration and Alay Lakad. The District also supports employee&apos;s development such as weekly physical fitness, annual team building, and other HR interventions.</>,
  <>In 2015 the new building of TMCWD was fully operational and a blessing was held on December 8, 2015. And on February 16, 2016, the District transferred from the old building located beside CSC office to the new building.</>,
  <>The Trece Martires City Water District received on November 4, 2015 the unsolicited proposal and on May 25, 2017 the updated unsolicited proposal of PrimeWater for the Financing, Development, Rehabilitation, Expansion, Improvement, Operation and Maintenance of the Water Supply and Septage Management System of Trece Martires. After the initial evaluation, the Board issued Board Resolution No. 2017-06-040B dated June 8, 2017 accepting &ldquo;in principle&rdquo; the unsolicited proposal of PrimeWater, and created a Joint Venture Selection Committee (JVSC) that will review and evaluate the soundness of the proposal of PrimeWater. After a comprehensive review and evaluation of the JVSC, it was found that the proposal was generally acceptable to TMCWD and is advantageous to the water consumers in the locality.</>,
  <>On August 29, 2017, the board of directors issued Board Resolution No. 2017-08-058 approving the detailed evaluation of the Unsolicited Proposal of PrimeWater and authorized the JVSC to proceed to the detailed negotiation process. Detailed negotiations were held on September 13 &amp; 22 and October 11, 20 &amp; 26 that followed, an agreement on basic terms and conditions for the Joint Venture undertaking was reached. Thereafter, the board issued Board Resolution No. 2017-12-077 dated December 21, 2017 declaring PrimeWater as the original Proponent, and authorizing the JVSC to sign the Certificate of Successful Detailed Negotiations, and proceed to the solicitation of competitive challenge proposals.</>,
  <>Upon the approval of the Tender Documents, Invitation to Apply Eligibility and to Submit Proposal (IAESP) was published on January 3, 2018 issue of &ldquo;Business Mirror&rdquo; Volume 13 No. 84, a newspaper of general and nationwide circulation. The same documents were also posted in the bulletin boards located in the TMCWD premises, and three (3) other conspicuous places for fourteen (14) calendar days starting January 3, 2018 – January 17, 2018. On January 17, 2018, 3:00 PM of that day, was the deadline of submission of the IAESP and no interested Private Proponent complied with the requirements. For that reason, the JVSC recommended to the Board of the Directors to award PrimeWater Infrastructure Corporation as the Original Proponent.</>,
  <>The Ceremonial Signing of the Joint Venture Contract was held on April 10, 2018 at the 3rd floor of TMCWD building. This partnership between the two parties aspires to establish a water supply system that attains highest levels of service coverage while ensuring that the water quality is in accordance with the standards, and that the water tariffs are at fair and reasonable levels. A Septage Management system will also be implemented during the partnership. It will address the sanitation services of the septic tanks of households and establishments in the locality of Trece Martires.</>,
];

export default function AboutScroller({ syncRef }: { syncRef?: React.RefObject<HTMLDivElement | null> }) {
  const [expanded, setExpanded] = useState(false);
  const [windowHeight, setWindowHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const target = syncRef?.current;
    if (!target) return;

    const update = () => setWindowHeight(target.offsetHeight);
    update();

    const ro = new ResizeObserver(update);
    ro.observe(target);
    return () => ro.disconnect();
  }, [syncRef]);

  return (
    <div>
      {expanded ? (
        /* ── Expanded: all paragraphs visible, no clip ── */
        <div className="text-sm text-white/85 leading-relaxed space-y-4">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      ) : (
        /* ── Default: auto-scrolling window ── */
        <div
          className="about-scroller-window"
          style={windowHeight ? { height: windowHeight } : undefined}
        >
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
      )}

      {/* Toggle button */}
      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="inline-flex min-h-10 shrink-0 items-center gap-1.5 whitespace-nowrap text-xs font-medium text-white/70 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded"
          aria-expanded={expanded}
        >
          {expanded ? (
            <>
              <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
              </svg>
              Show less
            </>
          ) : (
            <>
              <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
              Read more
            </>
          )}
        </button>
      </div>
    </div>
  );
}
