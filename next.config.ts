/** @type {import('next').NextConfig} */

const repoName = "coachcathyandHydrosafe";

const nextConfig = {
  output: "export",
  basePath: `/${repoName}`,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;