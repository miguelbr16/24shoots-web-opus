"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getRoute } from "@/lib/i18n";
import type { Locale } from "@/lib/types";
import { saveConsent } from "@/lib/cookie-consent";

interface CookieBannerProps {
  locale: Locale;
  message: string;
  accept: string;
  reject: string;
  policyLink: string;
}

export function CookieBanner({
  locale,
  message,
  accept,
  reject,
  policyLink,
}: CookieBannerProps) {
  const [visible, setVisible] = useState(false);
  const cookiesHref = getRoute(locale, "cookies");

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  function choose(value: "all" | "necessary") {
    saveConsent(value);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-surface/95 p-5 backdrop-blur-md md:bottom-6 md:left-6 md:right-auto md:max-w-md md:border">
      <p className="text-sm leading-relaxed text-muted">
        {message}{" "}
        <Link href={cookiesHref} className="text-accent underline-offset-2 hover:underline">
          {policyLink}
        </Link>
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => choose("all")}
          className="rounded-sm bg-accent px-4 py-2.5 text-[10px] font-semibold uppercase tracking-widest text-background"
        >
          {accept}
        </button>
        <button
          type="button"
          onClick={() => choose("necessary")}
          className="rounded-sm border border-border px-4 py-2.5 text-[10px] font-semibold uppercase tracking-widest text-muted"
        >
          {reject}
        </button>
      </div>
    </div>
  );
}
