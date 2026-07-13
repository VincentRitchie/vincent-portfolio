import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, unauthorized, strOrNull } from "@/lib/api";

export async function GET() {
  const session = await requireAdmin();
  if (!session) return unauthorized();
  const items = await db.testimonial.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
  return NextResponse.json({ testimonials: items });
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return unauthorized();
  const body = await req.json().catch(() => ({}));
  const name = String(body.name ?? "").trim();
  if (!name) return NextResponse.json({ error: "Name required." }, { status: 400 });
  const created = await db.testimonial.create({
    data: {
      name,
      role: strOrNull(body.role),
      quote: strOrNull(body.quote),
      order: Number(body.order) || 0,
      visible: body.visible !== false,
    },
  });
  return NextResponse.json({ success: true, testimonial: created }, { status: 201 });
}
