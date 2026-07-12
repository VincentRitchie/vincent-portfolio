import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, ctx: Ctx) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  const item = await db.article.findUnique({ where: { id } });
  if (!item) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json({ article: item });
}

export async function PUT(req: NextRequest, ctx: Ctx) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = await ctx.params;
    const body = await req.json().catch(() => ({}));
    const existing = await db.article.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Not found." }, { status: 404 });

    const data: Record<string, unknown> = {};
    if ("title" in body) data.title = String(body.title).trim();
    if ("slug" in body) data.slug = String(body.slug).trim();
    if ("excerpt" in body) data.excerpt = strOrNull(body.excerpt);
    if ("body" in body) data.body = strOrNull(body.body);
    if ("category" in body) data.category = strOrNull(body.category);
    if ("status" in body) data.status = String(body.status);
    if ("featuredImage" in body) data.featuredImage = strOrNull(body.featuredImage);
    if ("seoTitle" in body) data.seoTitle = strOrNull(body.seoTitle);
    if ("seoDescription" in body) data.seoDescription = strOrNull(body.seoDescription);

    // If transitioning to published and no publishedAt, set it now.
    if (body.status === "published" && !existing.publishedAt && !("publishedAt" in body)) {
      data.publishedAt = new Date();
    }
    if ("publishedAt" in body) {
      data.publishedAt = body.publishedAt ? new Date(body.publishedAt) : null;
    }

    const updated = await db.article.update({ where: { id }, data: data as never });
    return NextResponse.json({ success: true, article: updated });
  } catch (err) {
    console.error("[articles] PUT error:", err);
    return NextResponse.json({ error: "Failed." }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, ctx: Ctx) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  await db.article.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

function strOrNull(v: unknown): string | null {
  if (v == null) return null;
  const s = String(v).trim();
  return s.length ? s : null;
}
