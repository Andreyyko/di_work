import type { MetadataRoute } from "next";

const siteUrl = "https://www.rok-mentalhealth.com";

const staticPublicRoutes = [
  "",
  "/about",
  "/faq",
  "/privacy",
  "/terms-of-use",
  "/catalog-methodics",
  "/source-list",
  "/mak-gallery",
  "/mak-cards",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return staticPublicRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
