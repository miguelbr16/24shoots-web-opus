"use client";

import { useEffect, useState } from "react";

interface CookieBannerProps {
  message: string;
  accept: string;
  reject: string;
}

export function CookieBanner({ message, accept, reject }: CookieBannerProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  function save(value: string) {
    localStorage.setItem("cookie-consent", value);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-surface/95 p-5 backdrop-blur-md md:bottom-6 md:left-6 md:right-auto md:max-w-md md:border">
      <p className="text-sm leading-relaxed text-muted">{message}</p>
      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={() => save("all")}
          className="rounded-sm bg-accent px-4 py-2.5 text-[10px] font-semibold uppercase tracking-widest text-background"
        >
          {accept}
        </button>
        <button
          type="button"
          onClick={() => save("necessary")}
          className="rounded-sm border border-border px-4 py-2.5 text-[10px] font-semibold uppercase tracking-widest text-muted"
        >
          {reject}
        </button>
      </div>
    </div>
  );
}
