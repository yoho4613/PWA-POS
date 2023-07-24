/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

module.exports = withPWA({
  reactStrictMode: false,
  images: {
    images: {
      domains: ["pwa-pos.s3.ap-southeast-2.amazonaws.com"],
    },
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pwa-pos.s3.ap-southeast-2.amazonaws.com",
      },
    ],
  },
});
