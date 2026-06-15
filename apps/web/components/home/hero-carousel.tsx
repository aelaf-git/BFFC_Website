"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { HeroSlide } from "@/lib/hero-slides";
import { ArrowRight } from "lucide-react";

type HeroCarouselProps = {
  slides: HeroSlide[];
};

export function HeroCarousel({ slides }: HeroCarouselProps) {
  const displaySlides = slides.slice(0, 3);
  const isAutoScrolling = useRef(false);
  const snapTimeout = useRef<NodeJS.Timeout | null>(null);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    const H = window.innerHeight;
    const totalSlides = displaySlides.length;

    const snapTo = (targetScroll: number) => {
      isAutoScrolling.current = true;
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
      if (snapTimeout.current) clearTimeout(snapTimeout.current);
      snapTimeout.current = setTimeout(() => {
        isAutoScrolling.current = false;
      }, 750);
    };

    const trySnap = (direction: "down" | "up") => {
      if (isAutoScrolling.current) return;
      const currentY = window.scrollY;

      if (direction === "down" && currentY < (totalSlides - 1) * H - 30) {
        const currentSlide = Math.floor((currentY + 15) / H);
        const nextSlide = currentSlide + 1;
        const offset = currentY % H;
        if (offset > 20 && offset < H - 20) {
          snapTo(nextSlide * H);
        }
      } else if (direction === "up" && currentY > 30 && currentY < totalSlides * H) {
        const currentSlide = Math.ceil((currentY - 15) / H);
        const prevSlide = Math.max(0, currentSlide - 1);
        const offset = currentY % H;
        if (offset > 20 && offset < H - 20) {
          snapTo(prevSlide * H);
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      const currentY = window.scrollY;
      if (currentY >= totalSlides * H) return;
      const direction = e.deltaY > 0 ? "down" : "up";
      trySnap(direction);
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current === null) return;
      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      touchStartY.current = null;
      const currentY = window.scrollY;
      if (currentY >= totalSlides * H) return;
      if (Math.abs(deltaY) < 30) return;
      trySnap(deltaY > 0 ? "down" : "up");
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      if (snapTimeout.current) clearTimeout(snapTimeout.current);
    };
  }, [displaySlides.length]);

  return (
    <div className="relative w-full shrink-0">
      {displaySlides.map((slide, index) => (
        <section
          key={slide.video ?? slide.image}
          className="sticky top-0 h-screen w-full overflow-hidden"
          style={{ zIndex: index * 10 }}
        >
          <div className="absolute inset-0">
            {slide.video ? (
              <video
                src={slide.video}
                poster={slide.image}
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover object-center"
                aria-hidden
              />
            ) : (
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover object-center"
              />
            )}
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
          </div>

          <div className="container relative z-10 mx-auto flex h-full items-center px-6 sm:px-10 lg:px-16">
            <div className="max-w-4xl">
              <h2 className="font-serif text-5xl font-medium leading-[1.1] text-white sm:text-6xl lg:text-8xl">
                {slide.title}
              </h2>

              <p className="mt-8 max-w-2xl text-xl leading-relaxed text-white/90 sm:text-2xl">
                {slide.subtitle}
              </p>

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
