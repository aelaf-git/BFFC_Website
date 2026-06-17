import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { SearchCategory } from "@/lib/search-index";
import type { SearchResult } from "@/lib/search";

const categoryStyles: Record<SearchCategory, string> = {
  Page: "bg-zinc-100 text-zinc-600",
  Story: "bg-primary/10 text-primary",
  FAQ: "bg-blue-50 text-blue-700",
  Resource: "bg-amber-50 text-amber-700",
  Section: "bg-emerald-50 text-emerald-700",
};

type SearchResultsListProps = {
  results: SearchResult[];
  query?: string;
  variant?: "page" | "dropdown";
  listId?: string;
  activeIndex?: number;
  onResultClick?: () => void;
};

function HighlightMatch({ text, query }: { text: string; query?: string }) {
  if (!query?.trim()) return <>{text}</>;

  const tokens = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const lowerText = text.toLowerCase();
  let firstIndex = -1;
  let matchLength = 0;

  for (const token of tokens) {
    const idx = lowerText.indexOf(token);
    if (idx !== -1 && (firstIndex === -1 || idx < firstIndex)) {
      firstIndex = idx;
      matchLength = token.length;
    }
  }

  if (firstIndex === -1) return <>{text}</>;

  return (
    <>
      {text.slice(0, firstIndex)}
      <mark className="rounded bg-primary/15 px-0.5 font-medium text-inherit">
        {text.slice(firstIndex, firstIndex + matchLength)}
      </mark>
      {text.slice(firstIndex + matchLength)}
    </>
  );
}

export function SearchResultsList({
  results,
  query,
  variant = "page",
  listId,
  activeIndex = -1,
  onResultClick,
}: SearchResultsListProps) {
  if (results.length === 0) return null;

  if (variant === "dropdown") {
    return (
      <ul id={listId} role="listbox" className="max-h-80 overflow-y-auto py-1">
        {results.map((result, index) => (
          <li key={result.id} role="option" aria-selected={index === activeIndex}>
            <Link
              id={`${listId}-option-${index}`}
              href={result.href}
              onClick={onResultClick}
              className={`block px-4 py-3 transition-colors ${
                index === activeIndex ? "bg-primary/5" : "hover:bg-zinc-50"
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${categoryStyles[result.category]}`}
                >
                  {result.category}
                </span>
              </div>
              <p className="mt-1 text-sm font-medium text-zinc-900">
                <HighlightMatch text={result.title} query={query} />
              </p>
              <p className="mt-0.5 line-clamp-1 text-xs font-light text-zinc-500">
                {result.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:gap-6" role="list">
      {results.map((result) => (
        <li key={result.id} className="flex">
          <Link
            href={result.href}
            className="group flex w-full flex-col rounded-3xl border border-zinc-100 bg-white p-6 shadow-[0_4px_24px_rgb(0,0,0,0.04)] transition-all duration-300 hover:border-primary/20 hover:shadow-[0_8px_32px_rgb(0,0,0,0.08)] sm:p-7"
          >
            <span
              className={`inline-flex w-fit rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider ${categoryStyles[result.category]}`}
            >
              {result.category}
            </span>
            <h2 className="mt-4 font-serif text-xl font-medium leading-snug tracking-tight text-zinc-900 transition-colors group-hover:text-primary sm:text-2xl">
              <HighlightMatch text={result.title} query={query} />
            </h2>
            <p className="mt-3 flex-1 text-sm font-light leading-relaxed text-zinc-500 line-clamp-3">
              {result.description}
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
              View result <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
