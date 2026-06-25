import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { brand } from "@/lib/brand";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

const primaryLinks = [
  { href: "/#about", label: "About Us" },
  { href: "/#what-we-do", label: "Our Work" },
  { href: "/projects", label: "Projects" },
  { href: "/ways-to-give", label: "Ways to Give" },
  { href: "/shop-gifts", label: "Shop Gifts" },
  { href: "/stories", label: "Stories" },
  { href: "/resources", label: "Resources" },
  { href: "/faqs", label: "FAQs" },
] as const;

const legalLinks = [
  { href: "/legal/accessibility-statement", label: "Accessibility" },
  { href: "/legal/privacy-policy", label: "Privacy Policy" },
  { href: "/legal/terms-of-use", label: "Terms of Use" },
  { href: `mailto:${siteConfig.contact.email}`, label: "Contact" },
] as const;

const socialLinks = [
  {
    icon: FaFacebookF,
    href: siteConfig.social.facebook || "https://facebook.com",
    label: "Facebook",
  },
  {
    icon: FaYoutube,
    href: "https://youtube.com",
    label: "YouTube",
  },
  {
    icon: FaXTwitter,
    href: siteConfig.social.twitter || "https://twitter.com",
    label: "X (formerly Twitter)",
  },
  {
    icon: FaInstagram,
    href: "https://instagram.com",
    label: "Instagram",
  },
  {
    icon: FaLinkedinIn,
    href: siteConfig.social.linkedin || "https://linkedin.com",
    label: "LinkedIn",
  },
] as const;

function FooterDivider() {
  return <div className="mx-auto h-px w-full max-w-5xl bg-white/20" aria-hidden />;
}

const contactDetailClass =
  "text-base leading-relaxed text-white/80 transition-colors hover:text-white";

function FooterLink({
  href,
  label,
  className = "",
}: {
  href: string;
  label: string;
  className?: string;
}) {
  const isExternal = href.startsWith("mailto:") || href.startsWith("tel:");

  const classes = [
    "underline underline-offset-4 decoration-white/35 transition-colors hover:text-white hover:decoration-white",
    className,
  ].join(" ");

  if (isExternal) {
    return (
      <a href={href} className={classes}>
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {label}
    </Link>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
      <footer className="w-full bg-accent-deep text-white">
        <div className="mx-auto max-w-7xl px-6 py-14 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
          {/* Brand */}
          <div className="flex flex-col items-center text-center">
            <Link href="/" className="inline-flex flex-col items-center gap-4" aria-label={brand.logo.alt}>
              <Image
                src={brand.logo.src}
                alt={brand.logo.alt}
                width={brand.logo.width}
                height={brand.logo.height}
                className="h-20 w-auto max-w-[min(100%,22rem)] object-contain brightness-0 invert sm:h-28 sm:max-w-[28rem] lg:h-32 lg:max-w-[32rem]"
              />
            </Link>
          </div>

          <div className="my-10 sm:my-12">
            <FooterDivider />
          </div>

          {/* Contact & social */}
          <div className="mx-auto grid max-w-4xl gap-10 sm:grid-cols-2 sm:gap-12">
            <div className="text-center sm:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                Contact Us
              </p>
              <div className="mt-4 flex flex-col gap-3">
                <a
                  href={siteConfig.contact.phoneHref}
                  className={contactDetailClass}
                  aria-label={`Call us at ${siteConfig.contact.phone}`}
                >
                  {siteConfig.contact.phone}
                </a>
                <a
                  href={siteConfig.contact.phoneAltHref}
                  className={contactDetailClass}
                  aria-label={`Call us at ${siteConfig.contact.phoneAlt}`}
                >
                  {siteConfig.contact.phoneAlt}
                </a>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className={contactDetailClass}
                >
                  {siteConfig.contact.email}
                </a>
                <p className={contactDetailClass}>
                  {siteConfig.contact.street}
                  <br />
                  {siteConfig.contact.city}, {siteConfig.contact.province}{" "}
                  {siteConfig.contact.postalCode}, {siteConfig.contact.country}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center sm:items-end">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                Follow Us
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:justify-end">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-accent-deep transition-colors duration-300 hover:bg-primary hover:text-white"
                      aria-label={social.label}
                    >
                      <Icon className="h-4 w-4" aria-hidden />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="my-10 sm:my-12">
            <FooterDivider />
          </div>

          {/* Primary navigation */}
          <nav
            className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-5 gap-y-3 text-center text-sm sm:gap-x-7 sm:text-base"
            aria-label="Footer navigation"
          >
            {primaryLinks.map((link) => (
              <FooterLink key={link.href} href={link.href} label={link.label} />
            ))}
          </nav>

          {/* Legal links */}
          <nav
            className="mx-auto mt-6 flex max-w-4xl flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center text-xs text-white/75 sm:mt-8 sm:gap-x-6 sm:text-sm"
            aria-label="Legal information"
          >
            {legalLinks.map((link) => (
              <FooterLink key={link.href} href={link.href} label={link.label} />
            ))}
          </nav>

          <div className="my-10 sm:my-12">
            <FooterDivider />
          </div>

          {/* Newsletter */}
          <div className="mx-auto max-w-xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
              Stay Connected
            </p>
            <h2 className="mt-3 font-serif text-2xl font-medium tracking-tight text-white sm:text-3xl">
              Join our community
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Stories of impact, program updates, and ways you can help — delivered to your inbox.
            </p>
            <div className="mt-8">
              <NewsletterForm variant="dark" />
              <p className="mt-4 text-xs text-white/50">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>

          <div className="my-10 sm:my-12">
            <FooterDivider />
          </div>

          {/* Copyright & registration */}
          <div className="text-center">
            <p className="text-sm text-white/80">
              &copy; {year} {siteConfig.name}. All rights reserved.
            </p>
            <p className="mt-2 text-sm text-white/70">
              Charitable Registration Number: {siteConfig.contact.charityRegistration}
            </p>
          </div>
        </div>
      </footer>
  );
}
