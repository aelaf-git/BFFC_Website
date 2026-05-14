import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Multiple lockfiles (e.g. ~/package-lock.json + apps/web/package-lock.json) make Next
  // guess the workspace root; pin it to this app so Turbopack and tracing stay correct.
  turbopack: {
    root: projectRoot,
  },
  outputFileTracingRoot: projectRoot,
};

export default nextConfig;
