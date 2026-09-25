"use client";

import { useEffect, useRef, useState } from "react";

let active: HTMLVideoElement | null = null;

/**
 * Silent preview loop over a still. Plays when mostly in view (one at a time),
 * or on hover with a fine pointer. Never loads on reduced motion or Save-Data.
 */
export function PreviewLoop({ webm, mp4, className = "" }: { webm: string; mp4: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduce || saveData) return;

    let loaded = false;
    const play = () => {
      if (!loaded) {
        video.innerHTML = `<source src="${webm}" type='video/webm; codecs="av01.0.05M.08"'><source src="${mp4}" type="video/mp4">`;
        video.load();
        loaded = true;
      }
      if (active && active !== video) active.pause();
      active = video;
      video.play().then(() => setOn(true)).catch(() => {});
    };
    const stop = () => {
      video.pause();
      if (active === video) active = null;
    };

    const io = new IntersectionObserver(([e]) => (e.intersectionRatio >= 0.6 ? play() : stop()), { threshold: [0, 0.6] });
    io.observe(video);
    const host = video.parentElement!;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (fine) {
      host.addEventListener("mouseenter", play);
    }
    return () => {
      io.disconnect();
      host.removeEventListener("mouseenter", play);
    };
  }, [webm, mp4]);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
      className={`absolute inset-0 size-full object-cover transition-opacity duration-300 ${on ? "opacity-100" : "opacity-0"} ${className}`}
    />
  );
}
