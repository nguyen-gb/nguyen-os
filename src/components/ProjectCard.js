"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ProjectCard({ project, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const hasMultipleLinks = project.links && project.links.length > 0;
  const primaryUrl = project.url || (project.links && project.links[0]?.url);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <div className="cyber-card rounded-lg overflow-hidden h-full flex flex-col">
        {/* Image Container */}
        <div className="relative aspect-video overflow-hidden bg-cyber-dark">
          {/* Glowing border effect */}
          <motion.div
            className="absolute inset-0 z-10 pointer-events-none rounded-t-lg"
            animate={{
              boxShadow: isHovered
                ? "inset 0 0 30px rgba(234,59,146,0.3), 0 0 15px rgba(234,59,146,0.2)"
                : "inset 0 0 0px transparent",
            }}
            transition={{ duration: 0.3 }}
            style={{
              border: "1px solid",
              borderColor: isHovered
                ? "rgba(234,59,146,0.6)"
                : "rgba(26,26,46,1)",
            }}
          />

          {/* Image */}
          <motion.div
            className="relative w-full h-full"
            animate={{
              scale: isHovered ? 1.05 : 1,
              filter: isHovered
                ? "grayscale(0%) brightness(1.1)"
                : "grayscale(30%) brightness(0.7)",
            }}
            transition={{ duration: 0.4 }}
          >
            {!imageError ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onError={() => setImageError(true)}
              />
            ) : (
              /* Placeholder when no image */
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyber-dark to-cyber-surface">
                <div className="text-center">
                  <div className="text-3xl mb-2 opacity-30">
                    {project.icon || "🖥️"}
                  </div>
                  <div className="text-[0.6rem] tracking-[0.2em] text-cyber-text-dim uppercase font-mono">
                    PREVIEW UNAVAILABLE
                  </div>
                  <div className="text-[0.5rem] text-cyber-pink/40 mt-1 font-mono">
                    Place image at: {project.image}
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Neon overlay on hover */}
          <motion.div
            className="absolute inset-0 z-20 pointer-events-none"
            animate={{
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-cyber-pink/10 via-transparent to-cyber-cyan/5" />
          </motion.div>

          {/* Scan line effect */}
          {isHovered && (
            <motion.div
              className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyber-pink/60 to-transparent z-30 pointer-events-none"
              initial={{ top: "0%" }}
              animate={{ top: "100%" }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          )}

          {/* Status tag */}
          <div className="absolute top-3 right-3 z-30">
            <span
              className={`status-tag ${
                project.status === "live"
                  ? "live border-cyber-success/50 text-cyber-success bg-cyber-success/10"
                  : "scanning border-cyber-pink/50 text-cyber-pink bg-cyber-pink/10"
              }`}
            >
              {project.status === "live" ? "LIVE PREVIEW" : "SCANNING..."}
            </span>
          </div>

          {/* Corner HUD decorations */}
          <div className="absolute top-3 left-3 z-30">
            <div className="w-4 h-4 border-l-2 border-t-2 border-cyber-pink/40" />
          </div>
          <div className="absolute bottom-3 right-3 z-30">
            <div className="w-4 h-4 border-r-2 border-b-2 border-cyber-pink/40" />
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          {/* Title row */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h3 className="text-base font-bold text-white group-hover:text-cyber-pink transition-colors font-['Orbitron'] tracking-wide">
                {project.title}
              </h3>
              <p className="text-[0.65rem] text-cyber-cyan tracking-[0.15em] uppercase mt-0.5">
                {project.subtitle}
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-cyber-text-dim leading-relaxed mb-4 flex-1">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-[0.6rem] px-2 py-0.5 bg-cyber-pink/5 border border-cyber-pink/20 text-cyber-pink/70 tracking-wider uppercase font-mono rounded-sm"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Features (if any) */}
          {project.features && (
            <div className="mb-4 space-y-1">
              {project.features.map((f, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-[0.65rem] text-cyber-text-dim"
                >
                  <span className="w-1 h-1 bg-cyber-pink rounded-full" />
                  {f}
                </div>
              ))}
            </div>
          )}

          {/* Action links */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {hasMultipleLinks ? (
              project.links.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[0.65rem] tracking-wider uppercase font-mono text-cyber-pink hover:text-white border border-cyber-pink/30 hover:border-cyber-pink hover:bg-cyber-pink/10 px-3 py-1.5 transition-all duration-300 rounded-sm"
                >
                  <span className="w-1.5 h-1.5 bg-cyber-pink rounded-full" />
                  {link.label}
                </a>
              ))
            ) : primaryUrl ? (
              <a
                href={primaryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[0.65rem] tracking-wider uppercase font-mono text-cyber-pink hover:text-white border border-cyber-pink/30 hover:border-cyber-pink hover:bg-cyber-pink/10 px-3 py-1.5 transition-all duration-300 rounded-sm"
              >
                <span className="w-1.5 h-1.5 bg-cyber-pink rounded-full" />
                VIEW LIVE
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
