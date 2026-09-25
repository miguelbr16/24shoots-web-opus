import type { Locale } from "./types";

export const locales: Locale[] = ["es", "en"];
export const defaultLocale: Locale = "es";

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

const routeMap = {
  es: {
    services: "servicios",
    portfolio: "portfolio",
    about: "sobre-nosotros",
    contact: "contacto",
    packs: "packs",
    legal: "aviso-legal",
    privacy: "privacidad",
    cookies: "cookies",
  },
  en: {
    services: "services",
    portfolio: "portfolio",
    about: "about",
    contact: "contact",
    packs: "packs",
    legal: "legal-notice",
    privacy: "privacy",
    cookies: "cookies",
  },
} as const;

export type RouteKey = keyof typeof routeMap.es;

export function getRoute(locale: Locale, key: RouteKey): string {
  return `/${locale}/${routeMap[locale][key]}`;
}

export function getHomeRoute(locale: Locale): string {
  return `/${locale}`;
}
