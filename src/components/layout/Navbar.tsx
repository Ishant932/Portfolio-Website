"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { navLinks, personalInfo } from "@/data/portfolio";
import { Menu, X, FileText, Link2 } from "lucide-react";
import ThemeToggle from "@/components/effects/ThemeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className={cn(
          "fixed top-0 right-0 left-0 z-50 px-4 py-4 transition-all duration-500 md:px-8",
          scrolled && "py-3"
        )}
      >
        <nav
          className={cn(
            "mx-auto flex max-w-[88rem] items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500",
            scrolled
              ? "glass-nav border shadow-lg border-line shadow-violet-500/10"
              : "bg-transparent"
          )}
        >
          <a href="#home" className="group flex items-center gap-2.5">
            <Image
              src="/logo.png"
              alt="Ishant Goyal logo"
              width={52}
              height={52}
              priority
              className="h-[52px] w-[52px] rounded-xl object-cover ring-2 ring-violet-400/50 shadow-lg shadow-violet-500/20 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
            />
            <span className="font-display text-sm font-bold text-main">
              Ishant <span className="gradient-text">Goyal</span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={cn(
                    "relative rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                    activeSection === link.href.replace("#", "")
                      ? "text-main"
                      : "text-muted hover:text-main"
                  )}
                >
                  {link.label}
                  {activeSection === link.href.replace("#", "") && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-0 -z-10 rounded-lg bg-chip"
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2.5">
            <ThemeToggle />
            <a
              href={personalInfo.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 rounded-xl border px-4 py-2.5 text-sm font-semibold border-line text-main transition-colors hover:border-violet-400/60 hover:bg-chip md:flex"
            >
              <FileText size={15} className="text-amber-500" />
              Resume
            </a>
            <a
              href={personalInfo.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 rounded-xl border px-4 py-2.5 text-sm font-semibold border-line text-main transition-colors hover:border-sky-400/60 hover:bg-chip md:flex"
            >
              <Link2 size={15} className="text-sky-500" />
              Connect
            </a>
            <a
              href="#contact"
              className="btn-gradient btn-shine hidden rounded-xl px-5 py-2.5 text-sm font-bold transition-transform hover:scale-105 md:block"
            >
              Hire Me
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-lg p-2 text-main md:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu — conditionally rendered so the overlay NEVER exists in the DOM
          (or in the SSR HTML) when closed. An invisible full-screen overlay is what
          blocked all scrolling/taps on phones before hydration. */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xl md:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="absolute top-0 right-0 flex h-full w-72 flex-col gap-2 bg-surface p-8 pt-24"
              onClick={(e) => e.stopPropagation()}
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-xl px-4 py-3 text-lg font-medium text-main hover:bg-chip"
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href={personalInfo.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-2 rounded-xl border px-4 py-3 font-semibold border-line text-main"
              >
                <FileText size={16} className="text-amber-500" /> View Resume
              </a>
              <a
                href={personalInfo.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-2 rounded-xl border px-4 py-3 font-semibold border-line text-main"
              >
                <Link2 size={16} className="text-sky-500" /> Connect on LinkedIn
              </a>
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="btn-gradient mt-2 rounded-xl px-4 py-3 text-center font-bold"
              >
                Hire Me
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
