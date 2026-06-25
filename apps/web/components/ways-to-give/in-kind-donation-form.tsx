"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { submitInKindDonation } from "@/lib/api/in-kind";
import { btnPrimaryLg } from "@/lib/button-styles";

type FormState = {
  name: string;
  email: string;
  phone: string;
  organization: string;
  category: string;
  itemDescription: string;
  estimatedQuantity: string;
  deliveryMethod: string;
  city: string;
  notes: string;
};

type Status = "idle" | "sending" | "sent" | "error";

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  organization: "",
  category: "",
  itemDescription: "",
  estimatedQuantity: "",
  deliveryMethod: "",
  city: "",
  notes: "",
};

const labelClass =
  "mb-2 block text-sm font-semibold uppercase tracking-wide text-zinc-600 sm:text-base";
const fieldClass =
  "w-full rounded-xl border-2 border-zinc-200 bg-white px-5 py-4 text-base text-zinc-900 placeholder:text-zinc-400 outline-none transition-all focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20 sm:text-lg";
const textareaClass =
  "w-full resize-y rounded-xl border-2 border-zinc-200 bg-white px-5 py-4 text-base text-zinc-900 placeholder:text-zinc-400 outline-none transition-all focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20 sm:text-lg";

export function InKindDonationForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      await submitInKindDonation({
        name: form.name,
        email: form.email,
        phone: form.phone || undefined,
        organization: form.organization || undefined,
        category: form.category,
        itemDescription: form.itemDescription,
        estimatedQuantity: form.estimatedQuantity || undefined,
        deliveryMethod: form.deliveryMethod,
        city: form.city || undefined,
        notes: form.notes || undefined,
      });
      setStatus("sent");
      setForm(initialState);
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="In-kind donation offer form" className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="inkind-name" className={labelClass}>
            Full name <span className="text-primary" aria-hidden="true">*</span>
          </label>
          <input
            id="inkind-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="inkind-email" className={labelClass}>
            Email <span className="text-primary" aria-hidden="true">*</span>
          </label>
          <input
            id="inkind-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            className={fieldClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="inkind-phone" className={labelClass}>
            Phone
          </label>
          <input
            id="inkind-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+1 (555) 000-0000"
            value={form.phone}
            onChange={handleChange}
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="inkind-organization" className={labelClass}>
            Organization
          </label>
          <input
            id="inkind-organization"
            name="organization"
            type="text"
            placeholder="Company, school, or group (optional)"
            value={form.organization}
            onChange={handleChange}
            className={fieldClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="inkind-category" className={labelClass}>
            Donation category <span className="text-primary" aria-hidden="true">*</span>
          </label>
          <select
            id="inkind-category"
            name="category"
            required
            value={form.category}
            onChange={handleChange}
            className={fieldClass}
          >
            <option value="">Select a category…</option>
            <option value="school-supplies">School supplies</option>
            <option value="food-nutrition">Food &amp; nutrition</option>
            <option value="clothing">Clothing</option>
            <option value="equipment">Equipment &amp; furniture</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="inkind-delivery" className={labelClass}>
            How will you deliver? <span className="text-primary" aria-hidden="true">*</span>
          </label>
          <select
            id="inkind-delivery"
            name="deliveryMethod"
            required
            value={form.deliveryMethod}
            onChange={handleChange}
            className={fieldClass}
          >
            <option value="">Select an option…</option>
            <option value="drop-off">I can drop off locally</option>
            <option value="pickup">Pickup needed</option>
            <option value="shipping">I will arrange shipping</option>
            <option value="discuss">I would like to discuss options</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="inkind-description" className={labelClass}>
          What would you like to donate? <span className="text-primary" aria-hidden="true">*</span>
        </label>
        <textarea
          id="inkind-description"
          name="itemDescription"
          required
          placeholder="Describe the items, condition, and any relevant details…"
          value={form.itemDescription}
          onChange={handleChange}
          className={`min-h-[140px] ${textareaClass}`}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="inkind-quantity" className={labelClass}>
            Estimated quantity or value
          </label>
          <input
            id="inkind-quantity"
            name="estimatedQuantity"
            type="text"
            placeholder="e.g. 50 backpacks, approx. $500 value"
            value={form.estimatedQuantity}
            onChange={handleChange}
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="inkind-city" className={labelClass}>
            Your city / location
          </label>
          <input
            id="inkind-city"
            name="city"
            type="text"
            placeholder="Calgary, Addis Ababa, etc."
            value={form.city}
            onChange={handleChange}
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="inkind-notes" className={labelClass}>
          Additional notes
        </label>
        <textarea
          id="inkind-notes"
          name="notes"
          placeholder="Preferred contact times, delivery dates, or other details…"
          value={form.notes}
          onChange={handleChange}
          className={`min-h-[120px] ${textareaClass}`}
        />
      </div>

      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "sending" || status === "sent"}
          className={`w-full ${btnPrimaryLg} !py-5 !text-lg`}
        >
          {status === "sending" ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Submitting…
            </>
          ) : status === "sent" ? (
            "Offer submitted"
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden />
              Submit in-kind offer
            </>
          )}
        </button>

        {status === "sent" && (
          <p className="text-sm font-medium text-emerald-600">
            Thank you. Our team will contact you shortly to coordinate your donation.
          </p>
        )}

        {status === "error" && (
          <p className="text-sm text-red-500">{errorMessage}</p>
        )}
      </div>
    </form>
  );
}
