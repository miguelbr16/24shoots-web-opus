import Image from "next/image";
import Link from "next/link";
import { FilmLoop } from "@/components/FilmLoop";
import { heroFilm, preloadPosters } from "@/lib/media";
import { heroMedia } from "@/content/cases";
import { heroSegments, labCopy as c, pick } from "./shared";

/** C — 24: the name is the window. Footage seen through the numerals; the work as 24 frames. */
export function LabC() {
  const hero = heroFilm();
  preloadPosters(hero.poster);
  const groups = (["huhtamaki-50", "premios-isabel-ferrer", "imperia-scm"] as const).map(pick);
  const frames = groups.flatMap((g) => g.m.stills.slice(0, 8).map((src, j) => ({ src, alt: g.k.stillAlts.es[j], g })));

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="relative h-[62svh] md:h-[calc(100svh-var(--header-h)-9rem)] md:min-h-[26rem]">
          <FilmLoop {...hero} priority className="absolute inset-0" segments={heroSegments()} shot={heroMedia.shot} slate="none" labels={c.labels} />
          {/* Knockout: only the numerals let the footage through */}
          <div className="knockout absolute inset-0 flex items-center justify-center" aria-hidden>
            <span className="t-credit select-none text-[min(88vw,74svh)] leading-[0.78] md:text-[min(62vw,calc(100svh-15rem))]">24</span>
          </div>
        </div>
        <div className="wrap grid-12 items-end gap-y-6 pt-6 pb-10 md:pt-8">
          <h1 className="col-span-12 md:col-span-7">
            <span className="sr-only">24SHOOTS — </span>
            <span className="t-credit block text-[clamp(2.6rem,1rem+5vw,6.4rem)]">
              {c.line1} <span className="text-rec">{c.line2}</span>
            </span>
          </h1>
          <div className="col-span-12 md:col-span-5">
            <p className="max-w-[40ch] text-ash">{c.lead}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link href="/contacto" className="cta-slab">
                <span>{c.cta}</span>
                <span aria-hidden>→</span>
              </Link>
              <Link href="/trabajo" className="link">{c.secondary}</Link>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="c-work" className="rule-t py-12 md:py-20">
        <div className="wrap">
          <div className="flex items-baseline justify-between gap-6">
            <h2 id="c-work" className="t-credit text-[clamp(2.2rem,1rem+3.6vw,4.8rem)]">24 planos. Tres proyectos.</h2>
            <Link href="/trabajo" className="link t-mono shrink-0">Los cinco →</Link>
          </div>
          <ol className="mt-8 grid grid-cols-4 gap-1 md:grid-cols-8">
            {frames.map((f, n) => (
              <li key={f.src}>
                <Link href={f.g.url} className="group block">
                  <span className="relative block aspect-[4/5] overflow-hidden bg-ink-2 md:aspect-video">
                    <Image src={f.src} alt={f.alt} fill sizes="(min-width: 768px) 12vw, 25vw" quality={60} className="object-cover transition-opacity group-hover:opacity-80" />
                  </span>
                  <span className="t-mono mt-1 block text-[0.62rem] text-ash">{String(n + 1).padStart(2, "0")}</span>
                </Link>
              </li>
            ))}
          </ol>
          <ul className="mt-6 grid gap-2 md:grid-cols-3">
            {groups.map((g, n) => (
              <li key={g.k.slug} className="rule-t pt-3">
                <Link href={g.url} className="group block">
                  <span className="t-mono text-ash">
                    {String(n * 8 + 1).padStart(2, "0")}–{String(n * 8 + 8).padStart(2, "0")}
                  </span>
                  <span className="t-credit mt-1 block text-[1.8rem] group-hover:text-rec transition-colors">{g.k.client}</span>
                  <span className="text-sm text-ash">{g.k.title.es}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
