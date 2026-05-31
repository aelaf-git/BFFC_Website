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
    label: "Charity registration",
    lines: [contact.charityRegistration],
    href: undefined,
  },
];

export function ContactSection() {
  return (
    <section className="w-full bg-zinc-50" aria-label="Contact us" id="contact">
      {/* ── Heading ── */}
      <div className="container mx-auto px-6 sm:px-10 lg:px-20 pt-24 pb-16 text-center">
        <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-zinc-900">
          Get in Touch
        </h2>
        <p className="mt-5 mx-auto max-w-xl text-base sm:text-lg leading-relaxed text-zinc-400 font-light">
          Have a question, want to volunteer, or just want to say hello?
          We&apos;d love to hear from you.
        </p>
      </div>

      {/* ── Body ── */}
      <div className="container mx-auto px-6 sm:px-10 lg:px-20 pb-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">

          {/* Left — Map + contact details */}
          <div className="flex flex-col gap-8">
            {/* Google Map */}
            <div className="relative overflow-hidden rounded-3xl bg-zinc-200 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
              <iframe
                title="Bright Future For Children Ethiopia office location"
                src={contact.mapEmbedUrl}
                width="100%"
                height="320"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block w-full"
              />
            </div>

            {/* Contact detail cards */}
            <ul className="grid gap-4 sm:grid-cols-2" role="list">
              {contactDetails.map(({ icon: Icon, label, lines, href }) => (
                <li key={label}>
                  <div className="flex gap-4 rounded-2xl border border-zinc-200 bg-white p-4 transition-shadow hover:shadow-sm">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                        {label}
                      </p>
                      {lines.map((line) =>
                        href ? (
                          <a
                            key={line}
                            href={href}
                            target={href.startsWith("http") ? "_blank" : undefined}
                            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="mt-0.5 block text-sm font-medium text-zinc-700 transition-colors hover:text-primary"
                          >
                            {line}
                          </a>
                        ) : (
                          <p key={line} className="mt-0.5 text-sm font-medium text-zinc-700">
                            {line}
                          </p>
                        ),
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — Contact form */}
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-8 lg:self-start">
            <h3 className="font-serif text-2xl font-medium text-zinc-900 sm:text-3xl">
              Send us a message
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              We typically respond within 1–2 business days.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
