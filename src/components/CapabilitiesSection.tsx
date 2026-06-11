import SectionWrapper from "./SectionWrapper";
import { personalInfo } from "@/data/projects";

const capabilities = [
  {
    index: "01",
    title: "Product frontend",
    description:
      "Responsive, accessible interfaces built around real user flows rather than isolated screens.",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    index: "02",
    title: "Real-time experiences",
    description:
      "Interactive product states for booking, audio, streaming responses, and synchronized data.",
    skills: ["WebSockets", "Audio APIs", "State management", "React Native"],
  },
  {
    index: "03",
    title: "Full feature delivery",
    description:
      "Enough backend experience to own the path from interface through API integration and deployment.",
    skills: ["Python", "FastAPI", "REST APIs", "Docker"],
  },
  {
    index: "04",
    title: "Production web",
    description:
      "Marketing and commerce experiences with practical attention to content, SEO, and maintainability.",
    skills: ["WordPress", "WooCommerce", "PHP", "Performance"],
  },
];

export default function CapabilitiesSection() {
  return (
    <SectionWrapper
      id="capabilities"
      moduleIndex={3}
      moduleLabel="HOW I CONTRIBUTE"
      title="CAPABILITIES"
      subtitle={personalInfo.summary}
    >
      <div className="grid gap-4 md:grid-cols-2">
        {capabilities.map((capability) => (
          <article
            key={capability.index}
            className="border border-cyber-border bg-cyber-surface/50 p-6 transition-colors hover:border-cyber-pink/50"
          >
            <div className="flex items-start gap-4">
              <span className="font-['Orbitron'] text-sm text-cyber-pink">
                {capability.index}
              </span>
              <div>
                <h3 className="font-['Orbitron'] text-lg font-bold text-cyber-heading">
                  {capability.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-cyber-text-dim">
                  {capability.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {capability.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[0.6rem] uppercase tracking-wider text-cyber-cyan"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
}
