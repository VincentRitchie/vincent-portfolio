"use client";

import { cn } from "@/lib/utils";

export function SectionCard({
  title,
  description,
  children,
  className,
  action,
}: {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-border bg-card/50 p-5 backdrop-blur-sm sm:p-6",
        className
      )}
    >
      {(title || action) && (
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            {title && (
              <h3 className="font-display text-base font-semibold text-foreground">{title}</h3>
            )}
            {description && (
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{description}</p>
            )}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function StatusBadge({
  tone = "neutral",
  children,
}: {
  tone?: "neutral" | "success" | "warning" | "danger" | "violet" | "blue";
  children: React.ReactNode;
}) {
  const toneClass = {
    neutral: "border-border bg-secondary/40 text-muted-foreground",
    success: "border-emerald-400/40 bg-emerald-500/10 text-emerald-200",
    warning: "border-amber-400/40 bg-amber-500/10 text-amber-200",
    danger: "border-rose-400/40 bg-rose-500/10 text-rose-200",
    violet: "border-violet-400/40 bg-violet-500/10 text-violet-200",
    blue: "border-sky-400/40 bg-sky-500/10 text-sky-200",
  }[tone];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
        toneClass
      )}
    >
      {children}
    </span>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card/30 p-10 text-center">
      <p className="font-display text-base font-semibold text-foreground">{title}</p>
      {description && (
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
