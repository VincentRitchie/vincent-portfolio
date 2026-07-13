import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, unauthorized, strOrNull } from "@/lib/api";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, ctx: Ctx) {
  const session = await requireAdmin();
  if (!session) return unauthorized();
  try {
    const { id } = await ctx.params;
    const item = await db.project.findUnique({ where: { id } });
    if (!item) return NextResponse.json({ error: "Not found." }, { status: 404 });
    return NextResponse.json({ project: item });
  } catch (err) {
    console.error("[projects] GET id error:", err);
    return NextResponse.json({ error: "Failed." }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, ctx: Ctx) {
  const session = await requireAdmin();
  if (!session) return unauthorized();
  try {
    const { id } = await ctx.params;
    const body = await req.json().catch(() => ({}));
    const data: Record<string, unknown> = {};
    if ("title" in body) data.title = String(body.title).trim();
    if ("slug" in body) data.slug = String(body.slug).trim();
    if ("category" in body) data.category = strOrNull(body.category);
    if ("summary" in body) data.summary = strOrNull(body.summary);
    if ("description" in body) data.description = strOrNull(body.description);
    if ("status" in body) data.status = String(body.status);
    if ("placeholder" in body) data.placeholder = !!body.placeholder;
    if ("imageUrl" in body) data.imageUrl = strOrNull(body.imageUrl);
    if ("caseStudyBody" in body) data.caseStudyBody = strOrNull(body.caseStudyBody);
    if ("externalUrl" in body) data.externalUrl = strOrNull(body.externalUrl);
    if ("icon" in body) data.icon = strOrNull(body.icon);
    if ("accent" in body) data.accent = strOrNull(body.accent);
    if ("tags" in body) {
      data.tags = Array.isArray(body.tags) ? JSON.stringify(body.tags) : strOrNull(body.tags);
    }
    if ("order" in body) data.order = Number(body.order) || 0;
    if ("visible" in body) data.visible = body.visible !== false;

    const updated = await db.project.update({ where: { id }, data: data as never });
    return NextResponse.json({ success: true, project: updated });
  } catch (err) {
    console.error("[projects] PUT error:", err);
    return NextResponse.json({ error: "Failed to update." }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, ctx: Ctx) {
  const session = await requireAdmin();
  if (!session) return unauthorized();
  try {
    const { id } = await ctx.params;
    await db.project.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[projects] DELETE error:", err);
    return NextResponse.json({ error: "Failed to delete." }, { status: 500 });
  }
}
