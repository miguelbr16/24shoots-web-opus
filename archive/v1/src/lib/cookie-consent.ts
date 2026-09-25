export const COOKIE_CONSENT_KEY = "cookie-consent";

export type CookieConsentValue = "all" | "necessary";

export function getStoredConsent(): CookieConsentValue | null {
  if (typeof window === "undefined") return null;
  const value = localStorage.getItem(COOKIE_CONSENT_KEY);
  if (value === "all" || value === "necessary") return value;
  return null;
}

export function hasAnalyticsConsent(): boolean {
  return getStoredConsent() === "all";
}

export function saveConsent(value: CookieConsentValue) {
  localStorage.setItem(COOKIE_CONSENT_KEY, value);
  window.dispatchEvent(new Event("cookie-consent-updated"));
}
