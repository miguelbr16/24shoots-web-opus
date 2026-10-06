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

// Home story: the opening changes phase with scroll, steps advance, the example film plays
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const op = (sel) => page.evaluate((s) => getComputedStyle(document.querySelector(s)).opacity, sel);
  await page.waitForTimeout(800);
  ok((await op(".st-stack > .st-phase:nth-child(1)")) === "1" && (await op(".st-stack > .st-phase:nth-child(3)")) === "0", "opening starts on «Tu marca ya tiene algo que contar.»");
  await page.evaluate(() => { const s = document.querySelector(".st-open"); scrollTo(0, (s.offsetHeight - innerHeight) * 0.85); });
  await page.waitForTimeout(900);
  ok((await op(".st-stack > .st-phase:nth-child(3)")) === "1" && (await page.locator("#story-title").isVisible()), "scrolling the opening reveals the brand line (h1)");
  const word = async (f) => {
    await page.evaluate((f) => { const s = document.querySelector("[data-chapter='2']"); scrollTo(0, s.getBoundingClientRect().top + scrollY + (s.offsetHeight - innerHeight) * f); }, f);
    await page.waitForTimeout(700);
    return page.locator(".st-word").textContent();
  };
  const w1 = await word(0.05), w3 = await word(0.9);
  ok(w1 === "Pensar" && w3 === "Medir", `method steps advance with scroll (${w1} → ${w3})`);
  ok((await page.locator("[data-chapter='3'] li a").count()) === 4, "four lines of work, each linked");
  await page.evaluate(() => document.querySelector("[data-chapter='4'] video").scrollIntoView({ block: "center" }));
  await page.waitForTimeout(3000);
  const film = await page.evaluate(() => { const v = document.querySelector("[data-chapter='4'] video"); return { src: v?.currentSrc, paused: v?.paused }; });
  ok(Boolean(film.src) && !film.paused, `example film loop plays in view (${film.src?.split("/").pop()})`);
  await page.close();
}

// WhatsApp: hidden over the opening CTA, then opens preset messages; Escape closes
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const wa = page.locator('button[data-track="whatsapp_open"]');
  const vis = () => page.evaluate(() => getComputedStyle(document.querySelector('button[data-track="whatsapp_open"]').parentElement).opacity);
  await page.waitForTimeout(600);
  ok((await vis()) === "0", "WhatsApp button stays out of the way of the opening CTA");
  await page.evaluate(() => scrollTo(0, innerHeight * 3));
  await page.waitForTimeout(700);
  ok((await vis()) === "1", "WhatsApp button appears once the story starts");
  await wa.click();
  const links = await page.locator('a[data-channel="whatsapp"]').evaluateAll((as) => as.map((a) => a.href));
  ok(links.length === 3 && links.every((h) => /^https:\/\/wa\.me\/\d+\?text=.+/.test(h)), `three preset messages open wa.me with text (${links.length})`);
  await page.keyboard.press("Escape");
  ok((await page.locator('a[data-channel="whatsapp"]').count()) === 0, "Escape closes the WhatsApp panel");
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
  for (const route of ["/", "/trabajo", "/servicios"]) {
    await page.goto(BASE + route, { waitUntil: "load" });
    const hidden = await page.evaluate(() => [...document.querySelectorAll("main *")].filter((e) => getComputedStyle(e).opacity === "0" && !e.closest("video,[aria-hidden=true]") && e.tagName !== "VIDEO").length);
    const h1 = await page.locator("h1").first().isVisible();
    ok(hidden === 0 && h1, `without JS, ${route} shows all content (hidden: ${hidden})`);
  }
  await ctx.close();
}

await browser.close();
