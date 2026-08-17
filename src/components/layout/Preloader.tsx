"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Progress runs fast (~300ms once JS hydrates)…
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setLoading(false);
          return 100;
        }
        return p + Math.random() * 40 + 25;
      });
    }, 30);
    // …and a hard cap guarantees dismissal even if the interval misbehaves.
    const failsafe = setTimeout(() => setLoading(false), 2000);
    return () => {
      clearInterval(interval);
      clearTimeout(failsafe);
    };
  }, []);

  return (
    // The shell carries a CSS-only auto-exit (2s) that fades the overlay out and
    // disables pointer events even before React hydrates — the page can never be blocked.
    <div className="preloader-shell">
      <AnimatePresence>
        {loading && (
          <motion.div
            className="bg-base fixed inset-0 z-[9999] flex flex-col items-center justify-center"
            exit={{ opacity: 0, scale: 1.08 }}
            transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-[20%] left-[20%] h-72 w-72 rounded-full bg-amber-500/20 blur-[90px] animate-float" />
              <div className="absolute right-[10%] bottom-[10%] h-96 w-96 rounded-full bg-violet-600/20 blur-[100px] animate-float animation-delay-2000" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative z-10 text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="relative mx-auto mb-6 flex h-28 w-28 items-center justify-center md:h-32 md:w-32"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-400/25 via-pink-500/15 to-violet-500/25 blur-2xl" />
                <Image
                  src="/logo.png"
                  alt="Ishant Goyal logo"
                  width={128}
                  height={128}
                  priority
                  className="relative h-full w-full rounded-2xl object-cover ring-2 ring-amber-400/40 shadow-2xl shadow-violet-500/30"
                />
              </motion.div>
              <div className="mx-auto h-1 w-48 overflow-hidden rounded-full bg-chip">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 via-pink-500 to-violet-500"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
              <p className="mt-4 font-mono text-xs tracking-[0.3em] text-faint uppercase">
                Loading Experience {Math.min(Math.round(progress), 100)}%
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
