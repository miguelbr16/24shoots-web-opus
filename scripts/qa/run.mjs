#!/usr/bin/env node
/**
 * QA sweep: every route × every viewport. Reports console errors, failed requests,
 * horizontal overflow, heading/alt problems, LCP and CLS, and saves screenshots.
 * Usage: BASE=http://localhost:3000 OUT=./qa-out node scripts/qa/run.mjs [--routes=/,/trabajo] [--vp=390,1440] [--full]
 * Needs Playwright (npx playwright or a global install; resolves `playwright` from NODE_PATH).
 */
import { createRequire } from "node:module";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { execSync } from "node:child_process";

const require = createRequire(import.meta.url);
let pw;
try {
  pw = require("playwright");
} catch {
  pw = require(join(execSync("npm root -g").toString().trim(), "playwright"));
}
const BASE = process.env.BASE || "http://localhost:3000";
const OUT = process.env.OUT || "qa-out";
const arg = (k) => (process.argv.find((a) => a.startsWith(`--${k}=`)) || "").split("=")[1];
const full = process.argv.includes("--full");
const axe = process.argv.includes("--axe") ? (await import("node:fs")).readFileSync(require.resolve("axe-core/axe.min.js"), "utf8") : null;
const reduced = process.argv.includes("--reduced");

const ROUTES = (arg("routes") ||
  "/,/trabajo,/trabajo/huhtamaki-50,/trabajo/imperia-scm,/servicios,/servicios/eventos-corporativos,/servicios/campanas,/estudio,/contacto,/aviso-legal,/en,/en/work/premios-isabel-ferrer,/en/services/brand-content,/en/studio,/en/contact,/no-existe").split(",");
const VPS = (arg("vp") || "360,375,390,430,768,1024,1280,1440,1920").split(",").map(Number);
const heightFor = (w) => (w < 500 ? 844 : w < 1100 ? 1024 : w < 1500 ? 900 : 1080);

mkdirSync(OUT, { recursive: true });
const browser = await pw.chromium.launch();
const report = [];

for (const w of VPS) {
  const ctx = await browser.newContext({ viewport: { width: w, height: heightFor(w) }, reducedMotion: reduced ? "reduce" : "no-preference", deviceScaleFactor: 1 });
  for (const route of ROUTES) {
    const page = await ctx.newPage();
    const errors = [];
    const failed = [];
    // Vercel Analytics/Speed Insights scripts only exist on Vercel deployments.
    page.on("console", (m) => m.type() === "error" && !/_vercel|Failed to load resource: the server responded with a status of 404/.test(m.text()) && errors.push(m.text()));
    page.on("pageerror", (e) => errors.push(String(e)));
    page.on("response", (r) => r.status() >= 400 && !r.url().includes("/_vercel/") && failed.push(`${r.status()} ${r.url()}`));
    await page.addInitScript(() => {
      window.__cls = 0;
      window.__lcp = 0;
      new PerformanceObserver((l) => l.getEntries().forEach((e) => !e.hadRecentInput && (window.__cls += e.value))).observe({ type: "layout-shift", buffered: true });
      new PerformanceObserver((l) => l.getEntries().forEach((e) => (window.__lcp = { t: e.startTime, el: e.element?.tagName + (e.url ? " " + e.url.slice(-60) : "") }))).observe({ type: "largest-contentful-paint", buffered: true });
    });
    const res = await page.goto(BASE + route, { waitUntil: "networkidle" }).catch((e) => ({ status: () => "ERR " + e.message }));
    await page.waitForTimeout(800);
    const lcp = await page.evaluate(() => window.__lcp);
    // Scroll through the page like a person, so reveal-on-scroll content is triggered.
    await page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += Math.round(innerHeight * 0.7)) {
        scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 90));
      }
      scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 900));
    });
    const info = await page.evaluate(() => {
      const doc = document.documentElement;
      const overflow = doc.scrollWidth - doc.clientWidth;
      const wide = overflow > 0 ? [...document.querySelectorAll("body *")].filter((e) => e.getBoundingClientRect().right > doc.clientWidth + 1).slice(0, 5).map((e) => e.tagName + "." + String(e.className).slice(0, 60)) : [];
      return {
        title: document.title,
        lang: doc.lang,
        h1: [...document.querySelectorAll("h1")].map((h) => h.textContent.trim().slice(0, 60)),
        imgNoAlt: [...document.querySelectorAll("img:not([alt])")].length,
        canonical: document.querySelector('link[rel="canonical"]')?.href,
        overflow,
        wide,
        cls: Math.round(window.__cls * 1000) / 1000,

        height: doc.scrollHeight,
        smallTargets: [...document.querySelectorAll("a,button")].filter((e) => {
          const r = e.getBoundingClientRect();
          return r.width > 0 && r.height > 0 && r.height < 24 && getComputedStyle(e).display !== "inline";
        }).length,
      };
    });
    let a11y = [];
    if (axe) {
      await page.addScriptTag({ content: axe });
      a11y = await page.evaluate(async () => {
        const r = await window.axe.run(document, { runOnly: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa", "best-practice"] });
        return r.violations.map((v) => `${v.impact} ${v.id} (${v.nodes.length}): ${v.nodes.slice(0, 2).map((n) => n.target.join(" ")).join(" | ")}`);
      });
    }
    const name = `${w}${route.replace(/\//g, "_") || "_"}`;
    await page.screenshot({ path: join(OUT, `${name}.jpg`), type: "jpeg", quality: 55, fullPage: full });
    report.push({ vp: w, route, status: res?.status?.(), ...info, lcp, errors, failed, a11y });
    await page.close();
  }
  await ctx.close();
}
await browser.close();
writeFileSync(join(OUT, "report.json"), JSON.stringify(report, null, 2));
const issues = report.filter((r) => r.a11y.length || r.errors.length || r.failed.length || r.overflow > 0 || r.h1.length !== 1 || r.imgNoAlt || r.cls > 0.05);
for (const r of issues) console.log(JSON.stringify({ vp: r.vp, route: r.route, h1: r.h1.length, overflow: r.overflow, wide: r.wide, cls: r.cls, errors: r.errors, failed: r.failed.slice(0, 3), imgNoAlt: r.imgNoAlt, a11y: r.a11y }));
console.log(`${report.length} checks, ${issues.length} with issues. LCP sample:`, report.filter((r) => r.route === "/").map((r) => `${r.vp}:${Math.round(r.lcp?.t || 0)}ms ${r.lcp?.el}`).join(" | "));
