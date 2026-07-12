import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

/**
 * GET /api/admin/cv — PUBLIC. Returns whether a CV exists and its path
 * so the public Contact section can show a "Download CV" button or "CV coming soon".
 */
export async function GET() {
  try {
    const s = await db.siteSetting.findUnique({ where: { id: "1" }, select: { cvPath: true } });
    return NextResponse.json({ cvPath: s?.cvPath ?? null });
  } catch (err) {
    console.error("[cv] GET error:", err);
    return NextResponse.json({ cvPath: null });
  }
}

/**
 * PUT /api/admin/cv — PROTECTED. Accepts multipart formData with `file`.
 * Saves via upload lib (PDF only) and updates SiteSetting.cvPath.
 */
export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const form = await req.formData().catch(() => null);
    if (!form) {
      return NextResponse.json({ error: "Multipart form required." }, { status: 400 });
    }
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Missing 'file' field." }, { status: 400 });
    }

    // Inline import to reuse the upload helper.
    const { saveUpload, PDF_MIME, PDF_MAX_BYTES } = await import("@/lib/upload");
    const result = await saveUpload(file, PDF_MIME, PDF_MAX_BYTES, "cv");

    await db.siteSetting.upsert({
      where: { id: "1" },
      create: { id: "1", cvPath: result.publicPath },
      update: { cvPath: result.publicPath },
    });

    return NextResponse.json({ success: true, cvPath: result.publicPath });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "CV upload failed.";
    console.error("[cv] PUT error:", err);
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
