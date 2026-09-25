import Image from "next/image";
import { Button } from "./ui";

interface ReelBandProps {
  title: string;
  subtitle: string;
  cta: string;
  href: string;
  image?: string;
  video?: string | null;
}

export function ReelBand({
  title,
  subtitle,
  cta,
  href,
  image = "/imagenes_insta/ig-photo-3.jpg",
  video = null,
}: ReelBandProps) {
  return (
    <section className="relative overflow-hidden border-y border-border">
      <div className="absolute inset-0">
        {video ? (
          <video
            src={video}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={image}
            className="h-full w-full object-cover"
          />
        ) : (
          <Image src={image} alt="" fill className="object-cover" sizes="100vw" />
        )}
      </div>
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative mx-auto flex max-w-6xl flex-col items-start justify-center gap-6 px-4 py-28 md:px-6 md:py-36">
        <h2 className="max-w-2xl text-3xl font-light tracking-tight md:text-5xl">{title}</h2>
        <p className="max-w-xl text-base text-foreground/70 md:text-lg">{subtitle}</p>
        <Button href={href} variant="secondary" showArrow>
          {cta}
        </Button>
      </div>
    </section>
  );
}
