"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Img = { src: string; srcSet?: string; sizes?: string };
export interface FilmSegment {
  client: string;
  title: string;
  href: string;
}

interface Props {
  poster: { wide: Img; tall: Img };
  sources: { wide: { webm: string; mp4: string }; tall: { webm: string; mp4: string } };
  /** Poster/video object-position, e.g. "50% 40%". */
  position?: string;
  className?: string;
  /** Hero montage: segment metadata to drive the slate (one entry per `shot` seconds). */
  segments?: FilmSegment[];
  shot?: number;
  slate?: "none" | "bottom" | "top";
  labels?: { pause: string; play: string; shot: string; view: string };
  priority?: boolean;
  alt?: string;
}

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Full-bleed footage. Poster first (LCP), silent loop after idle; never on reduced
 * motion, Save-Data or slow connections. Pauses off-screen. Optional slate shows which
 * project is on screen and links to it.
 */
export function FilmLoop({ poster, sources, position = "50% 50%", className = "", segments, shot = 2.4, slate = "none", labels, priority, alt = "" }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (reduce || conn?.saveData || /(^|-)2g$|^3g$/.test(conn?.effectiveType ?? "")) return;
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      const set = window.matchMedia("(min-width: 768px)").matches ? sources.wide : sources.tall;
      video.innerHTML = `<source src="${set.webm}" type='video/webm; codecs="av01.0.05M.08"'><source src="${set.mp4}" type="video/mp4">`;
      video.load();
      video.play().catch(() => {});
    };
    const onPlaying = () => setPlaying(true);
    video.addEventListener("playing", onPlaying);
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        if (!started) {
          const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
          if (priority && document.readyState !== "complete") window.addEventListener("load", () => (ric ? ric(start, { timeout: 1200 }) : setTimeout(start, 200)), { once: true });
          else if (ric) ric(start, { timeout: 1200 });
          else setTimeout(start, 200);
        } else if (!video.dataset.userPaused) video.play().catch(() => {});
      } else video.pause();
    }, { threshold: 0.25 });
    io.observe(video);
    return () => {
      io.disconnect();
      video.removeEventListener("playing", onPlaying);
    };
  }, [sources, priority]);

  // Which segment is on screen (only when a slate is shown).
  useEffect(() => {
    if (!playing || !segments || slate === "none") return;
    const video = ref.current!;
    const id = window.setInterval(() => {
      const i = Math.min(segments.length - 1, Math.floor(video.currentTime / shot));
      setIdx((prev) => (prev === i ? prev : i));
    }, 200);
    return () => window.clearInterval(id);
  }, [playing, segments, shot, slate]);

  const toggle = () => {
    const v = ref.current!;
    if (v.paused) {
      delete v.dataset.userPaused;
      v.play().catch(() => {});
      setPaused(false);
    } else {
      v.dataset.userPaused = "1";
      v.pause();
      setPaused(true);
    }
  };

  const seg = segments?.[idx];

  return (
    <div className={`${/\b(absolute|fixed)\b/.test(className) ? "" : "relative"} overflow-hidden bg-ink-2 ${className}`}>
      <picture>
        <source media="(min-width: 768px)" srcSet={poster.wide.srcSet ?? poster.wide.src} sizes={poster.wide.sizes} />
        <img
          src={poster.tall.src}
          srcSet={poster.tall.srcSet}
          sizes={poster.tall.sizes}
          alt={alt}
          fetchPriority={priority ? "high" : "auto"}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          style={{ objectPosition: position }}
          className={`absolute inset-0 size-full object-cover ${priority ? "expose" : ""}`}
        />
      </picture>
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
        style={{ objectPosition: position }}
        className={`absolute inset-0 size-full object-cover transition-opacity duration-300 ${playing ? "opacity-100" : "opacity-0"}`}
      />
      {slate !== "none" && seg && labels && (
        <div className={`absolute inset-x-0 z-30 flex items-center justify-between gap-4 px-[var(--gutter)] ${slate === "top" ? "top-0 pt-2" : "bottom-0 pb-4 md:pb-5"}`}>
          <Link href={seg.href} className="t-mono flex min-w-0 items-center gap-2.5 py-2 text-bone">
            <span className="rec-dot" aria-hidden />
            <span className="shrink-0 text-bone/70">
              {labels.shot} {pad(idx + 1)}/{pad(segments!.length)}
            </span>
            <span className="truncate">
              {seg.client} — {seg.title}
            </span>
          </Link>
          {playing && (
            <button type="button" onClick={toggle} className="t-mono -mr-2 inline-flex min-h-11 min-w-11 items-center justify-center text-bone hover:text-rec" aria-label={paused ? labels.play : labels.pause}>
              {paused ? "▶" : "❚❚"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
