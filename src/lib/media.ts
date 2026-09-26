import { getImageProps } from "next/image";
import { preload } from "react-dom";

type Img = { src: string; srcSet?: string; sizes?: string };

/** next/image-optimised srcset for use inside <picture> / client components. */
export function img(src: string, width: number, height: number, sizes: string, quality = 70): Img {
  const p = getImageProps({ src, width, height, sizes, quality, alt: "" }).props;
  return { src: p.src, srcSet: p.srcSet, sizes: p.sizes };
}

/** The hero montage (5 real projects, hard cuts). */
export function heroFilm(sizesWide = "100vw") {
  const wide = img("/media/hero/poster-16x9.jpg", 1920, 1080, sizesWide);
  const tall = img("/media/hero/poster-4x5.jpg", 864, 1080, "100vw");
  return {
    poster: { wide, tall },
    sources: {
      wide: { webm: "/media/hero/hero-16x9.webm", mp4: "/media/hero/hero-16x9.mp4" },
      tall: { webm: "/media/hero/hero-4x5.webm", mp4: "/media/hero/hero-4x5.mp4" },
    },
  };
}

/** Preload the art-directed LCP poster (only the variant the viewport uses). */
export function preloadPosters(p: { wide: Img; tall: Img }) {
  type Opts = Parameters<typeof preload>[1];
  preload(p.tall.src, { as: "image", imageSrcSet: p.tall.srcSet, imageSizes: p.tall.sizes, fetchPriority: "high", media: "(max-width: 767px)" } as Opts);
  preload(p.wide.src, { as: "image", imageSrcSet: p.wide.srcSet, imageSizes: p.wide.sizes, fetchPriority: "high", media: "(min-width: 768px)" } as Opts);
}

/** A case preview loop (same file for wide/tall; object-position crops it). */
export function caseFilm(cover: string, preview: { webm: string; mp4: string }, sizes = "100vw") {
  const i = img(cover, 1920, 1080, sizes);
  return { poster: { wide: i, tall: i }, sources: { wide: preview, tall: preview } };
}
