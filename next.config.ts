import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/CoachCathyHydrosafe",
  assetPrefix: "/CoachCathyHydrosafe/",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
