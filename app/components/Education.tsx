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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

const education = [
  {
    id: 1,
    degree: "Bachelor of Technology",
    field: "Computer Science & Engineering",
    institution: "Indian Institute of Technology",
    period: "2018 - 2022",
    grade: "8.5 CGPA",
    description: "Specialized in Software Engineering and Distributed Systems. Active member of the Programming Club and Open Source Community.",
    activities: [
      "Winner, CodeStorm 2020 Hackathon",
      "Technical Lead, Web Development Club",
      "Published research paper on distributed computing",
    ],
    color: "#f59e0b",
  },
  {
    id: 2,
    degree: "Higher Secondary",
    field: "Science (PCM)",
    institution: "Delhi Public School",
    period: "2016 - 2018",
    grade: "92%",
    description: "Excelled in Mathematics and Physics while participating in various coding competitions and tech festivals.",
    activities: [
      "National Science Olympiad Participant",
      "School Captain",
      "JEE Main AIR 2345",
    ],
    color: "#06b6d4",
  },
];

export default function Education() {
  return (
    <section id="education" className="section-container">
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
            </svg>
            Education
          </span>
          <h2 className="section-title">
            Academic
            <span className="gradient-text"> Background</span>
          </h2>
          <p className="section-subtitle">
            My educational journey and achievements
          </p>
        </motion.div>

        {/* Education Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              variants={itemVariants}
              className="card relative overflow-hidden"
              whileHover={{ y: -8, borderColor: edu.color + "50" }}
            >
              {/* Decorative Sidebar */}
              <div
                className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
                style={{ background: `linear-gradient(to bottom, ${edu.color}, transparent)` }}
              />

              {/* Content */}
              <div className="pl-4">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <motion.div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                      style={{ background: edu.color + "20" }}
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      <svg className="w-6 h-6" style={{ color: edu.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      </svg>
                    </motion.div>
                    <span className="text-xs text-text-muted">{edu.period}</span>
                  </div>
                  <div
                    className="px-3 py-1.5 rounded-full text-sm font-bold"
                    style={{ background: edu.color + "20", color: edu.color }}
                  >
                    {edu.grade}
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-1">{edu.degree}</h3>
                <p className="text-text-secondary mb-2">{edu.field}</p>
                <p className="text-primary font-medium mb-4">{edu.institution}</p>

                <p className="text-sm text-text-muted mb-4">{edu.description}</p>

                {/* Activities */}
                <div className="border-t border-border pt-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">Achievements</h4>
                  <ul className="space-y-2">
                    {edu.activities.map((activity, i) => (
                      <motion.li
                        key={i}
                        className="flex items-center gap-2 text-sm text-text-secondary"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: edu.color }} />
                        {activity}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}