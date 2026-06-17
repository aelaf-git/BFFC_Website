import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { SearchResultsList } from "@/components/search/search-results-list";
import { popularSearchLinks, searchIndex } from "@/lib/search-index";
import { dedupeByHref, searchDocuments } from "@/lib/search";
import { siteConfig } from "@/lib/site";

type SearchPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  return {
    title: query ? `Search results for "${query}"` : "Search",
    description: query
      ? `Search results for "${query}" on ${siteConfig.name}.`
      : `Search pages, stories, FAQs, and resources on ${siteConfig.name}.`,
    alternates: { canonical: `${siteConfig.url}/search` },
    robots: { index: false, follow: true },
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const rawResults = query ? searchDocuments(query, searchIndex, 30) : [];
  const results = dedupeByHref(rawResults);

  return (
    <div className="flex-1 bg-white">
      {/* ── Hero ── */}
      <div className="relative h-56 w-full overflow-hidden bg-zinc-900 sm:h-72">
        <Image
          src="/whatwedo.jpeg"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <p className="mb-3 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">
            <HiMagnifyingGlass className="h-3.5 w-3.5" aria-hidden />
            Site search
          </p>
          <h1 className="font-serif text-4xl font-medium tracking-tight text-white sm:text-5xl lg:text-6xl">
            {query ? "Search results" : "Search the site"}
          </h1>
          <p className="mt-4 max-w-xl text-base font-light text-white/75">
            {query
              ? results.length === 0
                ? `No results found for "${query}".`
                : `${results.length} result${results.length === 1 ? "" : "s"} for "${query}"`
              : "Find pages, stories, FAQs, and resources across our site."}
          </p>
        </div>
      </div>

      {/* ── Search bar ── */}
      <div className="border-b border-zinc-100 bg-zinc-50">
        <div className="container mx-auto px-6 py-8 sm:px-10 lg:px-20">
          <form
            action="/search"
            method="get"
            role="search"
            className="mx-auto max-w-3xl"
          >
            <label htmlFor="search-page-input" className="sr-only">
              Search the site
            </label>
            <div className="relative">
              <HiMagnifyingGlass
                className="pointer-events-none absolute top-1/2 left-5 h-5 w-5 -translate-y-1/2 text-zinc-400"
                aria-hidden
              />
              <input
                id="search-page-input"
                name="q"
                type="search"
                defaultValue={query}
                placeholder="Search pages, stories, FAQs…"
                className="h-14 w-full rounded-2xl border border-zinc-200 bg-white pr-5 pl-14 text-base text-zinc-800 shadow-sm placeholder:text-zinc-400 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              />
            </div>
          </form>
        </div>
      </div>

      {/* ── Results ── */}
      <div className="container mx-auto px-6 py-16 sm:px-10 sm:py-20 lg:px-20">
        {query && results.length > 0 && (
          <SearchResultsList results={results} query={query} variant="page" />
        )}

        {query && results.length === 0 && (
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-base font-light text-zinc-500">
              Try different keywords, or browse these popular pages:
            </p>
            <PopularLinks className="mt-10" />
          </div>
        )}

        {!query && (
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-8 text-center font-serif text-3xl font-medium tracking-tight text-zinc-900 sm:text-4xl">
              Popular pages
            </h2>
            <PopularLinks />
          </div>
        )}
      </div>
    </div>
  );
}

function PopularLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-2 ${className}`} role="list">
      {popularSearchLinks.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="block h-full rounded-3xl border border-zinc-100 bg-zinc-50 p-6 transition-all duration-300 hover:border-primary/30 hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] sm:p-7"
          >
            <p className="font-serif text-lg font-medium text-zinc-900">{link.title}</p>
            <p className="mt-2 text-sm font-light leading-relaxed text-zinc-500">
              {link.description}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
