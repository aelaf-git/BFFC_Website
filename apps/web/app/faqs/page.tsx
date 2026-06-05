import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { FaqList } from "@/components/faqs/faq-list";

export const metadata: Metadata = {
  title: `FAQs | ${siteConfig.name}`,
  description:
    "Answers to common questions about our charity, how donations are used, tax receipts, child sponsorship, and how to get involved.",
  alternates: { canonical: `${siteConfig.url}/faqs` },
  openGraph: {
    title: "Frequently Asked Questions",
    description:
      "Everything you need to know about donating, sponsoring a child, and supporting our mission in Ethiopia.",
    url: `${siteConfig.url}/faqs`,
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function FaqsPage() {
  return (
    <div className="flex-1 bg-white">
      {/* ── Hero ── */}
      <div className="relative h-64 w-full overflow-hidden bg-zinc-900 sm:h-80">
        <Image
          src="/leadership-background.png"
          alt="Children at school"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">
            Have Questions?
          </p>
          <h1 className="font-serif text-4xl font-medium tracking-tight text-white sm:text-5xl lg:text-6xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 max-w-xl text-base font-light text-white/75">
            Everything you need to know about our charity, your donations, and how we work.
          </p>
        </div>
      </div>

      {/* ── FAQ list ── */}
      <div className="container mx-auto px-6 py-20 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <h2 className="font-serif text-4xl font-medium tracking-tight text-zinc-900 sm:text-5xl">
              Common Questions
            </h2>
            <p className="mt-4 text-base font-light text-zinc-500">
              {"Can't find what you're looking for? "}
              <Link href="/#get-in-touch" className="text-primary hover:underline">
                Get in touch
              </Link>
              {" and we'll be happy to help."}
            </p>
          </div>
          <FaqList />
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="bg-zinc-50">
        <div className="container mx-auto px-6 py-16 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-medium tracking-tight text-zinc-900 sm:text-4xl">
              Still have questions?
            </h2>
            <p className="mt-4 text-base font-light text-zinc-500">
              {"Our team is happy to help. Reach out and we'll respond within one business day."}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/#get-in-touch"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-primary/90"
              >
                Contact us <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
              <Link
                href="/ways-to-give"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-7 py-3 text-sm font-semibold text-zinc-700 transition-all hover:border-zinc-300"
              >
                Ways to give
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
