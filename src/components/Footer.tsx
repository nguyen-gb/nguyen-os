"use client";

import { personalInfo } from "@/data/projects";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-cyber-border bg-cyber-dark/80">
      {/* Neon top border */}
      <div className="neon-divider" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* System info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 relative">
                <div className="absolute inset-0 border border-cyber-pink/60 rotate-45" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-1 h-1 bg-cyber-pink rounded-full" />
                </div>
              </div>
              <span className="text-xs font-['Orbitron'] font-bold text-white tracking-[0.15em]">
                {personalInfo.systemVersion}
              </span>
            </div>
            <p className="text-[0.65rem] text-cyber-text-dim leading-relaxed font-mono">
              Fullstack Software Engineer specializing in
              <br />
              FastAPI (Python) &amp; React/Next.js.
              <br />
              Building the future, one commit at a time.
            </p>
          </div>

          {/* Quick nav */}
          <div>
            <h3 className="text-[0.6rem] text-cyber-pink tracking-[0.2em] uppercase font-mono mb-4">
              SYSTEM MODULES
            </h3>
            <div className="grid grid-cols-2 gap-1">
              {[
                { id: "landing", label: "Landing Pages" },
                { id: "wordpress", label: "WordPress" },
                { id: "react", label: "React Projects" },
                { id: "python", label: "Python Systems" },
                { id: "automation", label: "Automation" },
                { id: "terminal", label: "Terminal" },
              ].map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className="text-[0.6rem] text-cyber-text-dim hover:text-cyber-pink transition-colors font-mono py-1 tracking-wider"
                >
                  → {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Uplink / Contact */}
          <div>
            <h3 className="text-[0.6rem] text-cyber-pink tracking-[0.2em] uppercase font-mono mb-4">
              UPLINK CHANNELS
            </h3>
            <div className="space-y-2 flex flex-col">
              <a
                href="https://github.com/nguyen-gb"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[0.65rem] text-cyber-text-dim hover:text-cyber-cyan transition-colors font-mono"
              >
                <span className="w-1.5 h-1.5 bg-cyber-cyan/60 rounded-full animate-pulse" />
                GitHub: github.com/nguyen-gb
              </a>
              <a
                href="mailto:vannguyen.tran.164@gmail.com"
                className="flex items-center gap-2 text-[0.65rem] text-cyber-text-dim hover:text-cyber-cyan transition-colors font-mono"
              >
                <span className="w-1.5 h-1.5 bg-cyber-cyan/60 rounded-full animate-pulse" />
                Email: vannguyen.tran.164@gmail.com
              </a>
              <a
                href="tel:0395162022"
                className="flex items-center gap-2 text-[0.65rem] text-cyber-text-dim hover:text-cyber-cyan transition-colors font-mono"
              >
                <span className="w-1.5 h-1.5 bg-cyber-cyan/60 rounded-full animate-pulse" />
                Tel/Zalo/WA/TG: 0395162022
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-cyber-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[0.55rem] text-cyber-text-dim tracking-[0.15em] font-mono">
            © {currentYear} {personalInfo.name} — ALL RIGHTS RESERVED
          </div>
          <div className="flex items-center gap-3 text-[0.5rem] text-cyber-text-dim font-mono tracking-wider">
            <span className="flex items-center gap-1">
              <span className="w-1 h-1 bg-cyber-success rounded-full" />
              ALL SYSTEMS OPERATIONAL
            </span>
            <span className="text-cyber-border">|</span>
            <span>BUILT WITH NEXT.JS + TAILWIND CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
