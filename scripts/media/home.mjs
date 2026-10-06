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
mkdirSync(OUT, { recursive: true });

const ff = (args) => {
  const r = spawnSync(FF, ["-loglevel", "error", "-y", ...args], { stdio: "inherit" });
  if (r.status !== 0) throw new Error(`ffmpeg failed: ${args.join(" ")}`);
};
const jpg = (input, vf, out, ss) => ff([...(ss != null ? ["-ss", String(ss)] : []), "-i", input, "-vf", vf, "-frames:v", "1", "-q:v", "3", join(OUT, out)]);

// Opening: the gold frame (Oceans). Wide = a 16:9 band around the motif; tall = 3:4.
jpg(join(SRC, "oceans/DdZl3ulkUWn-1.jpg"), "crop=3072:1728:0:1000,scale=2400:1350", "open-wide.jpg");
jpg(join(SRC, "oceans/DdZl3ulkUWn-1.jpg"), "scale=1200:1600", "open-tall.jpg");

// Four lines, 4:5 cards.
jpg(join(SRC, "oceans/DdZl3ulkUWn-3.jpg"), "crop=3072:3840:0:128,scale=1080:1350", "line-brand.jpg");
jpg(join(IG, "ig-reel-9.mp4"), "crop=720:900:0:200,scale=1080:1350", "line-business.jpg", 7.5); // Aurum, drone over the house
jpg(join(IG, "ig-reel-4.mp4"), "crop=574:718:351:0,scale=1080:1350", "line-personal.jpg", 20.5); // Alex Navarro, locker corridor

// Method, "Grabar": Physem session.
jpg(join(SRC, "physem/photo-03.jpg"), "scale=1200:1600", "method-shoot.jpg");

// Example chapter: Oceans.
jpg(join(SRC, "oceans/DdZl3ulkUWn-0.jpg"), "scale=1200:1600", "oceans-shelf.jpg");
jpg(join(SRC, "oceans/DdZl3ulkUWn-2.jpg"), "scale=1200:1600", "oceans-detail.jpg");
const reel = join(SRC, "oceans/Dd7IddURvo3.mp4");
const seg = ["-ss", "8.7", "-t", "4.6", "-i", reel, "-an", "-vf", "scale=720:1280,fps=30"];
ff([...seg, "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", "36", "-row-mt", "1", join(OUT, "oceans-loop.webm")]);
ff([...seg, "-c:v", "libx264", "-crf", "26", "-preset", "slow", "-pix_fmt", "yuv420p", "-movflags", "+faststart", join(OUT, "oceans-loop.mp4")]);
jpg(reel, "scale=720:1280", "oceans-loop.jpg", 10);

console.log("home media → public/media/home");
