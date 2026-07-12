"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef, type ReactNode } from "react";
import {
  ScanSearch,
  TerminalSquare,
  Sparkles,
  ShieldAlert,
  BrainCircuit,
  Code2,
  ShieldCheck,
  Tags,
  ListChecks,
  FileText,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Github,
  Radar,
  Users,
  Clapperboard,
  ShoppingCart,
  Smartphone,
  Building2,
  Workflow,
  Gauge,
  ArrowRight,
  ArrowDown,
  ArrowUpRight,
  Download,
  Menu,
  X,
  CheckCircle2,
  Circle,
  Quote,
  Send,
  Lightbulb,
  Target,
  Compass,
  Layers,
  Rocket,
  Eye,
  User,
  Link,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ---------- Icon registry ---------- */
export const iconMap: Record<string, LucideIcon> = {
  ScanSearch,
  TerminalSquare,
  Sparkles,
  ShieldAlert,
  BrainCircuit,
  Code2,
  ShieldCheck,
  Tags,
  ListChecks,
  FileText,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Github,
  Radar,
  Users,
  Clapperboard,
  ShoppingCart,
  Smartphone,
  Building2,
  Workflow,
  Gauge,
  ArrowRight,
  ArrowDown,
  ArrowUpRight,
  Download,
  Menu,
  X,
  CheckCircle2,
  Circle,
  Quote,
  Send,
  Lightbulb,
  Target,
  Compass,
  Layers,
  Rocket,
  Eye,
  User,
  Link,
  Zap,
};

export function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Cmp = iconMap[name] ?? Sparkles;
  return <Cmp className={className} />;
}

/* ---------- Accent system (static class strings so Tailwind detects them) ---------- */
export type Accent = "violet" | "magenta" | "blue" | "silver";

export const accentMap: Record<
  Accent,
  {
    text: string;
    bg: string;
    border: string;
    glow: string;
    hoverGlow: string;
    chipBg: string;
    gradient: string;
    ring: string;
    orb: string;
    iconWrap: string;
  }
> = {
  violet: {
    text: "text-violet-300",
    bg: "bg-violet-500/10",
    border: "border-violet-500/30",
    glow: "shadow-[0_0_40px_-10px_rgba(168,85,247,0.55)]",
    hoverGlow: "hover:shadow-[0_0_50px_-8px_rgba(168,85,247,0.7)]",
    chipBg: "bg-violet-500/15 text-violet-200 border-violet-400/30",
    gradient: "from-violet-500 to-fuchsia-500",
    ring: "ring-violet-500/40",
    orb: "bg-violet-600/20",
    iconWrap: "bg-violet-500/15 text-violet-300 border-violet-400/30",
  },
  magenta: {
    text: "text-fuchsia-300",
    bg: "bg-fuchsia-500/10",
    border: "border-fuchsia-500/30",
    glow: "shadow-[0_0_40px_-10px_rgba(217,70,239,0.55)]",
    hoverGlow: "hover:shadow-[0_0_50px_-8px_rgba(217,70,239,0.7)]",
    chipBg: "bg-fuchsia-500/15 text-fuchsia-200 border-fuchsia-400/30",
    gradient: "from-fuchsia-500 to-pink-500",
    ring: "ring-fuchsia-500/40",
    orb: "bg-fuchsia-600/20",
    iconWrap: "bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-400/30",
  },
  blue: {
    text: "text-sky-300",
    bg: "bg-sky-500/10",
    border: "border-sky-500/30",
    glow: "shadow-[0_0_40px_-10px_rgba(59,130,246,0.55)]",
    hoverGlow: "hover:shadow-[0_0_50px_-8px_rgba(59,130,246,0.7)]",
    chipBg: "bg-sky-500/15 text-sky-200 border-sky-400/30",
    gradient: "from-sky-500 to-indigo-500",
    ring: "ring-sky-500/40",
    orb: "bg-sky-600/20",
    iconWrap: "bg-sky-500/15 text-sky-300 border-sky-400/30",
  },
  silver: {
    text: "text-slate-200",
    bg: "bg-slate-400/10",
    border: "border-slate-400/30",
    glow: "shadow-[0_0_40px_-10px_rgba(203,213,225,0.45)]",
    hoverGlow: "hover:shadow-[0_0_50px_-8px_rgba(203,213,225,0.6)]",
    chipBg: "bg-slate-400/15 text-slate-100 border-slate-300/30",
    gradient: "from-slate-300 to-slate-500",
    ring: "ring-slate-400/40",
    orb: "bg-slate-400/15",
    iconWrap: "bg-slate-400/15 text-slate-100 border-slate-300/30",
  },
};

/* ---------- Reveal on scroll ---------- */
export function Reveal({
  children,
  delay = 0,
  className,
  y = 28,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Section shell ---------- */
export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn("relative scroll-mt-24 py-20 sm:py-28", className)}
    >
      {children}
    </section>
  );
}

/* ---------- Section heading ---------- */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  accent = "violet",
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  align?: "left" | "center";
  accent?: Accent;
}) {
  const a = accentMap[accent];
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center"
      )}
    >
      <Reveal>
        <div
          className={cn(
            "mb-4 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.18em]",
            a.chipBg
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse-glow" />
          {eyebrow}
        </div>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-[2.7rem]">
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.1}>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ---------- Card surface ---------- */
export function GlowCard({
  children,
  className,
  accent = "violet",
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  accent?: Accent;
  hover?: boolean;
}) {
  const a = accentMap[accent];
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm transition-all duration-300",
        hover && cn("hover:-translate-y-1", a.hoverGlow),
        className
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br",
          a.gradient
        )}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

/* ---------- Glow orb backdrop ---------- */
export function GlowOrb({
  className,
  color = "violet",
}: {
  className?: string;
  color?: Accent;
}) {
  const a = accentMap[color];
  return (
    <div
      className={cn(
        "pointer-events-none absolute rounded-full blur-[100px]",
        a.orb,
        className
      )}
      aria-hidden
    />
  );
}

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export { motion };
