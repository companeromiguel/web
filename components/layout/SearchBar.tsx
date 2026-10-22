"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { search, type SearchResult } from "@/lib/search-index";

export default function SearchBar({ mobile = false, onSelect }: { mobile?: boolean; onSelect?: () => void }) {
  const [query, setQuery]   = useState("");
  const [open, setOpen]     = useState(false);
  const results             = query.length >= 2 ? search(query) : [];
  const wrapperRef          = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    setOpen(true);
  }

  function handleSelect() {
    setQuery("");
    setOpen(false);
    onSelect?.();
  }

  return (
    <div ref={wrapperRef} className="relative">
      {/* Input */}
      <div className={[
        "flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 rounded-full px-3 py-1.5 transition-colors",
        mobile ? "w-full" : "w-44 lg:w-56",
      ].join(" ")}>
        <svg className="size-3.5 shrink-0 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={handleChange}
          onFocus={() => query.length >= 2 && setOpen(true)}
          placeholder="Search…"
          aria-label="Search site"
          className="bg-transparent text-white placeholder-white/40 text-xs outline-none w-full [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
        />
        {query && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => { setQuery(""); setOpen(false); }}
            className="text-white/40 hover:text-white/70 shrink-0"
          >
            <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Dropdown */}
      {open && query.length >= 2 && (
        <div className={[
          "absolute top-full mt-2 bg-white rounded-xl shadow-2xl border border-[#E8EEF2] overflow-hidden z-50",
          mobile ? "left-0 right-0 w-full" : "right-0 w-72 sm:w-80",
        ].join(" ")}>
          {results.length === 0 ? (
            <p className="px-4 py-5 text-xs text-center text-[#2A2A29]/40">
              No results for &ldquo;{query}&rdquo;
            </p>
          ) : (
            <ul className="py-1.5 max-h-80 overflow-y-auto">
              {results.map((result: SearchResult) => (
                <li key={`${result.href}-${result.title}`}>
                  <Link
                    href={result.href}
                    onClick={handleSelect}
                    className="flex items-start gap-3 px-4 py-2.5 hover:bg-[#F0F8FE] transition-colors"
                  >
                    <span className="mt-0.5 text-[#0591D4] shrink-0">
                      <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                      </svg>
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-sm font-medium text-[#2A2A29] leading-snug">{result.title}</span>
                      {result.description && (
                        <span className="block text-xs text-[#2A2A29]/45 mt-0.5 truncate">{result.description}</span>
                      )}
                    </span>
                    <span className="shrink-0 text-[9px] font-semibold uppercase tracking-wide text-[#2A2A29]/25 mt-1">{result.group}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
