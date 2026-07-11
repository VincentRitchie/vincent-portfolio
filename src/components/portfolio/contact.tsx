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
