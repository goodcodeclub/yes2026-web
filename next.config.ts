import type { NextConfig } from "next";
const isProd = process.env.NODE_ENV === "production";
const repoBasePath = isProd ? "" : "";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_BASE_PATH: repoBasePath,
  },
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
  basePath: repoBasePath,
  assetPrefix: repoBasePath ? `${repoBasePath}/` : "",
};

export default nextConfig;
