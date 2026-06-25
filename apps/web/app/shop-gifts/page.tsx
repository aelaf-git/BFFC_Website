import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HeroNavSignal } from "@/components/layout/hero-nav-provider";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `Shop Gifts | ${siteConfig.name}`,
  description: "Our gift shop is coming soon. Browse meaningful gifts that support children across Ethiopia.",
  robots: { index: false, follow: false },
};

export default function ShopGiftsPage() {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden">
      <HeroNavSignal />

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
        <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center px-6 py-24 text-center sm:py-32">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
          Shop Gifts
        </p>

        <h1 className="mt-4 font-serif text-4xl font-medium leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
          Under Construction
        </h1>

        <p className="mt-5 text-lg font-light leading-relaxed text-white/75 sm:text-xl">
          Our gift shop is on its way. Soon you&apos;ll be able to choose meaningful gifts that
          support children and communities across Ethiopia.
        </p>

        <p className="mt-3 text-sm font-light text-white/50">
          Thank you for your patience — great things take time.
        </p>

        <div className="my-10 h-px w-16 bg-white/20" aria-hidden="true" />

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/donate"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-primary-hover"
          >
            Donate Now
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
