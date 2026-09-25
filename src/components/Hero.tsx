import Link from "next/link";
import { getImageProps } from "next/image";
import { preload } from "react-dom";
import { href, type Locale } from "@/lib/i18n";
import { t } from "@/content/copy";
import { cases, heroMedia } from "@/content/cases";
import { HeroReel } from "./HeroReel";

export function Hero({ locale }: { locale: Locale }) {
  const c = t(locale).hero;
  const segments = heroMedia.segments.map((slug) => {
    const k = cases.find((x) => x.slug === slug)!;
    return { client: k.client, title: k.title[locale], href: href.case(locale, k.slug) };
  });
  const common = { alt: "", quality: 70 };
  const wide = getImageProps({ ...common, src: "/media/hero/poster-16x9.jpg", width: 1920, height: 1080, sizes: "(min-width: 1024px) 75vw, 100vw" }).props;
  const tall = getImageProps({ ...common, src: "/media/hero/poster-4x5.jpg", width: 864, height: 1080, sizes: "100vw" }).props;

  // Art-directed LCP image: preload only the variant the viewport will use.
  preload(tall.src, { as: "image", imageSrcSet: tall.srcSet, imageSizes: tall.sizes, fetchPriority: "high", media: "(max-width: 767px)" } as Parameters<typeof preload>[1]);
  preload(wide.src, { as: "image", imageSrcSet: wide.srcSet, imageSizes: wide.sizes, fetchPriority: "high", media: "(min-width: 768px)" } as Parameters<typeof preload>[1]);

  return (
    <section aria-labelledby="hero-title" className="wrap flex flex-col gap-8 pt-0 pb-10 md:pt-6 lg:min-h-[calc(100svh-var(--header-h))] lg:justify-between lg:gap-10">
      <HeroReel
        segments={segments}
        shot={heroMedia.shot}
        poster={{ wide: { src: wide.src, srcSet: wide.srcSet, sizes: wide.sizes }, tall: { src: tall.src, srcSet: tall.srcSet, sizes: tall.sizes } }}
        sources={{
          wide: { webm: "/media/hero/hero-16x9.webm", mp4: "/media/hero/hero-16x9.mp4" },
          tall: { webm: "/media/hero/hero-4x5.webm", mp4: "/media/hero/hero-4x5.mp4" },
        }}
        labels={{ reel: c.reelLabel, pause: c.pause, play: c.play, view: c.viewCase, shot: c.shot }}
      />

      <div className="grid-12 items-end gap-y-6">
        <div className="col-span-12 lg:col-span-7 xl:col-span-8">
          <p className="t-mono mb-4 text-ash">{c.eyebrow}</p>
          <h1 id="hero-title" className={`t-display ${locale === "en" ? "lg:text-[clamp(3rem,1rem+5.6vw,8.5rem)]" : ""}`}>
            {c.title}
          </h1>
        </div>
        <div className="col-span-12 lg:col-span-5 lg:pb-2 xl:col-span-4">
          <p className="max-w-[40ch] text-ash lg:text-[1.05rem]">{c.lead}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-2">
            <Link href={href.page(locale, "contact")} className="cta">
              {c.primary} <span aria-hidden>→</span>
            </Link>
            <Link href={href.page(locale, "work")} className="cta cta--quiet">
              {c.secondary}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
