import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type SubContent = {
  id: string;
  index: string;
  tag: string;
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
    index: "01",
    tag: "About Us",
    titleLine1: "Building Bright Futures",
    titleLine2: "for Every Child",
    body: "Bright Future for Children brings communities together through structured programs, youth sport initiatives, and life-changing opportunity. We believe every child deserves the foundation to thrive.",
    cta: { label: "Get Involved", href: "/ways-to-give" },
    image: "/about-us.png",
    imageAlt: "Children playing soccer together in a sunny community field",
  },
  {
    id: "mission-vision",
    index: "02",
    tag: "Our Mission & Vision",
    titleLine1: "A World Where Every",
    titleLine2: "Child Can Flourish",
    body: "Our mission is to foster inclusive environments where youth can grow, learn, and lead. We build local capacity, promote health equity, and champion equal opportunity for all children.",
    cta: { label: "See Our Work", href: "/impact" },
    image: "/mission-background.png",
    imageAlt: "Children learning together in a bright, welcoming classroom",
  },
  {
    id: "leadership",
    index: "03",
    tag: "Leadership",
    titleLine1: "Guided by Committed",
    titleLine2: "Community Leaders",
    body: "Our board of advocates, educators, and sport professionals leads with transparency and purpose — working hand-in-hand with families and local partners to create sustainable, lasting change.",
    cta: { label: "Meet the Team", href: "/learn-more" },
    image: "/leadership-background.png",
    imageAlt: "Diverse community volunteers and leaders planning together",
  },
  {
    id: "where-we-work",
    index: "04",
    tag: "Where We Work",
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
    <section
      className="w-full bg-white"
      aria-label="About Bright Future for Children"
    >
      {/* ── Section Header ── */}
      <div className="container mx-auto px-6 sm:px-10 lg:px-20 pt-24 pb-0">
        <div className="flex items-end justify-between border-b border-zinc-200 pb-6">
          <div>
            <h2 className="font-serif text-4xl sm:text-5xl font-medium tracking-tight text-zinc-900">
              About Us
            </h2>
          </div>
          {/* Decorative counter */}
          <span className="hidden sm:block font-serif text-[5rem] leading-none font-medium text-zinc-100 select-none">
            BFFC
          </span>
        </div>
      </div>

      {/* ── Subsections ── */}
      {subsections.map((s, index) => {
        const imageRight = index % 2 === 0;
        /* Alternate the text panel background for depth */
        const textBg = index % 2 === 0 ? "bg-white" : "bg-[#fdf9f5]";

        return (
          <article key={s.id} id={s.id} className="relative w-full">

            {/* Divider row with section label */}
            <div className="container mx-auto px-6 sm:px-10 lg:px-20">
              <div className="flex items-center gap-4 py-0">
                <span className="text-[0.6rem] font-bold uppercase tracking-[0.25em] text-zinc-400">
                  {s.index}
                </span>
                <div className="flex-1 h-px bg-zinc-100" />
                <span className="text-[0.6rem] font-bold uppercase tracking-[0.25em] text-zinc-300">
                  {s.tag}
                </span>
              </div>
            </div>

            {/* Content row */}
            <div
              className={`flex flex-col ${imageRight ? "lg:flex-row" : "lg:flex-row-reverse"}`}
            >
              {/* ── Photography panel ── */}
              <div className="relative w-full lg:w-[52%] aspect-[4/3] lg:aspect-auto lg:min-h-[560px] shrink-0 overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.imageAlt}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 52vw"
                />
                {/* Subtle gradient overlay on image bottom */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>

              {/* ── Text panel ── */}
              <div
                className={`
                  relative flex flex-col justify-center w-full lg:w-[48%]
                  px-8 py-16 sm:px-14 sm:py-20 lg:py-28
                  ${imageRight ? "lg:pl-16 lg:pr-14" : "lg:pr-16 lg:pl-14"}
                  ${textBg}
                `}
              >
                {/* Accent vertical bar */}
                <div
                  className={`
                    hidden lg:block absolute top-1/2 -translate-y-1/2 w-[3px] h-20 bg-primary rounded-full
                    ${imageRight ? "left-0" : "right-0"}
                  `}
                />

                {/* Index + Tag row */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-serif text-4xl font-medium text-zinc-100 leading-none select-none">
                    {s.index}
                  </span>
                  <div className="h-px w-8 bg-primary/50" />
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-primary">
                    {s.tag}
                  </p>
                </div>

                {/* Two-line Serif Title */}
                <h3 className="font-serif font-medium tracking-tight leading-[1.12]">
                  <span className="block text-[1.9rem] sm:text-[2.3rem] lg:text-[2.6rem] text-zinc-900">
                    {s.titleLine1}
                  </span>
                  <span className="block text-[1.9rem] sm:text-[2.3rem] lg:text-[2.6rem] text-primary">
                    {s.titleLine2}
                  </span>
                </h3>

                {/* Decorative rule under title */}
                <div className="mt-5 flex items-center gap-2">
                  <div className="w-8 h-[2px] bg-primary" />
                  <div className="w-2 h-[2px] bg-primary/30" />
                </div>

                {/* Body */}
                <p className="mt-6 max-w-[38ch] text-[0.95rem] leading-[1.85] text-zinc-500 font-light">
                  {s.body}
                </p>

                {/* CTA */}
                <Link
                  href={s.cta.href}
                  className="group mt-10 inline-flex items-center gap-4 self-start text-zinc-900 transition-all"
                  aria-label={s.cta.label}
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-zinc-300 bg-white transition-all group-hover:border-primary group-hover:bg-primary">
                    <ArrowRight className="h-4 w-4 text-zinc-500 transition-all group-hover:text-white group-hover:translate-x-0.5" />
                  </div>
                  <span className="text-sm font-medium text-zinc-700 group-hover:text-primary transition-colors tracking-wide">
                    {s.cta.label}
                  </span>
                </Link>

              </div>
            </div>

          </article>
        );
      })}

      {/* ── Bottom border ── */}
      <div className="container mx-auto px-6 sm:px-10 lg:px-20">
        <div className="border-t border-zinc-100" />
      </div>

    </section>
  );
}
