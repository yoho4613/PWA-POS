/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    i18n: {
      locales: ["en"],
      defaultLocale: "en",
    },
    images: {
      domains: ["pwa-pos.s3.ap-southeast-2.amazonaws.com"],
    },
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.cdninstagram.com",
      },
    ],
  },
});
