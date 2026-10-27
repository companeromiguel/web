"use client";

/**
 * NewWaterChecklist
 * Expandable requirements checklist for the New Water Service Application,
 * organised by applicant type as listed in the 2025 Citizen's Charter (page 5).
 *
 * Structure:
 *  - Always-required items shown for everyone (items 1–2 from the charter).
 *  - One disclosure panel per applicant type; only the relevant extra items shown.
 *  - "Where to secure" shown beside each item.
 *  - Charter PDF linked at the bottom.
 */

import { useState } from "react";

interface Requirement {
  item: string;
  whereToSecure: string;
}

interface ApplicantType {
  id: string;
  label: string;
  description: string;
  requirements: Requirement[];
}

/* ── Always-required items ── */
const always: Requirement[] = [
  {
    item: "Valid ID with signature (photocopy with specimen signature)",
    whereToSecure: "BIR, Post Office, DFA, PSA, SSS, GSIS, Pag-Ibig, LTO, PHIC, Comelec, OWWA, or other government-issued ID",
  },
  {
    item: "Barangay permit for water installation (original and photocopy)",
    whereToSecure: "Barangay hall where the property is located",
  },
];

/* ── Per-applicant-type extra requirements ── */
const applicantTypes: ApplicantType[] = [
  {
    id: "owner",
    label: "Property Owner",
    description: "Applying for a connection at your own property.",
    requirements: [
      {
        item: "Official receipt or water bill of neighbor (photocopy)",
        whereToSecure: "Any neighbor near the property being applied for",
      },
      {
        item: "Proof of billing with the same address",
        whereToSecure: "Concessionaire",
      },
      {
        item: "Move-in/title/deed of sale (photocopy)",
        whereToSecure: "Developer of subdivision or personal record",
      },
      {
        item: "Location map",
        whereToSecure: "From applicant or drawing",
      },
      {
        item: "Contract number and email address",
        whereToSecure: "From applicant",
      },
    ],
  },
  {
    id: "renter",
    label: "Renter / Lessee",
    description: "Applying for a connection at a property you are renting.",
    requirements: [
      {
        item: "Authorization letter from the owner",
        whereToSecure: "Owner of resident/establishment",
      },
      {
        item: "Valid ID of authorized person with signature",
        whereToSecure: "Any government office that issues ID",
      },
      {
        item: "Official receipt or water bill of neighbor (photocopy)",
        whereToSecure: "Any neighbor near the property being applied for",
      },
      {
        item: "Location map",
        whereToSecure: "From applicant or drawing",
      },
      {
        item: "Contract number and email address",
        whereToSecure: "From applicant",
      },
    ],
  },
  {
    id: "representative",
    label: "Representative / Agent",
    description: "Applying on behalf of the property owner.",
    requirements: [
      {
        item: "Authorization letter from the owner (Renter/Representative)",
        whereToSecure: "Owner of resident/establishment",
      },
      {
        item: "Valid ID of authorized person with signature",
        whereToSecure: "Any government office that issues ID",
      },
      {
        item: "Move-in/title/deed of sale (photocopy)",
        whereToSecure: "Developer of subdivision or personal record",
      },
      {
        item: "Location map",
        whereToSecure: "From applicant or drawing",
      },
      {
        item: "Contract number and email address",
        whereToSecure: "From applicant",
      },
    ],
  },
  {
    id: "nha",
    label: "NHA Housing Project (Dasmariñas)",
    description: "Applying for a connection in an NHA housing project in Dasmariñas.",
    requirements: [
      {
        item: "Certification from NHA Dasmariñas (NHA Housing Project)",
        whereToSecure: "NHA Dasmariñas",
      },
      {
        item: "Location map",
        whereToSecure: "From applicant or drawing",
      },
      {
        item: "Contract number and email address",
        whereToSecure: "From applicant",
      },
    ],
  },
  {
    id: "afp-pnp",
    label: "AFP/PNP Personnel",
    description: "Applying as an AFP or PNP personnel.",
    requirements: [
      {
        item: "Certification from CRAME (AFP/PNP Personnel)",
        whereToSecure: "CRAME",
      },
      {
        item: "Location map",
        whereToSecure: "From applicant or drawing",
      },
      {
        item: "Contract number and email address",
        whereToSecure: "From applicant",
      },
    ],
  },
  {
    id: "hoa",
    label: "HOA Member",
    description: "Applying through a homeowners' association.",
    requirements: [
      {
        item: "HOA Certification",
        whereToSecure: "HOA office where house is situated",
      },
      {
        item: "Location map",
        whereToSecure: "From applicant or drawing",
      },
      {
        item: "Contract number and email address",
        whereToSecure: "From applicant",
      },
    ],
  },
  {
    id: "commercial",
    label: "Commercial Applicant",
    description: "Applying for a water connection for a business or commercial establishment.",
    requirements: [
      {
        item: "Business Permit (Commercial)",
        whereToSecure: "City Hall — Treasurer's Office",
      },
      {
        item: "Contract to Lease (Commercial)",
        whereToSecure: "From owner of establishment",
      },
      {
        item: "Request letter for additional water meter",
        whereToSecure: "From owner of residential house/establishment",
      },
      {
        item: "Building Permit",
        whereToSecure: "City Hall — City Engineer's Office",
      },
      {
        item: "Location map",
        whereToSecure: "From applicant or drawing",
      },
      {
        item: "Contract number and email address",
        whereToSecure: "From applicant",
      },
    ],
  },
  {
    id: "subdivision",
    label: "Subdivision / Developer",
    description: "Applying for a connection in a subdivision or through a developer.",
    requirements: [
      {
        item: "Move-in/title/deed of sale (photocopy)",
        whereToSecure: "Developer of subdivision or personal record",
      },
      {
        item: "Request letter for additional water meter",
        whereToSecure: "From owner of residential house/establishment",
      },
      {
        item: "Building Permit",
        whereToSecure: "City Hall — City Engineer's Office",
      },
      {
        item: "Location map",
        whereToSecure: "From applicant or drawing",
      },
      {
        item: "Contract number and email address",
        whereToSecure: "From applicant",
      },
    ],
  },
];

const CHARTER_PDF =
  "/documents/transparency/citizen-charter-citizenscharter-2025-1st-revision.pdf?v=0dd6e04eeed5";

function RequirementRow({ req, index }: { req: Requirement; index: number }) {
  return (
    <li className="flex gap-3 border-b border-[#E8EEF2] py-3 last:border-0 text-sm">
      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#DEEEFA] text-[10px] font-bold text-[#0591D4] tabular-nums">
        {index + 1}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-[#2A2A29] leading-snug">{req.item}</p>
        <p className="mt-0.5 text-xs text-[#2A2A29]/50 leading-snug">
          <span className="font-medium text-[#2A2A29]/40">Where to get: </span>
          {req.whereToSecure}
        </p>
      </div>
    </li>
  );
}

function AccordionPanel({ type }: { type: ApplicantType }) {
  const [open, setOpen] = useState(false);
  const panelId = `checklist-${type.id}`;

  return (
    <div className="border border-[#E8EEF2] bg-white shadow-sm rounded-sm overflow-hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-[#F7FAFB] focus-visible:outline-2 focus-visible:outline-[#0591D4] focus-visible:outline-offset-[-2px]"
      >
        <div className="min-w-0">
          <span className="block font-heading text-sm font-semibold text-[#2A2A29] leading-snug">
            {type.label}
          </span>
          <span className="block text-xs text-[#2A2A29]/50 mt-0.5 leading-snug">
            {type.description}
          </span>
        </div>
        <span className="flex items-center gap-1.5 shrink-0 text-xs font-medium text-[#0591D4]">
          {open ? "Hide" : `${type.requirements.length} item${type.requirements.length !== 1 ? "s" : ""}`}
          <svg
            className={`size-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </span>
      </button>

      <div
        id={panelId}
        className={[
          "grid transition-[grid-template-rows] duration-200 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        ].join(" ")}
      >
        <div className="overflow-hidden">
          <ul className="px-5 pb-4 pt-1 space-y-0">
            {type.requirements.map((req, i) => (
              <RequirementRow key={req.item} req={req} index={i} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function NewWaterChecklist() {
  return (
    <div>
      {/* ── Always-required items ── */}
      <div className="mb-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#0591D4]">
          Required for all applicants
        </p>
        <ul className="border border-[#E8EEF2] bg-white shadow-sm rounded-sm divide-y divide-[#E8EEF2]">
          {always.map((req, i) => (
            <li key={req.item} className="flex gap-3 px-5 py-3 text-sm">
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#0591D4] text-[10px] font-bold text-white tabular-nums">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-[#2A2A29] leading-snug">{req.item}</p>
                <p className="mt-0.5 text-xs text-[#2A2A29]/50 leading-snug">
                  <span className="font-medium text-[#2A2A29]/40">Where to get: </span>
                  {req.whereToSecure}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Per-applicant accordion ── */}
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#0591D4]">
        Additional requirements by applicant type
      </p>
      <div className="space-y-2">
        {applicantTypes.map((type) => (
          <AccordionPanel key={type.id} type={type} />
        ))}
      </div>

      {/* ── Charter PDF download ── */}
      <div className="mt-6 flex items-center gap-3 rounded-sm border border-[#C4DAE7] bg-[#F7FAFB] px-4 py-3">
        <svg
          className="size-5 shrink-0 text-[#0591D4]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
          />
        </svg>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[#2A2A29]">
            Citizen&apos;s Charter 2025 (1st Revision)
          </p>
          <p className="text-xs text-[#2A2A29]/50">
            Complete requirements checklist on pages 5–9 · PDF, 4.2 MB
          </p>
        </div>
        <a
          href={CHARTER_PDF}
          download
          className="shrink-0 rounded bg-[#0591D4] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#047ab5] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0591D4]"
        >
          Download PDF
        </a>
      </div>
    </div>
  );
}
