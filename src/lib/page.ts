import { notFound } from "next/navigation";
import { isLocale, type Locale } from "./i18n";

export type LocaleParams = Promise<{ locale: string }>;
export type SlugParams = Promise<{ locale: string; slug: string }>;

/** Each localized folder (e.g. /trabajo vs /work) only exists in its own language. */
export async function localeFor(params: Promise<{ locale: string }>, only?: Locale): Promise<Locale> {
  const { locale } = await params;
  if (!isLocale(locale) || (only && locale !== only)) notFound();
  return locale;
}
