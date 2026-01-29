import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
// Removed template import, will use direct file path for HTML template

import fs from 'fs';
import path from 'path';


export async function POST(req: Request) {
  try {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json(
      { error: "Email is required" },
      { status: 400 }
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail", // or outlook / smtp
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Read HTML file
  const htmlFile = fs.readFileSync(
    path.join(process.cwd(), "emails", "templates", "connect.html"),
    'utf-8'
  );
  const html = htmlFile.replace(/{{email}}/g, email);

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    replyTo: email, // Let them reply to the contact
    to: process.env.EMAIL_TO,
    subject: "New Portfolio Contact",
    html,
  });
  return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error parsing request:', error);
    return NextResponse.json(
      { success: false, error: 'Invalid request payload' },
      { status: 500 }
    );
  }
}