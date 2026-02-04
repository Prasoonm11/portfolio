import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import About from "./components/About";
import Contact from "./components/Contact";
import Background from "./components/Background";
import { motion } from "framer-motion";

function App() {
  const [theme, setTheme] = useState("default");

  return (
    <motion.div
      className={`theme-${theme}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Background />
      <Sidebar theme={theme} setTheme={setTheme} />

      <main className="main-content">
        <Hero />
        <Projects />
        <About />
        <Contact />
      </main>
    </motion.div>
  );
}export default App;
