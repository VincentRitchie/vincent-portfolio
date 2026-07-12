"use client";

import { useState } from "react";
import { toast } from "sonner";
import { SectionCard } from "@/components/admin/section-card";
import { SaveButton } from "@/components/admin/save-button";
import { TextField, TextAreaField } from "@/components/admin/field";

type Settings = {
  name: string | null;
  heroName: string | null;
  role: string | null;
  summary: string | null;
  email: string | null;
  phone: string | null;
  whatsappLink: string | null;
  whatsappQrPath: string | null;
  footerText: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  profileImagePath: string | null;
  cvPath: string | null;
  afrikVineLogoPath: string | null;
  socialLinks: string | null;
};

function parseSocials(raw: string | null) {
  if (!raw) return { twitter: "", github: "", linkedin: "" };
  try {
    const obj = JSON.parse(raw) as Record<string, string | null>;
    return {
      twitter: obj.twitter ?? "",
      github: obj.github ?? "",
      linkedin: obj.linkedin ?? "",
    };
  } catch {
    return { twitter: "", github: "", linkedin: "" };
  }
}

export function SiteSettingsForm({ initial }: { initial: Settings | null }) {
  const [s, setS] = useState<Settings>({
    name: "",
    heroName: "",
    role: "",
    summary: "",
    email: "",
    phone: "",
    whatsappLink: "",
    whatsappQrPath: "",
    footerText: "",
    seoTitle: "",
    seoDescription: "",
    profileImagePath: "",
    cvPath: "",
    afrikVineLogoPath: "",
    socialLinks: "",
    ...(initial ?? {}),
  });
  const [socials, setSocials] = useState(parseSocials(initial?.socialLinks ?? null));

  const update = (k: keyof Settings, v: string) => setS((prev) => ({ ...prev, [k]: v }));

  const save = async () => {
    const payload = {
      ...s,
      // empty string => null so DB stores null and fallback kicks in
      name: s.name || null,
      heroName: s.heroName || null,
      role: s.role || null,
      summary: s.summary || null,
      email: s.email || null,
      phone: s.phone || null,
      whatsappLink: s.whatsappLink || null,
      whatsappQrPath: s.whatsappQrPath || null,
      footerText: s.footerText || null,
      seoTitle: s.seoTitle || null,
      seoDescription: s.seoDescription || null,
      profileImagePath: s.profileImagePath || null,
      afrikVineLogoPath: s.afrikVineLogoPath || null,
      socialLinks: JSON.stringify({
        twitter: socials.twitter || null,
        github: socials.github || null,
        linkedin: socials.linkedin || null,
      }),
    };
    const res = await fetch("/api/admin/site-settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data?.error || "Save failed");
    }
    toast.success("Site settings saved");
  };

  return (
    <div className="space-y-6">
      <SectionCard title="Identity" description="Primary name, hero name, and role shown across the site.">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField
            id="name"
            label="Full name (uppercase)"
            value={s.name ?? ""}
            onChange={(e) => update("name", e.target.value)}
          />
          <TextField
            id="heroName"
            label="Hero animated name"
            value={s.heroName ?? ""}
            onChange={(e) => update("heroName", e.target.value)}
            hint="The large animated name shown in the hero — defaults to 'VINCENT CHIMAOBI'."
          />
          <TextField
            id="role"
            label="Role"
            value={s.role ?? ""}
            onChange={(e) => update("role", e.target.value)}
          />
          <TextField
            id="phone"
            label="Phone"
            value={s.phone ?? ""}
            onChange={(e) => update("phone", e.target.value)}
          />
        </div>
      </SectionCard>

      <SectionCard title="Contact & summary" description="Public contact channels and short bio.">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField
            id="email"
            label="Email"
            type="email"
            value={s.email ?? ""}
            onChange={(e) => update("email", e.target.value)}
          />
          <TextField
            id="whatsapp"
            label="WhatsApp link"
            value={s.whatsappLink ?? ""}
            onChange={(e) => update("whatsappLink", e.target.value)}
            hint="e.g. https://wa.me/message/..."
          />
          <TextField
            id="whatsappQr"
            label="WhatsApp QR path"
            value={s.whatsappQrPath ?? ""}
            onChange={(e) => update("whatsappQrPath", e.target.value)}
            hint="Public path, e.g. /images/whatsapp-qr.jpeg"
          />
        </div>
        <div className="mt-4">
          <TextAreaField
            id="summary"
            label="Short bio / summary"
            value={s.summary ?? ""}
            onChange={(e) => update("summary", e.target.value)}
          />
        </div>
      </SectionCard>

      <SectionCard title="Socials" description="Used by header, footer, and contact channels.">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <TextField
            id="twitter"
            label="X / Twitter handle"
            value={socials.twitter}
            onChange={(e) => setSocials((p) => ({ ...p, twitter: e.target.value }))}
            hint="Without @"
          />
          <TextField
            id="github"
            label="GitHub handle"
            value={socials.github}
            onChange={(e) => setSocials((p) => ({ ...p, github: e.target.value }))}
            hint="Without @"
          />
          <TextField
            id="linkedin"
            label="LinkedIn (optional)"
            value={socials.linkedin}
            onChange={(e) => setSocials((p) => ({ ...p, linkedin: e.target.value }))}
            hint="Full URL or handle"
          />
        </div>
      </SectionCard>

      <SectionCard title="Media paths" description="Public paths for profile image and Afrik-Vine logo. Upload via Profile & Media page.">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField
            id="profileImagePath"
            label="Profile image path"
            value={s.profileImagePath ?? ""}
            onChange={(e) => update("profileImagePath", e.target.value)}
          />
          <TextField
            id="afrikVineLogoPath"
            label="Afrik-Vine logo path"
            value={s.afrikVineLogoPath ?? ""}
            onChange={(e) => update("afrikVineLogoPath", e.target.value)}
            hint="Used ONLY in the Afrik-Vine section."
          />
          <TextField
            id="cvPath"
            label="CV path"
            value={s.cvPath ?? ""}
            onChange={(e) => update("cvPath", e.target.value)}
            hint="Leave empty to hide the public Download CV button."
          />
        </div>
      </SectionCard>

      <SectionCard title="SEO & footer" description="Optional SEO overrides and footer text.">
        <div className="grid grid-cols-1 gap-4">
          <TextField
            id="seoTitle"
            label="SEO title"
            value={s.seoTitle ?? ""}
            onChange={(e) => update("seoTitle", e.target.value)}
          />
          <TextAreaField
            id="seoDescription"
            label="SEO description"
            value={s.seoDescription ?? ""}
            onChange={(e) => update("seoDescription", e.target.value)}
          />
          <TextField
            id="footerText"
            label="Footer blurb"
            value={s.footerText ?? ""}
            onChange={(e) => update("footerText", e.target.value)}
          />
        </div>
      </SectionCard>

      <div className="flex items-center justify-end">
        <SaveButton onSave={save} />
      </div>
    </div>
  );
}
