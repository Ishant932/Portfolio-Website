"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { projects, type Project } from "@/data/portfolio";
import {
  ExternalLink,
  Code2,
  Play,
  X,
  Search,
  Volume2,
  ChevronRight,
  Layers,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import TiltCard from "@/components/ui/TiltCard";
import { cn } from "@/lib/utils";

const filters = [
  { id: "all", label: "All Projects" },
  { id: "fullstack", label: "Full Stack" },
  { id: "ai", label: "AI & Agents" },
  { id: "web", label: "Web Apps" },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesFilter = activeFilter === "all" || p.category === activeFilter;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [activeFilter, query]);

  return (
    <section id="projects" className="relative overflow-hidden px-4 py-14">
      <div className="aurora-blob aurora-blob-1" />
      <div className="aurora-blob aurora-blob-3" />

      <div className="relative mx-auto max-w-[88rem]">
        <SectionHeading
          eyebrow="Portfolio"
          title="Featured"
          highlight="Projects"
          subtitle="Seven production-grade platforms — live demos, real screenshots, and demo videos captured from each site."
        />

        {/* Controls */}
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-2.5">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                data-cursor
                className={cn(
                  "relative rounded-full px-5 py-2.5 text-sm font-semibold transition-all",
                  activeFilter === f.id
                    ? "btn-gradient btn-shine"
                    : "border border-line text-muted hover:border-violet-400/60 hover:text-main"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="relative md:w-72">
            <Search size={16} className="absolute top-1/2 left-4 -translate-y-1/2 text-faint" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-full rounded-full border border-line bg-chip py-2.5 pr-4 pl-10 text-sm text-main placeholder-faint outline-none transition-colors focus:border-violet-400/60"
            />
          </div>
        </div>

        {/* Grid */}
        <motion.div layout className="grid gap-8 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ delay: i * 0.04, duration: 0.5 }}
              >
                <TiltCard intensity={6} className="h-full">
                  <div
                    data-cursor
                    onClick={() => setSelected(project)}
                    className="glass-card group h-full cursor-pointer overflow-hidden rounded-3xl transition-colors hover:shadow-xl hover:shadow-violet-500/10"
                  >
                    {/* preview */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                      <Image
                        src={project.screenshots[0]}
                        alt={`${project.title} screenshot`}
                        fill
                        sizes="(max-width: 768px) 100vw, 600px"
                        className="object-cover object-top transition-all duration-700 group-hover:scale-105 group-hover:opacity-0"
                      />
                      <video
                        src={project.video}
                        poster={project.screenshots[0]}
                        loop
                        playsInline
                        preload="none"
                        className="absolute inset-0 h-full w-full scale-[1.02] object-cover object-top opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                        onMouseEnter={(e) => {
                          const v = e.currentTarget;
                          v.muted = false;
                          v.play().catch(() => {
                            // browsers may block sound autoplay — fall back to muted
                            v.muted = true;
                            v.play().catch(() => {});
                          });
                        }}
                        onMouseLeave={(e) => e.currentTarget.pause()}
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div
                        className={cn(
                          "absolute inset-0 bg-gradient-to-br opacity-20 mix-blend-overlay",
                          project.gradient
                        )}
                      />

                      {/* top bar */}
                      <div className="absolute top-4 right-4 left-4 flex items-center justify-between">
                        <span className="flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1 text-[10px] font-bold tracking-widest text-white/85 uppercase backdrop-blur-sm">
                          <Layers size={10} className="text-amber-400" />
                          {project.category === "ai"
                            ? "AI / Agents"
                            : project.category === "fullstack"
                              ? "Full Stack"
                              : "Web App"}
                        </span>
                        <span className="flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1 text-[10px] font-semibold text-white/75 backdrop-blur-sm">
                          <Volume2 size={10} className="text-pink-400" />
                          Sound on hover
                        </span>
                      </div>

                      {/* play button */}
                      <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                        <motion.div
                          animate={{ scale: [1, 1.15, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 backdrop-blur-md transition-all group-hover:bg-white/25"
                        >
                          <Play size={26} className="ml-1 text-white" fill="white" />
                        </motion.div>
                      </div>
                    </div>

                    {/* body */}
                    <div className="p-6">
                      <p className="font-mono text-[11px] tracking-[0.2em] text-faint uppercase">
                        {project.subtitle}
                      </p>
                      <h3 className="font-display mt-1.5 text-xl font-extrabold text-main transition-colors group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-amber-600 group-hover:to-pink-600">
                        {project.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
                        {project.description}
                      </p>

                      <div className="mt-5 flex items-center justify-between">
                        <div className="flex gap-4">
                          {project.links.live && (
                            <a
                              href={project.links.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center gap-1.5 text-sm font-semibold text-emerald-700 transition-colors hover:text-emerald-600 dark:text-emerald-400"
                            >
                              <ExternalLink size={14} /> Live
                            </a>
                          )}
                          {project.links.github && (
                            <a
                              href={project.links.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center gap-1.5 text-sm font-semibold text-muted transition-colors hover:text-main"
                            >
                              <Code2 size={14} /> Code
                            </a>
                          )}
                          {project.links.demo && (
                            <a
                              href={project.links.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center gap-1.5 text-sm font-semibold text-cyan-700 transition-colors hover:text-cyan-600 dark:text-cyan-400"
                            >
                              <ExternalLink size={14} /> Studio
                            </a>
                          )}
                        </div>
                        <span className="flex items-center gap-1 text-xs font-semibold text-faint transition-colors group-hover:text-pink-500">
                          Details <ChevronRight size={13} />
                        </span>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-4xl">🔍</p>
            <p className="mt-3 text-muted">
              No projects match &ldquo;{query}&rdquo; — try another search.
            </p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [activeShot, setActiveShot] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (showVideo && videoRef.current) {
      const v = videoRef.current;
      v.muted = false;
      v.play()
        .then(() => setSoundOn(true))
        .catch(() => {
          // sound autoplay blocked → play muted, offer one-tap sound
          v.muted = true;
          setSoundOn(false);
          v.play().catch(() => {});
        });
    }
  }, [showVideo]);

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setSoundOn(!v.muted);
    if (!v.muted) v.play().catch(() => {});
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-3xl border border-line bg-surface shadow-2xl"
      >
        <button
          onClick={onClose}
          data-cursor
          className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-colors hover:bg-white/20"
        >
          <X size={20} />
        </button>

        {/* Media area */}
        <div className="relative bg-black/40">
          {showVideo ? (
            <>
              <video
                ref={videoRef}
                src={project.video}
                poster={project.screenshots[0]}
                controls
                playsInline
                className="aspect-[16/9] w-full object-contain"
              />
              {!soundOn && (
                <button
                  onClick={toggleSound}
                  data-cursor
                  className="absolute bottom-16 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/70 px-4 py-2 text-sm font-bold text-white backdrop-blur-md transition-colors hover:bg-black/90"
                >
                  <Volume2 size={15} className="text-pink-400" /> Tap for sound
                </button>
              )}
            </>
          ) : (
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={project.screenshots[activeShot]}
                alt={`${project.title} screenshot ${activeShot + 1}`}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <button
                onClick={() => setShowVideo(true)}
                data-cursor
                className="btn-gradient btn-shine absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full px-6 py-3.5 font-bold"
              >
                <Play size={18} fill="currentColor" /> Watch Demo Video
              </button>
            </div>
          )}

          {!showVideo && (
            <div className="absolute right-0 bottom-4 left-0 flex justify-center gap-2 px-4">
              {project.screenshots.map((s, i) => (
                <button
                  key={s}
                  onClick={() => setActiveShot(i)}
                  data-cursor
                  className={cn(
                    "relative h-12 w-20 overflow-hidden rounded-lg border-2 transition-all",
                    activeShot === i
                      ? "border-pink-500 shadow-lg shadow-pink-500/30"
                      : "border-white/15 opacity-60 hover:opacity-100"
                  )}
                >
                  <Image src={s} alt="" fill sizes="80px" className="object-cover object-top" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 md:p-9">
          <p className="font-mono text-xs tracking-[0.25em] text-faint uppercase">
            {project.subtitle}
          </p>
          <h3 className="font-display mt-1 text-2xl font-extrabold text-main md:text-3xl">
            {project.title}
          </h3>
          <p className="mt-4 leading-relaxed text-muted">{project.longDescription}</p>

          <div className="mt-8">
            <h4 className="mb-4 flex items-center gap-2 font-display text-sm font-bold tracking-wider text-main uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" /> Key Features
            </h4>
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {project.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-muted">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: project.accent, boxShadow: `0 0 8px ${project.accent}` }}
                  />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <h4 className="mb-4 flex items-center gap-2 font-display text-sm font-bold tracking-wider text-main uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Explore
            </h4>
            <div className="flex flex-wrap gap-3">
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gradient btn-shine flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold"
                >
                  <ExternalLink size={16} /> Visit Live Site
                </a>
              )}
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-600/10 px-5 py-3 text-sm font-semibold text-cyan-800 transition-colors hover:bg-cyan-500/20 dark:text-cyan-300"
                >
                  <ExternalLink size={16} /> Developer Page
                </a>
              )}
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-line px-5 py-3 text-sm font-semibold text-main transition-colors hover:bg-chip"
                >
                  <Code2 size={16} /> Source Code
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
