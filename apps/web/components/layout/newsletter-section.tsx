import { NewsletterForm } from "@/components/layout/newsletter-form";

export function NewsletterSection() {
  return (
    <section
      className="relative w-full overflow-hidden bg-white border-t border-zinc-100"
      aria-label="Newsletter signup"
    >
      {/* Subtle blue tint circle — top right */}
      <div
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, #1a3a6b 8%, transparent) 0%, transparent 70%)",
        }}
        aria-hidden
      />
      {/* Subtle warm tint circle — bottom left */}
      <div
        className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, #f39120 5%, transparent) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">

          {/* Left — copy */}
          <div className="max-w-lg">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-accent mb-3">
              Stay Connected
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium leading-[1.15] tracking-tight text-zinc-900">
              Join Our Community.
              <span className="block text-primary">
                Brighten a Child&apos;s Future.
              </span>
            </h2>
            <p className="mt-4 text-[0.9rem] leading-relaxed text-zinc-500 font-light max-w-sm">
              Subscribe to receive stories of impact, program updates, and ways
              you can make a difference, delivered straight to your inbox.
            </p>
          </div>

          {/* Right — form */}
          <NewsletterForm variant="light" />

        </div>

        {/* Hairline */}
        <div className="mt-12 h-px bg-zinc-100" />

        {/* Fine-print */}
        <p className="mt-5 text-[0.65rem] text-zinc-400 font-light tracking-wide">
          We respect your privacy. Unsubscribe at any time. No spam, ever.
        </p>
      </div>
    </section>
  );
}
