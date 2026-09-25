#!/usr/bin/env node
/** Interaction checks: menu, form (JS), language switch, hero reel, reduced motion. */
import { createRequire } from "node:module";
import { execSync } from "node:child_process";
import { join } from "node:path";
const require = createRequire(import.meta.url);
let pw;
try { pw = require("playwright"); } catch { pw = require(join(execSync("npm root -g").toString().trim(), "playwright")); }
const BASE = process.env.BASE || "http://localhost:3000";
const OUT = process.env.OUT || "qa-out";
const ok = (cond, msg) => { console.log(`${cond ? "PASS" : "FAIL"}  ${msg}`); if (!cond) process.exitCode = 1; };

const browser = await pw.chromium.launch();

// Mobile menu
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const btn = page.locator(`button[aria-controls="menu"]`);
  await btn.click();
  ok(await page.locator("#menu").isVisible(), "mobile menu opens");
  ok((await btn.getAttribute("aria-expanded")) === "true", "menu button aria-expanded=true");
  await page.screenshot({ path: `${OUT}/menu-390.jpg`, type: "jpeg", quality: 60 });
  await page.keyboard.press("Escape");
  ok(!(await page.locator("#menu").isVisible()), "Escape closes the menu");
  await btn.click();
  await page.locator("#menu").getByRole("link", { name: /trabajo/i }).click();
  await page.waitForURL("**/trabajo");
  await page.waitForTimeout(400);
  ok(!(await page.locator("#menu").isVisible()), "menu closes after navigating");
  await page.close();
}

// Contact form with JS
{
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(BASE + "/contacto", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: /enviar/i }).click();
  ok(await page.getByText("Escribe tu nombre.").isVisible(), "empty submit shows field errors");
  ok((await page.locator("#contact-name").getAttribute("aria-invalid")) === "true", "invalid field has aria-invalid");
  ok(await page.evaluate(() => document.activeElement?.id === "contact-name"), "focus moves to first invalid field");
  await page.fill("#contact-name", "Prueba QA");
  await page.fill("#contact-email", "qa@example.com");
  await page.fill("#contact-company", "Empresa QA");
  await page.getByText("Evento", { exact: true }).click();
  await page.fill("#contact-message", "Aniversario en junio, unas 300 personas. Queremos película y piezas para redes.");
  await page.waitForTimeout(2600);
  await page.getByRole("button", { name: /enviar/i }).click();
  await page.getByText("Recibido.").waitFor({ timeout: 8000 });
  ok(true, "valid submit shows success (dry-run delivery)");
  await page.screenshot({ path: `${OUT}/form-success.jpg`, type: "jpeg", quality: 60 });
  await page.close();
}

// Language switch keeps the page
{
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(BASE + "/trabajo/imperia-scm", { waitUntil: "networkidle" });
  await page.getByRole("link", { name: "English" }).click();
  await page.waitForURL("**/en/work/imperia-scm");
  ok((await page.locator("html").getAttribute("lang")) === "en", "language switch → /en/work/imperia-scm with lang=en");
  await page.goto(BASE + "/en/services/brand-content", { waitUntil: "networkidle" });
  await page.getByRole("link", { name: "Español" }).click();
  await page.waitForURL("**/servicios/contenido-de-marca");
  ok(true, "service page switches to its Spanish slug");
  await page.close();
}

// Hero reel plays and cuts
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(3500);
  const state = await page.evaluate(() => {
    const v = document.querySelector("section video");
    return { src: v?.currentSrc, paused: v?.paused, t: v?.currentTime };
  });
  ok(Boolean(state.src) && !state.paused && state.t > 0, `hero reel playing (${state.src?.split("/").pop()}, t=${state.t?.toFixed(1)})`);
  const slate1 = await page.locator("text=/Plano \\d\\d\\/05/").first().textContent();
  await page.waitForTimeout(2600);
  const slate2 = await page.locator("text=/Plano \\d\\d\\/05/").first().textContent();
  ok(slate1 !== slate2, `slate advances with the cut (${slate1} → ${slate2})`);
  await page.getByRole("button", { name: /pausar/i }).click();
  const t1 = await page.evaluate(() => document.querySelector("section video").currentTime);
  await page.waitForTimeout(800);
  const t2 = await page.evaluate(() => document.querySelector("section video").currentTime);
  ok(t1 === t2, "pause button stops the reel");
  await page.close();
}

// Reduced motion: no video
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(2500);
  const n = await page.evaluate(() => [...document.querySelectorAll("video")].filter((v) => v.currentSrc).length);
  ok(n === 0, "reduced motion: no video is loaded anywhere on the home page");
  await page.screenshot({ path: `${OUT}/reduced-390.jpg`, type: "jpeg", quality: 60 });
  await ctx.close();
}

// No-JS page still shows content
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "load" });
  const visible = await page.locator("article").first().isVisible();
  const opacity = await page.evaluate(() => getComputedStyle(document.querySelector("[data-reveal]")).opacity);
  ok(visible && opacity === "1", "without JS, reveal content is visible");
  await ctx.close();
}

await browser.close();
