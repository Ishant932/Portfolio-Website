"use client";

import Image from "next/image";
import { personalInfo, navLinks } from "@/data/portfolio";
import { Code2, Link2, Mail, Phone, Heart } from "lucide-react";

// lucide removed brand icons — inline Instagram SVG
const InstagramIcon = ({ size = 14 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="shrink-0 text-pink-500"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t px-4 py-14 border-line">
      <div className="absolute bottom-0 left-1/2 h-56 w-[600px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[120px]" />

      <div className="relative mx-auto max-w-[88rem]">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Ishant Goyal logo"
                width={64}
                height={64}
                className="h-16 w-16 rounded-2xl object-cover ring-2 ring-violet-400/40"
              />
              <p className="font-display text-xl font-extrabold text-main">
                Ishant <span className="gradient-text">Goyal</span>
              </p>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Full Stack Developer · Software Developer · AI Specialist
              <br />
              Building scalable web platforms & AI-powered products from Jaipur, India.
            </p>
          </div>

          <div>
            <p className="mb-4 text-xs font-bold tracking-[0.25em] text-faint uppercase">
              Quick Links
            </p>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-sm text-muted transition-colors hover:text-amber-500"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs font-bold tracking-[0.25em] text-faint uppercase">
              Get In Touch
            </p>
            <div className="space-y-2.5">
              <a
                href={`tel:${personalInfo.phoneRaw}`}
                className="flex items-center gap-2.5 text-sm text-muted transition-colors hover:text-main"
              >
                <Phone size={14} className="text-emerald-theme" /> {personalInfo.phone}
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2.5 text-sm text-muted transition-colors hover:text-main"
              >
                <Mail size={14} className="text-amber-500" /> {personalInfo.email}
              </a>
              <a
                href={personalInfo.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-muted transition-colors hover:text-main"
              >
                <Link2 size={14} className="text-cyan-theme" /> LinkedIn
              </a>
              <a
                href={personalInfo.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-muted transition-colors hover:text-main"
              >
                <InstagramIcon /> instagram.com/ishantgoyal932
              </a>
              <a
                href={personalInfo.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-muted transition-colors hover:text-main"
              >
                <Code2 size={14} /> github.com/Ishant932
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 border-line md:flex-row">
          <p className="flex items-center gap-1.5 text-sm text-faint">
            © {new Date().getFullYear()} {personalInfo.name}. Crafted with
            <Heart size={14} className="text-pink-500" />
            and a lot of <Code2 size={14} className="text-cyan-theme" />
          </p>
          <p className="font-mono text-xs text-faint">
            Designed & engineered by <span className="gradient-text">Ishant Goyal</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
