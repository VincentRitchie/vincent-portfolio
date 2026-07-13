import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, unauthorized, strOrNull } from "@/lib/api";

export async function GET() {
  const session = await requireAdmin();
  if (!session) return unauthorized();
  const items = await db.certification.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
  return NextResponse.json({ certifications: items });
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return unauthorized();
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
