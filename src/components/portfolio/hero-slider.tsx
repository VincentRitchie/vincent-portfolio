"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Expand, Pause, Play } from "lucide-react";
import { profile } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

/**
 * Premium 5-image showcase slider for the hero/about visual area.
 * - Smooth crossfade + subtle ken-burns zoom
 * - Autoplay with pause on hover / focus / lightbox open
 * - Neon glow frame, prev/next controls, dot indicators, slide counter
 * - Keyboard (←/→) + touch/swipe support
 * - Optional lightbox / modal pop-up view
 * - Exactly five images (me_img1.jpeg … me_img5.jpeg)
 */
const captions = [
  "Professional Portrait",
  "AI Evaluation & Prompt Engineering",
  "Generative AI & Creative Direction",
  "Security-Informed Analysis",
  "Web Development Practice",
];

export function HeroSlider() {
  const slides = profile.gallery;
  const count = slides.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + count) % count),
    [count]
  );
  const goTo = useCallback((i: number) => setIndex(i), []);

  // Autoplay — pauses on hover, focus, or while lightbox is open
  useEffect(() => {
    if (paused || lightbox) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % count), 4800);
    return () => clearInterval(t);
  }, [paused, lightbox, count]);

  // Keyboard navigation (only when slider area is hovered/focused, or lightbox open)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightbox) {
        if (e.key === "Escape") setLightbox(false);
        if (e.key === "ArrowLeft") go(-1);
        if (e.key === "ArrowRight") go(1);
        return;
      }
      if (containerRef.current && document.activeElement &&
        containerRef.current.contains(document.activeElement)) {
        if (e.key === "ArrowLeft") go(-1);
        if (e.key === "ArrowRight") go(1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, lightbox]);

  const onDragEnd = (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -60) go(1);
    else if (info.offset.x > 60) go(-1);
  };

  return (
    <>
      <div
        ref={containerRef}
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label="Professional photographs of Obasiochie Vincent Chimaobi"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        className="group relative h-full w-full overflow-hidden rounded-[2rem] border border-white/10 bg-card outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60"
      >
        {/* Slides */}
        <div className="relative aspect-square w-full overflow-hidden sm:aspect-[4/5]">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              key={index}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              onDragEnd={onDragEnd}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
            >
              <motion.img
                src={slides[index]}
                alt={`${profile.name} — ${captions[index]}`}
                className="h-full w-full select-none object-cover"
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                draggable={false}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.div>
          </AnimatePresence>

          {/* gradient veil for legibility of controls */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/30" />

          {/* Top-right: lightbox + pause toggle */}
          <div className="absolute right-3 top-3 z-20 flex gap-2">
            <button
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? "Play slideshow" : "Pause slideshow"}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-background/50 text-foreground/80 backdrop-blur-md transition-all hover:bg-background/70 hover:text-foreground"
            >
              {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setLightbox(true)}
              aria-label="Open image in full view"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-background/50 text-foreground/80 backdrop-blur-md transition-all hover:bg-background/70 hover:text-foreground"
            >
              <Expand className="h-4 w-4" />
            </button>
          </div>

          {/* Prev / next (neon) */}
          <button
            onClick={() => go(-1)}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-violet-400/40 bg-background/50 text-violet-100 backdrop-blur-md transition-all hover:bg-violet-500/30 hover:shadow-[0_0_24px_-4px_rgba(168,85,247,0.7)]"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-violet-400/40 bg-background/50 text-violet-100 backdrop-blur-md transition-all hover:bg-violet-500/30 hover:shadow-[0_0_24px_-4px_rgba(168,85,247,0.7)]"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Caption + counter (subtle) */}
          <div className="absolute bottom-3 left-3 right-3 z-10 flex items-end justify-between gap-3">
            <div className="glass-strong rounded-xl px-3 py-2">
              <p className="text-xs font-medium text-foreground">{captions[index]}</p>
              <p className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
              </p>
            </div>
            {/* Dot indicators */}
            <div className="flex gap-1.5 pb-1">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to photo ${i + 1}`}
                  aria-current={i === index}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    i === index
                      ? "w-6 bg-gradient-to-r from-violet-400 to-fuchsia-400"
                      : "w-1.5 bg-foreground/30 hover:bg-foreground/50"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox / modal pop-up view */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-background/90 p-4 backdrop-blur-xl"
            onClick={() => setLightbox(false)}
          >
            <button
              onClick={() => setLightbox(false)}
              aria-label="Close full view"
              className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-border bg-card/60 text-foreground transition-colors hover:bg-card"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); go(-1); }}
              aria-label="Previous photo"
              className="absolute left-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-violet-400/40 bg-background/60 text-violet-100 transition-all hover:bg-violet-500/30 sm:left-8"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); go(1); }}
              aria-label="Next photo"
              className="absolute right-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-violet-400/40 bg-background/60 text-violet-100 transition-all hover:bg-violet-500/30 sm:right-8"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <motion.figure
              key={index}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-card shadow-[0_0_60px_-12px_rgba(217,70,239,0.5)]"
            >
              <img
                src={slides[index]}
                alt={`${profile.name} — ${captions[index]}`}
                className="max-h-[78vh] w-full object-contain"
                draggable={false}
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 border-t border-border/60 bg-background/80 px-4 py-3 backdrop-blur-md">
                <span className="text-sm font-medium text-foreground">{captions[index]}</span>
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
