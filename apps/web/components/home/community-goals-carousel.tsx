"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const communityGoals = [
  {
    title: "Nutrition & Breakfast Programs",
    goal: "Ensure every disadvantaged child starts the school day nourished and ready to learn.",
    points: [
      "Provide daily breakfast to 28,000 children (ages 2–12) across Afar, Oromia, Southern, Amhara, and Tigray by 2027.",
      "Partner with local schools and Health Extension Workers on school breakfast programs.",
      "Use locally sourced, culturally appropriate food and create jobs for women in the community.",
    ],
    impact: "Better health, less hunger, and higher school attendance.",
    image: "/about-one.jpeg",
    imageAlt: "Children receiving breakfast at school",
  },
  {
    title: "Educational Supplies & Learning Support",
    goal: "Remove financial barriers so every child can fully participate in school.",
    points: [
      "Distribute learning kits, including notebooks, pens, textbooks, and backpacks, to 30,000 children each year.",
      "Support teacher resources and basic infrastructure in partner primary schools.",
      "Build local supply chains so materials reach children reliably and sustainably.",
    ],
    impact: "Higher enrollment, stronger literacy, and greater student confidence.",
    image: "/about-two.jpeg",
    imageAlt: "Children learning with school supplies",
  },
  {
    title: "Health & Nutrition Support",
    goal: "Improve overall child health and combat malnutrition through integrated care.",
    points: [
      "Provide micronutrient supplements, deworming, health screenings, and hygiene education.",
      "Train community health volunteers and mothers' groups on child feeding practices.",
      "Run nutrition awareness campaigns during droughts and lean seasons.",
    ],
    impact: "Reduced malnutrition, stronger immune systems, and better cognitive development.",
    image: "/about-three.jpeg",
    imageAlt: "Community health support for children",
  },
  {
    title: "Fighting Stigma & Building Community Hope",
    goal: "Help every child feel that education is valued and within reach, regardless of background.",
    points: [
      "Hold community dialogues, parent workshops, and success story campaigns with local role models.",
      "Promote inclusive education and address stigma around poverty and school attendance.",
      "Empower women through school committees and income activities linked to breakfast programs.",
    ],
    impact: "Stronger community ownership and higher parental engagement in education.",
    image: "/about-four.jpeg",
    imageAlt: "Community members supporting children's education",
  },
];

function GoalCard({ goal }: { goal: (typeof communityGoals)[number] }) {
  return (
    <article className="flex h-full flex-col">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-zinc-100">
        <Image
          src={goal.image}
          alt={goal.imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 80vw, 384px"
        />
      </div>

      <div className="mt-5 px-1 sm:mt-6">
        <h4 className="font-serif text-xl font-medium text-zinc-900 sm:text-2xl">
          {goal.title}
        </h4>
        <p className="mt-3 text-sm leading-relaxed text-zinc-700 sm:text-base">
          {goal.goal}
        </p>

        <ul className="mt-4 space-y-2.5">
          {goal.points.map((point) => (
            <li
              key={point}
              className="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-500 font-light sm:text-[0.95rem]"
            >
              <span className="mt-2 size-2 shrink-0 rounded-full bg-zinc-300" aria-hidden />
              {point}
            </li>
          ))}
        </ul>

        <p className="mt-5 border-t border-zinc-100 pt-4 text-sm leading-relaxed text-zinc-500 font-light italic sm:text-[0.95rem]">
          {goal.impact}
        </p>
      </div>
    </article>
  );
}

export function CommunityGoalsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = communityGoals.length;

  const goTo = (index: number) => {
    setActiveIndex((index + total) % total);
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          type="button"
          onClick={() => goTo(activeIndex - 1)}
          aria-label="Previous community goal"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-zinc-200 text-zinc-400 transition-colors hover:border-zinc-300 hover:text-zinc-700 sm:h-11 sm:w-11"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </button>

        <div className="min-w-0 flex-1 overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {communityGoals.map((goal) => (
              <div key={goal.title} className="w-full shrink-0 px-1">
                <GoalCard goal={goal} />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => goTo(activeIndex + 1)}
          aria-label="Next community goal"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-zinc-200 text-zinc-400 transition-colors hover:border-zinc-300 hover:text-zinc-700 sm:h-11 sm:w-11"
        >
          <ChevronRight className="h-5 w-5" aria-hidden />
        </button>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {communityGoals.map((goal, index) => (
          <button
            key={goal.title}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Go to ${goal.title}`}
            aria-current={index === activeIndex ? "true" : undefined}
            className={`carousel-dot h-2.5 w-2.5 shrink-0 rounded-full p-0 transition-colors duration-300 ${
              index === activeIndex ? "bg-primary" : "bg-zinc-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
