import { motion } from "framer-motion";

const themes = ["default", "sunset", "neon", "dark"];

export default function Sidebar({ theme, setTheme }) {
  return (
    <motion.aside
      className="sidebar"
      initial={{ x: -60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="brand">
        <div className="avatar">P</div>
        <h1>Prasoon</h1>
        <p>Web Developer</p>
      </div>

      <nav className="nav-links">
        <a href="#hero">Home</a>
        <a href="#projects">Projects</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>

      <div className="theme-switcher">
        <h3>Themes</h3>

        {themes.map((t) => (
          <button
            key={t}
            className={`theme-btn ${theme === t ? "active" : ""}`}
            onClick={() => setTheme(t)}
          >
            {t}
          </button>
        ))}
      </div>
    </motion.aside>
  );
}
