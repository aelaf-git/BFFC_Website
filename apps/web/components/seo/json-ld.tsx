import { brand } from "@/lib/brand";
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
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}${brand.logo.src}`,
    description: siteConfig.description,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    taxID: siteConfig.contact.charityRegistration,
    foundingDate: "2020",
    areaServed: [
      { "@type": "AdministrativeArea", name: "Amhara, Ethiopia" },
      { "@type": "AdministrativeArea", name: "Afar, Ethiopia" },
      { "@type": "AdministrativeArea", name: "Tigray, Ethiopia" },
    ],
    knowsAbout: [
      "Child nutrition",
      "School feeding programs",
      "Humanitarian aid",
      "Community development",
      "Education support",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "303-1835 10Ave SE",
      addressLocality: "Calgary",
      addressRegion: "Alberta",
      postalCode: "T2G 5N7",
      addressCountry: "CA",
    },
    potentialAction: {
      "@type": "DonateAction",
      target: `${siteConfig.url}/donate`,
      name: "Donate to Bright Future For Children Ethiopia",
    },
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
      name: siteConfig.name,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/stories?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
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

type HomePageJsonLdProps = {
  url: string;
};

export function HomePageJsonLd({ url }: HomePageJsonLdProps) {
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: siteConfig.title,
    url,
    description:
      "Providing life-saving meals to children in Amhara, Afar, and Tigray — Ethiopia's most war-affected regions. Donate, sponsor a child, or get involved.",
    inLanguage: siteConfig.language,
    isPartOf: { "@type": "WebSite", url: siteConfig.url },
    publisher: { "@type": "NGO", name: siteConfig.name },
    about: {
      "@type": "Thing",
      name: "Child nutrition and school feeding programs in Ethiopia",
    },
    significantLink: [
      `${siteConfig.url}/donate`,
      `${siteConfig.url}/sponsor-a-child`,
      `${siteConfig.url}/impact`,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }}
    />
  );
}
