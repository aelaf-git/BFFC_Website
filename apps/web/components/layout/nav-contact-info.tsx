import { HiEnvelope, HiIdentification, HiMapPin, HiPhone } from "react-icons/hi2";

export type SiteContact = {
  address: string;
  charityRegistration: string;
  email: string;
  phone: string;
  phoneHref: string;
};

type NavContactInfoProps = {
  contact: SiteContact;
  className?: string;
  compact?: boolean;
};

export function NavContactInfo({
  contact,
  className = "",
  compact = false,
}: NavContactInfoProps) {
  return (
    <div
      className={`text-xs leading-relaxed text-muted ${className}`}
    >
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
        <a
          href="#"
          className="inline-flex items-center gap-1.5 font-medium text-foreground hover:text-primary transition-colors"
          aria-label={`Charity Registration Number ${contact.charityRegistration}`}
        >
          <HiIdentification className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
          <span className="whitespace-nowrap">
            CHARITY REGISTRATION:{" "}
            <span className="font-normal text-muted group-hover:text-primary-hover">{contact.charityRegistration}</span>
          </span>
        </a>

        {contact.address && (
          <span className="inline-flex items-center gap-1.5">
            <HiMapPin className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
            <span>{contact.address}</span>
          </span>
        )}

        <a
          href={`tel:${contact.phoneHref}`}
          className="inline-flex items-center gap-1.5 transition-colors hover:text-primary"
          aria-label={`Call us at ${contact.phone}`}
        >
          <HiPhone className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
          <span className="whitespace-nowrap">{contact.phone}</span>
        </a>

        <a
          href={`mailto:${contact.email}`}
          className="inline-flex items-center gap-1.5 transition-colors hover:text-primary"
          aria-label={`Email us at ${contact.email}`}
        >
          <HiEnvelope className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
          <span className="whitespace-nowrap">{contact.email}</span>
        </a>
      </div>
    </div>
  );
}
