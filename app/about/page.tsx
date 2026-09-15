import type { Metadata } from "next";
import Image from "next/image";
import { Compass, Droplets, Eye, Landmark, UserRound } from "lucide-react";
import BackToTop from "./BackToTop";
import PageHeader, { Breadcrumb } from "@/components/layout/PageHeader";
import TransparencyWaveBackground from "@/components/TransparencyWaveBackground";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About Us",
  description: "Explore the history, purpose, and people of Trece Martires City Water District.",
};

const milestones = [
  {
    date: "1997",
    title: "The district is created",
    text: "On March 26, the City Council passed Resolution No. 97-045, establishing the Trece Martires City Water District under Presidential Decree No. 198.",
  },
  {
    date: "1998",
    title: "Formal recognition by LWUA",
    text: "On July 17, the Local Water Utilities Administration issued Conditional Certificate of Conformance No. 574, formally recognizing TMCWD.",
  },
  {
    date: "2001–2004",
    title: "Leadership and organization",
    text: "Eduardo M. Romen was appointed General Manager on July 1, 2001. Changes to the Board followed as the district continued building its organization.",
  },
  {
    date: "2008–2009",
    title: "Service reaches more communities",
    text: "By 2008, TMCWD served 11 barangays and approximately 15,000 water users. From 2009, the district worked toward serving more than 20,000 concessionaires across 12 barangays and subdivisions.",
  },
  {
    date: "2015–2016",
    title: "A new home for public service",
    text: "The new TMCWD building was blessed on December 8, 2015. The district transferred from its former office to the new building on February 16, 2016.",
  },
  {
    date: "2017–2018",
    title: "A new chapter of partnership",
    text: "Following evaluation and competitive challenge proceedings, TMCWD and PrimeWater ceremonially signed their joint venture contract on April 10, 2018.",
  },
];

function Heading({ number, title, description }: { number: string; title: string; description?: string }) {
  return <div className={styles.sectionHeading}>
    <span className={styles.eyebrow}>{number} / ABOUT TMCWD</span>
    <h2>{title}</h2>
    {description && <p>{description}</p>}
  </div>;
}

function Portrait({ name, role }: { name: string; role: string }) {
  return <article className={styles.portraitCard}>
    <div className={styles.portrait}><UserRound size={56} strokeWidth={1} aria-hidden="true" /></div>
    <span className={styles.photoLabel}>Official portrait to follow</span>
    <h3>{name}</h3><p>{role}</p>
  </article>;
}

export default function AboutPage() {
  return (
    <div className={styles.page} id="about-top">
      <PageHeader title="About Us" description="Discover our history, our purpose, and the people behind Trece Martires City Water District.">
        <Breadcrumb current="About Us" />
      </PageHeader>

      <div className={styles.contentBackground}>
        <TransparencyWaveBackground animated />
        <div className={styles.contentLayer}>
      <div className={styles.container}>
        <section id="history" className={styles.section} aria-labelledby="history-title">
          <div className={styles.historyIntro}>
            <div className={styles.historyFeatureCopy}>
              <span className={styles.eyebrow}>01 / HISTORY OF TMCWD</span>
              <h2 id="history-title">Our History</h2>
              <p className={styles.historyLead}>A water district created for a growing city.</p>
              <p>During the rapid development of Trece Martires City in the 1990s, population growth increased the need for a dependable supply of safe water. In response, the City Council established TMCWD in 1997.</p>
            </div>
            <figure className={styles.historyPhoto}>
              <Image src="/gallery/2018%2020TH%20FOUNDING%20ANNIVERSARY/img-3876_orig.jpg" alt="Group photograph of participants holding certificates at a TMCWD anniversary celebration" width={1100} height={733} sizes="(max-width: 700px) 100vw, 560px" />
              <figcaption>
                <span>FROM THE DISTRICT ARCHIVES</span>2018 · 20th Founding Anniversary
              </figcaption>
            </figure>
          </div>

          <h3 className={styles.milestoneHeading}>Milestones along the way</h3>
          <ol className={styles.milestoneGrid}>
            {milestones.map((item) => (
              <li key={item.date} className={styles.milestoneCard}>
                <span className={styles.milestoneYear}>{item.date}</span>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="mandate" className={styles.section} aria-label="Mandate">
          <Heading number="02" title="Our mandate" />
          <div className={styles.mandatePanel}>
            <div className={styles.icon}>
              <Landmark size={28} strokeWidth={1.5} aria-hidden="true" />
            </div>
            <div>
              <span className={styles.eyebrow}>LEGAL BASIS</span>
              <p>Under Presidential Decree No. 198, also known as the Provincial Water Utilities Act of 1973, the Trece Martires City Water District is mandated to administer, preserve, develop, and protect the water resources within its area of jurisdiction.</p>
              <div className={styles.legal}>Presidential Decree No. 198 · Provincial Water Utilities Act of 1973</div>
            </div>
          </div>
        </section>

        <section id="mission-vision" className={styles.section} aria-label="Mission and Vision">
          <Heading number="03" title="Purpose today. Direction tomorrow." />
          <div className={styles.valuesGrid}>
            {[
              {
                title: "Our mission",
                icon: Compass,
                paragraphs: [
                  "To induce and directly persuade the clientele to actively participate in the responsibility of protecting and preserving the water resources of the City of Trece Martires.",
                  "Motivate the people to properly utilize this precious nature’s gift for the benefit of the Treceños now and beyond.",
                  "The organization is amenable to uphold and conserve this valuable commodity as a relevant source of life.",
                  "To serve the concessionaires with utmost sincerity, honesty, and prompt service.",
                ],
              },
              {
                title: "Our vision",
                icon: Eye,
                paragraphs: [
                  "An institution perpetrated to provide the community a sufficient, reliable, sustainable, and affordable supply of drinkable water for the general well-being of the Treceños as its primary concern.",
                ],
              },
            ].map(({ title, icon: Icon, paragraphs }) => (
              <article key={title} className={styles.valueCard}>
                <Icon size={30} strokeWidth={1.5} aria-hidden="true" />
                <h3>{title}</h3>
                <div className={styles.statementText}>
                  {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="service-pledge" className={styles.section} aria-label="Service Pledge">
          <div className={styles.pledgeLayout}>
            <div>
              <Heading number="04" title="Our service pledge" />
              <p>Pursuant to Memorandum Circular No. 25, Series of 2001, issued by the Civil Service Commission, government agencies are enjoined to formulate and disseminate their service pledges. The District’s Service Pledge contains its commitment to serve clients with satisfaction.</p>
              <p className={styles.pledgeBasis}>On March 13, 2003, the Board of Directors passed Resolution No. 04, Series of 2003, formulating the District’s service pledge.</p>
            </div>
            <blockquote className={styles.pledgeQuote}>
              <Droplets size={36} strokeWidth={1.25} aria-hidden="true" />
              <p>“Magandang serbisyo’y maipagkakaloob,<br />lalo na’t kaagapay mamamayan ng lungsod.”</p>
              <cite>TMCWD Service Pledge</cite>
            </blockquote>
          </div>
        </section>
      </div>

      <section id="officers" className={styles.officers} aria-label="Officers">
        <div className={styles.container}>
          <Heading number="05" title="The people behind our purpose" />
          <p className={styles.pendingNote}>Official portraits will be added when available.</p>
          <div className={styles.leaders}>
            <Portrait name="Ms. Narcisa L. Montano" role="Chairperson, Board of Directors" />
            <Portrait name="Engr. Joel John M. Ulep" role="General Manager" />
          </div>
          <div className={styles.directory}>
            <div>
              <h3>Board of Directors</h3>
            </div>
            <div className={styles.directoryGrid}>
              {[
                { name: "Ms. Nena V. Lubigan", role: "Vice Chairperson" },
                { name: "Ms. Eufrosina L. Ortiz", role: "Secretary" },
                { name: "Engr. Adelaida N. Talatala", role: "Member" },
                { name: "Ms. Villa C. Rivera", role: "Member" },
              ].map(({ name, role }) => (
                <article key={name}>
                  <span className={styles.directoryRole}>{role}</span>
                  <h4>{name}</h4>
                  <p>Office of the Board of Directors</p>
                </article>
              ))}
            </div>
          </div>
          <div className={styles.directory}>
            <div>
              <h3>Management</h3>
            </div>
            <div className={styles.directoryGrid}>
              {[
                { name: "Mr. Lorenzo R. Sisante", role: "Division Manager", division: "Construction and Maintenance Division" },
                { name: "Ms. Michelle V. Patanindagat", role: "Division Manager", division: "Human Resources Division" },
                { name: "Ms. Elaine L. Liveta, CPA", role: "Division Manager", division: "Accounting and Cash Management Division" },
                { name: "Engr. Edvan Rhey O. Reyes", role: "Division Manager", division: "Administrative and General Services Division" },
              ].map(({ name, role, division }) => (
                <article key={name}>
                  <span className={styles.directoryRole}>{role}</span>
                  <h4>{name}</h4>
                  <p>{division}</p>
                </article>
              ))}
            </div>
          </div>
          <BackToTop />
        </div>
      </section>
        </div>
      </div>
    </div>
  );
}
