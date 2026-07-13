"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { StatusBadge, EmptyState } from "@/components/admin/section-card";

type Row = Record<string, unknown> & {
  id: string;
  visible: boolean;
  order: number;
};

type FieldDef = {
  key: string;
  label: string;
  required?: boolean;
  textarea?: boolean;
};

/**
 * Generic CRUD manager for simple flat collections:
 * certifications / testimonials / achievements.
 */
export function SimpleListManager({
  initial,
  endpoint,
  itemLabel,
  fields,
}: {
  initial: Row[];
  endpoint: "certifications" | "testimonials" | "achievements";
  itemLabel: string;
  fields: FieldDef[];
}) {
  const [items, setItems] = useState<Row[]>(initial);
  const [editing, setEditing] = useState<Row | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const emptyRow = (): Row => {
    const r: Record<string, unknown> = {};
    for (const f of fields) r[f.key] = "";
    return { ...r, id: "", visible: true, order: 0 } as Row;
  };

  const save = async () => {
    if (!editing) return;
    const reqField = fields.find((f) => f.required);
    if (reqField && !String(editing[reqField.key] ?? "").trim()) {
      toast.error(`${reqField.label} is required`);
      return;
    }
    setSaving(true);
    try {
      // Build payload — convert empty strings to null.
      const payload: Record<string, unknown> = { visible: editing.visible, order: editing.order };
      for (const f of fields) {
        const v = String(editing[f.key] ?? "").trim();
        payload[f.key] = v || null;
      }
      const res = await fetch(
        isNew ? `/api/admin/${endpoint}` : `/api/admin/${endpoint}/${editing.id}`,
        { method: isNew ? "POST" : "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Save failed");
      const saved = data[endpoint.slice(0, -1)] as Row; // singular key from API
      setItems((prev) => isNew ? [saved, ...prev] : prev.map((x) => (x.id === saved.id ? saved : x)));
      setEditing(null);
      toast.success(isNew ? `${itemLabel} created` : `${itemLabel} updated`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/admin/${endpoint}/${deleteId}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Delete failed");
      }
      setItems((prev) => prev.filter((x) => x.id !== deleteId));
      toast.success(`${itemLabel} deleted`);
    } catch (err) {
      console.error(`[${endpoint}] delete failed:`, err);
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
          onClick={() => { setEditing(emptyRow()); setIsNew(true); }}
          className="gap-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2 text-xs font-semibold text-white"
        >
          <Plus className="h-3.5 w-3.5" /> Add {itemLabel.toLowerCase()}
        </Button>
      </div>

      {items.length === 0 ? (
        <EmptyState
          title={`No ${itemLabel.toLowerCase()}s yet`}
          description={`Public section renders nothing until you add items here. Only add real, verified entries.`}
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-card/40">
          <div className="max-h-[70vh] overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur">
                <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                  <th className="px-4 py-3 font-medium">{fields[0].label}</th>
                  {fields.slice(1, 3).map((f) => (
                    <th key={f.key} className="hidden px-4 py-3 font-medium md:table-cell">{f.label}</th>
                  ))}
                  <th className="px-4 py-3 font-medium">Visibility</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((row) => (
                  <tr key={row.id} className="border-b border-border/60 hover:bg-secondary/30">
                    <td className="px-4 py-3">
                      <button
                        onClick={() => { setEditing({ ...row }); setIsNew(false); }}
                        className="text-left"
                      >
                        <p className="font-medium text-foreground">{String(row[fields[0].key] ?? "—")}</p>
                      </button>
                    </td>
                    {fields.slice(1, 3).map((f) => (
                      <td key={f.key} className="hidden px-4 py-3 text-muted-foreground md:table-cell">
                        <span className="line-clamp-1 max-w-[220px]">{String(row[f.key] ?? "—")}</span>
                      </td>
                    ))}
                    <td className="px-4 py-3">
                      {row.visible ? <StatusBadge tone="violet">Visible</StatusBadge> : <StatusBadge tone="neutral">Hidden</StatusBadge>}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Button size="sm" variant="ghost" onClick={() => { setEditing({ ...row }); setIsNew(false); }} className="h-8 px-2">
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => setDeleteId(row.id)} className="h-8 px-2 text-rose-300 hover:text-rose-200">
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
            <DialogTitle>{isNew ? `Add ${itemLabel.toLowerCase()}` : `Edit ${itemLabel.toLowerCase()}`}</DialogTitle>
            <DialogDescription>Visible items appear on the public site; hidden items are kept for later.</DialogDescription>
          </DialogHeader>
          {editing && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {fields.map((f) => (
                <div key={f.key} className={`space-y-1.5 ${f.textarea ? "sm:col-span-2" : ""}`}>
                  <Label className="text-xs">
                    {f.label} {f.required && <span className="text-fuchsia-400">*</span>}
                  </Label>
                  {f.textarea ? (
                    <Textarea
                      value={String(editing[f.key] ?? "")}
                      onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value })}
                      className="min-h-[100px] border-border bg-background/60"
                    />
                  ) : (
                    <Input
                      value={String(editing[f.key] ?? "")}
                      onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value })}
                      className="border-border bg-background/60"
                    />
                  )}
                </div>
              ))}
              <div className="space-y-1.5">
                <Label className="text-xs">Order</Label>
                <Input
                  type="number"
                  value={Number(editing.order ?? 0)}
                  onChange={(e) => setEditing({ ...editing, order: Number(e.target.value) || 0 })}
                  className="border-border bg-background/60"
                />
              </div>
              <label className="flex items-center gap-2 text-xs sm:col-span-2">
                <input
                  type="checkbox"
                  checked={!!editing.visible}
                  onChange={(e) => setEditing({ ...editing, visible: e.target.checked })}
                  className="h-4 w-4 rounded border-border"
                />
                Visible on public site
              </label>
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
            <AlertDialogTitle>Delete this {itemLabel.toLowerCase()}?</AlertDialogTitle>
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
