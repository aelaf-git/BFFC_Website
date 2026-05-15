"use client";

import { useState } from "react";

export type Language = "en" | "fr";

const languages = [
  { code: "en" as const, label: "EN", flag: "🇬🇧", ariaLabel: "English" },
  { code: "fr" as const, label: "FR", flag: "🇫🇷", ariaLabel: "Français" },
];

type NavLanguageSwitcherProps = {
  className?: string;
};

/**
 * UI-only language toggle. Wiring to i18n / routes will be added later.
 */
export function NavLanguageSwitcher({ className = "" }: NavLanguageSwitcherProps) {
  const [language, setLanguage] = useState<Language>("en");

  return (
    <div
      className={`inline-flex items-center rounded-full border border-border bg-background p-0.5 ${className}`}
      role="group"
      aria-label="Language"
    >
      {languages.map((lang) => (
        <button
          key={lang.code}
          type="button"
          onClick={() => setLanguage(lang.code)}
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold transition-colors sm:px-3 ${
            language === lang.code
              ? "bg-primary text-white"
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
