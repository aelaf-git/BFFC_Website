import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { InKindDonationForm } from "@/components/ways-to-give/in-kind-donation-form";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `Give in Kind | ${siteConfig.name}`,
  description:
    "Offer school supplies, food, clothing, equipment, and other in-kind gifts to support children across Ethiopia.",
  alternates: { canonical: `${siteConfig.url}/ways-to-give/in-kind` },
  openGraph: {
    title: "Give in Kind",
    description:
      "Tell us what you would like to donate in kind and our team will coordinate collection or delivery.",
    url: `${siteConfig.url}/ways-to-give/in-kind`,
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function InKindDonationPage() {
  return (
    <div className="flex-1 bg-white">
      <PageHero
        imageSrc="/hero/hero2.jpg"
        imageAlt="Community volunteers organizing donated supplies"
        kicker="Ways to Give"
        title="Give in Kind"
        subtitle="Share supplies, food, clothing, or equipment. Complete the form below and our team will follow up to coordinate your gift."
      />

      <div className="container mx-auto px-6 py-16 sm:px-10 lg:px-20">
        <Link
          href="/ways-to-give"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to Ways to Give
        </Link>

        <div className="mx-auto max-w-4xl">
          <div className="mb-10 space-y-4 text-base font-normal leading-relaxed text-zinc-700 sm:text-lg">
            <p>
              In-kind donations help us provide meals, school materials, clothing, and essential
              equipment directly to children and partner schools. Tell us what you would like to give
              and how you can deliver it, and we will be in touch to make arrangements.
            </p>
            <p className="text-sm text-zinc-500">
              Fields marked with <span className="text-primary">*</span> are required.
            </p>
          </div>

          <div className="rounded-3xl border-2 border-zinc-100 bg-zinc-50/80 p-6 sm:p-8 lg:p-12">
            <InKindDonationForm />
          </div>
        </div>
      </div>
    </div>
  );
}
