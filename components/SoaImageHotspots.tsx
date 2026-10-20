"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface Hotspot {
  id: string;
  num: number;
  label: string;
  description: string;
  top: number;
  height: number;
}

const hotspots: Hotspot[] = [
  { id: "header",            num: 1,  top: 0,    height: 9.2,  label: "Address & Contact",           description: "This is the header of the water district. It shows the name (Trece Martires City Water District), the office address (Brgy. San Agustin, Trece Martires City, Cavite), the contact numbers ((046) 419 2664 / 09178050391), and the Non-VAT Registered TIN (005-644-154-00000). The TIN confirms the district is a registered, non-VAT taxpayer. Below it, the invoice is labeled Service Invoice with the Nature of Service: Water Utility, and an Invoice No. (SI1234567) that identifies this specific bill." },
  { id: "account-name",      num: 2,  top: 20.5, height: 2.2,  label: "Account Name",                description: "This is the name of the concessionaire (customer) the bill is issued to. It is printed in bold so the cashier and the customer can quickly confirm the bill belongs to the right person. The address line below it (Brgy. Inocencio, Trece Indang Road) is the service address where the water connection is installed." },
  { id: "account-no",        num: 3,  top: 25.4, height: 1.7,  label: "Account No.",                 description: "This is the unique number assigned to each concessionaire (here, 01-23456). Staff use it to search the customer's records, such as billing history, payments, arrears, and consumption. No two accounts share the same number, so it is the main reference when paying or inquiring." },
  { id: "classification",    num: 4,  top: 27.5, height: 1.2,  label: "Classification",              description: "This is the customer type. Here it is Commercial. Other classes are usually Residential, Government, and Industrial. The classification matters because each class has its own rate schedule, so the same cubic meter usage can cost differently depending on it." },
  { id: "meter-no",          num: 5,  top: 28.9, height: 1.2,  label: "Meter No.",                   description: "This is the serial number of the physical water meter (012345). It is unique per meter and helps the meter reader and the technical staff confirm they read the right meter. It is also used when a meter is replaced, tested, or reported defective." },
  { id: "reading-date",      num: 6,  top: 30.3, height: 1.5,  label: "Date of Reading",             description: "This is the exact date and time the meter reader took the reading (7/17/2026, 08:00). Consumption is counted up to this moment." },
  { id: "billing-period",    num: 7,  top: 36.7, height: 2.5,  label: "Billing Period Coverage",     description: "This shows the Bill Month (July) and the coverage of the bill: Period From 6/16/26 to Period To 7/17/26. All water consumed within this window is charged on this bill." },
  { id: "readings",          num: 8,  top: 38.9, height: 2.8,  label: "Present and Previous Reading",description: "Present: 18173 is the meter reading taken on this cycle. Previous: 18170 is the reading from the last cycle. The difference between the two is the consumption for the period." },
  { id: "usage",             num: 9,  top: 41.9, height: 1.5,  label: "Usage (cu.m)",                description: "This is the consumption in cubic meters: 18,173 − 18,170 = 3 cu.m. One cubic meter equals 1,000 liters, so the customer used about 3,000 liters in the period." },
  { id: "cost-breakdown",    num: 10, top: 44.0, height: 12.0,  label: "Breakdown of the Whole Bill", description: "This section shows how the amount was computed. Min. (0–10): ₱340.00 — the minimum charge covers the first 10 cu.m. Even though the customer used only 3 cu.m, the minimum of ₱340.00 applies. Bill Amount: ₱340.00. Meter Maintenance: ₱20.00 — a fixed fee for the upkeep of the meter. Power Cost Adjustment: ₱0.00 this month." },
  { id: "arrears",           num: 11, top: 56.2, height: 1.5,  label: "Arrears",                     description: "These are unpaid previous bills carried over to this invoice (₱2,204.00). This is a large amount compared to the current bill, which suggests the account has several unpaid months." },
  { id: "total-due",         num: 12, top: 57.8, height: 1.5,  label: "Total Due (₱2,564.00)",       description: "This is the amount payable within the 15-day period without penalty: Bill Amount ₱340.00 + Meter Maintenance ₱20.00 + Power Cost Adjustment ₱0.00 + Arrears ₱2,204.00 = ₱2,564.00." },
  { id: "penalty",           num: 13, top: 58.8, height: 2.5,  label: "Penalty (₱34.00)",            description: "This is the automatic late-payment charge, computed as 10% of the current bill amount (10% × ₱340.00 = ₱34.00). It applies only if payment is made after the 15-day period." },
  { id: "total-after-due",   num: 14, top: 60.3, height: 2.5,  label: "Total After Due (₱2,598.00)", description: "This is the amount payable if the customer pays after the 15-day period: Total Due ₱2,564.00 + Penalty ₱34.00 = ₱2,598.00. Other Chargers (₱0.00) means there are no additional fees, such as reconnection or installation charges." },
  { id: "disconnection-flag",num: 15, top: 66.5, height: 1.5,  label: "For Disconnection",           description: "This is a status flag. It means the account is subject to disconnection because it has unpaid balances (the arrears). It works as a warning to the customer." },
  { id: "meter-reader",      num: 16, top: 67.8, height: 3.0,  label: "Meter Reader Details",        description: "Meter Reader: Juan D is the personnel who took the reading, which allows accountability and verification if there is a dispute. Remarks: Normal Reading means the reading was taken normally, with no problems such as a stuck, defective, or inaccessible meter." },
  { id: "disconnection-date",num: 17, top: 71.2, height: 4.5, label: "Disconnection Date (7/20/26)",description: "This is the deadline. If the account is not settled by this date, the water service will be disconnected. That is why the notice below it says: \"This serves as disconnection notice if not paid on time.\" The footer also states this document is not valid for claim of input tax (Non-VAT registered). PTU No., Date Issued, and Series are the BIR permit details for the billing system. The QR Code lets the invoice be scanned to retrieve account or billing details quickly, which helps with payment and verification." },
];

const sectionIcons: Record<string, string> = {};

export default function SoaImageHotspots() {
  const [active, setActive]       = useState<string | null>(null);
  const [sheetVisible, setSheetVisible] = useState(false);
  const imgWrapRef  = useRef<HTMLDivElement>(null);
  const sheetRef    = useRef<HTMLDivElement>(null);
  const panelRef    = useRef<HTMLDivElement>(null);
  const current     = hotspots.find(h => h.id === active) ?? null;

  const scrollOnNav = useRef(false);

  /* Scroll to the active section only when triggered by Prev/Next */
  useEffect(() => {
    if (!scrollOnNav.current || !active || !imgWrapRef.current) return;
    scrollOnNav.current = false;
    const h = hotspots.find(h => h.id === active);
    if (!h) return;
    const wrap = imgWrapRef.current;
    const wrapTop = wrap.getBoundingClientRect().top + window.scrollY;
    const sectionTopY = wrapTop + wrap.offsetHeight * (h.top / 100);
    window.scrollTo({ top: Math.max(0, sectionTopY - 80), behavior: "smooth" });
  }, [active]);

  /* Sheet visibility animation */
  useEffect(() => {
    if (active) { setSheetVisible(true); }
    else { const t = setTimeout(() => setSheetVisible(false), 300); return () => clearTimeout(t); }
  }, [active]);

  function tap(id: string) { setActive(prev => prev === id ? null : id); }

  const touchStartX = useRef(0);
  function onTouchStart(e: React.TouchEvent) { touchStartX.current = e.touches[0].clientX; }
  function onTouchEnd(e: React.TouchEvent) {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) < 40 || !active) return;
    const idx = hotspots.findIndex(h => h.id === active);
    if (dx < 0 && idx < hotspots.length - 1) setActive(hotspots[idx + 1].id);
    if (dx > 0 && idx > 0) setActive(hotspots[idx - 1].id);
  }

  function prevSection() {
    const idx = hotspots.findIndex(h => h.id === active);
    if (idx > 0) { scrollOnNav.current = true; setActive(hotspots[idx - 1].id); }
  }
  function nextSection() {
    const idx = hotspots.findIndex(h => h.id === active);
    if (idx < hotspots.length - 1) { scrollOnNav.current = true; setActive(hotspots[idx + 1].id); }
  }

  return (
    <>
      {/* ── Desktop layout: receipt + side panel ── */}
      <div className="soa-desktop-layout">

        {/* Receipt */}
        <div
          className="soa-img-wrap"
          ref={imgWrapRef}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <Image
            src="/SOA_v.png"
            alt="TMCWD Statement of Account"
            width={501}
            height={2001}
            className="soa-img"
            priority
          />

          {hotspots.map(h => {
            const isOn = active === h.id;
            return (
              <button
                key={h.id}
                type="button"
                aria-label={`Section ${h.num}: ${h.label}`}
                aria-expanded={isOn}
                onClick={() => tap(h.id)}
                onMouseEnter={() => setActive(h.id)}
                onMouseLeave={() => setActive(null)}
                className={`soa-zone${isOn ? " soa-zone--on" : ""}`}
                style={{ top: `${h.top}%`, height: `${h.height}%` }}
              >
                <span className={`soa-badge${isOn ? " soa-badge--on" : ""}`} aria-hidden="true">
                  {h.num}
                </span>
              </button>
            );
          })}
        </div>

        {/* Desktop side panel */}
        <div className="soa-side-panel" ref={panelRef} aria-live="polite">
          {current ? (
            <div className="soa-side-inner">
              {/* Connector line - visual link between section and panel */}
              <div
                className="soa-connector"
                style={{
                  top: `${current.top + current.height / 2}%`,
                }}
                aria-hidden="true"
              />
              <p className="soa-side-num">Section {current.num} of {hotspots.length}</p>
              <h3 className="soa-side-title">{current.label}</h3>
              <p className="soa-side-desc">{current.description}</p>
              <div className="soa-side-nav">
                <button onClick={prevSection} disabled={hotspots[0].id === active} className="soa-side-btn" aria-label="Previous">
                  <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
                  Prev
                </button>
                <div className="soa-side-dots">
                  {hotspots.map(h => (
                    <button key={h.id} onClick={() => setActive(h.id)} aria-label={`Section ${h.num}`}
                      className={`soa-dot${h.id === active ? " soa-dot--on" : ""}`} />
                  ))}
                </div>
                <button onClick={nextSection} disabled={hotspots[hotspots.length-1].id === active} className="soa-side-btn" aria-label="Next">
                  Next
                  <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
                </button>
              </div>
            </div>
          ) : (
            <div className="soa-side-empty">
              <p className="soa-side-empty-text">Hover over any numbered section on the receipt to see a detailed explanation.</p>
            </div>
          )}
        </div>
      </div>

      {/* Hint for mobile */}
      {!active && (
        <p className="soa-hint">
          <svg className="size-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59" />
          </svg>
          Tap any numbered section · Swipe to browse
        </p>
      )}

      {/* ── Mobile bottom sheet ── */}
      {sheetVisible && (
        <>
          <div className={`soa-backdrop${active ? " soa-backdrop--on" : ""}`} onClick={() => setActive(null)} aria-hidden="true" />
          <div ref={sheetRef} className={`soa-sheet${active ? " soa-sheet--on" : ""}`} role="dialog" aria-live="polite" aria-label={current?.label}>
            <div className="soa-sheet-handle" aria-hidden="true" />
            {current && (
              <div className="soa-sheet-body">
                <div className="soa-sheet-head">
                  <div className="soa-sheet-title-wrap">
                    <span className="soa-sheet-num">Section {current.num} of {hotspots.length}</span>
                    <p className="soa-sheet-title">{current.label}</p>
                  </div>
                  <button type="button" onClick={() => setActive(null)} className="soa-sheet-close" aria-label="Close">
                    <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
                  </button>
                </div>
                <p className="soa-sheet-desc">{current.description}</p>
                <div className="soa-sheet-nav">
                  <button onClick={prevSection} disabled={hotspots[0].id === active} className="soa-sheet-nav-btn" aria-label="Previous">
                    <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
                    Prev
                  </button>
                  <div className="soa-sheet-dots">
                    {hotspots.map(h => (
                      <button key={h.id} onClick={() => setActive(h.id)} aria-label={`Section ${h.num}`}
                        className={`soa-dot${h.id === active ? " soa-dot--on" : ""}`} />
                    ))}
                  </div>
                  <button onClick={nextSection} disabled={hotspots[hotspots.length-1].id === active} className="soa-sheet-nav-btn" aria-label="Next">
                    Next
                    <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
