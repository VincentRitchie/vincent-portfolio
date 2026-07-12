import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import {
  rateLimitCheck,
  honeypotFailed,
  sanitizeText,
  verifyTurnstile,
  getClientIP,
} from "@/lib/spam";
import { sendContactNotification } from "@/lib/email";

const VALID_INQUIRY_TYPES = [
  "AI Evaluation / AI Training Role",
  "Prompt Engineering Project",
  "Data Annotation Opportunity",
  "Web Development Project",
  "Afrik-Vine Tech LTD Inquiry",
  "Security Research Discussion",
  "General Professional Contact",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIP(req);

    // ---- Rate limit ----
    const rl = rateLimitCheck(ip);
    if (!rl.ok) {
      const mins = Math.ceil((rl.retryAfterMs ?? 0) / 60000);
      return NextResponse.json(
        { error: `Too many submissions. Please try again in ~${mins} minute(s).` },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 }
      );
    }

    // ---- Honeypot ----
    if (honeypotFailed(body.website)) {
      // Pretend success to bots — don't leak that they were caught.
      return NextResponse.json(
        { success: true, message: "Your message has been received. Thank you for reaching out." },
        { status: 201 }
      );
    }

    // ---- Optional Turnstile ----
    const turnstileOk = await verifyTurnstile(body.captchaToken, ip);
    if (!turnstileOk) {
      return NextResponse.json(
        { error: "Spam verification failed. Please refresh and try again." },
        { status: 400 }
      );
    }

    // ---- Sanitize + validate ----
    const name = sanitizeText(body.name);
    const email = String(body.email ?? "").trim();
    const company = body.company ? sanitizeText(body.company) : null;
    const inquiryType = String(body.inquiryType ?? "").trim();
    const message = sanitizeText(body.message);
    const preferredResponse = String(body.preferredResponse ?? "Email").trim();

    if (!name || name.length < 2) {
      return NextResponse.json(
        { error: "Please provide your full name." },
        { status: 400 }
      );
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }
    if (!inquiryType || !VALID_INQUIRY_TYPES.includes(inquiryType)) {
      return NextResponse.json(
        { error: "Please select a valid inquiry type." },
        { status: 400 }
      );
    }
    if (!message || message.length < 10) {
      return NextResponse.json(
        { error: "Please provide a message of at least 10 characters." },
        { status: 400 }
      );
    }

    const record = await db.contactMessage.create({
      data: {
        name,
        email,
        company,
        inquiryType,
        message,
        preferredResponse,
      },
    });

    // ---- Email notification (always best-effort; never throws) ----
    await sendContactNotification({
      name,
      email,
      company,
      inquiryType,
      message,
      preferredResponse,
      submittedAt: record.createdAt.toISOString(),
    }).catch((err) => console.error("[contact] notification swallowed:", err));

    return NextResponse.json(
      {
        success: true,
        id: record.id,
        message: "Your message has been received. Thank you for reaching out.",
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("[contact] POST error:", err);
    return NextResponse.json(
      { error: "Failed to send your message. Please try again later." },
      { status: 500 }
    );
  }
}

export async function GET() {
  // PROTECTED — admin only.
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const messages = await db.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
      select: {
        id: true,
        name: true,
        email: true,
        company: true,
        inquiryType: true,
        message: true,
        preferredResponse: true,
        isRead: true,
        createdAt: true,
      },
    });
    return NextResponse.json({ messages });
  } catch (err) {
    console.error("[contact] GET error:", err);
    return NextResponse.json(
      { error: "Failed to load messages." },
      { status: 500 }
    );
  }
}
