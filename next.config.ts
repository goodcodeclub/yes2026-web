import type { NextConfig } from "next";

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
};

export default nextConfig;
