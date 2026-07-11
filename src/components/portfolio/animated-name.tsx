"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/portfolio-data";

/**
 * Premium animated hero name.
 *
 * Entrance: each letter animates into view (fade + slide up + blur-to-sharp
 * + slight scale settle), so the name visually "forms" into VINCENT CHIMAOBI.
 *
 * Continuous (after entrance): the `.hero-name` class drives a moving neon
 * gradient and a soft glow pulse — subtle and professional, never chaotic.
 */
export function AnimatedHeroName() {
  // Render "VINCENT CHIMAOBI" as two stacked, dominant lines.
  const lines = profile.heroName.split(" ");

  return (
    <span className="hero-name block" aria-label={profile.heroName} role="heading" aria-level={1}>
      {lines.map((word, wi) => (
        <span key={wi} className="block">
          {word.split("").map((ch, ci) => {
            const order = wi * 8 + ci;
            return (
              <motion.span
                key={ci}
                aria-hidden
                initial={{ opacity: 0, y: 42, filter: "blur(14px)", scale: 0.82 }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                transition={{
                  duration: 0.85,
                  delay: 0.25 + order * 0.045,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block"
              >
                {ch}
              </motion.span>
            );
          })}
        </span>
      ))}
    </span>
  );
}
