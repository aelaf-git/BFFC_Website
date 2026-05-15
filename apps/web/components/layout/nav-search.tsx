"use client";

import { useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";

type NavSearchProps = {
  className?: string;
  placeholder?: string;
};

export function NavSearch({
  className = "",
  placeholder = "Search",
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
        className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted"
        aria-hidden
      />
      <input
        id="site-search"
        name="q"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="h-9 w-44 rounded-full border border-border bg-background pr-3 pl-9 text-sm text-foreground placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none xl:w-52"
      />
    </form>
  );
}
