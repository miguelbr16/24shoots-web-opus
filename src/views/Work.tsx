import Image from "next/image";
import Link from "next/link";
import { CaseRow } from "@/components/CaseRow";
import { FilmPlayer } from "@/components/FilmPlayer";
import { ClosingBlock } from "@/components/ClosingBlock";
import { cases, caseMedia, type Case } from "@/content/cases";
import { getService } from "@/content/services";
import { t } from "@/content/copy";
import { href, serviceSlugs, type Locale } from "@/lib/i18n";
import { breadcrumbJsonLd, JsonLd, pageMetadata, videoJsonLd } from "@/lib/seo";

export const workMeta = (locale: Locale) =>
  pageMetadata({
    locale,
    title: locale === "es" ? "Trabajo" : "Work",
    description:
      locale === "es"
        ? "Proyectos de 24SHOOTS para Huhtamaki, Generalitat Valenciana, Ajuntament de València, Ajuntament de Manises e Imperia SCM: películas de eventos corporativos e institucionales."
        : "24SHOOTS projects for Huhtamaki, Generalitat Valenciana, Ajuntament de València, Ajuntament de Manises and Imperia SCM: corporate and institutional event films.",
    paths: { es: href.page("es", "work"), en: href.page("en", "work") },
  });

export function WorkIndex({ locale }: { locale: Locale }) {
  const c = t(locale);
  return (
    <>
      <header className="wrap grid-12 gap-y-6 pt-14 pb-10 md:pt-24 md:pb-16">
        <h1 className="t-display col-span-12 md:col-span-7">{c.nav.work}</h1>
        <p className="t-lead col-span-12 max-w-[34ch] text-ash md:col-span-5 md:self-end">{c.work.intro}</p>
      </header>
      <div className="wrap pb-16">
        {cases.map((k, i) => (
          <CaseRow key={k.slug} c={k} locale={locale} index={i} flip={i % 2 === 1} headingLevel="h2" />
        ))}
      </div>
    </>
  );
}

export const caseMeta = (locale: Locale, k: Case) =>
  pageMetadata({
    locale,
    title: `${k.client} · ${k.title[locale]}`,
    description: k.summary[locale].slice(0, 158).replace(/\s+\S*$/, "") + "…",
    paths: { es: href.case("es", k.slug), en: href.case("en", k.slug) },
    image: caseMedia(k.slug).og,
    imageAlt: `${k.client} — ${k.title[locale]}`,
  });

export function CaseView({ locale, k }: { locale: Locale; k: Case }) {
  const c = t(locale);
  const m = caseMedia(k.slug);
  const url = href.case(locale, k.slug);
  const i = cases.findIndex((x) => x.slug === k.slug);
  const next = cases[(i + 1) % cases.length];
  const nm = caseMedia(next.slug);
  const service = getService(k.service);
  const name = `${k.client} — ${k.title[locale]}`;
  const alts = k.stillAlts[locale];
  const stills = m.stills.map((src, j) => ({ src, alt: alts[j] ?? "" })).filter((s) => s.src !== m.cover);

  const meta: [string, React.ReactNode][] = [
    [c.case.client, k.client],
    [c.case.type, k.kind[locale]],
    ...(k.when ? [[c.case.when, k.when[locale]] as [string, string]] : []),
    ...(k.with ? [[c.case.with, k.with] as [string, string]] : []),
    [c.case.area, <Link key="a" className="link" href={href.service(locale, serviceSlugs[k.service][locale])}>{service.name[locale]}</Link>],
    [c.case.format, "16:9 · 1080p"],
  ];

  return (
    <article>
      <JsonLd
        data={[
          videoJsonLd({ name, description: k.summary[locale], thumbnail: m.cover, contentUrl: m.film, duration: m.duration, path: url }),
          breadcrumbJsonLd([
            { name: c.nav.home, path: href.home(locale) },
            { name: c.nav.work, path: href.page(locale, "work") },
            { name, path: url },
          ]),
        ]}
      />
      <header className="wrap pt-10 pb-8 md:pt-16 md:pb-12">
        <nav aria-label={locale === "es" ? "Migas de pan" : "Breadcrumb"} className="t-mono text-ash">
          <Link className="hover:text-bone" href={href.page(locale, "work")}>
            {c.nav.work}
          </Link>{" "}
          / <span aria-current="page">{k.client}</span>
        </nav>
        <div className="grid-12 mt-8 items-end gap-y-8">
          <h1 className="col-span-12 lg:col-span-8">
            <span className="t-credit block text-[clamp(3rem,1.4rem+7vw,9rem)]">{k.client}</span>{" "}
            <span className="t-h2 mt-4 block">{k.title[locale]}</span>
          </h1>
          <dl className="col-span-12 grid grid-cols-2 gap-x-6 lg:col-span-4 lg:grid-cols-1">
            {meta.map(([dt, dd]) => (
              <div key={dt} className="rule-t flex flex-col gap-1 py-2.5 lg:flex-row lg:justify-between">
                <dt className="t-mono text-ash">{dt}</dt>
                <dd>{dd}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <div className="wrap">
        <FilmPlayer src={m.film} poster={m.cover} title={name} playLabel={c.case.play} duration={m.duration} />
      </div>

      <section className="wrap grid-12 gap-y-10 py-16 md:py-24">
        <p className="t-lead col-span-12 lg:col-span-7">{k.summary[locale]}</p>
        <div className="col-span-12 lg:col-span-4 lg:col-start-9">
          <h2 className="t-mono text-ash">{c.case.shows}</h2>
          <ul className="mt-3">
            {k.shows[locale].map((s) => (
              <li key={s} className="rule-b flex gap-3 py-2.5">
                <span className="rec-dot mt-2" aria-hidden />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="stills-title" className="pb-16 md:pb-24">
        <h2 id="stills-title" className="wrap t-mono mb-4 text-ash">
          {c.case.stills} · {String(stills.length).padStart(2, "0")}
        </h2>
        {/* Mobile: swipeable strip. Desktop: editorial grid. */}
        <ul className="snap-x-strip md:hidden" tabIndex={0} aria-label={c.case.stills}>
          {stills.map((s) => (
            <li key={s.src} className="relative aspect-[4/5] bg-ink-2">
              <Image src={s.src} alt={s.alt} fill sizes="82vw" quality={68} className="object-cover" />
            </li>
          ))}
        </ul>
        <ul className="wrap hidden grid-flow-dense grid-cols-6 items-start gap-2 md:grid">
          {stills.map((s, j) => (
            <li key={s.src} data-reveal="expose" className={`relative bg-ink-2 ${j % 5 === 0 ? "col-span-4 row-span-2 self-stretch" : "col-span-2 aspect-video"}`}>
              <Image src={s.src} alt={s.alt} fill sizes={j % 5 === 0 ? "66vw" : "33vw"} quality={68} className="object-cover" />
            </li>
          ))}
        </ul>
      </section>

      <section className="rule-t">
        <Link href={href.case(locale, next.slug)} className="group wrap grid-12 items-end gap-y-6 py-12 md:py-16">
          <span className="relative col-span-12 block aspect-video overflow-hidden bg-ink-2 md:col-span-5">
            <Image src={nm.cover} alt="" fill sizes="(min-width: 768px) 40vw, 100vw" quality={65} className="object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
          </span>
          <span className="col-span-12 md:col-span-7 md:pl-6">
            <span className="t-mono block text-ash">{c.case.next} →</span>
            <span className="t-credit mt-2 block text-[clamp(2.6rem,1rem+5vw,6.5rem)] transition-colors group-hover:text-rec">{next.client}</span>
            <span className="block text-ash">{next.title[locale]}</span>
          </span>
        </Link>
      </section>
      <ClosingBlock locale={locale} title={c.case.cta} />
    </article>
  );
}
