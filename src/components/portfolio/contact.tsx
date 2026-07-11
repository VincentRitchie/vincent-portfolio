"use client";

import { useState } from "react";
import { Reveal, Section, SectionHeading, Icon } from "./shared";
import { contact } from "@/lib/portfolio-data";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Send, CheckCircle2, AlertCircle, Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

type Status = "idle" | "loading" | "success";

/* WhatsApp brand glyph (lucide has no brand icon) */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.86 9.86 0 0 0 4.74 1.21h.004c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01zM12.04 20.15h-.003a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.11.82.83-3.03-.2-.31a8.18 8.18 0 0 1-1.26-4.39c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43-.14 0-.31-.01-.47-.01-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29z" />
    </svg>
  );
}

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    inquiryType: "",
    message: "",
    preferredResponse: "Email",
  });

  const update = (key: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message || !form.inquiryType) {
      toast.error("Please fill in your name, email, inquiry type, and message.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
      toast.success("Message sent. Thank you for reaching out!");
      setForm({
        name: "",
        email: "",
        company: "",
        inquiryType: "",
        message: "",
        preferredResponse: "Email",
      });
    } catch (err) {
      setStatus("idle");
      toast.error(err instanceof Error ? err.message : "Failed to send message.");
    }
  };

  return (
    <Section id="contact" className="border-t border-border/40">
      {/* glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-[-5%] top-[15%] h-80 w-80 rounded-full bg-violet-700/15 blur-[110px]" />
        <div className="absolute left-[-5%] bottom-[10%] h-80 w-80 rounded-full bg-fuchsia-700/12 blur-[110px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          title={contact.headline}
          intro={contact.intro}
          accent="violet"
        />

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left: contact channels + inquiry guidance */}
          <div className="space-y-6 lg:col-span-5">
            <Reveal>
              <div className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm">
                <h3 className="mb-4 font-display text-base font-semibold text-foreground">
                  Contact information
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {contact.channels.map((c) => {
                    const content = c.href ? (
                      <a
                        href={c.href}
                        target={c.href.startsWith("http") ? "_blank" : undefined}
                        rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="group flex items-center gap-3 rounded-xl border border-border/60 bg-background/40 p-3 transition-all hover:border-violet-400/40 hover:bg-violet-500/5"
                      >
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-violet-400/30 bg-violet-500/15 text-violet-300">
                          <Icon name={c.icon} className="h-4 w-4" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[11px] uppercase tracking-wider text-muted-foreground">
                            {c.label}
                          </span>
                          <span className="block truncate text-sm font-medium text-foreground group-hover:text-violet-200">
                            {c.value}
                          </span>
                        </span>
                      </a>
                    ) : (
                      <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-background/40 p-3">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-fuchsia-400/30 bg-fuchsia-500/15 text-fuchsia-300">
                          <Icon name={c.icon} className="h-4 w-4" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[11px] uppercase tracking-wider text-muted-foreground">
                            {c.label}
                          </span>
                          <span className="block truncate text-sm font-medium text-foreground">
                            {c.value}
                          </span>
                        </span>
                      </div>
                    );
                    return <div key={c.label}>{content}</div>;
                  })}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-emerald-400/25 bg-emerald-500/[0.06] p-6 backdrop-blur-sm">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  {/* WhatsApp QR code */}
                  <div className="relative shrink-0">
                    <div className="absolute -inset-2 rounded-2xl bg-emerald-500/15 blur-xl" />
                    <img
                      src={contact.whatsapp.qr}
                      alt="WhatsApp QR code — scan to start a direct conversation"
                      className="relative h-28 w-28 rounded-xl border border-emerald-400/40 bg-white p-1.5 object-contain"
                      draggable={false}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-sm font-semibold text-emerald-200">
                      <WhatsAppIcon className="h-4 w-4" />
                      Direct WhatsApp
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                      {contact.whatsapp.helper}
                    </p>
                    <a
                      href={contact.whatsapp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-xs font-semibold text-[#06231a] transition-all hover:bg-[#1ebe5b] hover:shadow-[0_0_28px_-6px_rgba(37,211,102,0.7)]"
                    >
                      <WhatsAppIcon className="h-3.5 w-3.5" />
                      {contact.whatsapp.label}
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm">
                <h3 className="mb-4 font-display text-base font-semibold text-foreground">
                  Inquiry guidance
                </h3>
                <div className="space-y-3">
                  {contact.inquiryGuidance.map((g) => (
                    <div key={g.type} className="rounded-xl border border-border/60 bg-background/40 p-3">
                      <p className="text-sm font-medium text-violet-200">{g.type}</p>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{g.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="flex items-start gap-3 rounded-2xl border border-amber-400/20 bg-amber-500/5 p-4">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
                <p className="text-xs leading-relaxed text-muted-foreground">
                  For security-related discussions, please do not send sensitive credentials, private customer data, or confidential assets through this form. Use responsible disclosure channels where applicable.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right: contact form */}
          <Reveal delay={0.1} className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm sm:p-8"
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-medium text-foreground">
                    Full Name <span className="text-fuchsia-400">*</span>
                  </label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Your full name"
                    className="border-border bg-background/60"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-medium text-foreground">
                    Email Address <span className="text-fuchsia-400">*</span>
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="you@example.com"
                    className="border-border bg-background/60"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="company" className="text-xs font-medium text-foreground">
                    Company or Organization
                  </label>
                  <Input
                    id="company"
                    value={form.company}
                    onChange={(e) => update("company", e.target.value)}
                    placeholder="Optional"
                    className="border-border bg-background/60"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="inquiryType" className="text-xs font-medium text-foreground">
                    Inquiry Type <span className="text-fuchsia-400">*</span>
                  </label>
                  <Select
                    value={form.inquiryType}
                    onValueChange={(v) => update("inquiryType", v)}
                  >
                    <SelectTrigger id="inquiryType" className="border-border bg-background/60">
                      <SelectValue placeholder="Select inquiry type" />
                    </SelectTrigger>
                    <SelectContent>
                      {contact.inquiryTypes.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-5 space-y-1.5">
                <label htmlFor="message" className="text-xs font-medium text-foreground">
                  Message <span className="text-fuchsia-400">*</span>
                </label>
                <Textarea
                  id="message"
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  placeholder="Include enough context so I can respond usefully — role type, project details, timeline, etc."
                  className="min-h-[140px] resize-y border-border bg-background/60"
                  required
                />
              </div>

              <div className="mt-5 space-y-1.5">
                <label htmlFor="preferredResponse" className="text-xs font-medium text-foreground">
                  Preferred Response Method
                </label>
                <Select
                  value={form.preferredResponse}
                  onValueChange={(v) => update("preferredResponse", v)}
                >
                  <SelectTrigger id="preferredResponse" className="border-border bg-background/60">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["Email", "Phone Call", "WhatsApp", "X / Twitter DM"].map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="mt-6 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-muted-foreground">
                  I value clear communication and serious opportunities.
                </p>
                <Button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_-6px_rgba(217,70,239,0.7)] transition-all hover:shadow-[0_0_45px_-6px_rgba(217,70,239,0.9)] disabled:opacity-70"
                >
                  {status === "loading" && (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending…
                    </>
                  )}
                  {status === "success" && (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      Message Sent
                    </>
                  )}
                  {status === "idle" && (
                    <>
                      Submit Message
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
              </div>

              {status === "success" && (
                <div className="mt-4 flex items-start gap-2 rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-3 text-sm text-emerald-200">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    Thank you, {form.name || "there"}! Your message has been received. I&apos;ll respond
                    via {form.preferredResponse} as soon as possible.
                  </span>
                </div>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
