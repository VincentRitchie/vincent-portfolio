"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Mail, Trash2, CheckCheck, Circle, Loader2, Inbox as InboxIcon, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { StatusBadge, EmptyState } from "@/components/admin/section-card";

export type InboxMessage = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  inquiryType: string;
  message: string;
  preferredResponse: string;
  isRead: boolean;
  createdAt: string;
};

function fmtDate(iso: string) {
  try {
    return new Date(iso).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export function MessagesInbox({ initialMessages }: { initialMessages: InboxMessage[] }) {
  const [messages, setMessages] = useState<InboxMessage[]>(initialMessages);
  const [selected, setSelected] = useState<InboxMessage | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const toggleRead = async (m: InboxMessage) => {
    setBusyId(m.id);
    try {
      const res = await fetch(`/api/contact/${m.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead: !m.isRead }),
      });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      const updated = data.message as { isRead: boolean };
      setMessages((prev) =>
        prev.map((x) => (x.id === m.id ? { ...x, isRead: updated.isRead } : x))
      );
      setSelected((s) => (s && s.id === m.id ? { ...s, isRead: updated.isRead } : s));
      toast.success(updated.isRead ? "Marked as read" : "Marked as unread");
    } catch {
      toast.error("Failed to update message");
    } finally {
      setBusyId(null);
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    setBusyId(deleteId);
    try {
      const res = await fetch(`/api/contact/${deleteId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed");
      setMessages((prev) => prev.filter((x) => x.id !== deleteId));
      if (selected?.id === deleteId) setSelected(null);
      toast.success("Message deleted");
    } catch {
      toast.error("Failed to delete message");
    } finally {
      setDeleteId(null);
      setBusyId(null);
    }
  };

  if (messages.length === 0) {
    return (
      <EmptyState
        title="No messages yet"
        description="Public contact form submissions will appear here."
      />
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-border bg-card/40">
        <div className="max-h-[70vh] overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur">
              <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Inquiry</th>
                <th className="hidden px-4 py-3 font-medium md:table-cell">Received</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((m) => (
                <tr
                  key={m.id}
                  className="border-b border-border/60 transition-colors hover:bg-secondary/30"
                >
                  <td className="px-4 py-3">
                    {m.isRead ? (
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <Circle className="h-3 w-3" /> Read
                      </span>
                    ) : (
                      <StatusBadge tone="violet">Unread</StatusBadge>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => {
                        setSelected(m);
                        if (!m.isRead) toggleRead(m);
                      }}
                      className="text-left"
                    >
                      <p className={`font-medium ${m.isRead ? "text-foreground" : "text-violet-100"}`}>
                        {m.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{m.email}</p>
                    </button>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    <span className="line-clamp-1 max-w-[260px]">{m.inquiryType}</span>
                  </td>
                  <td className="hidden px-4 py-3 text-xs text-muted-foreground md:table-cell">
                    {fmtDate(m.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleRead(m)}
                        disabled={busyId === m.id}
                        className="h-8 gap-1 px-2 text-xs"
                        title={m.isRead ? "Mark unread" : "Mark read"}
                      >
                        {busyId === m.id ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <CheckCheck className="h-3.5 w-3.5" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setDeleteId(m.id)}
                        disabled={busyId === m.id}
                        className="h-8 gap-1 px-2 text-xs text-rose-300 hover:text-rose-200"
                        title="Delete"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Full message dialog */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-2xl border-border bg-card/95 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="font-display text-lg">
              {selected?.name}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              {selected?.email}
              {selected?.company ? ` · ${selected.company}` : ""} · {selected ? fmtDate(selected.createdAt) : ""}
            </DialogDescription>
          </DialogHeader>
          {selected && (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 text-xs">
                <StatusBadge tone="blue">{selected.inquiryType}</StatusBadge>
                <StatusBadge tone="neutral">Reply via: {selected.preferredResponse}</StatusBadge>
                {selected.isRead ? (
                  <StatusBadge tone="success">Read</StatusBadge>
                ) : (
                  <StatusBadge tone="violet">Unread</StatusBadge>
                )}
              </div>
              <div className="rounded-xl border border-border bg-background/40 p-4">
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                  {selected.message}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(
                    selected.inquiryType
                  )}`}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2 text-xs font-semibold text-white"
                >
                  <Mail className="h-3.5 w-3.5" />
                  Reply by email
                </a>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toggleRead(selected)}
                  disabled={busyId === selected.id}
                  className="gap-1.5 text-xs"
                >
                  {busyId === selected.id ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <CheckCheck className="h-3.5 w-3.5" />
                  )}
                  {selected.isRead ? "Mark unread" : "Mark read"}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setDeleteId(selected.id)}
                  className="gap-1.5 text-xs text-rose-300 hover:text-rose-200"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete
                </Button>
                <a
                  href={`mailto:${selected.email}`}
                  className="ml-auto inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-violet-200"
                >
                  <ExternalLink className="h-3 w-3" /> Open mail client
                </a>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent className="border-border bg-card/95 backdrop-blur-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this message?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The message will be permanently removed from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-rose-600 text-white hover:bg-rose-500"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
