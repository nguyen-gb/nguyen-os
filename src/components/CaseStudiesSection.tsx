import Image from "next/image";
import SectionWrapper from "./SectionWrapper";
import { reactProjects } from "@/data/projects";

export default function CaseStudiesSection() {
  const caseStudies = reactProjects.filter((project) => project.caseStudy);

  return (
    <SectionWrapper
      id="case-studies"
      moduleIndex={2}
      moduleLabel="ENGINEERING DECISIONS"
      title="CASE STUDIES"
      subtitle="A closer look at the product problems, implementation choices, and concrete delivery behind the interface."
    >
      <div className="space-y-8">
        {caseStudies.map((project, index) => {
          const caseStudy = project.caseStudy!;
          const primaryUrl = project.url ?? project.links?.[0]?.url;

          return (
            <article
              key={project.id}
              className="cyber-card overflow-hidden"
            >
              <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
                <div className="relative min-h-64 overflow-hidden border-b border-cyber-border lg:min-h-full lg:border-r lg:border-b-0">
                  <Image
                    src={project.image}
                    alt={`${project.title} product interface`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark via-cyber-dark/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-[0.6rem] uppercase tracking-[0.2em] text-cyber-cyan">
                      Case study {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 font-['Orbitron'] text-2xl font-bold text-cyber-heading">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-xs text-cyber-text-dim">
                      {project.projectType} / {project.role}
                    </p>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <div>
                    <p className="case-label">The challenge</p>
                    <p className="mt-2 text-sm leading-7 text-cyber-text">
                      {caseStudy.challenge}
                    </p>
                  </div>

                  <div className="mt-7 grid gap-7 md:grid-cols-2">
                    <div>
                      <p className="case-label">What I built</p>
                      <ul className="mt-3 space-y-3">
                        {caseStudy.approach.map((item) => (
                          <li
                            key={item}
                            className="flex gap-3 text-xs leading-6 text-cyber-text-dim"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-cyber-pink" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="case-label">Delivered outcome</p>
                      <ul className="mt-3 space-y-3">
                        {caseStudy.outcome.map((item) => (
                          <li
                            key={item}
                            className="flex gap-3 text-xs leading-6 text-cyber-text-dim"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-cyber-cyan" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-7 flex flex-wrap items-center gap-2">
                    {project.tech.map((technology) => (
                      <span
                        key={technology}
                        className="border border-cyber-cyan/35 bg-cyber-cyan/5 px-2 py-1 text-[0.55rem] uppercase tracking-wider text-cyber-cyan transition-colors hover:border-cyber-pink/60 hover:bg-cyber-pink/10 hover:text-cyber-pink"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>

                  {primaryUrl && (
                    <a
                      href={primaryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-7 inline-flex border border-cyber-pink/50 px-5 py-2.5 text-[0.65rem] uppercase tracking-[0.16em] text-cyber-pink transition-colors hover:bg-cyber-pink/10"
                    >
                      Review project
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
