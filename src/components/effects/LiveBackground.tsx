"use client";

import { useEffect, useRef } from "react";

type P = { x: number; y: number; vx: number; vy: number; r: number; hue: number };
type Star = { x: number; y: number; vx: number; vy: number; life: number };

export default function LiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let particles: P[] = [];
    let stars: Star[] = [];
    const mouse = { x: -9999, y: -9999, active: false };
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const palettes = [
      [124, 58, 237], // violet
      [6, 182, 212], // cyan
      [236, 72, 153], // pink
      [245, 158, 11], // amber
      [16, 185, 129], // emerald
    ];

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(90, Math.max(30, Math.floor((w * h) / 18000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.9 + 0.8,
        hue: Math.floor(Math.random() * palettes.length),
      }));
    };

    const spawnStar = (w: number, h: number) => {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h * 0.4,
        vx: (Math.random() * 3 + 5) * (Math.random() > 0.5 ? 1 : -1),
        vy: Math.random() * 2 + 3.5,
        life: 0,
      });
    };

    const step = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      // shooting stars — visible streaks across every section (rarer on small screens)
      const small = w < 768;
      if (Math.random() < (small ? 0.006 : 0.012) || stars.length === 0) spawnStar(w, h);
      stars = stars.filter((s) => s.life < 1);
      for (const s of stars) {
        s.life += 0.02;
        s.x += s.vx;
        s.y += s.vy;
        const grad = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * 10, s.y - s.vy * 10);
        grad.addColorStop(0, `rgba(255,255,255,${0.85 * (1 - s.life)})`);
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * 10, s.y - s.vy * 10);
        ctx.stroke();
      }

      for (const p of particles) {
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 130 * 130 && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const force = ((130 - d) / 130) * 0.6;
            p.vx += (dx / d) * force * 0.18;
            p.vy += (dy / d) * force * 0.18;
          }
        }

        p.vx *= 0.985;
        p.vy *= 0.985;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;

        const [cr, cg, cb] = palettes[p.hue];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cr},${cg},${cb},0.7)`;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 140 * 140) {
            const alpha = (1 - Math.sqrt(d2) / 140) * 0.24;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(139,92,246,${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(step);
    };

    const onMouse = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
    };
    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) step();
    };

    resize();
    step();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* slowly rotating conic aurora — vivid color wash */}
      <div className="aurora-conic absolute inset-0" />
      {/* aurora wash sweeping across the whole site */}
      <div className="aurora-wash absolute inset-0" />
      {/* third layer: slow drifting grid + twinkling starfield */}
      <div className="bg-grid-drift absolute inset-0 opacity-50" />
      <div className="bg-stars absolute inset-0" />
      {/* floating geometric shapes — extra life in every section */}
      <div className="float-shape absolute top-[18%] left-[8%] h-8 w-8 rotate-12 rounded-lg bg-gradient-to-br from-amber-400/50 to-pink-500/40 blur-[1px]" />
      <div
        className="float-shape absolute top-[55%] right-[10%] h-6 w-6 rounded-full border-2 border-violet-400/50"
        style={{ animationDelay: "-4s", animationDuration: "14s" }}
      />
      <div
        className="float-shape absolute top-[30%] right-[28%] h-5 w-5 rotate-45 bg-gradient-to-br from-cyan-400/50 to-sky-500/40"
        style={{ animationDelay: "-8s", animationDuration: "17s" }}
      />
      <div
        className="float-shape absolute bottom-[22%] left-[16%] h-4 w-4 rounded-full bg-gradient-to-br from-emerald-400/50 to-teal-500/40"
        style={{ animationDelay: "-12s", animationDuration: "13s" }}
      />
      <div
        className="float-shape absolute top-[70%] left-[45%] h-7 w-7 rotate-12 border-2 border-fuchsia-400/40"
        style={{ animationDelay: "-16s", animationDuration: "19s" }}
      />
      {/* drifting gradient orbs — crisp and colorful so they read clearly */}
      <div className="float-orb absolute -top-24 -left-24 h-[440px] w-[440px] rounded-full bg-gradient-to-br from-amber-400/45 via-pink-500/30 to-transparent blur-[80px]" />
      <div
        className="float-orb-slow absolute top-1/3 -right-32 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-violet-500/45 via-purple-500/25 to-transparent blur-[90px]"
        style={{ animationDelay: "-4s" }}
      />
      <div
        className="float-orb absolute bottom-1/4 -left-28 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-cyan-400/40 via-sky-500/25 to-transparent blur-[80px]"
        style={{ animationDelay: "-8s" }}
      />
      <div
        className="float-orb-slow absolute top-1/2 left-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-pink-500/30 via-fuchsia-500/20 to-transparent blur-[100px]"
        style={{ animationDelay: "-12s" }}
      />
      <div
        className="float-orb absolute -right-20 bottom-0 h-[380px] w-[380px] rounded-full bg-gradient-to-br from-emerald-400/30 via-teal-500/20 to-transparent blur-[80px]"
        style={{ animationDelay: "-16s" }}
      />
      <div
        className="float-orb-slow absolute top-10 left-1/3 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-rose-400/30 via-red-500/15 to-transparent blur-[70px]"
        style={{ animationDelay: "-20s" }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 opacity-90" />
    </div>
  );
}
