"use client";

import { useEffect, useState } from "react";
import { type CookieConsentValue, getStoredConsent } from "@/lib/cookie-consent";

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsentValue | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setConsent(getStoredConsent());
    setReady(true);

    function sync() {
      setConsent(getStoredConsent());
    }

    window.addEventListener("cookie-consent-updated", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("cookie-consent-updated", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return { consent, ready, allowsMarketing: consent === "all" };
}
