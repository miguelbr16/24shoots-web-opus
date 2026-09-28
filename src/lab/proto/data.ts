import frames from "./frames.generated.json";
import { cases, caseMedia } from "@/content/cases";
import { href } from "@/lib/i18n";
import { img } from "@/lib/media";

/**
 * LAB ONLY — shared material for the /lab/a|d|e prototypes.
 * The same 24 real frames (see scripts/lab/frames.mjs) feed all three directions,
 * so the comparison is about the experience, not the assets.
 */

type Img = { src: string; srcSet?: string; sizes?: string };

export interface ProtoFrame {
  n: number;
  slug: string;
  client: string;
  title: string;
  kind: string;
  when?: string;
  with?: string;
  alt: string;
  /** Focal point (x %) for tall crops. */
  fx: number;
  poster: Img;
  loop: { mp4: string; webm: string };
  chapter: number;
  first: boolean;
  last: boolean;
  url: string;
}

export interface ProtoCase {
  chapter: number;
  slug: string;
  client: string;
  title: string;
  kind: string;
  when?: string;
  with?: string;
  url: string;
  film: string;
  cover: Img;
  frames: number[];
}

const pad = (n: number) => String(n).padStart(2, "0");
const order = [...new Set(frames.map((f) => f.slug))];

export function protoFrames(sizes = "100vw"): ProtoFrame[] {
  return frames.map((f, i) => {
    const k = cases.find((c) => c.slug === f.slug)!;
    const prev = frames[i - 1];
    const next = frames[i + 1];
    return {
      n: f.n,
      slug: f.slug,
      client: k.client,
      title: k.title.es,
      kind: k.kind.es,
      when: k.when?.es,
      with: k.with,
      alt: k.stillAlts.es[f.still - 1] ?? "",
      fx: f.fx,
      poster: img(`/lab-media/${pad(f.n)}.jpg`, 1600, 900, sizes, 72),
      loop: { mp4: `/lab-media/${pad(f.n)}.mp4`, webm: `/lab-media/${pad(f.n)}.webm` },
      chapter: order.indexOf(f.slug),
      first: !prev || prev.slug !== f.slug,
      last: !next || next.slug !== f.slug,
      url: href.case("es", f.slug),
    };
  });
}

export function protoCases(): ProtoCase[] {
  return order.map((slug, chapter) => {
    const k = cases.find((c) => c.slug === slug)!;
    const m = caseMedia(k.slug);
    return {
      chapter,
      slug,
      client: k.client,
      title: k.title.es,
      kind: k.kind.es,
      when: k.when?.es,
      with: k.with,
      url: href.case("es", slug),
      film: m.film,
      cover: img(m.cover, 1920, 1080, "(min-width: 768px) 70vw, 100vw"),
      frames: frames.filter((f) => f.slug === slug).map((f) => f.n),
    };
  });
}

/** Copy already approved for the site (src/content/copy.ts). Nothing new is claimed. */
export const protoCopy = {
  descriptor: "Estudio creativo de contenido y comunicación visual para marcas",
  line1: "Un evento termina.",
  line2: "El contenido continúa.",
  closing: "¿Tienes algo que contar?",
  closing24: "¿Qué cuentas tú en los próximos 24?",
  cta: "Hablemos",
  email: "info@24shoots.es",
  territories: [
    { label: "Eventos corporativos", href: "/servicios/eventos-corporativos" },
    { label: "Contenido de marca", href: "/servicios/contenido-de-marca" },
    { label: "Campañas", href: "/servicios/campanas" },
  ],
};
