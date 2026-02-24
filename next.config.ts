import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/coachcathyandHydrosafe",
  assetPrefix: "/coachcathyandHydrosafe/",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
