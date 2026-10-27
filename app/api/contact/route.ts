import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { escapeHtml, validateContact, type ContactResponse } from "@/lib/contact";

export const runtime = "nodejs";

// Best-effort, per-instance rate limit. On serverless hosting each instance keeps its own
// window, so this slows down abuse but is not a hard global limit.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

function isRateLimited(key: string, now = Date.now()): boolean {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_REQUESTS;
}

function reply(body: ContactResponse, status: number) {
  return NextResponse.json(body, { status });
}

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return reply({ success: false, error: "bad_request" }, 400);
  }

  const result = validateContact(payload);
  if (!result.ok) {
    return reply({ success: false, error: "validation", fields: result.errors }, 400);
  }

  // Honeypot filled: pretend success so bots get no signal.
  if (result.isSpam) {
    return reply({ success: true }, 200);
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return reply({ success: false, error: "rate_limited" }, 429);
  }

  // Credentials are server-only env vars; never exposed to the client bundle.
  const { EMAIL_USER, EMAIL_PASS, EMAIL_TO, EMAIL_FROM } = process.env;
  if (!EMAIL_USER || !EMAIL_PASS || !EMAIL_TO) {
    return reply({ success: false, error: "unavailable" }, 503);
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // or outlook / smtp
      auth: { user: EMAIL_USER, pass: EMAIL_PASS },
    });

    const template = fs.readFileSync(
      path.join(process.cwd(), "emails", "templates", "connect.html"),
      "utf-8",
    );
    const { email, message } = result.data;
    const messageBlock = message
      ? `<p style="margin: 0 0 30px; color: #3d352c; white-space: pre-wrap;">${escapeHtml(message)}</p>`
      : "";
    const html = template
      .replace(/{{email}}/g, escapeHtml(email))
      .replace(/{{message_block}}/g, messageBlock);

    await transporter.sendMail({
      from: EMAIL_FROM || EMAIL_USER,
      replyTo: email, // Let them reply to the contact
      to: EMAIL_TO,
      subject: "New Portfolio Contact",
      text: `New contact from ${email}${message ? `\n\n${message}` : ""}`,
      html,
    });
    return reply({ success: true }, 200);
  } catch (error) {
    console.error("Contact email failed:", error instanceof Error ? error.message : error);
    return reply({ success: false, error: "send_failed" }, 502);
  }
}
