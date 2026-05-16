import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  description: siteConfig.description,
  path: "/",
});

/** Scroll targets for top-bar section links (content TBD) */
const anchorClass = "scroll-mt-36 lg:scroll-mt-44";

export default function Home() {
  return (
    <div className="flex-1 bg-background" aria-label="Home">
      <div id="about" className={anchorClass} tabIndex={-1} />
      <div id="what-we-do" className={anchorClass} tabIndex={-1} />
      <div id="get-involved" className={anchorClass} tabIndex={-1} />
    </div>
  );
}
