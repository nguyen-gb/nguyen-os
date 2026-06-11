import SectionWrapper from "./SectionWrapper";
import { personalInfo } from "@/data/projects";

export default function ContactSection() {
  return (
    <SectionWrapper
      id="contact"
      moduleIndex={7}
      moduleLabel="START A CONVERSATION"
      title="LET'S BUILD"
      subtitle="Hiring for a product team or looking for someone to deliver a web experience? Send the context, goal, and timeline."
    >
      <div className="grid gap-6 border border-cyber-pink/30 bg-cyber-pink/5 p-6 md:grid-cols-[1fr_auto] md:items-center md:p-10">
        <div>
          <p className="text-sm leading-7 text-cyber-text">
            I am based in {personalInfo.location}. The fastest way to reach me
            is email; source code and technical work are available on GitHub.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-cyber-text-dim">
            <span>{personalInfo.experience} production experience</span>
            <span>{personalInfo.specialization}</span>
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
          <a
            href={`mailto:${personalInfo.contact.email}?subject=Project%20or%20career%20opportunity`}
            className="bg-cyber-pink px-6 py-3 text-center font-['Orbitron'] text-[0.65rem] uppercase tracking-[0.16em] text-white"
          >
            Email Nguyen
          </a>
          <a
            href={personalInfo.contact.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-cyber-cyan/40 px-6 py-3 text-center font-['Orbitron'] text-[0.65rem] uppercase tracking-[0.16em] text-cyber-cyan transition-colors hover:bg-cyber-cyan/10"
          >
            View GitHub
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
}
