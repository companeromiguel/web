"use client";

import Image from "next/image";
import { Fragment } from "react";

/* ── Hover-section wrapper ────────────────────────────────────────── */
function HoverSection({
  label,
  tooltip,
  children,
}: {
  label: string;
  tooltip: string;
  children: React.ReactNode;
}) {
  return (
    <div className="soa-section group relative">
      {children}
      <div className="soa-overlay" aria-hidden="true">
        <div className="soa-overlay-badge">
          <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
          {label}
        </div>
        <p className="soa-overlay-tip">{tooltip}</p>
      </div>
    </div>
  );
}

/* ── Small helpers ────────────────────────────────────────────────── */
function SoaRow({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`soa-row${bold ? " font-bold" : ""}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function HR({ dashed }: { dashed?: boolean }) {
  return <div className={dashed ? "soa-dash" : "soa-hr"} />;
}

/* ── QR placeholder ───────────────────────────────────────────────── */
function QRCode() {
  /* Draws a simple CSS QR-like grid as a visual stand-in */
  return (
    <div className="soa-qr" aria-label="QR code for online payment">
      <div className="soa-qr-inner">
        {/* Corner squares */}
        <div className="soa-qr-corner soa-qr-tl" />
        <div className="soa-qr-corner soa-qr-tr" />
        <div className="soa-qr-corner soa-qr-bl" />
        {/* Centre dot */}
        <div className="soa-qr-dot" />
        {/* Scattered data cells */}
        {[
          "30%,20%","55%,20%","70%,20%",
          "20%,35%","45%,35%","65%,35%","80%,35%",
          "25%,50%","50%,50%","75%,50%",
          "35%,65%","60%,65%","80%,65%",
          "20%,80%","45%,80%","70%,80%",
        ].map((pos, i) => {
          const [l, t] = pos.split(",");
          return <div key={i} className="soa-qr-cell" style={{ left: l, top: t }} />;
        })}
      </div>
    </div>
  );
}

/* ── Main receipt ─────────────────────────────────────────────────── */
export default function SoaReceipt() {
  return (
    <div className="soa-receipt">

      {/* ══ HEADER ══════════════════════════════════════════════════ */}
      <div className="soa-header">
        <div className="soa-header-logo">
          <Image src="/logo.png" alt="TMCWD" width={52} height={52} className="rounded-full" />
        </div>
        <div className="soa-header-text">
          <p className="soa-org-name">TRECE MARTIRES CITY WATER DISTRICT</p>
          <p className="soa-org-sub">Brgy. San Agustin, Trece Martires City, Cavite 4109</p>
          <p className="soa-org-sub">Tel: (046) 419-2664 | 0917-805-0391</p>
          <p className="soa-org-sub">Email: tmcwd@yahoo.com</p>
        </div>
      </div>

      <HR />
      <p className="soa-doc-title">STATEMENT OF ACCOUNT</p>
      <HR dashed />

      {/* ══ ACCOUNT INFO ════════════════════════════════════════════ */}
      <HoverSection label="Account Info" tooltip="Your registered account details with TMCWD.">
        <div className="soa-block">
          <SoaRow label="Account No." value="2024-0001-00" />
          <SoaRow label="Account Name" value="JUAN DELA CRUZ" />
          <SoaRow label="Service Address" value="Blk 1 Lot 2, Phase 1, Brgy. San Agustin" />
          <SoaRow label="Meter No." value="12345678" />
          <SoaRow label="Meter Size" value='1/2"' />
          <SoaRow label="Classification" value="Residential" />
        </div>
      </HoverSection>

      <HR dashed />

      {/* ══ BILLING PERIOD ══════════════════════════════════════════ */}
      <HoverSection label="Billing Period" tooltip="The period covered by this statement and the deadline for payment.">
        <div className="soa-block">
          <p className="soa-section-label">BILLING INFORMATION</p>
          <SoaRow label="Billing Month" value="JANUARY 2026" bold />
          <SoaRow label="Bill Date" value="January 15, 2026" />
          <SoaRow label="Due Date" value="February 5, 2026" bold />
          <SoaRow label="Disconnection Date" value="February 6, 2026" />
        </div>
      </HoverSection>

      <HR dashed />

      {/* ══ METER READING ═══════════════════════════════════════════ */}
      <HoverSection label="Meter Reading" tooltip="Your previous and current meter readings used to compute water consumption.">
        <div className="soa-block">
          <p className="soa-section-label">METER READING</p>
          <SoaRow label="Previous Reading" value="1,250 m³" />
          <SoaRow label="Present Reading" value="1,263 m³" />
          <SoaRow label="Consumption" value="13 m³" bold />
          <SoaRow label="Reading Date" value="January 10, 2026" />
        </div>
      </HoverSection>

      <HR dashed />

      {/* ══ CURRENT CHARGES ═════════════════════════════════════════ */}
      <HoverSection label="Current Charges" tooltip="Breakdown of charges applied for this billing period.">
        <div className="soa-block">
          <p className="soa-section-label">CURRENT CHARGES</p>
          <SoaRow label="Basic Charge (0–10 m³)" value="₱  120.00" />
          <SoaRow label="Excess Charge (3 m³)" value="₱   36.00" />
          <SoaRow label="System Loss Charge" value="₱   10.00" />
          <SoaRow label="Environmental Fee" value="₱    5.00" />
          <SoaRow label="Sewerage Charge" value="₱    0.00" />
          <HR />
          <SoaRow label="Sub-Total" value="₱  171.00" bold />
          <SoaRow label="VAT (12%)" value="₱   20.52" />
          <HR />
          <SoaRow label="Total Current Bill" value="₱  191.52" bold />
        </div>
      </HoverSection>

      <HR dashed />

      {/* ══ PREVIOUS BALANCE ════════════════════════════════════════ */}
      <HoverSection label="Previous Balance" tooltip="Any unpaid balance carried over from your previous bill.">
        <div className="soa-block">
          <p className="soa-section-label">PREVIOUS BALANCE</p>
          <SoaRow label="Previous Bill Amount" value="₱  185.00" />
          <SoaRow label="Payment Received" value="(₱ 185.00)" />
          <SoaRow label="Adjustments / Others" value="₱    0.00" />
          <HR />
          <SoaRow label="Balance Forward" value="₱    0.00" bold />
        </div>
      </HoverSection>

      <HR dashed />

      {/* ══ TOTAL AMOUNT DUE ════════════════════════════════════════ */}
      <HoverSection label="Amount Due" tooltip="The total amount you must pay on or before the due date to avoid penalties.">
        <div className="soa-block soa-total-block">
          <div className="soa-total-label">TOTAL AMOUNT DUE</div>
          <div className="soa-total-amount">₱ 191.52</div>
          <div className="soa-total-row">
            <span>Due Date:</span>
            <span className="font-bold">February 5, 2026</span>
          </div>
          <div className="soa-surcharge-note">
            A surcharge of 10% will be added after the due date.
          </div>
        </div>
      </HoverSection>

      <HR dashed />

      {/* ══ DISCONNECTION NOTICE ════════════════════════════════════ */}
      <div className="soa-block">
        <p className="soa-section-label">NOTICE</p>
        <p className="soa-notice-text">
          Non-payment on or before the due date will result in a 10% surcharge.
          Service disconnection may follow on <strong>February 6, 2026</strong>.
          Reconnection fee applies. Please settle promptly to avoid inconvenience.
        </p>
      </div>

      <HR dashed />

      {/* ══ PAYMENT CHANNELS ════════════════════════════════════════ */}
      <HoverSection label="How to Pay" tooltip="Accepted payment channels for your water bill.">
        <div className="soa-block">
          <p className="soa-section-label">PAYMENT CHANNELS</p>
          <div className="soa-payment-grid">
            <div className="soa-payment-item">
              <span className="soa-payment-icon">🏢</span>
              <span>TMCWD Main Office<br /><span className="soa-payment-sub">Gov&apos;s Drive, Brgy. San Agustin<br />Mon–Fri 8:00 AM – 5:00 PM</span></span>
            </div>
            <div className="soa-payment-item">
              <span className="soa-payment-icon">📱</span>
              <span>GCash<br /><span className="soa-payment-sub">Pay Bills → Water → TMCWD<br />Available 24/7</span></span>
            </div>
            <div className="soa-payment-item">
              <span className="soa-payment-icon">🏪</span>
              <span>Authorized Centers<br /><span className="soa-payment-sub">Bayad Center, SM Bills<br />Payment, & partners</span></span>
            </div>
          </div>
        </div>
      </HoverSection>

      <HR dashed />

      {/* ══ QR + FOOTER ════════════════════════════════════════════ */}
      <HoverSection label="QR Code" tooltip="Scan this QR code to pay via GCash or view your account online.">
        <div className="soa-qr-footer">
          <QRCode />
          <div className="soa-qr-text">
            <p className="font-bold text-[11px]">Scan to Pay via GCash</p>
            <p className="soa-qr-sub">or visit bills.pinas.app/tmcwd</p>
          </div>
        </div>
      </HoverSection>

      <HR />

      {/* ══ RECEIPT FOOTER ══════════════════════════════════════════ */}
      <div className="soa-footer">
        <p>This is a computer-generated Statement of Account.</p>
        <p>No signature required.</p>
        <HR dashed />
        <p>TMCWD | (046) 419-2664 | 0917-805-0391</p>
        <p>tmcwd@yahoo.com | tmcwd98@gmail.com</p>
        <p className="mt-1">customercare.tmcwd@gmail.com</p>
        <HR dashed />
        <p className="soa-footer-ref">Ref No: SOA-2026-01-00001 &nbsp;|&nbsp; Printed: January 15, 2026</p>
      </div>

    </div>
  );
}
