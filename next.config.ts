import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Removed output:"export" — project now deploys as a Vercel serverless app
  // so API routes (e.g. /api/announcements) can run as serverless functions.
  images: {
    // Facebook CDN (fbcdn.net) and rss.app images used in announcement feeds
    remotePatterns: [
      { protocol: "https", hostname: "**.fbcdn.net" },
      { protocol: "https", hostname: "**.facebook.com" },
    ],
  },
  trailingSlash: true,
  // Local dev: allow requests from LAN IP
  allowedDevOrigins: ["192.168.1.189"],
};

export default nextConfig;