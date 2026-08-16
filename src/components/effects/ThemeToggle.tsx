"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    try {
      setDark(document.documentElement.classList.contains("dark"));
    } catch {}
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  };

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle theme"
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      className={`relative flex h-9 w-9 items-center justify-center rounded-full border transition-all ${
        dark
          ? "border-amber-400/40 bg-amber-400/10 text-amber-400"
          : "border-violet-400/40 bg-violet-400/10 text-violet-600"
      }`}
    >
      <motion.span
        key={dark ? "moon" : "sun"}
        initial={{ rotate: -120, opacity: 0, scale: 0.5 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="flex"
      >
        {dark ? <Moon size={17} /> : <Sun size={17} />}
      </motion.span>
      <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-amber-400/20 to-violet-500/20 opacity-0 blur-md transition-opacity group-hover:opacity-100" />
    </motion.button>
  );
}
