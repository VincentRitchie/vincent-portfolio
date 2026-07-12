"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowDown, Sparkles, MapPin } from "lucide-react";
import { profile as defaultProfile } from "@/lib/portfolio-data";
import { GlowOrb } from "./shared";
import { AnimatedHeroName } from "./animated-name";
import { HeroSlider } from "./hero-slider";
import { assetPath } from "@/lib/asset-path";

const scrollTo = (href: string) => {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
};

const techTicker = [
  "AI Response Evaluation",
  "Prompt Engineering",
  "Data Annotation & HITL",
  "Rubric-Based Evaluation",
  "Hallucination Detection",
  "Generative AI Workflows",
  "Technical Documentation",
  "Web Development",
  "Security Research",
  "Responsible Disclosure",
];

type ProfileLike = typeof defaultProfile & {
  cvPath?: string | null;
};

export function Hero({ profile = defaultProfile }: { profile?: ProfileLike } = {}) {
  const cvPath = (profile as ProfileLike).cvPath ?? null;
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-16"
    >
      {/* Backdrop layers */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
      <GlowOrb className="left-[-10%] top-[5%] h-80 w-80" color="violet" />
      <GlowOrb className="right-[-8%] top-[20%] h-96 w-96" color="magenta" />
      <GlowOrb className="bottom-[-10%] left-[30%] h-80 w-80" color="blue" />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        {/* Left: copy */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-1.5 text-xs font-medium text-violet-200"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-400" />
            </span>
            Available for remote AI evaluation, prompt & web projects
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl xl:text-[5.5rem]"
          >
            {/* Large main animated name — shows only VINCENT CHIMAOBI */}
            <AnimatedHeroName />
            <motion.span
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9 }}
              className="mt-4 block text-balance text-xl font-semibold text-muted-foreground sm:text-2xl lg:text-[1.75rem]"
            >
              {profile.role}
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {profile.heroIntro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <button
              onClick={() => scrollTo("#expertise")}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_36px_-8px_rgba(217,70,239,0.7)] transition-all hover:shadow-[0_0_50px_-6px_rgba(217,70,239,0.9)] hover:-translate-y-0.5"
            >
              Explore My Expertise
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => scrollTo("#contact")}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-sm transition-all hover:border-violet-400/40 hover:bg-card"
            >
              Contact Me
            </button>
            {cvPath && (
              <a
                href={cvPath}
                download
                className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-5 py-3 text-sm font-semibold text-emerald-200 backdrop-blur-sm transition-all hover:bg-emerald-500/20"
              >
                Download CV
              </a>
            )}
            <button
              onClick={() => scrollTo("#projects")}
              className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              View My Work
              <ArrowDown className="h-4 w-4" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground"
          >
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-violet-300" />
              {profile.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-fuchsia-300" />
              Upwork
            </span>
          </motion.div>
        </div>

        {/* Right: premium 5-image showcase slider (replaces the former static single profile image) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5"
        >
          <div className="relative mx-auto max-w-md">
            {/* glow rings */}
            <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-violet-600/30 via-fuchsia-600/20 to-sky-600/30 blur-2xl" />
            <div className="absolute -inset-1 -z-10 rounded-[2.2rem] bg-gradient-to-tr from-violet-500 via-fuchsia-500 to-sky-500 opacity-60 blur-md" />

            {/* Slider — no internal name caption (the small duplicate was removed) */}
            <HeroSlider profile={profile} />

            {/* down-arrow — kept for navigation */}
            <button
              onClick={() => scrollTo("#about")}
              className="absolute -bottom-5 left-1/2 z-30 grid h-11 w-11 -translate-x-1/2 place-items-center rounded-full border border-violet-400/40 bg-violet-500/20 text-violet-100 backdrop-blur-sm transition-all hover:scale-110 hover:bg-violet-500/30"
              aria-label="Read about me"
            >
              <ArrowDown className="h-5 w-5" />
            </button>

            {/* floating stat chip */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-4 top-10 hidden rounded-2xl border border-fuchsia-400/30 bg-card/80 px-4 py-3 backdrop-blur-md sm:block"
            >
              <p className="font-display text-xl font-bold text-gradient">2M+</p>
              <p className="text-[11px] text-muted-foreground">AI content views</p>
            </motion.div>
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-3 bottom-24 hidden rounded-2xl border border-sky-400/30 bg-card/80 px-4 py-3 backdrop-blur-md sm:block"
            >
              <p className="font-display text-xl font-bold text-sky-300">5+</p>
              <p className="text-[11px] text-muted-foreground">Professional roles</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Tech ticker */}
      <div className="absolute inset-x-0 bottom-0 border-y border-border/50 bg-background/40 py-3 backdrop-blur-sm">
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex shrink-0 animate-marquee items-center gap-8 pr-8">
            {[...techTicker, ...techTicker].map((t, i) => (
              <span
                key={i}
                className="flex shrink-0 items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground"
              >
                <span className="h-1 w-1 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
