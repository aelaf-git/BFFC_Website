import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/page-hero";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `Accessibility Statement | ${siteConfig.name}`,
  description:
    `Our commitment to making ${new URL(siteConfig.url).hostname} accessible to everyone, including people with disabilities, in line with WCAG 2.1 AA guidelines.`,
  alternates: { canonical: `${siteConfig.url}/legal/accessibility-statement` },
  openGraph: {
    title: "Accessibility Statement",
    description: "Our commitment to web accessibility and how to report barriers.",
    url: `${siteConfig.url}/legal/accessibility-statement`,
    siteName: siteConfig.name,
    type: "website",
  },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "June 1, 2025";

export default function AccessibilityStatementPage() {
  const { contact } = siteConfig;

  return (
    <div className="flex-1 bg-white">
      <PageHero
        imageSrc="/about-four.jpeg"
        imageAlt=""
        decorativeImage
        size="compact"
        kicker="Legal"
        title="Accessibility Statement"
        subtitle={`Last updated: ${LAST_UPDATED}`}
        titleClassName="font-serif text-4xl font-medium tracking-tight text-white sm:text-5xl"
      />

      {/* ── Content ── */}
      <div className="container mx-auto px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-3xl space-y-10 text-zinc-600">

          <Section title="Our Commitment">
            <p>
              Bright Future for Children (<strong>"BFFC"</strong>) is committed to
              ensuring that our website is accessible to the widest possible audience, including
              people with disabilities. We believe that everyone deserves equal access to
              information about our mission, programs, and ways to get involved.
            </p>
            <p>
              We are continuously working to improve the accessibility of our site and to ensure it
              conforms to the{" "}
              <a
                href="https://www.w3.org/WAI/standards-guidelines/wcag/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Web Content Accessibility Guidelines (WCAG) 2.1, Level AA
              </a>
              , published by the World Wide Web Consortium (W3C).
            </p>
          </Section>

          <Section title="Conformance Status">
            <p>
              We aim to meet WCAG 2.1 Level AA conformance. Our current status is{" "}
              <strong>partially conformant</strong>: some content may not yet fully meet all
              requirements. We are actively working to address known gaps and welcome feedback from
              users who encounter barriers.
            </p>
          </Section>

          <Section title="Measures Taken">
            <p>
              To support accessibility, we have taken the following measures:
            </p>
            <ul>
              <li>
                All meaningful images include descriptive <code>alt</code> text; decorative images
                have empty alt attributes.
              </li>
              <li>
                Page headings are structured hierarchically (H1 → H2 → H3) to support screen
                reader navigation.
              </li>
              <li>
                Interactive elements (buttons, links, form controls) have visible focus indicators
                and descriptive labels.
              </li>
              <li>
                Colour contrast ratios for body text and interactive elements meet or exceed the
                WCAG 2.1 AA minimum of 4.5:1.
              </li>
              <li>
                The website is navigable using a keyboard alone; a skip-to-content link is
                available at the top of every page.
              </li>
              <li>
                Forms include programmatically associated labels and descriptive error messages.
              </li>
              <li>
                Videos and multimedia content will include captions and/or transcripts where
                applicable.
              </li>
              <li>
                The site uses responsive design to support users on mobile devices and with
                enlarged text settings.
              </li>
            </ul>
          </Section>

          <Section title="Known Limitations">
            <p>
              Despite our efforts, some areas of the site may not yet be fully accessible:
            </p>
            <ul>
              <li>
                Older embedded PDFs and documents may not be fully screen-reader compatible. We are
                working to provide accessible alternatives.
              </li>
              <li>
                Some third-party content (such as embedded maps) may not meet full WCAG 2.1 AA
                standards. We have no control over these third-party elements.
              </li>
              <li>
                Live video streams or embedded social media posts may not include real-time
                captions.
              </li>
            </ul>
          </Section>

          <Section title="Technical Specifications">
            <p>
              Accessibility of this website relies on the following technologies:
            </p>
            <ul>
              <li>HTML5</li>
              <li>CSS3</li>
              <li>JavaScript (React / Next.js)</li>
              <li>WAI-ARIA (Accessible Rich Internet Applications)</li>
            </ul>
            <p>
              The site has been tested with the following assistive technologies and browsers:
            </p>
            <ul>
              <li>NVDA (Windows) with Google Chrome</li>
              <li>VoiceOver (macOS / iOS) with Safari</li>
              <li>TalkBack (Android) with Google Chrome</li>
              <li>Keyboard-only navigation on Windows and macOS</li>
            </ul>
          </Section>

          <Section title="Feedback & Contact">
            <p>
              We welcome your feedback on the accessibility of our website. If you experience any
              barriers, or would like to request content in an alternative format, please contact
              us:
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
            <p>
              We aim to respond to accessibility feedback within{" "}
              <strong>5 business days</strong>.
            </p>
          </Section>

          <Section title="Formal Complaints">
            <p>
              If you are not satisfied with our response, you may contact the{" "}
              <a
                href="https://www.canada.ca/en/canadian-heritage/services/cultural-spaces-celebrations/accessibility-canada.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Accessibility Standards Canada
              </a>{" "}
              or file a complaint with the{" "}
              <a
                href="https://www.chrc-ccdp.gc.ca/en"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Canadian Human Rights Commission
              </a>{" "}
              if you believe your accessibility rights have not been respected.
            </p>
          </Section>

          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 text-sm leading-relaxed text-zinc-700">
            <p>
              <strong className="text-zinc-900">Need content in another format?</strong>
              <br />
              If you need any information from this site in a different format — such as large
              print, audio, or plain text — please email us at{" "}
              <a href={`mailto:${contact.email}`} className="text-accent hover:underline">
                {contact.email}
              </a>{" "}
              and we will do our best to accommodate your request.
            </p>
          </div>

          <LegalNav current="accessibility-statement" />
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
      <div className="space-y-3 text-base leading-relaxed [&_ul]:ml-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_code]:rounded [&_code]:bg-zinc-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_code]:text-zinc-700">
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
