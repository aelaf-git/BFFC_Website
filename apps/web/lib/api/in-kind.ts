import { API_BASE, parseApiError } from "@/lib/api/client";

export interface SubmitInKindDonationPayload {
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  category: string;
  itemDescription: string;
  estimatedQuantity?: string;
  deliveryMethod: string;
  city?: string;
  notes?: string;
}

export interface SubmitInKindDonationResponse {
  id: string;
  message: string;
}

export async function submitInKindDonation(
  payload: SubmitInKindDonationPayload,
): Promise<SubmitInKindDonationResponse> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}/api/in-kind-donations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error(
      `Could not reach the API at ${API_BASE}. Make sure the backend is running.`,
    );
  }

  if (!res.ok) {
    throw new Error(await parseApiError(res));
  }

  return res.json() as Promise<SubmitInKindDonationResponse>;
}
