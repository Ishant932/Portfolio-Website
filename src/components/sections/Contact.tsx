"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { personalInfo } from "@/data/portfolio";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  Loader2,
  CheckCircle,
  Link2,
  Code2,
  ArrowUpRight,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const channels = [
  {
    icon: Phone,
    label: "Phone",
    value: personalInfo.phone,
    sub: "Call or WhatsApp anytime",
    href: `tel:${personalInfo.phoneRaw}`,
    gradient: "from-emerald-400 to-teal-600",
    external: false,
  },
  {
    icon: Mail,
    label: "Email",
    value: personalInfo.email,
    sub: "Replies within 24 hours",
    href: `mailto:${personalInfo.email}`,
    gradient: "from-amber-400 to-orange-600",
    external: false,
  },
  {
    icon: Link2,
    label: "LinkedIn",
    value: "in/ishant-goyal-740b31290",
    sub: "Let's connect professionally",
    href: personalInfo.links.linkedin,
    gradient: "from-sky-400 to-blue-600",
    external: true,
  },
  {
    icon: Code2,
    label: "LeetCode",
    value: "@Ishant__goyal",
    sub: "300+ DSA problems solved",
    href: personalInfo.links.leetcode,
    gradient: "from-amber-500 to-yellow-600",
    external: true,
  },
];

/* Themed but colorful gradients keep brand hues on both themes */

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [sentNote, setSentNote] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setSentNote("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        if (data.handoff && data.mailto) {
          // Automation not configured yet — open the visitor's own email + WhatsApp,
          // prefilled, so the message still lands in Ishant's inbox & WhatsApp.
          window.open(data.mailto, "_blank");
          if (data.whatsapp) window.open(data.whatsapp, "_blank");
          setSentNote(
            "Your email & WhatsApp opened with the message pre-filled — just hit send so it reaches Ishant instantly."
          );
        } else {
          setSentNote("Your message was delivered to Ishant's inbox.");
        }
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => {
          setStatus("idle");
          setSentNote("");
        }, 7000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section ref={ref} id="contact" className="relative overflow-hidden px-4 py-14">
      <div className="absolute inset-0">
        <div className="absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-pink-600/12 blur-[150px]" />
        <div className="absolute top-0 left-0 h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-[88rem]">
        <SectionHeading
          eyebrow="Connect"
          title="Let's Build Something"
          highlight="Extraordinary"
          subtitle="Open to internships, freelance projects, and full-time roles in full-stack development, AI engineering, and software development."
          align="center"
        />

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left: channels */}
          <div>
            <Reveal>
              <p className="mb-6 font-mono text-sm tracking-[0.25em] text-faint uppercase">
                // Reach me directly
              </p>
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-2">
              {channels.map(({ icon: Icon, label, value, sub, href, gradient, external }, i) => (
                <Reveal key={label} delay={i * 0.08}>
                  <motion.a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    whileHover={{ y: -6 }}
                    data-cursor                      className="glass-card group relative block overflow-hidden rounded-2xl p-5 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-500/10"
                  >
                    <div
                      className={`absolute -top-10 -right-10 h-24 w-24 rounded-full bg-gradient-to-br ${gradient} opacity-15 blur-2xl transition-opacity group-hover:opacity-35`}
                    />
                    <div className="relative flex items-start justify-between">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg transition-transform group-hover:scale-110`}
                      >
                        <Icon size={20} />
                      </div>
                      <ArrowUpRight
                        size={16}
                        className="text-faint transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-main"
                      />
                    </div>
                    <p className="relative mt-4 text-[11px] font-bold tracking-[0.2em] text-faint uppercase">
                      {label}
                    </p>
                    <p className="relative break-words text-sm font-bold text-main">{value}</p>
                    <p className="relative mt-0.5 text-xs text-muted">{sub}</p>
                  </motion.a>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.3}>
              <div className="mt-4 flex items-center gap-2 text-sm text-muted">
                <MapPin size={15} className="text-emerald-theme" />
                {personalInfo.location}
              </div>

              <a
                href={personalInfo.links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor
                className="btn-shine mt-6 flex w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#128C7E] px-6 py-4 font-bold text-white shadow-lg shadow-emerald-500/25 transition-transform hover:scale-[1.02]"
              >
                <MessageCircle size={20} />
                Chat on WhatsApp
              </a>
            </Reveal>
          </div>

          {/* Right: form */}
          <Reveal delay={0.15}>
            <form
              onSubmit={handleSubmit}
              className="gradient-border relative space-y-5 rounded-3xl p-8"
            >
              <div>
                <label className="mb-2 block text-sm font-semibold text-muted">Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl border border-line bg-chip px-4 py-3.5 text-main placeholder-faint outline-none transition-colors focus:border-violet-400/60"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-muted">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-xl border border-line bg-chip px-4 py-3.5 text-main placeholder-faint outline-none transition-colors focus:border-violet-400/60"
                  placeholder="you@email.com"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-muted">Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full resize-none rounded-xl border border-line bg-chip px-4 py-3.5 text-main placeholder-faint outline-none transition-colors focus:border-violet-400/60"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                data-cursor
                className="btn-gradient btn-shine flex w-full items-center justify-center gap-2 rounded-xl py-4 font-bold disabled:opacity-60"
              >
                {status === "loading" ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : status === "success" ? (
                  <>
                    <CheckCircle size={20} /> Message Sent!
                  </>
                ) : (
                  <>
                    <Send size={20} /> Send Message
                  </>
                )}
              </button>

              {status === "error" && (
                <p className="text-center text-sm text-red-400">
                  Something went wrong. Please email me directly at {personalInfo.email}.
                </p>
              )}
              {status === "success" && sentNote && (
                <p className="text-center text-sm text-emerald-600 dark:text-emerald-400">
                  {sentNote}
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
