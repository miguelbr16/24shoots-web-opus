"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Img = { src: string; srcSet?: string; sizes?: string };

interface Props {
  image: { wide: Img; tall: Img; alt: string };
  p1: string;
  p2: string;
  p3a: string;
  p3b: string;
  scroll: string;
  /** Short line under the brand phrase (what the studio is). */
  descriptor: string;
  /** What you can hire, visible from the first second, with the main action. */
  offer: string;
  cta: { label: string; href: string };
}

/**
 * Chapter 0 — the opening. A pinned frame with three phrases that change as you scroll
 * while the image dims (copy in src/content/story.ts). Progress is read from scroll
 * position (no library). Without JS the three phrases simply stack under the image;
 * with reduced motion the phases switch without transitions.
 */
export function StoryOpening({ image, p1, p2, p3a, p3b, scroll, descriptor, offer, cta }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const max = el.offsetHeight - window.innerHeight;
        const p = max > 0 ? Math.min(1, Math.max(0, -r.top / max)) : 0;
        // Continuous values go straight to CSS (no React render per frame); React only
        // re-renders when the phase changes.
        el.style.setProperty("--p", String(p));
        setPhase(p < 0.3 ? 0 : p < 0.62 ? 1 : 2);
        setStarted(p > 0.05);
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
  }, []);

  return (
    <section ref={ref} className="st-open relative -mt-[var(--header-h)] bg-ink" aria-labelledby="story-title" data-chapter-open>
      <div className="st-open-stage">
        <picture>
          <source media="(min-width: 768px)" srcSet={image.wide.srcSet ?? image.wide.src} sizes={image.wide.sizes} />
          <img
            src={image.tall.src}
            srcSet={image.tall.srcSet}
            sizes={image.tall.sizes}
            alt={image.alt}
            fetchPriority="high"
            decoding="async"
            className="st-open-img"
          />
        </picture>
        {/* the lights go down */}
        <div className="st-open-shade" aria-hidden />

        <div className="st-stack wrap">
          <p className={`st-phase t-display ${phase === 0 ? "on" : ""}`}>{p1}</p>
          <p className={`st-phase t-display ${phase === 1 ? "on" : ""}`}>{p2}</p>
          <div className={`st-phase ${phase === 2 ? "on" : ""}`}>
            <h1 id="story-title" className="t-display">
              <span className="block">{p3a}</span>
              <span className="block text-ash">{p3b}</span>
            </h1>
            <p className="t-lead mt-6 max-w-[34ch] text-bone/85">{descriptor}</p>
          </div>
        </div>

        {/* What 24SHOOTS sells + the main action, above the fold from the first second */}
        <div className="st-offer wrap">
          <p className="max-w-[46ch] text-[0.95rem] leading-snug text-bone/85 md:text-base">{offer}</p>
          <div className="flex shrink-0 items-center gap-5">
            <span className={`st-hint t-mono hidden md:inline ${started ? "off" : ""}`} aria-hidden>
              {scroll} ↓
            </span>
            <Link href={cta.href} className="cta-slab" data-track="cta" data-cta="hablemos" data-location="home-opening">
              <span>{cta.label}</span>
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
