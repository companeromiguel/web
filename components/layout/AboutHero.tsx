import Image from "next/image";
import Link from "next/link";
import styles from "../transparency/TransparencyHero.module.css";
import { Landmark } from "lucide-react";

export default function AboutHero({ title, description }: { title: string; description: string }) {
  const Icon = Landmark;
  return <header className={`${styles.hero} ${styles.heroBg}`}>
    <div className={styles.orbit} aria-hidden="true" />
    <div className={styles.inner}>
      <div className={`${styles.seal} ${styles.serviceIcon}`} aria-hidden="true">
        <Icon strokeWidth={1.25} />
      </div>
      <div className={styles.content}>
        <p className={styles.eyebrow}>About TMCWD</p>
        <h1>{title}</h1>
        {description && <p className={styles.description}>{description}</p>}
        <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
          <Link href="/">Home</Link><span aria-hidden="true">/</span>
          <span aria-current="page">{title}</span>
        </nav>
      </div>
      <div className={styles.districtSeal}>
        <Image src="/logo.png" alt="Trece Martires City Water District" width={176} height={176} sizes="(max-width: 700px) 88px, 176px" />
      </div>
    </div>
    <svg className={styles.wave} viewBox="0 0 1440 96" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0,48 C180,96 360,0 540,48 C720,96 900,0 1080,48 C1260,96 1440,0 1440,48 L1440,96 L0,96 Z" fill="white" opacity=".08" />
    </svg>
    <svg className={`${styles.wave} ${styles.waveFast}`} viewBox="0 0 1440 64" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0,32 C120,64 240,0 360,32 C480,64 600,0 720,32 C840,64 960,0 1080,32 C1200,64 1320,0 1440,32 L1440,64 L0,64 Z" fill="white" opacity=".06" />
    </svg>
    <svg className={`${styles.wave} ${styles.waveTop}`} viewBox="0 0 1440 48" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0,24 C240,48 480,0 720,24 C960,48 1200,0 1440,24 L1440,0 L0,0 Z" fill="#00508c" opacity=".15" />
    </svg>
  </header>;
}
