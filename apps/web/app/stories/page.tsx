import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { User, Calendar, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { featuredPosts } from "@/lib/blog-posts";
import { blogGridClasses } from "@/lib/blog-grid";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `Stories | ${siteConfig.name}`,
  description:
    "Read stories of impact from the ground — the children, communities, and programs behind our mission across Ethiopia.",
  alternates: { canonical: `${siteConfig.url}/stories` },
  openGraph: {
    title: "Stories",
    description:
      "Real stories from the communities we serve. Read about the children, volunteers, and programs making a difference.",
    url: `${siteConfig.url}/stories`,
    siteName: siteConfig.name,
    images: [{ url: `${siteConfig.url}/blog/blog1.jpeg` }],
    type: "website",
  },
};

export default function StoriesPage() {
  const gridClasses = blogGridClasses(featuredPosts.length, "page");

  return (
    <div className="flex-1 bg-white">
      <PageHero
        imageSrc="/whatwedo.jpeg"
        imageAlt="Children in Ethiopia"
        kicker="From the Field"
        title="Latest Stories"
        subtitle="Real stories from the children, communities, and volunteers behind our mission."
      />

      {/* ── Posts grid ── */}
      <div className="container mx-auto px-6 py-20 sm:px-10 lg:px-20">
        <div className={gridClasses}>
          {featuredPosts.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-[0_4px_24px_rgb(0,0,0,0.06)] transition-all duration-500 hover:shadow-[0_8px_32px_rgb(0,0,0,0.1)]"
            >
              <Link href={post.href} tabIndex={-1} aria-label={`Read: ${post.title}`}>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100">
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              </Link>
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <div className="mb-3 flex items-center gap-2 text-xs text-zinc-400">
                  <User className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  <span className="font-medium text-zinc-500">{post.author}</span>
                  <span aria-hidden>·</span>
                  <Calendar className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  <time dateTime={post.dateIso}>{post.date}</time>
                </div>
                <h2 className="font-serif text-xl font-medium leading-snug tracking-tight text-zinc-900 transition-colors duration-200 group-hover:text-primary">
                  <Link href={post.href}>{post.title}</Link>
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-500 font-light">
                  {post.excerpt}
                </p>
                <Link
                  href={post.href}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-opacity hover:opacity-75"
                >
                  Read story <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
