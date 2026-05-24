import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type SubContent = {
  id: string;
  titleLine1: string;
  titleLine2: string;
  body: string;
  cta: { label: string; href: string };
  image: string;
  imageAlt: string;
};

const subsections: SubContent[] = [
  {
    id: "about-us",
    titleLine1: "Building Bright Futures",
    titleLine2: "for Every Child",
    body: "Bright Future for Children brings communities together through structured programs, youth sport initiatives, and life-changing opportunity. We believe every child deserves the foundation to thrive.",
    cta: { label: "Get Involved", href: "/ways-to-give" },
    image: "/about-us.png",
    imageAlt: "Children playing soccer together in a sunny community field",
  },
  {
    id: "mission-vision",
    titleLine1: "A World Where Every",
    titleLine2: "Child Can Flourish",
    body: "Our mission is to foster inclusive environments where youth can grow, learn, and lead. We build local capacity, promote health equity, and champion equal opportunity for all children.",
    cta: { label: "See Our Work", href: "/impact" },
    image: "/mission-background.png",
    imageAlt: "Children learning together in a bright, welcoming classroom",
  },
  {
    id: "leadership",
    titleLine1: "Guided by Committed",
    titleLine2: "Community Leaders",
    body: "Our board of advocates, educators, and sport professionals leads with transparency and purpose — working hand-in-hand with families and local partners to create sustainable, lasting change.",
    cta: { label: "Meet the Team", href: "/learn-more" },
    image: "/leadership-background.png",
    imageAlt: "Diverse community volunteers and leaders planning together",
  },
  {
    id: "where-we-work",
    titleLine1: "Support Delivered",
    titleLine2: "Where It Matters Most",
    body: "We operate across diverse communities in Canada, establishing program hubs in schools, community centers, and athletic parks — ensuring every child, regardless of background, has access.",
    cta: { label: "View Our Reach", href: "/impact" },
    image: "/about-us.png",
    imageAlt: "A thriving community space where children gather and grow",
  },
];

export function AboutSection() {
  return (
    <section className="w-full bg-white" aria-label="About Bright Future for Children">

      {/* ── Section Heading ── */}
      <div className="container mx-auto px-6 sm:px-10 lg:px-20 pt-24 pb-16 text-center">
        <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-zinc-900">
          About Us
        </h2>
        <p className="mt-5 mx-auto max-w-xl text-base sm:text-lg leading-relaxed text-zinc-400 font-light">
          A community built on purpose, guided by compassion, and committed
          to the futures of every child we serve.
        </p>
      </div>

      {/* ── Subsections with clean margins and spacings ── */}
      <div className="container mx-auto px-6 sm:px-10 lg:px-20 pb-28 space-y-24 lg:space-y-36">
        {subsections.map((s, index) => {
          const imageRight = index % 2 === 0;

          return (
            <article key={s.id} id={s.id} className="relative w-full">
              <div className={`flex flex-col lg:items-center gap-10 lg:gap-16 xl:gap-24 ${imageRight ? "lg:flex-row" : "lg:flex-row-reverse"}`}>

                {/* Photography panel: framed in a sleek elegant box container */}
                <div className="w-full lg:w-[50%] shrink-0">
                  <div className="relative p-3 sm:p-4 rounded-3xl bg-zinc-50/50 border border-zinc-100 shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.03)] transition-all duration-500">
                    <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-100">
                      <Image
                        src={s.image}
                        alt={s.imageAlt}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                </div>

                {/* Text panel */}
                <div className="flex flex-col justify-center w-full lg:w-[50%] py-2">
                  {/* Title */}
                  <h3 className="font-serif font-medium tracking-tight leading-[1.1]">
                    <span className="block text-[2rem] sm:text-[2.6rem] lg:text-[3rem] text-zinc-900">
                      {s.titleLine1}
                    </span>
                    <span className="block text-[2rem] sm:text-[2.6rem] lg:text-[3rem] text-primary">
                      {s.titleLine2}
                    </span>
                  </h3>

                  {/* Body */}
                  <p className="mt-7 text-base sm:text-[1.05rem] leading-[1.9] text-zinc-500 font-light max-w-[42ch]">
                    {s.body}
                  </p>

                  {/* CTA */}
                  <Link
                    href={s.cta.href}
                    className="group mt-10 inline-flex items-center gap-4 self-start"
                    aria-label={s.cta.label}
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-zinc-300 bg-white transition-all duration-300 group-hover:border-primary group-hover:bg-primary">
                      <ArrowRight className="h-4 w-4 text-zinc-400 transition-all duration-300 group-hover:text-white group-hover:translate-x-0.5" />
                    </div>
                    <span className="text-sm font-medium text-zinc-600 tracking-wide transition-colors duration-200 group-hover:text-primary">
                      {s.cta.label}
                    </span>
                  </Link>
                </div>

              </div>
            </article>
          );
        })}
      </div>

    </section>
  );
}
