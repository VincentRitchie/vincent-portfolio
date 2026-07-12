import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(req: NextRequest, ctx: Ctx) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  const body = await req.json().catch(() => ({}));
  const data: Record<string, unknown> = {};
  if ("title" in body) data.title = String(body.title).trim();
  if ("metric" in body) data.metric = strOrNull(body.metric);
  if ("description" in body) data.description = strOrNull(body.description);
  if ("year" in body) data.year = strOrNull(body.year);
  if ("order" in body) data.order = Number(body.order) || 0;
  if ("visible" in body) data.visible = body.visible !== false;
  const updated = await db.achievement.update({ where: { id }, data: data as never });
  return NextResponse.json({ success: true, achievement: updated });
}

export async function DELETE(_req: NextRequest, ctx: Ctx) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  await db.achievement.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

function strOrNull(v: unknown): string | null {
  if (v == null) return null;
  const s = String(v).trim();
  return s.length ? s : null;
}
