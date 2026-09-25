import { NextResponse, type NextRequest } from "next/server";
import { normalise, validate, type ContactInput } from "@/lib/contact";
import { site } from "@/lib/site";

export const runtime = "nodejs";

/**
 * Contact endpoint. Delivers every valid enquiry by email through Resend.
 * Required env: RESEND_API_KEY. Optional: CONTACT_TO (default info@24shoots.es),
 * CONTACT_FROM (default "24SHOOTS web <web@24shoots.es>", domain must be verified in Resend),
 * CONTACT_DRY_RUN=1 (local testing only: logs instead of sending).
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const MIN_ELAPSED_MS = 2500;
const hits = new Map<string, number[]>(); // best-effort, per instance

function rateLimited(ip: string) {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return list.length > MAX_PER_WINDOW;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]!);

async function deliver(input: ContactInput) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO || site.contact.email;
  const from = process.env.CONTACT_FROM || "24SHOOTS web <web@24shoots.es>";
  const rows: [string, string][] = [
    ["Nombre", input.name],
    ["Email", input.email],
    ["Empresa", input.company || "—"],
    ["Tipo", input.type || "—"],
    ["Fecha / plazo", input.date || "—"],
    ["Idioma", input.locale],
  ];
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${input.message}\n`;
  const html = `<table cellpadding="4" style="font-family:system-ui,sans-serif;font-size:14px">${rows
    .map(([k, v]) => `<tr><td style="color:#666">${esc(k)}</td><td>${esc(v)}</td></tr>`)
    .join("")}</table><p style="font-family:system-ui,sans-serif;font-size:15px;white-space:pre-wrap">${esc(input.message)}</p>`;
  const subject = `Proyecto: ${input.name}${input.company ? ` · ${input.company}` : ""}${input.type ? ` (${input.type})` : ""}`;

  if (!key) {
    if (process.env.CONTACT_DRY_RUN === "1") {
      console.info("[contact:dry-run]", { to, from, subject, text });
      return { ok: true as const };
    }
    console.error("[contact] RESEND_API_KEY is not set; enquiry not delivered.");
    return { ok: false as const, code: "unconfigured" };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [to], reply_to: input.email, subject, text, html }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) {
    console.error("[contact] Resend error", res.status, await res.text().catch(() => ""));
    return { ok: false as const, code: "provider" };
  }
  return { ok: true as const };
}

export async function POST(req: NextRequest) {
  const isJson = (req.headers.get("content-type") || "").includes("application/json");
  const origin = req.headers.get("origin");
  if (origin && new URL(origin).host !== req.headers.get("host")) {
    return NextResponse.json({ ok: false, code: "origin" }, { status: 403 });
  }
  if (Number(req.headers.get("content-length") || 0) > 32_000) {
    return NextResponse.json({ ok: false, code: "size" }, { status: 413 });
  }

  let raw: Record<string, unknown>;
  try {
    raw = isJson ? await req.json() : Object.fromEntries(await req.formData());
  } catch {
    return NextResponse.json({ ok: false, code: "bad_request" }, { status: 400 });
  }
  const input = normalise(raw);

  // Where to send people back when the form was posted without JavaScript.
  const back = (ok: boolean) => {
    const ref = req.headers.get("referer");
    const url = new URL(ref && new URL(ref).host === req.nextUrl.host ? ref : input.locale === "en" ? "/en/contact" : "/contacto", req.url);
    url.searchParams.set("enviado", ok ? "1" : "0");
    url.hash = "contacto";
    return NextResponse.redirect(url, 303);
  };

  // Bots: honeypot filled or submitted implausibly fast → accept silently, send nothing.
  if (input.website || (isJson && input.elapsed < MIN_ELAPSED_MS)) {
    return isJson ? NextResponse.json({ ok: true }) : back(true);
  }

  const errors = validate(input);
  if (Object.keys(errors).length) {
    return isJson ? NextResponse.json({ ok: false, errors }, { status: 422 }) : back(false);
  }

  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) {
    return isJson ? NextResponse.json({ ok: false, code: "rate" }, { status: 429 }) : back(false);
  }

  try {
    const result = await deliver(input);
    if (!result.ok) return isJson ? NextResponse.json(result, { status: 503 }) : back(false);
    return isJson ? NextResponse.json({ ok: true }) : back(true);
  } catch (err) {
    console.error("[contact] delivery failed", err);
    return isJson ? NextResponse.json({ ok: false, code: "provider" }, { status: 502 }) : back(false);
  }
}
