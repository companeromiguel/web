import type { MetadataRoute } from "next";

const BASE_URL = "https://tmcwd.gov.ph";

// Known transparency slug pages
const transparencySlugs = [
  "seal",
  "foi",
  "citizens-charter",
  "procurement",
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

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/news/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/events/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/gallery/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/board-meetings/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/water-quality/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/transparency/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/transparency/bidding/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/online-bill-inquiry/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/online-bill-inquiry/how-to-pay/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/online-bill-inquiry/soa/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // Transparency slug routes
  const transparencyRoutes: MetadataRoute.Sitemap = transparencySlugs.map(
    (slug) => ({
      url: `${BASE_URL}/transparency/${slug}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })
  );

  // Service slug routes
  const serviceRoutes: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${BASE_URL}/services/${slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...transparencyRoutes, ...serviceRoutes];
}
