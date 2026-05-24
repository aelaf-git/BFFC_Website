import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { brand } from "@/lib/brand";
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
    <footer className="w-full bg-white text-zinc-600 border-t border-border font-sans">

      {/* ── Newsletter Band ── */}
      <div className="relative w-full overflow-hidden bg-[#1c2b1e]">
        {/* Subtle texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent,transparent 2px,#fff 2px,#fff 3px), repeating-linear-gradient(90deg,transparent,transparent 2px,#fff 2px,#fff 3px)",
          }}
          aria-hidden
        />

        {/* Decorative accent shapes */}
        <div
          className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #f39120 0%, transparent 70%)" }}
          aria-hidden
        />
        <div
          className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(circle, #f39120 0%, transparent 70%)" }}
          aria-hidden
        />

        <div className="relative mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">

            {/* Left — copy */}
            <div className="max-w-lg">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-primary/80 mb-3">
                Stay Connected
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium leading-[1.15] tracking-tight text-white">
                Join Our Community.
                <span className="block text-primary/90">Brighten a Child&apos;s Future.</span>
              </h2>
              <p className="mt-4 text-[0.9rem] leading-relaxed text-white/50 font-light max-w-sm">
                Subscribe to receive stories of impact, program updates, and ways
                you can make a difference — delivered straight to your inbox.
              </p>
            </div>

            {/* Right — form */}
            <form
              className="flex flex-col sm:flex-row gap-0 w-full max-w-md lg:max-w-sm xl:max-w-md"
              onSubmit={(e) => e.preventDefault()}
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
                className="
                  flex-1 min-w-0 h-12 px-5
                  bg-white/8 border border-white/15
                  text-white placeholder-white/30
                  text-sm font-light tracking-wide
                  outline-none
                  focus:border-primary/60 focus:bg-white/10
                  transition-all duration-200
                  sm:rounded-l-sm sm:rounded-r-none rounded-sm
                "
              />
              <button
                type="submit"
                className="
                  h-12 px-7 shrink-0
                  bg-primary hover:bg-primary-hover
                  text-white text-[0.72rem] font-bold uppercase tracking-[0.18em]
                  transition-colors duration-200
                  sm:rounded-l-none sm:rounded-r-sm rounded-sm
                  mt-0
                "
              >
                Subscribe
              </button>
            </form>

          </div>

          {/* Hairline separator */}
          <div className="mt-12 h-px bg-white/8" />

          {/* Fine-print */}
          <p className="mt-5 text-[0.65rem] text-white/25 font-light tracking-wide">
            We respect your privacy. Unsubscribe at any time. No spam, ever.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
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
            <p className="text-sm leading-relaxed text-zinc-500 max-w-sm">
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
                  303-1835 10Ave SE
                  <br />
                  Calgary, AB T2G 5N7, Canada
                </span>
              </span>
              <a
                href={`tel:${siteConfig.contact.phoneHref}`}
                className="inline-flex items-center gap-2.5 hover:text-primary transition-colors"
                aria-label={`Call us at ${siteConfig.contact.phone}`}
              >
                <HiPhone className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                <span>{siteConfig.contact.phone}</span>
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

          {/* Links columns - 8 columns wide total, divided into subgrids */}
          <div className="lg:col-span-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {/* Column 1: Footer Navigation */}
            <div className="flex flex-col gap-4">
              <h2 className="font-serif text-lg font-semibold tracking-wide text-foreground">
                Footer Navigation
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

            {/* Column 2: Transparency & Reports */}
            <div className="flex flex-col gap-4">
              <h2 className="font-serif text-lg font-semibold tracking-wide text-foreground">
                Transparency & Reports
              </h2>
              <nav className="flex flex-col gap-2.5 text-sm" aria-label="Transparency and reports">
                <Link href="/transparency/annual-report" className="hover:text-primary transition-colors">
                  Annual Report
                </Link>
                <Link href="/transparency/financial-accountability" className="hover:text-primary transition-colors">
                  Financial Accountability
                </Link>
              </nav>
            </div>

            {/* Column 3: Legal & Social */}
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
                <div className="flex items-center gap-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-50 border border-zinc-200 hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 text-zinc-600"
                        aria-label={social.label}
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-border pt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs text-zinc-400">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Bright Future for Children is a registered Canadian charity.
          </p>
        </div>
      </div>
    </footer>
  );
}
