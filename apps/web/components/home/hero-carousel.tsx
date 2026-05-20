"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import type { HeroSlide } from "@/lib/hero-slides";
import { ArrowRight } from "lucide-react";

type HeroCarouselProps = {
  slides: HeroSlide[];
};

export function HeroCarousel({ slides }: HeroCarouselProps) {
  // We only show the first 3 heros as requested, or all if slides.length is 3.
  const displaySlides = slides.slice(0, 3);

  useEffect(() => {
    let lastY = window.scrollY;
    let isAutoScrolling = false;
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const H = window.innerHeight;

      if (isAutoScrolling) {
        lastY = currentY;
        return;
      }

      const direction = currentY > lastY ? "down" : "up";
      lastY = currentY;

      // Only snap if we are scrolling down and within the hero carousel range
      if (direction === "down" && currentY < 2 * H - 30) {
        const currentSlide = Math.floor((currentY + 15) / H);
        const nextSlide = currentSlide + 1;
        const targetScroll = nextSlide * H;

        const offset = currentY % H;
        // Snap if we scroll down past a minor threshold (e.g. 20px)
        if (offset > 20 && offset < H - 20) {
          isAutoScrolling = true;
          window.scrollTo({
            top: targetScroll,
            behavior: "smooth",
          });

          // Debounce and lock scroll snaps until the animation finishes
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            isAutoScrolling = false;
            lastY = window.scrollY;
          }, 700);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <div className="relative w-full">
      {displaySlides.map((slide, index) => (
        <section
          key={slide.image}
          className="sticky top-0 h-screen w-full overflow-hidden"
          style={{ zIndex: index * 10 }}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              className="object-cover object-center"
            />
            {/* Dark Overlay for visibility */}
            <div className="absolute inset-0 bg-black/50" />
            {/* Optional Gradient for extra depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
          </div>

          {/* Content Layer */}
          <div className="container relative z-10 mx-auto flex h-full items-center px-6 sm:px-10 lg:px-16">
            <div className="max-w-4xl">
              {/* Tag/Label (Packard Style) */}
              <div className="mb-6 inline-block rounded-full bg-primary/20 px-4 py-1 text-sm font-bold tracking-wider text-primary backdrop-blur-md uppercase">
                Featured Impact
              </div>

              {/* Heading (Serif) */}
              <h1 className="font-serif text-5xl font-medium leading-[1.1] text-white sm:text-6xl lg:text-8xl">
                {slide.title}
              </h1>

              {/* Subtitle */}
              <p className="mt-8 max-w-2xl text-xl leading-relaxed text-white/90 sm:text-2xl">
                {slide.subtitle}
              </p>

              {/* CTA Button (Packard Style: Circular with Arrow) */}
              <div className="mt-12">
                <Link
                  href={slide.cta.href}
                  className="group flex items-center gap-4 text-white no-underline transition-opacity hover:opacity-80"
                  aria-label={slide.cta.ariaLabel}
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/40 transition-all group-hover:border-white group-hover:bg-white/10">
                    <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
                  </div>
                  <span className="text-lg font-bold tracking-wide uppercase">
                    {slide.cta.label}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
