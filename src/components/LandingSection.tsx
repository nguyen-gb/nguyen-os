import SectionWrapper from "./SectionWrapper";
import ProjectCard from "./ProjectCard";
import { landingProjects } from "@/data/projects";

export default function LandingSection() {
  return (
    <SectionWrapper
      id="landing"
      moduleIndex={4}
      moduleLabel="CLIENT DELIVERY"
      title="MARKETING EXPERIENCES"
      subtitle="Landing pages delivered independently, from responsive implementation through production-ready interaction and presentation."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {landingProjects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>

      {/* Tech stack footer */}
      <div className="mt-10 flex items-center gap-4 flex-wrap">
        <span className="text-[0.55rem] text-cyber-text-dim tracking-[0.2em] uppercase font-mono">
          CORE TECH:
        </span>
        {["HTML5", "CSS3", "Tailwind CSS", "JavaScript", "SEO Optimization"].map(
          (t) => (
            <span
              key={t}
              className="text-[0.55rem] px-2 py-0.5 border border-cyber-cyan/20 text-cyber-cyan/70 tracking-wider uppercase font-mono"
            >
              {t}
            </span>
          )
        )}
      </div>
    </SectionWrapper>
  );
}
