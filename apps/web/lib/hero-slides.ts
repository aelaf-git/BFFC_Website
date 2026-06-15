export type HeroSlide = {
  /** Background image, or poster frame when `video` is set */
  image: string;
  /** Optional looping background video (replaces image when set) */
  video?: string;
  title: string;
  subtitle: string;
  cta: { label: string; href: string; ariaLabel: string };
  quote?: string;
  quoteAttribution?: string;
};

export const heroSlides: HeroSlide[] = [
  {
    image: "/Bright-Future-Academy-for-Afar-Empowerment/img1.png",
    video: "/Bright-Future-Academy-for-Afar-Empowerment/video.mp4",
    title: "Bright Future Academy for Afar Empowerment",
    subtitle:
      "A modern 430-bed student village is rising in Awash — a safe, nurturing campus where disadvantaged children from Grade 3 to Grade 9 can live, learn, and grow.",
    cta: {
      label: "See the full project",
      href: "/childrens-village",
      ariaLabel: "Read about Bright Future Academy for Afar Empowerment",
    },
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
];
