export function headerNavLinkClass(isActive: boolean, isTransparent: boolean) {
  const base =
    "inline-flex h-full min-h-full items-center justify-center rounded-none px-5 sm:px-6 lg:px-7 text-sm font-bold uppercase tracking-[0.14em] whitespace-nowrap transition-colors duration-300 lg:text-base";

  if (isActive) {
    return `${base} bg-primary text-white hover:bg-primary-hover`;
  }

  const idleText = isTransparent
    ? "bg-transparent text-white/80 hover:bg-primary hover:text-white hover:bg-primary-hover"
    : "bg-transparent text-foreground hover:bg-primary hover:text-white hover:bg-primary-hover";

  return `${base} ${idleText}`;
}

export function drawerNavLinkClass(isActive: boolean) {
  const base =
    "flex w-full min-w-0 items-center break-words rounded-none border-y border-transparent px-4 py-5 font-serif text-2xl font-medium sm:px-8 sm:py-6 sm:text-3xl transition-colors duration-200";

  if (isActive) {
    return `${base} bg-primary text-white hover:bg-primary-hover`;
  }

  return `${base} text-zinc-900 hover:bg-primary hover:text-white hover:bg-primary-hover`;
}
