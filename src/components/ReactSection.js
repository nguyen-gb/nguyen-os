"use client";

import SectionWrapper from "./SectionWrapper";
import ProjectCard from "./ProjectCard";
import { reactProjects } from "@/data/projects";

export default function ReactSection() {
  return (
    <SectionWrapper
      id="react"
      moduleIndex={3}
      moduleLabel="PERSONAL ARCHITECTURE SHELL"
      title="REACT PROJECTS"
      subtitle="Personal engineering showcases demonstrating mastery of modern component-driven architectures."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {reactProjects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>

      {/* Tech stack footer */}
      <div className="mt-10 flex items-center gap-4 flex-wrap">
        <span className="text-[0.55rem] text-cyber-text-dim tracking-[0.2em] uppercase font-mono">
          CORE TECH:
        </span>
        {[
          "React",
          "Next.js",
          "React Native",
          "WebSockets",
          "Redux",
          "JWT",
          "Audio APIs",
        ].map((t) => (
          <span
            key={t}
            className="text-[0.55rem] px-2 py-0.5 border border-cyber-cyan/20 text-cyber-cyan/70 tracking-wider uppercase font-mono"
          >
            {t}
          </span>
        ))}
      </div>
    </SectionWrapper>
  );
}
