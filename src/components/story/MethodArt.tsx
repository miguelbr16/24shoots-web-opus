/**
 * Generic illustrations of the method (calendar, script, report). They are labelled
 * as examples and carry no client data: no real dates, figures or copy.
 */
type Art = {
  example: string;
  days: string[];
  formats: string[];
  shots: string[][];
  shotHead: string[];
  report: string[];
};

const frame = "relative aspect-[4/3] w-full overflow-hidden border border-bone/15 bg-ink-2 p-4 md:p-6";
const Tag = ({ children }: { children: string }) => <span className="t-mono absolute right-3 top-3 text-[0.7rem] text-ash">{children}</span>;

// Which format sits on which day (fixed pattern, illustrative only).
const plan = [
  [0, -1, 2, 1, 0, 2, -1],
  [1, 0, 2, -1, 0, 2, 3],
  [0, -1, 2, 1, -1, 0, 2],
  [3, 0, -1, 1, 0, 2, -1],
];

const swatch = ["bg-rec", "bg-bone/70", "bg-bone/30", "border border-bone/50"];

export function CalendarArt({ art, label }: { art: Art; label: string }) {
  return (
    <div className={frame} role="img" aria-label={label}>
      <Tag>{art.example}</Tag>
      <div className="grid h-full grid-rows-[1fr_auto] gap-3 pt-5">
        <div className="grid grid-cols-7 grid-rows-[auto_repeat(4,1fr)] gap-1.5">
          {art.days.map((d, i) => (
            <span key={i} className="t-mono text-center text-[0.7rem] text-ash">
              {d}
            </span>
          ))}
          {plan.flat().map((f, i) => (
            <span key={i} className="flex items-end border border-bone/10 p-1">
              {f >= 0 && <span className={`block h-2 w-full md:h-2.5 ${swatch[f]}`} />}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {art.formats.map((f, i) => (
            <span key={f} className="t-mono flex items-center gap-1.5 text-[0.7rem] text-ash">
              <span className={`inline-block size-2.5 ${swatch[i]}`} />
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ShotsArt({ art, label }: { art: Art; label: string }) {
  const secs = art.shots.map((s) => parseFloat(s[2].replace(",", ".")));
  const max = Math.max(...secs);
  return (
    <div className={frame} role="img" aria-label={label}>
      <Tag>{art.example}</Tag>
      <div className="flex h-full flex-col justify-center gap-3 pt-4">
        <div className="t-mono grid grid-cols-[2rem_1fr_5rem] gap-3 text-[0.7rem] text-ash">
          {art.shotHead.map((h) => (
            <span key={h}>{h}</span>
          ))}
        </div>
        {art.shots.map((s, i) => (
          <div key={s[0]} className="grid grid-cols-[2rem_1fr_5rem] items-center gap-3 border-t border-bone/10 pt-3">
            <span className="t-mono text-ash">{s[0]}</span>
            <span className="text-[0.95rem] text-bone">{s[1]}</span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 shrink-0 bg-rec" style={{ width: `${(secs[i] / max) * 1.75}rem` }} />
              <span className="t-mono whitespace-nowrap text-[0.7rem] text-ash">{s[2]}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const bars = [38, 52, 44, 70, 61, 86];

export function ReportArt({ art, label }: { art: Art; label: string }) {
  return (
    <div className={frame} role="img" aria-label={label}>
      <Tag>{art.example}</Tag>
      <div className="grid h-full grid-rows-[1fr_auto] gap-4 pt-4">
        <div className="flex items-end gap-2 border-b border-bone/15">
          {bars.map((h, i) => (
            <span key={i} className={`flex-1 ${i === bars.length - 1 ? "bg-rec" : "bg-bone/20"}`} style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="grid gap-2">
          {art.report.map((r, i) => (
            <div key={r} className="grid grid-cols-[5.5rem_1fr] items-center gap-3">
              <span className="t-mono text-[0.7rem] text-ash">{r}</span>
              <span className="h-2 bg-bone/15" style={{ width: `${[85, 70, 55][i]}%` }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
