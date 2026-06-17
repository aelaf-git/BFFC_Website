import type { SearchDocument } from "@/lib/search-index";

export type SearchResult = SearchDocument & {
  score: number;
};

function normalize(text: string): string {
  return text.toLowerCase().trim();
}

function tokenize(query: string): string[] {
  return normalize(query).split(/\s+/).filter(Boolean);
}

function scoreDocument(doc: SearchDocument, tokens: string[]): number {
  const title = normalize(doc.title);
  const description = normalize(doc.description);
  const body = normalize(doc.body ?? "");
  const keywords = (doc.keywords ?? []).map(normalize).join(" ");

  let score = 0;

  for (const token of tokens) {
    if (title.includes(token)) score += 10;
    if (title === token) score += 5;
    if (keywords.includes(token)) score += 6;
    if (description.includes(token)) score += 4;
    if (body.includes(token)) score += 2;
  }

  // Boost exact phrase matches in title
  const phrase = tokens.join(" ");
  if (phrase && title.includes(phrase)) score += 8;
  if (phrase && description.includes(phrase)) score += 3;

  return score;
}

/**
 * Search the document index. Returns ranked results above the score threshold.
 */
export function searchDocuments(
  query: string,
  documents: SearchDocument[],
  limit = 20,
): SearchResult[] {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const tokens = tokenize(trimmed);
  if (tokens.length === 0) return [];

  const results: SearchResult[] = [];

  for (const doc of documents) {
    const score = scoreDocument(doc, tokens);
    if (score > 0) {
      results.push({ ...doc, score });
    }
  }

  return results
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, limit);
}

/** Deduplicate results by href, keeping the highest-scored entry per URL. */
export function dedupeByHref(results: SearchResult[]): SearchResult[] {
  const seen = new Map<string, SearchResult>();

  for (const result of results) {
    const existing = seen.get(result.href);
    if (!existing || result.score > existing.score) {
      seen.set(result.href, result);
    }
  }

  return Array.from(seen.values()).sort(
    (a, b) => b.score - a.score || a.title.localeCompare(b.title),
  );
}
