import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BedDouble,
  Building2,
  HandHeart,
  Heart,
  Mail,
  MapPin,
  Soup,
} from "lucide-react";
import {
  ChildrensVillageGallery,
  ChildrensVillageUrgentImage,
} from "@/components/childrens-village/childrens-village-images";
import { ProjectVideo } from "@/components/childrens-village/project-video";
import { LightboxScope } from "@/components/ui/lightbox-scope";
import {
  academyHeroImage,
  academyLightboxImages,
  academyVideo,
} from "@/lib/academy-assets";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `Bright Future Academy for Afar Empowerment | ${siteConfig.name}`,
  description:
    "A modern 430-bed student dormitory on a 10,000 sqm campus in Awash 7 Kilo, Afar — Bright Future Children's Village will provide a safe, nurturing home for disadvantaged students from Grade 3 to Grade 9.",
  alternates: { canonical: `${siteConfig.url}/childrens-village` },
  openGraph: {
    title: "Bright Future Academy for Afar Empowerment",
    description:
      "Bright Future Children's Village is rising in Awash — a landmark campus where children live, learn, eat, and grow together.",
    url: `${siteConfig.url}/childrens-village`,
    siteName: siteConfig.name,
    type: "website",
    images: [{ url: `${siteConfig.url}${academyHeroImage}` }],
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

export default function ChildrensVillagePage() {
  return (
    <div className="flex-1 bg-white">
      {/* ── Hero (no lightbox — title overlay) ── */}
      <div className="relative h-[22rem] w-full overflow-hidden bg-zinc-900 sm:h-[30rem] lg:h-[34rem]">
        <Image
          src={academyHeroImage}
          alt="Bright Future Academy for Afar Empowerment — Awash, Ethiopia"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-end px-6 pb-12 text-center sm:px-10 sm:pb-16 lg:pb-20">
          <p className="mb-4 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/65">
            <MapPin className="h-3.5 w-3.5" aria-hidden />
            Awash 7 Kilo, Afar — Ethiopia
          </p>
          <h1 className="max-w-5xl font-serif text-3xl font-medium leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Bright Future Academy for Afar Empowerment
          </h1>
          <p className="mt-5 max-w-2xl text-lg font-light text-white/85 sm:text-xl">
            Bright Future Children&rsquo;s Village is rising in Awash
          </p>
        </div>
      </div>

      <LightboxScope images={academyLightboxImages}>
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

        {/* ── Video ── */}
        <div className="container mx-auto px-6 py-16 sm:px-10 lg:px-20">
          <div className="relative overflow-hidden rounded-3xl bg-zinc-900 shadow-[0_20px_60px_rgb(0,0,0,0.12)]">
            <ProjectVideo
              src={academyVideo}
              poster={academyHeroImage}
              className="aspect-video w-full object-cover"
            />
          </div>
          <p className="mx-auto mt-5 max-w-2xl text-center text-sm font-light text-zinc-400">
            A glimpse of the future Bright Future Children&rsquo;s Village — where every child
            deserves a chance to shine.
          </p>
        </div>

        {/* ── The Need is Urgent ── */}
        <div className="bg-zinc-50">
          <div className="container mx-auto px-6 py-20 sm:px-10 lg:px-20">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
              <ChildrensVillageUrgentImage />
              <div>
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
                    The project has the full support and backing of the Federal Democratic Republic of
                    Ethiopia, the Afar regional state, and all other relevant agencies and ministries
                    in the country — as well as international partners, donors, and diaspora
                    Ethiopians.
                  </p>
                </div>
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

        <ChildrensVillageGallery />
      </LightboxScope>

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

      {/* ── Call to action ── */}
      <div className="container mx-auto px-6 py-20 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-medium tracking-tight text-zinc-900 sm:text-4xl">
            Help Build Brighter Futures
          </h2>
          <p className="mt-4 text-base font-light leading-relaxed text-zinc-500">
            Your gift brings the village closer to reality. Reach out to learn how you can partner
            with us on this landmark project.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/donate"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-primary-hover sm:w-auto"
            >
              <Heart className="h-4 w-4" aria-hidden />
              Donate
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
            <Link
              href="/#get-in-touch"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white px-8 py-3.5 text-sm font-semibold text-zinc-700 transition-all duration-200 hover:border-primary/40 hover:text-primary sm:w-auto"
            >
              <Mail className="h-4 w-4" aria-hidden />
              Contact Us
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
