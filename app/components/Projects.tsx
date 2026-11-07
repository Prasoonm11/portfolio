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
  detailedDescription?: string;
  highlights?: string[];
  tags: string[];
  category: string;
  gradient: string;
  accent: string;
  image: string;
  github: string;
  live?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "NPTEL Certificate Management System",
    description: "Built certificate submission, verification, QR validation, and tamper-proof PDF generation. Features dockerized full-stack deployment and role-based portals.",
    detailedDescription: "A comprehensive, enterprise-grade certificate lifecycle platform developed for the NPTEL Student Chapter at MUJ. The system automates certificate submission, multi-tier administrative verification, cryptographic QR validation, and instantaneous tamper-proof PDF generation. Built with a microservice architecture and containerized with Docker for seamless high-load student onboarding.",
    highlights: [
      "Role-based access control (RBAC) with segregated Admin, Verifier, and Student dashboards.",
      "Cryptographic QR validation engine for instantaneous certificate authenticity checks.",
      "Automated tamper-proof PDF generation and bulk dispatch pipelines.",
      "Dockerized full-stack deployment ensuring 99.9% uptime and zero-configuration environment setup."
    ],
    tags: ["React", "Express", "FastAPI", "Appwrite", "Docker"],
    category: "Web App",
    gradient: "from-amber-500/20 to-orange-500/20",
    accent: "#f59e0b",
    image: "/ProjectCover/nptel.png",
    github: "https://github.com/SDC-MUJ/NPTEL",
    live: "https://nptel.sdcmuj.com/",
  },
  {
    id: 2,
    title: "InterviAI – AI Interview Platform",
    description: "An AI-powered interview platform with dashboards for recruiters, candidates, and admins. Includes JWT auth, AI feedback, live timer, notifications, and chat.",
    detailedDescription: "An end-to-end intelligent mock interview and technical evaluation system. Leveraging Google Gemini AI, InterviAI conducts dynamic contextual technical interviews, evaluates code and speech responses in real-time, and provides granular scorecards with actionable feedback. Features WebSocket-powered bi-directional chat, real-time proctoring timers, and multi-tenant recruiter portals.",
    highlights: [
      "Integrated Gemini AI for dynamic interview questioning, contextual response evaluation, and scoring.",
      "Real-time communication using Socket.IO for live feedback, timers, and interactive chat.",
      "Multi-tier JWT authentication with secure session handling for Recruiters, Candidates, and Admins.",
      "Granular analytics dashboard charting candidate competencies, weak points, and historical progression."
    ],
    tags: ["MERN", "Gemini AI", "Socket.IO", "React", "Node.js", "Express.js", "MongoDB"],
    category: "AI/ML",
    gradient: "from-cyan-500/20 to-blue-500/20",
    accent: "#06b6d4",
    image: "/ProjectCover/interviAI.png",
    github: "https://github.com/Prasoonm11/AI-Interview-Platform",
    live: "https://interviai.vercel.app/",
  },
  {
    id: 3,
    title: "BankVerse AI",
    description: "Developed a Financial Digital Twin with multi-agent AI orchestration. Implemented financial coaching, simulations, and explainable recommendations.",
    detailedDescription: "A cutting-edge financial intelligence platform featuring an autonomous Financial Digital Twin powered by multi-agent AI orchestration. BankVerse models user spending, investment vectors, and long-term liabilities to simulate economic futures under various market conditions, delivering personalized, explainable financial coaching and actionable portfolio optimizations.",
    highlights: [
      "Multi-agent autonomous AI architecture for specialized financial reasoning and risk modeling.",
      "Predictive Financial Digital Twin simulating wealth trajectory under diverse macro scenarios.",
      "Interactive simulation engine with explainable, guard-railed recommendations.",
      "High-performance responsive UI built with Next.js App Router and TypeScript."
    ],
    tags: ["Next.js", "TypeScript", "Node.js", "AI Agents"],
    category: "AI/ML",
    gradient: "from-purple-500/20 to-pink-500/20",
    accent: "#a855f7",
    image: "/ProjectCover/Bankverse.png",
    github: "https://github.com/Prasoonm11/BankVerse-Ai",
    live: "https://bank-verse-ai.vercel.app/",
  },
  {
    id: 4,
    title: "Autonomous Driver Recognition & AI Digital Twin",
    description: "Built edge AI driver recognition system with biometric fusion. Integrates a digital twin for predictive maintenance and smart cabin personalization.",
    detailedDescription: "An intelligent in-cabin automotive system combining edge AI facial and biometric recognition with an IoT-connected vehicle digital twin. The edge system authenticates drivers instantaneously to load personalized cabin ergonomics, climate, and infotainment presets, while streaming sensor telemetry to a digital twin for predictive component wear and real-time anomaly detection.",
    highlights: [
      "Real-time edge facial recognition and biometric fusion running on TensorFlow Lite and OpenCV.",
      "Vehicle Digital Twin syncing telemetry for predictive maintenance and fault diagnosis.",
      "Smart cabin personalization orchestrating seat positions, mirrors, and climate profiles.",
      "Engineered and optimized for resource-constrained embedded automotive hardware."
    ],
    tags: ["Python", "OpenCV", "TensorFlow Lite", "Edge AI"],
    category: "AI/ML",
    gradient: "from-emerald-500/20 to-teal-500/20",
    accent: "#10b981",
    image: "/ProjectCover/driver%20Digital%20Twin.png",
    github: "https://github.com/Prasoonm11/AARAAIDDT",
    live: "https://aaraaiddt.vercel.app/",
  },
  {
    id: 5,
    title: "AlignHQ",
    description: "A goal management portal featuring detailed analytics, approval workflows, and role-based access control. Integrated Supabase Auth, PostgreSQL, and RLS.",
    detailedDescription: "A collaborative OKR and goal-tracking SaaS application built for modern engineering teams. AlignHQ enables organizations to cascade high-level corporate objectives down to individual team key results, with multi-stage approval workflows, automated status tracking, granular row-level security (RLS), and dynamic KPI analytics.",
    highlights: [
      "Hierarchical goal & OKR cascades with real-time percentage completion and milestone tracking.",
      "Strict multi-tenant isolation and security powered by PostgreSQL Row Level Security (RLS).",
      "Automated multi-level manager approval workflows with immutable audit logs.",
      "Intuitive visual dashboards for organization-wide alignment and team velocity tracking."
    ],
    tags: ["Next.js", "TypeScript", "Supabase", "PostgreSQL"],
    category: "SaaS",
    gradient: "from-blue-500/20 to-indigo-500/20",
    accent: "#3b82f6",
    image: "/ProjectCover/Alignhq.png",
    github: "https://github.com/Prasoonm11/IHGSTP",
    live: "https://ihgstp.vercel.app/",
  },
  {
    id: 6,
    title: "Dynamic Conference Website",
    description: "Real-time editable conference website with admin dashboard, optimized media uploads, and secure content management.",
    detailedDescription: "A dynamic, CMS-driven web portal engineered for academic and tech conferences. Designed with a real-time admin portal that enables non-technical organizers to modify event schedules, speaker profiles, workshop tracks, and downloadable conference proceedings without redeploying code.",
    highlights: [
      "Live content management dashboard powered by Supabase and Next.js.",
      "Secure media upload pipelines with image optimization and cloud storage.",
      "Interactive conference timeline and schedule filtering by day and speaker.",
      "SEO optimized and mobile responsive with sub-second page loads."
    ],
    tags: ["Next.js", "Supabase", "Tailwind CSS", "PostgreSQL"],
    category: "Web App",
    gradient: "from-rose-500/20 to-red-500/20",
    accent: "#f43f5e",
    image: "/ProjectCover/website.png",
    github: "https://github.com/Prasoonm11/website-replication-II",
    live: "https://website-replication-ii.vercel.app/login",
  },
  {
    id: 7,
    title: "Multi-Gesture Recognition (sEMG)",
    description: "Hybrid Machine Learning + Spiking Neural Network (SNN) gesture recognition system. Achieved 96.25% classification accuracy for stroke rehabilitation.",
    detailedDescription: "A pioneering biomedical computing project utilizing surface Electromyography (sEMG) signals to decode complex neuromuscular hand gestures. By integrating temporal feature extraction with hybrid Machine Learning classifiers and Spiking Neural Networks (SNNs via snnTorch), the system achieves 96.25% classification accuracy to drive assistive robotic prosthetics and rehabilitation devices.",
    highlights: [
      "Achieved 96.25% classification accuracy on multi-channel sEMG biosignals.",
      "Implemented neuromorphic Spiking Neural Networks (SNNs) using snnTorch for ultra-low latency.",
      "Advanced signal filtering, Butterworth bandpass, and wavelet feature extraction.",
      "Direct clinical application in stroke patient rehabilitation and prosthetic hand control."
    ],
    tags: ["Python", "Scikit-learn", "SNNTorch", "Signal Processing"],
    category: "AI/ML",
    gradient: "from-violet-500/20 to-purple-500/20",
    accent: "#8b5cf6",
    image: "/ProjectCover/semg.png",
    github: "https://github.com/Prasoonm11/Multi-Gesture-Recognition-for-Stroke-Rehabilitation-Using-sEMG-Signals",
  },
  {
    id: 8,
    title: "BrokeBuddy",
    description: "Chat-based AI financial advisor delivering personalized budgeting insights, financial simulations, and expense advice.",
    detailedDescription: "A conversational personal finance companion that transforms complex financial planning into natural language dialogs. BrokeBuddy ingests user transaction history, flags recurring wasteful subscriptions, forecasts month-end balances, and offers conversational scenario planning to help young professionals stay on budget.",
    highlights: [
      "Conversational AI financial interface with contextual session memory and intent recognition.",
      "Automated expense categorization and recurring subscription detection.",
      "Real-time budgeting forecasting and proactive deficit alerts.",
      "Modern dark-mode user interface built with Next.js and Tailwind CSS."
    ],
    tags: ["Next.js", "TypeScript", "AI", "Tailwind CSS"],
    category: "AI/ML",
    gradient: "from-pink-500/20 to-rose-500/20",
    accent: "#ec4899",
    image: "/ProjectCover/brokebuddy.png",
    github: "https://github.com/vinayaktyagi10/BrokeBuddy",
  },
  {
    id: 9,
    title: "Driftless — Position Fusion",
    description: "Developing a phone-based position fusion engine for an ISRO Smart India Hackathon navigation system. Combines GPS and motion sensors for dead reckoning, GPS recovery correction, and road matching during signal outages.",
    detailedDescription: "Engineered for the ISRO Smart India Hackathon, Driftless is an advanced on-device vehicular position fusion engine. By fusing raw GNSS signals with smartphone IMU sensors (accelerometer, gyroscope, magnetometer) through extended Kalman filters and dead reckoning, it provides continuous, drift-resilient lane-level navigation through tunnels, urban canyons, and satellite outages.",
    highlights: [
      "High-rate sensor fusion combining IMU telemetry and GNSS data via Kalman filtering.",
      "Continuous dead reckoning algorithm delivering smooth navigation during complete signal blackouts.",
      "Automated GPS recovery smoothing and map-matching algorithms.",
      "Engineered for real-world deployment on commercial Android smartphones."
    ],
    tags: ["Android", "GPS", "Sensor Fusion", "Dead Reckoning", "Road Matching"],
    category: "Mobile App",
    gradient: "from-sky-500/20 to-indigo-500/20",
    accent: "#0ea5e9",
    image: "/ProjectCover/driftless.png",
    github: "https://github.com/vinayaktyagi10/driftless",
    live: "https://www.youtube.com/shorts/NFNJxdMIEGg",
  },
  {
    id: 10,
    title: "Music Player App",
    description: "Android music app with listener and artist workflows, cloud song browsing, local playback, favorites, and a full-screen player. Includes artist uploads and cloud-backed song metadata.",
    detailedDescription: "A full-featured native Android audio streaming and local playback application built in Kotlin. Architected with distinct listener and creator workflows, allowing musicians to upload tracks and artwork to cloud storage while listeners enjoy background audio playback with lock-screen media controls, dynamic queue management, and offline caching.",
    highlights: [
      "Robust audio engine powered by Android Jetpack Media3 and ExoPlayer with background playback service.",
      "Dual-role workflows for both artists (cloud uploads & metadata management) and listeners.",
      "Cloud audio streaming and storage integrated with Supabase and Firebase backend.",
      "Modern, polished Material You UI with full-screen playback and animated waveform visualizations."
    ],
    tags: ["Kotlin", "Android", "Firebase", "Supabase Storage", "Media3 ExoPlayer"],
    category: "Mobile App",
    gradient: "from-fuchsia-500/20 to-violet-500/20",
    accent: "#d946ef",
    image: "/ProjectCover/musicplayer.png",
    github: "https://github.com/Prasoonm11/musicplayer",
  },
];

const categories = ["All", "Web App", "AI/ML", "SaaS", "Mobile App"];

function ProjectCard({
  project,
  onSelect,
}: {
  project: Project;
  onSelect: (project: Project) => void;
}) {
  const hasLiveUrl = Boolean(
    project.live &&
    project.live.trim() !== "" &&
    !project.live.includes("github.com")
  );

  return (
    <motion.div
      key={project.id}
      onClick={() => onSelect(project)}
      className="group card overflow-hidden p-0 flex flex-col justify-between cursor-pointer border border-border hover:border-neutral-500/50 transition-all duration-300"
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

          {/* Quick Action Links (with stopPropagation) */}
          <div
            className="absolute top-3.5 right-3.5 flex gap-2 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {project.github && (
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
            )}
            {hasLiveUrl && (
              <motion.a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-background/85 backdrop-blur-md flex items-center justify-center hover:bg-background text-text-primary hover:text-primary transition-colors shadow-md"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                title={project.live?.includes("youtube") || project.live?.includes("youtu.be") ? "Watch Demo" : "Live Link"}
              >
                {project.live?.includes("youtube") || project.live?.includes("youtu.be") ? (
                  <svg className="w-3.5 h-3.5 fill-current ml-0.5" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                )}
              </motion.a>
            )}
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
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="tag text-[10px] py-0.5 px-2">
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="tag text-[10px] py-0.5 px-1.5 opacity-60">
                +{project.tags.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer: View Details Prompt */}
      <div className="px-5 pb-4 pt-1 flex items-center justify-between text-xs text-neutral-400 group-hover:text-white transition-colors border-t border-white/5">
        <span className="inline-flex items-center gap-1.5 font-medium">
          <span>View Details</span>
          <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
        <span className="text-[10px] font-mono text-neutral-500">Popup &rarr;</span>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Prevent background scrolling when either modal is active
  useEffect(() => {
    if (isModalOpen || selectedProject !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen, selectedProject]);

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selectedProject !== null) {
          setSelectedProject(null);
        } else if (isModalOpen) {
          setIsModalOpen(false);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject, isModalOpen]);

  // Filtered projects for initial section
  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter(p => p.category === activeCategory);

  // Show only first 4 projects on main page
  const visibleProjects = filteredProjects.slice(0, 4);

  // Filtered projects for archive modal
  const modalProjects = modalCategory === "All"
    ? projects
    : projects.filter(p => p.category === modalCategory);

  const isSelectedLive = Boolean(
    selectedProject?.live &&
    selectedProject.live.trim() !== "" &&
    !selectedProject.live.includes("github.com")
  );

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
            A selection of projects that showcase my skills and passion for development. Click any project to view detailed architecture and live links.
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
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={(p) => setSelectedProject(p)}
            />
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

      {/* 1. Large All-Projects Archive Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
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
                      Showing {modalProjects.length} of {projects.length} total projects · Click any card for full details
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
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
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
                    className="w-9 h-9 rounded-full bg-surface-elevated hover:bg-surface border border-border flex items-center justify-center text-text-muted hover:text-text-primary transition-colors flex-shrink-0 ml-2 cursor-pointer"
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
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onSelect={(p) => setSelectedProject(p)}
                    />
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. Dedicated Single Project Detail Pop-Up Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6 md:p-8">
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ type: "spring", damping: 26, stiffness: 320 }}
              className="relative w-full max-w-2xl max-h-[92vh] bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col z-20"
            >
              {/* Header Image with Badges & Close Button */}
              <div className="relative h-48 sm:h-60 w-full overflow-hidden flex-shrink-0">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${selectedProject.gradient} opacity-80`} />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />

                {/* Category Pill */}
                <span
                  className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md shadow-md"
                  style={{
                    background: `${selectedProject.accent}30`,
                    color: selectedProject.accent,
                    border: `1px solid ${selectedProject.accent}60`,
                  }}
                >
                  {selectedProject.category}
                </span>

                {/* Close Button */}
                <motion.button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 hover:bg-black border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Close (Esc)"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>

              {/* Scrollable Detailed Content */}
              <div className="p-6 sm:p-7 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
                {/* Title */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-snug">
                    {selectedProject.title}
                  </h3>
                  <div className="h-0.5 w-12 bg-white/20 rounded-full" />
                </div>

                {/* Detailed Overview */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                    Project Overview
                  </h4>
                  <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
                    {selectedProject.detailedDescription || selectedProject.description}
                  </p>
                </div>

                {/* Highlights / Key Features */}
                {selectedProject.highlights && selectedProject.highlights.length > 0 && (
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">
                      Key Highlights & Architecture
                    </h4>
                    <ul className="space-y-2.5">
                      {selectedProject.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                          <span
                            className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                            style={{ background: selectedProject.accent }}
                          />
                          <span className="leading-relaxed">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech Stack Tags */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">
                    Technologies & Libraries
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-md text-xs font-mono bg-white/5 border border-white/10 text-neutral-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Sticky Action Bar with Proper Buttons */}
              <div className="p-4 sm:p-6 border-t border-border bg-surface-elevated/90 backdrop-blur-md flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-neutral-500 font-mono hidden sm:inline-block">
                  Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-neutral-300">Esc</kbd> to exit
                </span>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  {/* GitHub Button */}
                  {selectedProject.github && (
                    <motion.a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                      </svg>
                      <span>GitHub</span>
                    </motion.a>
                  )}

                  {/* Optional Live Site / Demo Button */}
                  {isSelectedLive && (
                    <motion.a
                      href={selectedProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {selectedProject.live?.includes("youtube.com") || selectedProject.live?.includes("youtu.be") ? (
                        <>
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                          <span>Watch Demo</span>
                        </>
                      ) : (
                        <>
                          <span>Live Site</span>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </>
                      )}
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
