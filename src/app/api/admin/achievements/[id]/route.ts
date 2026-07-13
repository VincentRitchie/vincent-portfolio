import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, unauthorized, strOrNull } from "@/lib/api";

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(req: NextRequest, ctx: Ctx) {
  const session = await requireAdmin();
  if (!session) return unauthorized();
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
  const session = await requireAdmin();
  if (!session) return unauthorized();
  const { id } = await ctx.params;
  await db.achievement.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
