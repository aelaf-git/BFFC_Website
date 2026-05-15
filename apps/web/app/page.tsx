import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  description: siteConfig.description,
  path: "/",
});

export default function Home() {
  return (
    <section className="flex-1 bg-background pt-4" aria-label="Home">
      {/* Page content will be built here */}
    </section>
  );
}
