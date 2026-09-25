import { notFound } from "next/navigation";
import { getPages } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { isValidLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

function LegalContent({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24">
      <h1 className="text-3xl font-bold">{title}</h1>
      <div className="prose prose-invert mt-8 space-y-4 text-sm leading-relaxed text-muted">
        {content.split("\n\n").map((p) => (
          <p key={p.slice(0, 30)}>{p}</p>
        ))}
      </div>
    </div>
  );
}

async function getLegalPage(
  localeParam: string,
  key: "notice" | "privacy" | "cookies",
  path: string
) {
  if (!isValidLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const pages = getPages(locale);
  return { locale, pages: pages.legal[key], path };
}

export async function generateLegalMetadata(
  localeParam: string,
  key: "notice" | "privacy" | "cookies",
  path: string
) {
  if (!isValidLocale(localeParam)) return {};
  const locale = localeParam as Locale;
  const pages = getPages(locale);
  return buildMetadata({
    locale,
    title: pages.legal[key].title,
    path,
  });
}

export { LegalContent, getLegalPage };
