/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development", // Disable PWA in dev mode
});
const nextConfig = withPWA({
  reactStrictMode: false, // Keep your setting
});

module.exports = nextConfig;