"use client";

import { footer, profile } from "@/lib/portfolio-data";
import { ArrowUp, Mail, Phone, MapPin, Twitter, Github } from "lucide-react";

export function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const socials = [
    { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
    { label: "Phone", href: `tel:${profile.phone.replace(/\s/g, "")}`, icon: Phone },
    { label: "X / Twitter", href: `https://x.com/${profile.twitter}`, icon: Twitter },
    { label: "GitHub", href: `https://github.com/${profile.github}`, icon: Github },
  ];

  return (
    <footer className="relative mt-auto border-t border-border bg-background/80 backdrop-blur-xl">
      {/* top glow line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-full border border-violet-400/50 bg-gradient-to-br from-violet-600/30 to-fuchsia-600/30">
                <img
                  src={profile.avatar}
                  alt=""
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              </span>
              <div>
                <p className="font-display text-base font-semibold text-foreground">
                  {profile.name}
                </p>
                <p className="text-xs text-muted-foreground">{profile.role}</p>
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              {footer.blurb}
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              {footer.ventureNote}
            </p>
            <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 text-violet-300" />
              {footer.location}
            </p>
          </div>

          {/* Nav links */}
          <div className="lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Explore
            </p>
            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
              {footer.links.map((l) => (
                <button
                  key={l.href + l.label}
                  onClick={() => scrollTo(l.href)}
                  className="inline-flex items-center gap-1 text-left text-sm text-muted-foreground transition-colors hover:text-violet-200"
                >
                  <span className="h-1 w-1 rounded-full bg-violet-400/50" />
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div className="lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Connect
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {socials.map((s) => {
                const SIcon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-2 rounded-lg border border-border/60 bg-card/40 px-3 py-2 text-xs font-medium text-muted-foreground transition-all hover:border-violet-400/40 hover:text-violet-200"
                  >
                    <SIcon className="h-3.5 w-3.5" />
                    <span className="truncate">{s.label}</span>
                  </a>
                );
              })}
            </div>
            <button
              onClick={() => scrollTo("#home")}
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-4 py-2 text-xs font-semibold text-foreground transition-all hover:border-violet-400/40"
            >
              Back to top
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {profile.name}. Personal portfolio. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Crafted with disciplined thinking · Premium futuristic design
          </p>
        </div>
      </div>
    </footer>
  );
}
