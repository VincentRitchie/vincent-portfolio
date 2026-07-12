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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Pencil, Trash2, Loader2, GripVertical } from "lucide-react";
import { StatusBadge, EmptyState } from "@/components/admin/section-card";

type Project = {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  summary: string | null;
  description: string | null;
  status: string;
  placeholder: boolean;
  imageUrl: string | null;
  externalUrl: string | null;
  order: number;
  visible: boolean;
};

const empty = (): Project => ({
  id: "",
  title: "",
  slug: "",
  category: "",
  summary: "",
  description: "",
  status: "Completed",
  placeholder: false,
  imageUrl: "",
  externalUrl: "",
  order: 0,
  visible: true,
});

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
}

export function ProjectsManager({ initial }: { initial: Project[] }) {
  const [items, setItems] = useState<Project[]>(initial);
  const [editing, setEditing] = useState<Project | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const startNew = () => {
    setEditing(empty());
    setIsNew(true);
  };
  const startEdit = (p: Project) => {
    setEditing({ ...p });
    setIsNew(false);
  };

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
        category: editing.category || null,
        summary: editing.summary || null,
        description: editing.description || null,
        imageUrl: editing.imageUrl || null,
        externalUrl: editing.externalUrl || null,
      };
      const res = await fetch(
        isNew ? "/api/admin/projects" : `/api/admin/projects/${editing.id}`,
        {
          method: isNew ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Save failed");
      const saved = data.project as Project;
      setItems((prev) =>
        isNew ? [saved, ...prev] : prev.map((x) => (x.id === saved.id ? saved : x))
      );
      setEditing(null);
      toast.success(isNew ? "Project created" : "Project updated");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/projects/${deleteId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed");
      setItems((prev) => prev.filter((x) => x.id !== deleteId));
      toast.success("Project deleted");
    } catch {
      toast.error("Delete failed");
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          type="button"
          onClick={startNew}
          className="gap-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2 text-xs font-semibold text-white"
        >
          <Plus className="h-3.5 w-3.5" /> Add project
        </Button>
      </div>

      {items.length === 0 ? (
        <EmptyState title="No projects yet" description="Add your first project to display on the public site." />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-card/40">
          <div className="max-h-[70vh] overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur">
                <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                  <th className="px-4 py-3 font-medium">#</th>
                  <th className="px-4 py-3 font-medium">Title</th>
                  <th className="hidden px-4 py-3 font-medium md:table-cell">Status</th>
                  <th className="hidden px-4 py-3 font-medium sm:table-cell">Visibility</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((p, i) => (
                  <tr key={p.id} className="border-b border-border/60 hover:bg-secondary/30">
                    <td className="px-4 py-3 text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <GripVertical className="h-3 w-3 opacity-40" />
                        {i + 1}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => startEdit(p)} className="text-left">
                        <p className="font-medium text-foreground">{p.title}</p>
                        <p className="text-xs text-muted-foreground">{p.category ?? "—"}</p>
                      </button>
                    </td>
                    <td className="hidden px-4 py-3 md:table-cell">
                      {p.placeholder ? (
                        <StatusBadge tone="warning">Placeholder</StatusBadge>
                      ) : (
                        <StatusBadge tone={p.status === "Completed" ? "success" : "neutral"}>{p.status}</StatusBadge>
                      )}
                    </td>
                    <td className="hidden px-4 py-3 sm:table-cell">
                      {p.visible ? (
                        <StatusBadge tone="violet">Visible</StatusBadge>
                      ) : (
                        <StatusBadge tone="neutral">Hidden</StatusBadge>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Button size="sm" variant="ghost" onClick={() => startEdit(p)} className="h-8 px-2">
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setDeleteId(p.id)}
                          className="h-8 px-2 text-rose-300 hover:text-rose-200"
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
      )}

      {/* Edit / create dialog */}
      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto border-border bg-card/95 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle>{isNew ? "Add project" : "Edit project"}</DialogTitle>
            <DialogDescription>Visible projects appear on the public homepage.</DialogDescription>
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
                <Input
                  value={editing.status}
                  onChange={(e) => setEditing({ ...editing, status: e.target.value })}
                  className="border-border bg-background/60"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Order</Label>
                <Input
                  type="number"
                  value={editing.order}
                  onChange={(e) => setEditing({ ...editing, order: Number(e.target.value) || 0 })}
                  className="border-border bg-background/60"
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label className="text-xs">Summary</Label>
                <Textarea
                  value={editing.summary ?? ""}
                  onChange={(e) => setEditing({ ...editing, summary: e.target.value })}
                  className="min-h-[80px] border-border bg-background/60"
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label className="text-xs">Description / value</Label>
                <Textarea
                  value={editing.description ?? ""}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                  className="min-h-[100px] border-border bg-background/60"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Image URL (optional)</Label>
                <Input
                  value={editing.imageUrl ?? ""}
                  onChange={(e) => setEditing({ ...editing, imageUrl: e.target.value })}
                  className="border-border bg-background/60"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">External URL (optional)</Label>
                <Input
                  value={editing.externalUrl ?? ""}
                  onChange={(e) => setEditing({ ...editing, externalUrl: e.target.value })}
                  className="border-border bg-background/60"
                />
              </div>
              <div className="flex items-center gap-4 sm:col-span-2">
                <label className="flex items-center gap-2 text-xs">
                  <input
                    type="checkbox"
                    checked={editing.visible}
                    onChange={(e) => setEditing({ ...editing, visible: e.target.checked })}
                    className="h-4 w-4 rounded border-border"
                  />
                  Visible on public site
                </label>
                <label className="flex items-center gap-2 text-xs">
                  <input
                    type="checkbox"
                    checked={editing.placeholder}
                    onChange={(e) => setEditing({ ...editing, placeholder: e.target.checked })}
                    className="h-4 w-4 rounded border-border"
                  />
                  Mark as placeholder
                </label>
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
            <AlertDialogTitle>Delete this project?</AlertDialogTitle>
            <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={deleting}
              className="bg-rose-600 text-white hover:bg-rose-500"
            >
              {deleting ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
