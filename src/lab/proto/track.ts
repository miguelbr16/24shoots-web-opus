"use client";

import { useEffect, type RefObject } from "react";

/**
 * LAB ONLY — measurement hooks. Nothing is sent anywhere: events are kept in
 * window.__events (and logged with ?debug) so QA can prove every interaction is measurable.
 * Event names follow docs/research/WEB-STACK-AND-GROWTH-RESEARCH.md §35.
 */
type Props = Record<string, string | number | boolean | undefined>;
type W = Window & { __events?: { name: string; props: Props; t: number }[] };

export function track(name: string, props: Props = {}) {
  const w = window as W;
  (w.__events ||= []).push({ name, props, t: Math.round(performance.now()) });
  if (location.search.includes("debug")) console.info("[track]", name, props);
}

/** Delegated clicks: any element with data-track="event" (+ data-* props). */
export function useClickTracking() {
  useEffect(() => {
    const on = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-track]");
      if (!el) return;
      const { track: name, ...rest } = el.dataset;
      track(name!, rest);
    };
    document.addEventListener("click", on, { capture: true });
    return () => document.removeEventListener("click", on, { capture: true });
  }, []);
}

/** Fires once when the element has been ≥ `threshold` visible for `minMs`. */
export function useViewOnce(ref: RefObject<HTMLElement | null>, name: string, props: Props = {}, minMs = 0, threshold = 0.5) {
  const key = JSON.stringify(props);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timer = 0;
    let done = false;
    const io = new IntersectionObserver(
      ([e]) => {
        if (done) return;
        if (e.isIntersecting) {
          timer = window.setTimeout(() => {
            done = true;
            track(name, JSON.parse(key));
            io.disconnect();
          }, minMs);
        } else window.clearTimeout(timer);
      },
      { threshold }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, [ref, name, key, minMs, threshold]);
}

/** True when autoplaying footage is appropriate (no reduced motion, no Save-Data). */
export function motionAllowed() {
  if (typeof window === "undefined") return false;
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches && !conn?.saveData;
}
