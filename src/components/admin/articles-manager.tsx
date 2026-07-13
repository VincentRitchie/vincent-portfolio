"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { StatusBadge, EmptyState } from "@/components/admin/section-card";

type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  body: string | null;
  category: string | null;
  status: string;
  featuredImage: string | null;
  publishedAt: string | null;
};

const empty = (): Article => ({
  id: "",
  title: "",
  slug: "",
  excerpt: "",
  body: "",
  category: "",
  status: "draft",
  featuredImage: "",
  publishedAt: null,
});

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
}

export function ArticlesManager({ initial }: { initial: Article[] }) {
  const [items, setItems] = useState<Article[]>(initial);
  const [editing, setEditing] = useState<Article | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const save = async () => {
    if (!editing) return;
    if (!editing.title.trim()) {
      toast.error("Title is required");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        ...editing,
        slug: editing.slug.trim() || slugify(editing.title),
        excerpt: editing.excerpt || null,
        body: editing.body || null,
        category: editing.category || null,
        featuredImage: editing.featuredImage || null,
      };
      const res = await fetch(
        isNew ? "/api/admin/articles" : `/api/admin/articles/${editing.id}`,
        {
          method: isNew ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Save failed");
      const saved = data.article as Article;
      setItems((prev) =>
        isNew ? [saved, ...prev] : prev.map((x) => (x.id === saved.id ? saved : x))
      );
      setEditing(null);
      toast.success(isNew ? "Article created" : "Article updated");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/admin/articles/${deleteId}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Delete failed");
      }
      setItems((prev) => prev.filter((x) => x.id !== deleteId));
      toast.success("Article deleted");
    } catch (err) {
      console.error("[articles] delete failed:", err);
      toast.error(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          type="button"
          onClick={() => { setEditing(empty()); setIsNew(true); }}
          className="gap-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2 text-xs font-semibold text-white"
        >
          <Plus className="h-3.5 w-3.5" /> New article
        </Button>
      </div>

      {items.length === 0 ? (
        <EmptyState title="No articles yet" description="Drafts remain hidden. Publish to replace the public coming-soon UI." />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-card/40">
          <div className="max-h-[70vh] overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur">
                <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                  <th className="px-4 py-3 font-medium">Title</th>
                  <th className="hidden px-4 py-3 font-medium md:table-cell">Category</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((a) => (
                  <tr key={a.id} className="border-b border-border/60 hover:bg-secondary/30">
                    <td className="px-4 py-3">
                      <button
                        onClick={() => { setEditing({ ...a }); setIsNew(false); }}
                        className="text-left"
                      >
                        <p className="font-medium text-foreground">{a.title}</p>
                        <p className="text-xs text-muted-foreground">{a.slug}</p>
                      </button>
                    </td>
                    <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">{a.category ?? "—"}</td>
                    <td className="px-4 py-3">
                      {a.status === "published" ? (
                        <StatusBadge tone="success">Published</StatusBadge>
                      ) : (
                        <StatusBadge tone="warning">Draft</StatusBadge>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Button size="sm" variant="ghost" onClick={() => { setEditing({ ...a }); setIsNew(false); }} className="h-8 px-2">
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => setDeleteId(a.id)} className="h-8 px-2 text-rose-300 hover:text-rose-200">
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
      )}

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto border-border bg-card/95 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle>{isNew ? "New article" : "Edit article"}</DialogTitle>
            <DialogDescription>Drafts are hidden; publishing shows this on the public site.</DialogDescription>
          </DialogHeader>
          {editing && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5 sm:col-span-2">
                <Label className="text-xs">Title *</Label>
                <Input
                  value={editing.title}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value, slug: editing.slug || slugify(e.target.value) })}
                  className="border-border bg-background/60"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Slug</Label>
                <Input
                  value={editing.slug}
                  onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                  className="border-border bg-background/60"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Category</Label>
                <Input
                  value={editing.category ?? ""}
                  onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                  className="border-border bg-background/60"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Status</Label>
                <Select
                  value={editing.status}
                  onValueChange={(v) => setEditing({ ...editing, status: v })}
                >
                  <SelectTrigger className="border-border bg-background/60">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Featured image (optional)</Label>
                <Input
                  value={editing.featuredImage ?? ""}
                  onChange={(e) => setEditing({ ...editing, featuredImage: e.target.value })}
                  className="border-border bg-background/60"
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label className="text-xs">Excerpt</Label>
                <Textarea
                  value={editing.excerpt ?? ""}
                  onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })}
                  className="min-h-[80px] border-border bg-background/60"
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label className="text-xs">Body</Label>
                <Textarea
                  value={editing.body ?? ""}
                  onChange={(e) => setEditing({ ...editing, body: e.target.value })}
                  className="min-h-[240px] border-border bg-background/60"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEditing(null)}>Cancel</Button>
            <Button
              type="button"
              onClick={save}
              disabled={saving}
              className="gap-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2 text-xs font-semibold text-white"
            >
              {saving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              {saving ? "Saving…" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent className="border-border bg-card/95 backdrop-blur-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this article?</AlertDialogTitle>
            <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
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
    </div>
  );
}
