/** Rectangular CTA buttons — orange primary boxes aligned with header nav styling. */

const btnBase =
  "inline-flex items-center justify-center gap-2 rounded-none font-semibold transition-colors duration-200";

export const btnPrimary = `${btnBase} bg-primary px-7 py-3 text-sm text-white hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60`;

export const btnPrimarySm = `${btnBase} bg-primary px-5 py-2.5 text-sm text-white hover:bg-primary-hover`;

export const btnPrimaryLg = `${btnBase} bg-primary px-8 py-4 text-base text-white hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60`;

export const btnPrimaryLgMd = `${btnBase} bg-primary px-8 py-3.5 text-sm text-white hover:bg-primary-hover`;

export const btnSecondary = `${btnBase} border border-zinc-200 bg-white px-7 py-3 text-sm text-zinc-700 hover:border-primary/40 hover:text-primary`;

export const btnSecondaryLg = `${btnBase} border border-zinc-200 bg-white px-8 py-3.5 text-sm text-zinc-700 hover:border-primary/40 hover:text-primary`;

export const btnAccent = `${btnBase} bg-accent px-7 py-3 text-sm text-white hover:bg-accent-hover`;

export const btnOnDark = `${btnBase} border border-white/30 bg-white/10 px-7 py-3 text-sm text-white backdrop-blur-sm hover:bg-white/20`;

export const btnInverted = `${btnBase} bg-white px-5 py-2.5 text-sm text-primary hover:bg-white/90`;
