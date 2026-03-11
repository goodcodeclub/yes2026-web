import type { NextConfig } from "next";
const isProd = process.env.NODE_ENV === "production";
const repoBasePath = isProd ? "/yes2026-web" : "";

const nextConfig: NextConfig = {
  rewrites: async () => [
    {
      source: `/source/:page`,
      destination: `/source/:page/index.html`,
    },
    {
      source: `/source/:page/:page2`,
      destination: `/source/:page/:page2/index.html`,
    },
  ],
  output: "export", // important for GitHub Pages
  basePath: repoBasePath,
  assetPrefix: repoBasePath ? `${repoBasePath}/` : "",
};

export default nextConfig;
