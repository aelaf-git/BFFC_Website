import { HiEnvelope, HiMapPin, HiPhone } from "react-icons/hi2";

export type SiteContact = {
  phone: string;
  phoneHref: string;
  email: string;
  address: string;
};

type NavContactInfoProps = {
  contact: SiteContact;
  className?: string;
};

export function NavContactInfo({ contact, className = "" }: NavContactInfoProps) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted ${className}`}
    >
      <a
        href={contact.phoneHref}
        className="inline-flex items-center gap-1.5 transition-colors hover:text-primary"
        aria-label={`Call us at ${contact.phone}`}
      >
        <HiPhone className="h-3.5 w-3.5 shrink-0" aria-hidden />
        <span>{contact.phone}</span>
      </a>
      <a
        href={`mailto:${contact.email}`}
        className="inline-flex items-center gap-1.5 transition-colors hover:text-primary"
        aria-label={`Email us at ${contact.email}`}
      >
        <HiEnvelope className="h-3.5 w-3.5 shrink-0" aria-hidden />
        <span>{contact.email}</span>
      </a>
      <span className="inline-flex items-center gap-1.5">
        <HiMapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
        <span>{contact.address}</span>
      </span>
    </div>
  );
}
