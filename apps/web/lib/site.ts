/**
 * Central site config — used for SEO metadata, sitemap, and structured data.
 * Set NEXT_PUBLIC_SITE_URL in production (e.g. https://www.yourdomain.org).
 */
export const siteConfig = {
  name: "Bright Future For Children Ethiopia",
  legalName: "Bright Future For Children Ethiopia",
  title: "Bright Future For Children Ethiopia",
  description:
    "Providing life-saving, nutritious meals to children aged 2–8 in war-affected regions of Ethiopia — Amhara, Afar, and Tigray. Donate, sponsor a child, or get involved to help build brighter futures.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "http://localhost:3000",
  locale: "en_US",
  language: "en",
  contact: {
    address: "",
    charityRegistration: "726794944RR0001",
    email: "Info@brightfuture4children.com",
    phone: "+1 (867) 678-5383",
    phoneHref: "+18676785383",
  },
  social: {
    twitter: "",
    facebook: "",
    linkedin: "",
  },
  routes: [
    { path: "/", changeFrequency: "weekly" as const, priority: 1 },
    { path: "/donate", changeFrequency: "monthly" as const, priority: 0.95 },
    { path: "/sponsor-a-child", changeFrequency: "monthly" as const, priority: 0.9 },
    { path: "/sponsor-a-child/browse", changeFrequency: "weekly" as const, priority: 0.85 },
    { path: "/gift-catalogue", changeFrequency: "weekly" as const, priority: 0.85 },
    { path: "/gift-catalogue/school-kit", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/ways-to-give", changeFrequency: "monthly" as const, priority: 0.85 },
    { path: "/impact", changeFrequency: "weekly" as const, priority: 0.85 },
    { path: "/stories", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/learn-more", changeFrequency: "monthly" as const, priority: 0.8 },
    {
      path: "/how-we-use-donations",
      changeFrequency: "monthly" as const,
      priority: 0.75,
    },
  ],
} as const;
