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
  trailingSlash: true,
  basePath: "/webs/gpbox/v5",
};

module.exports = nextConfig;
