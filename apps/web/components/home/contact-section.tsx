import { Mail, MapPin, Building2 } from "lucide-react";
import { ContactForm } from "./contact-form";
import { siteConfig } from "@/lib/site";

const { contact } = siteConfig;

type ContactLine = { text: string; href?: string };

type OfficeCard = {
  icon: typeof MapPin;
  label: string;
  lines: ContactLine[];
  href?: string;
};

const officeCards: OfficeCard[] = [
  {
    icon: MapPin,
    label: contact.offices.canada.label,
    lines: [
      ...contact.offices.canada.addressLines.map((line) => ({ text: line })),
      ...contact.offices.canada.phones,
    ],
    href: contact.offices.canada.mapHref,
  },
  {
    icon: MapPin,
    label: contact.offices.ethiopia.label,
    lines: [
      ...contact.offices.ethiopia.addressLines.map((line) => ({ text: line })),
      ...contact.offices.ethiopia.phones,
    ],
  },
];

const sharedCards: OfficeCard[] = [
  {
    icon: Mail,
    label: "Email us",
    lines: [{ text: contact.email, href: `mailto:${contact.email}` }],
    href: `mailto:${contact.email}`,
  },
  {
    icon: Building2,
    label: "Charity no.",
    lines: [{ text: contact.charityRegistration }],
  },
];

const contactCards = [...officeCards, ...sharedCards];

export function ContactSection() {
  return (
    <section className="w-full bg-white" aria-label="Contact us" id="contact">

      {/* ── Heading ── */}
      <div className="container mx-auto px-6 sm:px-10 lg:px-20 pt-14 pb-8 text-center sm:pt-20 sm:pb-12 lg:pt-24 lg:pb-16">
        <span id="get-in-touch" aria-hidden="true" className="scroll-anchor-offset block" />
        <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-zinc-900">
          Get in Touch
        </h2>
        <p className="mt-5 mx-auto max-w-xl text-base sm:text-lg leading-relaxed text-zinc-400 font-light">
          Have a question, want to volunteer, or just want to say hello?
          We&apos;d love to hear from you.
        </p>
      </div>

      {/* ── Two-column body ── */}
      <div className="container mx-auto px-6 sm:px-10 lg:px-20 pb-16 sm:pb-20 lg:pb-28">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-16 xl:gap-24">

          {/* ── Left column: contact cards → map ── */}
          <div className="flex w-full shrink-0 flex-col gap-6 lg:w-[50%]">

            <ul className="grid gap-4 sm:grid-cols-2" role="list">
              {contactCards.map(({ icon: Icon, label, lines, href }) => (
                <li key={label} className="flex">
                  <div className="flex min-h-[9.5rem] flex-1 gap-3 rounded-2xl border border-zinc-100 bg-zinc-50/60 px-4 py-4 transition-shadow hover:shadow-sm">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10">
                      <Icon className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-accent">
                        {label}
                      </p>
                      {lines.map((line) => {
                        const isPhone = line.href?.startsWith("tel:");
                        const lineHref = line.href ?? (isPhone ? undefined : href);
                        const content = (
                          <span className="mt-0.5 block text-sm font-medium leading-snug text-zinc-700">
                            {line.text}
                          </span>
                        );

                        if (lineHref) {
                          return (
                            <a
                              key={`${label}-${line.text}`}
                              href={lineHref}
                              target={lineHref.startsWith("http") ? "_blank" : undefined}
                              rel={lineHref.startsWith("http") ? "noopener noreferrer" : undefined}
                              className="mt-0.5 block transition-colors hover:text-accent [&>span]:hover:text-accent"
                            >
                              {content}
                            </a>
                          );
                        }

                        return (
                          <div key={`${label}-${line.text}`} className="mt-0.5">
                            {content}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Map — square: height = column width */}
            <div className="relative aspect-[4/3] lg:aspect-square rounded-3xl bg-zinc-50/50 p-3 shadow-[0_8px_30px_rgb(0,0,0,0.015)] transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.03)] sm:p-4">
              <div className="absolute inset-3 overflow-hidden rounded-2xl bg-zinc-100 sm:inset-4">
                <iframe
                  title="Bright Future for Children office location"
                  src={contact.mapEmbedUrl}
                  style={{ border: 0, position: "absolute", inset: 0, width: "100%", height: "100%" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          {/* ── Right column: heading + form (textarea stretches) ── */}
          <div className="flex w-full flex-col lg:w-[50%]">
            <h3 className="font-serif text-[2rem] font-medium leading-[1.1] tracking-tight text-zinc-900 sm:text-[2.6rem] lg:text-[3rem]">
              Send us a <span className="text-primary">message</span>
            </h3>
            <p className="mt-5 text-base leading-[1.9] text-zinc-500 font-light sm:text-[1.05rem]">
              We typically respond within 1–2 business days. For urgent matters,
              please call or email us directly.
            </p>

            <div className="mt-8 flex flex-1 flex-col">
              <ContactForm />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
