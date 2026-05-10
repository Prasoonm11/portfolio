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

const certifications = [
  {
    id: 1,
    title: "AWS Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2024",
    badge: "Professional",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    color: "#ff9900",
    skills: ["Architecture", "Security", "Networking"],
  },
  {
    id: 2,
    title: "Google Cloud Professional",
    issuer: "Google Cloud",
    date: "2024",
    badge: "Data Engineer",
    icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
    color: "#4285f4",
    skills: ["BigQuery", "Dataflow", "Pub/Sub"],
  },
  {
    id: 3,
    title: "Certified Kubernetes Administrator",
    issuer: "CNCF",
    date: "2023",
    badge: "CKA",
    icon: "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01",
    color: "#326ce5",
    skills: ["Kubernetes", "Docker", "Helm"],
  },
  {
    id: 4,
    title: "Meta Frontend Developer",
    issuer: "Meta (Facebook)",
    date: "2023",
    badge: "Professional",
    icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
    color: "#0081fb",
    skills: ["React", "JavaScript", "CSS"],
  },
  {
    id: 5,
    title: "MongoDB Developer",
    issuer: "MongoDB University",
    date: "2023",
    badge: "Certification",
    icon: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4",
    color: "#47a248",
    skills: ["MongoDB", "Aggregation", "Indexes"],
  },
  {
    id: 6,
    title: "Python for Data Science",
    issuer: "IBM",
    date: "2022",
    badge: "Badge",
    icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    color: "#3776ab",
    skills: ["Pandas", "NumPy", "Visualization"],
  },
];

export default function Certifications() {
  return (
    <section id="certifications" className="section-container">
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            Credentials
          </span>
          <h2 className="section-title">
            Certifications &
            <span className="gradient-text"> Achievements</span>
          </h2>
          <p className="section-subtitle">
            Professional certifications that validate my skills
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              variants={itemVariants}
              className="card group relative overflow-hidden"
              whileHover={{ y: -8, scale: 1.02, borderColor: cert.color + "50" }}
            >
              {/* Hover Glow */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${cert.color}15, transparent 70%)`,
                }}
              />

              <div className="relative">
                {/* Icon & Badge */}
                <div className="flex items-start justify-between mb-4">
                  <motion.div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ background: cert.color + "20" }}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <svg
                      className="w-7 h-7"
                      style={{ color: cert.color }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={cert.icon} />
                    </svg>
                  </motion.div>

                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold"
                    style={{ background: cert.color + "20", color: cert.color }}
                  >
                    {cert.badge}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold mb-1 group-hover:text-white transition-colors">
                  {cert.title}
                </h3>
                <p className="text-sm text-text-muted mb-1">{cert.issuer}</p>
                <p className="text-xs text-text-muted/60 mb-4">{cert.date}</p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {cert.skills.map((skill) => (
                    <span key={skill} className="tag text-[10px]">
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Verify Button */}
                <motion.button
                  className="w-full mt-4 py-2 rounded-lg text-xs font-semibold transition-colors"
                  style={{ background: cert.color + "10", color: cert.color }}
                  whileHover={{ background: cert.color + "20" }}
                  whileTap={{ scale: 0.98 }}
                >
                  Verify Certificate
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}