/**
 * Central site config — used for SEO metadata, sitemap, and structured data.
 * Set NEXT_PUBLIC_SITE_URL in production (e.g. https://www.yourdomain.org).
 */
export const siteConfig = {
  name: "Bright Future For Children Organization",
  legalName: "BFFC",
  title: "Bright Future For Children Organization",
  description:
    "BFFC brings communities together through programs, sport, and opportunity. Donate, get involved, and see the impact of your support.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "http://localhost:3000",
  locale: "en_US",
  language: "en",
  contact: {
    address: "303-1835 10Ave SE, Calgary Alberta, T2G 5N7",
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
    { path: "/about", changeFrequency: "monthly" as const, priority: 0.9 },
    { path: "/what-we-do", changeFrequency: "monthly" as const, priority: 0.9 },
    { path: "/get-involved", changeFrequency: "monthly" as const, priority: 0.9 },
    { path: "/donate", changeFrequency: "monthly" as const, priority: 0.95 },
    { path: "/sponsor-a-child", changeFrequency: "monthly" as const, priority: 0.85 },
    { path: "/gift-catalogue", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/impact", changeFrequency: "weekly" as const, priority: 0.85 },
    { path: "/ways-to-give", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/stories", changeFrequency: "weekly" as const, priority: 0.75 },
    { path: "/learn-more", changeFrequency: "monthly" as const, priority: 0.7 },
    {
      path: "/how-we-use-donations",
      changeFrequency: "monthly" as const,
      priority: 0.75,
    },
  ],
} as const;
