import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { SkillsSection } from "../components/SkillsSection";
import { AiSection } from "../components/AiSection";
import { FocusSection } from "../components/FocusSection";
import MyApproach from "../components/MyApproach";
import { ProjectsSection } from "../components/ProjectsSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";
import { TestimonialSection } from "../components/Testimonial";

export const Home = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden text-foreground">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
        <img
          src="/nova/NOVA_MAN_enhanced_animated_background.svg"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-background/45" />
      </div>
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <AiSection />
        <FocusSection />
        <MyApproach />
        <ProjectsSection />
        <TestimonialSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};
