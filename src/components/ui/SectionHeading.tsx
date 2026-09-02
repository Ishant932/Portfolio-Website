"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow: string;
  title: string;
  highlight: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = "left",
  className,
}: Props) {
  const centered = align === "center";
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn("mb-14", centered && "text-center", className)}
    >
      <div
        className={cn(
          "mb-4 flex items-center gap-3",
          centered && "justify-center"
        )}
      >
        <span className="h-px w-10 bg-gradient-to-r from-amber-500 via-pink-600 to-violet-600" />
        <span className="font-mono text-xs tracking-[0.35em] text-muted uppercase">
          {eyebrow}
        </span>
        <span className="h-px w-10 bg-gradient-to-r from-violet-600 via-pink-600 to-amber-500" />
      </div>

      <h2 className="font-display text-3xl leading-tight font-extrabold text-main md:text-5xl">
        {title}{" "}
        <span className="gradient-text heading-glow">{highlight}</span>
      </h2>

      {subtitle && (
        <p
          className={cn(
            "mt-4 max-w-2xl text-base leading-relaxed text-muted",
            centered && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
