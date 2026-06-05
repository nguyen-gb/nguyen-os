"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";
import { personalInfo } from "@/data/projects";

interface OrbitRingProps {
  size: string;
  duration: number;
  color: string;
  delay?: number;
}

interface StatBlockProps {
  label: string;
  value: string;
  icon: string;
  delay: number;
}

interface ParticlePosition {
  left: number;
  top: number;
  duration: number;
  delay: number;
  size: number;
}

/* ── Matrix Rain Background ── */
function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const chars = "01アイウエオカキクケコNGUYEN<>/{}[]".split("");
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(5, 5, 10, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Alternate between pink and cyan for variety
        if (Math.random() > 0.5) {
          ctx.fillStyle = `rgba(234, 59, 146, ${Math.random() * 0.15 + 0.03})`;
        } else {
          ctx.fillStyle = `rgba(0, 240, 255, ${Math.random() * 0.1 + 0.02})`;
        }
        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 opacity-60"
      style={{ pointerEvents: "none" }}
    />
  );
}

/* ── Boot Sequence Lines ── */
const bootLines = [
  { text: "INITIALIZING NGUYEN-OS v3.2.1...", delay: 0 },
  { text: "LOADING NEURAL INTERFACE...", delay: 0.3 },
  { text: "CONNECTING TO MAINFRAME...", delay: 0.6 },
  { text: "BACKEND ENGINE: FastAPI ██████████ [OK]", delay: 0.9 },
  { text: "FRONTEND CORE: React/Next.js ████ [OK]", delay: 1.2 },
  { text: "AI MODULES: ONLINE", delay: 1.5 },
  { text: "SYSTEM STATUS: FULLY OPERATIONAL", delay: 1.8 },
];

/* ── Orbiting Ring (pure CSS animated) ── */
function OrbitRing({ size, duration, color, delay = 0 }: OrbitRingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay }}
      className="absolute rounded-full border"
      style={{
        width: size,
        height: size,
        borderColor: color,
        animation: `spin ${duration}s linear infinite`,
      }}
    />
  );
}

/* ── Stat Block ── */
function StatBlock({ label, value, icon, delay }: StatBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="flex items-center gap-3 bg-cyber-surface/50 border border-cyber-border px-4 py-2.5 backdrop-blur-sm"
    >
      <span className="text-lg">{icon}</span>
      <div>
        <div className="text-[0.55rem] text-cyber-text-dim tracking-[0.2em] uppercase">
          {label}
        </div>
        <div className="text-xs text-cyber-pink font-bold tracking-wider">
          {value}
        </div>
      </div>
    </motion.div>
  );
}

/* ── HERO SECTION ── */
export default function HeroSection() {
  const [bootComplete, setBootComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [particlePositions, setParticlePositions] = useState<ParticlePosition[]>([]);

  // Generate particle positions only on mount (client-side)
  useEffect(() => {
    const timer = setTimeout(() => {
      const positions = Array.from({ length: 20 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 2,
        size: Math.random() * 3 + 1,
      }));
      setParticlePositions(positions);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer1 = setTimeout(() => setBootComplete(true), 2500);
    const timer2 = setTimeout(() => setShowContent(true), 2800);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const scrollToSection = useCallback(() => {
    document.getElementById("landing")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cyber-dark"
    >
      {/* Matrix rain */}
      <MatrixRain />

      {/* Radial glow center */}
      <div className="absolute inset-0 z-[1]">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(234,59,146,0.08) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(0,240,255,0.04) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-[2]">
        {particlePositions.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-cyber-pink/30"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        {/* Boot sequence */}
        <motion.div
          animate={{ opacity: bootComplete ? 0 : 1, y: bootComplete ? -20 : 0 }}
          transition={{ duration: 0.5 }}
          className={`${bootComplete ? "pointer-events-none absolute inset-0 flex items-center justify-center" : ""}`}
        >
          {!showContent && (
            <div className="font-mono text-left max-w-lg mx-auto">
              {bootLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: line.delay }}
                  className="text-[0.65rem] text-cyber-text-dim mb-1"
                >
                  <span className="text-cyber-pink mr-2">&gt;</span>
                  {line.text}
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Main hero content */}
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Orbiting rings behind title */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <OrbitRing
                size="300px"
                duration={20}
                color="rgba(234,59,146,0.1)"
                delay={0}
              />
              <OrbitRing
                size="450px"
                duration={30}
                color="rgba(0,240,255,0.06)"
                delay={0.2}
              />
              <OrbitRing
                size="600px"
                duration={40}
                color="rgba(234,59,146,0.04)"
                delay={0.4}
              />
            </div>

            {/* System status tag */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-cyber-pink/5 border border-cyber-pink/30 px-4 py-1.5 mb-8"
            >
              <span className="w-2 h-2 bg-cyber-success rounded-full animate-pulse" />
              <span className="text-[0.6rem] text-cyber-text-dim tracking-[0.2em] font-mono uppercase">
                {personalInfo.systemVersion} — STATUS: {personalInfo.status}
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-5xl md:text-7xl lg:text-8xl font-['Orbitron'] font-black text-white tracking-[0.1em] mb-4"
            >
              <span className="text-glow-pink">{personalInfo.name}</span>
              <span className="text-cyber-pink">.</span>
            </motion.h1>

            {/* Role */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mb-6"
            >
              <p className="text-sm md:text-base text-cyber-cyan tracking-[0.3em] uppercase font-mono text-glow-cyan">
                {personalInfo.role}
              </p>
              <p className="text-xs text-cyber-text-dim tracking-[0.2em] mt-2 font-mono">
                {personalInfo.specialization} • {personalInfo.experience}{" "}
                Experience
              </p>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap justify-center gap-3 mb-10"
            >
              <StatBlock
                label="Stack"
                value="FULLSTACK"
                icon="⚡"
                delay={0.9}
              />
              <StatBlock
                label="Backend"
                value="FASTAPI"
                icon="🐍"
                delay={1.0}
              />
              <StatBlock
                label="Frontend"
                value="REACT"
                icon="⚛️"
                delay={1.1}
              />
              <StatBlock
                label="Location"
                value="HCM CITY"
                icon="📍"
                delay={1.2}
              />
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.button
                onClick={scrollToSection}
                whileHover={{
                  scale: 1.05,
                  boxShadow:
                    "0 0 20px rgba(234,59,146,0.4), 0 0 40px rgba(234,59,146,0.2)",
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-3 bg-cyber-pink text-white font-['Orbitron'] text-xs tracking-[0.2em] uppercase cursor-pointer overflow-hidden"
              >
                <span className="relative z-10">EXPLORE SYSTEMS</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyber-pink to-[#c2297a] opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>

              <motion.a
                href="#terminal"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border border-cyber-pink/40 text-cyber-pink font-['Orbitron'] text-xs tracking-[0.2em] uppercase hover:bg-cyber-pink/10 transition-all cursor-pointer"
              >
                OPEN TERMINAL
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Scroll indicator */}
      {showContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <span className="text-[0.5rem] text-cyber-text-dim tracking-[0.3em] uppercase font-mono">
            SCROLL DOWN
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-4 h-7 border border-cyber-pink/40 rounded-full flex justify-center pt-1"
          >
            <div className="w-1 h-1.5 bg-cyber-pink rounded-full" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
