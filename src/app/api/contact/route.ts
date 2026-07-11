import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

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
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 }
      );
    }

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const company = body.company ? String(body.company).trim() : null;
    const inquiryType = String(body.inquiryType ?? "").trim();
    const message = String(body.message ?? "").trim();
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
  try {
    const messages = await db.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
      select: {
        id: true,
        name: true,
        email: true,
        company: true,
        inquiryType: true,
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
