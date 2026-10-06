"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface Step {
  k: string;
  d: string;
  /** Picture or illustration for the step (rendered on the server and passed in). */
  media: ReactNode;
}

/**
 * The method as a sequence of beats instead of a list. Pinned on every viewport: the
 * big word changes as you scroll and the media follows. Without JS (or with reduced
 * motion) it is a plain stacked list.
 */
export function StorySteps({ title, steps, kicker }: { title: string; steps: Step[]; kicker: string }) {
  const ref = useRef<HTMLElement>(null);
  const [i, setI] = useState(0);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setPinned(true);
    const el = ref.current!;
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const max = el.offsetHeight - window.innerHeight;
        const p = max > 0 ? Math.min(0.999, Math.max(0, -r.top / max)) : 0;
        setI(Math.floor(p * steps.length));
      });
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, [steps.length]);

  if (!pinned) {
    return (
      <section ref={ref} className="rule-t py-20 md:py-28" data-chapter="2" aria-labelledby="steps-title">
        <div className="wrap">
          <p className="t-mono text-ash">{kicker}</p>
          <h2 id="steps-title" className="t-h2 mt-4 max-w-[22ch]">{title}</h2>
          <ol className="mt-12 grid gap-12 md:grid-cols-2">
            {steps.map((s, n) => (
              <li key={s.k}>
                <p className="t-mono text-ash">0{n + 1}</p>
                <p className="t-h1 mt-2">{s.k}</p>
                <p className="mt-4 max-w-[40ch] text-bone/85">{s.d}</p>
                <div className="mt-6">{s.media}</div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  const s = steps[i];
  return (
    <section ref={ref} className="st-steps rule-t" style={{ height: `${steps.length * 85 + 40}svh` }} data-chapter="2" aria-labelledby="steps-title">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden pt-[var(--header-h)]">
        <div className="wrap grid-12 items-center gap-y-6">
          <div className="col-span-12 md:col-span-6">
            <p className="t-mono text-ash">{kicker}</p>
            <h2 id="steps-title" className="t-h3 mt-3 max-w-[26ch] text-bone/90">{title}</h2>
            <ol className="mt-6 flex flex-wrap gap-x-4 gap-y-1 md:mt-10 md:gap-x-5" aria-label={title}>
              {steps.map((x, n) => (
                <li key={x.k} className={`t-mono transition-colors ${n === i ? "text-bone underline decoration-rec underline-offset-[6px]" : "text-ash"}`} aria-current={n === i ? "step" : undefined}>
                  0{n + 1} {x.k}
                </li>
              ))}
            </ol>
            <div className="relative mt-4 md:mt-8" aria-live="polite">
              <p key={s.k} className="st-word t-display">{s.k}</p>
              <p key={`${s.k}-d`} className="st-desc t-lead mt-4 max-w-[36ch] text-bone/85">{s.d}</p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6">
            <div key={s.k} className="st-steps-media">
              {s.media}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
