import type { Metadata } from "next";
import { createElement } from "react";
import { ogLocale, type L, type Locale } from "./i18n";
import { absoluteUrl, site } from "./site";
import { copy } from "@/content/copy";

interface PageMeta {
  locale: Locale;
  title: string;
  description: string;
  /** Public path of this page in each language. */
  paths: L;
  image?: string;
  imageAlt?: string;
  noindex?: boolean;
  /** Use the title as-is (home) instead of appending the brand. */
  absoluteTitle?: boolean;
}

export function pageMetadata({ locale, title, description, paths, image, imageAlt, noindex, absoluteTitle }: PageMeta): Metadata {
  const url = absoluteUrl(paths[locale]);
  const fullTitle = absoluteTitle ? title : `${title} — 24SHOOTS`;
  const img = image ?? "/og/default.jpg";
  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
      languages: { es: absoluteUrl(paths.es), en: absoluteUrl(paths.en), "x-default": absoluteUrl(paths.es) },
    },
    openGraph: {
      type: "website",
      siteName: "24SHOOTS",
      title: fullTitle,
      description,
      url,
      locale: ogLocale[locale],
      alternateLocale: ogLocale[locale === "es" ? "en" : "es"],
      images: [{ url: img, width: 1200, height: 630, alt: imageAlt ?? "24SHOOTS" }],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [img] },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

export function JsonLd({ data }: { data: object | object[] }) {
  return createElement("script", {
    type: "application/ld+json",
    dangerouslySetInnerHTML: { __html: JSON.stringify(data).replace(/</g, "\\u003c") },
  });
}

const ORG_ID = `${site.url}/#organization`;

export function organizationJsonLd(locale: Locale) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": ORG_ID,
      name: site.name,
      alternateName: "24SHOOTS Media",
      url: site.url,
      logo: absoluteUrl("/icon-512.png"),
      image: absoluteUrl("/og/default.jpg"),
      description: copy[locale].meta.orgDescription,
      email: site.contact.email,
      telephone: site.contact.phone,
      address: { "@type": "PostalAddress", addressLocality: "Valencia", addressRegion: "Comunidad Valenciana", addressCountry: "ES" },
      areaServed: { "@type": "Country", name: "España" },
      knowsAbout: ["Vídeo corporativo", "Fotografía de eventos", "Contenido de marca", "Producción audiovisual", "Campañas"],
      sameAs: [site.contact.instagram],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      inLanguage: ["es-ES", "en"],
      publisher: { "@id": ORG_ID },
    },
  ];
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absoluteUrl(it.path) })),
  };
}

export function serviceJsonLd({ name, description, path, locale }: { name: string; description: string; path: string; locale: Locale }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absoluteUrl(path),
    inLanguage: locale === "es" ? "es-ES" : "en",
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "City", name: "Valencia" },
  };
}

/** ISO-8601 duration from seconds. */
const isoDuration = (s: number) => `PT${Math.floor(s / 60)}M${Math.round(s % 60)}S`;

export function videoJsonLd(v: { name: string; description: string; thumbnail: string; contentUrl: string; duration: number; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: v.name,
    description: v.description,
    thumbnailUrl: [absoluteUrl(v.thumbnail)],
    uploadDate: `${site.filmsPublished}T00:00:00+02:00`,
    duration: isoDuration(v.duration),
    contentUrl: absoluteUrl(v.contentUrl),
    embedUrl: absoluteUrl(v.path),
    publisher: { "@id": ORG_ID },
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}
