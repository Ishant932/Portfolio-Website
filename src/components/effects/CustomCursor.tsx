"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const glow = glowRef.current;
    if (!dot || !glow) return;

    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;
    let hovering = false;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    };

    const animate = () => {
      glowX += (mouseX - glowX) * 0.12;
      glowY += (mouseY - glowY) * 0.12;
      const size = hovering ? 56 : 32;
      glow.style.width = `${size}px`;
      glow.style.height = `${size}px`;
      glow.style.transform = `translate(${glowX - size / 2}px, ${glowY - size / 2}px)`;
      requestAnimationFrame(animate);
    };

    const onEnter = () => {
      hovering = true;
      dot.style.width = "10px";
      dot.style.height = "10px";
    };

    const onLeave = () => {
      hovering = false;
      dot.style.width = "6px";
      dot.style.height = "6px";
    };

    window.addEventListener("mousemove", onMove);
    requestAnimationFrame(animate);

    const interactives = document.querySelectorAll("a, button, [data-cursor]");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      {/* soft multi-color glow follower */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed top-0 left-0 z-[9997] hidden rounded-full opacity-60 mix-blend-screen lg:block"
        style={{
          background:
            "radial-gradient(circle, rgba(236,72,153,0.35), rgba(139,92,246,0.25) 45%, transparent 70%)",
          transition: "width 0.25s ease, height 0.25s ease",
        }}
      />
      {/* small dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] hidden h-1.5 w-1.5 rounded-full bg-gradient-to-br from-amber-400 to-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.8)] lg:block"
      />
    </>
  );
}
