/**
 * Illustrations of the method: a content calendar, a storyboard, the camera on set and
 * a monthly report. Calendar and report are labelled as examples and carry no client
 * data; the storyboard frames come from a published Oceans reel.
 */
type Img = { src: string; srcSet?: string; sizes?: string };
type Art = {
  example: string;
  days: string[];
  formats: string[];
  month: string;
  pillars: string[];
  shots: string[][];
  rec: string;
  kpis: string[];
  report: string[];
  reportLines: string[];
};

const frame = "relative aspect-[4/3] w-full overflow-hidden border border-bone/15 bg-ink-2 p-3 md:p-5";
const Tag = ({ children }: { children: string }) => <span className="t-mono absolute right-3 top-3 text-[0.65rem] text-ash">{children}</span>;

// [format, pillar] per piece and day of a 31-day month. Fixed, illustrative pattern.
const swatch = ["bg-rec text-ink", "bg-bone/80 text-ink", "bg-bone/25 text-bone", "border border-bone/50 text-bone"];
const plan: [number, number][][] = [
  [[0, 0]], [[2, 2]], [[1, 1], [2, 2]], [[0, 1]], [[0, 3], [2, 3]], [[2, 2]], [[1, 0]],
  [[0, 0], [2, 2]], [[3, 3]], [[1, 1]], [[2, 2], [0, 2]], [[0, 3]], [[2, 2]], [[1, 0]],
  [[2, 2]], [[0, 1], [2, 1]], [[1, 0]], [[0, 2]], [[2, 3], [0, 3]], [[2, 2]], [[1, 1]],
  [[0, 0]], [[2, 2]], [[1, 1], [2, 1]], [[3, 2]], [[0, 3], [2, 3]], [[2, 2]], [[0, 0]],
  [[1, 1]], [[0, 2], [2, 2]], [[2, 2]], [], [], [], [],
];

export function CalendarArt({ art, label }: { art: Art; label: string }) {
  return (
    <div className={frame} role="img" aria-label={label}>
      <Tag>{art.example}</Tag>
      <div className="grid h-full grid-rows-[auto_auto_1fr_auto] gap-1.5">
        <p className="t-mono text-[0.65rem] text-bone">{art.month}</p>
        <div className="grid grid-cols-7 gap-1">
          {art.days.map((d, i) => (
            <span key={i} className="t-mono text-center text-[0.6rem] text-ash">
              {d}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-7 grid-rows-5 gap-1">
          {plan.map((items, i) => (
            <span key={i} className={`flex min-h-0 flex-col gap-0.5 overflow-hidden border border-bone/10 p-0.5 md:p-1 ${items.length ? "" : "opacity-40"}`}>
              <span className="t-mono text-[0.5rem] leading-none text-ash md:text-[0.55rem]">{i < 31 ? i + 1 : ""}</span>
              {items.map(([f, pl], j) => (
                <span key={j} className={`block truncate px-0.5 text-[0.5rem] leading-[1.35] md:text-[0.58rem] ${swatch[f]}`}>
                  <span className="hidden lg:inline">{art.formats[f]}</span>
                  <span className="lg:hidden">&nbsp;</span>
                  <span className="sr-only"> · {art.pillars[pl]}</span>
                </span>
              ))}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-0.5">
          {art.formats.map((f, i) => (
            <span key={f} className="t-mono flex items-center gap-1 text-[0.6rem] text-ash">
              <span className={`inline-block size-2 ${swatch[i]}`} />
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Storyboard: four frames, what each shot is and how long it lasts in the edit. */
export function ShotsArt({ art, label, frames }: { art: Art; label: string; frames: Img[] }) {
  const secs = art.shots.map((s) => parseFloat(s[2].replace(",", ".")));
  const total = secs.reduce((a, b) => a + b, 0);
  return (
    <div className={frame} role="img" aria-label={label}>
      <Tag>{art.example}</Tag>
      <div className="grid h-full grid-rows-[1fr_auto] gap-3 pt-4">
        <div className="grid min-h-0 grid-cols-4 gap-2">
          {art.shots.map((s, i) => (
            <div key={s[0]} className="flex min-h-0 flex-col gap-1.5">
              {/* eslint-disable-next-line @next/next/no-img-element -- srcset from getImageProps */}
              <img src={frames[i].src} srcSet={frames[i].srcSet} sizes={frames[i].sizes} alt="" loading="lazy" decoding="async" className="min-h-0 w-full flex-1 border border-bone/15 object-cover" />
              <span className="t-mono text-[0.6rem] text-ash">
                {s[0]} · {s[2]}
              </span>
              <span className="truncate text-[0.7rem] leading-tight text-bone md:text-[0.8rem]">{s[1]}</span>
            </div>
          ))}
        </div>
        <div className="flex h-2 gap-0.5" aria-hidden>
          {secs.map((x, i) => (
            <span key={i} className={i % 2 ? "bg-bone/40" : "bg-rec"} style={{ width: `${(x / total) * 100}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/** The camera on set, with a recording badge. */
export function ShootArt({ art, image, alt }: { art: Art; image: Img; alt: string }) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element -- srcset from getImageProps */}
      <img src={image.src} srcSet={image.srcSet} sizes={image.sizes} alt={alt} loading="lazy" decoding="async" className="size-full object-cover" />
      <span className="t-mono absolute left-3 top-3 inline-flex items-center gap-2 bg-ink/70 px-2 py-1 text-[0.7rem] text-bone" aria-hidden>
        <span className="rec-dot" />
        {art.rec}
      </span>
    </div>
  );
}

// Relative shapes only: no figures.
const spark = [
  [30, 42, 38, 55, 60, 72],
  [40, 38, 50, 48, 62, 66],
  [20, 26, 24, 40, 46, 58],
];
const bars = [38, 52, 44, 70, 61, 86];

export function ReportArt({ art, label }: { art: Art; label: string }) {
  return (
    <div className={frame} role="img" aria-label={label}>
      <Tag>{art.example}</Tag>
      <div className="grid h-full grid-rows-[auto_1fr_auto] gap-3 pt-4">
        <div className="grid grid-cols-3 gap-2">
          {art.kpis.map((k, i) => (
            <div key={k} className="border border-bone/10 p-2">
              <span className="t-mono block text-[0.6rem] text-ash">{k}</span>
              <svg viewBox="0 0 100 40" className="mt-1 h-6 w-full md:h-8" aria-hidden>
                <polyline fill="none" stroke="currentColor" strokeWidth="3" className={i === 0 ? "text-rec" : "text-bone/60"} points={spark[i].map((v, x) => `${x * 20},${40 - (v / 80) * 40}`).join(" ")} />
              </svg>
              <span className={`t-mono text-[0.7rem] ${i === 0 ? "text-rec" : "text-bone/70"}`}>↗</span>
            </div>
          ))}
        </div>
        <div className="flex min-h-0 items-end gap-1.5 border-b border-bone/15">
          {bars.map((h, i) => (
            <span key={i} className={`flex-1 ${i === bars.length - 1 ? "bg-rec" : "bg-bone/20"}`} style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="grid gap-1">
          {art.report.map((r, i) => (
            <div key={r} className="grid grid-cols-[4.5rem_1fr] items-baseline gap-2 md:grid-cols-[5.5rem_1fr]">
              <span className="t-mono text-[0.6rem] text-ash">{r}</span>
              <span className="truncate text-[0.7rem] text-bone md:text-[0.8rem]">{art.reportLines[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
