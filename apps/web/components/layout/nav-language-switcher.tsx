"use client";

import { useState } from "react";

export type Language = "en" | "fr";

const languages = [
  { code: "en" as const, label: "EN", flag: "🇬🇧", ariaLabel: "English" },
  { code: "fr" as const, label: "FR", flag: "🇫🇷", ariaLabel: "Français" },
];

type NavLanguageSwitcherProps = {
  className?: string;
  isTransparent?: boolean;
};

/**
 * UI-only language toggle. Wiring to i18n / routes will be added later.
 */
export function NavLanguageSwitcher({
  className = "",
  isTransparent = false,
}: NavLanguageSwitcherProps) {
  const [language, setLanguage] = useState<Language>("en");

  return (
    <div
      className={`inline-flex items-center rounded-full border p-0.5 transition-all duration-300 ${className} ${
        isTransparent
          ? "border-white/20 bg-white/10"
          : "border-border bg-background"
      }`}
      role="group"
      aria-label="Language"
    >
      {languages.map((lang) => (
        <button
          key={lang.code}
          type="button"
          onClick={() => setLanguage(lang.code)}
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold transition-all duration-300 sm:px-3 ${
            language === lang.code
              ? "bg-primary text-white"
              : isTransparent
              ? "text-white/80 hover:text-white"
              : "text-foreground hover:text-primary"
          }`}
          aria-pressed={language === lang.code}
          aria-label={lang.ariaLabel}
        >
          <span className="text-sm leading-none" aria-hidden>
            {lang.flag}
          </span>
          <span>{lang.label}</span>
        </button>
      ))}
    </div>
  );
}

