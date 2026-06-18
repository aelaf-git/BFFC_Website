"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { HiMagnifyingGlass, HiXMark } from "react-icons/hi2";
import { ArrowRight } from "lucide-react";
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
  const [dropdownStyle, setDropdownStyle] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedQuery(query), DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [query]);

  const results = dedupeByHref(
    searchDocuments(debouncedQuery, searchIndex, DROPDOWN_LIMIT),
  );

  const showDropdown = open && debouncedQuery.trim().length > 0;

  const updateDropdownPosition = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const viewportPad = 12;
    const dropdownWidth = fullWidth
      ? rect.width
      : Math.min(360, window.innerWidth - viewportPad * 2);

    let left = fullWidth ? rect.left : rect.right - dropdownWidth;
    left = Math.max(viewportPad, Math.min(left, window.innerWidth - dropdownWidth - viewportPad));

    setDropdownStyle({
      top: rect.bottom + 8,
      left,
      width: dropdownWidth,
    });
  }, [fullWidth]);

  useEffect(() => {
    if (!showDropdown) {
      setDropdownStyle(null);
      return;
    }

    updateDropdownPosition();

    window.addEventListener("resize", updateDropdownPosition);
    window.addEventListener("scroll", updateDropdownPosition, true);

    return () => {
      window.removeEventListener("resize", updateDropdownPosition);
      window.removeEventListener("scroll", updateDropdownPosition, true);
    };
  }, [showDropdown, updateDropdownPosition, debouncedQuery]);

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

  const clearQuery = () => {
    setQuery("");
    setDebouncedQuery("");
    setOpen(false);
    setActiveIndex(-1);
    inputRef.current?.focus();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (containerRef.current?.contains(target)) return;
      if (
        target instanceof Element &&
        target.closest("[data-nav-search-dropdown]")
      ) {
        return;
      }
      closeDropdown();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeDropdown]);

  useEffect(() => {
    if (!showDropdown) setActiveIndex(-1);
  }, [debouncedQuery, showDropdown]);

  const inputClasses = isTransparent
    ? "border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-white/20"
    : "border-border bg-background text-foreground placeholder:text-muted focus:border-primary focus:ring-primary/20";

  return (
    <>
      <div
        ref={containerRef}
        className={`relative ${fullWidth ? "w-full" : "w-40 shrink-0 sm:w-44 xl:w-52"} ${className}`}
      >
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
            type="text"
            inputMode="search"
            enterKeyHint="search"
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
            className={`h-9 w-full rounded-full border py-0 pr-9 pl-9 text-sm transition-all duration-300 focus:ring-2 focus:outline-none ${inputClasses}`}
          />
          {query && (
            <button
              type="button"
              onClick={clearQuery}
              className={`absolute top-1/2 right-2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full transition-colors ${
                isTransparent
                  ? "text-white/70 hover:bg-white/10 hover:text-white"
                  : "text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600"
              }`}
              aria-label="Clear search"
            >
              <HiXMark className="h-4 w-4" aria-hidden />
            </button>
          )}
        </form>
      </div>

      {showDropdown && dropdownStyle && (
        <div
          data-nav-search-dropdown
          className="fixed z-[250] overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-[0_16px_48px_rgb(0,0,0,0.14)] ring-1 ring-black/5"
          style={{
            top: dropdownStyle.top,
            left: dropdownStyle.left,
            width: dropdownStyle.width,
          }}
        >
          {results.length > 0 ? (
            <>
              <div className="border-b border-zinc-100 px-4 py-2.5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
                  Suggestions
                </p>
              </div>
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
                className="flex w-full items-center justify-between gap-2 border-t border-zinc-100 bg-zinc-50/80 px-4 py-3 text-left text-sm font-medium text-primary transition-colors hover:bg-primary/5"
              >
                <span className="truncate">
                  See all results for &ldquo;{debouncedQuery}&rdquo;
                </span>
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
              </button>
            </>
          ) : (
            <p className="px-4 py-4 text-sm font-light text-zinc-500">
              No results for &ldquo;{debouncedQuery}&rdquo;
            </p>
          )}
        </div>
      )}
    </>
  );
}
