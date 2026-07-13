import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, unauthorized, strOrNull, numOr } from "@/lib/api";
import { slugify } from "@/lib/utils";

/** GET /api/admin/projects — list (protected) */
export async function GET() {
  const session = await requireAdmin();
  if (!session) return unauthorized();
  try {
    const items = await db.project.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
    return NextResponse.json({ projects: items });
  } catch (err) {
    console.error("[projects] GET error:", err);
    return NextResponse.json({ error: "Failed to load projects." }, { status: 500 });
  }
}

/** POST /api/admin/projects — create (protected) */
export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return unauthorized();
  try {
    const body = await req.json().catch(() => ({}));
    const title = String(body.title ?? "").trim();
    if (!title) return NextResponse.json({ error: "Title is required." }, { status: 400 });

    const slug = String(body.slug ?? "").trim() || slugify(title);
    const created = await db.project.create({
      data: {
        title,
        slug,
        category: strOrNull(body.category),
        summary: strOrNull(body.summary),
        description: strOrNull(body.description),
        status: String(body.status ?? "Completed"),
        placeholder: !!body.placeholder,
        imageUrl: strOrNull(body.imageUrl),
        caseStudyBody: strOrNull(body.caseStudyBody),
        externalUrl: strOrNull(body.externalUrl),
        icon: strOrNull(body.icon),
        accent: strOrNull(body.accent),
        tags: Array.isArray(body.tags) ? JSON.stringify(body.tags) : strOrNull(body.tags),
        order: numOr(body.order, 0),
        visible: body.visible !== false,
      },
    });
    return NextResponse.json({ success: true, project: created }, { status: 201 });
  } catch (err) {
    console.error("[projects] POST error:", err);
    return NextResponse.json({ error: "Failed to create project." }, { status: 500 });
  }
}
