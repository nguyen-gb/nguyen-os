import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LandingSection from "@/components/LandingSection";
import WordPressSection from "@/components/WordPressSection";
import ReactSection from "@/components/ReactSection";
import PythonSection from "@/components/PythonSection";
import Terminal from "@/components/Terminal";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <HeroSection />

        {/* Section dividers between each module */}
        <div className="neon-divider" />

        {/* Module 01: React */}
        <ReactSection />
        <div className="neon-divider" />

        {/* Module 02: Landing Pages */}
        <LandingSection />
        <div className="neon-divider" />

        {/* Module 03: WordPress */}
        <WordPressSection />
        <div className="neon-divider" />

        {/* Module 04: Python */}
        <PythonSection />
        <div className="neon-divider" />

        {/* Module 05: Terminal */}
        <Terminal />
      </main>

      <Footer />
    </>
  );
}
