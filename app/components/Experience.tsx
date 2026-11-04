"use client";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 }
  }
};

const experiences = [
  {
    id: 1,
    role: "Software Development Intern",
    company: "SDC MUJ",
    period: "Jan 2026 – Present",
    type: "Internship",
    description: "Built the NPTEL Certificate Management System and a dynamic conference website using React, Next.js, FastAPI, Supabase, Docker.",
    highlights: [
      "Designed and implemented certificate submission, verification, QR validation, and tamper-proof PDF generation.",
      "Developed a real-time editable conference website with an admin dashboard, optimized media uploads, and secure content management.",
      "Dockerized the full-stack deployment for resilient execution and environment parity."
    ],
    tech: ["React", "Next.js", "FastAPI", "Supabase", "Docker"],
    color: "#f59e0b",
  },
  {
    id: 2,
    role: "Full Stack Development Intern",
    company: "Codveda Technologies",
    period: "Jun 2026 – Jul 2026",
    type: "Remote Internship",
    description: "Developed InterviAI, an AI-powered interview platform featuring recruiter, candidate, and admin dashboards.",
    highlights: [
      "Integrated Gemini AI for automated candidate evaluation and constructive feedback.",
      "Implemented role-based JSON Web Token (JWT) authentication and secure data models.",
      "Enabled real-time chat, notifications, and live timers using WebSocket/Socket.IO connections."
    ],
    tech: ["React", "Node.js", "Express.js", "MongoDB", "Gemini AI", "Socket.IO"],
    color: "#06b6d4",
  },
  {
    id: 3,
    role: "Head, Graphic Design Team",
    company: "IEEE RAS SB MUJ",
    period: "Jun 2025 – May 2026",
    type: "Leadership",
    description: "Led an 8+ member design team responsible for branding and visual assets of technical events.",
    highlights: [
      "Designed cohesive brand identities and user interfaces for technical hackathons and workshops.",
      "Established asset design guidelines to maintain visual consistency across channels.",
      "Managed project timelines and coordinated with the frontend development team."
    ],
    tech: ["Figma", "Graphic Design", "Branding", "UI Design"],
    color: "#a855f7",
  },
  {
    id: 4,
    role: "Summer Research Intern",
    company: "MNIT Jaipur",
    period: "May 2025 – Jul 2025",
    type: "Research Internship",
    description: "Developed sEMG gesture-recognition pipelines for stroke rehabilitation applications.",
    highlights: [
      "Created a hybrid Machine Learning + Spiking Neural Network (SNN) signal processing pipeline.",
      "Achieved a gesture classification accuracy of 96.25% using sEMG bio-signals.",
      "Utilized Python, Scikit-learn, and SNNTorch for feature extraction and neural modeling."
    ],
    tech: ["Python", "Scikit-learn", "SNNTorch", "Signal Processing"],
    color: "#10b981",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="section-container">
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Career
          </span>
          <h2 className="section-title">
            Work
            <span className="gradient-text"> Experience</span>
          </h2>
          <p className="section-subtitle">
            My professional journey building real-world applications
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-transparent md:-translate-x-1/2" />

          {/* Experience Cards */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                variants={itemVariants}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-background border-2 transform -translate-x-1/2 md:-translate-x-1/2 z-10"
                  style={{ borderColor: exp.color }}>
                  <motion.div
                    className="absolute inset-1 rounded-full"
                    style={{ background: exp.color }}
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>

                {/* Content */}
                <div className={`flex-1 ml-8 md:ml-0 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <motion.div
                    className="card group"
                    whileHover={{ scale: 1.02, borderColor: exp.color + "50" }}
                  >
                    {/* Header */}
                    <div className={`flex flex-wrap items-center gap-3 mb-3 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                      <span
                        className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{ background: exp.color + "20", color: exp.color }}
                      >
                        {exp.type}
                      </span>
                      <span className="text-sm text-text-muted">{exp.period}</span>
                    </div>

                    <h3 className="text-xl font-bold mb-1">{exp.role}</h3>
                    <p className="text-primary font-medium mb-3">{exp.company}</p>

                    <p className="text-text-secondary text-sm mb-4">{exp.description}</p>

                    {/* Highlights */}
                    <ul className={`space-y-2 mb-4 ${index % 2 === 0 ? "md:text-right" : ""}`}>
                      {exp.highlights.map((highlight, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-text-muted"
                        >
                          <svg
                            className="w-4 h-4 flex-shrink-0 mt-0.5"
                            style={{ color: exp.color }}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech Stack */}
                    <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                      {exp.tech.map((tech) => (
                        <span key={tech} className="tag text-[10px]">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}