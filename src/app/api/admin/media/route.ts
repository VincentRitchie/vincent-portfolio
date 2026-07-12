import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

/** GET /api/admin/media — list uploaded image assets (protected) */
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
