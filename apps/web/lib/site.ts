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
    street: "303-1835 10 Ave SE",
    city: "Calgary",
    province: "Alberta",
    postalCode: "T2G 5N7",
    country: "Canada",
    charityRegistration: "726794944RR0001",
    email: "Info@brightfuture4children.com",
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
    { path: "/childrens-village", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/donate", changeFrequency: "monthly" as const, priority: 0.95 },
    { path: "/sponsor-a-child", changeFrequency: "monthly" as const, priority: 0.9 },
    { path: "/sponsor-a-child/browse", changeFrequency: "weekly" as const, priority: 0.85 },
    { path: "/gift-catalogue", changeFrequency: "weekly" as const, priority: 0.85 },
    { path: "/gift-catalogue/school-kit", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/ways-to-give", changeFrequency: "monthly" as const, priority: 0.85 },
    { path: "/impact", changeFrequency: "weekly" as const, priority: 0.85 },
    { path: "/stories", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/stories/from-empty-plates-to-bright-futures-afar", changeFrequency: "monthly" as const, priority: 0.75 },
    { path: "/learn-more", changeFrequency: "monthly" as const, priority: 0.8 },
    {
      path: "/how-we-use-donations",
      changeFrequency: "monthly" as const,
      priority: 0.75,
    },
  ],
} as const;
