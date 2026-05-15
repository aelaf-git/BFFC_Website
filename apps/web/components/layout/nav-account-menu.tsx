"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { HiChevronDown, HiUser } from "react-icons/hi2";
import type { NavLink } from "@/components/layout/card-nav";

type NavAccountMenuProps = {
  label?: string;
  links: NavLink[];
};

export function NavAccountMenu({
  label = "My Account",
  links,
}: NavAccountMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative z-[200]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-primary"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <HiUser className="h-4 w-4" aria-hidden />
        <span>{label}</span>
        <HiChevronDown
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      {open && (
        <div
          className="absolute top-full right-0 z-[200] mt-2 min-w-[220px] rounded-lg border border-border bg-background py-2 shadow-xl"
          role="menu"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              role="menuitem"
              className="block px-4 py-2 text-sm text-foreground transition-colors hover:bg-primary-light hover:text-primary"
              aria-label={link.ariaLabel}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
