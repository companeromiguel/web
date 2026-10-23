"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { search, type SearchResult, type SearchResultKind } from "@/lib/search-index";

/* ── Icons per result kind ─────────────────────────────────────── */
const KIND_ICON: Record<SearchResultKind, React.ReactNode> = {
  page: (
    <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0V3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 18c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3" />
    </svg>
  ),
  service: (
    <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l5.654-4.654m5.65-4.647 3.025-3.025a3.05 3.05 0 1 1 4.314 4.314l-3.025 3.025" />
    </svg>
  ),
  document: (
    <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>
  ),
  event: (
    <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
    </svg>
  ),
};

const KIND_COLOR: Record<SearchResultKind, string> = {
  page:     "text-[#370A77]",
  service:  "text-[#0591D4]",
  document: "text-[#D97706]",
  event:    "text-[#059669]",
};

/* ── Highlight matched text ────────────────────────────────────── */
function Highlight({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-[#FEF9C3] text-[#2A2A29] rounded-sm px-px">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}

export default function SearchBar({ mobile = false, onSelect }: { mobile?: boolean; onSelect?: () => void }) {
  const [query, setQuery]     = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [open, setOpen]       = useState(false);
  const [active, setActive]   = useState(-1);
  const wrapperRef            = useRef<HTMLDivElement>(null);
  const inputRef              = useRef<HTMLInputElement>(null);
  const debounceRef           = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
        setActive(-1);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Debounced search — fires 120ms after user stops typing
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setActive(-1);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setResults(search(val));
      setOpen(val.trim().length >= 1);
    }, 120);
  }, []);

  function handleSelect() {
    setQuery("");
    setResults([]);
    setOpen(false);
    setActive(-1);
    onSelect?.();
  }

  function handleClear() {
    setQuery("");
    setResults([]);
    setOpen(false);
    setActive(-1);
    inputRef.current?.focus();
  }

  // Keyboard navigation
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((v) => Math.min(v + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((v) => Math.max(v - 1, -1));
    } else if (e.key === "Enter" && active >= 0) {
      e.preventDefault();
      const result = results[active];
      if (result) {
        // Programmatically click the active link
        document.getElementById(`search-item-${active}`)?.click();
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      setActive(-1);
    }
  }

  return (
    <div ref={wrapperRef} className="relative">
      {/* Input */}
      <div className={[
        "flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 rounded-full px-3 py-1.5 transition-colors",
        mobile ? "w-full" : "w-44 lg:w-56",
        open && results.length > 0 ? "border-white/40 bg-white/15" : "",
      ].join(" ")}>
        <svg className="size-3.5 shrink-0 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={handleChange}
          onFocus={() => query.trim().length >= 1 && setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search…"
          aria-label="Search site"
          aria-expanded={open}
          aria-autocomplete="list"
          aria-controls="search-dropdown"
          aria-activedescendant={active >= 0 ? `search-item-${active}` : undefined}
          className="bg-transparent text-white placeholder-white/40 text-xs outline-none w-full [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
        />
        {query && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={handleClear}
            className="text-white/40 hover:text-white/70 shrink-0 transition-colors"
          >
            <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Dropdown */}
      {open && query.trim().length >= 1 && (
        <div
          id="search-dropdown"
          role="listbox"
          aria-label="Search results"
          className={[
            "absolute top-full mt-2 bg-white rounded-xl shadow-2xl border border-[#E8EEF2] overflow-hidden z-50",
            mobile ? "left-0 right-0 w-full" : "right-0 w-72 sm:w-80",
          ].join(" ")}
        >
          {results.length === 0 ? (
            <p className="px-4 py-5 text-xs text-center text-[#2A2A29]/40">
              No results for &ldquo;{query}&rdquo;
            </p>
          ) : (
            <ul className="py-1.5 max-h-80 overflow-y-auto">
              {results.map((result, i) => (
                <li key={`${result.href}-${result.title}`} role="option" aria-selected={i === active}>
                  <Link
                    id={`search-item-${i}`}
                    href={result.href}
                    onClick={handleSelect}
                    onMouseEnter={() => setActive(i)}
                    className={[
                      "flex items-start gap-3 px-4 py-2.5 transition-colors",
                      i === active ? "bg-[#F0F8FE]" : "hover:bg-[#F7FAFB]",
                    ].join(" ")}
                  >
                    {/* Kind icon — colour coded */}
                    <span className={`mt-0.5 shrink-0 ${KIND_COLOR[result.kind]}`}>
                      {KIND_ICON[result.kind]}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-sm font-medium text-[#2A2A29] leading-snug">
                        <Highlight text={result.title} query={query} />
                      </span>
                      {result.description && (
                        <span className="block text-xs text-[#2A2A29]/45 mt-0.5 truncate">
                          {result.description}
                        </span>
                      )}
                    </span>
                    {/* Group badge */}
                    <span className={`shrink-0 text-[9px] font-semibold uppercase tracking-wide mt-1 ${KIND_COLOR[result.kind]} opacity-60`}>
                      {result.group}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {/* Footer hint */}
          <div className="px-4 py-2 border-t border-[#E8EEF2] flex items-center gap-3 bg-[#F7FAFB]">
            <span className="text-[10px] text-[#2A2A29]/30">
              <kbd className="font-sans">↑</kbd><kbd className="font-sans">↓</kbd> navigate · <kbd className="font-sans">↵</kbd> open · <kbd className="font-sans">Esc</kbd> close
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
