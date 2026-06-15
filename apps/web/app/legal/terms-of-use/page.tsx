import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `Terms of Use | ${siteConfig.name}`,
  description:
    "Read the Terms of Use governing your access to and use of the Bright Future For Children Ethiopia website and services.",
  alternates: { canonical: `${siteConfig.url}/legal/terms-of-use` },
  openGraph: {
    title: "Terms of Use",
    description: "The terms and conditions governing your use of our website and services.",
    url: `${siteConfig.url}/legal/terms-of-use`,
    siteName: siteConfig.name,
    type: "website",
  },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "June 1, 2025";

export default function TermsOfUsePage() {
  const { contact } = siteConfig;

  return (
    <div className="flex-1 bg-white">
      {/* ── Hero ── */}
      <div className="relative h-56 w-full overflow-hidden bg-zinc-900 sm:h-64">
        <Image
          src="/whatwedo.jpeg"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">
            Legal
          </p>
          <h1 className="font-serif text-4xl font-medium tracking-tight text-white sm:text-5xl">
            Terms of Use
          </h1>
          <p className="mt-3 text-sm font-light text-white/60">
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="container mx-auto px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-3xl space-y-10 text-zinc-600">

          <Section title="1. Acceptance of Terms">
            <p>
              By accessing or using the website located at{" "}
              <a href={siteConfig.url} className="text-primary hover:underline">
                {siteConfig.url}
              </a>{" "}
              (the <strong>"Site"</strong>), you agree to be bound by these Terms of Use (
              <strong>"Terms"</strong>). If you do not agree to these Terms, please do not use the
              Site.
            </p>
            <p>
              These Terms apply to all visitors, donors, volunteers, and any other users who access
              or use the Site. We reserve the right to update these Terms at any time. Continued
              use of the Site after changes are posted constitutes your acceptance of the revised
              Terms.
            </p>
          </Section>

          <Section title="2. About Bright Future For Children Ethiopia">
            <p>
              Bright Future For Children Ethiopia (<strong>"BFFC"</strong>,{" "}
              <strong>"we"</strong>, <strong>"our"</strong>, or <strong>"us"</strong>) is a
              registered Canadian charity (Charity Registration No.{" "}
              <span className="font-medium text-zinc-800">{contact.charityRegistration}</span>),
              incorporated under the laws of Canada. Our mission is to provide nutritious meals and
              educational support to children in war-affected regions of Ethiopia.
            </p>
          </Section>

          <Section title="3. Use of the Site">
            <p>
              You may use the Site for lawful, personal, and non-commercial purposes only. You agree
              not to:
            </p>
            <ul>
              <li>
                Use the Site in any way that violates applicable Canadian, provincial, or
                international laws or regulations.
              </li>
              <li>
                Reproduce, duplicate, copy, sell, or exploit any portion of the Site without our
                express written permission.
              </li>
              <li>
                Transmit unsolicited or unauthorised advertising or promotional material (spam).
              </li>
              <li>
                Attempt to gain unauthorised access to any portion of the Site, its servers, or
                any systems connected to the Site.
              </li>
              <li>
                Upload or transmit viruses, malware, or any other harmful code.
              </li>
              <li>
                Engage in any conduct that could damage, disable, overburden, or impair the Site.
              </li>
            </ul>
          </Section>

          <Section title="4. Donations">
            <p>
              Donations made through the Site are processed by our third-party payment service
              providers. By making a donation, you represent that:
            </p>
            <ul>
              <li>You are at least 18 years of age or have parental/guardian consent.</li>
              <li>
                You are authorised to use the payment method provided and that the information
                submitted is accurate.
              </li>
              <li>
                Your donation is a voluntary gift and you do not expect anything of material value
                in return (except an official tax receipt where applicable under Canadian law).
              </li>
            </ul>
            <p>
              BFFC will issue official donation receipts for eligible gifts in accordance with
              Canada Revenue Agency (CRA) guidelines. Receipts are issued at BFFC's sole
              discretion where all CRA requirements are met.
            </p>
            <p>
              All donations are <strong>non-refundable</strong> except in cases of processing
              errors. If you believe an error has occurred, please contact us within 30 days at{" "}
              <a href={`mailto:${contact.email}`} className="text-primary hover:underline">
                {contact.email}
              </a>
              .
            </p>
          </Section>

          <Section title="5. Intellectual Property">
            <p>
              All content on the Site — including text, photographs, graphics, logos, video, and
              audio — is the property of BFFC or its licensors and is protected by Canadian and
              international copyright and trademark laws.
            </p>
            <p>
              You may view, download, and print content from the Site for your own personal,
              non-commercial use, provided you do not remove any copyright or proprietary notices.
              Any other use, reproduction, or distribution requires our prior written consent.
            </p>
          </Section>

          <Section title="6. Third-Party Links">
            <p>
              The Site may contain links to third-party websites for your convenience. These links
              do not constitute an endorsement of those sites. We have no control over the content
              or availability of third-party sites and accept no responsibility or liability for
              them or for any loss or damage arising from your use of them.
            </p>
          </Section>

          <Section title="7. Disclaimers">
            <p>
              The Site and its content are provided on an <strong>"as is"</strong> and{" "}
              <strong>"as available"</strong> basis without warranty of any kind, either express or
              implied, including but not limited to warranties of merchantability, fitness for a
              particular purpose, or non-infringement.
            </p>
            <p>
              BFFC does not warrant that the Site will be uninterrupted, error-free, or free of
              viruses or other harmful components.
            </p>
          </Section>

          <Section title="8. Limitation of Liability">
            <p>
              To the maximum extent permitted by applicable law, BFFC, its directors, officers,
              employees, and volunteers shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages arising out of or related to your use of, or
              inability to use, the Site or its content, even if BFFC has been advised of the
              possibility of such damages.
            </p>
          </Section>

          <Section title="9. Governing Law">
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the
              Province of Alberta and the federal laws of Canada applicable therein, without regard
              to conflict of law principles. Any disputes arising under these Terms shall be subject
              to the exclusive jurisdiction of the courts of Calgary, Alberta.
            </p>
          </Section>

          <Section title="10. Charitable Registration & Tax Receipts">
            <p>
              BFFC is a registered charity under the{" "}
              <em>Income Tax Act</em> (Canada), Registration No.{" "}
              <span className="font-medium text-zinc-800">{contact.charityRegistration}</span>.
              Eligible donors resident in Canada may receive an official tax receipt for qualifying
              gifts. Tax receipt eligibility is determined in accordance with CRA guidelines and
              BFFC's policies. BFFC is not responsible for individual tax outcomes; please consult
              a qualified tax adviser regarding your specific situation.
            </p>
          </Section>

          <Section title="11. Contact">
            <p>
              Questions about these Terms should be directed to:
            </p>
            <address className="not-italic mt-3 rounded-2xl bg-zinc-50 p-6 text-sm leading-relaxed">
              <strong className="text-zinc-800">Bright Future For Children Ethiopia</strong>
              <br />
              {contact.street}, {contact.city}, {contact.province} {contact.postalCode}
              <br />
              {contact.country}
              <br />
              Email:{" "}
              <a href={`mailto:${contact.email}`} className="text-primary hover:underline">
                {contact.email}
              </a>
              <br />
              Phone:{" "}
              <a href={contact.phoneHref} className="text-primary hover:underline">
                {contact.phone}
              </a>
            </address>
          </Section>

          <LegalNav current="terms-of-use" />
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
              ? "font-semibold text-primary"
              : "text-zinc-500 hover:text-primary transition-colors"
          }
        >
          {l.label}
        </Link>
      ))}
    </nav>
  );
}
