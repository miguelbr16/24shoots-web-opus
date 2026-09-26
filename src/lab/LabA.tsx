import Image from "next/image";
import Link from "next/link";
import { FilmLoop } from "@/components/FilmLoop";
import { caseFilm, heroFilm, preloadPosters } from "@/lib/media";
import { heroMedia } from "@/content/cases";
import { heroSegments, labCopy as c, pick } from "./shared";

/** A — SECUENCIA: the footage owns the screen; type arrives like titles on film. */
export function LabA() {
  const hero = heroFilm();
  preloadPosters(hero.poster);
  const h = pick("huhtamaki-50");
  const i = pick("premios-isabel-ferrer");
  const im = pick("imperia-scm");
  const hFilm = caseFilm(h.m.cover, h.m.preview);

  return (
    <>
      <section className="relative -mt-[var(--header-h)] h-[100svh] min-h-[36rem]">
        <FilmLoop {...hero} priority className="absolute inset-0" segments={heroSegments()} shot={heroMedia.shot} slate="bottom" labels={c.labels} />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(14,13,12,.88)_0%,rgba(14,13,12,.55)_32%,rgba(14,13,12,0)_62%)]" aria-hidden />
        <div className="wrap absolute inset-x-0 bottom-20 md:bottom-24">
          <p className="t-mono text-bone/75">{c.eyebrow}</p>
          <h1 className="mt-4">
            <span className="block text-[clamp(1.4rem,1rem+1.6vw,2.6rem)] font-light leading-tight">{c.line1}</span>
            <span className="t-credit block text-[clamp(3.4rem,1rem+9.5vw,11rem)]">{c.line2}</span>
          </h1>
          <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link href="/contacto" className="cta-slab pointer-events-auto">
              <span>{c.cta}</span>
              <span aria-hidden>→</span>
            </Link>
            <Link href="/trabajo" className="link pointer-events-auto hidden text-bone sm:inline">
              {c.secondary}
            </Link>
          </div>
        </div>
      </section>

      {/* PRUEBA — three moments, three framings */}
      <section aria-label="Trabajo seleccionado" className="pb-16 md:pb-28">
        <Link href={h.url} className="group relative block h-[62svh] md:h-[88svh]">
          <FilmLoop {...hFilm} className="absolute inset-0" alt={h.k.stillAlts.es[9]} />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(14,13,12,.8),rgba(14,13,12,0)_55%)]" aria-hidden />
          <div className="wrap absolute inset-x-0 bottom-6 flex items-end justify-between gap-6 md:bottom-10">
            <div>
              <p className="t-mono text-bone/75">01 · {h.k.kind.es} · {h.k.when?.es}</p>
              <p className="t-credit mt-2 text-[clamp(3rem,1rem+8vw,9.5rem)] group-hover:text-rec transition-colors">{h.k.client}</p>
              <p className="t-h3">{h.k.title.es}</p>
            </div>
            <span className="t-mono hidden text-bone md:inline">Ver la película →</span>
          </div>
        </Link>

        <div className="wrap grid-12 mt-16 items-end gap-y-6 md:mt-28">
          <Link href={i.url} className="group relative col-span-12 -mr-[var(--gutter)] aspect-[4/5] overflow-hidden md:order-2 md:col-span-6 md:col-start-7 md:aspect-[4/5]">
            <Image src={i.m.stills[2]} alt={i.k.stillAlts.es[2]} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
          </Link>
          <div className="col-span-12 md:order-1 md:col-span-5">
            <p className="t-mono text-ash">02 · {i.k.kind.es} · {i.k.when?.es}</p>
            <p className="mt-5 text-[clamp(1.8rem,1rem+2.6vw,3.4rem)] leading-[1.05] tracking-tight">Una gala institucional, contada con calma.</p>
            <Link href={i.url} className="mt-6 block">
              <span className="t-credit block text-[clamp(2rem,1rem+2.8vw,3.6rem)] hover:text-rec transition-colors">{i.k.client}</span>
              <span className="text-ash">{i.k.title.es}</span>
            </Link>
          </div>
        </div>

        <div className="wrap grid-12 mt-16 items-start gap-y-6 md:mt-28">
          <Link href={im.url} className="group relative col-span-12 -ml-[var(--gutter)] aspect-video overflow-hidden md:col-span-8">
            <Image src={im.m.stills[4]} alt={im.k.stillAlts.es[4]} fill sizes="(min-width: 768px) 66vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
          </Link>
          <div className="col-span-12 md:col-span-4 md:pt-24">
            <div className="relative hidden aspect-[4/5] w-2/3 overflow-hidden md:block">
              <Image src={im.m.stills[5]} alt={im.k.stillAlts.es[5]} fill sizes="22vw" className="object-cover" />
            </div>
            <p className="t-mono mt-5 text-ash">03 · {im.k.kind.es}</p>
            <Link href={im.url} className="mt-2 block">
              <span className="t-credit block text-[clamp(2rem,1rem+2.8vw,3.6rem)] hover:text-rec transition-colors">{im.k.client}</span>
              <span className="text-ash">{im.k.title.es}</span>
            </Link>
          </div>
        </div>
        <div className="wrap mt-14 flex justify-end">
          <Link href="/trabajo" className="link">Los cinco proyectos →</Link>
        </div>
      </section>
    </>
  );
}
