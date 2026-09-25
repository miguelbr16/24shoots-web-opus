export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export type L<T = string> = Record<Locale, T>;

export const isLocale = (v: string): v is Locale => (locales as readonly string[]).includes(v);

/** Public URL segments per locale. Spanish lives at the root, English under /en. */
const segments = {
  work: { es: "trabajo", en: "work" },
  services: { es: "servicios", en: "services" },
  studio: { es: "estudio", en: "studio" },
  contact: { es: "contacto", en: "contact" },
  legal: { es: "aviso-legal", en: "legal-notice" },
  privacy: { es: "privacidad", en: "privacy" },
  cookies: { es: "cookies", en: "cookies" },
} as const;

export type PageKey = keyof typeof segments;

const prefix = (locale: Locale) => (locale === "es" ? "" : "/en");

export const href = {
  home: (locale: Locale) => (locale === "es" ? "/" : "/en"),
  page: (locale: Locale, key: PageKey) => `${prefix(locale)}/${segments[key][locale]}`,
  case: (locale: Locale, slug: string) => `${prefix(locale)}/${segments.work[locale]}/${slug}`,
  service: (locale: Locale, slug: string) => `${prefix(locale)}/${segments.services[locale]}/${slug}`,
};

/** Service slugs differ per language; case slugs are shared. */
export const serviceSlugs = {
  events: { es: "eventos-corporativos", en: "corporate-events" },
  brand: { es: "contenido-de-marca", en: "brand-content" },
  campaigns: { es: "campanas", en: "campaigns" },
} as const;
export type ServiceKey = keyof typeof serviceSlugs;

export const serviceKeyFromSlug = (locale: Locale, slug: string): ServiceKey | undefined =>
  (Object.keys(serviceSlugs) as ServiceKey[]).find((k) => serviceSlugs[k][locale] === slug);

/**
 * Maps a public pathname to the equivalent page in the other language.
 * Used by the language switcher; falls back to the other home page.
 */
export function alternatePath(pathname: string, to: Locale): string {
  const from: Locale = pathname === "/en" || pathname.startsWith("/en/") ? "en" : "es";
  const rest = (from === "en" ? pathname.slice(3) : pathname).replace(/^\/+|\/+$/g, "");
  if (!rest) return href.home(to);
  const [first, second] = rest.split("/");
  const key = (Object.keys(segments) as PageKey[]).find((k) => segments[k][from] === first);
  if (!key) return href.home(to);
  if (!second) return href.page(to, key);
  if (key === "work") return href.case(to, second);
  if (key === "services") {
    const sk = serviceKeyFromSlug(from, second);
    return sk ? href.service(to, serviceSlugs[sk][to]) : href.page(to, "services");
  }
  return href.page(to, key);
}

export const htmlLang: L = { es: "es-ES", en: "en" };
export const ogLocale: L = { es: "es_ES", en: "en_GB" };
