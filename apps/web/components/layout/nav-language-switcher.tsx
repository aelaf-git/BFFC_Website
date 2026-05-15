"use client";

import { useState } from "react";

export type Language = "en" | "fr";

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
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
          language === "en"
            ? "bg-primary text-white"
            : "text-foreground hover:text-primary"
        }`}
        aria-pressed={language === "en"}
        aria-label="English"
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLanguage("fr")}
        className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
          language === "fr"
            ? "bg-primary text-white"
            : "text-foreground hover:text-primary"
        }`}
        aria-pressed={language === "fr"}
        aria-label="Français"
      >
        FR
      </button>
    </div>
  );
}
