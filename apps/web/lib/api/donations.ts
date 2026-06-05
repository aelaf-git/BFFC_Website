const API_BASE =
  (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000").replace(/\/$/, "");

export interface CreateIntentPayload {
  amountCents: number;
  currency: string;
  donorEmail: string;
  donorName: string;
  mode: "one-time" | "monthly";
  phoneNumber?: string;
}

export interface CreateIntentResponse {
  clientSecret: string;
  publishableKey: string;
}

/**
 * Calls POST /api/donations/create-intent on the ASP.NET Core backend.
 * Returns the Stripe clientSecret needed to confirm the payment on the frontend.
 */
export async function createPaymentIntent(
  payload: CreateIntentPayload,
): Promise<CreateIntentResponse> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}/api/donations/create-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amountCents: payload.amountCents,
        currency: payload.currency,
        donorEmail: payload.donorEmail,
        donorName: payload.donorName,
        mode: payload.mode,
        phoneNumber: payload.phoneNumber ?? null,
      }),
    });
  } catch {
    throw new Error(
      `Could not reach the API at ${API_BASE}. Make sure the backend is running (dotnet run in apps/api).`,
    );
  }

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `API error ${res.status}`);
  }

  return res.json() as Promise<CreateIntentResponse>;
}
