/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [`cdn.iwantalipstick.com`],
  },
};

module.exports = nextConfig;
