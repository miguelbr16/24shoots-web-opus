import Image from "next/image";
import Link from "next/link";
import { FilmLoop } from "@/components/FilmLoop";
import { img, preloadPosters } from "@/lib/media";
import { labCopy as c, pick } from "./shared";

/** B — EDITORIAL: paper, type at magazine scale, photographs placed like a spread. */
export function LabB() {
  const h = pick("huhtamaki-50");
  const i = pick("premios-isabel-ferrer");
  const im = pick("imperia-scm");
  const tall = img("/media/hero/poster-4x5.jpg", 864, 1080, "(min-width: 768px) 42vw, 100vw");
  const poster = { wide: tall, tall };
  preloadPosters(poster);

  return (
    <div className="on-paper">
      <section className="wrap relative grid-12 gap-y-6 pt-8 pb-14 md:min-h-[calc(100svh-var(--header-h))] md:pt-10 md:pb-12">
        <p className="t-mono col-span-12 flex justify-between text-soot">
          <span>{c.eyebrow}</span>
          <span className="hidden md:inline">Nº 01 · Temporada 2026</span>
        </p>

        <h1 className="relative z-10 col-span-12 self-start md:col-span-9 md:row-start-2">
          <span className="t-credit block text-[clamp(3.2rem,0.6rem+10.4vw,12.5rem)] leading-[0.84]">{c.line1}</span>
          <span className="t-credit block text-[clamp(3.2rem,0.6rem+10.4vw,12.5rem)] leading-[0.84] text-rec-deep">{c.line2}</span>
        </h1>

        <figure className="relative col-span-10 col-start-3 md:absolute md:right-[var(--gutter)] md:top-[18%] md:w-[34vw] md:max-w-[34rem]">
          <FilmLoop
            poster={poster}
            sources={{ wide: { webm: "/media/hero/hero-4x5.webm", mp4: "/media/hero/hero-4x5.mp4" }, tall: { webm: "/media/hero/hero-4x5.webm", mp4: "/media/hero/hero-4x5.mp4" } }}
            priority
            className="aspect-[4/5] w-full"
          />
          <figcaption className="t-mono mt-2 text-soot">Fig. 01 — Cinco proyectos, un montaje</figcaption>
        </figure>

        <div className="col-span-12 flex flex-col gap-6 md:col-span-5 md:row-start-3 md:self-end">
          <p className="t-lead max-w-[34ch]">{c.lead}</p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link href="/contacto" className="cta-slab">
              <span>{c.cta}</span>
              <span aria-hidden>→</span>
            </Link>
            <Link href="/trabajo" className="link">{c.secondary}</Link>
          </div>
        </div>
      </section>

      <section aria-label="Trabajo seleccionado" className="rule-t py-14 md:py-24">
        <div className="wrap">
          <p className="t-mono flex justify-between text-soot">
            <span>Trabajo seleccionado</span>
            <span>3 / 5</span>
          </p>
          <div className="grid-12 mt-8 gap-y-8">
            <Link href={i.url} className="group col-span-12 md:col-span-8">
              <div className="relative aspect-[3/2] overflow-hidden bg-ink">
                <Image src={i.m.stills[7]} alt={i.k.stillAlts.es[7]} fill sizes="(min-width: 768px) 66vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
              </div>
              <p className="t-mono mt-2 text-soot">Fig. 02 — {i.k.client}, {i.k.title.es}</p>
            </Link>
            <div className="col-span-12 md:col-span-4 md:pt-6">
              <p className="text-[clamp(1.7rem,1rem+2vw,2.8rem)] leading-[1.05] tracking-tight">“Una gala institucional, contada con calma.”</p>
              <p className="mt-6 max-w-[36ch] text-soot">{i.k.summary.es}</p>
              <Link href={i.url} className="link mt-4 inline-block">Ver proyecto →</Link>
            </div>
            <Link href={h.url} className="group col-span-7 md:col-span-4 md:col-start-2">
              <div className="relative aspect-[4/5] overflow-hidden bg-ink">
                <Image src={h.m.stills[4]} alt={h.k.stillAlts.es[4]} fill sizes="(min-width: 768px) 33vw, 58vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
              </div>
              <p className="t-mono mt-2 text-soot">Fig. 03 — {h.k.client}, {h.k.title.es}</p>
            </Link>
            <Link href={im.url} className="group col-span-12 md:col-span-6 md:col-start-7 md:mt-32">
              <div className="relative aspect-video overflow-hidden bg-ink">
                <Image src={im.m.stills[5]} alt={im.k.stillAlts.es[5]} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
              </div>
              <p className="t-mono mt-2 text-soot">Fig. 04 — {im.k.client}, {im.k.title.es}</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
