"use client";

import { useState } from "react";
import { subscribeNewsletter } from "@/lib/api/newsletter";
import { btnPrimary } from "@/lib/button-styles";
import {
  FormFeedbackModal,
  useFormFeedbackModal,
} from "@/components/ui/form-feedback-modal";

interface NewsletterFormProps {
  variant?: "dark" | "light";
}

type Status = "idle" | "submitting";

export function NewsletterForm({ variant = "light" }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const { modalProps, showSuccess, showError, close } = useFormFeedbackModal();

  function handleModalClose() {
    close();
    setStatus("idle");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    try {
      const response = await subscribeNewsletter({ email, source: "footer" });
      setEmail("");
      setStatus("idle");
      showSuccess(
        response.alreadySubscribed ? "Already subscribed" : "You're subscribed",
        response.message,
      );
    } catch (err) {
      setStatus("idle");
      showError(
        "Unable to subscribe",
        err instanceof Error
          ? err.message
          : "Unable to subscribe right now. Please try again later.",
      );
    }
  }

  const isLight = variant === "light";

  return (
    <>
      <form
        onSubmit={handleSubmit}
        aria-label="Newsletter signup form"
        className="w-full"
      >
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-0">
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            autoComplete="email"
            maxLength={320}
            disabled={status === "submitting"}
            className={[
              "flex-1 h-13 px-5 py-3.5 text-sm font-light tracking-wide outline-none transition-all duration-200",
              "sm:rounded-l-none sm:rounded-r-none rounded-none",
              isLight
                ? "bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:border-primary/60 focus:bg-white"
                : "bg-white/[0.08] border border-white/[0.15] text-white placeholder-white/40 focus:border-primary/60 focus:bg-white/10",
            ].join(" ")}
          />
          <button
            type="submit"
            disabled={status === "submitting"}
            className={`h-13 shrink-0 w-full px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] sm:w-auto ${btnPrimary}`}
          >
            {status === "submitting" ? "Subscribing…" : "Subscribe"}
          </button>
        </div>
      </form>

      <FormFeedbackModal {...modalProps} onClose={handleModalClose} />
    </>
  );
}
