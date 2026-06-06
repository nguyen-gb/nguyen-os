import SectionWrapper from "./SectionWrapper";
import ProjectCard from "./ProjectCard";
import { wordpressProjects } from "@/data/projects";

export default function WordPressSection() {
  return (
    <SectionWrapper
      id="wordpress"
      moduleIndex={3}
      moduleLabel="PRODUCTION WEB PLATFORMS"
      title="WORDPRESS"
      subtitle="Production websites delivered in professional teams, with custom themes, commerce flows, and CMS integrations."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wordpressProjects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>

      {/* Tech stack footer */}
      <div className="mt-10 flex items-center gap-4 flex-wrap">
        <span className="text-[0.55rem] text-cyber-text-dim tracking-[0.2em] uppercase font-mono">
          CORE TECH:
        </span>
        {[
          "WordPress",
          "Custom PHP/Themes",
          "WooCommerce",
          "MySQL",
          "RESTful APIs",
          "Linux Servers",
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
