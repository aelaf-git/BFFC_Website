import Image from "next/image";
import Link from "next/link";

const communityGoals = [
  {
    title: "Est. Breakfast & Lunch Programs",
    body: "Collaborating with schools, parents, village elders, local administration, and other stakeholders to provide nutritious meals to children so they can reach their full potential.",
    image: "/about-us.png",
    imageAlt: "Children receiving school meals",
  },
  {
    title: "Provision of School Supplies",
    body: "Supplying exercise books and educational materials to children in Afar, Tigray, and Amhara to support learning and long-term growth.",
    image: "/mission-background.png",
    imageAlt: "Children learning with school materials in a classroom",
  },
];

export function WhatWeDoSection() {
  return (
    <section className="bg-white" aria-label="What we do">
      <div className="container mx-auto px-6 sm:px-10 lg:px-20 pt-24 pb-16 text-center">
        <span id="what-we-do" aria-hidden="true" className="block scroll-mt-20" />
        <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-zinc-900">
          What We Do
        </h2>
        <p className="mt-5 mx-auto max-w-xl text-base sm:text-lg leading-relaxed text-zinc-400 font-light">
          Feeding children so they can learn, grow, and thrive
        </p>
      </div>

      <div className="container mx-auto px-6 sm:px-10 lg:px-20 pb-20 sm:pb-24">
        <article className="relative w-full">
          <div className="flex flex-col gap-10 lg:items-center lg:gap-16 xl:gap-24 lg:flex-row">
            <div className="w-full shrink-0 lg:w-[50%]">
              <div className="relative rounded-3xl bg-zinc-50/50 p-3 shadow-[0_8px_30px_rgb(0,0,0,0.015)] transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.03)] sm:p-4">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-100 sm:aspect-[16/10] lg:aspect-[4/3]">
                  <Image
                    src="/mission-background.png"
                    alt="Children sharing a meal at school"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>

            <div className="flex w-full flex-col justify-center py-2 lg:w-[50%]">
              <p className="max-w-[42ch] text-base leading-[1.9] text-zinc-500 font-light sm:text-[1.05rem]">
                At Bright Future for Children Ethiopia, we provide life-saving, nutritious,
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

        <div className="mt-24 w-full lg:mt-36">
          <h3 className="text-center font-serif text-3xl text-zinc-900 sm:text-4xl">
            Community Goals
          </h3>
          <div className="mx-auto mt-4 w-full max-w-[56rem]">
            <p className="mx-auto text-center text-sm leading-relaxed text-zinc-600 sm:text-base">
              Bright Future for Children Ethiopia works hand in hand with communities and
              leaders in Afar, Tigray, and Amhara regions to address their biggest
              challenges. Our primary goals include:
            </p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:gap-8">
              {communityGoals.map((goal) => (
                <div
                  key={goal.title}
                  className="w-full max-w-[26rem] justify-self-center overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50"
                >
                  <div className="relative w-full bg-zinc-100">
                    <Image
                      src={goal.image}
                      alt={goal.imageAlt}
                      width={800}
                      height={500}
                      className="h-52 w-full object-cover sm:h-60"
                    />
                  </div>
                  <div className="p-4 sm:p-5">
                    <p className="font-semibold text-zinc-900">{goal.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-600">{goal.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
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
