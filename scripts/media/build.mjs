#!/usr/bin/env node
/**
 * Media pipeline for 24SHOOTS V2.
 *
 * Source of truth: the delivered films in public/media/<case>/film.mp4.
 * Output (committed, served statically):
 *   public/media/<case>/stills/NN.jpg      1920×1080 stills (next/image serves AVIF/WebP)
 *   public/media/<case>/preview.{webm,mp4} short silent loop for the work index
 *   public/media/hero/hero-16x9.{webm,mp4} + poster-16x9.jpg   desktop hero montage
 *   public/media/hero/hero-4x5.{webm,mp4}  + poster-4x5.jpg    mobile hero montage
 *   public/og/<case>.jpg, public/og/default.jpg                1200×630 social cards
 *   src/content/media.generated.json       durations / segment map used by the app
 *
 * Usage: FFMPEG=/path/to/ffmpeg node scripts/media/build.mjs [--only=stills,hero,previews,og]
 * Replace film.mp4 with a higher-quality master and re-run to upgrade every derivative.
 */
import { spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync, existsSync, rmSync } from "node:fs";
import { join } from "node:path";

const FF = process.env.FFMPEG || "ffmpeg";
const ROOT = new URL("../../", import.meta.url).pathname;
const MEDIA = join(ROOT, "public/media");
const only = (process.argv.find((a) => a.startsWith("--only=")) || "").slice(7).split(",").filter(Boolean);
const want = (step) => only.length === 0 || only.includes(step);

// Timestamps (seconds) were chosen by reviewing every shot of each film.
const CASES = {
  "huhtamaki-50": {
    stills: [10.67, 17.3, 34.13, 45.12, 48.98, 58.82, 72.12, 76.22, 80.48, 89.97],
    cover: 9, // index into stills
    preview: [73.4, 4],
    // "Un día, en doce planos": contact sheet on the home page
    sheet: [5.33, 17.3, 21.37, 27.3, 34.13, 45.12, 51.97, 58.82, 60.55, 72.12, 76.22, 89.97],
  },
  "premios-isabel-ferrer": {
    stills: [5.92, 19.9, 23.92, 31.72, 54.6, 58.92, 63.13, 74.1, 79.25],
    cover: 7,
    preview: [71.0, 4],
  },
  "premios-innovacion-valencia": {
    stills: [2.25, 12.87, 36.05, 40.77, 43.13, 52.0, 62.75, 66.27, 70.75, 73.82],
    cover: 5,
    preview: [45.0, 4],
  },
  "imperia-scm": {
    stills: [29.1, 39.05, 45.0, 47.68, 57.4, 59.9, 62.38, 71.23, 76.47],
    cover: 4,
    preview: [43.3, 3.3],
  },
  "gala-esport-manises": {
    stills: [0.77, 5.1, 12.83, 14.45, 23.73, 33.2, 38.15, 42.85, 49.1],
    cover: 6,
    preview: [25.6, 4],
  },
};

// Hero montage: hard cuts, 2.4 s per shot. cropX = left edge (px, 1920 source) of the 4:5 mobile crop.
const HERO = [
  { case: "huhtamaki-50", t: 88.4, cropX: 880 },
  { case: "premios-isabel-ferrer", t: 21.4, cropX: 528 },
  { case: "gala-esport-manises", t: 41.6, cropX: 300 },
  { case: "premios-innovacion-valencia", t: 49.8, cropX: 420 },
  { case: "imperia-scm", t: 58.7, cropX: 640 },
];
const SHOT = 2.4;

function ff(args) {
  const r = spawnSync(FF, ["-hide_banner", "-loglevel", "error", "-y", ...args], { stdio: "inherit" });
  if (r.status !== 0) throw new Error(`ffmpeg failed: ${args.join(" ")}`);
}
function duration(file) {
  const r = spawnSync(FF, ["-hide_banner", "-i", file], { encoding: "utf8" });
  const m = /Duration: (\d+):(\d+):([\d.]+)/.exec(r.stderr);
  return m ? +m[1] * 3600 + +m[2] * 60 + +m[3] : 0;
}
const film = (c) => join(MEDIA, c, "film.mp4");
const pad = (n) => String(n).padStart(2, "0");

const h264 = ["-an", "-c:v", "libx264", "-preset", "slow", "-profile:v", "high", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-g", "24"];
const av1 = ["-an", "-c:v", "libaom-av1", "-cpu-used", "5", "-row-mt", "1", "-b:v", "0", "-pix_fmt", "yuv420p", "-g", "24"];

const generated = { cases: {}, hero: { shot: SHOT, segments: HERO.map((h) => h.case) } };

for (const [slug, cfg] of Object.entries(CASES)) {
  const src = film(slug);
  if (!existsSync(src)) throw new Error(`missing ${src}`);
  generated.cases[slug] = {
    duration: Math.round(duration(src) * 100) / 100,
    stills: cfg.stills.map((_, i) => `/media/${slug}/stills/${pad(i + 1)}.jpg`),
    cover: `/media/${slug}/stills/${pad(cfg.cover + 1)}.jpg`,
    preview: { webm: `/media/${slug}/preview.webm`, mp4: `/media/${slug}/preview.mp4` },
    film: `/media/${slug}/film.mp4`,
    og: `/og/${slug}.jpg`,
    sheet: cfg.sheet ? cfg.sheet.map((_, i) => `/media/${slug}/sheet/${pad(i + 1)}.jpg`) : undefined,
    sheetTimes: cfg.sheet,
  };

  if (want("stills")) {
    const dir = join(MEDIA, slug, "stills");
    rmSync(dir, { recursive: true, force: true });
    mkdirSync(dir, { recursive: true });
    cfg.stills.forEach((t, i) => ff(["-ss", String(t), "-i", src, "-frames:v", "1", "-q:v", "3", join(dir, `${pad(i + 1)}.jpg`)]));
    if (cfg.sheet) {
      const sd = join(MEDIA, slug, "sheet");
      rmSync(sd, { recursive: true, force: true });
      mkdirSync(sd, { recursive: true });
      cfg.sheet.forEach((t, i) =>
        ff(["-ss", String(t), "-i", src, "-frames:v", "1", "-vf", "scale=800:-2", "-q:v", "4", join(sd, `${pad(i + 1)}.jpg`)])
      );
    }
  }

  if (want("previews")) {
    const [t, d] = cfg.preview;
    const vf = "scale=960:-2,fps=25";
    ff(["-ss", String(t), "-t", String(d), "-i", src, "-vf", vf, ...h264, "-crf", "28", join(MEDIA, slug, "preview.mp4")]);
    ff(["-ss", String(t), "-t", String(d), "-i", src, "-vf", vf, ...av1, "-crf", "40", join(MEDIA, slug, "preview.webm")]);
  }

  if (want("og")) {
    mkdirSync(join(ROOT, "public/og"), { recursive: true });
    const t = cfg.stills[cfg.cover];
    ff(["-ss", String(t), "-i", src, "-frames:v", "1", "-vf", "scale=1200:-2,crop=1200:630", "-q:v", "3", join(ROOT, "public/og", `${slug}.jpg`)]);
  }
}

if (want("hero")) {
  const dir = join(MEDIA, "hero");
  mkdirSync(dir, { recursive: true });
  const inputs = HERO.flatMap((h) => ["-ss", String(h.t), "-t", String(SHOT), "-i", film(h.case)]);
  const n = HERO.length;
  const build = (w, h, crop) => {
    const parts = HERO.map((s, i) => {
      const c = crop ? `crop=864:1080:${s.cropX}:0,` : "";
      return `[${i}:v]${c}scale=${w}:${h},fps=25,setsar=1,setpts=PTS-STARTPTS[v${i}]`;
    });
    return `${parts.join(";")};${HERO.map((_, i) => `[v${i}]`).join("")}concat=n=${n}:v=1:a=0[out]`;
  };
  for (const [name, w, h, crop] of [["16x9", 1280, 720, false], ["4x5", 720, 900, true]]) {
    const fc = build(w, h, crop);
    ff([...inputs, "-filter_complex", fc, "-map", "[out]", ...h264, "-crf", "29", join(dir, `hero-${name}.mp4`)]);
    ff([...inputs, "-filter_complex", fc, "-map", "[out]", ...av1, "-crf", "38", join(dir, `hero-${name}.webm`)]);
    const first = HERO[0];
    const pvf = crop ? `crop=864:1080:${first.cropX}:0` : "scale=1920:-2";
    ff(["-ss", String(first.t), "-i", film(first.case), "-frames:v", "1", "-vf", pvf, "-q:v", "3", join(dir, `poster-${name}.jpg`)]);
  }
  if (want("og")) {
    ff(["-ss", String(HERO[0].t), "-i", film(HERO[0].case), "-frames:v", "1", "-vf", "scale=1200:-2,crop=1200:630", "-q:v", "3", join(ROOT, "public/og/default.jpg")]);
  }
}

writeFileSync(join(ROOT, "src/content/media.generated.json"), JSON.stringify(generated, null, 2) + "\n");
console.log("media pipeline done");
