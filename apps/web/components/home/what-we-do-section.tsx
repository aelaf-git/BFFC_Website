import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";

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
    <section className="bg-white py-20 sm:py-24" aria-label="What we do">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-zinc-900">
              What We Do
            </h2>
            <p className="mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-zinc-400 font-light">
              Feeding children so they can learn, grow, and thrive
            </p>
            <p className="mt-6 text-base leading-relaxed text-zinc-600">
              At Bright Future for Children Ethiopia, we provide life-saving, nutritious,
              and culturally appropriate meals for children aged 2-8 in war-ravaged regions
              including Amhara, Afar, and Tigray. We partner with local authorities,
              schools, and kindergartens to build local capacity and keep children in
              school with full stomachs.
            </p>
            <p className="mt-4 text-base leading-relaxed text-zinc-600">
              We currently run breakfast and lunch programs for orphaned children in Afar
              and Amhara, while expanding to other urgent areas affected by displacement and
              conflict.
            </p>
          </div>

          <div className="space-y-6 lg:self-center">
            <div className="relative overflow-hidden rounded-2xl bg-zinc-100">
              <Image
                src="/mission-background.png"
                alt="Children sharing a meal at school"
                width={1200}
                height={800}
                className="h-64 w-full object-cover sm:h-72"
              />
            </div>
          </div>
        </div>

        <div className="mx-auto mt-12 w-full max-w-4xl px-2 py-2 sm:px-4">
          <h3 className="text-center font-serif text-3xl text-zinc-900 sm:text-4xl">
            Community Goals
          </h3>
          <p className="mx-auto mt-4 max-w-3xl text-center text-sm leading-relaxed text-zinc-600 sm:text-base">
            Bright Future for Children Ethiopia works hand in hand with communities and
            leaders in Afar, Tigray, and Amhara regions to address their biggest
            challenges. Our primary goals include:
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {communityGoals.map((goal) => (
              <div
                key={goal.title}
                className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50"
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

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/donate"
              className="inline-flex items-center gap-3 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
            >
              Donate
            </Link>
            <Link
              href="mailto:info@brightfuture4children.com"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-800 transition-colors hover:border-primary hover:text-primary"
            >
              Write Us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
