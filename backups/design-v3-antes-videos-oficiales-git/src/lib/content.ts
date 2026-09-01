import siteConfig from "../../config/site.json";
import servicesEs from "../../content/es/services.json";
import servicesEn from "../../content/en/services.json";
import portfolioEs from "../../content/es/portfolio.json";
import portfolioEn from "../../content/en/portfolio.json";
import pagesEs from "../../content/es/pages.json";
import pagesEn from "../../content/en/pages.json";
import instagramEs from "../../content/es/instagram.json";
import instagramEn from "../../content/en/instagram.json";
import type {
  Locale,
  InstagramPost,
  PagesContent,
  PortfolioItem,
  Service,
  SiteConfig,
} from "./types";

const servicesByLocale: Record<Locale, Service[]> = {
  es: servicesEs as Service[],
  en: servicesEn as Service[],
};

const portfolioByLocale: Record<Locale, PortfolioItem[]> = {
  es: portfolioEs as PortfolioItem[],
  en: portfolioEn as PortfolioItem[],
};

const pagesByLocale: Record<Locale, PagesContent> = {
  es: pagesEs as PagesContent,
  en: pagesEn as PagesContent,
};

const instagramByLocale: Record<Locale, InstagramPost[]> = {
  es: instagramEs as InstagramPost[],
  en: instagramEn as InstagramPost[],
};

export function getSiteConfig(): SiteConfig {
  return siteConfig as SiteConfig;
}

export function getServices(locale: Locale): Service[] {
  return servicesByLocale[locale];
}

export function getServiceBySlug(
  locale: Locale,
  slug: string
): Service | undefined {
  return getServices(locale).find((s) => s.slug === slug);
}

export function getPortfolio(locale: Locale): PortfolioItem[] {
  return portfolioByLocale[locale];
}

export function getPages(locale: Locale): PagesContent {
  return pagesByLocale[locale];
}

export function getInstagramPosts(locale: Locale): InstagramPost[] {
  return instagramByLocale[locale];
}

export function getAlternateLocale(locale: Locale): Locale {
  return locale === "es" ? "en" : "es";
}
