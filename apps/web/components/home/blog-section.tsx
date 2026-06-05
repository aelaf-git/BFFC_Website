import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { featuredPosts } from "@/lib/blog-posts";
import { siteConfig } from "@/lib/site";

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
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${siteConfig.url}${post.href}`,
        },
        headline: post.title,
        description: post.excerpt,
        datePublished: post.dateIso,
        dateModified: post.dateIso,
        image: {
          "@type": "ImageObject",
          url: `${siteConfig.url}${post.image}`,
          description: post.imageAlt,
        },
        url: `${siteConfig.url}${post.href}`,
        author: {
          "@type": "Person",
          name: post.author,
        },
        publisher: {
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
          logo: {
            "@type": "ImageObject",
            url: `${siteConfig.url}/logo/bffc-logo.png`,
          },
        },
        inLanguage: "en",
      },
    })),
  };

  return (
    <section
      className="relative w-full"
      aria-label="Latest stories and articles"
      id="latest-stories"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/*
        position: fixed at z-index -1 means this image is ALWAYS anchored to
        the viewport — it never moves on any device. Other sections have solid
        backgrounds that paint over it; this section has no background, so the
        image shows through.
      */}
      <div
        className="fixed inset-0"
        style={{
          backgroundImage: "url('/mission-background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -1,
        }}
        aria-hidden="true"
      />

      {/* Dark overlay — absolute, stays within this section's bounds */}
      <div className="absolute inset-0 bg-black/65" aria-hidden="true" />

      {/* All content sits above the overlay */}
      <div className="relative z-10">

        {/* ── Heading ── */}
        <div className="container mx-auto px-6 sm:px-10 lg:px-20 pt-24 pb-16 text-center">
          <span id="stories" aria-hidden="true" className="block scroll-mt-20" />
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
                  itemScope
                  itemType="https://schema.org/BlogPosting"
                >
                  {/* Hidden microdata fields */}
                  <meta itemProp="datePublished" content={post.dateIso} />
                  <meta itemProp="dateModified" content={post.dateIso} />
                  <meta itemProp="author" content={post.author} />
                  <meta itemProp="url" content={`${siteConfig.url}${post.href}`} />

                  {/* Image */}
                  <Link href={post.href} aria-label={`Read: ${post.title}`} tabIndex={-1} itemProp="url">
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100">
                      <Image
                        src={post.image}
                        alt={post.imageAlt}
                        fill
                        priority={index === 0}
                        loading={index === 0 ? "eager" : "lazy"}
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        itemProp="image"
                      />
                    </div>
                  </Link>

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-6 sm:p-7">

                    {/* Meta row */}
                    <header>
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 shrink-0 text-zinc-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                        </svg>
                        <span className="text-xs text-zinc-500 font-medium">{post.author}</span>
                        <span className="text-zinc-300" aria-hidden="true">·</span>
                        <time
                          dateTime={post.dateIso}
                          className="text-xs text-zinc-400 font-light"
                          itemProp="datePublished"
                        >
                          {post.date}
                        </time>
                      </div>

                        {/* Title */}
                        <h3
                          className="mt-4 font-serif text-xl font-medium leading-snug tracking-tight text-zinc-900 group-hover:text-primary transition-colors duration-200"
                          itemProp="headline"
                        >
                          <Link href={post.href}>{post.title}</Link>
                        </h3>
                    </header>

                    {/* Excerpt */}
                    <p className="mt-3 flex-1 text-sm leading-[1.85] text-zinc-500 font-light" itemProp="description">
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

      </div>
    </section>
  );
}
