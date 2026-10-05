"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Where you are in the story: a quiet chapter marker (desktop) and a thin progress
 * line (mobile). Reads [data-chapter] sections; hidden during the opening.
 */
export function ChapterRail({ chapters }: { chapters: string[] }) {
  const [cur, setCur] = useState(-1);
  const [nearEnd, setNearEnd] = useState(false);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const secs = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"));
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const mid = window.innerHeight * 0.5;
        let c = -1;
        for (const s of secs) if (s.getBoundingClientRect().top <= mid) c = Number(s.dataset.chapter) - 1;
        setCur(c);
        // Get out of the way of the footer (it holds © and legal links).
        const foot = document.querySelector("body > footer");
        setNearEnd(Boolean(foot && foot.getBoundingClientRect().top < window.innerHeight));
        const d = document.documentElement;
        if (bar.current) bar.current.style.transform = `scaleX(${Math.min(1, d.scrollTop / Math.max(1, d.scrollHeight - window.innerHeight))})`;
      });
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", on);
    };
  }, []);

  const show = cur >= 0 && !nearEnd;
  return (
    <>
      <div className={`pointer-events-none fixed inset-x-0 top-[var(--header-h)] z-40 h-[2px] bg-transparent transition-opacity md:hidden ${show ? "opacity-100" : "opacity-0"}`} aria-hidden>
        <div ref={bar} className="h-full origin-left bg-rec" style={{ transform: "scaleX(0)" }} />
      </div>
      <p className={`t-mono pointer-events-none fixed bottom-6 left-[var(--gutter)] z-40 hidden text-ash transition-opacity md:block ${show ? "opacity-100" : "opacity-0"}`} aria-hidden>
        <span className="text-bone">{String(cur + 1).padStart(2, "0")}</span> / {String(chapters.length).padStart(2, "0")} · {chapters[Math.max(0, cur)]}
      </p>
    </>
  );
}
