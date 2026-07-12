import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const items = await db.certification.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
  return NextResponse.json({ certifications: items });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const title = String(body.title ?? "").trim();
  if (!title) return NextResponse.json({ error: "Title required." }, { status: 400 });
  const created = await db.certification.create({
    data: {
      title,
      issuer: strOrNull(body.issuer),
      year: strOrNull(body.year),
      credentialLink: strOrNull(body.credentialLink),
      order: Number(body.order) || 0,
      visible: body.visible !== false,
    },
  });
  return NextResponse.json({ success: true, certification: created }, { status: 201 });
}

function strOrNull(v: unknown): string | null {
  if (v == null) return null;
  const s = String(v).trim();
  return s.length ? s : null;
}
