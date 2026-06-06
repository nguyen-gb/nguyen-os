"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import SectionWrapper from "./SectionWrapper";
import { platformAutomation, webScraping } from "@/data/projects";
import type { AutomationTool } from "@/data/projects";

type ActiveTab = "platform" | "scraping";

interface Profile {
  platform: string;
  name: string;
  status: string;
  proxy: string;
}

interface Spider {
  node: string;
  target: string;
  status: string;
  speed: string;
  proxy: string;
}

interface LogLine {
  text: string;
  type: "system" | "log";
  ts?: string;
}

type ActiveItem =
  | { type: "profile"; data: Profile }
  | { type: "spider"; data: Spider };

/* ── MOCK OPERATIONAL STATES FOR TELEMETRY ── */
const initialProfiles: Profile[] = [
  { platform: "IN", name: "insta.profile_01", status: "IDLE", proxy: "VN_4G_Viettel" },
  { platform: "IN", name: "insta.profile_02", status: "LIKING", proxy: "VN_4G_Viettel" },
  { platform: "IN", name: "insta.profile_03", status: "COMMENTING", proxy: "VN_4G_Vinaphone" },
  { platform: "IN", name: "insta.profile_04", status: "IDLE", proxy: "US_Residential" },
  { platform: "FB", name: "fb.profile_01", status: "VIEWING", proxy: "VN_4G_Mobi" },
  { platform: "FB", name: "fb.profile_02", status: "SCANNING", proxy: "VN_4G_Mobi" },
  { platform: "FB", name: "fb.profile_03", status: "LIKING", proxy: "VN_Residential" },
  { platform: "FB", name: "fb.profile_04", status: "IDLE", proxy: "SG_Residential" },
  { platform: "X", name: "x.profile_01", status: "SCANNING", proxy: "US_Residential" },
  { platform: "X", name: "x.profile_02", status: "COMMENTING", proxy: "DE_Residential" },
  { platform: "X", name: "x.profile_03", status: "IDLE", proxy: "DE_Residential" },
  { platform: "X", name: "x.profile_04", status: "REPLYING", proxy: "VN_4G_Viettel" },
  { platform: "TH", name: "threads.profile_01", status: "REPLYING", proxy: "VN_Home_IP" },
  { platform: "TH", name: "threads.profile_02", status: "IDLE", proxy: "VN_Home_IP" },
  { platform: "TH", name: "threads.profile_03", status: "COMMENTING", proxy: "VN_4G_Vinaphone" },
  { platform: "TH", name: "threads.profile_04", status: "IDLE", proxy: "VN_4G_Viettel" },
  { platform: "IN", name: "insta.profile_05", status: "LIKING", proxy: "VN_4G_Mobi" },
  { platform: "IN", name: "insta.profile_06", status: "VIEWING", proxy: "US_Residential" },
  { platform: "IN", name: "insta.profile_07", status: "IDLE", proxy: "SG_Residential" },
  { platform: "IN", name: "insta.profile_08", status: "COMMENTING", proxy: "VN_Residential" },
  { platform: "FB", name: "fb.profile_05", status: "LIKING", proxy: "VN_4G_Viettel" },
  { platform: "FB", name: "fb.profile_06", status: "VIEWING", proxy: "VN_4G_Mobi" },
  { platform: "X", name: "x.profile_05", status: "IDLE", proxy: "DE_Residential" },
  { platform: "TH", name: "threads.profile_05", status: "REPLYING", proxy: "VN_Home_IP" },
];

const initialSpiders: Spider[] = [
  { node: "Node-01", target: "shopee.vn", status: "GET 200", speed: "48 r/s", proxy: "103.45.12.8" },
  { node: "Node-02", target: "shopee.vn", status: "SAVING", speed: "45 r/s", proxy: "185.122.90.4" },
  { node: "Node-03", target: "lazada.vn", status: "GET 200", speed: "32 r/s", proxy: "14.120.45.62" },
  { node: "Node-04", target: "lazada.vn", status: "WAITING", speed: "0 r/s", proxy: "192.168.10.15" },
  { node: "Node-05", target: "batdongsan.com", status: "GET 200", speed: "12 r/s", proxy: "115.79.112.5" },
  { node: "Node-06", target: "batdongsan.com", status: "SAVING", speed: "15 r/s", proxy: "115.79.112.9" },
  { node: "Node-07", target: "amazon.com", status: "GET 200", speed: "55 r/s", proxy: "185.220.101.5" },
  { node: "Node-08", target: "amazon.com", status: "RETRYING", speed: "0 r/s", proxy: "185.220.101.9" },
  { node: "Node-09", target: "tiktok.shop", status: "GET 200", speed: "65 r/s", proxy: "103.82.20.14" },
  { node: "Node-10", target: "tiktok.shop", status: "SAVING", speed: "60 r/s", proxy: "103.82.20.15" },
  { node: "Node-11", target: "facebook.com", status: "GET 200", speed: "25 r/s", proxy: "14.120.90.10" },
  { node: "Node-12", target: "facebook.com", status: "GET 403", speed: "0 r/s", proxy: "14.120.90.12" },
  { node: "Node-13", target: "chotot.com", status: "GET 200", speed: "20 r/s", proxy: "118.69.15.22" },
  { node: "Node-14", target: "chotot.com", status: "SAVING", speed: "18 r/s", proxy: "118.69.15.24" },
  { node: "Node-15", target: "tiki.vn", status: "GET 200", speed: "30 r/s", proxy: "171.244.10.8" },
  { node: "Node-16", target: "tiki.vn", status: "GET 200", speed: "28 r/s", proxy: "171.244.10.9" },
  { node: "Node-17", target: "shopee.vn", status: "GET 200", speed: "47 r/s", proxy: "103.45.12.9" },
  { node: "Node-18", target: "lazada.vn", status: "GET 200", speed: "33 r/s", proxy: "14.120.45.63" },
  { node: "Node-19", target: "amazon.com", status: "GET 200", speed: "52 r/s", proxy: "185.220.101.6" },
  { node: "Node-20", target: "tiktok.shop", status: "GET 200", speed: "62 r/s", proxy: "103.82.20.16" },
  { node: "Node-21", target: "chotot.com", status: "GET 200", speed: "22 r/s", proxy: "118.69.15.25" },
  { node: "Node-22", target: "batdongsan.com", status: "GET 200", speed: "14 r/s", proxy: "115.79.112.6" },
  { node: "Node-23", target: "facebook.com", status: "GET 200", speed: "26 r/s", proxy: "14.120.90.11" },
  { node: "Node-24", target: "tiki.vn", status: "SAVING", speed: "29 r/s", proxy: "171.244.10.10" },
];

const platformLogs = [
  "[SYSTEM] Loading social automation helper",
  "[PROFILE] Checking saved sessions for Insta, FB, X, Threads",
  "[ORCHESTRATOR] Starting 4 browser workers",
  "[PROFILE_04] [FB] Session check complete",
  "[PROFILE_04] [FB] Opening content queue...",
  "[VIEW] [FB] Post 89273: View task completed",
  "[LIKE] [FB] Post 89273: Reaction task queued",
  "[ENGAGE] [FB] Post 89273: Suggested reply: 'Helpful breakdown, thanks.'",
  "[PROFILE_12] [INSTA] Workspace loaded with saved session",
  "[VIEW] [INSTA] Story item reviewed",
  "[COMMENT] [INSTA] Draft comment prepared for manual check",
  "[ENGAGE] [INSTA] Queued follow-up for @tech_review_vn",
  "[PROFILE_18] [X] Checking mentions",
  "[COMMENT] [X] Reply draft saved",
  "[PROFILE_21] [THREADS] Recent activity exported",
  "[SYSTEM] Batch complete. Actions reviewed: view, like, comment"
];

const scrapingLogs = [
  "[CRAWLER] Initializing website data scraper...",
  "[CONFIG] Request settings loaded for current batch",
  "[SPIDER] Target URL queue loaded",
  "[SCRAPE] HTTP GET https://shopee.vn/api/v4/item_details... proxy=185.xxx.xxx",
  "[RETRY] Rate limit detected on page 42",
  "[RETRY] Cooling down worker and switching route",
  "[RETRY] Page queued for browser-rendered capture",
  "[SCRAPE] Status: 200 OK | Payload size: 45.2 KB",
  "[PARSER] Extracted: { name: 'Asus ROG', price: 29400000, rating: 4.8 }",
  "[DATA] Cleaned product records ready for export",
  "[REVIEW] Manual check required for protected page",
  "[QUEUE] Protected page moved to review queue",
  "[QUEUE] Worker resumed with next public URL",
  "[SCRAPE] HTTP POST checkout verify - Status: 200 OK",
  "[SPIDER] Scrape speed: async batch | CPU: 34% | RAM: 2.1GB",
  "[PIPELINE] Cleaned 1,200 duplicate items | Null values imputed",
  "[EXPORT] Export job complete: cleaned items written to products.xlsx",
  "[STATUS] Scraping batch complete | Failures: 12",
  "[SYSTEM] Crawl cycle complete. Cooling down."
];

/* ── Interactive Scrolling Terminal ── */
function TelemetryTerminal({ activeTab }: { activeTab: ActiveTab }) {
  const [lines, setLines] = useState<LogLine[]>([]);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const activeList = activeTab === "platform" ? platformLogs : scrapingLogs;
    let index = 0;
    const resetTimer = setTimeout(() => {
      setLines([
        { text: `[SYSTEM] TERMINATING OPERATIONAL SYSTEM MODULE...`, type: "system" },
        { text: `[SYSTEM] UNLOADING REGISTERS AND BUFFER PIPES...`, type: "system" },
        { text: `[SYSTEM] ACTIVE MODULE SWITCH DETECTED: -> ${activeTab.toUpperCase()}_ENGINE`, type: "system" },
        { text: `[SYSTEM] REBOOTING RUNTIME COMMAND INSTANCE...`, type: "system" },
        { text: `[SYSTEM] EXECUTING: python ${activeTab === "platform" ? "platform_orchestrator.py" : "distributed_crawler.py"}`, type: "system" },
      ]);
    }, 0);

    const timer = setInterval(() => {
      setLines((prev) => {
        const next = [
          ...prev,
          {
            text: activeList[index % activeList.length],
            type: "log" as const,
            ts: new Date().toLocaleTimeString("en-US", { hour12: false }),
          },
        ];
        if (next.length > 14) next.shift();
        return next;
      });
      index++;
    }, 1500);

    return () => {
      clearTimeout(resetTimer);
      clearInterval(timer);
    };
  }, [activeTab]);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div className="bg-cyber-dark border border-cyber-border rounded-lg overflow-hidden flex flex-col h-64 shadow-2xl relative">
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-cyber-border bg-cyber-surface/70 select-none">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-cyber-error/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-cyber-warning/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-cyber-success/60" />
        </div>
        <span className="text-[0.55rem] text-cyber-text-dim tracking-[0.15em] font-mono ml-2 uppercase">
          {activeTab === "platform" ? "platform_orchestrator.py" : "distributed_crawler.py"} - OPERATIONAL STACK
        </span>
        <div className="flex-1" />
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-cyber-success rounded-full animate-pulse" />
          <span className="text-[0.5rem] text-cyber-success font-mono uppercase tracking-wider hidden sm:inline">RUNNING</span>
        </div>
      </div>

      {/* Log content */}
      <div ref={logRef} className="p-3 flex-1 overflow-y-auto font-mono text-[0.6rem] leading-relaxed bg-cyber-dark">
        {lines.map((line, i) => {
          let lineClass = "text-cyber-cyan/70";
          if (line.type === "system") {
            lineClass = "text-cyber-pink font-bold opacity-80";
          } else if (line.text.includes("[ALERT]") || line.text.includes("[RETRY]") || line.text.includes("[REVIEW]")) {
            lineClass = "text-cyber-warning";
          } else if (line.text.includes("[STATUS]") || line.text.includes("[EXPORT]") || line.text.includes("[SOLVER]") || line.text.includes("Success")) {
            lineClass = "text-cyber-success";
          } else if (line.text.includes("[ENGAGE]") || line.text.includes("[PROFILE")) {
            lineClass = "text-cyber-cyan";
          }

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              className="flex gap-2 mb-1"
            >
              {line.ts && (
                <span className="text-cyber-text-dim shrink-0 select-none">{line.ts}</span>
              )}
              <span className={lineClass}>{line.text}</span>
            </motion.div>
          );
        })}
        <span className="terminal-cursor" />
      </div>
    </div>
  );
}

/* ── Live Telemetry Grid ── */
function TelemetryGrid({ activeTab }: { activeTab: ActiveTab }) {
  const [profiles, setProfiles] = useState(initialProfiles);
  const [spiders, setSpiders] = useState(initialSpiders);
  const [activeItem, setActiveItem] = useState<ActiveItem | null>(null);

  // Periodically simulate live changes in worker states
  useEffect(() => {
    const timer = setInterval(() => {
      if (activeTab === "platform") {
        setProfiles((prev) => {
          const next = [...prev];
          const randomIndex = Math.floor(Math.random() * next.length);
          const oldStatus = next[randomIndex].status;
          const statuses = ["IDLE", "VIEWING", "LIKING", "COMMENTING", "SCANNING", "REPLYING", "REVIEWING"];
          let newStatus = statuses[Math.floor(Math.random() * statuses.length)];
          while (newStatus === oldStatus) {
            newStatus = statuses[Math.floor(Math.random() * statuses.length)];
          }
          next[randomIndex] = { ...next[randomIndex], status: newStatus };
          return next;
        });
      } else {
        setSpiders((prev) => {
          const next = [...prev];
          const randomIndex = Math.floor(Math.random() * next.length);
          const oldStatus = next[randomIndex].status;
          const statuses = ["GET 200", "SAVING", "WAITING", "RETRYING", "GET 403"];
          let newStatus = statuses[Math.floor(Math.random() * statuses.length)];
          while (newStatus === oldStatus) {
            newStatus = statuses[Math.floor(Math.random() * statuses.length)];
          }
          // Speed changes
          const speed = newStatus === "WAITING" || newStatus === "RETRYING" || newStatus.includes("403") ? "0 r/s" : `${Math.floor(10 + Math.random() * 60)} r/s`;
          next[randomIndex] = { ...next[randomIndex], status: newStatus, speed };
          return next;
        });
      }
    }, 1200);

    return () => clearInterval(timer);
  }, [activeTab]);

  return (
    <div className="bg-cyber-dark border border-cyber-border rounded-lg p-4 relative overflow-hidden shadow-xl">
      {/* Title */}
      <div className="flex justify-between items-center mb-3 border-b border-cyber-border/40 pb-2">
        <span className="text-[0.55rem] text-cyber-text-dim tracking-[0.15em] uppercase font-mono flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-cyber-pink rounded-full animate-ping" />
          {activeTab === "platform" ? "SOCIAL INTERACTION TASKS" : "WEBSITE SCRAPING TASKS"}
        </span>
        <span className="text-[0.5rem] text-cyber-cyan font-mono tracking-wider">
          {activeTab === "platform" ? "24 SAMPLE PROFILES" : "24 SAMPLE TASKS"}
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-6 sm:grid-cols-8 gap-1.5 mb-4">
        {activeTab === "platform"
          ? profiles.map((p, i) => {
              let color = "rgba(106, 106, 126, 0.2)"; // IDLE - dim gray
              if (p.status === "LIKING" || p.status === "COMMENTING") color = "rgba(234, 59, 146, 0.6)"; // Pink - interacting
              else if (p.status === "VIEWING" || p.status === "SCANNING") color = "rgba(0, 240, 255, 0.5)"; // Cyan - browsing
              else if (p.status === "REPLYING" || p.status === "REVIEWING") color = "rgba(0, 255, 136, 0.6)"; // Green - review queue

              return (
                <div
                  key={i}
                  className="aspect-square border border-cyber-border/60 rounded flex items-center justify-center text-[0.45rem] font-bold font-mono cursor-pointer relative select-none hover:border-cyber-pink/50 transition-colors"
                  style={{ background: color }}
                  onMouseEnter={() => setActiveItem({ type: "profile", data: p })}
                  onMouseLeave={() => setActiveItem(null)}
                >
                  {p.platform}
                </div>
              );
            })
          : spiders.map((s, i) => {
              let color = "rgba(0, 255, 136, 0.4)"; // GET 200 - Green
              if (s.status === "SAVING") color = "rgba(0, 240, 255, 0.4)"; // SAVING - Cyan
              else if (s.status === "WAITING" || s.status === "RETRYING") color = "rgba(255, 170, 0, 0.5)"; // Waiting/retry - warning orange
              else if (s.status === "GET 403") color = "rgba(255, 51, 68, 0.6)"; // Banned - Red

              return (
                <div
                  key={i}
                  className="aspect-square border border-cyber-border/60 rounded flex items-center justify-center text-[0.4rem] font-bold font-mono cursor-pointer relative select-none hover:border-cyber-cyan/50 transition-colors"
                  style={{ background: color }}
                  onMouseEnter={() => setActiveItem({ type: "spider", data: s })}
                  onMouseLeave={() => setActiveItem(null)}
                >
                  {s.node.split("-")[1]}
                </div>
              );
            })}
      </div>

      {/* Dynamic Details HUD Panel */}
      <div className="h-10 border border-cyber-border bg-cyber-dark rounded p-2 flex items-center font-mono">
        {activeItem ? (
          <motion.div
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full flex justify-between text-[0.52rem] leading-none text-cyber-text"
          >
            {activeItem.type === "profile" ? (
              <>
                <div>
                  <span className="text-cyber-pink">ACC:</span> {activeItem.data.name}
                </div>
                <div>
                  <span className="text-cyber-cyan">ACTION:</span> {activeItem.data.status}
                </div>
                <div className="hidden sm:block">
                  <span className="text-cyber-success font-bold">SESSION:</span> {activeItem.data.proxy}
                </div>
              </>
            ) : (
              <>
                <div>
                  <span className="text-cyber-cyan">NODE:</span> {activeItem.data.node} ({activeItem.data.target})
                </div>
                <div>
                  <span className="text-cyber-warning">STATUS:</span> {activeItem.data.status}
                </div>
                <div>
                  <span className="text-cyber-success">SPEED:</span> {activeItem.data.speed}
                </div>
              </>
            )}
          </motion.div>
        ) : (
          <div className="text-[0.52rem] text-cyber-text-dim tracking-wider uppercase flex justify-between w-full select-none">
            <span>[ SYSTEM IDLE ]</span>
            <span>HOVER WORKER THREAD FOR LIVE METRICS SOURCE</span>
          </div>
        )}
      </div>

      {/* Grid background visual */}
      <div className="absolute right-0 bottom-0 w-24 h-24 bg-gradient-to-tr from-cyber-pink/5 to-transparent pointer-events-none rounded-full blur-xl" />
    </div>
  );
}

/* ── Custom Automation Tool Card ── */
function ToolCard({
  tool,
  index,
  activeTab,
}: {
  tool: AutomationTool;
  index: number;
  activeTab: ActiveTab;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const metrics = Object.entries(tool.metrics);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="cyber-card rounded-lg p-5 h-full relative overflow-hidden flex flex-col justify-between">
        {/* Decorative dynamic neon indicator line */}
        <div className={`absolute top-0 left-0 w-full h-[2px] transition-transform duration-500 scale-x-0 group-hover:scale-x-100 origin-left ${
          activeTab === "platform" ? "bg-cyber-pink" : "bg-cyber-cyan"
        }`} />

        {/* Top Header */}
        <div>
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className={`text-sm font-bold text-cyber-heading transition-colors font-['Orbitron'] tracking-wide ${
                activeTab === "platform" ? "group-hover:text-cyber-pink" : "group-hover:text-cyber-cyan"
              }`}>
                {tool.title}
              </h3>
              <p className="text-[0.55rem] text-cyber-text-dim tracking-[0.12em] uppercase mt-0.5 font-mono">
                {tool.subtitle}
              </p>
            </div>
            <div className={`w-8 h-8 border flex items-center justify-center transition-colors font-mono font-bold text-[0.55rem] ${
              activeTab === "platform"
                ? "border-cyber-pink/20 bg-cyber-pink/5 group-hover:bg-cyber-pink/10 text-cyber-pink"
                : "border-cyber-cyan/20 bg-cyber-cyan/5 group-hover:bg-cyber-cyan/10 text-cyber-cyan"
            }`}>
              {String(index + 1).padStart(2, "0")}
            </div>
          </div>

          {/* Description */}
          <p className="text-[0.62rem] text-cyber-text-dim leading-relaxed mb-4 font-sans">
            {tool.description}
          </p>
        </div>

        {/* Dynamic metrics bar */}
        <div className="grid grid-cols-3 gap-2 mb-4 mt-auto">
          {metrics.map(([key, val]) => (
            <div
              key={key}
              className="text-center bg-cyber-dark/40 border border-cyber-border px-1.5 py-1.5 select-none"
            >
              <div className="text-[0.45rem] text-cyber-text-dim tracking-[0.1em] uppercase font-mono truncate">
                {key}
              </div>
              <div className={`text-[0.6rem] font-bold mt-0.5 font-mono ${
                activeTab === "platform" ? "text-cyber-pink" : "text-cyber-cyan"
              }`}>
                {val}
              </div>
            </div>
          ))}
        </div>

        {/* Expanding details accordion (Bilingual Features list) */}
        <div className="border-t border-cyber-border/40 pt-3">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between w-full text-[0.55rem] font-mono tracking-wider text-cyber-text-dim hover:text-cyber-heading uppercase transition-colors select-none"
          >
            <span>ENGINE MODULE FEATURES</span>
            <motion.span
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              ▼
            </motion.span>
          </button>

          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="space-y-1.5 pt-2 border-t border-cyber-border/20 mt-2">
                  {tool.features.map((feat, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-1.5 text-[0.58rem] leading-relaxed text-cyber-text-dim"
                    >
                      <span className={`w-1 h-1 rounded-full mt-1.5 shrink-0 ${
                        activeTab === "platform" ? "bg-cyber-pink" : "bg-cyber-cyan"
                      }`} />
                      <span className="font-mono">{feat}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tech tags list */}
        <div className="flex flex-wrap gap-1 mt-4">
          {tool.tech.map((t) => (
            <span
              key={t}
              className={`text-[0.52rem] px-1.5 py-0.5 border font-mono uppercase tracking-wider rounded-sm ${
                activeTab === "platform"
                  ? "bg-cyber-pink/5 border-cyber-pink/15 text-cyber-pink/70"
                  : "bg-cyber-cyan/5 border-cyber-cyan/15 text-cyber-cyan/70"
              }`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function AutomationSection() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("platform");

  return (
    <SectionWrapper
      id="automation"
      moduleIndex={5}
      moduleLabel="AUTOMATION SUPPORT TOOLS"
      title="AUTOMATION"
      subtitle="Small support tools for social media interactions and website data scraping."
    >
      {/* ── Tabs Module Control Switcher ── */}
      <div className="relative mb-10 border border-cyber-border bg-cyber-surface/30 p-2 rounded-xl flex flex-col md:flex-row gap-2 select-none shadow-xl">
        {/* Toggle Button 1: Platform Automation */}
        <button
          onClick={() => setActiveTab("platform")}
          className={`flex-1 relative py-4 px-6 rounded-lg font-['Orbitron'] font-bold text-xs tracking-wider transition-all duration-300 flex flex-col items-center justify-center border ${
            activeTab === "platform"
              ? "bg-cyber-pink/10 border-cyber-pink text-cyber-heading glow-pink"
              : "border-transparent text-cyber-text-dim hover:text-cyber-heading hover:bg-cyber-surface/60"
          }`}
        >
          <span className="text-[0.5rem] tracking-[0.2em] opacity-60 font-mono mb-1 uppercase">MODULE 05.A // SOCIAL INTERACTIONS</span>
          <span className="uppercase">Social Platform Automation</span>
          <span className="text-[0.55rem] font-mono text-cyber-pink/80 font-normal mt-0.5 tracking-wide">
            Views, likes, comments, and simple follow-up queues
          </span>
        </button>

        {/* Toggle Button 2: Web Scraping & Crawling */}
        <button
          onClick={() => setActiveTab("scraping")}
          className={`flex-1 relative py-4 px-6 rounded-lg font-['Orbitron'] font-bold text-xs tracking-wider transition-all duration-300 flex flex-col items-center justify-center border ${
            activeTab === "scraping"
              ? "bg-cyber-cyan/10 border-cyber-cyan text-cyber-heading glow-cyan"
              : "border-transparent text-cyber-text-dim hover:text-cyber-heading hover:bg-cyber-surface/60"
          }`}
        >
          <span className="text-[0.5rem] tracking-[0.2em] opacity-60 font-mono mb-1 uppercase">MODULE 05.B // WEBSITE DATA</span>
          <span className="uppercase">Website Data Scraping</span>
          <span className="text-[0.55rem] font-mono text-cyber-cyan/85 font-normal mt-0.5 tracking-wide">
            Crawl pages, parse fields, clean data, export files
          </span>
        </button>
      </div>

      {/* ── Main Operations Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Columns (Tool Cards of the Active Module) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="flex items-center gap-2 font-mono text-[0.6rem] text-cyber-text-dim uppercase tracking-[0.15em]">
            <span className={`w-1.5 h-1.5 rounded-full animate-ping ${activeTab === "platform" ? "bg-cyber-pink" : "bg-cyber-cyan"}`} />
            <span>ACTIVE CAPABILITIES ({activeTab === "platform" ? "Social Interactions" : "Website Scraping"})</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6"
              >
                {activeTab === "platform"
                  ? platformAutomation.map((tool, i) => (
                      <ToolCard key={tool.id} tool={tool} index={i} activeTab={activeTab} />
                    ))
                  : webScraping.map((tool, i) => (
                      <ToolCard key={tool.id} tool={tool} index={i} activeTab={activeTab} />
                    ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Columns (Live Telemetry & Logs Monitor) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Operations Title */}
          <div className="flex items-center gap-2 font-mono text-[0.6rem] text-cyber-text-dim uppercase tracking-[0.15em] select-none">
            <span className="w-1.5 h-1.5 bg-cyber-success rounded-full animate-pulse" />
            <span>LIGHTWEIGHT TASK MONITOR</span>
          </div>

          {/* Telemetry Matrix Grid */}
          <TelemetryGrid activeTab={activeTab} />

          {/* Terminal log output */}
          <TelemetryTerminal activeTab={activeTab} />
          
          {/* Architecture telemetry indicators */}
          <div className="bg-cyber-dark/40 border border-cyber-border rounded-lg p-4 font-mono text-[0.55rem] space-y-2 select-none shadow-md">
            <div className="text-[0.6rem] text-cyber-text-dim tracking-wider uppercase border-b border-cyber-border/40 pb-1.5 mb-2">
              TOOL SUMMARY
            </div>
            <div className="flex justify-between">
              <span className="text-cyber-text-dim">PRIMARY USE:</span>
              <span className="text-cyber-success font-bold font-mono">
                {activeTab === "platform" ? "SOCIAL ACTIONS" : "DATA SCRAPING"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-cyber-text-dim">ROLE IN STACK:</span>
              <span className="text-cyber-cyan font-bold font-mono">SUPPORTING TOOL</span>
            </div>
            <div className="flex justify-between">
              <span className="text-cyber-text-dim">POSITION:</span>
              <span className="text-cyber-pink font-bold font-mono">SUPPORTING EXPERIENCE</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Technology Stack Footer Bar ── */}
      <div className="mt-12 p-4 border border-cyber-border bg-cyber-surface/30">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full animate-pulse ${activeTab === "platform" ? "bg-cyber-pink" : "bg-cyber-cyan"}`} />
            <span className="text-[0.6rem] text-cyber-text-dim tracking-[0.2em] font-mono uppercase">
              TOOL STACK:
            </span>
          </div>
          <div className="flex-1 h-px bg-cyber-border" />
          <div className="flex flex-wrap gap-2">
            {(activeTab === "platform"
              ? ["Python", "Playwright", "Selenium", "FastAPI", "Redis"]
              : ["Python", "Scrapy", "Requests", "BeautifulSoup4", "Pandas", "MongoDB"]
            ).map((t) => (
              <span
                key={t}
                className={`text-[0.55rem] px-2 py-0.5 border font-mono tracking-wider uppercase ${
                  activeTab === "platform"
                    ? "border-cyber-pink/20 text-cyber-pink/70"
                    : "border-cyber-cyan/20 text-cyber-cyan/70"
                }`}
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
