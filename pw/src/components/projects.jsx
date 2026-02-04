import { motion } from "framer-motion";

const projects = [
  {
    title: "Project One",
    desc: "Responsive portfolio website.",
    details: "Built with HTML, CSS, and JavaScript with smooth scrolling and theming.",
    tags: "HTML · CSS · JS"
  },
  {
    title: "Project Two",
    desc: "Interactive UI components.",
    details: "Micro-interactions, hover effects, and motion-driven UI elements.",
    tags: "UI · Animations"
  },
  {
    title: "Project Three",
    desc: "Concept landing page.",
    details: "Modern hero sections, call-to-actions, and animated backgrounds.",
    tags: "Design · Frontend"
  }
];

export default function Projects() {
  return (
    <motion.section
      id="projects"
      className="section"
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        viewport={{ once: true }}
      >
        Projects
      </motion.h2>

      <div className="projects-grid">
        {projects.map((p, i) => (
          <motion.article
            key={i}
            className="project-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.4,
              delay: i * 0.08,
              ease: "easeOut"
            }}
            whileHover={{ y: -6 }}
          >
            <motion.div
              className="project-inner"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
            >
              <div className="project-front">
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>

              <div className="project-back">
                <p>{p.details}</p>
                <span className="project-tags">{p.tags}</span>
              </div>
            </motion.div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}
