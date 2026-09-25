import { AccentRule } from "./AccentRule";

interface SectorsBandProps {
  title: string;
  sectors: { id: string; label: string }[];
}

export function SectorsBand({ title, sectors }: SectorsBandProps) {
  const items = sectors.map((s) => s.label);

  const row = (
    <div className="flex shrink-0 items-center gap-8">
      {items.map((label) => (
        <span
          key={label}
          className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.25em] text-foreground/80"
        >
          {label}
          <span className="ml-8 text-accent" aria-hidden>
            /
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <section className="section-rule-y overflow-hidden bg-surface py-6">
      <div className="mb-4 flex flex-col items-center gap-3">
        <AccentRule align="center" wide />
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.3em] text-muted">
          {title}
        </p>
      </div>
      <div className="flex w-max animate-marquee">
        {row}
        {row}
        {row}
      </div>
    </section>
  );
}
