"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

type TabContent = {
  id: string;
  label: string;
  tag: string;
  title: string;
  body: string;
  cta: {
    label: string;
    href: string;
  };
  bgImage: string;
  fgImage: string;
};

export function AboutSection() {
  const [activeTab, setActiveTab] = useState<string>("about-us");

  const tabs: TabContent[] = [
    {
      id: "about-us",
      label: "About Us",
      tag: "Who We Are",
      title: "Empowering children, building strong communities.",
      body: "Bright Future for Children (BFFC) brings communities together through structured programs, youth sport initiatives, and life-changing opportunity. We believe every child deserves the foundation to thrive.",
      cta: { label: "Get Involved", href: "/ways-to-give" },
      bgImage: "/about-us.png",
      fgImage: "/about-foreground.png",
    },
    {
      id: "mission-vision",
      label: "Our Mission & Vision",
      tag: "Our Purpose",
      title: "A world where every child can reach their potential.",
      body: "Our mission is to foster inclusive environments where youth can grow, learn, and lead. Through community programs and sports, we build local capacity, promote health equity, and champion equal opportunity.",
      cta: { label: "See Our Work", href: "/impact" },
      bgImage: "/mission-background.png",
      fgImage: "/about-foreground.png",
    },
    {
      id: "leadership",
      label: "Leadership",
      tag: "Our Governance",
      title: "Guided by dedicated community advocates.",
      body: "Our leadership board is comprised of community advocates, educators, and sport professionals committed to transparent governance and sustainable local impact. We work hand-in-hand with local partners.",
      cta: { label: "Meet the Team", href: "/learn-more" },
      bgImage: "/leadership-background.png",
      fgImage: "/about-foreground.png",
    },
    {
      id: "where-we-work",
      label: "Where We Work",
      tag: "Our Reach",
      title: "Providing support where it is needed most.",
      body: "We operate across diverse communities in Canada, establishing hubs in local community centers, schools, and athletic parks to ensure our programs are accessible to every child, regardless of background.",
      cta: { label: "View Program Sites", href: "/impact" },
      bgImage: "/about-us.png",
      fgImage: "/about-foreground.png",
    },
  ];

  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <section className="w-full bg-white py-24 md:py-32 border-b border-zinc-100">
      <div className="container mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Section Header */}
        <div className="mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-zinc-900">
            About Us
          </h2>
          <div className="mt-3 h-[2px] w-8 bg-primary" />
        </div>

        {/* Horizontal Navigation Tabs */}
        <div className="flex overflow-x-auto scrollbar-none gap-x-8 border-b border-zinc-200 pb-px mb-12 text-sm font-medium">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap pb-4 transition-all duration-200 relative ${
                activeTab === tab.id
                  ? "text-primary border-b-2 border-primary -mb-[2px] font-semibold"
                  : "text-zinc-400 hover:text-zinc-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center lg:gap-20">
          
          {/* Left Column: Text Content */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Tag/Category */}
            <span className="text-sm font-semibold tracking-wider text-primary uppercase mb-4 block">
              {currentTab.tag}
            </span>

            {/* Heading */}
            <h2 className="font-serif text-4xl font-medium tracking-tight text-zinc-900 sm:text-5xl leading-[1.15]">
              {currentTab.title}
            </h2>

            {/* Description */}
            <p className="mt-6 text-base md:text-lg leading-relaxed text-zinc-600 max-w-xl">
              {currentTab.body}
            </p>

            {/* CTA Circle Arrow Link */}
            <div>
              <Link
                href={currentTab.cta.href}
                className="group inline-flex items-center gap-4 text-zinc-900 hover:text-primary transition-colors mt-8"
                aria-label={currentTab.cta.label}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 transition-colors group-hover:border-primary group-hover:bg-primary/5">
                  <ArrowRight className="h-4 w-4 text-zinc-700 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </div>
                <span className="text-sm font-semibold tracking-wider uppercase text-zinc-800 group-hover:text-primary transition-colors">
                  {currentTab.cta.label}
                </span>
              </Link>
            </div>
          </div>

          {/* Right Column: Layered Overlapping Images */}
          <div className="lg:col-span-6 relative pl-8 pb-8 sm:pl-12 sm:pb-12 pt-6">
            
            {/* Main Landscape Image Container */}
            <div className="relative aspect-[4/3] w-full rounded-[2rem] overflow-hidden bg-zinc-50 border border-zinc-100">
              <Image
                src={currentTab.bgImage}
                alt={currentTab.title}
                fill
                priority
                className="object-cover transition-opacity duration-500"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Overlapping Small Square Image Container */}
            <div className="absolute bottom-0 left-0 w-[42%] aspect-square rounded-[1.5rem] border-8 border-white bg-zinc-100 overflow-hidden z-10">
              <div className="relative w-full h-full p-2 bg-gradient-to-tr from-primary/10 via-accent/10 to-transparent">
                <div className="relative w-full h-full rounded-[1rem] overflow-hidden bg-white">
                  <Image
                    src={currentTab.fgImage}
                    alt="Smiling child"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 40vw, 20vw"
                  />
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
