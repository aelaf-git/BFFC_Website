"use client";

import { useState } from "react";
import { Send } from "lucide-react";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type Status = "idle" | "sending" | "sent" | "error";

const initialState: FormState = { name: "", email: "", subject: "", message: "" };

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<Status>("idle");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    /* TODO: wire to backend / email service */
    setTimeout(() => {
      setStatus("sent");
      setForm(initialState);
    }, 1200);
  }

  const fieldClass =
    "h-11 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 text-sm text-zinc-800 placeholder-zinc-400 outline-none transition-all focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20";

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Send us a message" className="flex h-full flex-col">
      <div className="grid grid-cols-1 items-end gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-xs font-medium text-zinc-500 tracking-wide uppercase">
            Name <span className="text-primary" aria-hidden="true">*</span>
          </label>
          <input
            id="contact-name"
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
          <label htmlFor="contact-email" className="mb-1.5 block text-xs font-medium text-zinc-500 tracking-wide uppercase">
            Email <span className="text-primary" aria-hidden="true">*</span>
          </label>
          <input
            id="contact-email"
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

      <div className="mt-4">
        <label htmlFor="contact-subject" className="mb-1.5 block text-xs font-medium text-zinc-500 tracking-wide uppercase">
          Subject
        </label>
        <select
          id="contact-subject"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          className={fieldClass}
        >
          <option value="">Select a topic…</option>
          <option value="donation">Make a donation</option>
          <option value="sponsorship">Child sponsorship</option>
          <option value="partnership">Partnership enquiry</option>
          <option value="volunteering">Volunteering</option>
          <option value="media">Media &amp; press</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="mt-4 flex flex-1 flex-col">
        <label htmlFor="contact-message" className="mb-1.5 block text-xs font-medium text-zinc-500 tracking-wide uppercase">
          Message <span className="text-primary" aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          placeholder="How can we help you?"
          value={form.message}
          onChange={handleChange}
          className="min-h-[120px] flex-1 w-full resize-none rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-800 placeholder-zinc-400 outline-none transition-all focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "sending" || status === "sent"}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Sending…
            </>
          ) : status === "sent" ? (
            "Message sent!"
          ) : (
            <>
              <Send className="h-4 w-4" />
              Send message
            </>
          )}
        </button>

        {status === "sent" && (
          <p className="text-sm text-emerald-600 font-medium">
            Thank you! We&apos;ll be in touch soon.
          </p>
        )}

        {status === "error" && (
          <p className="text-sm text-red-500">
            Something went wrong. Please try again or email us directly.
          </p>
        )}
      </div>
    </form>
  );
}
