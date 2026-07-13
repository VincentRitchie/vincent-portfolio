import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, unauthorized, strOrNull } from "@/lib/api";
import { slugify } from "@/lib/utils";

export async function GET() {
  const session = await requireAdmin();
  if (!session) return unauthorized();
  try {
    const items = await db.article.findMany({
      orderBy: [{ createdAt: "desc" }],
    });
    return NextResponse.json({ articles: items });
  } catch (err) {
    console.error("[articles] GET error:", err);
    return NextResponse.json({ error: "Failed." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return unauthorized();
  try {
    const body = await req.json().catch(() => ({}));
    const title = String(body.title ?? "").trim();
    if (!title) return NextResponse.json({ error: "Title required." }, { status: 400 });
    const slug = String(body.slug ?? "").trim() || slugify(title);

    const created = await db.article.create({
      data: {
        title,
        slug,
        excerpt: strOrNull(body.excerpt),
        body: strOrNull(body.body),
        category: strOrNull(body.category),
        status: String(body.status ?? "draft"),
        featuredImage: strOrNull(body.featuredImage),
        seoTitle: strOrNull(body.seoTitle),
        seoDescription: strOrNull(body.seoDescription),
        publishedAt:
          body.status === "published"
            ? new Date()
            : body.publishedAt
              ? new Date(body.publishedAt)
              : null,
      },
    });
    return NextResponse.json({ success: true, article: created }, { status: 201 });
  } catch (err) {
    console.error("[articles] POST error:", err);
    return NextResponse.json({ error: "Failed." }, { status: 500 });
  }
}
