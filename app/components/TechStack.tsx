"use client";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 }
  }
};

const skillCategories = [
  {
    title: "Frontend",
    icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    color: "#38bdf8",
    skills: [
      { name: "React", level: 95 },
      { name: "Next.js", level: 90 },
      { name: "TypeScript", level: 92 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Framer Motion", level: 85 },
      { name: "Redux", level: 80 },
    ],
  },
  {
    title: "Backend",
    icon: "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01",
    color: "#a855f7",
    skills: [
      { name: "Node.js", level: 90 },
      { name: "Python", level: 85 },
      { name: "PostgreSQL", level: 88 },
      { name: "MongoDB", level: 82 },
      { name: "Redis", level: 78 },
      { name: "GraphQL", level: 80 },
    ],
  },
  {
    title: "DevOps & Cloud",
    icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
    color: "#f59e0b",
    skills: [
      { name: "AWS", level: 85 },
      { name: "Docker", level: 90 },
      { name: "Kubernetes", level: 78 },
      { name: "CI/CD", level: 88 },
      { name: "Terraform", level: 70 },
      { name: "Linux", level: 82 },
    ],
  },
  {
    title: "Tools & Others",
    icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
    color: "#10b981",
    skills: [
      { name: "Git", level: 95 },
      { name: "VS Code", level: 95 },
      { name: "Figma", level: 75 },
      { name: "Postman", level: 90 },
      { name: "Vim", level: 65 },
      { name: "Notion", level: 85 },
    ],
  },
];

const tools = [
  { name: "VS Code", icon: "V", color: "#007acc" },
  { name: "Git", icon: "G", color: "#f05032" },
  { name: "Docker", icon: "D", color: "#2496ed" },
  { name: "Postman", icon: "P", color: "#ff6c37" },
  { name: "Figma", icon: "F", color: "#f24e1e" },
  { name: "Notion", icon: "N", color: "#000000" },
  { name: "Slack", icon: "S", color: "#4a154b" },
  { name: "Vercel", icon: "V", color: "#000000" },
];

export default function TechStack() {
  return (
    <section id="skills" className="section-container">
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Expertise
          </span>
          <h2 className="section-title">
            Tech
            <span className="gradient-text"> Stack</span>
          </h2>
          <p className="section-subtitle">
            Technologies and tools I work with daily
          </p>
        </motion.div>

        {/* Skill Categories */}
        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              className="card"
              whileHover={{ borderColor: category.color + "40" }}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: category.color + "20" }}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <svg
                    className="w-6 h-6"
                    style={{ color: category.color }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={category.icon} />
                  </svg>
                </motion.div>
                <h3 className="text-xl font-bold">{category.title}</h3>
              </div>

              {/* Skills */}
              <div className="space-y-4">
                {category.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-sm font-medium text-text-secondary">{skill.name}</span>
                      <span className="text-xs font-mono text-text-muted">{skill.level}%</span>
                    </div>
                    <div className="progress-bar">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${category.color}, ${category.color}aa)`,
                          width: `${skill.level}%`
                        }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.8, delay: index * 0.05, ease: "easeOut" }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Tools */}
        <motion.div variants={itemVariants} className="mt-12">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Daily Driver Tools
          </h3>
          <div className="flex flex-wrap gap-3">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.name}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface border border-border hover:border-primary/30 transition-colors cursor-default"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -4, scale: 1.05 }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
                  style={{ background: tool.color + "20", color: tool.color }}
                >
                  {tool.icon}
                </div>
                <span className="text-sm font-medium text-text-secondary">{tool.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}