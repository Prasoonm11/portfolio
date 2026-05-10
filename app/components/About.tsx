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

const stats = [
  { label: "Years Experience", value: "3+", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
  { label: "Projects Completed", value: "20+", icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" },
  { label: "Technologies", value: "30+", icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" },
  { label: "Cups of Coffee", value: "∞", icon: "M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" },
];

const highlights = [
  "Problem solver with a passion for clean, maintainable code",
  "Experienced in building scalable microservices architectures",
  "Strong background in cloud-native development and DevOps",
  "Active open source contributor and tech community member",
  "Continuously learning and exploring new technologies",
];

export default function About() {
  return (
    <section id="about" className="section-container">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="mb-16">
          <span className="eyebrow">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            About Me
          </span>
          <h2 className="section-title">
            Crafting Digital
            <span className="gradient-text"> Experiences</span>
          </h2>
          <p className="section-subtitle">
            A passionate developer dedicated to building impactful software solutions
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Image & Info */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Profile Card */}
            <div className="card">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                {/* Avatar placeholder */}
                <div className="w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-border">
                  <div className="text-center">
                    <div className="text-4xl font-black gradient-text">PM</div>
                    <div className="text-xs text-text-muted mt-1">Avatar</div>
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl font-bold">Prasoon Mathur</h3>
                    <p className="text-text-secondary">Full Stack Developer</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {["React", "Node.js", "TypeScript", "Python"].map((tech) => (
                      <span key={tech} className="tag">{tech}</span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 pt-2">
                    <div className="flex items-center gap-2 text-sm text-text-muted">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      India
                    </div>
                    <div className="flex items-center gap-2 text-sm text-text-muted">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Open to Work
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="card text-center py-5"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, borderColor: "rgba(245,158,11,0.3)" }}
                >
                  <svg className="w-6 h-6 mx-auto mb-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                  </svg>
                  <div className="text-2xl font-black gradient-text">{stat.value}</div>
                  <div className="text-xs text-text-muted mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Bio & Highlights */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="w-1.5 h-6 rounded-full bg-primary" />
                Who I Am
              </h3>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  I am a passionate Full Stack Developer with expertise in building modern web applications
                  and scalable backend systems. My journey in tech started with a curiosity for how things
                  work, which evolved into a deep appreciation for elegant, efficient code.
                </p>
                <p>
                  Currently working on exciting projects in the blockchain and cloud infrastructure space,
                  I bring a blend of technical expertise and creative problem-solving to every challenge.
                  I believe in writing code that's not just functional, but maintainable and scalable.
                </p>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="w-1.5 h-6 rounded-full bg-secondary" />
                Key Highlights
              </h3>
              <ul className="space-y-3">
                {highlights.map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-text-secondary">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Download Resume Button */}
            <motion.a
              href="#contact"
              className="btn-primary w-full justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Resume
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}