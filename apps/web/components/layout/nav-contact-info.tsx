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
      className={`text-xs leading-relaxed text-muted ${compact ? "space-y-2" : "space-y-1"} ${className}`}
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
        <span className="inline-flex items-start gap-1.5">
          <HiMapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
          <span>{contact.address}</span>
        </span>
        <a
          href={`tel:${contact.phoneHref}`}
          className="inline-flex items-center gap-1.5 transition-colors hover:text-primary"
          aria-label={`Call us at ${contact.phone}`}
        >
          <HiPhone className="h-3.5 w-3.5 shrink-0" aria-hidden />
          <span>{contact.phone}</span>
        </a>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
        <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
          <HiIdentification className="h-3.5 w-3.5 shrink-0" aria-hidden />
          <span>
            CHARITY REGISTRATION:{" "}
            <span className="font-normal text-muted">{contact.charityRegistration}</span>
          </span>
        </span>

        <a
          href={`mailto:${contact.email}`}
          className="inline-flex items-center gap-1.5 transition-colors hover:text-primary"
          aria-label={`Email us at ${contact.email}`}
        >
          <HiEnvelope className="h-3.5 w-3.5 shrink-0" aria-hidden />
          <span>{contact.email}</span>
        </a>
      </div>
    </div>
  );
}
