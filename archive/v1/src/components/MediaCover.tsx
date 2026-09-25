"use client";

import Image from "next/image";
import { useRef } from "react";

interface MediaCoverProps {
  image?: string;
  video?: string | null;
  alt?: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  playOnHover?: boolean;
}

export function MediaCover({
  image,
  video,
  alt = "",
  className = "absolute inset-0 h-full w-full object-cover",
  imageClassName,
  sizes = "100vw",
  priority = false,
  playOnHover = true,
}: MediaCoverProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasVideo = Boolean(video);
  const hasImage = Boolean(image);

  const play = () => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    void v.play();
  };

  const pause = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
  };

  const hoverProps = hasVideo && playOnHover
    ? { onMouseEnter: play, onMouseLeave: pause }
    : {};

  return (
    <div className="absolute inset-0" {...hoverProps}>
      {hasImage && (
        <Image
          src={image!}
          alt={alt}
          fill
          className={imageClassName ?? className}
          sizes={sizes}
          priority={priority}
        />
      )}
      {hasVideo && (
        <video
          ref={videoRef}
          src={video!}
          muted
          loop
          playsInline
          preload="metadata"
          poster={image}
          className={`${className} ${
            hasImage && playOnHover ? "opacity-0 transition duration-500 group-hover:opacity-100" : ""
          }`}
        />
      )}
    </div>
  );
}
