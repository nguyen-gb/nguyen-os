import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LandingSection from "@/components/LandingSection";
import WordPressSection from "@/components/WordPressSection";
import ReactSection from "@/components/ReactSection";
import PythonSection from "@/components/PythonSection";
import Terminal from "@/components/Terminal";
import Footer from "@/components/Footer";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <HeroSection />

        {/* Section dividers between each module */}
        <div className="neon-divider" />

        {/* Selected work */}
        <ReactSection />
        <div className="neon-divider" />

        <CaseStudiesSection />
        <div className="neon-divider" />

        <CapabilitiesSection />
        <div className="neon-divider" />

        {/* Client work */}
        <LandingSection />
        <div className="neon-divider" />

        <WordPressSection />
        <div className="neon-divider" />

        <PythonSection />
        <div className="neon-divider" />

        <ContactSection />
        <div className="neon-divider" />

        {/* Interactive extra */}
        <Terminal />
      </main>

      <Footer />
    </>
  );
}
