import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://ishant.in";
  const lastMod = new Date();
  return [
    {
      url: base,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${base}/#about`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/#experience`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/#skills`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/#projects`,
      lastModified: lastMod,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/#contact`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
