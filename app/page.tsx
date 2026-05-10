import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Certifications from "./components/Certifications";
import TechStatus from "./components/TechStatus";
import TechStack from "./components/TechStack";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Education />
      <Certifications />
      <TechStatus />
      <TechStack />
      <Contact />
    </>
  );
}