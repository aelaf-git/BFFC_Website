"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { submitContactMessage } from "@/lib/api/contact";
import { btnPrimary } from "@/lib/button-styles";
import {
  FormFeedbackModal,
  useFormFeedbackModal,
} from "@/components/ui/form-feedback-modal";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type Status = "idle" | "sending";

const initialState: FormState = { name: "", email: "", subject: "", message: "" };

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<Status>("idle");
  const { modalProps, showSuccess, showError, close } = useFormFeedbackModal();

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleModalClose() {
    close();
    setStatus("idle");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await submitContactMessage(form);
      setForm(initialState);
      setStatus("idle");
      showSuccess(
        "Message sent",
        response.message || "Thank you! We'll be in touch soon.",
      );
    } catch (err) {
      setStatus("idle");
      showError(
        "Unable to send message",
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again or email us directly.",
      );
    }
  }

  const fieldClass =
    "h-11 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 text-sm text-zinc-800 placeholder-zinc-400 outline-none transition-all focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20";

  return (
    <>
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
              maxLength={200}
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
              maxLength={320}
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
            maxLength={5000}
            className="min-h-[120px] flex-1 w-full resize-none rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-800 placeholder-zinc-400 outline-none transition-all focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20"
          />
        </div>

        <div className="mt-6">
          <button
            type="submit"
            disabled={status === "sending"}
            className={btnPrimary}
          >
            {status === "sending" ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Sending…
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Send message
              </>
            )}
          </button>
        </div>
      </form>

      <FormFeedbackModal {...modalProps} onClose={handleModalClose} />
    </>
  );
}
