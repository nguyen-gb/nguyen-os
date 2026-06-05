"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface SectionWrapperProps {
  id: string;
  moduleIndex: number;
  moduleLabel: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export default function SectionWrapper({
  id,
  moduleIndex,
  moduleLabel,
  title,
  subtitle,
  children,
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id={id}
      ref={ref}
      className="relative py-20 md:py-28 px-4 md:px-8 overflow-hidden"
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Section content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Module header */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 md:mb-16"
        >
          {/* Module index tag */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[0.65rem] tracking-[0.2em] text-cyber-pink font-mono uppercase border border-cyber-pink/30 px-2 py-0.5 bg-cyber-pink/5">
              MODULE {String(moduleIndex).padStart(2, "0")}
            </span>
            <span className="text-[0.6rem] tracking-[0.3em] text-cyber-text-dim font-mono uppercase">
              {moduleLabel}
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-cyber-pink/30 to-transparent" />
          </div>

          {/* Section title */}
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-['Orbitron'] font-bold text-white tracking-wider">
            {title.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.05 * i }}
                className={
                  char !== " "
                    ? "inline-block hover:text-cyber-pink transition-colors duration-200"
                    : "inline-block w-2"
                }
              >
                {char}
              </motion.span>
            ))}
          </h2>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-3 text-sm text-cyber-text-dim font-mono tracking-wide max-w-2xl"
            >
              {"// "}{subtitle}
            </motion.p>
          )}

          {/* Neon divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 neon-divider origin-left"
          />
        </motion.div>

        {/* Children content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
