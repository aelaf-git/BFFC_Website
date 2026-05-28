"use client";

import { useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";

type NavSearchProps = {
  className?: string;
  placeholder?: string;
  isTransparent?: boolean;
};

export function NavSearch({
  className = "",
  placeholder = "Search",
  isTransparent = false,
}: NavSearchProps) {
  const [query, setQuery] = useState("");

  return (
    <form
      action="/search"
      method="get"
      role="search"
      className={`relative ${className}`}
    >
      <label htmlFor="site-search" className="sr-only">
        Search the site
      </label>
      <HiMagnifyingGlass
        className={`pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transition-colors duration-300 ${
          isTransparent ? "text-white/60" : "text-muted"
        }`}
        aria-hidden
      />
      <input
        id="site-search"
        name="q"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className={`h-9 w-44 rounded-full border pr-3 pl-9 text-sm transition-all duration-300 focus:ring-2 focus:outline-none xl:w-52 ${
          isTransparent
            ? "border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-white/20"
            : "border-border bg-background text-foreground placeholder:text-muted focus:border-primary focus:ring-primary/20"
        }`}
      />
    </form>
  );
}

