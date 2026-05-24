"use client";

interface NewsletterFormProps {
  /** "dark" = white text on dark bg (default); "light" = dark text on white bg */
  variant?: "dark" | "light";
}

export function NewsletterForm({ variant = "dark" }: NewsletterFormProps) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: wire up to your email service / API route
  }

  const isLight = variant === "light";

  return (
    <form
      className="flex flex-col sm:flex-row gap-0 w-full max-w-md lg:max-w-sm xl:max-w-md"
      onSubmit={handleSubmit}
      aria-label="Newsletter signup form"
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder="Your email address"
        autoComplete="email"
        className={[
          "flex-1 min-w-0 h-12 px-5 text-sm font-light tracking-wide outline-none transition-all duration-200",
          "sm:rounded-l-sm sm:rounded-r-none rounded-sm",
          isLight
            ? "bg-white border border-zinc-300 text-zinc-900 placeholder-zinc-400 focus:border-primary/70"
            : "bg-white/[0.08] border border-white/[0.15] text-white placeholder-white/30 focus:border-primary/60 focus:bg-white/10",
        ].join(" ")}
      />
      <button
        type="submit"
        className="
          h-12 px-7 shrink-0
          bg-primary hover:bg-primary-hover
          text-white text-[0.72rem] font-bold uppercase tracking-[0.18em]
          transition-colors duration-200
          sm:rounded-l-none sm:rounded-r-sm rounded-sm
        "
      >
        Subscribe
      </button>
    </form>
  );
}
