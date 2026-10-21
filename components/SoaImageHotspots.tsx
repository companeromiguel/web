"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Lang = "en" | "tl";

interface Hotspot {
  id: string;
  num: number;
  label: { en: string; tl: string };
  description: { en: string; tl: string };
  top: number;
  height: number;
}

const hotspots: Hotspot[] = [
  {
    id: "header", num: 1, top: 0, height: 9.2,
    label: { en: "Address & Contact", tl: "Address at Contact" },
    description: {
      en: "This is the header of the water district. It shows the name (Trece Martires City Water District), the office address (Brgy. San Agustin, Trece Martires City, Cavite), the contact numbers ((046) 419 2664 / 09178050391), and the Non-VAT Registered TIN (005-644-154-00000). The TIN confirms the district is a registered, non-VAT taxpayer. Below it, the invoice is labeled Service Invoice with the Nature of Service: Water Utility, and an Invoice No. (SI1234567) that identifies this specific bill.",
      tl: "Ito ang header ng water district. Nakalagay dito ang pangalan (Trece Martires City Water District), ang address ng opisina (Brgy. San Agustin, Trece Martires City, Cavite), ang mga contact number ((046) 419 2664 / 09178050391), at ang Non-VAT Registered TIN (005-644-154-00000). Kinukumpirma ng TIN na rehistrado ang water district bilang non-VAT na taxpayer. Sa ilalim nito, nakalagay ang Service Invoice, ang Nature of Service na Water Utility, at ang Invoice No. (SI1234567) na naglalarawan sa mismong bill na ito.",
    },
  },
  {
    id: "account-name", num: 2, top: 20.5, height: 2.2,
    label: { en: "Account Name", tl: "Pangalan ng Account" },
    description: {
      en: "This is the name of the concessionaire (customer) the bill is issued to. It is printed in bold so the cashier and the customer can quickly confirm the bill belongs to the right person. The address line below it (Brgy. Inocencio, Trece Indang Road) is the service address where the water connection is installed.",
      tl: "Ito ang pangalan ng concessionaire (konsyumer) na pinadalhan ng bill. Naka-bold ito para madali ng cashier at ng konsyumer na makumpirma kung tama ang pangalan sa bill. Ang address sa ilalim nito (Brgy. Inocencio, Trece Indang Road) ay ang service address kung saan naka-install ang koneksyon ng tubig.",
    },
  },
  {
    id: "account-no", num: 3, top: 25.4, height: 1.7,
    label: { en: "Account No.", tl: "Numero ng Account" },
    description: {
      en: "This is the unique number assigned to each concessionaire (here, 01-23456). Staff use it to search the customer's records, such as billing history, payments, arrears, and consumption. No two accounts share the same number, so it is the main reference when paying or inquiring.",
      tl: "Ito ang natatanging numero ng bawat konsyumer (dito, 01-23456). Ginagamit ito ng staff para hanapin ang records mo, gaya ng billing history, mga bayad, arrears, at konsumo. Walang dalawang account na may parehong numero, kaya ito ang pangunahing reference tuwing magbabayad o may itatanong ka.",
    },
  },
  {
    id: "classification", num: 4, top: 27.5, height: 1.2,
    label: { en: "Classification", tl: "Klasipikasyon" },
    description: {
      en: "This is the customer type. Here it is Commercial. Other classes are usually Residential, Government, and Industrial. The classification matters because each class has its own rate schedule, so the same cubic meter usage can cost differently depending on it.",
      tl: "Ito ang uri ng konsyumer. Dito, Commercial. Kabilang din sa mga klase ang Residential, Government, at Industrial. Mahalaga ito dahil may sariling rate schedule ang bawat klase, kaya puwedeng magkaiba ang singil sa parehong dami ng nagamit na tubig.",
    },
  },
  {
    id: "meter-no", num: 5, top: 28.9, height: 1.2,
    label: { en: "Meter No.", tl: "Numero ng Metro" },
    description: {
      en: "This is the serial number of the physical water meter (012345). It is unique per meter and helps the meter reader and the technical staff confirm they read the right meter. It is also used when a meter is replaced, tested, or reported defective.",
      tl: "Ito ang serial number ng water meter mo (012345). Natatangi ito sa bawat metro at nakakatulong sa meter reader at sa technical staff na matiyak na tamang metro ang nabasa. Ginagamit din ito kapag pinalitan, sinubukan, o iniulat na sira ang metro.",
    },
  },
  {
    id: "reading-date", num: 6, top: 30.3, height: 1.5,
    label: { en: "Date of Reading", tl: "Petsa ng Pagbabasa" },
    description: {
      en: "This is the exact date and time the meter reader took the reading (7/17/2026, 08:00). Consumption is counted up to this moment.",
      tl: "Ito ang eksaktong petsa at oras nang kunin ng meter reader ang reading (7/17/2026, 08:00). Hanggang sa sandaling ito binibilang ang konsumo mo.",
    },
  },
  {
    id: "billing-period", num: 7, top: 36.7, height: 2.5,
    label: { en: "Billing Period Coverage", tl: "Saklaw ng Billing Period" },
    description: {
      en: "This shows the Bill Month (July) and the coverage of the bill: Period From 6/16/26 to Period To 7/17/26. All water consumed within this window is charged on this bill.",
      tl: "Makikita rito ang Bill Month (July) at ang saklaw ng bill: Period From 6/16/26 hanggang Period To 7/17/26. Lahat ng tubig na nagamit sa loob ng panahong ito ay sinisingil sa bill na ito.",
    },
  },
  {
    id: "readings", num: 8, top: 38.9, height: 2.8,
    label: { en: "Present and Previous Reading", tl: "Present at Previous na Reading" },
    description: {
      en: "Present: 18173 is the meter reading taken on this cycle. Previous: 18170 is the reading from the last cycle. The difference between the two is the consumption for the period.",
      tl: "Present: 18173 ang reading na kinuha sa cycle na ito. Previous: 18170 ang reading noong nakaraang cycle. Ang pagkakaiba ng dalawa ang konsumo mo para sa panahong ito.",
    },
  },
  {
    id: "usage", num: 9, top: 41.9, height: 1.5,
    label: { en: "Usage (cu.m)", tl: "Konsumo (cu.m)" },
    description: {
      en: "This is the consumption in cubic meters: 18,173 − 18,170 = 3 cu.m. One cubic meter equals 1,000 liters, so the customer used about 3,000 liters in the period.",
      tl: "Ito ang konsumo mo sa cubic meter: 18,173 − 18,170 = 3 cu.m. Ang isang cubic meter ay katumbas ng 1,000 litro, kaya mga 3,000 litro ang nagamit mo sa panahong ito.",
    },
  },
  {
    id: "cost-breakdown", num: 10, top: 44.0, height: 12.0,
    label: { en: "Breakdown of the Whole Bill", tl: "Breakdown ng Buong Bill" },
    description: {
      en: "This section shows how the amount was computed. Min. (0–10): ₱340.00 — the minimum charge covers the first 10 cu.m. Even though the customer used only 3 cu.m, the minimum of ₱340.00 applies. Bill Amount: ₱340.00 — the water charge based on consumption. Meter Maintenance: ₱20.00 — a fixed fee for the upkeep of the meter. Power Cost Adjustment: ₱0.00 — an adjustment for electricity costs of pumping, ₱0.00 this month.",
      tl: "Dito makikita kung paano nakuha ang kabuuang halaga. Min. (0–10): ₱340.00 — Sakop ng minimum charge ang unang 10 cu.m. Kahit 3 cu.m lang ang nagamit, ang minimum na ₱340.00 pa rin ang sisingilin. Bill Amount: ₱340.00 — ang singil sa tubig batay sa konsumo. Meter Maintenance: ₱20.00 — fixed na bayad para sa pangangalaga ng metro. Power Cost Adjustment: ₱0.00 — adjustment para sa gastos sa kuryente ng pagpapaandar ng bomba. Walang singil ngayong buwan (0.00).",
    },
  },
  {
    id: "arrears", num: 11, top: 56.2, height: 1.5,
    label: { en: "Arrears", tl: "Mga Hindi Nabayarang Bill" },
    description: {
      en: "These are unpaid previous bills carried over to this invoice (₱2,204.00). This is a large amount compared to the current bill, which suggests the account has several unpaid months.",
      tl: "Ito ang mga hindi pa nababayarang bill noong mga nakaraang buwan na isinama sa invoice na ito (₱2,204.00). Malaki ito kumpara sa bill ngayong buwan, kaya malamang ilang buwan nang may hindi nababayaran ang account.",
    },
  },
  {
    id: "total-due", num: 12, top: 57.8, height: 1.5,
    label: { en: "Total Due (₱2,564.00)", tl: "Kabuuang Babayaran (₱2,564.00)" },
    description: {
      en: "This is the amount payable within the 15-day period without penalty: Bill Amount ₱340.00 + Meter Maintenance ₱20.00 + Power Cost Adjustment ₱0.00 + Arrears ₱2,204.00 = ₱2,564.00.",
      tl: "Ito ang halagang babayaran sa loob ng 15 araw nang walang penalty: Bill Amount ₱340.00 + Meter Maintenance ₱20.00 + Power Cost Adjustment ₱0.00 + Arrears ₱2,204.00 = ₱2,564.00.",
    },
  },
  {
    id: "penalty", num: 13, top: 58.8, height: 2.5,
    label: { en: "Penalty (₱34.00)", tl: "Multa (₱34.00)" },
    description: {
      en: "This is the automatic late-payment charge, computed as 10% of the current bill amount (10% × ₱340.00 = ₱34.00). It applies only if payment is made after the 15-day period.",
      tl: "Ito ang awtomatikong singil sa late na pagbabayad, na 10% ng bill amount ngayong buwan (10% × ₱340.00 = ₱34.00). Ipapataw lang ito kung lumampas na sa 15 araw ang pagbabayad.",
    },
  },
  {
    id: "total-after-due", num: 14, top: 60.3, height: 2.5,
    label: { en: "Total After Due (₱2,598.00)", tl: "Kabuuan Pagkatapos ng Due Date (₱2,598.00)" },
    description: {
      en: "This is the amount payable if the customer pays after the 15-day period: Total Due ₱2,564.00 + Penalty ₱34.00 = ₱2,598.00. Other Chargers (₱0.00) means there are no additional fees, such as reconnection or installation charges.",
      tl: "Ito ang halagang babayaran kung lumampas na sa 15 araw: Total Due ₱2,564.00 + Penalty ₱34.00 = ₱2,598.00. Ang Other Charges (₱0.00) ay nangangahulugang walang karagdagang singil, tulad ng reconnection o installation fee.",
    },
  },
  {
    id: "disconnection-flag", num: 15, top: 66.5, height: 1.5,
    label: { en: "For Disconnection", tl: "Para sa Disconnection" },
    description: {
      en: "This is a status flag. It means the account is subject to disconnection because it has unpaid balances (the arrears). It works as a warning to the customer.",
      tl: "Ito ay status flag. Ibig sabihin, puwedeng putulan ng tubig ang account dahil may hindi pa nababayarang balanse (ang arrears). Nagsisilbi itong babala sa konsyumer.",
    },
  },
  {
    id: "meter-reader", num: 16, top: 67.8, height: 3.0,
    label: { en: "Meter Reader Details", tl: "Detalye ng Meter Reader" },
    description: {
      en: "Meter Reader: Juan D is the personnel who took the reading, which allows accountability and verification if there is a dispute. Remarks: Normal Reading means the reading was taken normally, with no problems such as a stuck, defective, or inaccessible meter.",
      tl: "Meter Reader: Si Juan D ang kumuha ng reading. Dahil nakalagay ang pangalan, may mapagtatanungan at maberipika kung sakaling may reklamo. Remarks: Ang Normal Reading ay nangangahulugang maayos ang pagkuha ng reading, walang problema tulad ng nakabarang, sirang, o hindi maabot na metro.",
    },
  },
  {
    id: "disconnection-date", num: 17, top: 71.2, height: 4.5,
    label: { en: "Disconnection Date (7/20/26)", tl: "Petsa ng Disconnection (7/20/26)" },
    description: {
      en: "This is the deadline. If the account is not settled by this date, the water service will be disconnected. That is why the notice below it says: \"This serves as disconnection notice if not paid on time.\" The footer also states this document is not valid for claiming input VAT, and includes BIR permit details (PTU No., Date Issued, Series) and a QR code for quick account or billing verification.",
      tl: "Ito ang deadline. Kapag hindi pa nababayaran ang account pagsapit ng petsang ito, puputulan ng serbisyo ng tubig. Kaya nakasulat sa ilalim nito: \"This serves as disconnection notice if not paid on time.\" Nakalagay din na hindi wasto ang dokumentong ito para sa pag-claim ng input VAT, kasama ang mga detalye ng BIR permit (PTU No., Date Issued, Series) at isang QR code para sa mabilis na pag-verify ng account o billing.",
    },
  },
];

function LangToggle({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className="soa-lang-toggle" role="group" aria-label="Language">
      <button type="button" className={`soa-lang-btn${lang === "en" ? " soa-lang-btn--on" : ""}`} onClick={() => setLang("en")} aria-pressed={lang === "en"}>EN</button>
      <button type="button" className={`soa-lang-btn${lang === "tl" ? " soa-lang-btn--on" : ""}`} onClick={() => setLang("tl")} aria-pressed={lang === "tl"}>TL</button>
    </div>
  );
}

export default function SoaImageHotspots() {
  const [lang, setLang]         = useState<Lang>("en");
  const [active, setActive]     = useState<string | null>(null);
  const [pinned, setPinned]     = useState<string | null>(null);
  const [sheetVisible, setSheetVisible] = useState(false);

  const desktopActive = pinned ?? active;
  const current       = hotspots.find(h => h.id === desktopActive) ?? null;

  const imgWrapRef  = useRef<HTMLDivElement>(null);
  const sheetRef    = useRef<HTMLDivElement>(null);
  const calloutRef  = useRef<HTMLDivElement>(null);
  const [calloutOffset, setCalloutOffset] = useState(0);
  const scrollOnNav = useRef(false);

  useEffect(() => {
    if (!calloutRef.current) { setCalloutOffset(0); return; }
    const raf = requestAnimationFrame(() => {
      if (!calloutRef.current) return;
      const cb = calloutRef.current.getBoundingClientRect();
      const headerH = 72;
      const margin = 8;
      if (cb.top < headerH) setCalloutOffset(headerH - cb.top);
      else if (cb.bottom > window.innerHeight - margin) setCalloutOffset(window.innerHeight - margin - cb.bottom);
      else setCalloutOffset(0);
    });
    return () => cancelAnimationFrame(raf);
  }, [desktopActive, calloutOffset]);

  useEffect(() => {
    if (!scrollOnNav.current || !pinned || !imgWrapRef.current) return;
    scrollOnNav.current = false;
    const h = hotspots.find(h => h.id === pinned);
    if (!h) return;
    const wrap = imgWrapRef.current;
    const wrapTop = wrap.getBoundingClientRect().top + window.scrollY;
    const sectionMidY = wrapTop + wrap.offsetHeight * ((h.top + h.height / 2) / 100);
    window.scrollTo({ top: Math.max(0, sectionMidY - window.innerHeight / 2), behavior: "smooth" });
  }, [pinned]);

  useEffect(() => {
    if (pinned) { setSheetVisible(true); }
    else { const t = setTimeout(() => setSheetVisible(false), 300); return () => clearTimeout(t); }
  }, [pinned]);

  function tap(id: string) { setPinned(prev => prev === id ? null : id); }

  const touchStartX = useRef(0);
  function onTouchStart(e: React.TouchEvent) { touchStartX.current = e.touches[0].clientX; }
  function onTouchEnd(e: React.TouchEvent) {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) < 40 || !pinned) return;
    const idx = hotspots.findIndex(h => h.id === pinned);
    if (dx < 0 && idx < hotspots.length - 1) setPinned(hotspots[idx + 1].id);
    if (dx > 0 && idx > 0) setPinned(hotspots[idx - 1].id);
  }

  function prevSection() {
    const id = pinned ?? desktopActive;
    const idx = hotspots.findIndex(h => h.id === id);
    if (idx > 0) { scrollOnNav.current = true; setPinned(hotspots[idx - 1].id); }
  }
  function nextSection() {
    const id = pinned ?? desktopActive;
    const idx = hotspots.findIndex(h => h.id === id);
    if (idx < hotspots.length - 1) { scrollOnNav.current = true; setPinned(hotspots[idx + 1].id); }
  }

  const calloutStyle = current
    ? (() => {
        if (!imgWrapRef.current) return { top: "50vh", transform: "translateY(-50%)" };
        const rect = imgWrapRef.current.getBoundingClientRect();
        const sectionCenterVY = rect.top + rect.height * ((current.top + current.height / 2) / 100);
        const clampedY = Math.max(100, Math.min(sectionCenterVY, window.innerHeight - 100));
        // Fill from 16px off left edge to 16px before receipt
        const left = 16;
        const width = Math.max(200, rect.left - 32);
        return {
          top: `${clampedY + calloutOffset}px`,
          transform: "translateY(-50%)",
          left: `${left}px`,
          width: `${width}px`,
        };
      })()
    : {};

  return (
    <div className="soa-root">
      <div className="soa-img-wrap" ref={imgWrapRef} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <Image src="/SOA_v.png" alt="TMCWD Statement of Account" width={501} height={2001} className="soa-img" priority />

        {hotspots.map(h => {
          const isOn = desktopActive === h.id;
          const isPinned = pinned === h.id;
          return (
            <button key={h.id} type="button"
              aria-label={`Section ${h.num}: ${h.label[lang]}`}
              aria-expanded={isPinned}
              onClick={() => tap(h.id)}
              onMouseEnter={() => setActive(h.id)}
              onMouseLeave={() => setActive(null)}
              className={`soa-zone${isOn ? " soa-zone--on" : ""}${isPinned ? " soa-zone--pinned" : ""}`}
              style={{ top: `${h.top}%`, height: `${h.height}%` }}
            >
              <span className={`soa-badge${isOn ? " soa-badge--on" : ""}`} aria-hidden="true">{h.num}</span>
            </button>
          );
        })}

        {/* Desktop callout bubble */}
        {current && (
          <div ref={calloutRef}
            className={`soa-callout${current.top + current.height / 2 > 60 ? " soa-callout--flip" : ""}`}
            style={calloutStyle}
            aria-live="polite"
            onMouseEnter={() => setActive(desktopActive)}
            onMouseLeave={() => setActive(null)}
          >
            <div className="soa-callout-arrow" aria-hidden="true" />
            <div className="soa-callout-inner">
              <div className="soa-callout-head">
                <span className="soa-callout-num">#{current.num}</span>
                <span className="soa-callout-label">{current.label[lang]}</span>
                <LangToggle lang={lang} setLang={setLang} />
                <button type="button" className="soa-callout-close" onClick={() => { setPinned(null); setActive(null); }} aria-label="Close">
                  <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <p className="soa-callout-desc">{current.description[lang]}</p>
              <div className="soa-callout-nav">
                <button onClick={prevSection} disabled={hotspots[0].id === desktopActive} className="soa-callout-btn">
                  <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>Prev
                </button>
                <span className="soa-callout-counter">{current.num} / {hotspots.length}</span>
                <button onClick={nextSection} disabled={hotspots[hotspots.length - 1].id === desktopActive} className="soa-callout-btn">
                  Next<svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {!pinned && (
        <p className="soa-hint">
          <svg className="size-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59" />
          </svg>
          Hover or click any numbered section · Click ✕ to close
        </p>
      )}

      {/* Mobile bottom sheet */}
      {sheetVisible && (
        <>
          <div className={`soa-backdrop${pinned ? " soa-backdrop--on" : ""}`} onClick={() => setPinned(null)} aria-hidden="true" />
          <div ref={sheetRef} className={`soa-sheet${pinned ? " soa-sheet--on" : ""}`} role="dialog" aria-live="polite" aria-label={current?.label[lang]}>
            <div className="soa-sheet-handle" aria-hidden="true" />
            {current && (
              <div className="soa-sheet-body">
                <div className="soa-sheet-head">
                  <div className="soa-sheet-title-wrap">
                    <span className="soa-sheet-num">Section {current.num} of {hotspots.length}</span>
                    <p className="soa-sheet-title">{current.label[lang]}</p>
                  </div>
                  <LangToggle lang={lang} setLang={setLang} />
                  <button type="button" onClick={() => setPinned(null)} className="soa-sheet-close" aria-label="Close">
                    <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
                  </button>
                </div>
                <p className="soa-sheet-desc">{current.description[lang]}</p>
                <div className="soa-sheet-nav">
                  <button onClick={prevSection} disabled={hotspots[0].id === pinned} className="soa-sheet-nav-btn">
                    <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>Prev
                  </button>
                  <div className="soa-sheet-dots">
                    {hotspots.map(h => (
                      <button key={h.id} onClick={() => setPinned(h.id)} aria-label={`Section ${h.num}`}
                        className={`soa-dot${h.id === pinned ? " soa-dot--on" : ""}`} />
                    ))}
                  </div>
                  <button onClick={nextSection} disabled={hotspots[hotspots.length - 1].id === pinned} className="soa-sheet-nav-btn">
                    Next<svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
