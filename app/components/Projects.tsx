"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce platform with real-time inventory management, payment processing, and analytics dashboard.",
    tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
    category: "Web App",
    gradient: "from-amber-500/20 to-orange-500/20",
    accent: "#f59e0b",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    github: "https://github.com",
    live: "https://demo.com",
  },
  {
    id: 2,
    title: "Real-Time Chat App",
    description: "Scalable messaging platform with WebSocket connections, end-to-end encryption, and presence indicators.",
    tags: ["Socket.io", "Redis", "MongoDB", "TypeScript"],
    category: "Real-time",
    gradient: "from-cyan-500/20 to-blue-500/20",
    accent: "#06b6d4",
    image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&q=80",
    github: "https://github.com",
    live: "https://demo.com",
  },
  {
    id: 3,
    title: "AI Content Generator",
    description: "Machine learning powered content generation tool with custom model training and API integration.",
    tags: ["Python", "FastAPI", "OpenAI", "React"],
    category: "AI/ML",
    gradient: "from-purple-500/20 to-pink-500/20",
    accent: "#a855f7",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    github: "https://github.com",
    live: "https://demo.com",
  },
  {
    id: 4,
    title: "Task Management System",
    description: "Kanban-style project management with team collaboration, time tracking, and reporting features.",
    tags: ["Next.js", "Prisma", "PostgreSQL", "Tailwind"],
    category: "SaaS",
    gradient: "from-emerald-500/20 to-teal-500/20",
    accent: "#10b981",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80",
    github: "https://github.com",
    live: "https://demo.com",
  },
  {
    id: 5,
    title: "Blockchain Explorer",
    description: "Cryptocurrency transaction explorer with real-time data, wallet tracking, and network statistics.",
    tags: ["Web3.js", "React", "Node.js", "GraphQL"],
    category: "Web3",
    gradient: "from-blue-500/20 to-indigo-500/20",
    accent: "#3b82f6",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
    github: "https://github.com",
    live: "https://demo.com",
  },
  {
    id: 6,
    title: "DevOps Automation Suite",
    description: "CI/CD pipeline automation tool with Docker, Kubernetes, and monitoring integrations.",
    tags: ["Go", "Docker", "Kubernetes", "Terraform"],
    category: "DevOps",
    gradient: "from-rose-500/20 to-red-500/20",
    accent: "#f43f5e",
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80",
    github: "https://github.com",
    live: "https://demo.com",
  },
];

const categories = ["All", "Web App", "Real-time", "AI/ML", "SaaS", "Web3", "DevOps"];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="section-container">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="mb-12">
          <span className="eyebrow">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Portfolio
          </span>
          <h2 className="section-title">
            Featured
            <span className="gradient-text"> Projects</span>
          </h2>
          <p className="section-subtitle">
            A selection of projects that showcase my skills and passion for development
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-primary text-background"
                  : "bg-surface border border-border text-text-secondary hover:border-primary hover:text-primary"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group card overflow-hidden p-0"
              variants={itemVariants}
              layout
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient}`} />

                {/* Category Badge */}
                <span
                  className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm"
                  style={{
                    background: `${project.accent}30`,
                    color: project.accent,
                    border: `1px solid ${project.accent}50`,
                  }}
                >
                  {project.category}
                </span>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                  </motion.a>
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </motion.a>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-text-muted mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag text-[10px]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View More */}
        <motion.div
          variants={itemVariants}
          className="text-center mt-12"
        >
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View All Projects
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}