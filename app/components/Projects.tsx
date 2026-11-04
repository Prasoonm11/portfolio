"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 }
  }
};

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  category: string;
  gradient: string;
  accent: string;
  image: string;
  github: string;
  live: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "NPTEL Certificate Management System",
    description: "Built certificate submission, verification, QR validation, and tamper-proof PDF generation. Features dockerized full-stack deployment and role-based portals.",
    tags: ["React", "Express", "FastAPI", "Appwrite", "Docker"],
    category: "Web App",
    gradient: "from-amber-500/20 to-orange-500/20",
    accent: "#f59e0b",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
    github: "https://github.com/SDC-MUJ/NPTEL",
    live: "https://nptel.sdcmuj.com/",
  },
  {
    id: 2,
    title: "InterviAI – AI Interview Platform",
    description: "An AI-powered interview platform with dashboards for recruiters, candidates, and admins. Includes JWT auth, AI feedback, live timer, notifications, and chat.",
    tags: ["MERN", "Gemini AI", "Socket.IO", "React", "Node.js", "Express.js", "MongoDB"],
    category: "AI/ML",
    gradient: "from-cyan-500/20 to-blue-500/20",
    accent: "#06b6d4",
    image: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?w=800&q=80",
    github: "https://github.com/Prasoonm11/AI-Interview-Platform",
    live: "https://interviai.vercel.app/",
  },
  {
    id: 3,
    title: "BankVerse AI",
    description: "Developed a Financial Digital Twin with multi-agent AI orchestration. Implemented financial coaching, simulations, and explainable recommendations.",
    tags: ["Next.js", "TypeScript", "Node.js", "AI Agents"],
    category: "AI/ML",
    gradient: "from-purple-500/20 to-pink-500/20",
    accent: "#a855f7",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=80",
    github: "https://github.com/Prasoonm11/BankVerse-Ai",
    live: "https://bank-verse-ai.vercel.app/",
  },
  {
    id: 4,
    title: "Autonomous Driver Recognition & AI Digital Twin",
    description: "Built edge AI driver recognition system with biometric fusion. Integrates a digital twin for predictive maintenance and smart cabin personalization.",
    tags: ["Python", "OpenCV", "TensorFlow Lite", "Edge AI"],
    category: "AI/ML",
    gradient: "from-emerald-500/20 to-teal-500/20",
    accent: "#10b981",
    image: "https://images.unsplash.com/photo-1508974239320-0a029497e820?w=800&q=80",
    github: "https://github.com/Prasoonm11/AARAAIDDT",
    live: "https://aaraaiddt.vercel.app/",
  },
  {
    id: 5,
    title: "AlignHQ",
    description: "A goal management portal featuring detailed analytics, approval workflows, and role-based access control. Integrated Supabase Auth, PostgreSQL, and RLS.",
    tags: ["Next.js", "TypeScript", "Supabase", "PostgreSQL"],
    category: "SaaS",
    gradient: "from-blue-500/20 to-indigo-500/20",
    accent: "#3b82f6",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80",
    github: "https://github.com/Prasoonm11/IHGSTP",
    live: "https://ihgstp.vercel.app/",
  },
  {
    id: 6,
    title: "Dynamic Conference Website",
    description: "Real-time editable conference website with admin dashboard, optimized media uploads, and secure content management.",
    tags: ["Next.js", "Supabase", "Tailwind CSS", "PostgreSQL"],
    category: "Web App",
    gradient: "from-rose-500/20 to-red-500/20",
    accent: "#f43f5e",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    github: "https://github.com/Prasoonm11/website-replication-II",
    live: "https://website-replication-ii.vercel.app/login",
  },
  {
    id: 7,
    title: "Multi-Gesture Recognition (sEMG)",
    description: "Hybrid Machine Learning + Spiking Neural Network (SNN) gesture recognition system. Achieved 96.25% classification accuracy for stroke rehabilitation.",
    tags: ["Python", "Scikit-learn", "SNNTorch", "Signal Processing"],
    category: "AI/ML",
    gradient: "from-violet-500/20 to-purple-500/20",
    accent: "#8b5cf6",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
    github: "https://github.com/Prasoonm11/Multi-Gesture-Recognition-for-Stroke-Rehabilitation-Using-sEMG-Signals",
    live: "https://github.com/Prasoonm11/Multi-Gesture-Recognition-for-Stroke-Rehabilitation-Using-sEMG-Signals",
  },
  {
    id: 8,
    title: "BrokeBuddy",
    description: "Chat-based AI financial advisor delivering personalized budgeting insights, financial simulations, and expense advice.",
    tags: ["Next.js", "TypeScript", "AI", "Tailwind CSS"],
    category: "AI/ML",
    gradient: "from-pink-500/20 to-rose-500/20",
    accent: "#ec4899",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80",
    github: "https://github.com/vinayaktyagi10/BrokeBuddy",
    live: "https://github.com/vinayaktyagi10/BrokeBuddy",
  },
  {
    id: 9,
    title: "Driftless — Position Fusion",
    description: "Developing a phone-based position fusion engine for an ISRO Smart India Hackathon navigation system. Combines GPS and motion sensors for dead reckoning, GPS recovery correction, and road matching during signal outages.",
    tags: ["Android", "GPS", "Sensor Fusion", "Dead Reckoning", "Road Matching"],
    category: "Mobile App",
    gradient: "from-sky-500/20 to-indigo-500/20",
    accent: "#0ea5e9",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80",
    github: "https://github.com/vinayaktyagi10/driftless",
    live: "https://github.com/vinayaktyagi10/driftless",
  },
  {
    id: 10,
    title: "Music Player App",
    description: "Android music app with listener and artist workflows, cloud song browsing, local playback, favorites, and a full-screen player. Includes artist uploads and cloud-backed song metadata.",
    tags: ["Kotlin", "Android", "Firebase", "Supabase Storage", "Media3 ExoPlayer"],
    category: "Mobile App",
    gradient: "from-fuchsia-500/20 to-violet-500/20",
    accent: "#d946ef",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&q=80",
    github: "https://github.com/Prasoonm11/musicplayer",
    live: "https://github.com/Prasoonm11/musicplayer",
  },
];

const categories = ["All", "Web App", "AI/ML", "SaaS", "Mobile App"];

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      key={project.id}
      className="group card overflow-hidden p-0 flex flex-col justify-between"
      variants={itemVariants}
      layout
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
    >
      <div>
        {/* Project Image */}
        <div className="relative h-44 sm:h-48 overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.4 }}
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient}`} />

          {/* Category Badge */}
          <span
            className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md shadow-sm"
            style={{
              background: `${project.accent}30`,
              color: project.accent,
              border: `1px solid ${project.accent}50`,
            }}
          >
            {project.category}
          </span>

          {/* Action Links */}
          <div className="absolute top-3.5 right-3.5 flex gap-2 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-background/85 backdrop-blur-md flex items-center justify-center hover:bg-background text-text-primary hover:text-primary transition-colors shadow-md"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              title="GitHub Code"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </motion.a>
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-background/85 backdrop-blur-md flex items-center justify-center hover:bg-background text-text-primary hover:text-primary transition-colors shadow-md"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              title="Live Link"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </motion.a>
          </div>
        </div>

        {/* Project Info */}
        <div className="p-5 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm text-text-muted mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span key={tag} className="tag text-[10px] py-0.5 px-2">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState("All");

  // Prevent background scrolling when modal is active
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filtered projects for initial section
  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter(p => p.category === activeCategory);

  // Show only first 4 projects on main page
  const visibleProjects = filteredProjects.slice(0, 4);

  // Filtered projects for popup modal
  const modalProjects = modalCategory === "All"
    ? projects
    : projects.filter(p => p.category === modalCategory);

  return (
    <section id="projects" className="section-container">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="mb-10">
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
        <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-primary text-background font-semibold shadow-sm"
                  : "bg-surface border border-border text-text-secondary hover:border-primary hover:text-primary"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid: First 4 Visible */}
        <motion.div
          className="grid md:grid-cols-2 gap-6"
          layout
        >
          {visibleProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>

        {/* View All Button Triggering Large Popup */}
        <motion.div
          variants={itemVariants}
          className="text-center mt-10"
        >
          <motion.button
            onClick={() => {
              setModalCategory(activeCategory);
              setIsModalOpen(true);
            }}
            className="btn-secondary inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-semibold group cursor-pointer shadow-lg hover:border-primary transition-all"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>View All Projects</span>
            <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-bold">
              {projects.length}
            </span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Large All-Projects Modal Popup */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-6xl max-h-[90vh] bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10"
            >
              {/* Modal Header */}
              <div className="p-5 sm:p-6 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-elevated/80 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text-primary">
                      All Projects Archive
                    </h3>
                    <p className="text-xs text-text-muted">
                      Showing {modalProjects.length} of {projects.length} total projects
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Category Pills inside Modal */}
                  <div className="flex flex-wrap gap-1.5">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setModalCategory(cat)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                          modalCategory === cat
                            ? "bg-primary text-background font-bold shadow-sm"
                            : "bg-surface border border-border text-text-secondary hover:text-primary hover:border-primary"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Close Modal Button */}
                  <motion.button
                    onClick={() => setIsModalOpen(false)}
                    className="w-9 h-9 rounded-full bg-surface-elevated hover:bg-surface border border-border flex items-center justify-center text-text-muted hover:text-text-primary transition-colors flex-shrink-0 ml-2"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title="Close (Esc)"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>
              </div>

              {/* Modal Scrollable Projects Grid */}
              <div className="p-5 sm:p-6 overflow-y-auto max-h-[calc(90vh-100px)] custom-scrollbar">
                <motion.div
                  className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
                  layout
                >
                  {modalProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}