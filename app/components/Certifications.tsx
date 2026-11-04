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
    transition: { type: "spring" as const, stiffness: 100, damping: 15 }
  }
};

const certifications = [
  {
    id: 1,
    title: "AWS Academy Graduate - Cloud Foundations",
    issuer: "Amazon Web Services Training & Certification",
    date: "Issued by AWS · Credly",
    badge: "Training Badge",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    color: "#ff9900",
    skills: ["Cloud Foundations", "AWS Core Services", "Cloud Security", "Architecture"],
    url: "https://www.credly.com/org/amazon-web-services",
  },
  {
    id: 2,
    title: "NVIDIA: Prompt Engineering and Data Analysis",
    issuer: "NVIDIA (via Coursera)",
    date: "May 18, 2025 · ~3 Hours",
    badge: "Verified Course",
    icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
    color: "#76b900",
    skills: ["Prompt Engineering", "Data Analysis", "LLMs", "Generative AI"],
    url: "https://www.coursera.org/learn/nvidia-prompt-engineering-and-data-analysis",
  },
  {
    id: 3,
    title: "Crash Course on Python",
    issuer: "Google (via Coursera)",
    date: "December 26, 2024 · ~20 Hours",
    badge: "Verified Course",
    icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
    color: "#3776ab",
    skills: ["Python", "Data Structures", "Automation", "OOP"],
    url: "https://www.coursera.org/learn/python-crash-course",
  },
  {
    id: 4,
    title: "Chatbot Building Essentials with IBM watsonx Assistant (V2)",
    issuer: "IBM (via Coursera & Credly)",
    date: "Issued by Coursera · Authorized by IBM",
    badge: "IBM Authorized",
    icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z",
    color: "#0f62fe",
    skills: ["watsonx Assistant", "Chatbots", "Conversational AI", "NLP"],
    url: "https://www.credly.com/org/ibm",
  },
  {
    id: 5,
    title: "Google Cloud Basics",
    issuer: "Google Cloud (via Credly)",
    date: "Verified Credential",
    badge: "Credly Badge",
    icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 00-9.78 2.096A4.001 4.001 0 003 15z",
    color: "#4285f4",
    skills: ["Google Cloud Platform", "Cloud Architecture", "GCP Fundamentals"],
    url: "https://www.credly.com/users/prasoon-mathur.0ffcc419/badges/credly",
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
          {certifications.map((cert) => (
            <motion.div
              key={cert.id}
              variants={itemVariants}
              className="card group relative overflow-hidden flex flex-col justify-between"
              whileHover={{ y: -8, scale: 1.02, borderColor: cert.color + "50" }}
            >
              {/* Hover Glow */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${cert.color}15, transparent 70%)`,
                }}
              />

              <div className="relative flex-1 flex flex-col justify-between">
                <div>
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
                  <div className="flex flex-wrap gap-2 mb-4">
                    {cert.skills.map((skill) => (
                      <span key={skill} className="tag text-[10px]">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Verify Credential Link */}
                <motion.a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-4 py-2.5 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                  style={{ background: cert.color + "15", color: cert.color }}
                  whileHover={{ background: cert.color + "25" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Verify Credential</span>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}