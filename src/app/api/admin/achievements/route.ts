import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, unauthorized, strOrNull } from "@/lib/api";

export async function GET() {
  const session = await requireAdmin();
  if (!session) return unauthorized();
  const items = await db.achievement.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
  return NextResponse.json({ achievements: items });
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return unauthorized();
  const body = await req.json().catch(() => ({}));
  const title = String(body.title ?? "").trim();
  if (!title) return NextResponse.json({ error: "Title required." }, { status: 400 });
  const created = await db.achievement.create({
    data: {
      title,
      metric: strOrNull(body.metric),
      description: strOrNull(body.description),
      year: strOrNull(body.year),
      order: Number(body.order) || 0,
      visible: body.visible !== false,
    },
  });
  return NextResponse.json({ success: true, achievement: created }, { status: 201 });
}
