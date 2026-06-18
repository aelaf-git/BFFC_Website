import { API_BASE, parseApiError } from "@/lib/api/client";

export interface SubmitContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface SubmitContactResponse {
  id: string;
  message: string;
}

const SUBJECT_LABELS: Record<string, string> = {
  donation: "Make a donation",
  sponsorship: "Child sponsorship",
  partnership: "Partnership enquiry",
  volunteering: "Volunteering",
  media: "Media & press",
  other: "Other",
};

export function formatContactSubject(value: string): string {
  if (!value.trim()) return "General enquiry";
  return SUBJECT_LABELS[value] ?? value;
}

export async function submitContactMessage(
  payload: SubmitContactPayload,
): Promise<SubmitContactResponse> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        subject: formatContactSubject(payload.subject),
        message: payload.message,
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

  return res.json() as Promise<SubmitContactResponse>;
}
