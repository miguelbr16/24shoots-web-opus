import { ContactForm } from "@/components/ContactForm";
import { t } from "@/content/copy";
import { href, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const contactMeta = (locale: Locale) =>
  pageMetadata({
    locale,
    title: t(locale).contactPage.title,
    description:
      locale === "es"
        ? "Cuéntanos tu evento, contenido o campaña. Estudio creativo en Valencia. info@24shoots.es"
        : "Tell us about your event, content or campaign. Creative studio in Valencia, Spain. info@24shoots.es",
    paths: { es: href.page("es", "contact"), en: href.page("en", "contact") },
  });

export function ContactView({ locale }: { locale: Locale }) {
  const c = t(locale).contactPage;
  return (
    <div id="contacto" className="wrap grid-12 gap-y-14 pt-14 pb-20 md:pt-24 md:pb-28">
      <header className="col-span-12 lg:col-span-5">
        <h1 className="t-h1">{c.title}</h1>
        <p className="t-lead mt-6 max-w-[34ch] text-ash">{c.lead}</p>
        <section aria-labelledby="direct-title" className="mt-12">
          <h2 id="direct-title" className="t-mono text-ash">
            {c.directTitle}
          </h2>
          <address className="mt-3 not-italic">
            <a className="link t-h3 block" href={`mailto:${site.contact.email}`}>
              {site.contact.email}
            </a>
            <dl className="mt-6 space-y-3">
              <div>
                <dt className="t-mono text-ash">{c.phone}</dt>
                <dd>
                  <a className="link" href={`tel:${site.contact.phone}`}>
                    {site.contact.phoneDisplay}
                  </a>{" "}
                  ·{" "}
                  <a className="link" href={`https://wa.me/${site.contact.phone.replace("+", "")}`} rel="noopener" target="_blank">
                    WhatsApp
                  </a>
                </dd>
              </div>
              <div>
                <dt className="t-mono text-ash">Instagram</dt>
                <dd>
                  <a className="link" href={site.contact.instagram} rel="me noopener" target="_blank">
                    {site.contact.instagramHandle}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="t-mono text-ash">{c.based}</dt>
                <dd>{site.city[locale]}</dd>
              </div>
            </dl>
          </address>
        </section>
      </header>
      <div className="col-span-12 lg:col-span-6 lg:col-start-7">
        <ContactForm locale={locale} idPrefix="contact" />
      </div>
    </div>
  );
}
