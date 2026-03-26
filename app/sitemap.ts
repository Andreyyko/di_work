import type { MetadataRoute } from "next";
import { headingPresets, type HeadingPresetKey } from "@/constant/common/CustomHeadingPreset";

const siteUrl = "https://www.rok-mentalhealth.com";

const staticPublicRoutes = [
  "",
  "/about",
  "/faq",
  "/privacy",
  "/terms-of-use",
  "/source-list",
  "/catalog-methodics",
  "/mak-gallery",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticPublicRoutes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  const sectionSlugs = Object.keys(headingPresets) as HeadingPresetKey[];
  const sectionEntries: MetadataRoute.Sitemap = sectionSlugs.map((slug) => ({
    url: `${siteUrl}/sections/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticEntries, ...sectionEntries];
}
