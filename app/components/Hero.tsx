"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Cube3D from "./Cube3D";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const roles = [
    "Full Stack Developer",
    "Backend Engineer",
    "Cloud Architect",
    "Open Source Enthusiast"
  ];
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Parallax transforms for background elements
  const orbX = useTransform(mouseX, [-1, 1], [-30, 30]);
  const orbY = useTransform(mouseY, [-1, 1], [-30, 30]);
  const gridX = useTransform(mouseX, [-1, 1], [-15, 15]);
  const gridY = useTransform(mouseY, [-1, 1], [-15, 15]);

  useEffect(() => {
    setMounted(true);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Cursor blink
    const cursorInterval = setInterval(() => {
      setCursorVisible(v => !v);
    }, 500);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(cursorInterval);
    };
  }, [mouseX, mouseY]);

  // Typewriter effect
  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typeSpeed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentRole.length) {
          setTypedText(currentRole.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 2500);
        }
      } else {
        if (charIndex > 0) {
          setTypedText(currentRole.slice(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 }
    }
  };

  if (!mounted) {
    return (
      <section className="relative min-h-[100dvh] flex items-center justify-center bg-black">
        <div className="animate-shimmer w-full max-w-4xl h-96 rounded-3xl" />
      </section>
    );
  }

  return (
    <section ref={containerRef} className="relative min-h-[100dvh] flex items-center overflow-hidden bg-black noise-bg py-20 lg:py-0">
      {/* Ambient background styling */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Soft white spotlights */}
        <motion.div
          className="absolute -top-1/4 -left-1/4 w-[60%] h-[60%] rounded-full blur-[140px] pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.035) 0%, transparent 70%)",
            x: orbX,
            y: orbY,
          }}
        />
        <motion.div
          className="absolute -bottom-1/4 -right-1/4 w-[50%] h-[50%] rounded-full blur-[120px] pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)",
            x: orbX,
            y: orbY,
          }}
        />

        {/* Minimal grid pattern */}
        <motion.div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            x: gridX,
            y: gridY,
          }}
        />

        {/* Shadow overlay to fade the grid */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#000000_75%)] pointer-events-none" />
      </div>

      {/* Main Grid Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <motion.div
          className="grid lg:grid-cols-12 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column: Heading and copy */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Status Badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-medium uppercase tracking-[0.2em] bg-neutral-900 border border-neutral-800 text-neutral-300">
                <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-emerald-500"
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                Available for Opportunities
              </span>
            </motion.div>

            {/* Premium Serif Name */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight mb-6 leading-none text-white font-serif font-normal"
            >
              Prasoon <span className="text-neutral-500 font-light block mt-2">Mathur</span>
            </motion.h1>

            {/* Typewriter Role */}
            <motion.div variants={itemVariants} className="mb-6">
              <h2 className="text-lg md:text-xl lg:text-2xl font-light text-neutral-400 font-sans tracking-wide">
                {typedText}
                <span
                  className="inline-block w-0.5 h-6 ml-1 align-middle"
                  style={{
                    background: "#ffffff",
                    opacity: cursorVisible ? 1 : 0,
                  }}
                />
              </h2>
            </motion.div>

            {/* Tagline description */}
            <motion.p
              variants={itemVariants}
              className="text-sm md:text-base text-neutral-400 max-w-lg mb-10 leading-relaxed font-light"
            >
              Building scalable backend systems and crafting exceptional, high-performance digital experiences. 
              Passionate about clean code, system architecture, and cutting-edge technology.
            </motion.p>

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-row items-center gap-4">
              <motion.a
                href="#projects"
                className="btn-primary group"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                View My Work
                <svg className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.a>

              <motion.a
                href="#contact"
                className="btn-secondary group"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                Get In Touch
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex items-center gap-3 mt-10">
              {[
                { name: "GitHub", href: "https://github.com", icon: "M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" },
                { name: "LinkedIn", href: "https://linkedin.com", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
                { name: "Twitter", href: "https://twitter.com", icon: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" },
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.name}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right Column: 3D metallic rotating cube */}
          <div className="lg:col-span-5 w-full flex items-center justify-center select-none">
            <div className="w-full relative max-w-sm aspect-square flex items-center justify-center">
              {/* Subtle spotlight glow centered on the cube */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.06)_0%,_transparent_65%)] blur-[40px] pointer-events-none" />
              <Cube3D />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-neutral-500 font-medium select-none">Scroll</span>
        <div className="w-4 h-7 rounded-full border border-neutral-800 flex justify-center pt-1 select-none">
          <motion.div
            className="w-0.5 h-1.5 rounded-full bg-neutral-500"
            animate={{ y: [0, 6, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      {/* Floating premium metallic-look dots */}
      <motion.div
        className="absolute top-1/4 left-[8%] w-1.5 h-1.5 rounded-full bg-white/20 blur-[0.5px]"
        animate={{ y: [0, -20, 0], opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-2/3 right-[12%] w-2.5 h-2.5 rounded-full bg-white/10 blur-[1px]"
        animate={{ y: [0, 15, 0], opacity: [0.1, 0.4, 0.1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      <motion.div
        className="absolute bottom-1/4 left-[15%] w-1 h-1 rounded-full bg-white/30"
        animate={{ y: [0, -10, 0], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </section>
  );
}