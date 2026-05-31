import type { Metadata } from "next";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { AboutSection } from "@/components/home/about-section";
import { OurPartnersSection } from "@/components/home/our-partners-section";
import { WhatWeDoSection } from "@/components/home/what-we-do-section";
import { HomePageJsonLd } from "@/components/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { heroSlides } from "@/lib/hero-slides";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  description:
    "Providing life-saving meals to children in Amhara, Afar, and Tigray — Ethiopia's most war-affected regions. Donate, sponsor a child, or get involved with Bright Future For Children Ethiopia.",
  path: "/",
  ogImage: "/hero/hero1.jpg",
});

/** Scroll targets for top-bar section links (content TBD) */
const anchorClass = "scroll-mt-0";

export default function Home() {
  return (
    <div className="flex-1 bg-background" aria-label="Home">
      <HomePageJsonLd url={siteConfig.url} />
      <h1 className="sr-only">
        Bright Future For Children Ethiopia — Providing life-saving meals to children
        in Amhara, Afar, and Tigray
      </h1>
      <HeroCarousel slides={heroSlides} />
      <div id="about" className={anchorClass} tabIndex={-1}>
        <AboutSection />
      </div>
      <OurPartnersSection />
      <div id="what-we-do" className={anchorClass} tabIndex={-1}>
        <WhatWeDoSection />
      </div>
      <div id="get-involved" className={anchorClass} tabIndex={-1} />
    </div>
  );
}
