"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { StatusBadge, EmptyState } from "@/components/admin/section-card";

type Skill = {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  accent: string | null;
  category: string | null;
  order: number;
  visible: boolean;
};

const empty = (): Skill => ({
  id: "", title: "", description: "", icon: "Sparkles", accent: "violet", category: "expertise", order: 0, visible: true,
});

const ICONS = ["ScanSearch", "TerminalSquare", "Sparkles", "ShieldAlert", "BrainCircuit", "Code2", "ShieldCheck", "Tags", "ListChecks", "FileText", "Rocket", "Eye", "Layers", "Target"];
const ACCENTS = ["violet", "magenta", "blue"];

export function SkillsManager({ initial }: { initial: Skill[] }) {
  const [items, setItems] = useState<Skill[]>(initial);
  const [editing, setEditing] = useState<Skill | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const save = async () => {
    if (!editing || !editing.title.trim()) { toast.error("Title required"); return; }
    setSaving(true);
    try {
      const payload = {
        ...editing,
        description: editing.description || null,
        icon: editing.icon || null,
        accent: editing.accent || null,
        category: editing.category || null,
      };
      const res = await fetch(
        isNew ? "/api/admin/skills" : `/api/admin/skills/${editing.id}`,
        { method: isNew ? "POST" : "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Save failed");
      const saved = data.skill as Skill;
      setItems((prev) => isNew ? [saved, ...prev] : prev.map((x) => (x.id === saved.id ? saved : x)));
      setEditing(null);
      toast.success(isNew ? "Skill created" : "Skill updated");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/admin/skills/${deleteId}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Delete failed");
      }
      setItems((prev) => prev.filter((x) => x.id !== deleteId));
      toast.success("Skill deleted");
    } catch (err) {
      console.error("[skills] delete failed:", err);
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
          <Plus className="h-3.5 w-3.5" /> Add skill
        </Button>
      </div>

      {items.length === 0 ? (
        <EmptyState title="No skills in DB" description="The public site is showing the portfolio-data fallback cards. Add your own to override them." />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-card/40">
          <div className="max-h-[70vh] overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur">
                <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                  <th className="px-4 py-3 font-medium">Title</th>
                  <th className="hidden px-4 py-3 font-medium md:table-cell">Category</th>
                  <th className="px-4 py-3 font-medium">Visibility</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((s) => (
                  <tr key={s.id} className="border-b border-border/60 hover:bg-secondary/30">
                    <td className="px-4 py-3">
                      <button onClick={() => { setEditing({ ...s }); setIsNew(false); }} className="text-left">
                        <p className="font-medium text-foreground">{s.title}</p>
                        <p className="text-xs text-muted-foreground">{s.icon ?? "—"} · {s.accent ?? "—"}</p>
                      </button>
                    </td>
                    <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">{s.category ?? "—"}</td>
                    <td className="px-4 py-3">
                      {s.visible ? <StatusBadge tone="violet">Visible</StatusBadge> : <StatusBadge tone="neutral">Hidden</StatusBadge>}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Button size="sm" variant="ghost" onClick={() => { setEditing({ ...s }); setIsNew(false); }} className="h-8 px-2">
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => setDeleteId(s.id)} className="h-8 px-2 text-rose-300 hover:text-rose-200">
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
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto border-border bg-card/95 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle>{isNew ? "Add skill" : "Edit skill"}</DialogTitle>
            <DialogDescription>Expertise card shown in the public Expertise section.</DialogDescription>
          </DialogHeader>
          {editing && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5 sm:col-span-2">
                <Label className="text-xs">Title *</Label>
                <Input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="border-border bg-background/60" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Icon</Label>
                <Select value={editing.icon ?? "Sparkles"} onValueChange={(v) => setEditing({ ...editing, icon: v })}>
                  <SelectTrigger className="border-border bg-background/60"><SelectValue /></SelectTrigger>
                  <SelectContent>{ICONS.map((i) => <SelectItem key={i} value={i}>{i}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Accent</Label>
                <Select value={editing.accent ?? "violet"} onValueChange={(v) => setEditing({ ...editing, accent: v })}>
                  <SelectTrigger className="border-border bg-background/60"><SelectValue /></SelectTrigger>
                  <SelectContent>{ACCENTS.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Category (anchor href)</Label>
                <Input value={editing.category ?? ""} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className="border-border bg-background/60" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Order</Label>
                <Input type="number" value={editing.order} onChange={(e) => setEditing({ ...editing, order: Number(e.target.value) || 0 })} className="border-border bg-background/60" />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label className="text-xs">Description</Label>
                <Textarea value={editing.description ?? ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="min-h-[100px] border-border bg-background/60" />
              </div>
              <label className="flex items-center gap-2 text-xs sm:col-span-2">
                <input type="checkbox" checked={editing.visible} onChange={(e) => setEditing({ ...editing, visible: e.target.checked })} className="h-4 w-4 rounded border-border" />
                Visible on public site
              </label>
            </div>
          )}
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEditing(null)}>Cancel</Button>
            <Button type="button" onClick={save} disabled={saving} className="gap-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2 text-xs font-semibold text-white">
              {saving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              {saving ? "Saving…" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent className="border-border bg-card/95 backdrop-blur-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this skill?</AlertDialogTitle>
            <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-rose-600 text-white hover:bg-rose-500">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
