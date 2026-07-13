import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, unauthorized, strOrNull } from "@/lib/api";

export async function GET() {
  const session = await requireAdmin();
  if (!session) return unauthorized();
  const items = await db.skill.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });
  return NextResponse.json({ skills: items });
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return unauthorized();
  const body = await req.json().catch(() => ({}));
  const title = String(body.title ?? "").trim();
  if (!title) return NextResponse.json({ error: "Title required." }, { status: 400 });
  const created = await db.skill.create({
    data: {
      title,
      description: strOrNull(body.description),
      icon: strOrNull(body.icon),
      accent: strOrNull(body.accent),
      category: strOrNull(body.category),
      order: Number(body.order) || 0,
      visible: body.visible !== false,
    },
  });
  return NextResponse.json({ success: true, skill: created }, { status: 201 });
}
