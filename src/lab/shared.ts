import { cases, caseMedia, heroMedia } from "@/content/cases";
import { href } from "@/lib/i18n";

/** Lab copy (ES) shared by the three explorations so only the visual language differs. */
export const labCopy = {
  eyebrow: "24SHOOTS — Estudio creativo · Valencia",
  line1: "Un evento termina.",
  line2: "El contenido continúa.",
  lead: "Estudio creativo de contenido y comunicación visual para marcas. Eventos corporativos, contenido de marca y campañas: lo pensamos, lo rodamos y lo montamos.",
  cta: "Cuéntanos tu proyecto",
  secondary: "Ver el trabajo",
  labels: { pause: "Pausar", play: "Reproducir", shot: "Plano", view: "Ver proyecto" },
};

export const picks = ["huhtamaki-50", "premios-isabel-ferrer", "imperia-scm"] as const;

export const pick = (slug: (typeof picks)[number]) => {
  const k = cases.find((c) => c.slug === slug)!;
  const m = caseMedia(k.slug);
  return { k, m, url: href.case("es", k.slug) };
};

export const heroSegments = () =>
  heroMedia.segments.map((slug) => {
    const k = cases.find((x) => x.slug === slug)!;
    return { client: k.client, title: k.title.es, href: href.case("es", k.slug) };
  });
