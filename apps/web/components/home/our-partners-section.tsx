import Image from "next/image";
import { brand } from "@/lib/brand";
import { partners } from "@/lib/partners";

const marqueePartners = [...partners, ...partners];

export function OurPartnersSection() {
  return (
    <section className="w-full bg-zinc-50" aria-label="Our partners">
      <div className="container mx-auto px-6 sm:px-10 lg:px-20 pt-24 pb-16 text-center">
        <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-zinc-900">
          Our Partners
        </h2>
        <p className="mt-5 mx-auto max-w-xl text-base sm:text-lg leading-relaxed text-zinc-400 font-light">
          Working alongside schools, communities, and organizations to nourish
          children and build lasting change across Ethiopia.
        </p>
      </div>

      <div className="pb-20 sm:pb-24">
        <div className="partners-marquee-mask relative overflow-hidden">
          <div className="partners-marquee-track flex w-max items-center gap-12 sm:gap-16 lg:gap-20">
            {marqueePartners.map((partner, index) => (
              <div
                key={`${partner.id}-${index}`}
                className="flex h-16 w-36 shrink-0 items-center justify-center sm:h-20 sm:w-44 lg:h-24 lg:w-52"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={brand.logo.width}
                  height={brand.logo.height}
                  className="h-full w-auto max-w-full object-contain opacity-80 transition-opacity duration-300 hover:opacity-100"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
        <p className="sr-only">
          Partner organizations supporting Bright Future for Children Ethiopia
        </p>
      </div>
    </section>
  );
}
