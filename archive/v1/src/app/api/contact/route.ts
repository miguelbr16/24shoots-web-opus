import { NextResponse } from "next/server";
import { getSiteConfig } from "@/lib/content";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const site = getSiteConfig();

    const payload = {
      to: site.contact.email,
      from: body.email,
      name: body.name,
      phone: body.phone ?? "",
      service: body.service,
      pack: body.pack ?? "",
      sector: body.sector ?? "",
      date: body.date ?? "",
      budget: body.budget ?? "",
      message: body.message,
      privacyAccepted: body.privacyAccepted === "yes",
      locale: body.locale ?? "es",
      receivedAt: new Date().toISOString(),
    };

    // MVP: log submission. Connect Resend/SendGrid in production.
    console.log("[24Shoots contact]", JSON.stringify(payload, null, 2));

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
