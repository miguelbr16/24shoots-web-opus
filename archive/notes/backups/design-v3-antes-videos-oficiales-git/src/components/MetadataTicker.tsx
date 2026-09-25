interface MetadataTickerProps {
  items: string[];
}

export function MetadataTicker({ items }: MetadataTickerProps) {
  const segment = (
    <div className="flex shrink-0 items-center gap-8 px-4">
      {items.map((item) => (
        <span
          key={item}
          className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.3em] text-muted/80"
        >
          {item}
          <span className="ml-8 text-accent/50" aria-hidden>
            //
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      className="overflow-hidden border-y border-border bg-panel py-2.5"
      aria-hidden
    >
      <div className="flex w-max animate-marquee">
        {segment}
        {segment}
        {segment}
      </div>
    </div>
  );
}
