import { Mail, Phone, MapPin, Building2 } from "lucide-react";
import { ContactForm } from "./contact-form";
import { siteConfig } from "@/lib/site";

const { contact } = siteConfig;

const contactDetails = [
  {
    icon: MapPin,
    label: "Office address",
    lines: [
      contact.street,
      `${contact.city}, ${contact.province} ${contact.postalCode}`,
      contact.country,
    ],
    href: `https://maps.google.com/?q=${encodeURIComponent(
      `${contact.street}, ${contact.city}, ${contact.province} ${contact.postalCode}`,
    )}`,
  },
  {
    icon: Mail,
    label: "Email us",
    lines: [contact.email],
    href: `mailto:${contact.email}`,
  },
  {
    icon: Phone,
    label: "Call us",
    lines: [contact.phone],
    href: contact.phoneHref,
  },
  {
    icon: Building2,
    label: "Charity no.",
    lines: [contact.charityRegistration],
    href: undefined,
  },
];

export function ContactSection() {
  return (
    <section className="w-full bg-white" aria-label="Contact us" id="contact">

      {/* ── Heading ── */}
      <div className="container mx-auto px-6 sm:px-10 lg:px-20 pt-24 pb-16 text-center">
        <span id="get-in-touch" aria-hidden="true" className="block scroll-mt-20" />
        <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-zinc-900">
          Get in Touch
        </h2>
        <p className="mt-5 mx-auto max-w-xl text-base sm:text-lg leading-relaxed text-zinc-400 font-light">
          Have a question, want to volunteer, or just want to say hello?
          We&apos;d love to hear from you.
        </p>
      </div>

      {/* ── Two-column body ── */}
      <div className="container mx-auto px-6 sm:px-10 lg:px-20 pb-28">
        {/*
          items-stretch makes both columns the same height on desktop.
          Left: cards on top, map fills remaining height (flex-1).
          Right: heading + form, textarea fills remaining height (flex-1).
        */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-stretch lg:gap-16 xl:gap-24">

          {/* ── Left column: contact cards → map ── */}
          <div className="flex w-full shrink-0 flex-col gap-6 lg:w-[50%]">

            {/* Contact detail cards — above the map, all equal size */}
            <ul className="grid gap-4 sm:grid-cols-2" role="list">
              {contactDetails.map(({ icon: Icon, label, lines, href }) => (
                <li key={label} className="flex">
                  <div className="flex min-h-[8rem] flex-1 gap-3 rounded-2xl border border-zinc-100 bg-zinc-50/60 px-4 py-4 transition-shadow hover:shadow-sm">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Icon className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
                        {label}
                      </p>
                      {lines.map((line) =>
                        href ? (
                          <a
                            key={line}
                            href={href}
                            target={href.startsWith("http") ? "_blank" : undefined}
                            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="mt-0.5 block truncate text-sm font-medium text-zinc-700 transition-colors hover:text-primary"
                          >
                            {line}
                          </a>
                        ) : (
                          <p key={line} className="mt-0.5 truncate text-sm font-medium text-zinc-700">
                            {line}
                          </p>
                        ),
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Map — square: height = column width */}
            <div className="relative aspect-[4/3] lg:aspect-square rounded-3xl bg-zinc-50/50 p-3 shadow-[0_8px_30px_rgb(0,0,0,0.015)] transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.03)] sm:p-4">
              <div className="absolute inset-3 overflow-hidden rounded-2xl bg-zinc-100 sm:inset-4">
                <iframe
                  title="Bright Future For Children Ethiopia office location"
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

            {/* flex-1 so the form fills the remaining column height */}
            <div className="mt-8 flex flex-1 flex-col">
              <ContactForm />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
