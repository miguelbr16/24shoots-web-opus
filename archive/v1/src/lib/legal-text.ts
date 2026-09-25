import { getPages, getSiteConfig } from "./content";
import type { Locale } from "./types";

type LegalKey = "notice" | "privacy" | "cookies";

export function resolveLegalContent(locale: Locale, key: LegalKey) {
  const pages = getPages(locale);
  const site = getSiteConfig();
  const { title, content } = pages.legal[key];
  const lastUpdated =
    site.legal.lastUpdated?.[locale] ??
    (locale === "es" ? "julio de 2026" : "July 2026");

  const resolved = content
    .replace(/\[RAZÓN SOCIAL\]/g, site.legal.companyName)
    .replace(/\[COMPANY LEGAL NAME\]/g, site.legal.companyName)
    .replace(/\[CIF\]/g, site.legal.cif)
    .replace(/\[TAX ID\]/g, site.legal.cif)
    .replace(/\[DIRECCIÓN FISCAL\]/g, site.legal.address)
    .replace(/\[REGISTERED ADDRESS\]/g, site.legal.address)
    .replace(/\[FECHA\]/g, lastUpdated)
    .replace(/\[DATE\]/g, lastUpdated)
    .replace(/hola@24shootsmedia\.com/g, site.contact.email);

  return { title, content: resolved };
}
