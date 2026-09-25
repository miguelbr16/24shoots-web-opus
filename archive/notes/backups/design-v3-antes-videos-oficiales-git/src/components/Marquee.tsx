interface MarqueeProps {
  text: string;
}

export function Marquee({ text }: MarqueeProps) {
  const item = (
    <span className="mx-10 inline-flex items-center gap-10 text-[11px] font-semibold uppercase tracking-[0.35em] text-muted">
      {text}
      <span className="h-1 w-1 rounded-full bg-accent" aria-hidden />
    </span>
  );

  return (
    <div className="overflow-hidden border-y border-border bg-panel py-5" aria-hidden>
      <div className="flex w-max animate-marquee">
        {item}
        {item}
        {item}
        {item}
        {item}
        {item}
      </div>
    </div>
  );
}
