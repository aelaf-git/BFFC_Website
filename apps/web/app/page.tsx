import type { Metadata } from "next";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { AboutSection } from "@/components/home/about-section";
import { WhatWeDoSection } from "@/components/home/what-we-do-section";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { heroSlides } from "@/lib/hero-slides";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  description: siteConfig.description,
  path: "/",
});

/** Scroll targets for top-bar section links (content TBD) */
const anchorClass = "scroll-mt-0";

export default function Home() {
  return (
    <div className="flex-1 bg-background" aria-label="Home">
      <HeroCarousel slides={heroSlides} />
      <div id="about" className={anchorClass} tabIndex={-1}>
        <AboutSection />
      </div>
      <div id="what-we-do" className={anchorClass} tabIndex={-1}>
        <WhatWeDoSection />
      </div>
      <div id="get-involved" className={anchorClass} tabIndex={-1} />
    </div>
  );
}
