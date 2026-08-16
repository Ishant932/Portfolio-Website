"use client";

import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { skillCategories, achievements, marqueeSkills } from "@/data/portfolio";
import {
  Code,
  Layout,
  Server,
  Database,
  Cpu,
  Wrench,
  Brain,
  Cloud,
  CreditCard,
  BookOpen,
  Trophy,
  Rocket,
  Sparkles,
  Binary,
  Zap,
  Bot,
  Wand2,
  MousePointer2,
  Workflow,
  Hexagon,
  Send,
  Code2,
  Link2,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import TiltCard from "@/components/ui/TiltCard";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  code: Code,
  layout: Layout,
  server: Server,
  database: Database,
  cpu: Cpu,
  wrench: Wrench,
  brain: Brain,
  cloud: Cloud,
  "credit-card": CreditCard,
  book: BookOpen,
};

const achievementIcons: Record<string, LucideIcon> = {
  trophy: Trophy,
  rocket: Rocket,
  cloud: Cloud,
  code: Binary,
  sparkles: Sparkles,
  brain: Brain,
};

/* Crazy animated AI Tools card — header + live orbit diagram + all tool names */
type OrbitTool = {
  name: string;
  icon: LucideIcon;
  from: string;
  to: string;
  glow: string;
  iconColor: string;
  sub: string;
};

const orbitTools: OrbitTool[] = [
  { name: "Claude", icon: Sparkles, from: "#a855f7", to: "#d946ef", glow: "#c026d3", iconColor: "#7c3aed", sub: "Anthropic's helpful assistant" },
  { name: "Cursor", icon: MousePointer2, from: "#3b82f6", to: "#06b6d4", glow: "#0284c7", iconColor: "#2563eb", sub: "AI-first code editor" },
  { name: "N8N", icon: Workflow, from: "#f97316", to: "#ef4444", glow: "#ea580c", iconColor: "#c2410c", sub: "Workflow automation" },
  { name: "Codex", icon: Code2, from: "#8b5cf6", to: "#3b82f6", glow: "#6d28d9", iconColor: "#6d28d9", sub: "Advanced coding" },
  { name: "Freebuff", icon: Rocket, from: "#10b981", to: "#14b8a6", glow: "#059669", iconColor: "#047857", sub: "AI tools & resources" },
  { name: "LangChain", icon: Link2, from: "#d946ef", to: "#ec4899", glow: "#c026d3", iconColor: "#a21caf", sub: "Build apps with LLMs" },
  { name: "Copilot", icon: Bot, from: "#6366f1", to: "#3b82f6", glow: "#4f46e5", iconColor: "#4338ca", sub: "AI pair programmer" },
  { name: "OpenAI", icon: Hexagon, from: "#f59e0b", to: "#fb923c", glow: "#d97706", iconColor: "#b45309", sub: "Powerful AI models" },
  { name: "Antigravity", icon: Zap, from: "#22d3ee", to: "#0ea5e9", glow: "#0891b2", iconColor: "#0369a1", sub: "Agentic development" },
  { name: "Hermes", icon: Send, from: "#14b8a6", to: "#10b981", glow: "#0d9488", iconColor: "#0f766e", sub: "Smart AI agents" },
];

function AiToolsCard({ skills }: { skills: string[] }) {
  return (
    <div className="gradient-border relative overflow-hidden rounded-3xl p-5 md:p-8">
      {/* animated glow core */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-fuchsia-500/25 via-purple-500/20 to-cyan-400/20 blur-[80px] animate-pulse-slow" />

      <div className="relative flex flex-col items-center">
        {/* header — centered */}
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-purple-600 text-white shadow-lg shadow-fuchsia-500/30">
            <Bot size={24} />
          </div>
          <div>
            <h3 className="font-display text-2xl font-extrabold text-main md:text-3xl">AI Tools</h3>
            <p className="text-sm text-fuchsia-500 dark:text-fuchsia-400">
              My AI-first superpower — agents, workflows &amp; copilots
            </p>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-fuchsia-500/10 px-3 py-1 font-mono text-[11px] font-bold text-fuchsia-500 dark:text-fuchsia-400">
            <Wand2 size={11} /> {String(skills.length).padStart(2, "0")} tools
          </span>
        </div>

        {/* orbiting brain core — dead center, cards revolve around it, staying upright */}
        <div className="relative mx-auto flex aspect-square w-full max-w-[15rem] items-center justify-center sm:max-w-[21rem] lg:max-w-[27.5rem]">
          {/* spinning energy rays */}
          <div className="orbit-rays" />
          <div className="absolute inset-0 animate-pulse-slow rounded-full bg-gradient-to-br from-fuchsia-500/20 to-cyan-400/15 blur-2xl" />

          {/* connector lines + dotted ring — rotate in sync with the cards */}
          <svg className="orbit-lines" viewBox="0 0 200 200" aria-hidden>
            <circle
              cx={100}
              cy={100}
              r={42}
              fill="none"
              stroke="rgba(139,92,246,0.8)"
              strokeWidth={1.5}
              strokeDasharray="3 3"
            />
            {orbitTools.map((t, i) => {
              const a = ((i / orbitTools.length) * 360 - 90) * (Math.PI / 180);
              const x1 = 100 + Math.cos(a) * 42;
              const y1 = 100 + Math.sin(a) * 42;
              const x2 = 100 + Math.cos(a) * 74;
              const y2 = 100 + Math.sin(a) * 74;
              return (
                <line
                  key={t.name}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={t.glow}
                  strokeWidth={1.5}
                  opacity={0.75}
                />
              );
            })}
          </svg>

          {/* rotor spins the cards; counter keeps each one upright */}
          <div className="orbit-rotor absolute inset-0">
            {orbitTools.map((t, i) => {
              const angle = (i / orbitTools.length) * 360 - 90;
              return (
                <span
                  key={t.name}
                  className="orbit-pos absolute top-1/2 left-1/2 flex items-center justify-center"
                  style={{ "--chip-angle": `${angle}deg` } as React.CSSProperties}
                >
                  <span className="orbit-counter flex items-center justify-center">
                    <span className="animate-float-sm flex flex-col items-center gap-1" style={{ animationDelay: `${i * 0.4}s` }}>
                      <motion.span
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                      >
                        <span
                          className="orbit-chip flex items-center gap-1 rounded-full border border-white/50 px-1.5 py-1 backdrop-blur-sm sm:gap-1.5 sm:px-2 lg:px-2.5 lg:py-1.5"
                          style={{
                            backgroundImage: `linear-gradient(135deg, ${t.from}, ${t.to})`,
                            boxShadow: `0 2px 10px ${t.glow}55, 0 0 16px ${t.glow}44`,
                            "--chip-glow": t.glow,
                          } as React.CSSProperties}
                        >
                          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white/95 shadow sm:h-5 sm:w-5">
                            <t.icon size={10} strokeWidth={2.75} style={{ color: t.iconColor }} className="sm:h-3 sm:w-3" />
                          </span>
                          <span className="font-mono text-[7px] font-bold whitespace-nowrap text-white sm:text-[8px] lg:text-[9px]">
                            {t.name}
                          </span>
                        </span>
                      </motion.span>
                      <span className="hidden text-center text-[8px] leading-tight text-muted lg:block">
                        {t.sub}
                      </span>
                    </span>
                  </span>
                </span>
              );
            })}
          </div>

          {/* inner satellite dots — tiny glowing electrons circling the brain */}
          <div className="orbit-satellite absolute inset-0">
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i / 12) * 360;
              return (
                <span
                  key={i}
                  className="orbit-pos-sm absolute top-1/2 left-1/2 flex items-center justify-center"
                  style={{ "--chip-angle": `${angle}deg` } as React.CSSProperties}
                >
                  <span className="orbit-satellite-dot" style={{ animationDelay: `${i * 0.17}s` }} />
                </span>
              );
            })}
          </div>

          {/* core — the brain, dead center, rotating conic aura */}
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 4, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full lg:h-24 lg:w-24"
          >
            <div className="conic-spin absolute -inset-1.5 rounded-full opacity-90" />
            <div className="relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 via-purple-600 to-cyan-500 shadow-[0_0_50px_rgba(217,70,239,0.6)]">
              <Brain size={38} className="text-white lg:h-11 lg:w-11" />
            </div>
            <span className="absolute inset-0 animate-pulse rounded-full" style={{ boxShadow: "0 0 0 0 rgba(217,70,239,0.5)", animation: "pulse-ring 2s infinite" }} />
          </motion.div>
        </div>

        {/* all tools — centered grid under the orbit */}
        <div className="mt-8 flex max-w-3xl flex-wrap justify-center gap-2.5">
          {skills.map((skill, si) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, y: 14, scale: 0.7 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + si * 0.05 }}
              whileHover={{ scale: 1.1, y: -3 }}
              className={cn(
                "skill-chip cursor-default rounded-xl border px-3 py-1.5 font-mono text-xs font-bold shadow-md backdrop-blur-sm",
                si % 3 === 0 && "border-fuchsia-400/40 bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-300",
                si % 3 === 1 && "border-purple-400/40 bg-purple-500/10 text-purple-600 dark:text-purple-300",
                si % 3 === 2 && "border-cyan-400/40 bg-cyan-500/10 text-cyan-600 dark:text-cyan-300"
              )}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const aiTools = skillCategories.find((c) => c.icon === "brain");
  const rest = skillCategories.filter((c) => c.icon !== "brain");

  return (
    <section id="skills" className="relative overflow-hidden px-4 py-14">
      <div className="aurora-blob aurora-blob-1" />
      <div className="aurora-blob aurora-blob-2" />

      <div className="relative mx-auto max-w-[88rem]">
        <SectionHeading
          eyebrow="My Arsenal"
          title="Technical"
          highlight="Skills"
          subtitle="A full-spectrum engineering toolkit — from languages and frameworks to AI agents, cloud platforms, and payment gateways."
          align="center"
        />

        {/* Skills grid (AI Tools excluded — featured below) */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((cat, i) => {
            const Icon = iconMap[cat.icon] || Code;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: (i % 3) * 0.08, duration: 0.6 }}
              >
                <TiltCard intensity={8} className="h-full">
                  <div className="glass-card group relative h-full overflow-hidden rounded-3xl p-6 transition-all hover:shadow-xl hover:shadow-violet-500/10">
                    <div
                      className={cn(
                        "absolute -top-14 -right-14 h-36 w-36 rounded-full bg-gradient-to-br opacity-15 blur-3xl transition-opacity group-hover:opacity-35",
                        cat.gradient
                      )}
                    />
                    <div className="relative">
                      <div className="mb-4 flex items-center gap-3">
                        <div
                          className={cn(
                            "flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6",
                            cat.gradient
                          )}
                        >
                          <Icon size={20} />
                        </div>
                        <div>
                          <h3 className="font-display text-base font-extrabold text-main">
                            {cat.title}
                          </h3>
                          {cat.blurb && (
                            <p className="text-[11px] text-fuchsia-500 dark:text-fuchsia-400">
                              {cat.blurb}
                            </p>
                          )}
                        </div>
                        <span className="ml-auto font-mono text-[10px] text-faint">
                          {String(cat.skills.length).padStart(2, "0")}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {cat.skills.map((skill, si) => (
                          <motion.span
                            key={skill}
                            initial={{ opacity: 0, scale: 0.7 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + si * 0.05 }}
                            whileHover={{ scale: 1.08, y: -2 }}
                            className="skill-chip cursor-default rounded-lg border border-line bg-chip px-2.5 py-1.5 font-mono text-[11px] font-medium text-muted transition-colors hover:border-violet-400/50 hover:text-main"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

        {/* Featured AI Tools card */}
        <Reveal delay={0.15} className="mt-10">
          {aiTools && <AiToolsCard skills={aiTools.skills} />}
        </Reveal>

        {/* Dual marquee */}
        <div className="mt-12 space-y-3">
          <div className="overflow-hidden border-y border-line bg-chip/50 py-3 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="marquee-track flex w-max gap-6">
              {[...marqueeSkills, ...marqueeSkills].map((s, i) => (
                <span
                  key={`f-${i}`}
                  className="font-display shrink-0 text-lg font-extrabold text-faint uppercase transition-colors hover:text-main"
                >
                  {s} <span className="gradient-text">✦</span>
                </span>
              ))}
            </div>
          </div>
          <div className="overflow-hidden border-y border-line bg-chip/50 py-3 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="marquee-track-reverse flex w-max gap-6">
              {[...marqueeSkills, ...marqueeSkills].map((s, i) => (
                <span
                  key={`r-${i}`}
                  className="font-display shrink-0 text-lg font-extrabold text-faint uppercase transition-colors hover:text-main"
                >
                  {s} <span className="gradient-text">✦</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="mt-16">
          <Reveal>
            <div className="mb-12 text-center">
              <div className="mb-4 flex items-center justify-center gap-3">
                <span className="h-px w-12 bg-gradient-to-r from-transparent to-amber-400" />
                <span className="font-mono text-xs tracking-[0.35em] text-amber-500 uppercase dark:text-amber-300">
                  Hall of Fame
                </span>
                <span className="h-px w-12 bg-gradient-to-l from-transparent to-amber-400" />
              </div>
              <h3 className="font-display text-3xl font-extrabold text-main md:text-5xl">
                Achievements & <span className="gradient-text heading-glow">Certifications</span>
              </h3>
              <p className="mx-auto mt-4 max-w-xl text-muted">
                Recognition, wins, and milestones earned on the journey so far.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {achievements.map((a, i) => {
              const Icon = achievementIcons[a.icon] || Trophy;
              return (
                <motion.div
                  key={a.title}
                  initial={{ opacity: 0, y: 40, rotate: i % 2 === 0 ? -2 : 2 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: (i % 3) * 0.1, duration: 0.6 }}
                  whileHover={{ y: -8, rotate: 0 }}
                  className="card-shine gradient-border group relative overflow-hidden rounded-3xl p-6"
                >
                  <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-gradient-to-br from-amber-400/15 to-pink-500/15 blur-2xl" />

                  <div className="relative flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-pink-500 text-white shadow-lg shadow-amber-500/25 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                      <Icon size={26} />
                    </div>
                    <span className="rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 font-mono text-[11px] font-bold text-amber-600 dark:text-amber-300">
                      {a.year}
                    </span>
                  </div>

                  <div className="relative mt-5">
                    <h4 className="font-display text-lg font-extrabold text-main">{a.title}</h4>
                    <p className="mt-0.5 text-sm font-bold gradient-text">{a.rank}</p>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted">{a.description}</p>
                  </div>

                  <div className="absolute right-5 bottom-4 flex items-center gap-1 text-[10px] font-bold tracking-widest text-faint uppercase transition-colors group-hover:text-amber-500">
                    <Zap size={10} /> Achievement
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
