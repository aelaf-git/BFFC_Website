import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * "standalone" tells Next.js to emit a minimal production bundle under
   * .next/standalone/ (includes server.js + only required node_modules).
   * Our Docker image copies that folder instead of the whole project — smaller, faster deploys.
   * @see https://nextjs.org/docs/app/api-reference/config/next-config-js/output
   */
  output: "standalone",
};

export default nextConfig;
