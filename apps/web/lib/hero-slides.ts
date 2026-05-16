export type HeroSlide = {
  image: string;
  title: string;
  subtitle: string;
  cta: { label: string; href: string; ariaLabel: string };
  quote?: string;
  quoteAttribution?: string;
};

export const heroSlides: HeroSlide[] = [
  {
    image: "/hero/hero1.jpg",
    title: "Together, we can build brighter futures",
    subtitle:
      "Your donation helps children and families access education, nutrition, and lasting opportunity.",
    cta: {
      label: "Donate today",
      href: "/donate",
      ariaLabel: "Make a donation today",
    },
    quote: "“It is more blessed to give than to receive.”",
    quoteAttribution: "Acts 20:35",
  },
  {
    image: "/hero/hero2.jpg",
    title: "Every gift transforms a community",
    subtitle:
      "Support school feeding, clean water, and health programs that help children thrive for years to come.",
    cta: {
      label: "Sponsor a child",
      href: "/sponsor-a-child",
      ariaLabel: "Sponsor a child",
    },
  },
  {
    image: "/hero/hero3.jpg",
    title: "Give hope that lasts",
    subtitle:
      "From emergency relief to long-term development — your generosity fuels real change where it is needed most.",
    cta: {
      label: "Ways to give",
      href: "/ways-to-give",
      ariaLabel: "Explore ways to give",
    },
    quote: "“Whoever is kind to the poor lends to the Lord.”",
    quoteAttribution: "Proverbs 19:17",
  },
];
