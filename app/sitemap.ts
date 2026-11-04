import type { MetadataRoute } from "next";

const BASE_URL = "https://tmcwd.gov.ph";

// Known transparency slug pages — must match actual routes in app/transparency/[slug]/
// Note: /transparency/seal/ and /transparency/bidding/ are listed in staticRoutes above.
const transparencySlugs = [
  "foi",
  "citizens-charter",
];

// Known service slug pages
const serviceSlugs = [
  "new-water-application",
  "meter-reading",
  "payment",
  "change-ball-valve",
  "leak-repair",
  "water-supply",
  "temporary-disconnection",
  "reconnection",
  "change-name-address",
  "change-meter",
  "senior-citizen-discount",
  "feedback",
];

// Frequently updated pages use new Date() so the sitemap signals freshness.
// Static/evergreen pages use a fixed last-modified date — crawlers use this
// signal to prioritise re-crawling, so lying hurts SEO.
const NOW        = new Date();
const LAST_YEAR  = new Date("2025-11-01");
const LAST_MONTH = new Date("2026-10-01");

export default function sitemap(): MetadataRoute.Sitemap {
  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: NOW,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about/`,
      lastModified: LAST_YEAR,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact/`,
      lastModified: LAST_YEAR,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/news/`,
      lastModified: NOW,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/events/`,
      lastModified: NOW,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/gallery/`,
      lastModified: NOW,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/transparency/seal/`,
      lastModified: LAST_MONTH,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/transparency/`,
      lastModified: LAST_MONTH,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/transparency/bidding/`,
      lastModified: NOW,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/online-bill-inquiry/`,
      lastModified: LAST_YEAR,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/online-bill-inquiry/how-to-pay/`,
      lastModified: LAST_YEAR,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/online-bill-inquiry/soa/`,
      lastModified: LAST_YEAR,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // Transparency slug routes
  const transparencyRoutes: MetadataRoute.Sitemap = transparencySlugs.map(
    (slug) => ({
      url: `${BASE_URL}/transparency/${slug}/`,
      lastModified: LAST_YEAR,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })
  );

  // Service slug routes
  const serviceRoutes: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${BASE_URL}/services/${slug}/`,
    lastModified: LAST_YEAR,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...transparencyRoutes, ...serviceRoutes];
}
