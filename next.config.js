/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "development" ? false : true,
  },
  basePath: `/webs/gpbox/v5`,
  trailingSlash: true,

  distDir: "build",
  generateBuildId: async () => {
    // You can, for example, get the latest git commit hash here
    return "20230209";
  },
};

module.exports = nextConfig;
