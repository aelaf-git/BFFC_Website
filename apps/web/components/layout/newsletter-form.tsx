"use client";

interface NewsletterFormProps {
  variant?: "dark" | "light";
}

export function NewsletterForm({ variant = "light" }: NewsletterFormProps) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: wire up to your email service / API route
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
          placeholder="Your email address"
          autoComplete="email"
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
          className="
            h-13 px-8 py-3.5 shrink-0 w-full sm:w-auto
            bg-primary hover:bg-primary-hover
            text-white text-xs font-bold uppercase tracking-[0.2em]
            transition-colors duration-200
            sm:rounded-l-none sm:rounded-r-[2px] rounded-[2px]
          "
        >
          Subscribe
        </button>
      </div>
    </form>
  );
}
