const configuredApiUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

export const API_BASE = (
  configuredApiUrl || "http://localhost:5000"
).replace(/\/$/, "");

export async function parseApiError(res: Response): Promise<string> {
  const text = await res.text();
  if (!text) return `API error ${res.status}`;

  try {
    const json = JSON.parse(text) as { title?: string; detail?: string };
    return json.detail ?? json.title ?? text;
  } catch {
    if (text.includes("<!DOCTYPE html") || text.includes("<html")) {
      return `The site could not reach the API (got HTML instead of JSON). Check NEXT_PUBLIC_API_URL is set to your Azure API URL when the frontend is built.`;
    }
    return text.length > 200 ? `${text.slice(0, 200)}…` : text;
  }
}
