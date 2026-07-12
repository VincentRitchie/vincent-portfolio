"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { navItems, profile as defaultProfile } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";
import { assetPath } from "@/lib/asset-path";

type ProfileLike = typeof defaultProfile;

export function Navbar({ profile = defaultProfile }: { profile?: ProfileLike } = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("home");

  // Primary links shown in the desktop bar (rest live in the mobile drawer)
  const primaryLinks = navItems.filter((n) =>
    ["About", "Expertise", "AI Evaluation", "Web Development", "Projects", "Afrik-Vine", "Contact"].includes(
      n.label
    )
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navItems.map((n) => n.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-border/60 bg-background/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand avatar — personal profile photo (NOT Afrik-Vine) */}
          <button
            onClick={() => handleNav("#home")}
            className="group flex items-center gap-3"
            aria-label="Go to top"
          >
            <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-full border border-violet-400/50 bg-gradient-to-br from-violet-600/30 to-fuchsia-600/30">
              <img
                src={assetPath(profile.avatar)}
                alt=""
                className="h-full w-full object-cover"
                draggable={false}
              />
              <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/15 transition-opacity group-hover:ring-violet-300/50" />
            </span>
            <span className="hidden flex-col leading-none sm:flex">
              <span className="font-display text-[13px] font-semibold tracking-tight text-foreground">
                {profile.name}
              </span>
              <span className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {profile.role}
              </span>
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 lg:flex">
            {primaryLinks.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = active === id;
              return (
                <button
                  key={item.href}
                  onClick={() => handleNav(item.href)}
                  className={cn(
                    "relative rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleNav("#contact")}
              className="hidden items-center gap-2 rounded-full border border-violet-400/40 bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-100 transition-all hover:bg-violet-500/20 hover:shadow-[0_0_30px_-6px_rgba(168,85,247,0.6)] sm:inline-flex"
            >
              Let&apos;s Talk
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-card/60 text-foreground lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col border-l border-border bg-card/95 backdrop-blur-xl"
            >
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <span className="font-display text-sm font-semibold">Menu</span>
                <button
                  onClick={() => setOpen(false)}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground hover:text-foreground"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-3 py-4">
                {navItems.map((item, i) => {
                  const id = item.href.replace("#", "");
                  const isActive = active === id;
                  return (
                    <motion.button
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * i }}
                      onClick={() => handleNav(item.href)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-base font-medium transition-colors",
                        isActive
                          ? "bg-violet-500/15 text-violet-100"
                          : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                      )}
                    >
                      {item.label}
                      <ArrowRight className="h-4 w-4 opacity-50" />
                    </motion.button>
                  );
                })}
              </div>
              <div className="border-t border-border p-5">
                <button
                  onClick={() => handleNav("#contact")}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-3 text-sm font-semibold text-white shadow-[0_0_30px_-6px_rgba(217,70,239,0.7)]"
                >
                  Start a Conversation
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
