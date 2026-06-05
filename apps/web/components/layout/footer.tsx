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
import { HiEnvelope, HiIdentification, HiMapPin, HiPhone } from "react-icons/hi2";

export function Footer() {
  const socialLinks = [
    {
      icon: FaFacebookF,
      href: siteConfig.social.facebook || "https://facebook.com",
      label: "Facebook",
    },
    {
      icon: FaXTwitter,
      href: siteConfig.social.twitter || "https://twitter.com",
      label: "X (formerly Twitter)",
    },
    {
      icon: FaLinkedinIn,
      href: siteConfig.social.linkedin || "https://linkedin.com",
      label: "LinkedIn",
    },
    {
      icon: FaInstagram,
      href: "https://instagram.com",
      label: "Instagram",
    },
    {
      icon: FaYoutube,
      href: "https://youtube.com",
      label: "YouTube",
    },
  ];

  return (
    <footer className="w-full bg-white text-zinc-600 font-sans">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-16">
        
        {/* ── Main Links Grid ── */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          
          {/* Logo & Contact details - 4 columns wide */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Link href="/" className="inline-flex items-center gap-3" aria-label={brand.logo.alt}>
              <Image
                src={brand.logo.src}
                alt={brand.logo.alt}
                width={brand.logo.width}
                height={brand.logo.height}
                className="h-9 w-auto object-contain object-left sm:h-11"
              />
              <span className="font-serif text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                Bright Future for Children
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-zinc-500 max-w-sm font-light">
              {siteConfig.description}
            </p>
            <div className="flex flex-col gap-3.5 text-xs text-zinc-500">
              <a
                href="#"
                className="inline-flex items-start gap-2.5 hover:text-primary transition-colors text-zinc-500"
                aria-label={`Charity Registration Number ${siteConfig.contact.charityRegistration}`}
              >
                <HiIdentification className="h-4 w-4 shrink-0 text-primary mt-0.5" aria-hidden />
                <span>
                  <strong className="text-zinc-700">CHARITY REGISTRATION:</strong>
                  <br />
                  {siteConfig.contact.charityRegistration}
                </span>
              </a>
              <span className="inline-flex items-start gap-2.5">
                <HiMapPin className="h-4 w-4 shrink-0 text-primary mt-0.5" aria-hidden />
                <span>
                  {siteConfig.contact.street}
                  <br />
                  {siteConfig.contact.city}, {siteConfig.contact.province} {siteConfig.contact.postalCode}, {siteConfig.contact.country}
                </span>
              </span>
              <a
                href={siteConfig.contact.phoneHref}
                className="inline-flex items-center gap-2.5 hover:text-primary transition-colors"
                aria-label={`Call us at ${siteConfig.contact.phone}`}
              >
                <HiPhone className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                <span>{siteConfig.contact.phone}</span>
              </a>
              <a
                href={siteConfig.contact.phoneAltHref}
                className="inline-flex items-center gap-2.5 hover:text-primary transition-colors"
                aria-label={`Call us at ${siteConfig.contact.phoneAlt}`}
              >
                <HiPhone className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                <span>{siteConfig.contact.phoneAlt}</span>
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="inline-flex items-center gap-2.5 hover:text-primary transition-colors"
                aria-label={`Email us at ${siteConfig.contact.email}`}
              >
                <HiEnvelope className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                <span className="break-all">{siteConfig.contact.email}</span>
              </a>
            </div>
          </div>

          {/* Links columns - 8 columns wide total */}
          <div className="lg:col-span-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
            
            {/* Column 1: Footer Navigation */}
            <div className="flex flex-col gap-4">
              <h2 className="font-serif text-lg font-semibold tracking-wide text-foreground">
                Explore
              </h2>
              <nav className="flex flex-col gap-2.5 text-sm" aria-label="Footer navigation">
                <Link href="/#about" className="hover:text-primary transition-colors">
                  About Us
                </Link>
                <Link href="/#what-we-do" className="hover:text-primary transition-colors">
                  Our Work
                </Link>
                <Link href="/ways-to-give" className="hover:text-primary transition-colors">
                  Ways to Give
                </Link>
                <Link href="/stories" className="hover:text-primary transition-colors">
                  Stories
                </Link>
                <Link href="/resources" className="hover:text-primary transition-colors">
                  Resources
                </Link>
                <Link href="/faqs" className="hover:text-primary transition-colors">
                  FAQs
                </Link>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </nav>
            </div>

            {/* Column 2: Legal & Social */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <h2 className="font-serif text-lg font-semibold tracking-wide text-foreground">
                  Legal
                </h2>
                <nav className="flex flex-col gap-2.5 text-sm" aria-label="Legal information">
                  <Link href="/legal/privacy-policy" className="hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                  <Link href="/legal/terms-of-use" className="hover:text-primary transition-colors">
                    Terms of Use
                  </Link>
                  <Link href="/legal/accessibility-statement" className="hover:text-primary transition-colors">
                    Accessibility Statement
                  </Link>
                </nav>
              </div>

              <div className="flex flex-col gap-4 pt-2">
                <h2 className="font-serif text-md font-semibold tracking-wide text-foreground">
                  Connect With Us
                </h2>
                <div className="flex items-center gap-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-400 hover:text-primary transition-colors duration-300"
                        aria-label={social.label}
                      >
                        <Icon className="h-4.5 w-4.5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── Newsletter Band (Centered with dynamic title) ── */}
        <div className="mt-28 mb-16">
          <div className="flex flex-col items-center text-center">

            {/* Heading: Guaranteed single line on desktop/tablet, wraps fluidly on mobile */}
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-zinc-900 leading-[1.15] whitespace-normal md:whitespace-nowrap">
              Stay in the Loop. <span className="text-primary">Make a Difference.</span>
            </h2>

            <p className="mt-5 text-sm sm:text-base leading-relaxed text-zinc-400 font-light whitespace-normal md:whitespace-nowrap">
              Stories of impact, program updates, and ways you can help —
              delivered straight to your inbox.
            </p>

            {/* Form — constrained width, centered */}
            <div className="mt-10 w-full max-w-lg mx-auto">
              <NewsletterForm variant="light" />
              <p className="mt-4 text-[0.7rem] text-zinc-400 font-light tracking-wide">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs text-zinc-400">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="font-light">
            Bright Future for Children is a registered Canadian charity.
          </p>
        </div>

      </div>
    </footer>
  );
}
