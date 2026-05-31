import Image from "next/image";
import { brand } from "@/lib/brand";
import { partners } from "@/lib/partners";

export function OurPartnersSection() {
  return (
    <section className="w-full bg-white" aria-label="Our partners">
      <div className="container mx-auto px-6 sm:px-10 lg:px-20 pt-24 pb-16 text-center">
        <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-zinc-900">
          Our Partners
        </h2>
        <p className="mt-5 mx-auto max-w-xl text-base sm:text-lg leading-relaxed text-zinc-400 font-light">
          Working alongside schools, communities, and organizations to nourish
          children and build lasting change across Ethiopia.
        </p>
      </div>

      <div className="partners-marquee-mask relative overflow-hidden pb-20 sm:pb-24">
        {/*
          Flat list of 20 items (10 + 10 clones).
          The CSS animates translateX(-50% → 0%), which equals exactly one set's width.
          Clone items use alt="" so screen readers skip them (decorative duplicates).
        */}
        <div className="partners-marquee-track flex w-max items-center">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="flex h-16 w-36 shrink-0 items-center justify-center pr-12 sm:h-20 sm:w-44 sm:pr-16 lg:h-24 lg:w-52 lg:pr-20"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={brand.logo.width}
                height={brand.logo.height}
                className="h-full w-auto max-w-full object-contain opacity-70 transition-opacity duration-300 hover:opacity-100"
                draggable={false}
                loading="eager"
              />
            </div>
          ))}
          {partners.map((partner) => (
            <div
              key={`${partner.id}-clone`}
              aria-hidden="true"
              className="flex h-16 w-36 shrink-0 items-center justify-center pr-12 sm:h-20 sm:w-44 sm:pr-16 lg:h-24 lg:w-52 lg:pr-20"
            >
              <Image
                src={partner.logo}
                alt=""
                width={brand.logo.width}
                height={brand.logo.height}
                className="h-full w-auto max-w-full object-contain opacity-70 transition-opacity duration-300 hover:opacity-100"
                draggable={false}
                loading="eager"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
