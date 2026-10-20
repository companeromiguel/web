"use client";

import { useState, useMemo } from "react";
import DocumentLibrary from "@/components/transparency/DocumentLibrary";
import type { TransparencyDocument } from "@/lib/transparency";

interface Section {
  id: string;
  title: string;
  documents: TransparencyDocument[];
}

interface Props {
  sections: Section[];
  allDocuments: TransparencyDocument[];
  sectionDescriptions: Record<string, string>;
}

export default function SealYearFilter({ sections, allDocuments, sectionDescriptions }: Props) {
  // Get all available years sorted descending
  const years = useMemo(() => {
    return [...new Set(allDocuments.map(d => d.year))].sort((a, b) => b - a);
  }, [allDocuments]);

  // null = no year filter (show all)
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  function handleYearClick(year: number) {
    // Single click — select year
    setSelectedYear(year);
  }

  function handleYearDoubleClick(year: number) {
    // Double click on active year — deselect (show all)
    if (selectedYear === year) setSelectedYear(null);
  }

  // Filter sections by selected year, or show all if no year selected
  const filteredSections = useMemo(() => {
    if (selectedYear === null) return sections;
    return sections.map(section => ({
      ...section,
      documents: section.documents.filter(d => d.year === selectedYear),
    })).filter(section => section.documents.length > 0);
  }, [sections, selectedYear]);

  return (
    <>
      {/* ── Year toggle bar — matches existing nav pill style ── */}
      <div
        className="mt-6 flex flex-wrap items-center gap-2"
        role="group"
        aria-label="Filter documents by year"
      >
        {/* "All" pill */}
        <button
          type="button"
          onClick={() => setSelectedYear(null)}
          aria-pressed={selectedYear === null}
          className={[
            "rounded border px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0591D4]",
            selectedYear === null
              ? "border-[#0591D4] bg-[#0591D4] text-white"
              : "border-[#A9C6D8] bg-[#F7FAFB] text-[#0591D4] hover:border-[#0591D4] hover:bg-[#EEF4F8]",
          ].join(" ")}
        >
          All
        </button>

        {years.map(year => (
          <button
            key={year}
            type="button"
            onClick={() => handleYearClick(year)}
            onDoubleClick={() => handleYearDoubleClick(year)}
            aria-pressed={selectedYear === year}
            title={selectedYear === year ? "Double-click to show all years" : `Show ${year} documents`}
            className={[
              "rounded border px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0591D4]",
              selectedYear === year
                ? "border-[#0591D4] bg-[#0591D4] text-white"
                : "border-[#A9C6D8] bg-[#F7FAFB] text-[#0591D4] hover:border-[#0591D4] hover:bg-[#EEF4F8]",
            ].join(" ")}
          >
            {year}
          </button>
        ))}

        {/* Hint text */}
        {selectedYear !== null && (
          <span className="text-xs text-[#2A2A29]/40 ml-1">
          </span>
        )}
      </div>

      {/* ── Sections ── */}
      {filteredSections.length > 0 ? (
        filteredSections.map(section => (
          <section
            key={section.id}
            id={section.id}
            aria-labelledby={section.id + "-heading"}
            className="mt-14 scroll-mt-24"
          >
            <div className="mb-6">
              <h2
                id={section.id + "-heading"}
                className="font-heading text-xl font-semibold text-[#2A2A29]"
              >
                {section.title}
              </h2>
              {sectionDescriptions[section.title] && (
                <p className="mt-1 text-sm text-[#2A2A29]/60">
                  {sectionDescriptions[section.title]}
                </p>
              )}
            </div>
            <DocumentLibrary documents={section.documents} />
          </section>
        ))
      ) : (
        <div className="mt-14 rounded-xl border border-dashed border-[#A9C6D8] bg-white px-6 py-12 text-center">
          <p className="text-sm text-[#2A2A29]/50">
            No documents available for {selectedYear}.
          </p>
          <button
            type="button"
            onClick={() => setSelectedYear(null)}
            className="mt-3 text-sm font-medium text-[#0591D4] hover:underline"
          >
            Show all years
          </button>
        </div>
      )}
    </>
  );
}
