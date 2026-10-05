import Link from "next/link";
import { FilmLoop } from "@/components/FilmLoop";
import { Lines } from "@/components/story/Lines";
import { StoryOpening } from "@/components/story/StoryOpening";
import { StorySteps } from "@/components/story/StorySteps";
import { ChapterRail } from "@/components/story/ChapterRail";
import { cases, caseMedia } from "@/content/cases";
import { t } from "@/content/copy";
import { story } from "@/content/story";
import { href, type Locale } from "@/lib/i18n";
import { caseFilm, img } from "@/lib/media";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const homeMeta = (locale: Locale) =>
  pageMetadata({
    locale,
    title: t(locale).meta.homeTitle,
    description: t(locale).meta.homeDescription,
    paths: { es: "/", en: "/en" },
    absoluteTitle: true,
  });

const pad = (n: number) => String(n).padStart(2, "0");
const caseBy = (slug: string) => cases.find((c) => c.slug === slug)!;

/**
 * Home as a story that ends in a decision:
 * 0 opening (the idea in one image) → 1 the idea → 2 what we do (before/during/after)
 * → 3 one example → 4 trust → 5 how to start. Services and the full portfolio live
 * on their own pages; the home only carries what moves a client towards contacting.
 */
export function Home({ locale }: { locale: Locale }) {
  const s = story(locale);
  const copy = t(locale);
  const huh = caseBy("huhtamaki-50");
  const huhM = caseMedia("huhtamaki-50");
  const inno = caseBy("premios-innovacion-valencia");
  const imp = caseBy("imperia-scm");

  // Art direction: the whole company in front of the building (desktop) / the photocall, people first (mobile).
  const openImg = { wide: img(huhM.stills[9], 1920, 1080, "100vw", 72), tall: img(huhM.stills[1], 1920, 1080, "100vw", 72), alt: s.open.alt };
  const half = "(min-width: 768px) 50vw, 100vw";
  const quarter = "(min-width: 768px) 25vw, 50vw";
  const steps = s.steps.items.map((it, n) => ({
    ...it,
    images:
      n === 0
        ? [{ img: img(caseMedia(inno.slug).stills[3], 1920, 1080, half), alt: inno.stillAlts[locale][3] }]
        : n === 1
          ? [{ img: img(caseMedia(imp.slug).stills[1], 1920, 1080, half), alt: imp.stillAlts[locale][1] }]
          : // contact-sheet frames (sheet index → matching still for the alt text)
            [
              [1, 1],
              [4, 2],
              [7, 5],
              [10, 7],
            ].map(([k, a]) => ({ img: img(huhM.sheet![k], 800, 450, quarter), alt: huh.stillAlts[locale][a] })),
  }));
  const film = caseFilm(huhM.cover, huhM.preview, "(min-width: 768px) 66vw, 100vw");
  const contact = href.page(locale, "contact");

  return (
    <>
      <ChapterRail chapters={s.chapters} />

      <StoryOpening image={openImg} p1={s.open.p1} p2={s.open.p2} p3a={s.open.p3a} p3b={s.open.p3b} scroll={s.open.scroll} descriptor={copy.hero.lead} />

      {/* 01 — the idea */}
      <section className="py-24 md:py-36" data-chapter="1" aria-labelledby="idea-title">
        <div className="wrap grid-12 gap-y-10">
          <p className="t-mono col-span-12 text-ash md:col-span-3">01 — {s.chapters[0]}</p>
          <div className="col-span-12 md:col-span-9">
            <Lines as="h2" id="idea-title" className="t-h1 max-w-[18ch]">
              {[s.idea.title]}
            </Lines>
            <p className="t-lead mt-8 max-w-[46ch] text-bone/80">{s.idea.body}</p>
            <Lines as="ul" className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[clamp(1.2rem,1rem+1vw,1.8rem)] text-bone" stagger={120}>
              {s.idea.uses.map((u) => (
                <span key={u} className="inline-flex items-center gap-3">
                  <span className="rec-dot" aria-hidden />
                  {u}
                </span>
              ))}
            </Lines>
          </div>
        </div>
      </section>

      {/* 02 — what we do */}
      <StorySteps title={s.steps.title} steps={steps} kicker={`02 — ${s.chapters[1]}`} />

      {/* 03 — one example, told as a story */}
      <section className="rule-t py-24 md:py-36" data-chapter="3" aria-labelledby="proof-title">
        <div className="wrap grid-12 gap-y-10">
          <p className="t-mono col-span-12 text-ash md:col-span-3">03 — {s.chapters[2]}</p>
          <div className="col-span-12 md:col-span-9">
            <p className="t-mono text-ash">{s.proof.kicker}</p>
            <Lines as="h2" id="proof-title" className="t-h1 mt-4 max-w-[16ch]">
              {[s.proof.title, <span key="l" className="text-ash">{s.proof.line}</span>]}
            </Lines>
          </div>
          <div className="col-span-12 md:col-start-4 md:col-span-9">
            <Link href={href.case(locale, huh.slug)} className="group relative block aspect-video overflow-hidden" data-track="case_open" data-slug={huh.slug} data-from="home-story">
              <FilmLoop {...film} className="absolute inset-0" alt={huh.stillAlts[locale][9]} position="50% 45%" />
              <span className="absolute bottom-4 left-4 inline-flex items-center gap-3 bg-ink/80 px-4 py-3 text-bone transition-colors group-hover:bg-rec group-hover:text-ink md:bottom-6 md:left-6">
                <span aria-hidden>▶</span>
                <span className="font-medium">{s.proof.film}</span>
                <span className="t-mono text-current/70">{`${Math.floor(huhM.duration / 60)}:${pad(Math.round(huhM.duration % 60))}`}</span>
              </span>
            </Link>
            <div className="mt-10 grid gap-8 md:grid-cols-2">
              <div>
                <p className="t-mono text-ash">{s.proof.fromOne}</p>
                <Lines as="ul" className="mt-4 space-y-1 text-[clamp(1.1rem,1rem+0.5vw,1.4rem)]" stagger={110}>
                  {s.proof.outputs.map((o, n) => (
                    <span key={o} className="flex gap-4">
                      <span className="t-mono pt-1.5 text-ash">{pad(n + 1)}</span>
                      {o}
                    </span>
                  ))}
                </Lines>
              </div>
              <p className="self-end md:text-right">
                <Link href={href.page(locale, "work")} className="link text-bone" data-track="cta" data-cta="work" data-location="home-proof">
                  {s.proof.more} →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — trust */}
      <section className="rule-t py-24 md:py-32" data-chapter="4" aria-labelledby="trust-title">
        <div className="wrap grid-12 gap-y-10">
          <p className="t-mono col-span-12 text-ash md:col-span-3">04 — {s.chapters[3]}</p>
          <div className="col-span-12 md:col-span-9">
            <h2 id="trust-title" className="t-h3 max-w-[30ch] text-bone/85">{s.trust.title}</h2>
            <Lines as="ul" className="mt-8" stagger={110}>
              {cases.map((k) => (
                <Link key={k.slug} href={href.case(locale, k.slug)} className="t-credit block py-1 text-[clamp(2.2rem,1rem+5vw,5.5rem)] transition-colors hover:text-rec" data-track="case_open" data-slug={k.slug} data-from="home-trust">
                  {k.client}
                </Link>
              ))}
            </Lines>
            <p className="mt-8 max-w-[52ch] text-ash">{copy.clients.agencies}</p>
          </div>
        </div>
      </section>

      {/* 05 — how to start (the purchase) */}
      <section id="empezar" className="bg-rec text-ink" data-chapter="5" aria-labelledby="buy-title">
        <div className="wrap grid-12 gap-y-10 py-20 md:py-28">
          <p className="t-mono col-span-12 md:col-span-3">05 — {s.chapters[4]}</p>
          <div className="col-span-12 md:col-span-9">
            <h2 id="buy-title" className="t-credit text-[clamp(3.2rem,1rem+8vw,10rem)]">{s.buy.title}</h2>
            <p className="mt-6 max-w-[40ch] text-[1.1rem]">{s.buy.lead}</p>
            <p className="t-mono mt-12">{s.buy.stepsTitle}</p>
            <ol className="mt-4 grid gap-6 md:grid-cols-3">
              {s.buy.steps.map((st, n) => (
                <li key={st} className="border-t border-ink/30 pt-4">
                  <span className="t-credit block text-[3rem]">{n + 1}</span>
                  <span className="mt-2 block text-[1.1rem]">{st}</span>
                </li>
              ))}
            </ol>
            <div className="mt-12 grid gap-4 md:grid-cols-[minmax(0,26rem)_auto] md:items-center md:gap-10">
              <Link
                href={contact}
                className="group inline-grid min-h-14 w-full grid-cols-[1fr_3.5rem] items-stretch bg-ink text-bone transition-colors hover:bg-bone hover:text-ink focus-visible:outline-ink"
                data-track="cta"
                data-cta="hablemos"
                data-location="home-buy"
              >
                <span className="t-credit flex items-center px-5 text-[clamp(1.1rem,1rem+0.4vw,1.35rem)] tracking-normal">{s.buy.cta}</span>
                <span aria-hidden className="grid place-items-center border-l border-bone/25 text-xl transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
              <Link href={href.page(locale, "packs")} className="underline underline-offset-4" data-track="cta" data-cta="packs" data-location="home-buy">
                {s.buy.packs}
              </Link>
            </div>
            <p className="t-mono mt-8">
              {s.buy.or}{" "}
              <a className="underline underline-offset-4" href={`mailto:${site.contact.email}`} data-track="contact_link" data-channel="email" data-location="home-buy">
                {site.contact.email}
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
