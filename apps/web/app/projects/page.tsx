import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { academyHeroImage } from "@/lib/academy-assets";
import { projects } from "@/lib/projects";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `Projects | ${siteConfig.name}`,
  description:
    "Explore Bright Future for Children projects across Ethiopia: campuses, feeding programs, and community initiatives building brighter futures.",
  alternates: { canonical: `${siteConfig.url}/projects` },
  openGraph: {
    title: "Projects",
    description:
      "Explore our active and upcoming projects delivering education, nutrition, and safe housing for children in Ethiopia.",
    url: `${siteConfig.url}/projects`,
    siteName: siteConfig.name,
    images: [{ url: `${siteConfig.url}${academyHeroImage}` }],
    type: "website",
  },
};

export default function ProjectsPage() {
  return (
    <div className="flex-1 bg-white">
      <PageHero
        imageSrc={academyHeroImage}
        imageAlt="Bright Future for Children project in Ethiopia"
        kicker="Our Work in the Field"
        title="Projects"
        subtitle="Landmark initiatives delivering education, nutrition, and safe housing for children across Ethiopia."
      />

      <div className="container mx-auto px-6 py-20 sm:px-10 lg:px-20">
        <ul className="mx-auto grid max-w-5xl gap-8" role="list">
          {projects.map((project) => (
            <li key={project.slug}>
              <article className="group overflow-hidden rounded-3xl border border-zinc-100 bg-white shadow-[0_4px_24px_rgb(0,0,0,0.06)] transition-all duration-500 hover:border-accent/15 hover:shadow-[0_8px_32px_rgb(0,0,0,0.1)]">
                <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
                  <Link
                    href={project.href}
                    tabIndex={-1}
                    aria-label={`View project: ${project.title}`}
                    className="relative block aspect-[16/10] overflow-hidden bg-zinc-100 lg:aspect-auto lg:min-h-[18rem]"
                  >
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </Link>

                  <div className="flex flex-col p-6 sm:p-8">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-accent-light px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                        {project.status}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-sm text-zinc-500">
                        <MapPin className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden />
                        {project.location}
                      </span>
                    </div>

                    <h2 className="mt-4 font-serif text-2xl font-medium leading-snug tracking-tight text-accent transition-colors duration-200 group-hover:text-accent-hover sm:text-3xl">
                      <Link href={project.href}>{project.title}</Link>
                    </h2>

                    <p className="mt-4 flex-1 text-base leading-relaxed text-zinc-600">
                      {project.excerpt}
                    </p>

                    <ul className="mt-5 flex flex-wrap gap-2" aria-label="Project highlights">
                      {project.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium text-zinc-600"
                        >
                          {highlight}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={project.href}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-opacity hover:opacity-80"
                    >
                      View project
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </Link>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
