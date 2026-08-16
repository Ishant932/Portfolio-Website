import { NextResponse } from "next/server";

const OWNER_EMAIL = "ishantgoyal932@gmail.com";
const OWNER_WHATSAPP = "916367010131";

/**
 * Contact delivery pipeline:
 * 1. Email  -> Resend REST API (requires process.env.RESEND_API_KEY — free at resend.com)
 * 2. WhatsApp -> Twilio WhatsApp API (requires TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN,
 *                TWILIO_WHATSAPP_FROM like "whatsapp:+14155238886")
 * 3. If neither is configured, the client gets `handoff: true` and opens a prefilled
 *    email + WhatsApp message from the visitor, so the message still reaches Ishant.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const text = `New portfolio message\n\nFrom: ${name}\nEmail: ${email}\n\n${message}`;
    const html = `
      <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;border:1px solid #eee;border-radius:12px;overflow:hidden">
        <div style="background:linear-gradient(90deg,#f59e0b,#ec4899,#8b5cf6);padding:18px 24px">
          <h2 style="color:#fff;margin:0">🚀 New Message from Portfolio</h2>
        </div>
        <div style="padding:24px">
          <p><strong>Name:</strong> ${name.replace(/</g, "&lt;")}</p>
          <p><strong>Email:</strong> <a href="mailto:${email.replace(/</g, "&lt;")}">${email.replace(/</g, "&lt;")}</a></p>
          <p><strong>Message:</strong></p>
          <div style="background:#f6f6f9;padding:14px;border-radius:8px;white-space:pre-wrap">${message.replace(/</g, "&lt;")}</div>
          <p style="color:#888;font-size:12px">Sent ${new Date().toLocaleString()}</p>
        </div>
      </div>`;

    const delivered: string[] = [];

    // ---- 1. Email via Resend (if configured) ----
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: `Portfolio Contact <onboarding@resend.dev>`,
            to: [OWNER_EMAIL],
            subject: `💼 New Portfolio Message from ${name}`,
            text,
            html,
          }),
        });
        if (res.ok) delivered.push("email");
        else console.warn("[Contact] Resend failed:", res.status, await res.text());
      } catch (e) {
        console.warn("[Contact] Resend error:", e);
      }
    }

    // ---- 2. WhatsApp via Twilio (if configured) ----
    const twilioSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioFrom = process.env.TWILIO_WHATSAPP_FROM;
    if (twilioSid && twilioToken && twilioFrom) {
      try {
        const res = await fetch(
          `https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`,
          {
            method: "POST",
            headers: {
              Authorization: `Basic ${Buffer.from(
                `${twilioSid}:${twilioToken}`
              ).toString("base64")}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              From: twilioFrom,
              To: `whatsapp:${OWNER_WHATSAPP}`,
              Body: text,
            }).toString(),
          }
        );
        if (res.ok) delivered.push("whatsapp");
        else console.warn("[Contact] Twilio failed:", res.status, await res.text());
      } catch (e) {
        console.warn("[Contact] Twilio error:", e);
      }
    }

    // ---- 3. Fallback: hand off to the visitor's own apps, prefilled ----
    const subject = encodeURIComponent(`💼 New Portfolio Message from ${name}`);
    const mailBody = encodeURIComponent(
      `Hi Ishant,\n\n${name} (${email}) sent you this from your portfolio:\n\n${message}`
    );
    const mailto = `mailto:${OWNER_EMAIL}?subject=${subject}&body=${mailBody}`;
    const waText = encodeURIComponent(
      `Hi Ishant, this is ${name} (${email}) from your portfolio:\n\n${message}`
    );
    const whatsapp = `https://wa.me/${OWNER_WHATSAPP}?text=${waText}`;

    console.log("[Contact Form]", { name, email, message, delivered, timestamp: new Date().toISOString() });

    return NextResponse.json(
      {
        success: true,
        delivered,
        handoff: delivered.length === 0,
        message:
          delivered.length === 0
            ? "Opening your email & WhatsApp to send the message"
            : "Message received successfully",
        mailto,
        whatsapp,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
