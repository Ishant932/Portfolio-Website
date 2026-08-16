"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { experience } from "@/data/portfolio";
import { Briefcase, MapPin, Calendar, Building2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const workTypeConfig: Partial<
  Record<"office" | "remote" | "hybrid", { label: string; icon: typeof Building2; color: string }>
> = {
  office: { label: "Work from Office", icon: Building2, color: "#d97706" },
};

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="experience" className="relative overflow-hidden px-4 py-14">
      <div className="aurora-blob aurora-blob-2" />
      <div className="aurora-blob aurora-blob-3" />

      <div className="relative mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Career Journey"
          title="Professional"
          highlight="Experience"
          subtitle="Three internships across EdTech, industrial software, and AI-powered counselling — each one sharpened my craft."
        />

        <div className="relative">
          {/* timeline line — left rail on every screen, content fills to the right */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="absolute top-0 bottom-0 left-[13px] w-px origin-top bg-gradient-to-b from-amber-400 via-pink-500 to-cyan-400"
          />

          <div className="space-y-14">
            {experience.map((exp, i) => {
              const wt = exp.workType ? workTypeConfig[exp.workType] : null;
              const WtIcon = wt?.icon || Building2;
              return (
                <div key={exp.id} className="relative pl-12">
                  {/* node */}
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: 0.3 + i * 0.2, type: "spring", stiffness: 300 }}
                    className="absolute top-2 left-[4px] z-10 flex h-5 w-5 items-center justify-center rounded-full border-2 border-surface"
                    style={{
                      background: exp.color,
                      boxShadow: `0 0 24px ${exp.color}66, 0 0 48px ${exp.color}44`,
                    }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  </motion.span>

                  <motion.div
                    initial={{ opacity: 0, x: 50, y: 20 }}
                    animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.18, duration: 0.65 }}
                    className="w-full"
                  >
                    <div className="glass-card group relative h-full overflow-hidden rounded-3xl p-7 transition-all hover:-translate-y-1.5 hover:shadow-xl hover:shadow-violet-500/10">
                      <div
                        className="absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-10 blur-3xl transition-opacity group-hover:opacity-25"
                        style={{ backgroundColor: exp.color }}
                      />
                      <div className="relative">
                        <div className="mb-3 flex flex-wrap items-center gap-2">
                          <span
                            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold tracking-wider uppercase"
                            style={{
                              backgroundColor: `${exp.color}1f`,
                              color: exp.color,
                              border: `1px solid ${exp.color}44`,
                            }}
                          >
                            <Briefcase size={11} />
                            {exp.duration}
                          </span>
                          {wt && (
                            <span
                              className="inline-flex items-center gap-1.5 rounded-full bg-chip px-3 py-1 text-[11px] font-semibold text-muted"
                              style={{ color: wt.color }}
                            >
                              <WtIcon size={11} />
                              {wt.label}
                            </span>
                          )}
                        </div>

                        <h3 className="font-display text-xl font-extrabold text-main">
                          {exp.role}
                        </h3>
                        <p className="mt-1 text-lg font-bold" style={{ color: exp.color }}>
                          {exp.company}
                        </p>

                        <div className="mt-2 flex flex-col gap-1 font-mono text-xs text-muted">
                          <span className="flex items-center gap-1.5">
                            <Calendar size={12} /> {exp.period}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin size={12} /> {exp.location}
                          </span>
                        </div>

                        {exp.companyAbout && (
                          <p className="mt-4 rounded-xl border border-line bg-chip p-4 text-sm leading-relaxed text-muted">
                            {exp.companyAbout}
                          </p>
                        )}

                        <ul className="mt-5 space-y-3">
                          {exp.highlights.map((h) => (
                            <li key={h} className="flex gap-3 text-sm leading-relaxed text-muted">
                              <span
                                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                                style={{ backgroundColor: exp.color, boxShadow: `0 0 8px ${exp.color}` }}
                              />
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
