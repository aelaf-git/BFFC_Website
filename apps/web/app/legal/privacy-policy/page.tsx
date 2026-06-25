import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/page-hero";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `Privacy Policy | ${siteConfig.name}`,
  description:
    "Learn how Bright Future for Children collects, uses, and protects your personal information in accordance with Canadian privacy law (PIPEDA).",
  alternates: { canonical: `${siteConfig.url}/legal/privacy-policy` },
  openGraph: {
    title: "Privacy Policy",
    description: "How we collect, use, and protect your personal information.",
    url: `${siteConfig.url}/legal/privacy-policy`,
    siteName: siteConfig.name,
    type: "website",
  },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "June 1, 2025";

export default function PrivacyPolicyPage() {
  const { contact } = siteConfig;

  return (
    <div className="flex-1 bg-white">
      <PageHero
        imageSrc="/about-one.jpeg"
        imageAlt=""
        decorativeImage
        size="compact"
        kicker="Legal"
        title="Privacy Policy"
        subtitle={`Last updated: ${LAST_UPDATED}`}
        titleClassName="font-serif text-4xl font-medium tracking-tight text-white sm:text-5xl"
      />

      {/* ── Content ── */}
      <div className="container mx-auto px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-3xl space-y-10 text-zinc-600">

          <Section title="1. Who We Are">
            <p>
              Bright Future for Children (hereinafter <strong>"BFFC"</strong>, <strong>"we"</strong>,{" "}
              <strong>"our"</strong>, or <strong>"us"</strong>) is a registered Canadian charity
              (Charity Registration No.{" "}
              <span className="font-medium text-zinc-800">{contact.charityRegistration}</span>
              ) headquartered at {contact.street}, {contact.city},{" "}
              {contact.province} {contact.postalCode}, {contact.country}.
            </p>
            <p>
              We are committed to respecting your privacy and protecting your personal information in
              accordance with Canada's{" "}
              <em>Personal Information Protection and Electronic Documents Act</em> (PIPEDA) and
              applicable provincial privacy legislation.
            </p>
          </Section>

          <Section title="2. Information We Collect">
            <p>We may collect the following categories of personal information:</p>
            <ul>
              <li>
                <strong>Identity & contact data:</strong> name, email address, postal address,
                telephone number.
              </li>
              <li>
                <strong>Financial data:</strong> payment card details processed securely through our
                third-party payment processor; we do not store full card numbers.
              </li>
              <li>
                <strong>Donation history:</strong> amounts, dates, and designations of gifts you
                make to BFFC.
              </li>
              <li>
                <strong>Communications data:</strong> messages you send us via our contact form,
                email, or social media.
              </li>
              <li>
                <strong>Technical data:</strong> IP address, browser type, operating system, pages
                visited, and time on site, collected automatically via cookies and analytics tools.
              </li>
            </ul>
          </Section>

          <Section title="3. How We Use Your Information">
            <p>We use your personal information to:</p>
            <ul>
              <li>Process your donation and issue official tax receipts.</li>
              <li>
                Send program updates, impact reports, and fundraising communications (only with
                your consent or where permitted by law).
              </li>
              <li>Respond to your enquiries and provide donor support.</li>
              <li>
                Comply with legal obligations, including Canada Revenue Agency (CRA) reporting
                requirements.
              </li>
              <li>Improve our website and communications through anonymised analytics.</li>
              <li>Prevent fraud and ensure the security of our systems.</li>
            </ul>
          </Section>

          <Section title="4. Legal Basis for Processing">
            <p>
              We process your personal information on the following grounds: (a) your explicit
              consent where required; (b) performance of a contract (processing your donation);
              (c) compliance with a legal obligation; and (d) our legitimate interests in operating
              an effective charitable organisation, provided those interests are not overridden by
              your rights.
            </p>
          </Section>

          <Section title="5. Sharing Your Information">
            <p>
              We do not sell, rent, or trade your personal information. We may share it with:
            </p>
            <ul>
              <li>
                <strong>Payment processors</strong> (e.g., Stripe) to complete your donation
                securely.
              </li>
              <li>
                <strong>Email platforms</strong> we use to send newsletters and receipts, subject to
                data-processing agreements.
              </li>
              <li>
                <strong>Professional advisors</strong> (auditors, legal counsel) under strict
                confidentiality obligations.
              </li>
              <li>
                <strong>Regulatory authorities</strong> such as the CRA, where required by law.
              </li>
            </ul>
            <p>
              All third-party service providers are required to protect your information and use it
              only for the purposes we specify.
            </p>
          </Section>

          <Section title="6. Cookies & Tracking Technologies">
            <p>
              Our website uses cookies and similar technologies to enhance your experience and
              analyse site traffic. You may control cookies through your browser settings; however,
              disabling certain cookies may affect site functionality.
            </p>
            <p>
              We use Google Analytics (with IP anonymisation enabled) to understand how visitors
              interact with our site. You may opt out via the{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Google Analytics Opt-out Browser Add-on
              </a>
              .
            </p>
          </Section>

          <Section title="7. Data Retention">
            <p>
              We retain your personal information for as long as necessary to fulfil the purposes
              described in this policy, or as required by law. Donation records are kept for a
              minimum of seven (7) years to comply with CRA requirements. When no longer needed,
              data is securely deleted or anonymised.
            </p>
          </Section>

          <Section title="8. Your Rights">
            <p>You have the right to:</p>
            <ul>
              <li>
                <strong>Access</strong> the personal information we hold about you.
              </li>
              <li>
                <strong>Correct</strong> inaccurate or incomplete information.
              </li>
              <li>
                <strong>Withdraw consent</strong> at any time where processing is based on consent
                (e.g., unsubscribe from marketing emails).
              </li>
              <li>
                <strong>Request deletion</strong> of your data, subject to legal retention
                obligations.
              </li>
              <li>
                <strong>Lodge a complaint</strong> with the Office of the Privacy Commissioner of
                Canada (OPC) if you believe we have handled your information inappropriately.
              </li>
            </ul>
            <p>
              To exercise any of these rights, please contact us at{" "}
              <a href={`mailto:${contact.email}`} className="text-accent hover:underline">
                {contact.email}
              </a>
              .
            </p>
          </Section>

          <Section title="9. Security">
            <p>
              We implement appropriate technical and organisational measures to protect your
              personal information against unauthorised access, loss, or destruction. Payment
              transactions are encrypted using industry-standard TLS/SSL technology.
            </p>
          </Section>

          <Section title="10. Third-Party Links">
            <p>
              Our website may contain links to third-party websites. We are not responsible for
              the privacy practices of those sites and encourage you to review their privacy
              policies before submitting any personal information.
            </p>
          </Section>

          <Section title="11. Children's Privacy">
            <p>
              Our website is not directed at children under the age of 16. We do not knowingly
              collect personal information from children without verifiable parental consent. If you
              believe a child has provided us with personal information, please contact us so we can
              delete it.
            </p>
          </Section>

          <Section title="12. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. The revised version will be
              posted on this page with an updated "Last updated" date. Material changes will be
              notified by email to registered donors where we hold your email address.
            </p>
          </Section>

          <Section title="13. Contact Us">
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy or
              our data practices, please contact our Privacy Officer:
            </p>
            <address className="not-italic mt-3 rounded-2xl bg-zinc-50 p-6 text-sm leading-relaxed">
              <strong className="text-zinc-800">Bright Future for Children</strong>
              <br />
              {contact.street}, {contact.city}, {contact.province} {contact.postalCode}
              <br />
              {contact.country}
              <br />
              Email:{" "}
              <a href={`mailto:${contact.email}`} className="text-accent hover:underline">
                {contact.email}
              </a>
              <br />
              Phone:{" "}
              <a href={contact.phoneHref} className="text-accent hover:underline">
                {contact.phone}
              </a>
            </address>
          </Section>

          <div className="border-t border-zinc-100 pt-8 text-sm text-zinc-400">
            <p>
              You may also contact the{" "}
              <a
                href="https://www.priv.gc.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Office of the Privacy Commissioner of Canada
              </a>{" "}
              if you have unresolved privacy concerns.
            </p>
          </div>

          <LegalNav current="privacy-policy" />
        </div>
      </div>
    </div>
  );
}

/* ── Helpers ──────────────────────────────────────────────────────────────── */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h2 className="font-serif text-2xl font-medium tracking-tight text-zinc-900">{title}</h2>
      <div className="space-y-3 text-base leading-relaxed [&_ul]:ml-5 [&_ul]:list-disc [&_ul]:space-y-2">
        {children}
      </div>
    </section>
  );
}

function LegalNav({ current }: { current: "privacy-policy" | "terms-of-use" | "accessibility-statement" }) {
  const links = [
    { href: "/legal/privacy-policy", label: "Privacy Policy" },
    { href: "/legal/terms-of-use", label: "Terms of Use" },
    { href: "/legal/accessibility-statement", label: "Accessibility Statement" },
  ];
  return (
    <nav className="flex flex-wrap gap-4 border-t border-zinc-100 pt-8 text-sm" aria-label="Legal pages">
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className={
            l.href.endsWith(current)
              ? "font-semibold text-accent"
              : "text-zinc-500 hover:text-accent transition-colors"
          }
        >
          {l.label}
        </Link>
      ))}
    </nav>
  );
}
