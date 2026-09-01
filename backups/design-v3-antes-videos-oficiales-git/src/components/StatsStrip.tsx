interface StatsStripProps {
  stats: { value: string; label: string }[];
}

export function StatsStrip({ stats }: StatsStripProps) {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-border border-x border-border md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="px-6 py-10 text-center md:py-12">
            <p className="text-2xl font-light tracking-tight text-foreground md:text-3xl">
              {stat.value}
            </p>
            <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
