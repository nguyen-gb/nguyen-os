"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type FormEvent,
} from "react";
import { personalInfo } from "@/data/projects";

type TerminalEntry =
  | { type: "system" | "output" | "error"; lines: string[] }
  | { type: "input"; text: string };

const COMMANDS: Record<string, { output: string[] }> = {
  help: {
    output: [
      "╔══════════════════════════════════════════╗",
      "║         NGUYEN-OS COMMAND CENTER         ║",
      "╠══════════════════════════════════════════╣",
      "║  help        — Show this command list    ║",
      "║  about       — About the engineer        ║",
      "║  skills      — Technical skill matrix     ║",
      "║  contact     — Establish uplink           ║",
      "║  projects    — List active projects       ║",
      "║  status      — System diagnostics         ║",
      "║  clear       — Clear terminal buffer      ║",
      "║  whoami      — Display operator info      ║",
      "║  neofetch    — System information          ║",
      "╚══════════════════════════════════════════╝",
    ],
  },
  about: {
    output: [
      "┌─ OPERATOR PROFILE ────────────────────────",
      "│",
      "│  Name:         Nguyen",
      "│  Role:         Frontend-focused Software Engineer",
      "│  Experience:   3+ Years in Production",
      "│  Location:     Ho Chi Minh City, Vietnam",
      "│  Speciality:   React / Next.js / TypeScript",
      "│",
      "│  A frontend-focused engineer who builds",
      "│  responsive product experiences with",
      "│  React and Next.js, backed by practical",
      "│  API and full-stack delivery experience.",
      "│",
      "└────────────────────────────────────────────",
    ],
  },
  skills: {
    output: [
      "┌─ TECHNICAL SKILLS ────────────────────────",
      "│",
      "│  [ FRONTEND DEVELOPMENT ]",
      "│  ├─ React / Next.js",
      "│  ├─ React Native",
      "│  ├─ Tailwind CSS",
      "│  └─ TypeScript",
      "│",
      "│  [ BACKEND DEVELOPMENT ]",
      "│  ├─ Python / FastAPI",
      "│  ├─ REST APIs",
      "│  ├─ WebSockets",
      "│  └─ PostgreSQL",
      "│",
      "│  [ DEVOPS & INFRASTRUCTURE ]",
      "│  ├─ Docker",
      "│  ├─ Linux",
      "│  └─ CI/CD",
      "│",
      "│  [ AI INTEGRATION ]",
      "│  ├─ LangChain / RAG",
      "│  ├─ NLP / TTS / STT",
      "│  └─ Vector Databases",
      "│",
      "└────────────────────────────────────────────",
    ],
  },
  contact: {
    output: [
      "┌─ ESTABLISHING UPLINK... ──────────────────",
      "│",
      "│  ⚡ UPLINK CHANNELS ACTIVE",
      "│",
      "│  GitHub:    github.com/nguyen-gb",
      "│  Email:     vannguyen.tran.164@gmail.com",
      "│  Location:  Ho Chi Minh City, Vietnam",
      "│",
      "│  STATUS: READY FOR TRANSMISSION",
      "│  Type 'help' for more commands.",
      "│",
      "└────────────────────────────────────────────",
    ],
  },
  projects: {
    output: [
      "┌─ ACTIVE PROJECT REGISTRY ─────────────────",
      "│",
      "│  [01] Monrei Sai Gon        ● LIVE",
      "│  [02] Lusso Saigon          ● LIVE",
      "│  [03] Vinhomes Saigon Park  ● LIVE",
      "│  [04] The Win Long An       ● LIVE",
      "│  [05] Hoan My               ● LIVE",
      "│  [06] Kodo                   ● LIVE",
      "│  [07] Nhac Cu Minh Phung    ● LIVE",
      "│  [08] OnlySpeak             ● LIVE",
      "│  [09] NHCinema              ○ SHOWCASE",
      "│  [10] AI Chatbot Platform   ◈ CLASSIFIED",
      "│  [11] AI Calling System     ◈ CLASSIFIED",
      "│",
      "│  Total: 11 projects | 8 live | 1 showcase | 2 classified",
      "│",
      "└────────────────────────────────────────────",
    ],
  },
  status: {
    output: [
      "┌─ SYSTEM DIAGNOSTICS ──────────────────────",
      "│",
      "│  CORE STATUS:       ██ ONLINE",
      "│  NEURAL INTERFACE:  ██ ACTIVE",
      "│  FRONTEND CORE:     ██ ACTIVE",
      "│  RESPONSIVE UI:     ██ READY",
      "│  API INTEGRATION:   ██ ONLINE",
      "│  UPTIME:            ██ 3+ YEARS",
      "│  THREAT LEVEL:      ░░ NONE",
      "│",
      "│  ALL SYSTEMS NOMINAL.",
      "│",
      "└────────────────────────────────────────────",
    ],
  },
  whoami: {
    output: [
      `operator: ${personalInfo.name}`,
      `role: ${personalInfo.role}`,
      `clearance: LEVEL-5`,
      `session: active`,
      `system: ${personalInfo.systemVersion}`,
    ],
  },
  neofetch: {
    output: [
      "        ╔══╗           nguyen@nguyen-os",
      "       ╔╝  ╚╗          ──────────────────",
      "      ╔╝ NG ╚╗         OS:     NGUYEN-OS v3.2.1",
      "     ╔╝      ╚╗        Host:   Ho Chi Minh City",
      "    ╔╝  ████  ╚╗       Kernel: FastAPI 0.100+",
      "   ╔╝   ████   ╚╗      Shell:  React 19 / Next.js",
      "   ╚╗          ╔╝      WM:     Tailwind CSS v4",
      "    ╚╗        ╔╝       Theme:  Cyberpunk [Dark]",
      "     ╚╗      ╔╝        Focus:  Frontend Engineering",
      "      ╚╗    ╔╝         GPU:    Framer Motion",
      "       ╚╗  ╔╝          Memory: 12+ Projects",
      "        ╚══╝           Stack:  React / Next.js",
    ],
  },
};

export default function Terminal() {
  const [history, setHistory] = useState<TerminalEntry[]>([
    {
      type: "system",
      lines: [
        "╔══════════════════════════════════════════╗",
        "║     NGUYEN-OS TERMINAL v3.2.1            ║",
        "║     ESTABLISHING UPLINK...               ║",
        "║     CONNECTION SECURED.                  ║",
        "║     Type 'help' for available commands.  ║",
        "╚══════════════════════════════════════════╝",
      ],
    },
  ]);
  const [input, setInput] = useState("");
  const termRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    if (termRef.current) {
      termRef.current.scrollTop = termRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [history, scrollToBottom]);

  const handleCommand = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const cmd = input.trim().toLowerCase();
      if (!cmd) return;

      const newHistory: TerminalEntry[] = [
        ...history,
        { type: "input", text: cmd },
      ];

      if (cmd === "clear") {
        setHistory([]);
        setInput("");
        return;
      }

      const cmdResult = COMMANDS[cmd];
      if (cmdResult) {
        newHistory.push({ type: "output", lines: cmdResult.output });
      } else {
        newHistory.push({
          type: "error",
          lines: [
            `Command not found: '${cmd}'`,
            "Type 'help' to see available commands.",
          ],
        });
      }

      setHistory(newHistory);
      setInput("");
    },
    [input, history]
  );

  return (
    <section
      id="terminal"
      className="relative py-20 md:py-28 px-4 md:px-8"
    >
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[0.65rem] tracking-[0.2em] text-cyber-pink font-mono uppercase border border-cyber-pink/30 px-2 py-0.5 bg-cyber-pink/5">
              MODULE 05
            </span>
            <span className="text-[0.6rem] tracking-[0.3em] text-cyber-text-dim font-mono uppercase">
              ESTABLISHING UPLINK
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-cyber-pink/30 to-transparent" />
          </div>
          <h2 className="text-2xl md:text-4xl font-['Orbitron'] font-bold text-cyber-heading tracking-wider">
            TERMINAL
          </h2>
          <p className="mt-2 text-sm text-cyber-text-dim font-mono">
            {"// "}Interactive command interface — explore the system
          </p>
          <div className="mt-4 neon-divider" />
        </motion.div>

        {/* Terminal window */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-cyber-dark border border-cyber-border rounded-lg overflow-hidden glow-pink"
        >
          {/* Terminal header bar */}
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-cyber-border bg-cyber-surface/50">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-cyber-error/60 hover:bg-cyber-error transition-colors cursor-pointer" />
              <div className="w-3 h-3 rounded-full bg-cyber-warning/60 hover:bg-cyber-warning transition-colors cursor-pointer" />
              <div className="w-3 h-3 rounded-full bg-cyber-success/60 hover:bg-cyber-success transition-colors cursor-pointer" />
            </div>
            <span className="text-[0.6rem] text-cyber-text-dim tracking-[0.15em] font-mono ml-3">
              nguyen@nguyen-os:~
            </span>
            <div className="flex-1" />
            <span className="flex items-center gap-1.5 text-[0.55rem] text-cyber-success tracking-[0.1em] font-mono">
              <span className="w-1.5 h-1.5 bg-cyber-success rounded-full animate-pulse" />
              CONNECTED
            </span>
          </div>

          {/* Terminal body */}
          <div
            ref={termRef}
            className="p-4 h-96 overflow-y-auto font-mono text-sm cursor-text"
            onClick={() => inputRef.current?.focus()}
          >
            <AnimatePresence mode="sync">
              {history.map((entry, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15 }}
                  className="mb-2"
                >
                  {entry.type === "input" && (
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-cyber-pink font-bold">
                        nguyen@os:~$
                      </span>
                      <span className="text-cyber-heading">{entry.text}</span>
                    </div>
                  )}
                  {entry.type === "output" &&
                    entry.lines.map((line, j) => (
                      <div
                        key={j}
                        className="text-[0.7rem] text-cyber-cyan/80 leading-relaxed whitespace-pre"
                      >
                        {line}
                      </div>
                    ))}
                  {entry.type === "system" &&
                    entry.lines.map((line, j) => (
                      <div
                        key={j}
                        className="text-[0.7rem] text-cyber-pink/80 leading-relaxed whitespace-pre"
                      >
                        {line}
                      </div>
                    ))}
                  {entry.type === "error" &&
                    entry.lines.map((line, j) => (
                      <div
                        key={j}
                        className="text-[0.7rem] text-cyber-error leading-relaxed"
                      >
                        {line}
                      </div>
                    ))}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Input line */}
            <form
              onSubmit={handleCommand}
              className="flex items-center gap-2 text-xs mt-2"
            >
              <span className="text-cyber-pink font-bold shrink-0">
                nguyen@os:~$
              </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent outline-none text-cyber-heading caret-cyber-pink text-xs font-mono"
                spellCheck={false}
                autoComplete="off"
                placeholder="Type a command..."
              />
            </form>
          </div>
        </motion.div>

        {/* Quick command buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-4 flex flex-wrap gap-2"
        >
          {["help", "about", "skills", "contact", "projects", "neofetch"].map(
            (cmd) => (
              <button
                key={cmd}
                onClick={() => {
                  setInput(cmd);
                  setTimeout(() => {
                    const form = inputRef.current?.closest("form");
                    form?.requestSubmit();
                  }, 50);
                }}
                className="text-[0.6rem] px-3 py-1 border border-cyber-border text-cyber-text-dim hover:text-cyber-pink hover:border-cyber-pink/40 tracking-[0.1em] uppercase font-mono transition-all cursor-pointer"
              >
                {cmd}
              </button>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}
