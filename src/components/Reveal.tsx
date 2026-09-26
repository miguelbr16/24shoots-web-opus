"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Gentle rise-in for [data-reveal] elements that start below the fold.
 * Content is never hidden by default: an element only gets the pre-reveal state
 * after JS has measured it off-screen, and a safety timer reveals everything anyway.
 */
export function Reveal() {
  const pathname = usePathname();
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const vh = window.innerHeight;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)")).filter(
      (el) => el.getBoundingClientRect().top > vh * 0.95
    );
    els.forEach((el) => el.classList.add("will-reveal"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -5% 0px", threshold: 0.05 }
    );
    els.forEach((el) => io.observe(el));
    const safety = window.setTimeout(() => els.forEach((el) => el.classList.add("is-in")), 6000);
    return () => {
      io.disconnect();
      window.clearTimeout(safety);
    };
  }, [pathname]);
  return null;
}
