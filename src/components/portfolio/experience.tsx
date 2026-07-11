"use client";

import { Reveal, Section, SectionHeading } from "./shared";
import { experience } from "@/lib/portfolio-data";
import { Briefcase, CheckCircle2, MapPin, Layers } from "lucide-react";
import { motion } from "framer-motion";

export function Experience() {
  return (
    <Section id="experience" className="border-t border-border/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Professional Experience"
          title={
            <>
              Across AI evaluation, remote workflows, generative AI{" "}
              <span className="text-gradient">&amp; security research</span>
            </>
          }
          intro="My experience combines AI data annotation, AI response evaluation, freelance research and content workflows, generative AI production, and authorized security research. Each role has contributed to my ability to analyze requirements, evaluate outputs, document findings, and deliver structured work remotely."
          accent="violet"
        />

        <div className="mt-12">
          {/* timeline */}
          <div className="relative">
            {/* vertical line */}
            <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-violet-500/60 via-fuchsia-500/40 to-transparent sm:left-1/2" />

            <div className="space-y-10">
              {experience.map((exp, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <Reveal key={exp.role + exp.org} delay={i * 0.04}>
                    <div
                      className={`relative flex flex-col sm:flex-row ${isLeft ? "sm:flex-row" : "sm:flex-row-reverse"}`}
                    >
                      {/* node */}
                      <div className="absolute left-4 top-1.5 z-10 grid h-3 w-3 -translate-x-[5px] place-items-center sm:left-1/2 sm:-translate-x-1/2">
                        <motion.span
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.2 }}
                          className="block h-3 w-3 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400 ring-4 ring-background"
                        />
                      </div>

                      {/* spacer for desktop alternating layout */}
                      <div className="hidden sm:block sm:w-1/2" />

                      {/* card */}
                      <div className={`pl-12 sm:w-1/2 sm:pl-0 ${isLeft ? "sm:pr-10 sm:text-right" : "sm:pl-10"}`}>
                        <div className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-violet-400/40 hover:shadow-[0_0_40px_-12px_rgba(168,85,247,0.4)]">
                          <div className={`flex items-center gap-2 ${isLeft ? "sm:justify-end" : ""}`}>
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-400/30 bg-violet-500/10 px-2.5 py-1 text-[11px] font-medium text-violet-200">
                              <Briefcase className="h-3 w-3" />
                              {exp.period}
                            </span>
                          </div>
                          <h3 className="mt-3 font-display text-lg font-semibold text-foreground">
                            {exp.role}
                          </h3>
                          <p className="mt-0.5 text-sm font-medium text-fuchsia-300">
                            {exp.org}
                          </p>
                          <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {exp.type}
                          </p>
                          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                            {exp.summary}
                          </p>

                          {exp.points.length > 0 && (
                            <ul className={`mt-4 space-y-1.5 ${isLeft ? "sm:text-right" : ""}`}>
                              {exp.points.map((p, j) => (
                                <li
                                  key={j}
                                  className={`flex gap-2 text-xs leading-relaxed text-muted-foreground ${isLeft ? "sm:flex-row-reverse sm:text-right" : ""}`}
                                >
                                  <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-violet-300" />
                                  <span>{p}</span>
                                </li>
                              ))}
                            </ul>
                          )}

                          {exp.methods.length > 0 && (
                            <div className={`mt-4 ${isLeft ? "sm:text-right" : ""}`}>
                              <p className="mb-1.5 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                                <Layers className="h-3 w-3" />
                                Personally developed methods
                              </p>
                              <div className={`flex flex-wrap gap-1.5 ${isLeft ? "sm:justify-end" : ""}`}>
                                {exp.methods.map((m) => (
                                  <span
                                    key={m}
                                    className="rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-2.5 py-0.5 text-[11px] font-medium text-fuchsia-200"
                                  >
                                    {m}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
