import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BedDouble, Building2, HandHeart, Mail, MapPin, Soup } from "lucide-react";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `Bright Future Children's Village | ${siteConfig.name}`,
  description:
    "A modern 430-bed student dormitory on a 10,000 sqm campus in Awash 7 Kilo, Afar — a safe, nurturing home for hundreds of disadvantaged students from Grade 3 to Grade 9.",
  alternates: { canonical: `${siteConfig.url}/childrens-village` },
  openGraph: {
    title: "Bright Future Children's Village is Rising in Awash",
    description:
      "Help build a modern 430-bed student village in Ethiopia's Afar region — comfortable dormitories, dining halls, study areas, and a safe place to grow.",
    url: `${siteConfig.url}/childrens-village`,
    siteName: siteConfig.name,
    type: "website",
  },
};

const highlights = [
  {
    icon: BedDouble,
    title: "430 beds",
    description: "Dormitory space for students in Grades 3–9.",
  },
  {
    icon: Building2,
    title: "10,000 sqm campus",
    description: "A modern campus with complete facilities.",
  },
  {
    icon: Soup,
    title: "Nutritious meals & support",
    description: "Educational support and a safe living environment.",
  },
  {
    icon: HandHeart,
    title: "~5 Million USD",
    description: "Total estimated investment to complete the village.",
  },
];

const ctas = [
  {
    icon: ArrowRight,
    title: "Donate Now",
    description: "Every gift — big or small — brings the village closer to completion.",
    href: "/donate",
    primary: true,
  },
  {
    icon: BedDouble,
    title: "Sponsor a Bed",
    description: "Furnish a room and sponsor a child's yearly stay at the village.",
    href: "/donate?type=monthly",
    primary: false,
  },
  {
    icon: Building2,
    title: "Become a Partner",
    description: "Corporate and institutional partners help us build at scale.",
    href: "/#get-in-touch",
    primary: false,
  },
  {
    icon: Mail,
    title: "Contact Us",
    description: "Have questions about the project? We'd love to hear from you.",
    href: "/#get-in-touch",
    primary: false,
  },
];

export default function ChildrensVillagePage() {
  return (
    <div className="flex-1 bg-white">
      {/* ── Hero ── */}
      <div className="relative h-80 w-full overflow-hidden bg-zinc-900 sm:h-[28rem]">
        <Image
          src="/Bright-Future-Academy-for-Afar-Empowerment/img1.png"
          alt="Children in Ethiopia's Afar region"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <p className="mb-3 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70">
            <MapPin className="h-3.5 w-3.5" aria-hidden /> Awash 7 Kilo, Afar — Ethiopia
          </p>
          <h1 className="font-serif text-4xl font-medium tracking-tight text-white sm:text-5xl lg:text-6xl">
            Building Dreams Brick by Brick
          </h1>
          <p className="mt-4 max-w-2xl text-lg font-light text-white/85 sm:text-xl">
            Bright Future Children&rsquo;s Village is Rising in Awash
          </p>
        </div>
      </div>

      {/* ── Intro ── */}
      <div className="container mx-auto px-6 py-20 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-3xl space-y-6 text-lg font-light leading-relaxed text-zinc-600">
          <p className="text-xl font-normal text-zinc-800">
            In the heart of Ethiopia&rsquo;s Afar region, a life-changing project is about to begin.
          </p>
          <p>
            Bright Future for Children is excited to announce the construction of a modern{" "}
            <strong className="font-semibold text-zinc-900">430-bed student dormitory</strong> on a
            10,000 square meter campus in Awash 7 Kilo. Named Bright Future Children&rsquo;s Village,
            this landmark project will provide a safe, nurturing home for hundreds of disadvantaged
            students from Grade 3 to Grade 9.
          </p>
          <p>
            For the entire school semester, children will live, learn, eat, and grow together in a
            fully equipped facility that includes comfortable dormitories, dining halls, study areas,
            recreational spaces, and all necessary amenities. No more walking long distances or
            studying on empty stomachs — this village will become their second home, where they can
            focus fully on their education.
          </p>
        </div>
      </div>

      {/* ── The Need is Urgent ── */}
      <div className="bg-zinc-50">
        <div className="container mx-auto px-6 py-20 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-3xl font-medium tracking-tight text-zinc-900 sm:text-4xl">
              The Need is Urgent
            </h2>
            <div className="mt-6 space-y-6 text-lg font-light leading-relaxed text-zinc-600">
              <p>
                Many bright and determined children in Afar currently miss out on quality education
                due to distance, poverty, and lack of safe accommodation. This new Children&rsquo;s
                Village will remove those barriers and give them the opportunity to become the next
                generation of leaders.
              </p>
              <p>
                The project has full support and backing from the Federal Democratic Republic of
                Ethiopia, the Afar regional state, and all other relevant agencies and ministries in
                the country — as well as international partners, donors, and diaspora Ethiopians.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Project Highlights ── */}
      <div className="container mx-auto px-6 py-20 sm:px-10 lg:px-20">
        <div className="mb-14 text-center">
          <h2 className="font-serif text-3xl font-medium tracking-tight text-zinc-900 sm:text-4xl">
            Project Highlights
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base font-light text-zinc-500">
            A complete, modern campus designed to let every child live, learn, and thrive.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex flex-col rounded-3xl border border-zinc-100 bg-zinc-50 p-7"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white">
                <Icon className="h-5 w-5 text-primary" aria-hidden />
              </div>
              <h3 className="font-serif text-xl font-medium text-zinc-900">{title}</h3>
              <p className="mt-2 text-sm font-light leading-relaxed text-zinc-500">{description}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-3xl text-center text-base font-light leading-relaxed text-zinc-500">
          This ambitious project will be made possible through the generous support of the
          government, non-governmental organizations, corporate partners, and individual donors
          like you.
        </p>
      </div>

      {/* ── Your Support Can Change Lives ── */}
      <div className="relative overflow-hidden bg-primary">
        <div className="container mx-auto px-6 py-20 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-medium tracking-tight text-white sm:text-4xl">
              Your Support Can Change Lives
            </h2>
            <div className="mt-6 space-y-6 text-lg font-light leading-relaxed text-white/85">
              <p>
                Every donation — big or small — brings us closer to completing this dream. Whether
                you contribute toward construction, furnishing rooms, sponsoring a child&rsquo;s yearly
                stay, or providing educational materials, your support will directly impact hundreds
                of children and their families for years to come.
              </p>
              <p>
                Together, we can turn the desert sands of Afar into a beacon of hope and opportunity.
                Be part of this transformation. Join us in building Bright Future Children&rsquo;s
                Village — where every child deserves a chance to shine.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── CTAs ── */}
      <div className="container mx-auto px-6 py-20 sm:px-10 lg:px-20">
        <div className="mb-14 text-center">
          <h2 className="font-serif text-3xl font-medium tracking-tight text-zinc-900 sm:text-4xl">
            Donate Today · Partner With Us · Share This Project
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {ctas.map(({ icon: Icon, title, description, href, primary }) => (
            <Link
              key={title}
              href={href}
              className={`group flex flex-col rounded-3xl p-8 transition-all duration-300 ${
                primary
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "border border-zinc-100 bg-zinc-50 hover:border-primary/30 hover:bg-white"
              }`}
            >
              <div
                className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl ${
                  primary ? "bg-white/15" : "bg-white"
                }`}
              >
                <Icon
                  className={`h-5 w-5 ${primary ? "text-white" : "text-primary"}`}
                  aria-hidden
                />
              </div>
              <h3
                className={`font-serif text-2xl font-medium ${
                  primary ? "text-white" : "text-zinc-900"
                }`}
              >
                {title}
              </h3>
              <p
                className={`mt-3 flex-1 text-sm font-light leading-relaxed ${
                  primary ? "text-white/80" : "text-zinc-500"
                }`}
              >
                {description}
              </p>
              <span
                className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold ${
                  primary ? "text-white" : "text-primary"
                }`}
              >
                {title}
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
