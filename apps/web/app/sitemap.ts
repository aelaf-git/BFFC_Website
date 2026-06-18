import type { MetadataRoute } from "next";
import { featuredPosts } from "@/lib/blog-posts";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = siteConfig.routes.map((route) => ({
    url: `${siteConfig.url}${route.path === "/" ? "" : route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const storyRoutes = featuredPosts.map((post) => ({
    url: `${siteConfig.url}${post.href}`,
    lastModified: new Date(post.dateIso),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...staticRoutes, ...storyRoutes];
}
