"use client";

import { motion } from "framer-motion";
import { marqueeSkills } from "@/data/portfolio";

export default function TechMarquee() {
  return (
    <div className="relative overflow-hidden border-y border-line bg-gradient-to-r from-amber-500/4 via-violet-600/8 to-cyan-500/4 py-4">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="marquee-track flex w-max items-center gap-8"
      >
        {[...marqueeSkills, ...marqueeSkills].map((s, i) => (
          <span
            key={i}
            className="font-display flex shrink-0 items-center gap-8 text-sm font-bold tracking-[0.2em] text-faint uppercase"
          >
            {s}
            <span className="gradient-text">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
