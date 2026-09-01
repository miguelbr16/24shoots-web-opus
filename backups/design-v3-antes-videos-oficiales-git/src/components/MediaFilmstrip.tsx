import Image from "next/image";

interface MediaFilmstripProps {
  items: { src: string; alt?: string }[];
  reverse?: boolean;
}

export function MediaFilmstrip({ items, reverse }: MediaFilmstripProps) {
  if (!items.length) return null;

  const tile = (item: { src: string; alt?: string }, key: string) => (
    <div
      key={key}
      className="relative h-20 w-28 shrink-0 overflow-hidden border border-border/60 bg-media sm:h-24 sm:w-36 md:h-28 md:w-44"
    >
      <Image
        src={item.src}
        alt={item.alt ?? ""}
        fill
        className="object-cover"
        sizes="176px"
      />
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );

  const row = (
    <div className="flex shrink-0 items-center gap-2 px-1">
      {items.map((item, i) => tile(item, `${item.src}-${i}`))}
    </div>
  );

  return (
    <div className="overflow-hidden border-b border-border bg-panel py-3" aria-hidden>
      <div className={`flex w-max ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}>
        {row}
        {row}
        {row}
      </div>
    </div>
  );
}
