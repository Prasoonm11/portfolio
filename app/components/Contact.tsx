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
    transition: { type: "spring" as const, stiffness: 100, damping: 15 }
  }
};

const socialLinks = [
  {
    name: "Email",
    href: "mailto:prasoonmathur06@gmail.com",
    icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    color: "#f59e0b",
    description: "prasoonmathur06@gmail.com",
  },
  {
    name: "GitHub",
    href: "https://github.com/Prasoonm11",
    icon: "M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z",
    color: "#a1a1aa",
    description: "@Prasoonm11",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/prasoonmathur11",
    icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    color: "#0077b5",
    description: "Prasoon Mathur",
  },
];

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      setErrorMessage("Please set NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY in .env.local to enable email sending.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formState.name,
          email: formState.email,
          subject: formState.subject || "New Message from Portfolio",
          message: formState.message,
          from_name: "Portfolio Contact Form",
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        setFormState({ name: "", email: "", subject: "", message: "" });
      } else {
        setErrorMessage(data.message || "Failed to send message. Please try again.");
      }
    } catch (err: any) {
      setErrorMessage(err?.message || "Network error. Please try again or reach out via email directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-container">
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contact
          </span>
          <h2 className="section-title">
            Let&apos;s
            <span className="gradient-text"> Connect</span>
          </h2>
          <p className="section-subtitle">
            Have a project in mind or just want to chat? I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Contact Form */}
          <motion.div variants={itemVariants} className="h-full flex flex-col">
            <div className="card h-full flex flex-col justify-between">
              {submitted ? (
                <motion.div
                  className="text-center py-12 my-auto"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <motion.div
                    className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  >
                    <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-text-muted mb-6">I&apos;ll get back to you within 24 hours.</p>
                  <motion.button
                    onClick={() => setSubmitted(false)}
                    className="text-primary font-medium"
                    whileHover={{ scale: 1.05 }}
                  >
                    Send another message
                  </motion.button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-text-secondary">Name</label>
                        <input
                          type="text"
                          required
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-surface-elevated border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-colors outline-none text-text-primary"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-text-secondary">Email</label>
                        <input
                          type="email"
                          required
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-surface-elevated border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-colors outline-none text-text-primary"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-text-secondary">Subject</label>
                      <input
                        type="text"
                        required
                        value={formState.subject}
                        onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-surface-elevated border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-colors outline-none text-text-primary"
                        placeholder="Project Inquiry"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-text-secondary">Message</label>
                      <textarea
                        required
                        rows={5}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-surface-elevated border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-colors outline-none resize-none text-text-primary"
                        placeholder="Tell me about your project..."
                      />
                    </div>

                    {errorMessage && (
                      <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                        <span>{errorMessage}</span>
                        <a
                          href={`mailto:prasoonmathur06@gmail.com?subject=${encodeURIComponent(formState.subject || "Portfolio Inquiry")}&body=${encodeURIComponent(formState.message)}`}
                          className="underline font-bold text-red-300 whitespace-nowrap hover:text-white transition-colors"
                        >
                          Send via Email App ↗
                        </a>
                      </div>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full justify-center"
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="h-full flex flex-col">
            <div className="card h-full flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold mb-2">Connect With Me</h3>
                <p className="text-sm text-text-muted mb-6">
                  Feel free to reach out directly via email or connect with me on these platforms.
                </p>

                <div className="space-y-4">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-xl bg-surface-elevated hover:bg-surface-hover transition-colors group border border-border/40"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ x: 6 }}
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: link.color + "20" }}
                      >
                        <svg
                          className="w-6 h-6"
                          style={{ color: link.color }}
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d={link.icon} />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-text-primary group-hover:text-primary transition-colors">{link.name}</div>
                        <div className="text-sm text-text-muted truncate">{link.description}</div>
                      </div>
                      <svg
                        className="w-5 h-5 text-text-muted group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Status / Availability Footer */}
              <div className="pt-6 border-t border-border mt-6">
                <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-surface-elevated border border-border/50">
                  <div>
                    <p className="text-xs font-semibold text-text-primary">Available for Opportunities</p>
                    <p className="text-[11px] text-text-muted">Open to full-time roles, part-time roles, internships and freelance opportunities.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}