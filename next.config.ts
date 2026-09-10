import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    // Required for static export — no server-side image optimization
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
