import Link from "next/link";
import { FilmLoop } from "@/components/FilmLoop";
import { Lines } from "@/components/story/Lines";
import { StoryOpening } from "@/components/story/StoryOpening";
import { StorySteps } from "@/components/story/StorySteps";
import { ChapterRail } from "@/components/story/ChapterRail";
import { CalendarArt, ReportArt, ShotsArt } from "@/components/story/MethodArt";
import { cases, caseMedia } from "@/content/cases";
import { t } from "@/content/copy";
import { newClients, oceansInstagram, story } from "@/content/story";
import { href, serviceSlugs, type Locale } from "@/lib/i18n";
import { img } from "@/lib/media";
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
const M = "/media/home";

/**
 * Home as a story about the client's brand, ending in a decision:
 * 0 opening → 1 the problem → 2 the method (we guide you) → 3 four lines of work
 * → 4 one example → 5 who is behind it → 6 trust → 7 how to start (packs + contact).
 * Media: client work published on Instagram (scripts/media/home.mjs) and the event films.
 */
export function Home({ locale }: { locale: Locale }) {
  const s = story(locale);
  const copy = t(locale);
  const contact = href.page(locale, "contact");
  const huhM = caseMedia("huhtamaki-50");

  const openImg = {
    wide: img(`${M}/open-wide.jpg`, 2400, 1350, "100vw", 72),
    tall: img(`${M}/open-tall.jpg`, 1200, 1600, "100vw", 72),
    alt: s.open.alt,
  };

  const art = s.method.art;
  const half = "(min-width: 768px) 50vw, 100vw";
  const shoot = img(`${M}/method-shoot.jpg`, 1200, 1600, half);
  const media = [
    <CalendarArt key="c" art={art} label={art.calendarAlt} />,
    <ShotsArt key="s" art={art} label={art.shotsAlt} />,
    // eslint-disable-next-line @next/next/no-img-element -- srcset from getImageProps
    <img key="g" src={shoot.src} srcSet={shoot.srcSet} sizes={shoot.sizes} alt={art.shootAlt} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover object-[50%_40%]" />,
    <ReportArt key="r" art={art} label={art.reportAlt} />,
  ];
  const steps = s.method.items.map((it, n) => ({ ...it, media: media[n] }));

  const card = "(min-width: 1024px) 19vw, (min-width: 768px) 38vw, 100vw";
  const lineImg = {
    brand: img(`${M}/line-brand.jpg`, 1080, 1350, card),
    business: img(`${M}/line-business.jpg`, 1080, 1350, card),
    personal: img(`${M}/line-personal.jpg`, 1080, 1350, card),
    events: img(huhM.stills[9], 1920, 1080, card),
  } as const;
  const lineHref = {
    brand: href.service(locale, serviceSlugs.brand[locale]),
    business: href.service(locale, serviceSlugs.campaigns[locale]),
    personal: href.page(locale, "services"),
    events: href.service(locale, serviceSlugs.events[locale]),
  } as const;

  const third = "(min-width: 768px) 20vw, 33vw";
  const loopPoster = img(`${M}/oceans-loop.jpg`, 720, 1280, third);
  const oceansLoop = {
    poster: { wide: loopPoster, tall: loopPoster },
    sources: {
      wide: { webm: `${M}/oceans-loop.webm`, mp4: `${M}/oceans-loop.mp4` },
      tall: { webm: `${M}/oceans-loop.webm`, mp4: `${M}/oceans-loop.mp4` },
    },
  };
  const oceansPics = [img(`${M}/oceans-shelf.jpg`, 1200, 1600, third), img(`${M}/oceans-detail.jpg`, 1200, 1600, third)];

  return (
    <>
      <ChapterRail chapters={s.chapters} />

      <StoryOpening
        image={openImg}
        p1={s.open.p1}
        p2={s.open.p2}
        p3a={s.open.p3a}
        p3b={s.open.p3b}
        scroll={s.open.scroll}
        descriptor={s.open.descriptor}
        offer={s.open.offer}
        cta={{ label: copy.nav.cta, href: contact }}
      />

      {/* 01 — the problem */}
      <section className="py-24 md:py-36" data-chapter="1" aria-labelledby="problem-title">
        <div className="wrap grid-12 gap-y-10">
          <p className="t-mono col-span-12 text-ash md:col-span-3">01 — {s.chapters[0]}</p>
          <div className="col-span-12 md:col-span-9">
            <Lines as="h2" id="problem-title" className="t-h1 max-w-[20ch]">
              {[s.problem.title]}
            </Lines>
            <p className="t-lead mt-8 max-w-[48ch] text-bone/80">{s.problem.body}</p>
            <Lines as="ul" className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[clamp(1.2rem,1rem+1vw,1.8rem)] text-ash" stagger={120}>
              {s.problem.list.map((u) => (
                <span key={u} className="inline-flex items-center gap-3 line-through decoration-rec decoration-2">
                  {u}
                </span>
              ))}
            </Lines>
          </div>
        </div>
      </section>

      {/* 02 — the method */}
      <StorySteps title={s.method.title} steps={steps} kicker={`02 — ${s.chapters[1]}`} />

      {/* 03 — four lines of work */}
      <section className="rule-t py-24 md:py-32" data-chapter="3" aria-labelledby="lines-title">
        <div className="wrap">
          <div className="grid-12 gap-y-6">
            <p className="t-mono col-span-12 text-ash md:col-span-3">03 — {s.chapters[2]}</p>
            <Lines as="h2" id="lines-title" className="t-h1 col-span-12 max-w-[18ch] md:col-span-9">
              {[s.lines.title]}
            </Lines>
          </div>
          {/* Starts at the content column so the chapter marker (bottom-left) never covers a card. */}
          <div className="grid-12 mt-14">
            <ul className="col-span-12 grid gap-x-4 gap-y-12 md:col-span-9 md:col-start-4 md:grid-cols-2 lg:grid-cols-4">
              {s.lines.items.map((l, n) => {
                const im = lineImg[l.key as keyof typeof lineImg];
                return (
                  <li key={l.key}>
                    <Link href={lineHref[l.key as keyof typeof lineHref]} className="group block" data-track="cta" data-cta={`line-${l.key}`} data-location="home-lines">
                      <span className="block aspect-[4/5] overflow-hidden bg-ink-2">
                        {/* eslint-disable-next-line @next/next/no-img-element -- srcset from getImageProps */}
                        <img
                          src={im.src}
                          srcSet={im.srcSet}
                          sizes={im.sizes}
                          alt={l.alt}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                      </span>
                      <span className="t-mono mt-4 block text-ash">{pad(n + 1)}</span>
                      <span className="t-h3 mt-1 flex items-baseline justify-between gap-3 text-bone">
                        {l.name}
                        <span aria-hidden className="text-ash transition-colors group-hover:text-rec">
                          →
                        </span>
                      </span>
                      <span className="mt-2 block max-w-[36ch] text-bone/80">{l.d}</span>
                      <span className="t-mono mt-3 block text-[0.75rem] text-ash">{l.client}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* 04 — one example: a brand we work with every month */}
      <section className="rule-t py-24 md:py-36" data-chapter="4" aria-labelledby="example-title">
        <div className="wrap grid-12 gap-y-10">
          <p className="t-mono col-span-12 text-ash md:col-span-3">04 — {s.chapters[3]}</p>
          <div className="col-span-12 md:col-span-9">
            <p className="t-mono text-ash">{s.example.kicker}</p>
            <Lines as="h2" id="example-title" className="t-h1 mt-4 max-w-[20ch]">
              {[s.example.title]}
            </Lines>
            <p className="t-lead mt-8 max-w-[46ch] text-bone/80">{s.example.body}</p>
          </div>
          <div className="col-span-12 grid grid-cols-3 gap-2 md:col-start-4 md:col-span-9 md:gap-3">
            <div className="relative aspect-[9/16] overflow-hidden bg-ink-2">
              <FilmLoop {...oceansLoop} className="absolute inset-0" alt={s.example.alts[0]} />
            </div>
            {oceansPics.map((p, i) => (
              // eslint-disable-next-line @next/next/no-img-element -- srcset from getImageProps
              <img key={p.src} src={p.src} srcSet={p.srcSet} sizes={p.sizes} alt={s.example.alts[i + 1]} loading="lazy" decoding="async" className="aspect-[9/16] w-full object-cover" />
            ))}
          </div>
          <div className="col-span-12 grid gap-8 md:col-start-4 md:col-span-9 md:grid-cols-2">
            <div>
              <p className="t-mono text-ash">{s.example.whatTitle}</p>
              <Lines as="ul" className="mt-4 space-y-1 text-[clamp(1.1rem,1rem+0.5vw,1.4rem)]" stagger={110}>
                {s.example.what.map((o, n) => (
                  <span key={o} className="flex gap-4">
                    <span className="t-mono pt-1.5 text-ash">{pad(n + 1)}</span>
                    {o}
                  </span>
                ))}
              </Lines>
            </div>
            <p className="self-end md:text-right">
              <a href={oceansInstagram} target="_blank" rel="noopener noreferrer" className="link text-bone" data-track="cta" data-cta="example-instagram" data-location="home-example">
                {s.example.cta} ↗
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* 05 — who is behind it */}
      <section className="rule-t py-24 md:py-36" data-chapter="5" aria-labelledby="who-title">
        <div className="wrap grid-12 gap-y-10">
          <p className="t-mono col-span-12 text-ash md:col-span-3">05 — {s.chapters[4]}</p>
          <figure className="col-span-12 md:col-span-9">
            <h2 id="who-title" className="sr-only">
              {s.who.kicker}
            </h2>
            <blockquote>
              <Lines as="p" className="t-h1 max-w-[24ch]">
                {[`«${s.who.quote}»`]}
              </Lines>
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-3">
              <span className="rec-dot" aria-hidden />
              <span className="font-medium text-bone">{s.who.name}</span>
              <span className="t-mono text-ash">{s.who.role}</span>
            </figcaption>
            <p className="t-lead mt-10 max-w-[46ch] text-bone/80">{s.who.body}</p>
            <p className="mt-8">
              <Link href={href.page(locale, "studio")} className="link text-bone" data-track="cta" data-cta="studio" data-location="home-who">
                {s.who.cta} →
              </Link>
            </p>
          </figure>
        </div>
      </section>

      {/* 06 — trust */}
      <section className="rule-t py-24 md:py-32" data-chapter="6" aria-labelledby="trust-title">
        <div className="wrap grid-12 gap-y-10">
          <p className="t-mono col-span-12 text-ash md:col-span-3">06 — {s.chapters[5]}</p>
          <div className="col-span-12 md:col-span-9">
            <h2 id="trust-title" className="t-h3 max-w-[30ch] text-bone/85">
              {s.trust.title}
            </h2>
            <Lines as="ul" className="mt-8" stagger={90}>
              {[
                ...newClients.map((c) => (
                  <span key={c} className="t-credit block py-1 text-[clamp(2rem,1rem+4.5vw,5rem)]">
                    {c}
                  </span>
                )),
                ...cases.map((k) => (
                  <Link
                    key={k.slug}
                    href={href.case(locale, k.slug)}
                    className="t-credit block py-1 text-[clamp(2rem,1rem+4.5vw,5rem)] transition-colors hover:text-rec"
                    data-track="case_open"
                    data-slug={k.slug}
                    data-from="home-trust"
                  >
                    {k.client}
                  </Link>
                )),
              ]}
            </Lines>
            <p className="mt-8 max-w-[52ch] text-ash">{copy.clients.agencies}</p>
          </div>
        </div>
      </section>

      {/* 07 — how to start (the purchase) */}
      <section id="empezar" className="bg-rec text-ink" data-chapter="7" aria-labelledby="buy-title">
        <div className="wrap grid-12 gap-y-10 py-20 md:py-28">
          <p className="t-mono col-span-12 md:col-span-3">07 — {s.chapters[6]}</p>
          <div className="col-span-12 md:col-span-9">
            <h2 id="buy-title" className="t-credit text-[clamp(3.2rem,1rem+8vw,10rem)]">
              {s.buy.title}
            </h2>
            <p className="mt-6 max-w-[40ch] text-[1.1rem]">{s.buy.lead}</p>
            <p className="t-mono mt-12">{s.buy.packsTitle}</p>
            <ul className="mt-4 grid gap-6 md:grid-cols-3">
              {s.buy.packs.map((p) => (
                <li key={p.slug} className="border-t border-ink/30 pt-4">
                  <Link href={`${href.page(locale, "packs")}#${p.slug}`} className="group block" data-track="cta" data-cta={`pack-${p.slug}`} data-location="home-buy">
                    <span className="t-credit flex items-baseline justify-between text-[2.2rem]">
                      {p.name}
                      <span aria-hidden className="text-xl transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                    <span className="mt-2 block text-[1.05rem]">{p.d}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-12 grid gap-4 md:grid-cols-[minmax(0,26rem)_auto] md:items-center md:gap-10">
              <Link
                href={contact}
                className="group inline-grid min-h-14 w-full grid-cols-[1fr_3.5rem] items-stretch bg-ink text-bone transition-colors hover:bg-bone hover:text-ink focus-visible:outline-ink"
                data-track="cta"
                data-cta="hablemos"
                data-location="home-buy"
              >
                <span className="t-credit flex items-center px-5 text-[clamp(1.1rem,1rem+0.4vw,1.35rem)] tracking-normal">{s.buy.cta}</span>
                <span aria-hidden className="grid place-items-center border-l border-bone/25 text-xl transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
              <Link href={href.page(locale, "packs")} className="underline underline-offset-4" data-track="cta" data-cta="packs" data-location="home-buy">
                {s.buy.packsLink}
              </Link>
            </div>
            <p className="mt-8 max-w-[52ch]">{s.buy.oneOff}</p>
            <p className="t-mono mt-4">
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
