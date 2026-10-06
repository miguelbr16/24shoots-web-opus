#!/usr/bin/env node
/**
 * Home V3 media: stills and one loop from client work published on Instagram
 * (permission to publish confirmed by 24SHOOTS). Sources are NOT committed; they are
 * the files downloaded from the public posts listed below, plus archive/media/instagram.
 *
 *   SRC=/path/to/sources FFMPEG=/path/to/ffmpeg node scripts/media/home.mjs
 *
 * SRC layout:
 *   oceans/DdZl3ulkUWn-{0..3}.jpg   instagram.com/p/DdZl3ulkUWn (Oceans Social Club, 3072×4096)
 *   oceans/Dd7IddURvo3.mp4          instagram.com/reel/Dd7IddURvo3 (Oceans interior reel)
 *   physem/photo-{01..05}.jpg       instagram.com/p/DchAP52jCX8 (Physem VLC, 3072×4096)
 *   physem/DbEUur6OGvm.mp4          instagram.com/reel/DbEUur6OGvm (Physem VLC "Off Season")
 * Event films come from public/media/<case>/film.mp4.
 * Replace with the original masters when 24SHOOTS sends them and re-run.
 */
import { spawnSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const FF = process.env.FFMPEG || "ffmpeg";
const ROOT = new URL("../../", import.meta.url).pathname;
const SRC = process.env.SRC;
if (!SRC) throw new Error("Set SRC to the folder with the downloaded sources (see header).");
const OUT = join(ROOT, "public/media/home");
const IG = join(ROOT, "archive/media/instagram");
const FILM = (slug) => join(ROOT, "public/media", slug, "film.mp4");
mkdirSync(OUT, { recursive: true });

const ff = (args) => {
  const r = spawnSync(FF, ["-loglevel", "error", "-y", ...args], { stdio: "inherit" });
  if (r.status !== 0) throw new Error(`ffmpeg failed: ${args.join(" ")}`);
};
const jpg = (input, vf, out, ss) => ff([...(ss != null ? ["-ss", String(ss)] : []), "-i", input, "-vf", vf, "-frames:v", "1", "-q:v", "3", join(OUT, out)]);

// Four lines, 4:5 cards.
jpg(join(SRC, "oceans/DdZl3ulkUWn-3.jpg"), "crop=3072:3840:0:128,scale=1080:1350", "line-brand.jpg");
jpg(join(IG, "ig-reel-9.mp4"), "crop=720:900:0:200,scale=1080:1350", "line-business.jpg", 7.5); // Aurum, drone over the house
jpg(join(IG, "ig-reel-4.mp4"), "crop=574:718:351:0,scale=1080:1350", "line-personal.jpg", 20.5); // Alex Navarro, locker corridor

// Method. "Grabar": our camera on set (Imperia SCM, the monitor shows the shot).
jpg(FILM("imperia-scm"), "crop=1440:1080:480:0,scale=1200:900", "method-camera.jpg", 38.7);
// "Preparar": storyboard thumbnails taken from a finished Oceans reel.
[1, 4, 10, 21].forEach((t, i) => jpg(join(SRC, "oceans/Dd7IddURvo3.mp4"), "scale=360:640", `board-${i + 1}.jpg`, t));

// Example chapter: Oceans.
jpg(join(SRC, "oceans/DdZl3ulkUWn-0.jpg"), "scale=1200:1600", "oceans-shelf.jpg");
jpg(join(SRC, "oceans/DdZl3ulkUWn-2.jpg"), "scale=1200:1600", "oceans-detail.jpg");


// ---- Loops (AV1 webm + H.264 mp4, like scripts/media/build.mjs) ----
const av1 = ["-an", "-c:v", "libaom-av1", "-cpu-used", "5", "-row-mt", "1", "-b:v", "0", "-pix_fmt", "yuv420p", "-g", "24"];
const h264 = ["-an", "-c:v", "libx264", "-preset", "slow", "-pix_fmt", "yuv420p", "-movflags", "+faststart"];
const V = "scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280,fps=25,setsar=1";
const loop = (name, input, t, d, vf = V) => {
  ff(["-ss", String(t), "-t", String(d), "-i", input, "-vf", vf, ...h264, "-crf", "27", join(OUT, `${name}.mp4`)]);
  ff(["-ss", String(t), "-t", String(d), "-i", input, "-vf", vf, ...av1, "-crf", "40", join(OUT, `${name}.webm`)]);
  jpg(input, vf.replace(",fps=25", ""), `${name}.jpg`, t + 0.4);
};
// Landscape sources cropped to a vertical window (x offset in source pixels).
const vcrop = (w, h, x) => `crop=${Math.round((h * 9) / 16)}:${h}:${x}:0,scale=720:1280,fps=25,setsar=1`;

// Examples carousel: one loop per client.
loop("oceans-reel", join(SRC, "oceans/Dd7IddURvo3.mp4"), 8.7, 4.6);
loop("physem-loop", join(SRC, "physem/DbEUur6OGvm.mp4"), 13.4, 4);
loop("aurum-loop", join(IG, "ig-reel-9.mp4"), 5.6, 4.4);
loop("alex-loop", join(IG, "ig-reel-4.mp4"), 18.6, 4, vcrop(1276, 718, 436));
jpg(join(SRC, "physem/photo-01.jpg"), "scale=1200:1600", "physem-1.jpg");
jpg(join(SRC, "physem/photo-04.jpg"), "scale=1200:1600", "physem-2.jpg");
jpg(join(IG, "ig-reel-9.mp4"), "scale=720:1280", "aurum-1.jpg", 22);
jpg(join(IG, "ig-reel-9.mp4"), "scale=720:1280", "aurum-2.jpg", 10.5);
jpg(join(IG, "ig-reel-4.mp4"), "crop=404:718:230:0,scale=720:1280", "alex-1.jpg", 14);
jpg(join(IG, "ig-reel-4.mp4"), "crop=404:718:300:0,scale=720:1280", "alex-2.jpg", 78);

// ---- Opening montage: hard cuts across the four lines of work ----
const CUT = 1.3;
const cuts = [
  [join(SRC, "oceans/Dd7IddURvo3.mp4"), 8.8, V],
  [join(SRC, "physem/DbEUur6OGvm.mp4"), 13.6, V],
  [join(IG, "ig-reel-9.mp4"), 7, V],
  [join(IG, "ig-reel-4.mp4"), 19.8, vcrop(1276, 718, 436)],
  [FILM("imperia-scm"), 38.3, vcrop(1920, 1080, 800)],
  [join(SRC, "oceans/Dd7IddURvo3.mp4"), 0.3, V],
  [join(SRC, "physem/DbEUur6OGvm.mp4"), 23.6, V],
  [FILM("huhtamaki-50"), 86, vcrop(1920, 1080, 656)],
  [join(IG, "ig-reel-4.mp4"), 13.6, vcrop(1276, 718, 230)],
];
const inputs = cuts.flatMap(([f, t]) => ["-ss", String(t), "-t", String(CUT), "-i", f]);
const fc = cuts.map(([, , vf], i) => `[${i}:v]${vf},trim=duration=${CUT},setpts=PTS-STARTPTS[c${i}]`).join(";") + ";" + cuts.map((_, i) => `[c${i}]`).join("") + `concat=n=${cuts.length}:v=1:a=0[out]`;
const tall = join(OUT, "hero-tall");
ff([...inputs, "-filter_complex", fc, "-map", "[out]", ...h264, "-crf", "28", `${tall}.mp4`]);
ff([...inputs, "-filter_complex", fc, "-map", "[out]", ...av1, "-crf", "42", `${tall}.webm`]);
jpg(`${tall}.mp4`, "null", "hero-tall.jpg", 0.5);

// Desktop: three vertical panels of the same loop, each three cuts apart, on a dark field.
const LEN = CUT * cuts.length;
const panel = (k) => ["-stream_loop", "1", "-ss", String(k * 3 * CUT), "-t", String(LEN), "-i", `${tall}.mp4`];
const wfc = [0, 1, 2].map((k) => `[${k}:v]scale=596:1060,setsar=1[p${k}]`).join(";") + ";color=c=0x0e0d0c:s=1920x1080:d=" + LEN + ":r=25[bg];[bg][p0]overlay=36:10[a];[a][p1]overlay=662:10[b];[b][p2]overlay=1288:10,trim=duration=" + LEN + "[out]";
const wide = join(OUT, "hero-wide");
ff([...panel(0), ...panel(1), ...panel(2), "-filter_complex", wfc, "-map", "[out]", ...h264, "-crf", "29", `${wide}.mp4`]);
ff([...panel(0), ...panel(1), ...panel(2), "-filter_complex", wfc, "-map", "[out]", ...av1, "-crf", "44", `${wide}.webm`]);
jpg(`${wide}.mp4`, "null", "hero-wide.jpg", 0.5);

console.log("home media → public/media/home");
