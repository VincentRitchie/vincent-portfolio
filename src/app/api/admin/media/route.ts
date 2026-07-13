import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, unauthorized } from "@/lib/api";

/** GET /api/admin/media — list uploaded image assets (protected) */
export async function GET() {
  const session = await requireAdmin();
  if (!session) return unauthorized();
  try {
    const items = await db.mediaAsset.findMany({
      orderBy: { createdAt: "desc" },
      take: 200,
    });
    return NextResponse.json({ media: items });
  } catch (err) {
    console.error("[media] GET error:", err);
    return NextResponse.json({ error: "Failed." }, { status: 500 });
  }
}
