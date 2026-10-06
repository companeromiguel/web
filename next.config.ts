import type { NextConfig } from "next";

const securityHeaders = [
  // Prevents the browser from guessing the content type (MIME sniffing attacks)
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // Blocks the site from being embedded in iframes on other domains (clickjacking)
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  // Forces HTTPS for 2 years, includes subdomains (HSTS)
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Controls how much referrer info is sent with requests
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // Restricts access to browser features (camera, mic, geolocation, etc.)
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  // Enables XSS filtering in older browsers
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  // Content Security Policy — restricts where scripts, styles, images, etc. can load from
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Scripts: self + Next.js inline scripts (unsafe-inline needed for Next.js hydration)
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      // Styles: self + inline styles (Tailwind/CSS-in-JS needs unsafe-inline)
      "style-src 'self' 'unsafe-inline'",
      // Images: self + Facebook CDN (used in announcement feeds) + data URIs
      "img-src 'self' data: https://*.fbcdn.net https://*.facebook.com",
      // Fonts: self
      "font-src 'self'",
      // API calls: self + Facebook (RSS feeds)
      "connect-src 'self'",
      // No plugins (Flash, etc.)
      "object-src 'none'",
      // Base tag restricted to self
      "base-uri 'self'",
      // Forms only submit to self
      "form-action 'self'",
      // Iframes: none
      "frame-ancestors 'none'",
    ].join("; "),
  },
];

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
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;