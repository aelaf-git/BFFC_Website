/** Canonical public site URL — used for sitemap, canonical links, and structured data. */
export const productionSiteUrl = "https://bffcglobal.org";

function resolveSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");

  if (
    fromEnv &&
    fromEnv !== "http://localhost:3000" &&
    !fromEnv.includes("azurestaticapps.net")
  ) {
    return fromEnv;
  }

  return process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : productionSiteUrl;
}

export const siteConfig = {
  name: "Bright Future for Children",
  legalName: "Bright Future for Children",
  title: "Bright Future for Children",
  description:
    "Providing life-saving, nutritious meals to children aged 2–8 in war-affected regions of Ethiopia, including Amhara, Afar, and Tigray. Donate, sponsor a child, or get involved to help build brighter futures.",
  url: resolveSiteUrl(),
  locale: "en_US",
  language: "en",
  contact: {
    street: "303-1835 10 Ave SE",
    city: "Calgary",
    province: "Alberta",
    postalCode: "T2G 5N7",
    country: "Canada",
    charityRegistration: "726794944RR0001",
    email: "info@bffcglobal.org",
    phone: "+1 825 454 5383",
    phoneHref: "tel:+18254545383",
    phoneAlt: "+251 952 333 366",
    phoneAltHref: "tel:+251952333366",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=1835+10+Ave+SE+Calgary+AB+T2G+5N7+Canada&output=embed&z=15",
  },
  social: {
    twitter: "",
    facebook: "",
    linkedin: "",
  },
  routes: [
    { path: "/", changeFrequency: "weekly" as const, priority: 1 },
    { path: "/projects", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/childrens-village", changeFrequency: "weekly" as const, priority: 0.85 },
    { path: "/donate", changeFrequency: "monthly" as const, priority: 0.95 },
    { path: "/ways-to-give", changeFrequency: "monthly" as const, priority: 0.85 },
    { path: "/ways-to-give/in-kind", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/stories", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/faqs", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/resources", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/search", changeFrequency: "monthly" as const, priority: 0.5 },
    { path: "/legal/privacy-policy", changeFrequency: "yearly" as const, priority: 0.3 },
    { path: "/legal/terms-of-use", changeFrequency: "yearly" as const, priority: 0.3 },
    {
      path: "/legal/accessibility-statement",
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ],
} as const;
