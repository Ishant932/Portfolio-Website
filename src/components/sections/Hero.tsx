"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  Phone,
  Mail,
  Link2,
  Code2,
  MapPin,
  Sparkles,
  FileText,
} from "lucide-react";
import { personalInfo } from "@/data/portfolio";

const ParticleField = dynamic(() => import("@/components/effects/ParticleField"), {
  ssr: false,
});

const domainColors = [
  "from-cyan-500 via-sky-500 to-blue-600",
  "from-amber-500 via-orange-500 to-rose-600",
  "from-fuchsia-500 via-purple-500 to-violet-600",
];

const domainGlow = ["#06b6d4", "#f59e0b", "#a855f7"];

const contactPills = [
  {
    label: "Phone",
    value: personalInfo.phone,
    href: `tel:${personalInfo.phoneRaw}`,
    icon: Phone,
    color: "#059669",
  },
  {
    label: "Email",
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    icon: Mail,
    color: "#d97706",
  },
  {
    label: "LinkedIn",
    value: "in/ishant-goyal",
    href: personalInfo.links.linkedin,
    icon: Link2,
    color: "#0891b2",
  },
  {
    label: "LeetCode",
    value: "@Ishant__goyal",
    href: personalInfo.links.leetcode,
    icon: Code2,
    color: "#7c3aed",
  },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const [currentTitle, setCurrentTitle] = useState(0);
  // three.js is heavy (~500KB) — only fetch the chunk on desktop so mobile stays fast
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentTitle((t) => (t + 1) % personalInfo.titles.length);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const name = "ISHANT GOYAL";

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-4 pt-24 pb-16"
    >
      <div className="aurora-bg absolute inset-0" />
      <div className="grid-bg absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]" />
      <div className="noise-overlay absolute inset-0 opacity-[0.03]" />
      {isDesktop && <ParticleField />}

      <div className="absolute top-1/4 -left-20 h-72 w-72 rounded-full bg-amber-500/15 blur-[130px] animate-pulse-slow" />
      <div className="absolute right-0 bottom-1/4 h-96 w-96 rounded-full bg-violet-600/15 blur-[140px] animate-pulse-slow animation-delay-2000" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto grid w-full max-w-[88rem] items-center gap-16 pt-16 lg:grid-cols-[1.1fr_1fr] lg:gap-24"
      >
        {/* LEFT */}
        <div className="relative min-w-0">
          {/* Domain pills — one line on md+ */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="mb-6 flex flex-wrap items-center gap-1.5 md:flex-nowrap"
          >
            {personalInfo.titles.map((title, i) => (
              <span key={title} className="flex items-center gap-1.5">
                <motion.span
                  animate={{ scale: currentTitle === i ? [1, 1.08, 1] : 1 }}
                  transition={{ duration: 0.6 }}
                  className={`rounded-full bg-gradient-to-r ${domainColors[i]} px-3 py-2 text-[11px] font-extrabold whitespace-nowrap text-white shadow-lg md:text-xs xl:px-4 xl:py-2.5 xl:text-[13px]`}
                  style={{
                    boxShadow: `0 6px 22px ${domainGlow[i]}66, 0 2px 10px ${domainGlow[i]}40`,
                  }}
                >
                  {title}
                </motion.span>
                {i < personalInfo.titles.length - 1 && (
                  <span className="gradient-text text-lg font-black xl:text-xl">/</span>
                )}
              </span>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
            className="mb-3 flex items-center gap-2 font-mono text-xs tracking-[0.3em] text-muted uppercase"
          >
            <MapPin size={13} className="text-emerald-theme" />
            {personalInfo.location}
          </motion.p>

          {/* Big name — fluid size so it never cuts on any screen */}
          <h1 className="font-display mb-7 text-[clamp(2.3rem,7vw,4.2rem)] leading-[1.08] font-extrabold tracking-tight text-main">
            <span className="inline-block whitespace-nowrap">
              {name.slice(0, 6).split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 60, rotateX: 90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    delay: 0.8 + i * 0.045,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </span>{" "}
            <motion.span
              initial={{ opacity: 0, y: 60, rotateX: 90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                delay: 0.8 + 6 * 0.045,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="gradient-text inline-block whitespace-nowrap"
            >
              GOYAL
            </motion.span>
          </h1>

          {/* Rotating role line — crossfade, never cuts or overlaps */}
          <div className="mb-10 flex items-start gap-2.5">
            <Sparkles size={16} className="mt-1 shrink-0 text-amber-500" />
            <div className="relative min-h-8">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentTitle}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-lg leading-snug font-semibold text-muted md:text-xl"
                >
                  {personalInfo.titles[currentTitle]} — building the future, one
                  stack at a time.
                </motion.p>
              </AnimatePresence>
            </div>
            <span className="animate-blink mt-1.5 inline-block h-6 w-[3px] shrink-0 rounded bg-gradient-to-b from-amber-500 to-pink-500" />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="mb-9 max-w-xl leading-relaxed text-muted"
          >
            I architect scalable full-stack ecosystems and AI-powered digital
            experiences — from payment flows and admin dashboards to multi-agent
            automation — trusted by platforms serving{" "}
            <span className="font-semibold gradient-text-slow">75,000+ users</span>.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.45 }}
            className="mb-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              data-cursor
              className="btn-gradient btn-shine rounded-2xl px-7 py-3.5 font-bold md:px-8 md:py-4"
            >
              Explore My Work
            </a>
            <a
              href="#contact"
              data-cursor
              className="rounded-2xl border border-line px-7 py-3.5 font-bold text-main backdrop-blur-sm transition-all hover:border-violet-400/60 hover:bg-chip md:px-8 md:py-4"
            >
              Let&apos;s Talk
            </a>
            <a
              href={personalInfo.resume}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor
              className="flex items-center gap-2 rounded-2xl border border-line px-5 py-3.5 text-sm font-bold text-main transition-all hover:border-amber-400/60 hover:bg-chip"
            >
              <FileText size={16} className="text-amber-500" />
              View Resume
            </a>
          </motion.div>

          {/* Contact cards — bigger, always visible */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-3.5"
          >
            {contactPills.map(({ label, value, href, icon: Icon, color }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                data-cursor
                className="group glass-card rounded-2xl p-4 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-500/10 sm:p-5"
              >
                <div className="mb-2 flex items-center gap-2">
                  <Icon size={17} style={{ color }} />
                  <span className="text-[11px] font-semibold tracking-widest text-faint uppercase">
                    {label}
                  </span>
                </div>
                <p className="break-words text-sm leading-snug font-bold text-main transition-colors sm:text-[15px]">
                  {value}
                </p>
              </a>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — photo (static ring, generous spacing) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, rotate: 4 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 1.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-full py-10 sm:max-w-sm lg:max-w-md"
        >
          <div className="orbit-ring absolute -inset-6 hidden sm:block" />
          <div className="orbit-ring absolute -inset-12 hidden lg:block" />

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <div className="photo-ring relative rounded-full">
              <div className="relative aspect-square overflow-hidden rounded-full border-2 border-white/20 shadow-2xl shadow-violet-500/25">
                <Image
                  src={personalInfo.photo}
                  alt="Ishant Goyal"
                  fill
                  priority
                  sizes="(max-width: 768px) 90vw, 420px"
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040211]/60 via-transparent to-transparent" />
              </div>
            </div>

            {/* status card */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="glass-card absolute -bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 rounded-2xl px-6 py-3.5 shadow-xl"
            >
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
              </span>
              <div className="text-left">
                <p className="text-sm font-bold text-main">Available for work</p>
              </div>
            </motion.div>
          </motion.div>

          {/* accent quote under photo */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
            className="mt-14 hidden text-center font-mono text-xs tracking-wider text-faint lg:block"
          >
            &ldquo;code is my canvas, <span className="gradient-text">ai is my brush</span>&rdquo;
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}
