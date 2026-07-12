import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const items = await db.testimonial.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
  return NextResponse.json({ testimonials: items });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

function strOrNull(v: unknown): string | null {
  if (v == null) return null;
  const s = String(v).trim();
  return s.length ? s : null;
}
