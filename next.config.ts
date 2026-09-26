import type { NextConfig } from "next";

/**
 * Routing: Spanish is served at the root (/trabajo), English under /en (/en/work).
 * Internally every page lives in app/[locale]; a rewrite maps root paths to /es.
 * All V1 URLs (/es/..., /en/portfolio, old service slugs, packs…) redirect permanently.
 */

const esOld: Record<string, string> = {
  portfolio: "/trabajo",
  servicios: "/servicios",
  services: "/servicios",
  "sobre-nosotros": "/estudio",
  about: "/estudio",
  contacto: "/contacto",
  contact: "/contacto",
  packs: "/packs",
  "aviso-legal": "/aviso-legal",
  "legal-notice": "/aviso-legal",
  privacidad: "/privacidad",
  privacy: "/privacidad",
  cookies: "/cookies",
};
const enOld: Record<string, string> = {
  portfolio: "/en/work",
  servicios: "/en/services",
  "sobre-nosotros": "/en/studio",
  about: "/en/studio",
  contacto: "/en/contact",
  "aviso-legal": "/en/legal-notice",
  privacidad: "/en/privacy",
};

// V1 service slugs (ES and EN) → V2 areas
const oldServices: Record<string, [string, string]> = {
  "eventos-corporativos": ["eventos-corporativos", "corporate-events"],
  "corporate-events": ["eventos-corporativos", "corporate-events"],
  "contenido-marca": ["contenido-de-marca", "brand-content"],
  "brand-content": ["contenido-de-marca", "brand-content"],
  "campanas-pago": ["campanas", "campaigns"],
  "paid-campaigns": ["campanas", "campaigns"],
  "documental-reportaje": ["contenido-de-marca", "brand-content"],
  "documentary-b2b": ["contenido-de-marca", "brand-content"],
  "produccion-aerea-dron": ["", ""],
  "aerial-drone": ["", ""],
  "videoclip-musical": ["", ""],
  "music-video": ["", ""],
  "bodas-celebraciones": ["", ""],
  "weddings-celebrations": ["", ""],
  "fiestas-aftermovies": ["", ""],
  "parties-aftermovies": ["", ""],
  "fallas-tradicion": ["", ""],
  "fallas-valencia": ["", ""],
  "proyectos-personalizados": ["", ""],
  "custom-projects": ["", ""],
};

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [390, 640, 828, 1080, 1280, 1600, 1920, 2560],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async redirects() {
    const r: { source: string; destination: string; permanent: true }[] = [];
    const p = (source: string, destination: string) => {
      if (source !== destination) r.push({ source, destination, permanent: true });
    };

    for (const [slug, [es, en]] of Object.entries(oldServices)) {
      for (const seg of ["servicios", "services"]) {
        p(`/es/${seg}/${slug}`, es ? `/servicios/${es}` : "/servicios");
        p(`/en/${seg}/${slug}`, en ? `/en/services/${en}` : "/en/services");
      }
    }
    for (const [from, to] of Object.entries(esOld)) p(`/es/${from}`, to);
    for (const [from, to] of Object.entries(enOld)) p(`/en/${from}`, to);
    // V1 paths that some links may use without the /es prefix
    p("/portfolio", "/trabajo");
    p("/sobre-nosotros", "/estudio");
    p("/about", "/estudio");
    for (const old of ["bodas", "fallas", "fiestas", "aftermovies", "presupuesto"]) p(`/${old}`, "/servicios");
    p("/en/legal", "/en/legal-notice");
    p("/favicon.ico", "/icon.svg");
    p("/es", "/");
    p("/es/:path*", "/:path*");
    return r;
  },
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [
        { source: "/", destination: "/es" },
        // Everything that is not English, an API route or a Next internal is Spanish.
        { source: "/:path((?!en(?:/|$)|api/|_next/|es(?:/|$)).*)", destination: "/es/:path" },
      ],
      fallback: [],
    };
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
        ],
      },
      {
        source: "/media/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }],
      },
      {
        source: "/og/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800" }],
      },
    ];
  },
};

export default nextConfig;
