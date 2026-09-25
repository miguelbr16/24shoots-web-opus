import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../globals.css";
import { archivo, plexMono } from "@/lib/fonts";
import { htmlLang, isLocale, locales, type Locale } from "@/lib/i18n";
import { isIndexable, site } from "@/lib/site";
import { organizationJsonLd, JsonLd } from "@/lib/seo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

export const dynamicParams = false;
export const generateStaticParams = () => locales.map((locale) => ({ locale }));

export const viewport: Viewport = {
  themeColor: "#0e0d0c",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: "24SHOOTS",
  robots: isIndexable ? { index: true, follow: true } : { index: false, follow: false },
  icons: { icon: [{ url: "/icon.svg", type: "image/svg+xml" }], apple: "/apple-icon.png" },
  formatDetection: { telephone: false },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  return (
    <html lang={htmlLang[locale]} className={`${archivo.variable} ${plexMono.variable}`}>
      <head>
        {/* Enables reveal styles only when JS runs, so content is never hidden without it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <JsonLd data={organizationJsonLd(locale)} />
      </head>
      <body>
        <Header locale={locale} />
        <main id="main" tabIndex={-1} className="pt-[var(--header-h)] outline-none">
          {children}
        </main>
        <Footer locale={locale} />
        <Reveal />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
