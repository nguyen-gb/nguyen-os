"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";
import { personalInfo } from "@/data/projects";

function MatrixRain({ disabled }: { disabled: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (disabled) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let drops: number[] = [];
    const fontSize = 14;
    const chars = "01NGUYEN<>/{}[]REACTNEXTTYPESCRIPT".split("");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drops = Array(Math.floor(canvas.width / fontSize)).fill(1);
    };

    const draw = () => {
      ctx.fillStyle = "rgba(5, 5, 10, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.fillStyle =
          Math.random() > 0.5
            ? `rgba(234, 59, 146, ${Math.random() * 0.15 + 0.03})`
            : `rgba(0, 240, 255, ${Math.random() * 0.1 + 0.02})`;
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, y);

        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };

    resize();
    window.addEventListener("resize", resize);
    const interval = window.setInterval(draw, 70);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("resize", resize);
    };
  }, [disabled]);

  if (disabled) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 z-0 opacity-60 pointer-events-none"
    />
  );
}

const strengths = [
  { label: "Experience", value: personalInfo.experience },
  { label: "Focus", value: "PRODUCT FRONTEND" },
  { label: "Strength", value: "REAL-TIME UI" },
  { label: "Location", value: "HO CHI MINH CITY" },
];

export default function HeroSection() {
  const reduceMotion = useReducedMotion();

  const scrollToWork = useCallback(() => {
    document.getElementById("react")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cyber-dark px-4 py-24"
    >
      <MatrixRain disabled={Boolean(reduceMotion)} />

      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,rgba(234,59,146,0.1),transparent_52%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 z-[1] h-1/2 bg-gradient-to-t from-cyber-dark to-transparent"
      />

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="relative z-10 max-w-5xl mx-auto text-center"
      >
        <div className="inline-flex items-center gap-2 bg-cyber-pink/5 border border-cyber-pink/30 px-4 py-1.5 mb-7">
          <span className="w-2 h-2 bg-cyber-success rounded-full animate-pulse" />
          <span className="text-[0.65rem] text-cyber-text-dim tracking-[0.18em] font-mono uppercase">
            {personalInfo.systemVersion} / Frontend core online
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-['Orbitron'] font-black text-cyber-heading tracking-[0.08em] mb-5">
          <span className="text-glow-pink">{personalInfo.name}</span>
          <span className="text-cyber-pink">.</span>
        </h1>

        <p className="text-sm md:text-lg text-cyber-cyan tracking-[0.22em] uppercase font-mono text-glow-cyan">
          {personalInfo.role}
        </p>
        <p className="max-w-2xl mx-auto mt-5 text-sm md:text-base leading-7 text-cyber-text-dim">
          I build fast, responsive products and real-time AI experiences with
          React, Next.js, and TypeScript, backed by practical Python and API
          expertise.
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 mt-9 mb-10">
          {strengths.map((item, index) => (
            <motion.div
              key={item.label}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.08 }}
              className="bg-cyber-surface/60 border border-cyber-border px-3 py-3 backdrop-blur-sm"
            >
              <div className="text-[0.6rem] text-cyber-text-dim tracking-[0.16em] uppercase">
                {item.label}
              </div>
              <div className="mt-1 text-xs text-cyber-pink font-bold tracking-wider">
                {item.value}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <motion.button
            type="button"
            onClick={scrollToWork}
            whileHover={reduceMotion ? undefined : { scale: 1.04 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            className="w-full sm:w-auto px-8 py-3 bg-cyber-pink text-white font-['Orbitron'] text-xs tracking-[0.16em] uppercase cursor-pointer"
          >
            I&apos;m hiring
          </motion.button>
          <motion.a
            href={`mailto:${personalInfo.contact.email}?subject=Project%20inquiry`}
            whileHover={reduceMotion ? undefined : { scale: 1.04 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            className="w-full sm:w-auto px-8 py-3 border border-cyber-pink/50 text-cyber-pink font-['Orbitron'] text-xs tracking-[0.16em] uppercase hover:bg-cyber-pink/10 transition-colors"
          >
            I need a product
          </motion.a>
          <a
            href="#terminal"
            className="w-full sm:w-auto px-6 py-3 text-cyber-text-dim text-xs tracking-[0.14em] uppercase hover:text-cyber-cyan transition-colors"
          >
            Explore the system
          </a>
        </div>
      </motion.div>

      <a
        href="#react"
        aria-label="Scroll to featured React projects"
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-[0.6rem] text-cyber-text-dim tracking-[0.25em] uppercase hover:text-cyber-pink transition-colors"
      >
        Featured work
      </a>
    </section>
  );
}
