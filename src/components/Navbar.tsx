"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { personalInfo } from "@/data/projects";

type Theme = "light" | "dark";

const navLinks = [
  { id: "react", label: "REACT", module: "01" },
  { id: "landing", label: "LANDING", module: "02" },
  { id: "wordpress", label: "WORDPRESS", module: "03" },
  { id: "python", label: "PYTHON", module: "04" },
  { id: "terminal", label: "TERMINAL", module: "05" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Find active section
      const sections = navLinks.map((link) =>
        document.getElementById(link.id)
      );
      const current = sections.find((section) => {
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        return rect.top <= 200 && rect.bottom >= 200;
      });
      if (current) setActiveSection(current.id);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTheme(
        document.documentElement.classList.contains("light")
          ? "light"
          : "dark"
      );
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const toggleTheme = () => {
    const currentTheme =
      theme ??
      (document.documentElement.classList.contains("light") ? "light" : "dark");
    const nextTheme: Theme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.classList.toggle("light", nextTheme === "light");
    document.documentElement.style.colorScheme = nextTheme;
    localStorage.setItem("nguyen-os-theme", nextTheme);
    setTheme(nextTheme);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled
            ? "bg-cyber-dark/90 backdrop-blur-xl border-b border-cyber-pink/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Logo / System name */}
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2 group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Image
                src="/images/brand/logo-mark-256.png"
                alt="Nguyen"
                width={54}
                height={36}
                priority
                className="h-9 w-[54px] object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="hidden sm:block">
                <div className="text-[0.7rem] font-['Orbitron'] font-bold text-cyber-heading tracking-[0.2em] leading-none">
                  {personalInfo.systemVersion}
                </div>
                <div className="text-[0.5rem] text-cyber-pink/60 tracking-[0.3em] mt-0.5">
                  SYSTEM ACTIVE
                </div>
              </div>
            </motion.button>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`relative px-3 py-1.5 text-[0.6rem] tracking-[0.15em] font-mono uppercase transition-all duration-300 cursor-pointer ${
                    activeSection === link.id
                      ? "text-cyber-pink"
                      : "text-cyber-text-dim hover:text-cyber-heading"
                  }`}
                >
                  <span className="text-cyber-pink/40 mr-1">
                    {link.module}
                  </span>
                  {link.label}
                  {activeSection === link.id && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-0 right-0 h-[1px] bg-cyber-pink"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Right side: clock + status */}
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 text-[0.6rem] font-mono text-cyber-text-dim">
                <span className="w-1.5 h-1.5 bg-cyber-success rounded-full animate-pulse" />
                <span className="tracking-[0.1em]">{currentTime}</span>
              </div>

              <motion.button
                type="button"
                onClick={toggleTheme}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className="grid h-8 w-8 place-items-center border border-cyber-border bg-cyber-surface/70 text-cyber-pink transition-colors hover:border-cyber-pink/60 hover:bg-cyber-pink/10 cursor-pointer"
                aria-label={
                  theme === "light"
                    ? "Switch to dark mode"
                    : "Switch to light mode"
                }
                title={
                  theme === "light"
                    ? "Switch to dark mode"
                    : "Switch to light mode"
                }
              >
                {theme === "light" ? (
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <path
                      d="M20.4 15.2A8.5 8.5 0 0 1 8.8 3.6 8.5 8.5 0 1 0 20.4 15.2Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                    <path
                      d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </motion.button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
                aria-label="Toggle menu"
              >
                <motion.span
                  animate={{
                    rotate: mobileOpen ? 45 : 0,
                    y: mobileOpen ? 6 : 0,
                  }}
                  className="w-5 h-[1.5px] bg-cyber-pink origin-center"
                />
                <motion.span
                  animate={{ opacity: mobileOpen ? 0 : 1 }}
                  className="w-5 h-[1.5px] bg-cyber-pink"
                />
                <motion.span
                  animate={{
                    rotate: mobileOpen ? -45 : 0,
                    y: mobileOpen ? -6 : 0,
                  }}
                  className="w-5 h-[1.5px] bg-cyber-pink origin-center"
                />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99] bg-cyber-dark/98 backdrop-blur-2xl pt-20 px-6 lg:hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(link.id)}
                  className="flex items-center gap-4 py-3 border-b border-cyber-border cursor-pointer text-left"
                >
                  <span className="text-[0.6rem] text-cyber-pink/50 font-mono tracking-[0.2em]">
                    {link.module}
                  </span>
                  <span className="text-sm text-cyber-heading tracking-[0.15em] font-['Orbitron']">
                    {link.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
