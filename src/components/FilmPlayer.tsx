"use client";

import Image from "next/image";
import { useRef, useState } from "react";

/** Poster first; the film (with sound and native controls) loads only on request. */
export function FilmPlayer({ src, poster, title, playLabel, duration }: { src: string; poster: string; title: string; playLabel: string; duration: number }) {
  const [on, setOn] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mins = `${Math.floor(duration / 60)}:${String(Math.round(duration % 60)).padStart(2, "0")}`;
  return (
    <div className="relative -mx-[var(--gutter)] aspect-video bg-ink-2 md:mx-0">
      {on ? (
        <video
          ref={(el) => {
            videoRef.current = el;
            el?.focus();
          }}
          src={src}
          poster={poster}
          controls
          autoPlay
          playsInline
          preload="auto"
          className="absolute inset-0 size-full bg-black"
          aria-label={title}
        />
      ) : (
        <button type="button" onClick={() => setOn(true)} className="group absolute inset-0 block size-full cursor-pointer text-left">
          <Image src={poster} alt="" fill priority sizes="(min-width: 1760px) 1700px, 100vw" quality={72} className="expose object-cover" />
          <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" aria-hidden />
          <span className="absolute bottom-0 left-0 flex items-center gap-4 p-[var(--gutter)] md:p-8">
            <span className="flex size-14 items-center justify-center rounded-full border border-bone/70 transition-colors group-hover:border-rec group-hover:bg-rec group-hover:text-ink md:size-20" aria-hidden>
              <svg viewBox="0 0 24 24" className="ml-1 size-5 md:size-7" fill="currentColor"><path d="M7 4.5v15l12-7.5z" /></svg>
            </span>
            <span>
              <span className="block font-medium">
                {playLabel}
                <span className="sr-only">: {title}</span>
              </span>
              <span className="t-mono text-bone/80">{mins}</span>
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
