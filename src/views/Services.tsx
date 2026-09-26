import Link from "next/link";
import { ServicesIndex } from "@/components/ServicesIndex";
import { CaseRow } from "@/components/CaseRow";
import { ClosingBlock } from "@/components/ClosingBlock";
import { services, type Service } from "@/content/services";
import { cases } from "@/content/cases";
import { t } from "@/content/copy";
import { href, serviceSlugs, type Locale } from "@/lib/i18n";
import { breadcrumbJsonLd, faqJsonLd, JsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";

export const servicesMeta = (locale: Locale) =>
  pageMetadata({
    locale,
    title: t(locale).servicesPage.title,
    description:
      locale === "es"
        ? "Eventos corporativos, contenido de marca y campañas: vídeo y fotografía con dirección creativa y producción propia, desde Valencia."
        : "Corporate events, brand content and campaigns: film and photography with our own creative direction and production, from Valencia.",
    paths: { es: href.page("es", "services"), en: href.page("en", "services") },
  });

export function ServicesView({ locale }: { locale: Locale }) {
  const c = t(locale).servicesPage;
  return (
    <>
      <header className="wrap grid-12 gap-y-6 pt-14 md:pt-24">
        <h1 className="t-display col-span-12 md:col-span-7">{c.title}</h1>
        <p className="t-lead col-span-12 max-w-[36ch] text-ash md:col-span-5 md:self-end">{c.intro}</p>
      </header>
      <ServicesIndex locale={locale} title={false} />
    </>
  );
}

export const serviceMeta = (locale: Locale, s: Service) =>
  pageMetadata({
    locale,
    title: s.seoTitle[locale],
    description: s.seoDescription[locale],
    paths: { es: href.service("es", serviceSlugs[s.key].es), en: href.service("en", serviceSlugs[s.key].en) },
  });

export function ServiceView({ locale, s }: { locale: Locale; s: Service }) {
  const c = t(locale);
  const p = c.servicesPage;
  const url = href.service(locale, serviceSlugs[s.key][locale]);
  const related = cases.filter((k) => k.service === s.key).slice(0, 3);
  const others = services.filter((x) => x.key !== s.key);

  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({ name: s.name[locale], description: s.seoDescription[locale], path: url, locale }),
          faqJsonLd(s.faqs[locale]),
          breadcrumbJsonLd([
            { name: c.nav.home, path: href.home(locale) },
            { name: c.nav.services, path: href.page(locale, "services") },
            { name: s.name[locale], path: url },
          ]),
        ]}
      />
      <header className="wrap pt-10 pb-12 md:pt-16 md:pb-20">
        <nav aria-label={locale === "es" ? "Migas de pan" : "Breadcrumb"} className="t-mono text-ash">
          <Link className="hover:text-bone" href={href.page(locale, "services")}>
            {c.nav.services}
          </Link>{" "}
          / <span aria-current="page">{s.name[locale]}</span>
        </nav>
        <div className="grid-12 mt-8 gap-y-8">
          <p className="t-mono col-span-12 text-ash md:col-span-1">{s.index}</p>
          <h1 className="t-credit col-span-12 text-[clamp(3rem,1.2rem+7vw,9rem)] md:col-span-11">{s.name[locale]}</h1>
          <p className="t-lead col-span-12 max-w-[40ch] md:col-span-7 md:col-start-2">{s.line[locale]}</p>
        </div>
      </header>

      <section className="on-paper py-16 md:py-24">
        <div className="wrap grid-12 gap-y-12">
          <div className="col-span-12 md:col-span-5">
            <h2 className="t-mono text-soot">{p.problem}</h2>
            <p className="t-h3 mt-4 max-w-[26ch]">{s.problem[locale]}</p>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7">
            <h2 className="t-mono text-soot">{p.approach}</h2>
            <ol className="mt-4">
              {s.approach[locale].map((a, i) => (
                <li key={a} className="rule-t grid grid-cols-[2.5rem_1fr] py-4">
                  <span className="t-mono text-soot">{String(i + 1).padStart(2, "0")}</span>
                  <span>{a}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="wrap grid-12 gap-y-10 py-16 md:py-24">
        <div className="col-span-12 md:col-span-5">
          <h2 className="t-mono text-ash">{p.deliverables}</h2>
          <ul className="mt-4">
            {s.deliverables[locale].map((d) => (
              <li key={d} className="rule-b t-h3 py-3">
                {d}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-12 md:col-span-6 md:col-start-7">
          <h2 className="t-mono text-ash">{p.capabilities}</h2>
          <p className="t-mono mt-4 leading-7 text-bone">{s.capabilities[locale].join(" · ")}</p>
        </div>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="pb-8">
          <div className="wrap">
            <h2 id="related-title" className="t-h2 pb-8">
              {p.related}
            </h2>
            {related.map((k, i) => (
              <CaseRow key={k.slug} c={k} locale={locale} index={i} flip={i % 2 === 1} />
            ))}
            <div className="rule-t flex justify-end pt-6">
              <Link href={href.page(locale, "work")} className="cta cta--quiet">
                {c.work.all} <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      <section aria-labelledby="faq-title" className="wrap grid-12 gap-y-8 py-16 md:py-24">
        <h2 id="faq-title" className="t-h2 col-span-12 md:col-span-4">
          {p.faq}
        </h2>
        <div className="col-span-12 md:col-span-7 md:col-start-6">
          {s.faqs[locale].map((f) => (
            <details key={f.q} className="group rule-b">
              <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 py-5 text-[1.15rem] font-medium [&::-webkit-details-marker]:hidden">
                <h3>{f.q}</h3>
                <span aria-hidden className="t-mono text-ash transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="max-w-[60ch] pb-6 text-ash">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <nav aria-label={c.nav.services} className="rule-t">
        <ul className="wrap grid gap-0 md:grid-cols-2">
          {others.map((o) => (
            <li key={o.key} className="rule-b md:border-b-0 md:[&:first-child]:border-r md:[&:first-child]:border-[var(--rule)]">
              <Link href={href.service(locale, serviceSlugs[o.key][locale])} className="group flex items-baseline justify-between gap-4 py-8 md:px-6 md:first:pl-0">
                <span>
                  <span className="t-mono block text-ash">{o.index}</span>
                  <span className="t-credit mt-2 block text-[2.6rem] group-hover:text-rec transition-colors">{o.name[locale]}</span>
                </span>
                <span aria-hidden>→</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <ClosingBlock locale={locale} />
    </>
  );
}
