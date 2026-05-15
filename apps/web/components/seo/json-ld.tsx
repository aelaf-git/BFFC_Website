import { siteConfig } from "@/lib/site";

export function OrganizationJsonLd() {
  const sameAs = [
    siteConfig.social.twitter,
    siteConfig.social.facebook,
    siteConfig.social.linkedin,
  ].filter(Boolean);

  const organization: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: siteConfig.legalName,
    url: siteConfig.url,
    description: siteConfig.description,
    email: siteConfig.contact.email,
    taxID: siteConfig.contact.charityRegistration,
    address: {
      "@type": "PostalAddress",
      streetAddress: "303-1835 10Ave SE",
      addressLocality: "Calgary",
      addressRegion: "Alberta",
      postalCode: "T2G 5N7",
      addressCountry: "CA",
    },
    telephone: siteConfig.contact.phone,
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: siteConfig.language,
    publisher: {
      "@type": "NGO",
      name: siteConfig.legalName,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
