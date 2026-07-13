import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, unauthorized } from "@/lib/api";

/** PATCH /api/contact/[id] — toggle isRead. Body: { isRead?: boolean } */
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const session = await requireAdmin();
  if (!session) return unauthorized();
  try {
    const { id } = await context.params;
    const body = await req.json().catch(() => ({}));
    const isRead = Boolean(body?.isRead);
    const updated = await db.contactMessage.update({
      where: { id },
      data: { isRead },
      select: { id: true, isRead: true },
    });
    return NextResponse.json({ success: true, message: updated });
  } catch (err) {
    console.error("[contact] PATCH error:", err);
    return NextResponse.json({ error: "Failed to update message." }, { status: 500 });
  }
}

/** DELETE /api/contact/[id] */
export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const session = await requireAdmin();
  if (!session) return unauthorized();
  try {
    const { id } = await context.params;
    await db.contactMessage.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] DELETE error:", err);
    return NextResponse.json({ error: "Failed to delete message." }, { status: 500 });
  }
}
