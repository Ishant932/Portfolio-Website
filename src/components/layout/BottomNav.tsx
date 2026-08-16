"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Home, User, FolderGit2, Wrench, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "home", label: "Home", href: "#home", icon: Home, color: "#a78bfa" },
  { id: "about", label: "About", href: "#about", icon: User, color: "#22d3ee" },
  { id: "projects", label: "Projects", href: "#projects", icon: FolderGit2, color: "#fbbf24" },
  { id: "skills", label: "Skills", href: "#skills", icon: Wrench, color: "#f472b6" },
  { id: "contact", label: "Contact", href: "#contact", icon: Mail, color: "#34d399" },
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
        {tabs.map(({ id, label, href, icon: Icon }) => {
          const isActive = active === id;
          return (
            <a
              key={id}
              href={href}
              aria-label={label}
              className={cn(
                "relative flex flex-1 flex-col items-center gap-0.5 rounded-xl px-1 py-1.5 transition-colors",
                isActive ? "text-white" : "text-main"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="bottom-nav-pill"
                  transition={{ type: "spring", damping: 24, stiffness: 300 }}
                  className="btn-gradient absolute inset-0 rounded-xl shadow-lg"
                />
              )}
              <Icon size={20} strokeWidth={2.75} className="relative z-10 transition-transform" />
              <span className="relative z-10 text-[10px] font-extrabold tracking-wide uppercase">
                {label}
              </span>
            </a>
          );
        })}
      </div>
    </motion.nav>
  );
}
