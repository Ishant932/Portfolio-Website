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
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import CtaBanner from "@/components/sections/CtaBanner";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";

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
        <Projects />
        <CtaBanner />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
