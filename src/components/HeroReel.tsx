"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

export interface ReelSegment {
  client: string;
  title: string;
  href: string;
}

interface Props {
  segments: ReelSegment[];
  shot: number;
  poster: { wide: { srcSet?: string; src: string; sizes?: string }; tall: { srcSet?: string; src: string; sizes?: string } };
  sources: { wide: { webm: string; mp4: string }; tall: { webm: string; mp4: string } };
  labels: { reel: string; pause: string; play: string; view: string; shot: string };
}

type Mode = "idle" | "playing" | "static";

const pad = (n: number) => String(n).padStart(2, "0");
const timecode = (t: number) => {
  const s = Math.floor(t);
  const f = Math.floor((t - s) * 25);
  return `00:00:${pad(s)}:${pad(f)}`;
};

/**
 * The hero montage: real shots from five projects, hard cuts every `shot` seconds.
 * Poster is the LCP; the video loads after the page is idle and never on
 * reduced motion or Save-Data. The shot list on desktop is also navigation:
 * hovering a name cuts the monitor to that shot, clicking opens the project.
 */
export function HeroReel({ segments, shot, poster, sources, labels }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const tcRef = useRef<HTMLSpanElement>(null);
  const trackRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [mode, setMode] = useState<Mode>("idle");
  const [idx, setIdx] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const idxRef = useRef(0);
  const n = segments.length;

  // Load and start the reel once the page is idle.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduce || saveData) {
      setMode("static");
      return;
    }
    let cancelled = false;
    const start = () => {
      if (cancelled) return;
      const set = window.matchMedia("(min-width: 768px)").matches ? sources.wide : sources.tall;
      const webm = document.createElement("source");
      webm.src = set.webm;
      webm.type = 'video/webm; codecs="av01.0.05M.08"';
      const mp4 = document.createElement("source");
      mp4.src = set.mp4;
      mp4.type = "video/mp4";
      video.append(webm, mp4);
      video.load();
      video.play().catch(() => setMode("static"));
    };
    const onPlaying = () => setMode("playing");
    video.addEventListener("playing", onPlaying);
    const schedule = () => {
      const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
      if (ric) ric(start, { timeout: 1500 });
      else setTimeout(start, 300);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    return () => {
      cancelled = true;
      video.removeEventListener("playing", onPlaying);
      window.removeEventListener("load", schedule);
    };
  }, [sources]);

  // Frame-accurate slate: timecode, shot index and per-shot progress.
  useEffect(() => {
    if (mode !== "playing") return;
    const video = videoRef.current!;
    let handle = 0;
    const useRvfc = "requestVideoFrameCallback" in video;
    const tick = () => {
      const t = video.currentTime;
      const i = Math.min(n - 1, Math.floor(t / shot));
      const p = (t - i * shot) / shot;
      if (tcRef.current) tcRef.current.textContent = timecode(t);
      trackRefs.current.forEach((el, k) => {
        if (!el) return;
        el.parentElement!.dataset.done = k < i ? "true" : "false";
        el.style.transform = `scaleX(${k === i ? p : k < i ? 1 : 0})`;
      });
      if (i !== idxRef.current) {
        idxRef.current = i;
        setIdx(i);
      }
      handle = useRvfc ? video.requestVideoFrameCallback(tick) : requestAnimationFrame(tick);
    };
    handle = useRvfc ? video.requestVideoFrameCallback(tick) : requestAnimationFrame(tick);
    return () => {
      if (useRvfc) video.cancelVideoFrameCallback(handle);
      else cancelAnimationFrame(handle);
    };
  }, [mode, n, shot]);

  // Pause when off-screen or when the user asks.
  useEffect(() => {
    const video = videoRef.current;
    const frame = frameRef.current;
    if (!video || !frame || mode !== "playing") return;
    if (userPaused) {
      video.pause();
      return;
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    io.observe(frame);
    return () => io.disconnect();
  }, [mode, userPaused]);

  const cutTo = useCallback(
    (i: number) => {
      const video = videoRef.current;
      if (mode !== "playing" || !video) return;
      video.currentTime = i * shot + 0.02;
    },
    [mode, shot]
  );

  const current = segments[idx];

  return (
    <div className="grid-12 gap-y-4">
      {/* Shot list — desktop only */}
      <ol className="col-span-3 hidden flex-col justify-end gap-0 self-stretch lg:flex" aria-label={labels.reel}>
        {segments.map((s, i) => (
          <li key={s.href} className="rule-t last:rule-b">
            <Link
              href={s.href}
              onMouseEnter={() => cutTo(i)}
              onFocus={() => cutTo(i)}
              className="group grid grid-cols-[2.2rem_1fr] items-baseline gap-x-2 py-3"
              aria-current={i === idx && mode === "playing" ? "true" : undefined}
            >
              <span className="t-mono flex items-center gap-1.5 text-ash">
                <span className={`rec-dot size-1.5 transition-opacity ${i === idx ? "opacity-100" : "opacity-0"}`} aria-hidden />
                {pad(i + 1)}
              </span>
              <span className="min-w-0">
                <span className={`t-credit block text-[1.45rem] transition-colors ${i === idx ? "text-bone" : "text-ash group-hover:text-bone"}`}>
                  {s.client}
                </span>
                <span className="mt-1 block truncate text-sm text-ash">{s.title}</span>
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <div className="col-span-12 lg:col-span-9">
        <div
          ref={frameRef}
          className="relative -mx-[var(--gutter)] aspect-[4/5] max-h-[56svh] w-[calc(100%+2*var(--gutter))] md:w-auto overflow-hidden bg-ink-2 md:mx-0 md:aspect-video md:max-h-none lg:max-h-[calc(100svh-var(--header-h)-19rem)] lg:min-h-[22rem] lg:w-full"
        >
          <picture>
            <source media="(min-width: 768px)" srcSet={poster.wide.srcSet} sizes={poster.wide.sizes} />
            <img
              src={poster.tall.src}
              srcSet={poster.tall.srcSet}
              sizes={poster.tall.sizes}
              alt=""
              fetchPriority="high"
              decoding="async"
              className="expose absolute inset-0 size-full object-cover"
            />
          </picture>
          <video
            ref={videoRef}
            muted
            playsInline
            loop
            preload="none"
            aria-hidden="true"
            tabIndex={-1}
            className={`absolute inset-0 size-full object-cover transition-opacity duration-300 ${mode === "playing" ? "opacity-100" : "opacity-0"}`}
          />
        </div>

        {/* Slate */}
        <div className="mt-3 grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2">
          <Link href={current.href} className="group flex min-w-0 items-center gap-3 py-1">
            <span className="rec-dot" aria-hidden />
            <span className="t-mono shrink-0 text-ash">
              {labels.shot} {pad(idx + 1)}/{pad(n)}
            </span>
            <span className="t-mono truncate">
              {current.client} — {current.title}
            </span>
            <span className="t-mono hidden shrink-0 text-ash group-hover:text-bone sm:inline">{labels.view} →</span>
          </Link>
          <div className="flex items-center gap-4">
            <span ref={tcRef} className="t-mono hidden text-ash sm:inline" aria-hidden>
              00:00:00:00
            </span>
            {mode === "playing" && (
              <button
                type="button"
                onClick={() => setUserPaused((v) => !v)}
                className="t-mono -mr-2 inline-flex min-h-11 min-w-11 items-center justify-center px-2 hover:text-rec"
                aria-label={userPaused ? labels.play : labels.pause}
              >
                {userPaused ? "▶" : "❚❚"}
              </button>
            )}
          </div>
          <div className="col-span-2 grid grid-cols-5 gap-1" aria-hidden>
            {segments.map((s, i) => (
              <div key={s.href} className="reel-track" data-done="false">
                <span ref={(el) => void (trackRefs.current[i] = el)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
