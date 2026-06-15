/**
 * Responsive blog card grid — centers a single post, pairs two, and fills
 * up to three columns as more stories are added.
 */
export function blogGridClasses(
  count: number,
  variant: "home" | "page" = "home",
): string {
  const gap = variant === "home" ? "gap-6 sm:gap-8" : "gap-10";

  if (count <= 1) {
    return `grid grid-cols-1 ${gap} mx-auto w-full max-w-md`;
  }

  if (count === 2) {
    return `grid grid-cols-1 sm:grid-cols-2 ${gap} mx-auto w-full max-w-4xl`;
  }

  return `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${gap}`;
}
