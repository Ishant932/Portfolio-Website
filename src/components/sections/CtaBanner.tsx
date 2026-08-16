"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolio";
import { ArrowRight, Link2, FileText, Sparkles } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

export default function CtaBanner() {
  return (
    <section id="hire-me" className="relative px-4 py-10">
      <div className="relative mx-auto max-w-[88rem]">
        <Reveal>
          <div className="gradient-border relative overflow-hidden rounded-[2.5rem] p-10 text-center md:p-16">
            {/* animated background */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-br from-amber-400/25 to-pink-500/25 blur-[90px] animate-pulse-slow" />
              <div className="absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-gradient-to-br from-violet-500/25 to-cyan-400/25 blur-[90px] animate-pulse-slow animation-delay-2000" />
              <div className="absolute inset-0 opacity-10">
                <div
                  className="h-full w-full"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(139,92,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.5) 1px, transparent 1px)",
                    backgroundSize: "44px 44px",
                  }}
                />
              </div>
            </div>

            <div className="relative">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 via-pink-500 to-violet-500 text-white shadow-lg shadow-pink-500/30"
              >
                <Sparkles size={26} />
              </motion.div>

              <h2 className="font-display text-3xl leading-tight font-extrabold text-main md:text-5xl">
                Have a project in mind?{" "}
                <span className="gradient-text heading-glow">Let&apos;s build it together</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted">
                Looking for a Full Stack Developer, Software Developer, or AI Specialist
                to bring your idea to life? I&apos;m open to internships, freelance
                projects, and full-time roles — let&apos;s talk.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="#contact"
                  data-cursor
                  className="btn-gradient btn-shine group flex items-center gap-2 rounded-2xl px-8 py-4 font-bold"
                >
                  Hire Me
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href={personalInfo.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor
                  className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-700 px-8 py-4 font-bold text-white shadow-lg shadow-blue-500/25 transition-transform hover:scale-[1.02]"
                >
                  <Link2 size={18} /> Let&apos;s Connect
                </a>
                <a
                  href={personalInfo.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor
                  className="flex items-center gap-2 rounded-2xl border border-line px-8 py-4 font-bold text-main transition-colors hover:border-amber-400/60 hover:bg-chip"
                >
                  <FileText size={18} className="text-amber-500" /> View Resume
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
