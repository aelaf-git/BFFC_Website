import type { MetadataRoute } from "next";
import { brand } from "@/lib/brand";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.title,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: brand.colors.accent,
    lang: siteConfig.language,
  };
}
