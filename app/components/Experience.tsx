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
    role: "Senior Full Stack Developer",
    company: "TechCorp Solutions",
    period: "2023 - Present",
    type: "Full-time",
    description: "Leading development of enterprise SaaS applications, mentoring junior developers, and architecting scalable microservices solutions.",
    highlights: [
      "Reduced API response time by 40% through optimization",
      "Led team of 5 developers on major product launch",
      "Implemented CI/CD pipeline reducing deployment time by 60%",
    ],
    tech: ["React", "Node.js", "PostgreSQL", "AWS", "Docker"],
    color: "#f59e0b",
  },
  {
    id: 2,
    role: "Full Stack Developer",
    company: "StartupXYZ",
    period: "2021 - 2023",
    type: "Full-time",
    description: "Built and maintained full-stack web applications from scratch. Worked closely with product team to deliver features on time.",
    highlights: [
      "Developed real-time collaboration features serving 10k+ users",
      "Migrated legacy codebase to modern React architecture",
      "Created internal tools improving team productivity by 30%",
    ],
    tech: ["Next.js", "TypeScript", "MongoDB", "Redis"],
    color: "#06b6d4",
  },
  {
    id: 3,
    role: "Software Developer Intern",
    company: "CodeFactory Inc",
    period: "2020 - 2021",
    type: "Internship",
    description: "Contributed to frontend development and bug fixes. Learned industry best practices and agile development workflows.",
    highlights: [
      "Fixed 50+ bugs in production codebase",
      "Built automated testing suite covering 80% of components",
      "Received return offer for full-time position",
    ],
    tech: ["React", "JavaScript", "Jest", "Git"],
    color: "#a855f7",
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