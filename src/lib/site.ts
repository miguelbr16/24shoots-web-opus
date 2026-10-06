/**
 * Site-wide facts. Everything here must be true or explicitly marked as pending.
 * Pending items are listed in docs/V2-PENDIENTES.md.
 */
export const site = {
  name: "24SHOOTS",
  /** Canonical origin. Set SITE_URL in Vercel once the domain is live. */
  url: (process.env.SITE_URL || "https://24shoots.es").replace(/\/$/, ""),
  city: { es: "Valencia", en: "Valencia" },
  country: "ES",
  contact: {
    email: "info@24shoots.es",
    /** Confirmed by 24SHOOTS (06-10-2026). */
    phone: "+34661101863",
    phoneDisplay: "+34 661 101 863",
    instagram: "https://www.instagram.com/24shootsmedia/",
    instagramHandle: "@24shootsmedia",
  },
  legal: {
    /** Holder and taxId confirmed by 24SHOOTS (06-10-2026). PENDING: fiscal address. */
    holder: "Javier Renovell" as string | null,
    taxId: "26761401G",
    address: null as string | null,
    updated: { es: "septiembre de 2026", en: "September 2026" },
  },
  /** Date the films were first published on the site (git: 2026-09-01). Used as VideoObject.uploadDate. */
  filmsPublished: "2026-09-01",
  /** Last meaningful content update, used for sitemap lastModified. */
  contentUpdated: "2026-09-25",
} as const;

/**
 * Index only the production deployment; previews stay out of search engines.
 * Provider-neutral: SITE_ENV=production (Cloudflare or any host) wins; Vercel sets VERCEL_ENV.
 */
export const isIndexable = process.env.SITE_ENV
  ? process.env.SITE_ENV === "production"
  : process.env.VERCEL_ENV
    ? process.env.VERCEL_ENV === "production"
    : process.env.NODE_ENV === "production";

export const absoluteUrl = (path: string) => (/^https?:\/\//.test(path) ? path : `${site.url}${path === "/" ? "" : path}`);
