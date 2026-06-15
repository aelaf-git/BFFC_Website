import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HeroNavSignal } from "@/components/layout/hero-nav-provider";

export const metadata: Metadata = {
  title: "Page Coming Soon | Bright Future For Children Ethiopia",
  description: "This page is currently under development. Return to our homepage to learn more about our mission.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden">
      {/* Signal the navbar to start transparent over this full-screen hero */}
      <HeroNavSignal />

      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/whatwedo.jpeg"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          aria-hidden="true"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center px-6 py-24 text-center sm:py-32">

        {/* Icon */}
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20 backdrop-blur-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
            />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="font-serif text-4xl font-medium leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
          Under Construction
        </h1>

        {/* Subheading */}
        <p className="mt-5 text-lg font-light leading-relaxed text-white/75 sm:text-xl">
          This page is on its way. Our team is working hard to bring you more
          content that supports the children and communities we serve.
        </p>

        <p className="mt-3 text-sm font-light text-white/50">
          Thank you for your patience — great things take time.
        </p>

        {/* Divider */}
        <div className="my-10 h-px w-16 bg-white/20" aria-hidden="true" />

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-primary/90 hover:shadow-primary/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414l-7-7Z" />
            </svg>
            Back to Homepage
          </Link>

          <Link
            href="/#get-in-touch"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
