import type { Metadata } from "next";
import Link from "next/link";
import { Heart, RefreshCw, Zap, Building2, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { btnInverted, btnPrimary, btnPrimarySm } from "@/lib/button-styles";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `Ways to Give | ${siteConfig.name}`,
  description:
    "Every gift — large or small — helps feed a hungry child and fund a brighter future. Explore one-time giving, monthly support, emergency relief, and corporate partnerships.",
  alternates: { canonical: `${siteConfig.url}/ways-to-give` },
  openGraph: {
    title: "Ways to Give",
    description:
      "One-time donations, monthly giving, emergency relief, and corporate partnerships — find the right way to support children in Ethiopia.",
    url: `${siteConfig.url}/ways-to-give`,
    siteName: siteConfig.name,
    type: "website",
  },
};

const givingOptions = [
  {
    icon: Heart,
    title: "One-Time Donation",
    subtitle: "Give what you can, when you can.",
    description:
      "A single donation of any size goes directly toward providing nutritious meals and school supplies for children in Afar, Tigray, and Amhara. Even $10 can feed a child for a week.",
    cta: { label: "Donate now", href: "/donate" },
    highlight: true,
  },
  {
    icon: RefreshCw,
    title: "Monthly Giving",
    subtitle: "Steady support creates lasting change.",
    description:
      "Become a monthly donor and provide children with the consistency they need to thrive. Monthly gifts allow us to plan meals, purchase supplies in bulk, and expand our reach to new communities.",
    cta: { label: "Become a monthly donor", href: "/donate?type=monthly" },
    highlight: false,
  },
  {
    icon: Zap,
    title: "Emergency Relief",
    subtitle: "Act when communities need it most.",
    description:
      "Conflict, drought, and displacement can strike without warning. Your emergency donation allows us to respond quickly — delivering food, water, and support to the most vulnerable children within days.",
    cta: { label: "Support emergency relief", href: "/donate?type=emergency" },
    highlight: false,
  },
  {
    icon: Building2,
    title: "Corporate & Legacy Giving",
    subtitle: "Make a lasting institutional impact.",
    description:
      "Partner with us as a corporate sponsor or include Bright Future for Children in your estate planning. Corporate and legacy gifts fund long-term programs and infrastructure that benefit children for generations.",
    cta: { label: "Get in touch", href: "/#get-in-touch" },
    highlight: false,
  },
];

const impactItems = [
  { amount: "$10", label: "feeds one child for a week" },
  { amount: "$25", label: "provides a full month of breakfasts" },
  { amount: "$60", label: "covers a school supply kit" },
  { amount: "$120", label: "funds a month of meals for one child" },
  { amount: "$500", label: "sponsors a child for a full semester" },
  { amount: "$1,000", label: "supports an entire classroom for a month" },
];

export default function WaysToGivePage() {
  return (
    <div className="flex-1 bg-white">
      <PageHero
        imageSrc="/hero/hero1.jpg"
        imageAlt="Children in Ethiopia"
        kicker="Make a Difference"
        title="Ways to Give"
        subtitle="Every gift — large or small — feeds a hungry child and funds a brighter future."
      />

      {/* ── Giving options ── */}
      <div className="container mx-auto px-6 py-20 sm:px-10 lg:px-20">
        <div className="mb-16 text-center">
          <h2 className="font-serif text-4xl font-medium tracking-tight text-zinc-900 sm:text-5xl">
            Choose How You Give
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base font-light leading-relaxed text-zinc-500">
            Whether you give once, give monthly, or give in a moment of crisis — every form of generosity
            is honoured and every dollar reaches the children who need it most.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {givingOptions.map(({ icon: Icon, title, subtitle, description, cta, highlight }) => (
            <div
              key={title}
              className={`flex flex-col rounded-3xl p-8 ${
                highlight
                  ? "bg-primary text-white"
                  : "border border-zinc-100 bg-zinc-50"
              }`}
            >
              <div
                className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl ${
                  highlight ? "bg-white/15" : "bg-white"
                }`}
              >
                <Icon
                  className={`h-5 w-5 ${highlight ? "text-white" : "text-primary"}`}
                  aria-hidden
                />
              </div>
              <p
                className={`mb-1 text-[10px] font-semibold uppercase tracking-[0.15em] ${
                  highlight ? "text-white/60" : "text-zinc-400"
                }`}
              >
                {subtitle}
              </p>
              <h3
                className={`font-serif text-2xl font-medium ${
                  highlight ? "text-white" : "text-zinc-900"
                }`}
              >
                {title}
              </h3>
              <p
                className={`mt-3 flex-1 text-sm leading-relaxed font-light ${
                  highlight ? "text-white/80" : "text-zinc-500"
                }`}
              >
                {description}
              </p>
              <Link
                href={cta.href}
                className={`mt-6 self-start ${highlight ? btnInverted : btnPrimarySm}`}
              >
                {cta.label} <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* ── Impact numbers ── */}
      <div className="bg-zinc-50">
        <div className="container mx-auto px-6 py-20 sm:px-10 lg:px-20">
          <div className="mb-12 text-center">
            <h2 className="font-serif text-4xl font-medium tracking-tight text-zinc-900 sm:text-5xl">
              Your Gift in Action
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base font-light text-zinc-500">
              See exactly how your donation translates into real meals, supplies, and opportunity.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
            {impactItems.map(({ amount, label }) => (
              <div key={amount} className="rounded-2xl bg-white p-6 text-center shadow-sm">
                <p className="font-serif text-3xl font-medium text-primary sm:text-4xl">{amount}</p>
                <p className="mt-2 text-sm font-light text-zinc-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── How we use donations ── */}
      <div className="container mx-auto px-6 py-20 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-4xl font-medium tracking-tight text-zinc-900 sm:text-5xl">
            How We Use Your Donations
          </h2>
          <p className="mt-5 text-base font-light leading-relaxed text-zinc-500">
            As a registered Canadian charity (No. {siteConfig.contact.charityRegistration}), we are committed to
            full financial transparency. The vast majority of every dollar donated goes directly to
            program delivery — meals, supplies, and community support in Ethiopia.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-6">
            {[
              { pct: "82%", label: "Program delivery" },
              { pct: "11%", label: "Administration" },
              { pct: "7%", label: "Fundraising" },
            ].map(({ pct, label }) => (
              <div key={label} className="rounded-2xl border border-zinc-100 p-6">
                <p className="font-serif text-4xl font-medium text-primary">{pct}</p>
                <p className="mt-1 text-sm font-light text-zinc-500">{label}</p>
              </div>
            ))}
          </div>
          <Link
            href="/#get-in-touch"
            className={btnPrimary}
          >
            Have a question? Contact us <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}
