import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { featuredPosts } from "@/lib/blog-posts";
import { siteConfig } from "@/lib/site";

const categoryColors: Record<string, string> = {
  Impact: "bg-primary/10 text-primary",
  Community: "bg-emerald-50 text-emerald-700",
  Stories: "bg-sky-50 text-sky-700",
};

export function BlogSection() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Latest Stories — Bright Future For Children Ethiopia",
    description:
      "Real stories from the ground — the children, communities, and volunteers behind our mission.",
    url: `${siteConfig.url}/stories`,
    itemListElement: featuredPosts.map((post, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        datePublished: post.dateIso,
        image: `${siteConfig.url}${post.image}`,
        url: `${siteConfig.url}${post.href}`,
        author: {
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
        },
        publisher: {
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
        },
        articleSection: post.category,
      },
    })),
  };

  return (
    <section
      className="relative w-full bg-zinc-900"
      aria-label="Latest stories and articles"
      id="latest-stories"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/*
        Sticky background — works on ALL devices including iOS Safari.
        The div sticks to the top of the viewport as content scrolls over it.
        Negative margin-bottom pulls the content up to overlap the sticky layer.
      */}
      <div
        className="sticky top-0 h-screen -mb-[100vh] overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/mission-background.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/65" />
      </div>

      {/* All content sits above the sticky background via z-index */}
      <div className="relative z-10">

        {/* ── Heading ── */}
        <div className="container mx-auto px-6 sm:px-10 lg:px-20 pt-24 pb-16 text-center">
          <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-white">
            Latest Stories
          </h2>
          <p className="mt-5 mx-auto max-w-xl text-base sm:text-lg leading-relaxed text-white/80 font-light">
            Real stories from the ground — the children, communities, and
            volunteers behind our mission.
          </p>
        </div>

        {/* ── Card grid ── */}
        <div className="container mx-auto px-6 sm:px-10 lg:px-20 pb-28">
          <ul
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            role="list"
          >
            {featuredPosts.map((post, index) => (
              <li key={post.slug} className="flex">
                <article
                  className="group flex w-full flex-col overflow-hidden rounded-3xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.015)] transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
                  aria-label={post.title}
                >
                  {/* Image */}
                  <Link href={post.href} aria-label={`Read: ${post.title}`} tabIndex={-1}>
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100">
                      <Image
                        src={post.image}
                        alt={post.imageAlt}
                        fill
                        priority={index === 0}
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  </Link>

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-6 sm:p-7">

                    {/* Meta row */}
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-block rounded-full px-3 py-0.5 text-[10px] font-semibold uppercase tracking-widest ${categoryColors[post.category] ?? "bg-zinc-100 text-zinc-500"}`}
                        aria-label={`Category: ${post.category}`}
                      >
                        {post.category}
                      </span>
                      <time
                        dateTime={post.dateIso}
                        className="text-xs text-zinc-400 font-light"
                      >
                        {post.date}
                      </time>
                    </div>

                    {/* Title */}
                    <h3 className="mt-4 font-serif text-xl font-medium leading-snug tracking-tight text-zinc-900 group-hover:text-primary transition-colors duration-200">
                      <Link href={post.href}>{post.title}</Link>
                    </h3>

                    {/* Excerpt */}
                    <p className="mt-3 flex-1 text-sm leading-[1.85] text-zinc-500 font-light">
                      {post.excerpt}
                    </p>

                    {/* Read more */}
                    <Link
                      href={post.href}
                      className="group/cta mt-6 inline-flex items-center gap-3 self-start"
                      aria-label={`Read more about ${post.title}`}
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-white transition-all duration-300 group-hover/cta:border-primary group-hover/cta:bg-primary">
                        <ArrowRight className="h-3.5 w-3.5 text-zinc-400 transition-all duration-300 group-hover/cta:text-white group-hover/cta:translate-x-0.5" />
                      </div>
                      <span className="text-sm font-medium text-zinc-500 tracking-wide transition-colors duration-200 group-hover/cta:text-primary">
                        Read more
                      </span>
                    </Link>

                  </div>
                </article>
              </li>
            ))}
          </ul>

          {/* View all CTA */}
          <div className="mt-14 flex justify-center">
            <Link
              href="/stories"
              className="group inline-flex items-center gap-4"
              aria-label="View all stories and articles"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/50 bg-white/10 transition-all duration-300 group-hover:border-primary group-hover:bg-primary">
                <ArrowRight className="h-4 w-4 text-white transition-all duration-300 group-hover:text-white group-hover:translate-x-0.5" />
              </div>
              <span className="text-sm font-medium text-white/85 tracking-wide transition-colors duration-200 group-hover:text-primary">
                View all stories
              </span>
            </Link>
          </div>
        </div>

      </div>{/* end z-10 wrapper */}
    </section>
  );
}
