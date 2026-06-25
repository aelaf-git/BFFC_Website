import Image from "next/image";
import Link from "next/link";
import { CommunityGoalsCarousel } from "@/components/home/community-goals-carousel";

const visionTargets = [
  "Reach 30,000+ children with integrated support.",
  "Increase school enrollment and attendance in partner communities.",
  "Improve child nutrition and literacy in project areas.",
  "Build lasting partnerships with government, NGOs, and local communities.",
];

export function WhatWeDoSection() {
  return (
    <section className="bg-white" aria-label="What we do">
      <div className="container mx-auto px-6 sm:px-10 lg:px-20 pt-14 pb-8 text-center sm:pt-20 sm:pb-12 lg:pt-24 lg:pb-16">
        <span id="what-we-do" aria-hidden="true" className="block scroll-mt-20" />
        <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-zinc-900">
          What We Do
        </h2>
        <p className="mt-5 mx-auto max-w-xl text-base sm:text-lg leading-relaxed text-zinc-400 font-light">
          Feeding children so they can learn, grow, and thrive
        </p>
      </div>

      <div className="container mx-auto px-6 sm:px-10 lg:px-20 pb-16 sm:pb-20 lg:pb-24">
        <article className="relative w-full">
          <div className="flex flex-col gap-8 sm:gap-10 lg:items-center lg:gap-16 xl:gap-24 lg:flex-row">
            <div className="w-full shrink-0 lg:w-[50%]">
              <div className="relative rounded-3xl bg-accent-light/50 p-3 shadow-[0_8px_30px_rgb(0,0,0,0.015)] transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.03)] sm:p-4">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-100 sm:aspect-[16/10] lg:aspect-[4/3]">
                  <Image
                    src="/whatwedo.jpeg"
                    alt="Bright Future for Children community programs in Ethiopia"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>

            <div className="flex w-full flex-col justify-center py-2 lg:w-[50%]">
              <p className="max-w-[42ch] text-base leading-[1.9] text-zinc-500 font-light sm:text-[1.05rem]">
                At Bright Future for Children, we provide life-saving, nutritious,
                and culturally appropriate meals for children aged 2-8 in war-ravaged regions
                including Amhara, Afar, and Tigray. We partner with local authorities,
                schools, and kindergartens to build local capacity and keep children in
                school with full stomachs.
              </p>
              <p className="mt-7 max-w-[42ch] text-base leading-[1.9] text-zinc-500 font-light sm:text-[1.05rem]">
                We currently run breakfast and lunch programs for orphaned children in Afar
                and Amhara, while expanding to other urgent areas affected by displacement and
                conflict.
              </p>
            </div>
          </div>
        </article>

        {/* ── Community Goals ── */}
        <div className="mt-14 w-full sm:mt-20 lg:mt-36">
          <div className="flex flex-col gap-8 sm:gap-10 lg:flex-row lg:items-start lg:gap-16 xl:gap-20">
            {/* Left — title & description */}
            <div className="lg:sticky lg:top-28 lg:w-[42%] lg:shrink-0">
              <h3 className="font-serif text-3xl font-medium tracking-tight text-zinc-900 sm:text-4xl">
                Community Goals
              </h3>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-zinc-500 font-light sm:text-lg">
                <p>
                  Bright Future for Children is a dedicated charity transforming the lives of
                  disadvantaged children across Ethiopia, with a particular focus on the Afar
                  region. We are licensed by the Authority for Civil Society Organizations (ACSO),
                  which registers and regulates charities and NGOs in Ethiopia.
                </p>
                <p>
                  Through integrated community programs, we create lasting opportunities by
                  addressing the most critical barriers to education and child development.
                </p>
                <p className="font-normal text-zinc-700">Our work focuses on four key pillars:</p>
                <ul className="space-y-2 pl-1 text-[0.95rem] sm:text-base">
                  <li className="flex gap-2.5">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                    Nutritious breakfast programs so children learn with energy and focus.
                  </li>
                  <li className="flex gap-2.5">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden />
                    Essential educational materials that remove financial obstacles to learning.
                  </li>
                  <li className="flex gap-2.5">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                    Health and nutrition support so children grow strong physically and mentally.
                  </li>
                  <li className="flex gap-2.5">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden />
                    Fighting stigma and building hope so every child is valued and encouraged to attend school.
                  </li>
                </ul>
                <p>
                  Inspired by school feeding models from the UK and USA and local Ethiopian
                  initiatives, we adapt our approach across Afar, Oromia, Southern, Amhara, and
                  Tigray — combining immediate relief with long-term empowerment.
                </p>
                <p>
                  Since 2023, we have supported over 7,632 children and their families. Working
                  with government, NGOs, and civic partners, we seek to expand our reach,
                  strengthen families, and raise a generation of confident, educated leaders.
                  Together, we are turning hunger into hope and barriers into bright futures.
                </p>
              </div>
            </div>

            {/* Right — goal cards carousel */}
            <div className="min-w-0 flex-1">
              <CommunityGoalsCarousel />
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-2xl border-t border-zinc-100 pt-8 sm:mt-16 sm:pt-10 lg:mt-20">
            <h4 className="text-center font-serif text-xl font-medium text-zinc-900 sm:text-2xl">
              Our vision by 2030
            </h4>
            <ul className="mt-6 space-y-3">
              {visionTargets.map((target) => (
                <li
                  key={target}
                  className="text-center text-sm leading-relaxed text-zinc-500 font-light sm:text-base"
                >
                  {target}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3 sm:mt-10">
            <Link
              href="/donate"
              className="inline-flex items-center gap-3 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
            >
              Donate
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
