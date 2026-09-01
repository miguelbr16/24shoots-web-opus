import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { WhatsAppFloat } from "@/components/ui";
import {
  getPages,
  getSiteConfig,
} from "@/lib/content";
import { isValidLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isValidLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const site = getSiteConfig();
  const pages = getPages(locale);
  const alternatePath = locale === "es" ? "/en" : "/es";

  const whatsappMessage =
    locale === "es"
      ? "Hola, me interesa un servicio de 24Shoots"
      : "Hi, I'm interested in a 24Shoots service";

  return (
    <>
      <Header
        locale={locale}
        nav={pages.nav}
        logo={site.logo}
        siteName={site.name}
        alternatePath={alternatePath}
      />
      <main>{children}</main>
      <Footer
        locale={locale}
        footer={pages.footer}
        contact={{
          email: site.contact.email,
          instagram: site.contact.instagram,
          location: site.contact.location[locale],
        }}
        siteName={site.name}
      />
      <WhatsAppFloat
        phone={site.contact.whatsapp}
        message={whatsappMessage}
      />
      <CookieBanner
        message={pages.cookieBanner.message}
        accept={pages.cookieBanner.accept}
        reject={pages.cookieBanner.reject}
      />
    </>
  );
}
