import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Banknote, Package } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { btnPrimary } from "@/lib/button-styles";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `Ways to Give | ${siteConfig.name}`,
  description:
    "Support Bright Future for Children with a cash donation or an in-kind gift of supplies, food, clothing, and equipment.",
  alternates: { canonical: `${siteConfig.url}/ways-to-give` },
  openGraph: {
    title: "Ways to Give",
    description:
      "Choose to give by cash or in kind. Every gift helps feed, educate, and support children across Ethiopia.",
    url: `${siteConfig.url}/ways-to-give`,
    siteName: siteConfig.name,
    type: "website",
  },
};

const givingPaths = [
  {
    icon: Banknote,
    title: "Give by Cash",
    subtitle: "Monetary donations",
    description:
      "Make a secure one-time or monthly gift online. Your contribution goes directly toward school meals, supplies, health support, and community programs for children in Ethiopia.",
    examples: [
      "One-time or monthly giving",
      "Secure card payment via Stripe",
      "Tax receipt for eligible Canadian donors",
    ],
    cta: { label: "Donate with money", href: "/donate" },
    primary: true,
  },
  {
    icon: Package,
    title: "Give in Kind",
    subtitle: "Goods and supplies",
    description:
      "Donate school supplies, food, clothing, equipment, or other goods. Tell us what you would like to give and our team will coordinate collection, drop-off, or shipping.",
    examples: [
      "School supplies and learning kits",
      "Food, clothing, and hygiene items",
      "Equipment, furniture, and other goods",
    ],
    cta: { label: "Offer an in-kind gift", href: "/ways-to-give/in-kind" },
    primary: false,
  },
];

export default function WaysToGivePage() {
  return (
    <div className="flex-1 bg-white">
      <PageHero
        imageSrc="/hero/hero1.jpg"
        imageAlt="Children in Ethiopia"
        kicker="Support Our Mission"
        title="Ways to Give"
        subtitle="There are two ways to support our work: give by cash or give in kind. Choose the path that fits you best."
      />

      <div className="container mx-auto px-6 py-20 sm:px-10 lg:px-20">
        <div className="mb-14 text-center">
          <h2 className="font-serif text-4xl font-medium tracking-tight text-zinc-900 sm:text-5xl">
            How Would You Like to Give?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base font-light leading-relaxed text-zinc-500">
            Whether you contribute financially or donate goods, your generosity helps children access
            nutrition, education, and opportunity.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2 lg:gap-10">
          {givingPaths.map(({ icon: Icon, title, subtitle, description, examples, cta, primary }) => (
            <article
              key={title}
              className={`flex flex-col rounded-3xl border p-8 sm:p-10 ${
                primary
                  ? "border-primary/30 bg-primary-light shadow-sm"
                  : "border-zinc-100 bg-zinc-50"
              }`}
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
                <Icon className="h-7 w-7 text-primary" aria-hidden />
              </div>

              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-500">
                {subtitle}
              </p>
              <h3 className="mt-1 font-serif text-3xl font-medium text-zinc-900">
                {title}
              </h3>
              <p className="mt-4 flex-1 text-base font-normal leading-relaxed text-zinc-600">
                {description}
              </p>

              <ul className="mt-6 space-y-2.5 text-sm font-normal text-zinc-600">
                {examples.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>

              <Link href={cta.href} className={`mt-8 self-start ${btnPrimary}`}>
                {cta.label}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </article>
          ))}
        </div>
      </div>

      <div className="bg-zinc-50">
        <div className="container mx-auto px-6 py-16 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-medium tracking-tight text-zinc-900 sm:text-4xl">
              Every Gift Makes a Difference
            </h2>
            <p className="mt-4 text-base font-light leading-relaxed text-zinc-500">
              As a registered Canadian charity (No. {siteConfig.contact.charityRegistration}), we put
              your support to work through meals, school supplies, health programs, and community
              partnerships across Ethiopia.
            </p>
            <Link href="/#get-in-touch" className={`mt-8 inline-flex ${btnPrimary}`}>
              Questions? Contact us
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
