/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [`cdn.iwantalipstick.com`],
    formats: [`image/avif`, `image/webp`],
    // unoptimized: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === `development` ? false : true,
  },
  // trailingSlash: true,
  // assetPrefix: `./`,
  // basePath: "/web/channel/tpal/v1", // 20221026

  // distDir: "build",
  // generateBuildId: async () => {
  //   // You can, for example, get the latest git commit hash here
  //   return "20221026";
  // },
};

module.exports = nextConfig;
