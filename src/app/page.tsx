import dynamic from "next/dynamic";
import LiveBackground from "@/components/effects/LiveBackground";
import Preloader from "@/components/layout/Preloader";
import Navbar from "@/components/layout/Navbar";
import BottomNav from "@/components/layout/BottomNav";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/effects/CustomCursor";
import TopButton from "@/components/effects/TopButton";
import ScrollProgress from "@/components/effects/ScrollProgress";
import TechMarquee from "@/components/effects/TechMarquee";
import Hero from "@/components/sections/Hero";

// Below-fold sections load in their own chunks so the critical path stays small
// on mobile — they still render in the server HTML (SEO intact) but hydrate
// after the main bundle.
const About = dynamic(() => import("@/components/sections/About"), { loading: () => <section id="about" className="min-h-[60vh]" /> });
const Experience = dynamic(() => import("@/components/sections/Experience"), { loading: () => <section id="experience" className="min-h-[50vh]" /> });
const Skills = dynamic(() => import("@/components/sections/Skills"), { loading: () => <section id="skills" className="min-h-[50vh]" /> });
const Projects = dynamic(() => import("@/components/sections/Projects"), { loading: () => <section id="projects" className="min-h-[50vh]" /> });
const CtaBanner = dynamic(() => import("@/components/sections/CtaBanner"), { loading: () => <section id="cta" className="min-h-[30vh]" /> });
const Contact = dynamic(() => import("@/components/sections/Contact"), { loading: () => <section id="contact" className="min-h-[50vh]" /> });

export default function Home() {
  return (
    <>
      <Preloader />
      <ScrollProgress />
      <CustomCursor />
      <LiveBackground />
      <Navbar />
      <BottomNav />
      <TopButton />
      <main>
        <Hero />
        <TechMarquee />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <CtaBanner />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
