import { API_BASE, parseApiError } from "@/lib/api/client";

export interface SubscribeNewsletterPayload {
  email: string;
  source?: string;
}

export interface SubscribeNewsletterResponse {
  message: string;
  alreadySubscribed: boolean;
}

export async function subscribeNewsletter(
  payload: SubscribeNewsletterPayload,
): Promise<SubscribeNewsletterResponse> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}/api/newsletter/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: payload.email,
        source: payload.source ?? "footer",
      }),
    });
  } catch {
    throw new Error(
      `Could not reach the API at ${API_BASE}. Make sure the backend is running.`,
    );
  }

  if (!res.ok) {
    throw new Error(await parseApiError(res));
  }

  return res.json() as Promise<SubscribeNewsletterResponse>;
}
