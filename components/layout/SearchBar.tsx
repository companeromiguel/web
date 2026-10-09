"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { search, type SearchResult, type SearchResultKind } from "@/lib/search-index";

const GROUP_ORDER = ["Pages", "Services", "Documents", "Events"];

const KIND_ICON: Record<SearchResultKind, React.ReactNode> = {
  page: (
    <svg className="size-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
  ),
  service: (
    <svg className="size-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l5.654-4.654m5.65-4.647 3.025-3.025a3.05 3.05 0 1 1 4.314 4.314l-3.025 3.025" />
    </svg>
  ),
  document: (
    <svg className="size-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>
  ),
  event: (
    <svg className="size-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
    </svg>
  ),
};

interface SearchBarProps {
  onClose: () => void;
}

export default function SearchBar({ onClose }: SearchBarProps) {
  const [query, setQuery]     = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [active, setActive]   = useState(-1);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router   = useRouter();
  const pathname = usePathname();

  // Mount guard — portal needs document.body
  useEffect(() => { setMounted(true); }, []);

  // Focus input on open
  useEffect(() => { if (mounted) inputRef.current?.focus(); }, [mounted]);

  // Close on route change
  useEffect(() => { onClose(); }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleQuery = useCallback((val: string) => {
    setQuery(val);
    setResults(search(val));
    setActive(-1);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((v) => Math.min(v + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((v) => Math.max(v - 1, -1));
    } else if (e.key === "Enter" && active >= 0) {
      e.preventDefault();
      router.push(results[active].href);
      onClose();
    }
  };

  const grouped = GROUP_ORDER.reduce<Record<string, SearchResult[]>>((acc, g) => {
    const items = results.filter((r) => r.group === g);
    if (items.length) acc[g] = items;
    return acc;
  }, {});

  const flatResults = GROUP_ORDER.flatMap((g) => grouped[g] ?? []);

  if (!mounted) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Search panel — sits above everything including hero isolate context */}
      <div
        role="dialog"
        aria-label="Site search"
        aria-modal="true"
        className="fixed top-0 left-0 right-0 z-[9999] flex flex-col"
      >
        {/* Input bar */}
        <div className="bg-[#1a6a9a] border-b border-white/15 px-4 sm:px-6 lg:px-8 h-[72px] flex items-center gap-3">
          <svg className="size-5 shrink-0 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            placeholder="Search pages, services, documents…"
            value={query}
            onChange={(e) => handleQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-white placeholder-white/40 text-sm outline-none"
            aria-label="Search"
            aria-autocomplete="list"
            aria-controls="search-results"
            aria-activedescendant={active >= 0 ? `search-result-${active}` : undefined}
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="text-white/50 hover:text-white transition-colors p-1"
          >
            <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Results */}
        {query.length >= 2 && (
          <div className="bg-white shadow-2xl max-h-[70vh] overflow-y-auto overscroll-contain">
            {results.length === 0 ? (
              <p className="px-6 py-10 text-sm text-center text-[#2A2A29]/40">
                No results for <strong className="text-[#2A2A29]/60">&ldquo;{query}&rdquo;</strong>
              </p>
            ) : (
              <ul id="search-results" role="listbox" aria-label="Search results" className="py-2">
                {Object.entries(grouped).map(([group, items]) => (
                  <li key={group} role="none">
                    <p className="px-5 pt-4 pb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#2A2A29]/35">
                      {group}
                    </p>
                    <ul role="none">
                      {items.map((result) => {
                        const flatIdx = flatResults.indexOf(result);
                        const isActive = flatIdx === active;
                        return (
                          <li key={`${result.href}-${result.title}`} id={`search-result-${flatIdx}`} role="option" aria-selected={isActive}>
                            <Link
                              href={result.href}
                              onClick={onClose}
                              onMouseEnter={() => setActive(flatIdx)}
                              className={["flex items-start gap-3 px-5 py-2.5 transition-colors", isActive ? "bg-[#EDF6FB]" : "hover:bg-[#F7FAFB]"].join(" ")}
                            >
                              <span className={`mt-0.5 ${isActive ? "text-[#0591D4]" : "text-[#2A2A29]/30"}`}>
                                {KIND_ICON[result.kind]}
                              </span>
                              <span className="flex-1 min-w-0">
                                <span className="block text-sm font-medium text-[#2A2A29] leading-snug">{result.title}</span>
                                {result.description && (
                                  <span className="block text-xs text-[#2A2A29]/50 mt-0.5 truncate">{result.description}</span>
                                )}
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </>,
    document.body
  );
}
