"use client";

import { useState, useRef } from "react";
import { toast } from "sonner";
import { Loader2, Upload, FileText, ImageIcon, Copy } from "lucide-react";
import { SectionCard, StatusBadge, EmptyState } from "@/components/admin/section-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Settings = {
  cvPath: string | null;
  profileImagePath: string | null;
  whatsappQrPath: string | null;
  afrikVineLogoPath: string | null;
};

type Media = {
  id: string;
  filename: string;
  path: string;
  type: string | null;
  createdAt: string;
};

export function ProfileMediaManager({
  initialSettings,
  initialMedia,
}: {
  initialSettings: Settings | null;
  initialMedia: Media[];
}) {
  const [settings, setSettings] = useState<Settings>(
    initialSettings ?? { cvPath: null, profileImagePath: null, whatsappQrPath: null, afrikVineLogoPath: null }
  );
  const [media, setMedia] = useState<Media[]>(initialMedia);
  const [cvUploading, setCvUploading] = useState(false);
  const [imgUploading, setImgUploading] = useState(false);
  const cvInputRef = useRef<HTMLInputElement>(null);
  const imgInputRef = useRef<HTMLInputElement>(null);

  const uploadCV = async (file: File) => {
    setCvUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("kind", "cv");
      const res = await fetch("/api/admin/cv", { method: "PUT", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Upload failed");
      setSettings((s) => ({ ...s, cvPath: data.cvPath }));
      toast.success("CV uploaded. The public Download CV button will now appear.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "CV upload failed");
    } finally {
      setCvUploading(false);
    }
  };

  const uploadImage = async (file: File) => {
    setImgUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("kind", "image");
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Upload failed");
      setMedia((m) => [
        { id: data.path, filename: data.path.split("/").pop() ?? "", path: data.path, type: file.type, createdAt: new Date().toISOString() },
        ...m,
      ]);
      toast.success("Image uploaded");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Image upload failed");
    } finally {
      setImgUploading(false);
    }
  };

  const setPathField = async (field: keyof Settings, path: string) => {
    const res = await fetch("/api/admin/site-settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: path || null }),
    });
    if (!res.ok) {
      toast.error("Failed to save path");
      return;
    }
    setSettings((s) => ({ ...s, [field]: path }));
    toast.success("Path saved");
  };

  const copyPath = (path: string) => {
    navigator.clipboard.writeText(path);
    toast.success("Copied");
  };

  return (
    <div className="space-y-6">
      {/* CV upload */}
      <SectionCard title="CV / Resume" description="PDF up to 8MB. The public site shows a Download CV button only when this is set.">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <input
            ref={cvInputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) uploadCV(f);
              e.currentTarget.value = "";
            }}
          />
          <Button
            type="button"
            onClick={() => cvInputRef.current?.click()}
            disabled={cvUploading}
            className="gap-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-2.5 text-sm font-semibold text-white"
          >
            {cvUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            {cvUploading ? "Uploading…" : "Upload CV (PDF)"}
          </Button>
          {settings.cvPath ? (
            <a
              href={settings.cvPath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 text-xs font-medium text-foreground hover:border-violet-400/40"
            >
              <FileText className="h-3.5 w-3.5" />
              Current: {settings.cvPath.split("/").pop()}
            </a>
          ) : (
            <StatusBadge tone="warning">No CV uploaded — public button hidden</StatusBadge>
          )}
        </div>
      </SectionCard>

      {/* Image upload */}
      <SectionCard title="Image upload" description="JPEG/PNG/WebP/GIF up to 8MB. After uploading, copy the path and paste it into the relevant field below.">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <input
            ref={imgInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) uploadImage(f);
              e.currentTarget.value = "";
            }}
          />
          <Button
            type="button"
            onClick={() => imgInputRef.current?.click()}
            disabled={imgUploading}
            className="gap-2 rounded-full border border-violet-400/40 bg-violet-500/10 px-5 py-2.5 text-sm font-semibold text-violet-100 hover:bg-violet-500/20"
          >
            {imgUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImageIcon className="h-4 w-4" />}
            {imgUploading ? "Uploading…" : "Upload image"}
          </Button>
        </div>

        {media.length === 0 ? (
          <div className="mt-4">
            <EmptyState title="No uploaded images yet" description="Upload a profile image, WhatsApp QR, Afrik-Vine logo, or gallery shot." />
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {media.map((m) => (
              <button
                key={m.id}
                onClick={() => copyPath(m.path)}
                className="group relative overflow-hidden rounded-xl border border-border bg-background/40"
                title="Click to copy path"
              >
                <img src={m.path} alt={m.filename} className="aspect-square w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-background/90 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="inline-flex items-center gap-1 text-[10px] font-medium text-violet-100">
                    <Copy className="h-3 w-3" /> Copy path
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </SectionCard>

      {/* Path fields */}
      <SectionCard title="Path assignments" description="Paste uploaded paths here to assign them to profile image, WhatsApp QR, and Afrik-Vine logo.">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-xs font-medium">Profile image path</label>
            <div className="flex gap-2">
              <Input
                value={settings.profileImagePath ?? ""}
                onChange={(e) => setSettings((s) => ({ ...s, profileImagePath: e.target.value }))}
                placeholder="/uploads/images/... or /images/profile-main.jpeg"
                className="border-border bg-background/60"
              />
              <Button type="button" size="sm" onClick={() => setPathField("profileImagePath", settings.profileImagePath ?? "")}>
                Save
              </Button>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium">WhatsApp QR path</label>
            <div className="flex gap-2">
              <Input
                value={settings.whatsappQrPath ?? ""}
                onChange={(e) => setSettings((s) => ({ ...s, whatsappQrPath: e.target.value }))}
                placeholder="/images/whatsapp-qr.jpeg"
                className="border-border bg-background/60"
              />
              <Button type="button" size="sm" onClick={() => setPathField("whatsappQrPath", settings.whatsappQrPath ?? "")}>
                Save
              </Button>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium">Afrik-Vine logo path</label>
            <div className="flex gap-2">
              <Input
                value={settings.afrikVineLogoPath ?? ""}
                onChange={(e) => setSettings((s) => ({ ...s, afrikVineLogoPath: e.target.value }))}
                placeholder="/images/afrik-vine-logo.jpeg"
                className="border-border bg-background/60"
              />
              <Button type="button" size="sm" onClick={() => setPathField("afrikVineLogoPath", settings.afrikVineLogoPath ?? "")}>
                Save
              </Button>
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
