#!/usr/bin/env node
/**
 * LAB ONLY — derives the 24-frame set used by the /lab/a|d|e prototypes.
 * Every frame is a real moment from the delivered films (timecodes = the curated stills
 * in scripts/media/build.mjs). For each one: a 1600px still and a short silent loop that
 * stays inside the same shot (cuts are detected so a loop never jumps to another shot).
 * Output: public/lab-media/NN.{jpg,mp4,webm} + src/lab/proto/frames.generated.json
 * Usage: FFMPEG=/path/to/ffmpeg node scripts/lab/frames.mjs
 */
import { spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const FF = process.env.FFMPEG || "ffmpeg";
const ROOT = new URL("../../", import.meta.url).pathname;
const OUT = join(ROOT, "public/lab-media");
mkdirSync(OUT, { recursive: true });

// [case, still index (1-based, see public/media/<case>/stills), time (s), focal x % for tall crops]
const FRAMES = [
  ["huhtamaki-50", 1, 10.67, 50], ["huhtamaki-50", 2, 17.3, 45], ["huhtamaki-50", 3, 34.13, 55],
  ["huhtamaki-50", 7, 72.12, 45], ["huhtamaki-50", 9, 80.48, 50], ["huhtamaki-50", 10, 89.97, 50],
  ["premios-isabel-ferrer", 1, 5.92, 30], ["premios-isabel-ferrer", 3, 23.92, 50], ["premios-isabel-ferrer", 5, 54.6, 60],
  ["premios-isabel-ferrer", 7, 63.13, 42], ["premios-isabel-ferrer", 8, 74.1, 50],
  ["premios-innovacion-valencia", 2, 12.87, 40], ["premios-innovacion-valencia", 3, 36.05, 50], ["premios-innovacion-valencia", 7, 62.75, 45],
  ["premios-innovacion-valencia", 8, 66.27, 50], ["premios-innovacion-valencia", 10, 73.82, 55],
  ["imperia-scm", 2, 39.05, 40], ["imperia-scm", 3, 45.0, 52], ["imperia-scm", 7, 62.38, 45], ["imperia-scm", 8, 71.23, 50],
  ["gala-esport-manises", 1, 0.77, 30], ["gala-esport-manises", 7, 38.15, 50], ["gala-esport-manises", 8, 42.85, 38], ["gala-esport-manises", 9, 49.1, 40],
];

const run = (args) => spawnSync(FF, ["-hide_banner", ...args], { encoding: "utf8" });
const ff = (args) => {
  const r = run(["-loglevel", "error", "-y", ...args]);
  if (r.status !== 0) throw new Error(r.stderr);
};
function cuts(src, from, to) {
  const r = run(["-ss", String(from), "-t", String(to - from), "-i", src, "-vf", "scale=320:-2,select='gt(scene,0.28)',showinfo", "-an", "-f", "null", "-"]);
  return [...r.stderr.matchAll(/pts_time:([\d.]+)/g)].map((m) => from + Number(m[1]));
}
const pad = (n) => String(n).padStart(2, "0");
const out = [];
FRAMES.forEach(([slug, still, t, fx], i) => {
  const src = join(ROOT, "public/media", slug, "film.mp4");
  const c = cuts(src, Math.max(0, t - 3), t + 3);
  const before = Math.max(0, ...c.filter((x) => x <= t), t - 3);
  const after = Math.min(...c.filter((x) => x > t + 0.05), t + 3);
  let start = Math.max(before + 0.08, t - 0.6);
  let end = Math.min(after - 0.08, start + 2.4);
  if (end - start < 1.2) start = Math.max(before + 0.08, end - 1.2);
  const d = Math.max(0.8, end - start);
  const n = pad(i + 1);
  ff(["-ss", String(t), "-i", src, "-frames:v", "1", "-vf", "scale=1600:-2", "-q:v", "3", join(OUT, `${n}.jpg`)]);
  const vf = "scale=960:-2,fps=25";
  ff(["-ss", String(start), "-t", String(d), "-i", src, "-an", "-vf", vf, "-c:v", "libx264", "-preset", "slow", "-crf", "27", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-g", "25", join(OUT, `${n}.mp4`)]);
  ff(["-ss", String(start), "-t", String(d), "-i", src, "-an", "-vf", vf, "-c:v", "libaom-av1", "-cpu-used", "6", "-row-mt", "1", "-crf", "40", "-b:v", "0", "-pix_fmt", "yuv420p", "-g", "25", join(OUT, `${n}.webm`)]);
  out.push({ n: i + 1, slug, still, t, fx, loop: [Math.round(start * 100) / 100, Math.round(d * 100) / 100] });
  console.log(n, slug, t, "loop", start.toFixed(2), d.toFixed(2), "cuts", c.map((x) => x.toFixed(2)).join(","));
});
writeFileSync(join(ROOT, "src/lab/proto/frames.generated.json"), JSON.stringify(out, null, 2) + "\n");
