import Image from "next/image";
import { Button } from "./ui";
import { getRoute } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1920&q=85";

interface HeroProps {
  locale: Locale;
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export function Hero({
  locale,
  eyebrow,
  title,
  subtitle,
  description,
  ctaPrimary,
  ctaSecondary,
}: HeroProps) {
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          className="object-cover animate-ken-burns"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-black/30" />
      <div className="grain absolute inset-0" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-4 pb-16 pt-28 md:px-6 md:pb-24">
        <p className="animate-fade-up text-[11px] font-semibold uppercase tracking-[0.35em] text-foreground/70">
          {eyebrow}
        </p>
        <h1 className="animate-fade-up mt-6 max-w-4xl text-5xl font-light leading-[1.02] tracking-tight md:text-7xl lg:text-[5.5rem]">
          {title.split(" ").map((word, i) =>
            word.toLowerCase() === "impacto" || word.toLowerCase() === "impact" ? (
              <span key={i} className="font-medium text-accent">
                {word}{" "}
              </span>
            ) : (
              <span key={i}>{word} </span>
            )
          )}
        </h1>
        <p className="animate-fade-up-delay mt-6 max-w-xl text-lg font-light leading-snug text-foreground/90 md:text-2xl">
          {subtitle}
        </p>
        <p className="animate-fade-up-delay mt-5 max-w-lg text-sm leading-relaxed text-foreground/60 md:text-base">
          {description}
        </p>
        <div className="animate-fade-up-delay mt-10 flex flex-wrap gap-4">
          <Button href={getRoute(locale, "contact")} showArrow>
            {ctaPrimary}
          </Button>
          <Button href={getRoute(locale, "portfolio")} variant="secondary">
            {ctaSecondary}
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <span className="text-[10px] uppercase tracking-[0.3em] text-muted">Scroll</span>
        <div className="h-10 w-px bg-gradient-to-b from-accent to-transparent" />
      </div>
    </section>
  );
}
