import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  // Content is served on the www host (ishant.in redirects to it), so the
  // sitemap must list www URLs. Hash-fragment URLs (#about, #contact, ...)
  // resolve to the same page as "/", so they are not listed — Google treats
  // them as duplicates of the root URL.
  const base = "https://www.ishant.in";
  const lastMod = new Date();
  return [
    {
      url: base,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
