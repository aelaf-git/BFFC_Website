import type { Metadata } from "next";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { AboutSection } from "@/components/home/about-section";
import { ChildrensVillageSection } from "@/components/home/childrens-village-section";
import { OurPartnersSection } from "@/components/home/our-partners-section";
import { WhatWeDoSection } from "@/components/home/what-we-do-section";
import { BlogSection } from "@/components/home/blog-section";
import { ContactSection } from "@/components/home/contact-section";
import { HomePageJsonLd } from "@/components/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { heroSlides } from "@/lib/hero-slides";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  description:
    "Providing life-saving meals to children in Amhara, Afar, and Tigray, Ethiopia's most war-affected regions. Donate, sponsor a child, or get involved with Bright Future for Children.",
  path: "/",
  ogImage: "/hero/hero1.jpg",
});

export default function Home() {
  return (
    <div className="flex-1" aria-label="Home">
      <HomePageJsonLd url={siteConfig.url} />
      <h1 className="sr-only">
        Bright Future for Children: Providing life-saving meals to children
        in Amhara, Afar, and Tigray
      </h1>
      <HeroCarousel slides={heroSlides} />
      <AboutSection />
      <ChildrensVillageSection />
      <OurPartnersSection />
      <WhatWeDoSection />
      <BlogSection />
      <ContactSection />
    </div>
  );
}
