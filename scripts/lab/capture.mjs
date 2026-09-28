// LAB QA: moments + metrics for /lab/a|d|d12|e at 390×844, 430×932, 1440×900.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/opt/node22/lib/node_modules/");
const { chromium, devices } = require("playwright");
const BASE = process.env.BASE || "http://localhost:3200";
const OUT = new URL("./shots/", import.meta.url).pathname;
const only = process.argv[2] ? process.argv[2].split(",") : ["a", "d", "d12", "e"];
const VPS = [
  { id: "390", w: 390, h: 844, mobile: true },
  { id: "430", w: 430, h: 932, mobile: true },
  { id: "1440", w: 1440, h: 900, mobile: false },
];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--autoplay-policy=no-user-gesture-required"] });
const results = [];

for (const v of only) for (const vp of VPS) {
  const ctx = await browser.newContext({
    viewport: { width: vp.w, height: vp.h },
    deviceScaleFactor: vp.mobile ? 2 : 1,
    isMobile: vp.mobile, hasTouch: vp.mobile,
    userAgent: vp.mobile ? devices["iPhone 13"].userAgent : undefined,
  });
  const page = await ctx.newPage();
  const bytes = { image: 0, media: 0, script: 0, font: 0, document: 0, stylesheet: 0, other: 0 };
  let requests = 0;
  const cdp = await ctx.newCDPSession(page);
  await cdp.send("Network.enable");
  const types = new Map();
  cdp.on("Network.responseReceived", (e) => types.set(e.requestId, e.type));
  cdp.on("Network.loadingFinished", (e) => {
    requests++;
    const t = (types.get(e.requestId) || "Other").toLowerCase();
    const k = t in bytes ? t : t === "fetch" || t === "xhr" ? "other" : "other";
    bytes[k] += e.encodedDataLength;
  });
  await page.addInitScript(() => {
    window.__lcp = 0; window.__cls = 0; window.__lcpEl = "";
    new PerformanceObserver((l) => { for (const e of l.getEntries()) { window.__lcp = e.startTime; window.__lcpEl = (e.element && (e.element.tagName + " " + (e.element.currentSrc || e.element.src || e.element.textContent || "").slice(-60))) || ""; } }).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: "layout-shift", buffered: true });
    window.__inp = 0;
    new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__inp = Math.max(window.__inp, e.duration); }).observe({ type: "event", durationThreshold: 16, buffered: true });
  });
  const t0 = Date.now();
  await page.goto(`${BASE}/lab/${v}`, { waitUntil: "load" });
  const loadMs = Date.now() - t0;
  const shot = async (name) => page.screenshot({ path: `${OUT}${v}-${vp.id}-${name}.jpg`, type: "jpeg", quality: 70 });
  await sleep(3000);
  await shot("1-inicial");
  const initial = await page.evaluate(() => ({ poster01: Math.round((performance.getEntriesByType("resource").find((r) => /lab-media%2F01\.jpg|lab-media\/01\.jpg/.test(r.name)) || {}).responseEnd || 0), lcp: Math.round(window.__lcp), lcpEl: window.__lcpEl, fcp: Math.round(performance.getEntriesByName("first-contentful-paint")[0]?.startTime || 0) }));
  const H = vp.h;
  // first gesture
  if (v === "a") {
    if (vp.mobile) await page.touchscreen.tap(vp.w * 0.8, vp.h * 0.4); else await page.mouse.click(vp.w * 0.8, vp.h * 0.4);
  } else if (v === "e" && vp.mobile) {
    await page.evaluate(() => { const r = document.querySelector("[data-chapter='0'] .snap-x"); r.scrollTo({ left: r.clientWidth }); });
  } else {
    {
      await page.evaluate(([h, desk]) => window.scrollBy(0, desk ? h * 0.38 * 2 : h), [H, !vp.mobile]);
    }
  }
  await sleep(1500);
  await shot("2-primer-gesto");
  // first scroll (one viewport)
  await page.evaluate(([h]) => window.scrollBy(0, h), [H]);
  await sleep(1500);
  await shot("3-primer-scroll");
  // max experience
  if (v === "a") {
    await page.evaluate(() => window.scrollTo(0, 0));
    await sleep(6000);
    await shot("4-maximo");
  } else if (v === "e") {
    await page.evaluate(() => window.scrollTo(0, 0));
    await sleep(500);
    const btn = page.locator(vp.mobile ? "[data-chapter='1'] button:visible" : "button:has-text('Ver en sala'):visible").first();
    if (vp.mobile) { await page.evaluate(() => document.querySelector("[data-chapter='1']").scrollIntoView()); await sleep(800); }
    else { await page.evaluate(([h]) => window.scrollTo(0, h * 0.38 * 7), [H]); await sleep(1200); }
    await btn.click();
    await sleep(1500);
    await shot("4-maximo-sala");
    await page.keyboard.press("Escape");
    await sleep(500);
  } else {
    const frac = vp.mobile ? 11 : 11;
    await page.evaluate(([h, n, desk]) => window.scrollTo(0, desk ? h * 0.38 * n : h * n), [H, v === "d12" ? 6 : frac, !vp.mobile]);
    await sleep(1500);
    await shot("4-maximo");
  }
  // contact
  await page.evaluate(() => document.getElementById("contacto").scrollIntoView());
  await sleep(1200);
  await shot("5-contacto");
  // click a CTA to test INP-ish + tracking
  const m = await page.evaluate(() => {
    const doc = document.documentElement;
    return {
      cls: +window.__cls.toFixed(3),
      inpApprox: Math.round(window.__inp),
      scrollHeight: doc.scrollHeight,
      overflowX: doc.scrollWidth > doc.clientWidth,
      events: (window.__events || []).map((e) => e.name + (e.props.pct ? ":" + e.props.pct : "")),
      videosPlayed: (window.__events || []).filter((e) => e.name === "video_play").length,
      ctaTop: (() => { const el = [...document.querySelectorAll("[data-track='cta']")].find((x) => x.offsetParent && !x.closest("header")); return el ? Math.round(el.getBoundingClientRect().top + window.scrollY) : null; })(),
      contactTop: Math.round(document.getElementById("contacto").getBoundingClientRect().top + window.scrollY),
    };
  });
  results.push({ v, vp: vp.id, loadMs, ...initial, ...m, requests, kb: Object.fromEntries(Object.entries(bytes).map(([k, b]) => [k, Math.round(b / 1024)])) });
  console.log(JSON.stringify(results.at(-1)));
  await ctx.close();
}

// Throttled mobile run (Lighthouse-like slow 4G + 4× CPU) for first render only
for (const v of only) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, userAgent: devices["iPhone 13"].userAgent });
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  await cdp.send("Network.enable");
  await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 });
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  let initBytes = 0; let initReq = 0;
  cdp.on("Network.loadingFinished", (e) => { initBytes += e.encodedDataLength; initReq++; });
  await page.addInitScript(() => { window.__lcp = 0; new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lcp = e.startTime; }).observe({ type: "largest-contentful-paint", buffered: true }); });
  const t0 = Date.now();
  await page.goto(`${BASE}/lab/${v}`, { waitUntil: "load", timeout: 120000 });
  const load = Date.now() - t0;
  await sleep(4000);
  const lcp = await page.evaluate(() => Math.round(window.__lcp));
  const poster01 = await page.evaluate(() => Math.round((performance.getEntriesByType("resource").find((r) => /lab-media%2F01\.jpg|lab-media\/01\.jpg/.test(r.name)) || {}).responseEnd || 0));
  await page.screenshot({ path: `${OUT}${v}-390-slow4g.jpg`, type: "jpeg", quality: 70 });
  const r = { v, throttled: true, loadMs: load, lcp, poster01, first5sKB: Math.round(initBytes / 1024), first5sReq: initReq };
  results.push(r); console.log(JSON.stringify(r));
  await ctx.close();
}
// Reduced motion + no JS checks
for (const v of only) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce", isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/lab/${v}`, { waitUntil: "load" }); await sleep(3000);
  const played = await page.evaluate(() => (window.__events || []).filter((e) => e.name === "video_play").length);
  await page.screenshot({ path: `${OUT}${v}-390-reduced.jpg`, type: "jpeg", quality: 70 });
  await ctx.close();
  const ctx2 = await browser.newContext({ viewport: { width: 390, height: 844 }, javaScriptEnabled: false });
  const p2 = await ctx2.newPage();
  await p2.goto(`${BASE}/lab/${v}`, { waitUntil: "load" }); await sleep(1000);
  await p2.screenshot({ path: `${OUT}${v}-390-nojs.jpg`, type: "jpeg", quality: 70 });
  const nojs = await p2.evaluate(() => ({ imgs: [...document.images].filter((i) => i.complete && i.naturalWidth).length, links: document.querySelectorAll("a[href]").length, h: document.documentElement.scrollHeight }));
  await ctx2.close();
  const r = { v, reducedMotionVideoPlays: played, nojs };
  results.push(r); console.log(JSON.stringify(r));
}
writeFileSync(new URL("./metrics.json", import.meta.url).pathname, JSON.stringify(results, null, 2));
await browser.close();
