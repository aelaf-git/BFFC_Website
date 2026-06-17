"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { SearchResultsList } from "@/components/search/search-results-list";
import { searchIndex } from "@/lib/search-index";
import { dedupeByHref, searchDocuments } from "@/lib/search";

type NavSearchProps = {
  className?: string;
  placeholder?: string;
  isTransparent?: boolean;
  /** Wider input for mobile drawer */
  fullWidth?: boolean;
};

const DROPDOWN_LIMIT = 8;
const DEBOUNCE_MS = 200;

export function NavSearch({
  className = "",
  placeholder = "Search",
  isTransparent = false,
  fullWidth = false,
}: NavSearchProps) {
  const router = useRouter();
  const inputId = useId();
  const listId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedQuery(query), DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [query]);

  const results = dedupeByHref(
    searchDocuments(debouncedQuery, searchIndex, DROPDOWN_LIMIT),
  );

  const showDropdown = open && debouncedQuery.trim().length > 0;

  const closeDropdown = useCallback(() => {
    setOpen(false);
    setActiveIndex(-1);
  }, []);

  const navigateToSearch = useCallback(
    (q: string) => {
      const trimmed = q.trim();
      if (!trimmed) return;
      closeDropdown();
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    },
    [closeDropdown, router],
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (activeIndex >= 0 && results[activeIndex]) {
      closeDropdown();
      router.push(results[activeIndex].href);
      return;
    }
    navigateToSearch(query);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown && e.key === "ArrowDown" && query.trim()) {
      setOpen(true);
      return;
    }

    if (!showDropdown) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => (i < results.length - 1 ? i + 1 : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => (i > 0 ? i - 1 : results.length - 1));
        break;
      case "Enter":
        if (activeIndex >= 0 && results[activeIndex]) {
          e.preventDefault();
          closeDropdown();
          router.push(results[activeIndex].href);
        }
        break;
      case "Escape":
        e.preventDefault();
        closeDropdown();
        inputRef.current?.blur();
        break;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeDropdown]);

  useEffect(() => {
    if (!showDropdown) setActiveIndex(-1);
  }, [debouncedQuery, showDropdown]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <form action="/search" method="get" role="search" onSubmit={handleSubmit}>
        <label htmlFor={inputId} className="sr-only">
          Search the site
        </label>
        <HiMagnifyingGlass
          className={`pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transition-colors duration-300 ${
            isTransparent ? "text-white/60" : "text-muted"
          }`}
          aria-hidden
        />
        <input
          ref={inputRef}
          id={inputId}
          name="q"
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => query.trim() && setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          aria-expanded={showDropdown}
          aria-controls={showDropdown ? listId : undefined}
          aria-autocomplete="list"
          aria-activedescendant={
            showDropdown && activeIndex >= 0 ? `${listId}-option-${activeIndex}` : undefined
          }
          className={`h-9 rounded-full border pr-3 pl-9 text-sm transition-all duration-300 focus:ring-2 focus:outline-none ${
            fullWidth ? "w-full" : "w-44 xl:w-52"
          } ${
            isTransparent
              ? "border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-white/20"
              : "border-border bg-background text-foreground placeholder:text-muted focus:border-primary focus:ring-primary/20"
          }`}
        />
      </form>

      {showDropdown && (
        <div
          className={`absolute top-full z-[200] mt-2 overflow-hidden rounded-2xl border shadow-lg ${
            fullWidth ? "left-0 right-0" : "left-0 w-80 max-w-[calc(100vw-2rem)]"
          } ${
            isTransparent
              ? "border-zinc-200 bg-white"
              : "border-zinc-200 bg-white"
          }`}
        >
          {results.length > 0 ? (
            <>
              <SearchResultsList
                results={results}
                query={debouncedQuery}
                variant="dropdown"
                listId={listId}
                activeIndex={activeIndex}
                onResultClick={closeDropdown}
              />
              <button
                type="button"
                onClick={() => navigateToSearch(query)}
                className="w-full border-t border-zinc-100 px-4 py-2.5 text-left text-xs font-medium text-primary hover:bg-zinc-50"
              >
                See all results for &ldquo;{debouncedQuery}&rdquo;
              </button>
            </>
          ) : (
            <p className="px-4 py-3 text-sm font-light text-zinc-500">
              No results for &ldquo;{debouncedQuery}&rdquo;
            </p>
          )}
        </div>
      )}
    </div>
  );
}
