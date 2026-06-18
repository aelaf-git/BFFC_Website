export const API_BASE = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000"
).replace(/\/$/, "");

export async function parseApiError(res: Response): Promise<string> {
  const text = await res.text();
  if (!text) return `API error ${res.status}`;

  try {
    const json = JSON.parse(text) as { title?: string; detail?: string };
    return json.detail ?? json.title ?? text;
  } catch {
    return text;
  }
}
