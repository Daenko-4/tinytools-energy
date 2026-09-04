import type { MetadataRoute } from "next";

import { devices } from "@/data/devices";

const siteUrl = "https://tinytools-energy.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const devicePages: MetadataRoute.Sitemap = devices.map((device) => ({
    url: `${siteUrl}/geraete/${device.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/geraete`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...devicePages,
    {
      url: `${siteUrl}/impressum`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${siteUrl}/datenschutz`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}