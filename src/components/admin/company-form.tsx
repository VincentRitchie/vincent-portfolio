"use client";

import { useState } from "react";
import { toast } from "sonner";
import { SectionCard } from "@/components/admin/section-card";
import { SaveButton } from "@/components/admin/save-button";
import { TextField, TextAreaField } from "@/components/admin/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";

type Company = {
  description: string | null;
  mission: string | null;
  vision: string | null;
  roadmap: string | null;
  registrationNumber: string | null;
  values: string | null;
  services: string | null;
};

type ValueItem = { label: string; body: string };

function parseValues(raw: string | null): ValueItem[] {
  if (!raw) return [];
  try {
    const arr = JSON.parse(raw);
    if (Array.isArray(arr)) return arr as ValueItem[];
  } catch {
    /* ignore */
  }
  return [];
}

export function CompanyForm({ initial }: { initial: Company | null }) {
  const [c, setC] = useState<Company>(
    initial ?? {
      description: "",
      mission: "",
      vision: "",
      roadmap: "",
      registrationNumber: "",
      values: "[]",
      services: "[]",
    }
  );
  const [values, setValues] = useState<ValueItem[]>(parseValues(initial?.values ?? null));
  const [services, setServices] = useState<string[]>((() => {
    if (!initial?.services) return [];
    try {
      const arr = JSON.parse(initial.services);
      return Array.isArray(arr) ? (arr as string[]) : [];
    } catch {
      return [];
    }
  })());

  const update = (k: keyof Company, v: string) => setC((p) => ({ ...p, [k]: v }));

  const save = async () => {
    const payload = {
      description: c.description || null,
      mission: c.mission || null,
      vision: c.vision || null,
      roadmap: c.roadmap || null,
      registrationNumber: c.registrationNumber || null,
      values,
      services,
    };
    const res = await fetch("/api/admin/company", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      throw new Error(d?.error || "Save failed");
    }
    toast.success("Afrik-Vine company info saved");
  };

  return (
    <div className="space-y-6">
      <SectionCard title="Overview" description="High-level intro and positioning copy.">
        <TextAreaField
          id="description"
          label="Intro / description"
          value={c.description ?? ""}
          onChange={(e) => update("description", e.target.value)}
        />
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField
            id="mission"
            label="Mission"
            value={c.mission ?? ""}
            onChange={(e) => update("mission", e.target.value)}
          />
          <TextField
            id="vision"
            label="Vision"
            value={c.vision ?? ""}
            onChange={(e) => update("vision", e.target.value)}
          />
        </div>
        <div className="mt-4">
          <TextField
            id="registrationNumber"
            label="Registration number (optional)"
            value={c.registrationNumber ?? ""}
            onChange={(e) => update("registrationNumber", e.target.value)}
          />
        </div>
        <div className="mt-4">
          <TextAreaField
            id="roadmap"
            label="Roadmap"
            value={c.roadmap ?? ""}
            onChange={(e) => update("roadmap", e.target.value)}
          />
        </div>
      </SectionCard>

      <SectionCard title="Core values" description="Editable list of value cards shown in the Afrik-Vine section.">
        <div className="space-y-3">
          {values.map((v, i) => (
            <div key={i} className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_2fr_auto]">
              <Input
                value={v.label}
                onChange={(e) =>
                  setValues((arr) => arr.map((x, idx) => (idx === i ? { ...x, label: e.target.value } : x)))
                }
                placeholder="Label"
                className="border-border bg-background/60"
              />
              <Input
                value={v.body}
                onChange={(e) =>
                  setValues((arr) => arr.map((x, idx) => (idx === i ? { ...x, body: e.target.value } : x)))
                }
                placeholder="Description"
                className="border-border bg-background/60"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setValues((arr) => arr.filter((_, idx) => idx !== i))}
                className="text-rose-300 hover:text-rose-200"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setValues((arr) => [...arr, { label: "", body: "" }])}
            className="gap-1.5"
          >
            <Plus className="h-3.5 w-3.5" /> Add value
          </Button>
        </div>
      </SectionCard>

      <SectionCard title="Service areas" description="Bullet list of planned service areas.">
        <div className="space-y-3">
          {services.map((s, i) => (
            <div key={i} className="flex gap-2">
              <Input
                value={s}
                onChange={(e) =>
                  setServices((arr) => arr.map((x, idx) => (idx === i ? e.target.value : x)))
                }
                className="border-border bg-background/60"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setServices((arr) => arr.filter((_, idx) => idx !== i))}
                className="text-rose-300 hover:text-rose-200"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setServices((arr) => [...arr, ""])}
            className="gap-1.5"
          >
            <Plus className="h-3.5 w-3.5" /> Add service
          </Button>
        </div>
      </SectionCard>

      <div className="flex items-center justify-end">
        <SaveButton onSave={save} />
      </div>
    </div>
  );
}
