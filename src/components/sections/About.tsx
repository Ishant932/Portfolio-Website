"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import Image from "next/image";
import { aboutContent, education, personalInfo } from "@/data/portfolio";
import { GraduationCap, Quote, MapPin, Code2, Brain, Cpu, Rocket } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const serviceIcons: Record<string, typeof Code2> = {
  code: Code2,
  brain: Brain,
  cpu: Cpu,
  rocket: Rocket,
};

function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, value, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} id="about" className="relative overflow-hidden px-4 pt-24 pb-14">
      <div className="aurora-blob aurora-blob-1" />
      <div className="aurora-blob aurora-blob-2" />

      <div className="relative mx-auto max-w-[88rem]">
        <SectionHeading
          eyebrow="About Me"
          title="Crafting Digital"
          highlight="Masterpieces"
          subtitle="A developer who thinks like an engineer, designs like an artist, and automates like an AI specialist."
        />

        <div className="grid gap-14 lg:grid-cols-5 lg:gap-16">
          {/* Left: portrait + quote */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-2"
          >
            <div className="relative mx-auto max-w-sm">
              {/* pulsing aura behind the portrait */}
              <div className="absolute -inset-6 animate-pulse-slow rounded-[2.5rem] bg-gradient-to-br from-amber-500/20 via-pink-600/20 to-violet-600/20 blur-3xl" />

              {/* portrait with rotating conic aura + scan sweep */}
              <motion.div
                whileHover={{ scale: 1.02, rotate: -0.5 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="group relative"
              >
                <div className="relative overflow-hidden rounded-[2rem] p-[3px]">
                  <div className="conic-spin absolute -inset-[150%]" />
                  <div className="scan-sweep relative overflow-hidden rounded-[calc(2rem-3px)]">
                    <Image
                      src={personalInfo.photo}
                      alt="Ishant Goyal portrait"
                      width={560}
                      height={560}
                      className="aspect-[4/4.4] w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#040211]/90 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-400/10 mix-blend-overlay" />
                    <div className="absolute right-4 bottom-4 left-4">
                      <Quote size={22} className="mb-2 text-amber-500" />
                      <p className="text-sm leading-relaxed text-white/85 italic">
                        &ldquo;Code is my canvas, AI is my brush — I paint products that
                        people love to use.&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* floating badge around the portrait */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="glass-card absolute -top-4 -left-5 z-10 flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold text-main shadow-lg"
              >
                ⚡ AI-First
              </motion.div>

              <div className="mt-5 flex flex-wrap gap-2">
                {aboutContent.traits.map((t, i) => (
                  <motion.span
                    key={t.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.08 }}
                    title={t.value}
                    className="glass-card rounded-full px-3.5 py-1.5 text-xs font-semibold text-muted"
                  >
                    <span className="gradient-text">{t.label}</span> · {t.value}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: bio */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="lg:col-span-3"
          >
            <p className="mb-5 text-2xl leading-snug font-semibold text-main">
              {aboutContent.intro.split("—")[0]}
              <span className="gradient-text"> — {aboutContent.intro.split("—")[1]}</span>
            </p>

            {aboutContent.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.08}>
                <p className="mb-4 leading-relaxed text-muted">{p}</p>
              </Reveal>
            ))}

            <div className="mt-4 flex items-center gap-2 text-sm text-muted">
              <MapPin size={15} className="text-emerald-theme" />
              {personalInfo.location} — open to remote & on-site opportunities
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {aboutContent.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="gradient-border rounded-2xl p-5 text-center"
                >
                  <div className="font-display text-2xl font-extrabold text-main md:text-3xl">
                    <CountUp
                      value={parseInt(stat.value)}
                      suffix={stat.value.replace(/\d+/g, "")}
                    />
                  </div>
                  <div className="mt-1 text-[11px] font-medium tracking-wider text-muted uppercase">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Education */}
            <div className="gradient-border mt-8 rounded-2xl p-6">
              <div className="mb-5 flex items-center gap-2">
                <GraduationCap size={20} className="text-amber-500" />
                <h3 className="font-display text-lg font-bold text-main">Education</h3>
              </div>
              <div className="relative space-y-6">
                <div className="absolute top-1 bottom-1 left-[5px] w-px bg-gradient-to-b from-amber-500 via-pink-600 to-violet-600" />
                {education.map((edu) => (
                  <motion.div
                    key={edu.degree}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + education.indexOf(edu) * 0.12 }}
                    className="relative pl-7"
                  >
                    <span className="absolute top-1.5 left-0 h-2.5 w-2.5 rounded-full bg-gradient-to-br from-amber-500 to-pink-600 shadow-[0_0_10px_#d9770666]" />
                    <p className="font-bold text-main">{edu.degree}</p>
                    <p className="text-sm text-muted">{edu.institution}</p>
                    <p className="font-mono text-xs text-faint">
                      {edu.period} · {edu.details}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Services */}
        <div className="mt-12">
          <Reveal>
            <h3 className="font-display mb-10 text-center text-2xl font-extrabold text-main md:text-3xl">
              What I <span className="gradient-text">Do Best</span>
            </h3>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {aboutContent.services.map((service, i) => {
              const Icon = serviceIcons[service.icon] || Code2;
              return (
                <Reveal key={service.title} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="glass-card group relative h-full overflow-hidden rounded-3xl p-6"
                  >
                    <div
                      className={`absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br ${service.gradient} opacity-15 blur-2xl transition-opacity group-hover:opacity-40`}
                    />
                    <div
                      className={`mb-4 flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br ${service.gradient} p-3 text-white shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-6`}
                    >
                      <Icon size={22} />
                    </div>
                    <h4 className="mb-2 font-display text-sm font-bold text-main">
                      {service.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-muted">
                      {service.description}
                    </p>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
