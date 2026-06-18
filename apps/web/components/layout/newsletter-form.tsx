"use client";

import { useState } from "react";
import { subscribeNewsletter } from "@/lib/api/newsletter";

interface NewsletterFormProps {
  variant?: "dark" | "light";
}

type Status = "idle" | "submitting" | "success" | "error";

export function NewsletterForm({ variant = "light" }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setFeedback("");

    try {
      const response = await subscribeNewsletter({ email, source: "footer" });
      setStatus("success");
      setFeedback(response.message);
      setEmail("");
    } catch {
      setStatus("error");
      setFeedback("Unable to subscribe right now. Please try again later.");
    }
  }

  const isLight = variant === "light";

  return (
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
          onChange={(e) => {
            setEmail(e.target.value);
            if (status !== "idle") setStatus("idle");
          }}
          placeholder="Your email address"
          autoComplete="email"
          disabled={status === "submitting"}
          className={[
            "flex-1 h-13 px-5 py-3.5 text-sm font-light tracking-wide outline-none transition-all duration-200",
            "sm:rounded-l-[2px] sm:rounded-r-none rounded-[2px]",
            isLight
              ? "bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:border-primary/60 focus:bg-white"
              : "bg-white/[0.08] border border-white/[0.15] text-white placeholder-white/40 focus:border-primary/60 focus:bg-white/10",
          ].join(" ")}
        />
        <button
          type="submit"
          disabled={status === "submitting" || status === "success"}
          className="
            h-13 px-8 py-3.5 shrink-0 w-full sm:w-auto
            bg-primary hover:bg-primary-hover
            text-white text-xs font-bold uppercase tracking-[0.2em]
            transition-colors duration-200
            sm:rounded-l-none sm:rounded-r-[2px] rounded-[2px]
            disabled:cursor-not-allowed disabled:opacity-70
          "
        >
          {status === "submitting" ? "Subscribing…" : status === "success" ? "Subscribed" : "Subscribe"}
        </button>
      </div>

      {feedback && (
        <p
          className={`mt-3 text-sm ${
            status === "error"
              ? "text-red-500"
              : isLight
                ? "text-emerald-600"
                : "text-emerald-300"
          }`}
          role="status"
        >
          {feedback}
        </p>
      )}
    </form>
  );
}
