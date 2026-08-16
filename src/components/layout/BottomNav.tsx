"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Home, User, FolderGit2, Wrench, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "home", label: "Home", href: "#home", icon: Home, color: "#a78bfa", deep: "#7c3aed" },
  { id: "about", label: "About", href: "#about", icon: User, color: "#22d3ee", deep: "#0891b2" },
  { id: "projects", label: "Projects", href: "#projects", icon: FolderGit2, color: "#fbbf24", deep: "#d97706" },
  { id: "skills", label: "Skills", href: "#skills", icon: Wrench, color: "#f472b6", deep: "#db2777" },
  { id: "contact", label: "Contact", href: "#contact", icon: Mail, color: "#34d399", deep: "#059669" },
];

export default function BottomNav() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    tabs.forEach((t) => {
      const el = document.getElementById(t.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      initial={{ y: 90 }}
      animate={{ y: 0 }}
      transition={{ delay: 1.2, type: "spring", damping: 22 }}
      className="fixed right-3 bottom-3 left-3 z-50 md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="glass-nav mx-auto flex max-w-md items-center justify-between rounded-2xl border border-line px-2 py-2 shadow-2xl shadow-violet-500/10">
        {tabs.map(({ id, label, href, icon: Icon, color, deep }) => {
          const isActive = active === id;
          return (
            <a
              key={id}
              href={href}
              aria-label={label}
              className={cn(
                "relative flex flex-1 flex-col items-center gap-0.5 rounded-xl px-1 py-1.5 transition-transform duration-200",
                isActive ? "scale-[1.06]" : "active:scale-95"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="bottom-nav-pill"
                  transition={{ type: "spring", damping: 24, stiffness: 300 }}
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background: `linear-gradient(135deg, ${color}E6, ${deep}B3)`,
                    boxShadow: `0 4px 16px ${color}66, inset 0 1px 0 rgba(255,255,255,0.25)`,
                    border: `1px solid ${color}88`,
                  }}
                />
              )}
              <Icon
                size={20}
                strokeWidth={2.75}
                className={cn("relative z-10", isActive ? "text-[#0f172a] dark:text-[#0b1220]" : "text-[#1e3a8a] dark:text-blue-300")}
                style={isActive ? { filter: `drop-shadow(0 1px 2px ${deep}66)` } : undefined}
              />
              <span
                className={cn(
                  "relative z-10 text-[10px] font-black tracking-widest uppercase",
                  isActive ? "text-[#0f172a] dark:text-[#0b1220]" : "text-[#1e3a8a] dark:text-blue-300"
                )}
              >
                {label}
              </span>
            </a>
          );
        })}
      </div>
    </motion.nav>
  );
}
