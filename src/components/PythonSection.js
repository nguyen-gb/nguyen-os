"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import SectionWrapper from "./SectionWrapper";
import { pythonSystems } from "@/data/projects";

/* ── Animated Metric Counter ── */
function MetricValue({ value, inView }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
      className="text-sm font-bold text-cyber-pink tracking-wider"
    >
      {value}
    </motion.span>
  );
}

/* ── System Architecture Card ── */
function SystemCard({ system, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <div className="cyber-card rounded-lg overflow-hidden h-full">
        {/* Top bar with icon and status */}
        <div className="relative h-40 bg-gradient-to-br from-cyber-dark via-cyber-surface to-cyber-surface-2 flex items-center justify-center overflow-hidden">
          {/* Grid pattern */}
          <div className="absolute inset-0 grid-bg opacity-50" />

          {/* Animated schematic lines */}
          <svg
            className="absolute inset-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.line
              x1="10%"
              y1="20%"
              x2="90%"
              y2="20%"
              stroke="rgba(234,59,146,0.1)"
              strokeWidth="1"
              strokeDasharray="4 8"
              animate={{ strokeDashoffset: [0, -24] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <motion.line
              x1="10%"
              y1="50%"
              x2="90%"
              y2="50%"
              stroke="rgba(0,240,255,0.08)"
              strokeWidth="1"
              strokeDasharray="4 8"
              animate={{ strokeDashoffset: [0, 24] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            <motion.line
              x1="10%"
              y1="80%"
              x2="90%"
              y2="80%"
              stroke="rgba(234,59,146,0.06)"
              strokeWidth="1"
              strokeDasharray="4 8"
              animate={{ strokeDashoffset: [0, -24] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            />
            {/* Vertical lines */}
            <motion.line
              x1="30%"
              y1="10%"
              x2="30%"
              y2="90%"
              stroke="rgba(234,59,146,0.05)"
              strokeWidth="1"
              strokeDasharray="2 6"
              animate={{ strokeDashoffset: [0, -16] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <motion.line
              x1="70%"
              y1="10%"
              x2="70%"
              y2="90%"
              stroke="rgba(0,240,255,0.05)"
              strokeWidth="1"
              strokeDasharray="2 6"
              animate={{ strokeDashoffset: [0, 16] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
          </svg>

          {/* Center icon */}
          <motion.div
            animate={{
              scale: isHovered ? 1.2 : 1,
              rotate: isHovered ? 5 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="relative z-10 text-5xl"
          >
            {system.icon}
          </motion.div>

          {/* Glow pulse on hover */}
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 bg-gradient-to-br from-cyber-pink/5 to-transparent pointer-events-none"
            />
          )}

          {/* Corner HUDs */}
          <div className="absolute top-3 left-3">
            <div className="w-3 h-3 border-l border-t border-cyber-pink/40" />
          </div>
          <div className="absolute bottom-3 right-3">
            <div className="w-3 h-3 border-r border-b border-cyber-pink/40" />
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-base font-bold text-white group-hover:text-cyber-pink transition-colors font-['Orbitron'] tracking-wide mb-1">
            {system.title}
          </h3>
          <p className="text-[0.65rem] text-cyber-cyan tracking-[0.15em] uppercase mb-3">
            {system.subtitle}
          </p>
          <p className="text-xs text-cyber-text-dim leading-relaxed mb-4">
            {system.description}
          </p>

          {/* Metrics grid */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {system.metrics.map((m) => (
              <div
                key={m.label}
                className="bg-cyber-dark/60 border border-cyber-border px-2 py-2 text-center"
              >
                <div className="text-[0.5rem] text-cyber-text-dim tracking-[0.15em] uppercase mb-1">
                  {m.label}
                </div>
                <MetricValue value={m.value} inView={isInView} />
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="space-y-1 mb-4">
            {system.features.map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-[0.65rem] text-cyber-text-dim"
              >
                <span className="w-1 h-1 bg-cyber-cyan rounded-full" />
                {f}
              </div>
            ))}
          </div>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5">
            {system.tech.map((t) => (
              <span
                key={t}
                className="text-[0.6rem] px-2 py-0.5 bg-cyber-pink/5 border border-cyber-pink/20 text-cyber-pink/70 tracking-wider uppercase font-mono rounded-sm"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function PythonSection() {
  return (
    <SectionWrapper
      id="python"
      moduleIndex={4}
      moduleLabel="BACKEND ENGINE & AI CORE"
      title="PYTHON SYSTEMS"
      subtitle="Heavy-duty concurrent backend systems and production-ready AI pipelines."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pythonSystems.map((system, i) => (
          <SystemCard key={system.id} system={system} index={i} />
        ))}
      </div>

      {/* Architecture summary bar */}
      <div className="mt-10 p-4 border border-cyber-border bg-cyber-surface/30">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-cyber-pink rounded-full animate-pulse" />
            <span className="text-[0.6rem] text-cyber-text-dim tracking-[0.2em] font-mono uppercase">
              ENGINE STATUS: ALL SYSTEMS OPERATIONAL
            </span>
          </div>
          <div className="flex-1 h-px bg-cyber-border" />
          <div className="flex gap-4">
            {["FastAPI", "Python", "AI/ML", "Docker"].map((t) => (
              <span
                key={t}
                className="text-[0.55rem] text-cyber-cyan/60 tracking-wider uppercase font-mono"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
