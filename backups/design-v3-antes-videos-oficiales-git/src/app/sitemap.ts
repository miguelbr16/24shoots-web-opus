import type { MetadataRoute } from "next";
import { getServices, getSiteConfig } from "@/lib/content";
import { getRoute } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getSiteConfig();
  const base = site.url;
  const locales: Locale[] = ["es", "en"];
  const staticRoutes = [
    "home",
    "services",
    "portfolio",
    "about",
    "contact",
    "legal",
    "privacy",
    "cookies",
  ] as const;

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const key of staticRoutes) {
      const path = key === "home" ? `/${locale}` : getRoute(locale, key);
      entries.push({
        url: `${base}${path}`,
        lastModified: new Date(),
        changeFrequency: key === "home" ? "weekly" : "monthly",
        priority: key === "home" ? 1 : 0.8,
      });
    }

    const services = getServices(locale);
    const servicesBase = getRoute(locale, "services");
    for (const service of services) {
      entries.push({
        url: `${base}${servicesBase}/${service.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
