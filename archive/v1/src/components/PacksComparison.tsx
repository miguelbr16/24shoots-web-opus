import type { PackComparisonRow } from "@/lib/types";

interface PacksComparisonProps {
  title: string;
  packs: { id: string; title: string }[];
  rows: PackComparisonRow[];
  yesLabel: string;
  noLabel: string;
}

export function PacksComparison({
  title,
  packs,
  rows,
  yesLabel,
  noLabel,
}: PacksComparisonProps) {
  return (
    <div className="mt-20 overflow-x-auto border border-border">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <caption className="sr-only">{title}</caption>
        <thead>
          <tr className="border-b border-border bg-surface">
            <th scope="col" className="p-4 font-medium text-muted">
              {title}
            </th>
            {packs.map((pack) => (
              <th
                key={pack.id}
                scope="col"
                className="p-4 font-medium tracking-tight"
              >
                {pack.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-border/80">
              <th scope="row" className="p-4 font-normal text-muted">
                {row.label}
              </th>
              {packs.map((pack) => {
                const included = row.packs[pack.id as keyof typeof row.packs];
                return (
                  <td key={pack.id} className="p-4">
                    <span className={included ? "text-accent" : "text-muted/50"}>
                      {included ? yesLabel : noLabel}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
