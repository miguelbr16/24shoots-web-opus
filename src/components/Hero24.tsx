import Link from "next/link";
import { FilmLoop } from "./FilmLoop";
import { CtaSlab } from "./CtaSlab";
import { heroFilm, preloadPosters } from "@/lib/media";
import { cases, heroMedia } from "@/content/cases";
import { t } from "@/content/copy";
import { href, type Locale } from "@/lib/i18n";

/**
 * "Ventana 24": the name is the window. Real footage from five projects plays inside
 * the numerals; scrolling opens the window to full-bleed footage (CSS scroll-driven,
 * progressive enhancement — without support or with reduced motion the window stays).
 */
export function Hero24({ locale }: { locale: Locale }) {
  const c = t(locale).hero;
  const film = heroFilm();
  preloadPosters(film.poster);
  const segments = heroMedia.segments.map((slug) => {
    const k = cases.find((x) => x.slug === slug)!;
    return { client: k.client, title: k.title[locale], href: href.case(locale, k.slug) };
  });

  return (
    <section aria-labelledby="hero-title" className="hero24">
      <div className="hero24-stage">
        <FilmLoop
          {...film}
          priority
          className="absolute inset-0"
          segments={segments}
          shot={heroMedia.shot}
          slate="top"
          labels={{ pause: c.pause, play: c.play, shot: c.shot, view: c.viewCase }}
        />

        {/* Shade that fades in once the window opens, to keep the type legible over footage */}
        <div className="hero24-shade pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(to_top,rgba(14,13,12,.92)_0%,rgba(14,13,12,.6)_38%,rgba(14,13,12,.15)_70%)] opacity-0" aria-hidden />

        {/* The window: black plate, the numerals let the footage through */}
        <div className="hero24-window knockout pointer-events-none absolute inset-0 z-20" aria-hidden>
          <div className="wrap flex h-full items-start justify-center pt-12 lg:items-center lg:justify-start lg:pt-0">
            <span className="hero24-digits t-credit -ml-[0.04em] select-none tracking-[-0.04em]">24</span>
          </div>
        </div>

        <div className="wrap absolute inset-x-0 bottom-0 z-30 pb-6 md:pb-10 lg:grid lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="t-mono text-bone/70">{c.eyebrow}</p>
            <h1 id="hero-title" className="mt-3">
              <span className="block text-[clamp(1.25rem,1rem+1vw,1.9rem)] font-light leading-tight">{c.line1}</span>
              <span className="t-credit block text-[clamp(2.9rem,1.2rem+4.4vw,6.2rem)]">{c.line2}</span>
            </h1>
            <p className="mt-4 max-w-[40ch] text-bone/75 max-sm:text-[0.95rem]">{c.lead}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-3">
              <CtaSlab href={href.page(locale, "contact")}>{c.primary}</CtaSlab>
              <Link href={href.page(locale, "work")} className="link text-bone">
                {c.secondary}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
