"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { t } from "@/content/copy";
import { href } from "@/lib/i18n";

export default function NotFound() {
  const pathname = usePathname() || "/";
  const locale = pathname === "/en" || pathname.startsWith("/en/") ? "en" : "es";
  const c = t(locale).notFound;
  return (
    <>
      <title>{`404 — ${c.title} — 24SHOOTS`}</title>
      <meta name="robots" content="noindex" />
    <section className="wrap flex min-h-[70svh] flex-col justify-end gap-6 pb-20 pt-24">
      <p className="t-mono text-ash">404 · {locale === "es" ? "Plano no encontrado" : "Shot not found"}</p>
      <h1 className="t-display max-w-[12ch]">{c.title}</h1>
      <p className="t-lead max-w-[34ch] text-ash">{c.body}</p>
      <Link href={href.home(locale)} className="cta self-start">
        {c.back} <span aria-hidden>→</span>
      </Link>
    </section>
    </>
  );
}
