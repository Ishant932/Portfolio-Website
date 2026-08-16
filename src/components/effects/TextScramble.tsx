"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface TextScrambleProps {
  text: string;
  className?: string;
}

export default function TextScramble({ text, className }: TextScrambleProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const chars = "!<>-_\\/[]{}—=+*^?#________";
    let frame = 0;
    const duration = 40;

    const interval = setInterval(() => {
      el.textContent = text
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < frame) return text[i];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      if (frame >= text.length) clearInterval(interval);
      frame += 0.5;
    }, duration / text.length);

    return () => clearInterval(interval);
  }, [text]);

  return <motion.span ref={ref} className={className} />;
}
