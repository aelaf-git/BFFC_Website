import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BedDouble, GraduationCap, Soup } from "lucide-react";

const stats = [
  { value: "430", label: "Beds for Grades 3–9" },
  { value: "10,000", label: "sqm modern campus" },
  { value: "~$5M", label: "Total investment" },
  { value: "Grades 3–9", label: "Students supported" },
];

const highlights = [
  {
    icon: BedDouble,
    title: "A safe place to live",
    body: "Comfortable dormitories, dining halls, study areas, and recreational spaces — a true second home.",
  },
  {
    icon: Soup,
    title: "Nourished to learn",
    body: "Nutritious meals and educational support so no child studies on an empty stomach.",
  },
  {
    icon: GraduationCap,
    title: "Room to thrive",
    body: "For the entire semester, children live, learn, eat, and grow together as one community.",
  },
];

export function ChildrensVillageSection() {
  return (
    <section className="w-full bg-white" aria-label="Bright Future Academy for Afar Empowerment">
      {/* ── Section heading (matches the rest of the landing page) ── */}
      <div className="container mx-auto px-6 sm:px-10 lg:px-20 pt-14 pb-8 text-center sm:pt-20 sm:pb-12 lg:pt-24 lg:pb-16">
        <span id="childrens-village" aria-hidden="true" className="block scroll-mt-20" />
        <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-zinc-900">
          Bright Future Academy for Afar Empowerment
        </h2>
        <p className="mt-5 mx-auto max-w-2xl text-base sm:text-lg leading-relaxed text-zinc-400 font-light">
          Building Bright Future Children&rsquo;s Village — a modern student campus rising from the
          desert sands of Afar, where every child deserves a chance to shine.
        </p>
      </div>

      {/* ── Showcase banner ── */}
      <div className="container mx-auto px-6 sm:px-10 lg:px-20">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl bg-zinc-100 sm:aspect-[2/1] lg:aspect-[5/2]">
          <Image
            src="/Bright-Future-Academy-for-Afar-Empowerment/img1.png"
            alt="The future site of Bright Future Children's Village in Awash, Afar"
            fill
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 1120px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 sm:p-10">
            <p className="font-serif text-2xl font-medium text-white sm:text-4xl">
              Building Dreams, Brick by Brick
            </p>
            <p className="mt-2 max-w-xl text-sm font-light text-white/80 sm:text-base">
              A 430-bed student village on a 10,000 sqm campus in Awash 7 Kilo.
            </p>
          </div>
        </div>
      </div>

      {/* ── Intro + stats ── */}
      <div className="container mx-auto px-6 sm:px-10 lg:px-20 pt-10 sm:pt-16">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-20">
          <div className="space-y-6 text-base leading-[1.9] text-zinc-500 font-light sm:text-[1.05rem]">
            <p>
              In the heart of Ethiopia&rsquo;s Afar region, a life-changing project is about to begin.
              Bright Future for Children is building a modern 430-bed student dormitory on a
              10,000 square meter campus — a safe, nurturing home for hundreds of disadvantaged
              students from Grade 3 to Grade 9.
            </p>
            <p>
              Many bright and determined children in Afar miss out on quality education due to
              distance, poverty, and lack of safe accommodation. This village removes those barriers
              — with full backing from the Federal Government of Ethiopia, the Afar regional state,
              and international partners, donors, and diaspora Ethiopians.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-zinc-100 self-start">
            {stats.map(({ value, label }) => (
              <div key={label} className="bg-white p-7 text-center sm:p-9">
                <p className="font-serif text-3xl font-medium text-primary sm:text-4xl">{value}</p>
                <p className="mt-2 text-xs font-light leading-snug text-zinc-500 sm:text-sm">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Highlights ── */}
      <div className="container mx-auto px-6 sm:px-10 lg:px-20 pt-10 sm:pt-16">
        <div className="grid gap-6 sm:grid-cols-3 lg:gap-8">
          {highlights.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-3xl border border-zinc-100 bg-accent-light p-7">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white">
                <Icon className="h-5 w-5 text-accent" aria-hidden />
              </div>
              <h3 className="font-serif text-xl font-medium text-zinc-900">{title}</h3>
              <p className="mt-2 text-sm font-light leading-relaxed text-zinc-500">{body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="container mx-auto px-6 sm:px-10 lg:px-20 pt-8 pb-14 text-center sm:pt-12 sm:pb-20 lg:pb-24">
        <Link
          href="/childrens-village"
          className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-primary-hover"
        >
          See the full project
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden
          />
        </Link>
      </div>
    </section>
  );
}
