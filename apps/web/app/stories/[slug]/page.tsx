import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { User, Calendar } from "lucide-react";

import { featuredPosts, getPostBySlug } from "@/lib/blog-posts";
import { PageHero } from "@/components/ui/page-hero";
import { brand } from "@/lib/brand";
import { siteConfig } from "@/lib/site";

/* ─── Static generation ───────────────────────────────────────────────────── */

export function generateStaticParams() {
  return featuredPosts.map((post) => ({ slug: post.slug }));
}

/* ─── Per-page metadata ───────────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Story not found" };

  const url = `${siteConfig.url}${post.href}`;
  const ogImage = `${siteConfig.url}${post.image}`;

  return {
    title: `${post.title} | ${siteConfig.name}`,
    description: post.excerpt,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: post.dateIso,
      authors: [post.author],
      images: [{ url: ogImage, alt: post.imageAlt }],
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
  };
}

/* ─── Page component ──────────────────────────────────────────────────────── */

export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const canonicalUrl = `${siteConfig.url}${post.href}`;
  const otherPosts = featuredPosts.filter((other) => other.slug !== post.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    headline: post.title,
    description: post.excerpt,
    image: {
      "@type": "ImageObject",
      url: `${siteConfig.url}${post.image}`,
      description: post.imageAlt,
    },
    datePublished: post.dateIso,
    dateModified: post.dateIso,
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
        url: `${siteConfig.url}${brand.logo.src}`,
      },
    },
    articleBody: post.content.join(" "),
    inLanguage: "en",
    url: canonicalUrl,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article
        className="bg-white"
        itemScope
        itemType="https://schema.org/BlogPosting"
      >
        <meta itemProp="datePublished" content={post.dateIso} />
        <meta itemProp="dateModified" content={post.dateIso} />
        <meta itemProp="author" content={post.author} />
        <meta itemProp="url" content={canonicalUrl} />

        <PageHero
          imageSrc={post.image}
          imageAlt={post.imageAlt}
          title={post.title}
          size="story"
          align="bottom"
          imageItemProp="image"
        >
          <div className="mx-auto max-w-4xl text-center">
            <h1
              className="font-serif text-3xl font-medium leading-tight tracking-tight text-white drop-shadow-sm sm:text-4xl lg:text-5xl xl:text-6xl"
              itemProp="headline"
            >
              {post.title}
            </h1>
            <p className="mt-4 text-sm font-light text-white/80 sm:text-base">
              By {post.author} &nbsp;·&nbsp;{" "}
              <time dateTime={post.dateIso}>{post.date}</time>
            </p>
          </div>
        </PageHero>

        {/* ── Two-column layout: article + sidebar ───────────────────────── */}
        <div className="mx-auto max-w-6xl px-6 py-14 sm:px-10 lg:flex lg:gap-16 lg:px-16 xl:px-20">

          {/* ── Main article column ──────────────────────────────────────── */}
          <div className="min-w-0 flex-1">

            {/* Author + date */}
            <header className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-zinc-100 pb-8">
              <div className="flex items-center gap-2 text-sm text-zinc-500">
                <User className="h-4 w-4 text-zinc-400" aria-hidden="true" />
                <span itemProp="author">{post.author}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-500">
                <Calendar className="h-4 w-4 text-zinc-400" aria-hidden="true" />
                <time dateTime={post.dateIso} itemProp="datePublished">
                  {post.date}
                </time>
              </div>
            </header>

            {/* Lead / excerpt */}
            <p className="mb-8 text-lg font-light leading-relaxed text-zinc-700 sm:text-xl" itemProp="description">
              {post.excerpt}
            </p>

            {/* Article paragraphs */}
            <div itemProp="articleBody">
              {post.content.map((paragraph, i) => (
                <p key={i} className="mb-6 text-base leading-[1.9] text-zinc-600 font-light">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* ── Sidebar: other stories ───────────────────────────────────── */}
          {otherPosts.length > 0 && (
          <aside
            className="mt-14 shrink-0 lg:mt-0 lg:w-72 xl:w-80"
            aria-label="Other stories"
          >
            <div>
              <h2 className="mb-6 font-serif text-xl font-medium tracking-tight text-zinc-900">
                More stories
              </h2>
              <nav aria-label="Stories navigation">
                <ul className="space-y-4" role="list">
                  {otherPosts.map((other) => {
                    return (
                      <li key={other.slug}>
                        <Link
                          href={other.href}
                          className="group flex gap-4 rounded-2xl p-3 transition-colors duration-200 hover:bg-zinc-50"
                        >
                          {/* Thumbnail */}
                          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-zinc-100">
                            <Image
                              src={other.image}
                              alt={other.imageAlt}
                              fill
                              loading="lazy"
                              className="object-cover"
                              sizes="64px"
                            />
                          </div>
                          {/* Text */}
                          <div className="flex min-w-0 flex-col justify-center">
                            <p className="text-xs font-light text-zinc-400">
                              {other.date}
                            </p>
                            <p className="mt-0.5 line-clamp-2 text-sm font-medium leading-snug text-zinc-700 transition-colors duration-200 group-hover:text-primary">
                              {other.title}
                            </p>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </aside>
          )}

        </div>
      </article>
    </>
  );
}
