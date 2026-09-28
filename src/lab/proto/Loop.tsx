"use client";

import { useEffect, useRef, useState } from "react";
import type { ProtoFrame } from "./data";
import { motionAllowed, track } from "./track";

interface Props {
  frame: ProtoFrame;
  /** Play now. */
  active: boolean;
  /** Warm up the source (next frame) without playing. */
  near?: boolean;
  /** Loop the clip; when false, `onEnded` fires (trailer mode). */
  loop?: boolean;
  onEnded?: () => void;
  priority?: boolean;
  /** "cover" fills the box; object-position uses the frame focal point on tall boxes. */
  className?: string;
  context: string;
}

/**
 * LAB ONLY — one real frame: the still is always there (it is the poster and the LCP),
 * the short loop from the same shot plays on top only when active and motion is allowed.
 */
export function Loop({ frame, active, near, loop = true, onEnded, priority, className = "", context }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const loaded = useRef(false);
  const reported = useRef(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const load = () => {
      if (loaded.current || !motionAllowed()) return false;
      loaded.current = true;
      v.innerHTML = `<source src="${frame.loop.webm}" type='video/webm; codecs="av01.0.05M.08"'><source src="${frame.loop.mp4}" type="video/mp4">`;
      v.load();
      return true;
    };
    if (active) {
      load();
      if (loaded.current) {
        v.currentTime = 0;
        v.play().catch(() => {});
      }
    } else {
      if (near) load();
      v.pause();
      setPlaying(false);
    }
  }, [active, near, frame]);

  return (
    <div className={`${/\b(absolute|fixed)\b/.test(className) ? "" : "relative"} overflow-hidden bg-[#0b0b0b] ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- srcset comes from getImageProps */}
      <img
        src={frame.poster.src}
        srcSet={frame.poster.srcSet}
        sizes={frame.poster.sizes}
        alt={frame.alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        style={{ objectPosition: `${frame.fx}% 50%` }}
        className="absolute inset-0 size-full object-cover"
      />
      <video
        ref={ref}
        muted
        playsInline
        loop={loop}
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
        onPlaying={() => {
          setPlaying(true);
          if (!reported.current) {
            reported.current = true;
            track("video_play", { n: frame.n, slug: frame.slug, context });
          }
        }}
        onEnded={onEnded}
        style={{ objectPosition: `${frame.fx}% 50%` }}
        className={`absolute inset-0 size-full object-cover ${playing && active ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
