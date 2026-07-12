import { db } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/admin-shell";
import { MessagesInbox } from "@/components/admin/messages-inbox";
import { StatusBadge } from "@/components/admin/section-card";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  let messages: Awaited<ReturnType<typeof db.contactMessage.findMany>> = [];
  try {
    messages = await db.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    });
  } catch (err) {
    console.error("[admin/messages] load failed:", err);
  }

  const unread = messages.filter((m) => !m.isRead).length;

  return (
    <>
      <AdminPageHeader
        title="Messages"
        description="Inbox of public contact form submissions. Mark as read/unread, reply by email, or delete."
        action={
          unread > 0 ? (
            <StatusBadge tone="violet">{unread} unread</StatusBadge>
          ) : (
            <StatusBadge tone="success">All read</StatusBadge>
          )
        }
      />
      <MessagesInbox initialMessages={JSON.parse(JSON.stringify(messages))} />
    </>
  );
}
