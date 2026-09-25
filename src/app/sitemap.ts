import type { MetadataRoute } from "next";
import { cases } from "@/content/cases";
import { href, serviceSlugs, type Locale, type PageKey } from "@/lib/i18n";
import { absoluteUrl, site } from "@/lib/site";

type Entry = { es: string; en: string; priority: number };

export default function sitemap(): MetadataRoute.Sitemap {
  const both = (f: (l: Locale) => string, priority: number): Entry => ({ es: f("es"), en: f("en"), priority });
  const pages: Entry[] = [
    both((l) => href.home(l), 1),
    ...(["work", "services", "studio", "contact"] as PageKey[]).map((k) => both((l) => href.page(l, k), 0.8)),
    ...cases.map((c) => both((l) => href.case(l, c.slug), 0.7)),
    ...Object.values(serviceSlugs).map((s) => both((l) => href.service(l, s[l]), 0.8)),
  ];
  const lastModified = new Date(site.contentUpdated);
  return pages.flatMap((p) =>
    (["es", "en"] as Locale[]).map((l) => ({
      url: absoluteUrl(p[l]),
      lastModified,
      priority: l === "es" ? p.priority : Math.round(p.priority * 0.8 * 10) / 10,
      alternates: { languages: { es: absoluteUrl(p.es), en: absoluteUrl(p.en), "x-default": absoluteUrl(p.es) } },
    }))
  );
}
