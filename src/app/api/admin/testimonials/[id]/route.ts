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
  if ("name" in body) data.name = String(body.name).trim();
  if ("role" in body) data.role = strOrNull(body.role);
  if ("quote" in body) data.quote = strOrNull(body.quote);
  if ("order" in body) data.order = Number(body.order) || 0;
  if ("visible" in body) data.visible = body.visible !== false;
  const updated = await db.testimonial.update({ where: { id }, data: data as never });
  return NextResponse.json({ success: true, testimonial: updated });
}

export async function DELETE(_req: NextRequest, ctx: Ctx) {
  const session = await requireAdmin();
  if (!session) return unauthorized();
  const { id } = await ctx.params;
  await db.testimonial.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
