import type { Metadata } from "next";
import Image from "next/image";
import { FileText, Download, ExternalLink, BookOpen, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  externalResources,
  resourceGuides,
  resourceReports,
} from "@/lib/resources";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `Resources | ${siteConfig.name}`,
  description:
    "Access reports, guides, and educational materials about our work feeding children in Ethiopia. Learn how we operate, where we work, and how your donation is used.",
  alternates: { canonical: `${siteConfig.url}/resources` },
  openGraph: {
    title: "Resources",
    description:
      "Reports, guides, and educational materials about our mission and programs in Ethiopia.",
    url: `${siteConfig.url}/resources`,
    siteName: siteConfig.name,
    type: "website",
  },
};

const guideIcons: Record<string, LucideIcon> = {
  "Donor Starter Guide": BookOpen,
  "How to Claim a Tax Receipt": FileText,
  "Volunteer & Partnership Handbook": ExternalLink,
};

export default function ResourcesPage() {
  return (
    <div className="flex-1 bg-white">
      {/* ── Hero ── */}
      <div className="relative h-64 w-full overflow-hidden bg-zinc-900 sm:h-80">
        <Image
          src="/about-one.jpeg"
          alt="Children in a classroom"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">
            Transparency & Learning
          </p>
          <h1 className="font-serif text-4xl font-medium tracking-tight text-white sm:text-5xl lg:text-6xl">
            Resources
          </h1>
          <p className="mt-4 max-w-xl text-base font-light text-white/75">
            Reports, guides, and research to help you understand our work and its impact.
          </p>
        </div>
      </div>

      {/* ── Reports ── */}
      <div className="container mx-auto px-6 py-20 sm:px-10 lg:px-20">
        <div className="mb-12">
          <h2 className="font-serif text-4xl font-medium tracking-tight text-zinc-900 sm:text-5xl">
            Reports & Publications
          </h2>
          <p className="mt-3 max-w-2xl text-base font-light text-zinc-500">
            We believe in full transparency. Our reports are available to all donors and members of the public.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {resourceReports.map((report) => (
            <div
              key={report.title}
              className="flex flex-col rounded-3xl border border-zinc-100 bg-zinc-50 p-7"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
                  {report.tag}
                </span>
                <span className="text-xs text-zinc-400">{report.year}</span>
              </div>
              <h3 className="font-serif text-xl font-medium text-zinc-900">{report.title}</h3>
              <p className="mt-2 flex-1 text-sm font-light leading-relaxed text-zinc-500">
                {report.description}
              </p>
              <a
                href={report.href}
                className="mt-5 inline-flex items-center gap-1.5 self-start text-sm font-medium text-primary transition-opacity hover:opacity-75"
              >
                <Download className="h-3.5 w-3.5" aria-hidden />
                Download PDF
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* ── Guides ── */}
      <div className="bg-zinc-50">
        <div className="container mx-auto px-6 py-20 sm:px-10 lg:px-20">
          <div className="mb-12">
            <h2 className="font-serif text-4xl font-medium tracking-tight text-zinc-900 sm:text-5xl">
              Guides & How-Tos
            </h2>
            <p className="mt-3 max-w-2xl text-base font-light text-zinc-500">
              Practical guides to help donors, partners, and volunteers get the most from their relationship with us.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {resourceGuides.map(({ title, description, href }) => {
              const Icon = guideIcons[title] ?? BookOpen;
              return (
                <div key={title} className="rounded-3xl bg-white p-7 shadow-sm">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" aria-hidden />
                  </div>
                  <h3 className="font-serif text-xl font-medium text-zinc-900">{title}</h3>
                  <p className="mt-2 text-sm font-light leading-relaxed text-zinc-500">{description}</p>
                  <a
                    href={href}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-opacity hover:opacity-75"
                  >
                    Read guide <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── External links ── */}
      <div className="container mx-auto px-6 py-20 sm:px-10 lg:px-20">
        <div className="mb-12">
          <h2 className="font-serif text-4xl font-medium tracking-tight text-zinc-900 sm:text-5xl">
            External Resources
          </h2>
          <p className="mt-3 max-w-2xl text-base font-light text-zinc-500">
            Useful links from international organisations and governments for further reading on child welfare in Ethiopia.
          </p>
        </div>
        <div className="divide-y divide-zinc-100">
          {externalResources.map(({ title, description, href }) => (
            <a
              key={title}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start justify-between gap-6 py-6"
            >
              <div>
                <h3 className="font-medium text-zinc-900 transition-colors group-hover:text-primary">
                  {title}
                </h3>
                <p className="mt-1 text-sm font-light text-zinc-500">{description}</p>
              </div>
              <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-zinc-300 transition-colors group-hover:text-primary" aria-hidden />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
