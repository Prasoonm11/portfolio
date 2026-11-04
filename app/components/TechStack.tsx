"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Interface for physical balls inside the jar
interface Ball {
  name: string;
  level: number;
  color: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  mass: number;
}

// Unified skills database with category mapping and brand colors
const skillsData = [
  // Languages
  { name: "Python", category: "Languages", level: 90, color: "#3776AB" },
  { name: "TypeScript", category: "Languages", level: 88, color: "#3178C6" },
  { name: "JavaScript", category: "Languages", level: 92, color: "#F7DF1E" },
  { name: "Kotlin", category: "Languages", level: 86, color: "#7F52FF" },
  { name: "C++", category: "Languages", level: 85, color: "#00599C" },
  { name: "Java", category: "Languages", level: 80, color: "#E76F51" },

  // Mobile
  { name: "Android", category: "Mobile", level: 88, color: "#3DDC84" },
  { name: "Sensor Fusion", category: "Mobile", level: 82, color: "#0EA5E9" },

  // Frontend
  { name: "React", category: "Frontend", level: 92, color: "#61DAFB" },
  { name: "Next.js", category: "Frontend", level: 90, color: "#FFFFFF" },
  { name: "HTML & CSS", category: "Frontend", level: 95, color: "#E34F26" },
  { name: "Tailwind CSS", category: "Frontend", level: 95, color: "#06B6D4" },
  { name: "Framer Motion", category: "Frontend", level: 85, color: "#FF00C7" },
  { name: "Figma", category: "Frontend", level: 80, color: "#F24E1E" },

  // Backend
  { name: "Node.js", category: "Backend", level: 88, color: "#339933" },
  { name: "Express.js", category: "Backend", level: 88, color: "#FFFFFF" },
  { name: "FastAPI", category: "Backend", level: 85, color: "#009688" },
  { name: "Socket.IO", category: "Backend", level: 82, color: "#FFFFFF" },

  // Databases
  { name: "MongoDB", category: "Databases", level: 85, color: "#47A248" },
  { name: "PostgreSQL", category: "Databases", level: 88, color: "#336791" },
  { name: "Supabase", category: "Databases", level: 90, color: "#3ECF8E" },
  { name: "Firebase", category: "Databases", level: 86, color: "#FFCA28" },
  { name: "Appwrite", category: "Databases", level: 82, color: "#FD366E" },

  // DevOps
  { name: "Docker", category: "DevOps", level: 88, color: "#2496ed" },
  { name: "Git & GitHub", category: "DevOps", level: 92, color: "#F05032" },
  { name: "VS Code", category: "DevOps", level: 95, color: "#007ACC" },
  { name: "Postman", category: "DevOps", level: 85, color: "#FF6C37" },

  // AI & ML
  { name: "Gemini AI", category: "AI/ML", level: 90, color: "#9B72CB" },
  { name: "OpenCV", category: "AI/ML", level: 85, color: "#ef4444" },
  { name: "TensorFlow Lite", category: "AI/ML", level: 80, color: "#FF6F00" },
  { name: "Scikit-learn", category: "AI/ML", level: 85, color: "#F89939" },
  { name: "SNNTorch", category: "AI/ML", level: 82, color: "#E74C3C" },
  { name: "AI Agents", category: "AI/ML", level: 85, color: "#9B59B6" },
];

// Reusable SVG logo library supporting solid-white (monochrome) vs brand-color states
const getSkillIcon = (name: string, active: boolean) => {
  const fillVal = active ? undefined : "currentColor";
  const strokeVal = active ? undefined : "currentColor";

  switch (name) {
    case "Python":
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C8.63 2 8.79 3.5 8.79 3.5v1.75h6.43s1.75-.23 1.75 3.03c0 3.27-1.63 3.04-1.63 3.04H10s-3.27 0-3.27-3.03V5.25c0-3.25 5.17-3.25 5.17-3.25z" fill={fillVal || "#3776AB"}/>
          <path d="M12 22c3.37 0 3.21-1.5 3.21-1.5v-1.75H8.78s-1.75.23-1.75-3.03c0-3.27 1.63-3.04 1.63-3.04h5.34s3.27 0 3.27 3.03v3.06c0 3.25-5.17 3.25-5.17 3.25z" fill={fillVal || "#FFD343"}/>
          <circle cx="10.2" cy="4.2" r="0.75" fill={active ? "white" : "black"} />
          <circle cx="13.8" cy="19.8" r="0.75" fill={active ? "black" : "white"} />
        </svg>
      );
    case "TypeScript":
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="4" fill={fillVal || "#3178C6"}/>
          <text x="12" y="17.5" fill={active ? "white" : "black"} fontSize="11" fontFamily="Inter, system-ui, sans-serif" fontWeight="900" textAnchor="middle">TS</text>
        </svg>
      );
    case "JavaScript":
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="4" fill={fillVal || "#F7DF1E"}/>
          <text x="12" y="17.5" fill="black" fontSize="11" fontFamily="Inter, system-ui, sans-serif" fontWeight="900" textAnchor="middle">JS</text>
        </svg>
      );
    case "C++":
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="12" fill={fillVal || "#00599C"}/>
          <text x="12" y="16.5" fill="white" fontSize="10" fontFamily="Inter, system-ui, sans-serif" fontWeight="800" textAnchor="middle">C++</text>
        </svg>
      );
    case "Java":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={strokeVal || "#E76F51"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4Z" />
          <line x1="6" y1="2" x2="6" y2="5" />
          <line x1="10" y1="2" x2="10" y2="5" />
          <line x1="14" y1="2" x2="14" y2="5" />
        </svg>
      );
    case "Kotlin":
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 2h20L12 12 22 22H2V2z" fill={fillVal || "#7F52FF"} />
          {active && (
            <>
              <path d="M12 12L2 22h20L12 12z" fill="#C711E1" />
              <path d="M2 2l10 10L22 2H2z" fill="#7F52FF" />
            </>
          )}
        </svg>
      );
    case "Android":
      return (
        <svg viewBox="0 0 24 24" fill={fillVal || "#3DDC84"} xmlns="http://www.w3.org/2000/svg">
          <path d="M6 10c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1s1-.45 1-1v-6c0-.55-.45-1-1-1zm12 0c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1s1-.45 1-1v-6c0-.55-.45-1-1-1zm-9.5-3.88l-1.07-1.85a.5.5 0 10-.86.5l1.1 1.9A6.97 6.97 0 005.02 9h13.96a6.97 6.97 0 00-2.65-2.33l1.1-1.9a.5.5 0 00-.86-.5l-1.07 1.85A6.9 6.9 0 0012 5.5c-1.24 0-2.42.33-3.5.62zM9 8a.75.75 0 110-1.5.75.75 0 010 1.5zm6 0a.75.75 0 110-1.5.75.75 0 010 1.5zM7 10h10v8c0 .55-.45 1-1 1h-8c-.55 0-1-.45-1-1v-8z" />
        </svg>
      );
    case "React":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={strokeVal || "#61DAFB"} strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="12" cy="12" rx="10" ry="3.8" transform="rotate(30 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="3.8" transform="rotate(90 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="3.8" transform="rotate(150 12 12)" />
          <circle cx="12" cy="12" r="1.5" fill={strokeVal || "#61DAFB"} />
        </svg>
      );
    case "Next.js":
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="11" fill="black" stroke={active ? "#333" : "currentColor"} strokeWidth="1"/>
          <path d="M16.5 16.5L9.5 7.5V16.5H8V7.5H9.5L16.5 16.5Z" fill="white"/>
        </svg>
      );
    case "HTML & CSS":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={strokeVal || "#E34F26"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    case "Tailwind CSS":
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 6.002C9.046 6.002 7.02 7.48 5.94 10.435c1.485-1.484 2.903-1.89 4.253-1.215 1.706.853 2.924 2.091 4.274 3.463 2.2 2.236 4.757 3.32 8.533 3.32 2.953 0 4.978-1.477 6.06-1.579.085 1.579-.908 2.012-2.393 2.012-1.35.675-2.569-.562-3.918-1.935C20.5 12.018 17.65 10.4 12 6.002zM5.94 14.5c2.2-2.236 4.757-3.32 8.533-3.32 2.953 0 4.978 1.477 6.06 1.485-1.485 1.484-2.903 1.89-4.253 1.215-1.706-.853-2.924-2.091-4.274-3.463-2.2-2.236-4.757-3.32-8.533-3.32-2.953 0-4.978 1.477-6.06 1.485.085-1.58-.908-2.012-2.393-2.012-1.35-.675-2.569.562-3.918 1.935C10.5 20.518 7.65 18.9 5.94 14.5z" fill={fillVal || "#06B6D4"} />
        </svg>
      );
    case "Framer Motion":
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 12l8 8 8-8h-8V4L4 12z" fill={fillVal || "#FF00C7"}/>
        </svg>
      );
    case "Node.js":
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L4 6.6v9.2L12 21l8-4.6V6.6L12 2zm-1 15.2l-4.5-2.6v-5.2l4.5 2.6v5.2zm2 0V12l4.5-2.6v5.2l-4.5 2.6z" fill={fillVal || "#339933"} />
        </svg>
      );
    case "Express.js":
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="4" fill={active ? "#353535" : "currentColor"}/>
          <text x="12" y="16.5" fill={active ? "white" : "black"} fontSize="9" fontFamily="Inter, system-ui, sans-serif" fontWeight="900" textAnchor="middle">EX</text>
        </svg>
      );
    case "FastAPI":
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L3 9h6v11l9-7h-6z" fill={fillVal || "#009688"} />
        </svg>
      );
    case "Socket.IO":
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="11" fill="black" stroke={active ? "#fff" : "currentColor"} strokeWidth="1.5"/>
          <path d="M12 4l-4 7h3v9l4-7h-3z" fill="white" />
        </svg>
      );
    case "MongoDB":
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 1.5C12 1.5 7.5 6 7.5 12c0 3.5 2 6 4.5 9 2.5-3 4.5-5.5 4.5-9 0-6-4.5-10.5-4.5-10.5z" fill={fillVal || "#47A248"}/>
          <path d="M12 1.5v19.5c0 0 4.5-3 4.5-9 0-6-4.5-10.5-4.5-10.5z" fill={active ? "#3F3F3F" : "currentColor"}/>
        </svg>
      );
    case "PostgreSQL":
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="12" fill={fillVal || "#336791"}/>
          <text x="12" y="16.5" fill={active ? "white" : "black"} fontSize="13" fontFamily="serif" fontWeight="bold" textAnchor="middle">pg</text>
        </svg>
      );
    case "Supabase":
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.6 2.1L4.8 12.3c-.4.5-.1 1.2.6 1.2h6.2l-1.2 8.4c-.1.6.6 1 1-.5l8.8-10.2c.4-.5.1-1.2-.6-1.2h-6.2l1.2-8.4c.1-.6-.6-1-1-.5z" fill={fillVal || "#3ECF8E"}/>
        </svg>
      );
    case "Appwrite":
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.5 2 2 6.5 2 12c0 3.9 2.2 7.2 5.5 8.8l1.5-2.6C6.8 17 5.5 14.6 5.5 12c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5c0 2.6-1.3 5-3.5 6.2l1.5 2.6C19.8 19.2 22 15.9 22 12c0-5.5-4.5-10-10-10z" fill={fillVal || "#FD366E"}/>
        </svg>
      );
    case "Firebase":
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.5 17.5L7.8 3.2c.1-.5.7-.7 1.1-.3l3.6 6.8-8 7.8z" fill={active ? "#FFA000" : (fillVal || "#FFCA28")} />
          <path d="M4.5 17.5l8-7.8 2.6-4.9c.3-.5 1-.5 1.2 0l4.2 12.7-16 0z" fill={active ? "#F57C00" : (fillVal || "#FFCA28")} />
          <path d="M12.5 9.7l-3.6-6.8c-.4-.4-1-.2-1.1.3L4.5 17.5l8-7.8z" fill={active ? "#FFB300" : (fillVal || "#FFCA28")} />
          <path d="M20.5 17.5L16.3 4.8c-.2-.5-.9-.5-1.2 0l-10.6 12.7h16z" fill={active ? "#FFCA28" : (fillVal || "#FFCA28")} />
        </svg>
      );
    case "Sensor Fusion":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={strokeVal || "#0EA5E9"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="3" fill={strokeVal || "#0EA5E9"} />
          <path d="M12 2a10 10 0 0 0-7.07 17.07l1.41-1.41A8 8 0 0 1 12 4V2z" />
          <path d="M22 12a10 10 0 0 0-17.07-7.07l1.41 1.41A8 8 0 0 1 20 12h2z" />
          <path d="M12 22a10 10 0 0 0 7.07-17.07l-1.41 1.41A8 8 0 0 1 12 20v2z" />
        </svg>
      );
    case "Gemini AI":
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2a1 1 0 011 1c0 4.5 3.5 8 8 8a1 1 0 010 2c-4.5 0-8 3.5-8 8a1 1 0 01-2 0c0-4.5-3.5-8-8-8a1 1 0 010-2c4.5 0 8-3.5 8-8a1 1 0 011-1z" fill={active ? "url(#gemini-grad-jar)" : "currentColor"}/>
          <defs>
            <linearGradient id="gemini-grad-jar" x1="2" y1="12" x2="22" y2="12" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#4285F4"/>
              <stop offset="50%" stopColor="#9B72CB"/>
              <stop offset="100%" stopColor="#D96570"/>
            </linearGradient>
          </defs>
        </svg>
      );
    case "OpenCV":
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="7.5" r="4.5" stroke={strokeVal || "#ef4444"} strokeWidth="2.5" fill="none"/>
          <circle cx="7.5" cy="15.5" r="4.5" stroke={strokeVal || "#10b981"} strokeWidth="2.5" fill="none"/>
          <circle cx="16.5" cy="15.5" r="4.5" stroke={strokeVal || "#3b82f6"} strokeWidth="2.5" fill="none"/>
        </svg>
      );
    case "TensorFlow Lite":
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 3.3L18 8.7v6.6l-6 3.4-6-3.4V8.7l6-3.4z" fill={fillVal || "#FF6F00"}/>
          <path d="M12 6.5v11M7.5 12h9" stroke={strokeVal || "#FF6F00"} strokeWidth="1.5" />
        </svg>
      );
    case "Scikit-learn":
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="8" cy="12" r="6.5" fill={fillVal || "#F89939"} fillOpacity={active ? "0.85" : "0.5"}/>
          <circle cx="16" cy="12" r="6.5" fill={fillVal || "#3499CD"} fillOpacity={active ? "0.85" : "0.5"}/>
        </svg>
      );
    case "SNNTorch":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={strokeVal || "#E74C3C"} strokeWidth="2" strokeLinecap="round" xmlns="http://www.w3.org/2000/svg">
          <circle cx="5" cy="12" r="3" fill={strokeVal || "#E74C3C"} />
          <circle cx="19" cy="6" r="3" fill="none" />
          <circle cx="19" cy="18" r="3" fill="none" />
          <line x1="8" y1="12" x2="16" y2="7" />
          <line x1="8" y1="12" x2="16" y2="17" />
        </svg>
      );
    case "AI Agents":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={strokeVal || "#9B59B6"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2a5 5 0 0 0-5 5v3a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5z" />
          <path d="M12 15a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7z" />
          <circle cx="12" cy="7" r="1.5" fill={strokeVal || "#9B59B6"} />
        </svg>
      );
    case "Docker":
      return (
        <svg viewBox="0 0 24 24" fill={fillVal || "#2496ed"} xmlns="http://www.w3.org/2000/svg">
          <path d="M13.962 10.32h-2.454V7.896h2.454V10.32zM11.233 10.32H8.78V7.896h2.453V10.32zM8.503 10.32H6.05V7.896h2.453V10.32zM5.774 10.32H3.32V7.896h2.453V10.32zM13.962 7.42h-2.454V4.996h2.454V7.42zM11.233 7.42H8.78V4.996h2.453V7.42zM8.503 7.42H6.05V4.996h2.453V7.42zM13.962 4.52h-2.454V2.096h2.454V4.52zM16.69 10.32h-2.453V7.896h2.453V10.32zM16.69 7.42h-2.453V4.996h2.453V7.42zM21 12.015c-1.373 0-2.583-.497-3.553-1.326a9.932 9.932 0 0 1-4.832 1.341H2.4c-.22 0-.4.18-.4.4v.9c0 3.75 3.037 6.8 6.787 6.8h7.24c3.486 0 6.388-2.6 6.748-6v-.41c0-.46-.35-.705-.775-.705z"/>
        </svg>
      );
    case "Git & GitHub":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={strokeVal || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
          <line x1="6" y1="3" x2="6" y2="15" />
          <circle cx="18" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <path d="M18 9a9 9 0 0 1-9 9" />
        </svg>
      );
    case "VS Code":
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M23.9 6.5l-3.3-3.3c-.4-.4-1.1-.4-1.5 0L12 10.3 4.9 3.2c-.4-.4-1.1-.4-1.5 0L.1 6.5c-.2.2-.2.5 0 .7l7.1 7.1-7.1 7.1c-.2.2-.2.5 0 .7l3.3 3.3c.4.4 1.1.4 1.5 0L12 18.3l7.1 7.1c.4.4 1.1.4 1.5 0l3.3-3.3c.2-.2.2-.5 0-.7L16.8 14.3l7.1-7.1c.2-.2.2-.5 0-.7z" fill={fillVal || "#007ACC"} />
        </svg>
      );
    case "Figma":
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 5a3 3 0 0 0 0 6h4V5H8z" fill={active ? "#F24E1E" : "currentColor"}/>
          <path d="M8 11a3 3 0 0 0 0 6h4v-6H8z" fill={active ? "#A259FF" : "currentColor"}/>
          <path d="M8 17a3 3 0 0 0 3 3V17H8z" fill={active ? "#0ACF83" : "currentColor"}/>
          <path d="M12 11a3 3 0 0 0 3-3V11h-3z" fill={active ? "#FF7262" : "currentColor"}/>
          <path d="M12 17a3 3 0 0 0 3-3V17h-3z" fill={active ? "#1ABC9C" : "currentColor"}/>
        </svg>
      );
    case "Postman":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={strokeVal || "#FF6C37"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.5 16.5c-1.5 1.25-2.5 3.5-2.5 3.5s2.25-1 3.5-2.5" />
          <path d="M12 2s-4 4-3 10c0 0 .5 2.5 1.5 3.5L12 17l1.5-1.5c1-1 1.5-3.5 1.5-3.5 1-6-3-10-3-10z" />
          <path d="M19.5 16.5c1.5 1.25 2.5 3.5 2.5 3.5s-2.25-1-3.5-2.5" />
        </svg>
      );
    default:
      return (
        <span className="text-[9px] font-black font-sans uppercase">
          {name.substring(0, 2)}
        </span>
      );
  }
};

function PhysicsJar({
  skills,
  hoveredSkill,
  setHoveredSkill,
  selectedCategory,
}: {
  skills: typeof skillsData;
  hoveredSkill: string | null;
  setHoveredSkill: (name: string | null) => void;
  selectedCategory: string | null;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ballElementsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Simulation states inside refs to ensure 60fps/120fps physics loop performance
  const ballsRef = useRef<Ball[]>([]);
  const mouseXRef = useRef(0);
  const mouseYRef = useRef(0);
  const isHoveredRef = useRef(false);
  const widthRef = useRef(380);
  const heightRef = useRef(500);

  const [radius, setRadius] = useState(30);

  // Resize references on props change
  useEffect(() => {
    ballElementsRef.current = ballElementsRef.current.slice(0, skills.length);
  }, [skills]);

  useEffect(() => {
    // 1. Initial dimensions & resize handler
    const updateDimensions = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      widthRef.current = rect.width;
      heightRef.current = rect.height;

      // Adjust ball radius for mobile responsive layouts
      const calculatedRadius = rect.width < 500 ? 23 : 30;
      setRadius(calculatedRadius);

      // Clamp existing balls within new boundaries
      const padX = 16;
      ballsRef.current.forEach(ball => {
        ball.radius = calculatedRadius;
        const minX = calculatedRadius + padX;
        const maxX = rect.width - calculatedRadius - padX;
        const minY = calculatedRadius + 105; // below jar neck/shoulders
        const maxY = rect.height - calculatedRadius - 22; // above thick glass base

        ball.x = Math.max(minX, Math.min(maxX, ball.x));
        ball.y = Math.max(minY, Math.min(maxY, ball.y));
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    // 2. Initialize balls (cascade grid layout below shoulders)
    const w = widthRef.current;
    const h = heightRef.current;
    const initialRadius = w < 500 ? 23 : 30;

    const cols = 5;
    ballsRef.current = skills.map((skill, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      const cellW = w / cols;
      
      const x = cellW / 2 + col * cellW + (Math.random() - 0.5) * 8;
      // Start below the shoulders (y = 120) to cascade down visually on mount
      const y = 120 + row * (initialRadius * 2.2) + (Math.random() - 0.5) * 5;

      return {
        name: skill.name,
        level: skill.level,
        color: skill.color,
        x,
        y,
        vx: (Math.random() - 0.5) * 1.5,
        vy: 1.5 + Math.random() * 2, // starting downward velocity
        radius: initialRadius,
        mass: 1,
      };
    });

    // 3. Physics Simulation Loop
    let animationFrameId: number;
    const updatePhysics = () => {
      if (!containerRef.current) return;
      const curW = widthRef.current;
      const curH = heightRef.current;
      const balls = ballsRef.current;
      const mx = mouseXRef.current;
      const my = mouseYRef.current;
      const isHovered = isHoveredRef.current;

      // Physics vector additions
      const gravityY = 0.28; // Downward gravity

      const substeps = 3;
      for (let step = 0; step < substeps; step++) {
        balls.forEach(ball => {
          // A: Apply vertical downward gravity
          ball.vy += gravityY / substeps;

          // B: Gentle thermal motion to avoid static locking
          ball.vx += (Math.random() - 0.5) * 0.02;
          ball.vy += (Math.random() - 0.5) * 0.02;

          // C: Cursor Repulsion (churning balls on hover)
          if (isHovered) {
            const dx = ball.x - mx;
            const dy = ball.y - my;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const repelRadius = curW < 500 ? 70 : 100;
            if (dist < repelRadius && dist > 0.1) {
              const force = (repelRadius - dist) / repelRadius;
              ball.vx += (dx / dist) * force * 0.9 / substeps;
              ball.vy += (dy / dist) * force * 0.9 / substeps;
            }
          }

          // Damping (Friction)
          ball.vx *= 0.97;
          ball.vy *= 0.97;

          // Update position
          ball.x += ball.vx / substeps;
          ball.y += ball.vy / substeps;
        });

        // D: Resolve elastic ball-to-ball collisions
        for (let i = 0; i < balls.length; i++) {
          for (let j = i + 1; j < balls.length; j++) {
            const b1 = balls[i];
            const b2 = balls[j];
            const dx = b2.x - b1.x;
            const dy = b2.y - b1.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const minDist = b1.radius + b2.radius;

            if (dist < minDist) {
              const overlap = minDist - dist;
              const nx = dx / (dist || 1);
              const ny = dy / (dist || 1);

              // Position resolve
              b1.x -= nx * overlap * 0.5;
              b1.y -= ny * overlap * 0.5;
              b2.x += nx * overlap * 0.5;
              b2.y += ny * overlap * 0.5;

              // Elastic impulse response
              const rvx = b2.vx - b1.vx;
              const rvy = b2.vy - b1.vy;
              const velAlongNormal = rvx * nx + rvy * ny;

              if (velAlongNormal < 0) {
                const restitution = 0.5; // bounciness inside the jar
                const impulse = -(1 + restitution) * velAlongNormal / 2;
                b1.vx -= impulse * nx;
                b1.vy -= impulse * ny;
                b2.vx += impulse * nx;
                b2.vy += impulse * ny;
              }
            }
          }
        }

        // E: Resolve boundary collision inside the beaker
        const padX = 16;
        balls.forEach(ball => {
          const minX = ball.radius + padX;
          const maxX = curW - ball.radius - padX;
          const minY = ball.radius + 105; // under jar shoulder curve
          const maxY = curH - ball.radius - 22; // above thick glass floor base

          if (ball.x < minX) {
            ball.x = minX;
            ball.vx = -ball.vx * 0.55;
          } else if (ball.x > maxX) {
            ball.x = maxX;
            ball.vx = -ball.vx * 0.55;
          }

          if (ball.y < minY) {
            ball.y = minY;
            ball.vy = -ball.vy * 0.55;
          } else if (ball.y > maxY) {
            ball.y = maxY;
            ball.vy = -ball.vy * 0.45; // softer bounce on bottom to help settle
          }
        });
      }

      // 4. Update DOM element translations directly
      balls.forEach((ball, idx) => {
        const ballEl = ballElementsRef.current[idx];
        if (ballEl) {
          ballEl.style.transform = `translate3d(${ball.x - ball.radius}px, ${ball.y - ball.radius}px, 0)`;
        }
      });

      animationFrameId = requestAnimationFrame(updatePhysics);
    };

    animationFrameId = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener("resize", updateDimensions);
      cancelAnimationFrame(animationFrameId);
    };
  }, [skills]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseXRef.current = e.clientX - rect.left;
    mouseYRef.current = e.clientY - rect.top;
  };

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    setHoveredSkill(null);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[450px] md:h-[500px] select-none cursor-default overflow-visible max-w-[380px]"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 1. Backdrop Blur matching the beaker body outline */}
      <div className="absolute inset-x-[14px] top-[60px] bottom-[14px] rounded-b-[40px] rounded-t-[10px] backdrop-blur-[10px] bg-white/[0.015] dark:bg-white/[0.005] pointer-events-none z-0" />

      {/* 2. Jar BACKGROUND Layer SVG (drawn BEHIND the balls for depth refraction) */}
      <svg viewBox="0 0 380 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <defs>
          {/* Soft inner glow refraction */}
          <radialGradient id="jar-backlight" cx="50%" cy="60%" r="50%" fx="50%" fy="60%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.03)"/>
            <stop offset="60%" stopColor="rgba(255,255,255,0.01)"/>
            <stop offset="100%" stopColor="rgba(0,0,0,0.15)"/>
          </radialGradient>
        </defs>
        {/* Refraction backdrop color fill */}
        <path
          d="M 85 61 C 85 75, 12 85, 12 110 L 12 460 C 12 485, 36 495, 60 495 L 320 495 C 344 495, 368 485, 368 460 L 368 110 C 368 85, 295 75, 295 61 Z"
          fill="url(#jar-backlight)"
        />
      </svg>

      {/* 3. Floating Apothecary Skill Balls (Z-index 10) */}
      {skills.map((skill, index) => {
        const isSelectedCategory = selectedCategory === null || skill.category === selectedCategory;
        const isHovered = hoveredSkill === skill.name;
        const isHighlighted = isHovered || (selectedCategory !== null && isSelectedCategory);

        // Opacity States: Highlighted = fully opaque, Dimmed (when category active) = 0.25, Default = 0.85
        let opacity = 0.85;
        if (selectedCategory !== null) {
          opacity = isSelectedCategory ? 1.0 : 0.25;
        }
        if (hoveredSkill !== null) {
          opacity = isHovered ? 1.0 : 0.3;
        }

        return (
          <div
            key={skill.name}
            ref={el => { ballElementsRef.current[index] = el; }}
            className="absolute z-10 select-none touch-none transition-all duration-300 ease-out"
            style={{
              width: `${radius * 2}px`,
              height: `${radius * 2}px`,
              transformStyle: "preserve-3d",
              opacity,
              filter: isHighlighted
                ? `drop-shadow(0 0 16px ${skill.color}80) drop-shadow(0 6px 10px rgba(0, 0, 0, 0.4))`
                : "drop-shadow(0 6px 8px rgba(0, 0, 0, 0.5))",
              transform: "scale(1)"
            }}
            onMouseEnter={() => setHoveredSkill(skill.name)}
            onMouseLeave={() => setHoveredSkill(null)}
          >
            {/* Ball Sphere Render */}
            <div
              className="w-full h-full rounded-full relative flex items-center justify-center border transition-shadow duration-300"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${skill.color}d0 0%, ${skill.color} 70%, #000000 100%)`,
                borderColor: isHighlighted ? `${skill.color}cc` : `${skill.color}40`,
                boxShadow: `inset 0 3px 6px rgba(255,255,255,0.45), inset 0 -3px 6px rgba(0,0,0,0.65)`
              }}
            >
              {/* 3D Specular glare highlight overlay */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-transparent to-white/35 pointer-events-none" />
              <div className="absolute top-[2px] left-[2px] w-[35%] h-[35%] rounded-full bg-gradient-to-br from-white/40 to-transparent blur-[0.5px] pointer-events-none" />

              {/* SVG Logo Container (50% size of the ball, brand-colored logo) */}
              <div className="w-[50%] h-[50%] flex items-center justify-center [&>svg]:w-full [&>svg]:h-full select-none pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] text-white">
                {getSkillIcon(skill.name, true)}
              </div>
            </div>

            {/* Individual Beaker Tooltip */}
            <div
              className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 pointer-events-none transition-all duration-200 z-50 ${
                isHovered ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
            >
              <div
                className="bg-black/95 dark:bg-neutral-900/95 border border-white/10 px-3 py-1.5 rounded-lg shadow-2xl text-center flex flex-col items-center gap-0.5"
                style={{ borderColor: `${skill.color}40` }}
              >
                <span className="text-xs font-bold text-white whitespace-nowrap">{skill.name}</span>
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 border-x-4 border-t-4 border-x-transparent border-t-black/95 dark:border-t-neutral-900/95"
                />
              </div>
            </div>
          </div>
        );
      })}

      {/* 4. Jar FOREGROUND Layer SVG (drawn OVER the balls for glossy specular reflections and the lid) */}
      <svg viewBox="0 0 380 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full pointer-events-none z-20">
        <defs>
          {/* Gold gradient for lid */}
          <linearGradient id="gold-lid" x1="0" y1="0" x2="380" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#7a5f18"/>
            <stop offset="15%" stopColor="#c5a043"/>
            <stop offset="30%" stopColor="#f3d57a"/>
            <stop offset="50%" stopColor="#fff2c3"/>
            <stop offset="70%" stopColor="#f3d57a"/>
            <stop offset="85%" stopColor="#c5a043"/>
            <stop offset="100%" stopColor="#7a5f18"/>
          </linearGradient>

          {/* Glass edge stroke gradient */}
          <linearGradient id="glass-edge" x1="0" y1="0" x2="380" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="rgba(255,255,255,0.24)"/>
            <stop offset="10%" stopColor="rgba(255,255,255,0.08)"/>
            <stop offset="90%" stopColor="rgba(255,255,255,0.08)"/>
            <stop offset="100%" stopColor="rgba(255,255,255,0.24)"/>
          </linearGradient>
        </defs>

        {/* Jar Glass Body Border (High Quality Vector Line) */}
        <path
          d="M 85 61 C 85 75, 12 85, 12 110 L 12 460 C 12 485, 36 495, 60 495 L 320 495 C 344 495, 368 485, 368 460 L 368 110 C 368 85, 295 75, 295 61 Z"
          stroke="url(#glass-edge)"
          strokeWidth="2.5"
          fill="none"
        />

        {/* Thick Glass Base at the Bottom (overlapping the balls at bottom curve) */}
        <path
          d="M 12 455 C 12 482, 36 494, 60 494 L 320 494 C 344 494, 368 482, 368 455 L 368 472 C 368 488, 344 495, 320 495 L 60 495 C 36 495, 12 488, 12 472 Z"
          fill="rgba(255,255,255,0.065)"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="0.75"
        />

        {/* Glass Neck Outline and Ridges */}
        <rect x="83" y="33" width="214" height="28" rx="2" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" fill="rgba(255,255,255,0.02)" />
        <path d="M 83 42 L 297 42" stroke="rgba(255,255,255,0.12)" strokeWidth="2.2" />
        <path d="M 83 50 L 297 50" stroke="rgba(255,255,255,0.12)" strokeWidth="2.2" />

        {/* Golden Metallic Screw Lid */}
        <rect x="74" y="2" width="232" height="32" rx="6" fill="url(#gold-lid)" stroke="rgba(0,0,0,0.35)" strokeWidth="1" />
        <path d="M 74 31 L 306 31" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
        <path d="M 78 4.5 L 302 4.5" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round" />
        {/* Ridges */}
        <path d="M 97 2 L 97 34" stroke="rgba(0,0,0,0.12)" strokeWidth="1.5" />
        <path d="M 120 2 L 120 34" stroke="rgba(0,0,0,0.12)" strokeWidth="1.5" />
        <path d="M 143 2 L 143 34" stroke="rgba(0,0,0,0.12)" strokeWidth="1.5" />
        <path d="M 166 2 L 166 34" stroke="rgba(0,0,0,0.12)" strokeWidth="1.5" />
        <path d="M 190 2 L 190 34" stroke="rgba(0,0,0,0.12)" strokeWidth="1.5" />
        <path d="M 213 2 L 213 34" stroke="rgba(0,0,0,0.12)" strokeWidth="1.5" />
        <path d="M 236 2 L 236 34" stroke="rgba(0,0,0,0.12)" strokeWidth="1.5" />
        <path d="M 259 2 L 259 34" stroke="rgba(0,0,0,0.12)" strokeWidth="1.5" />
        <path d="M 282 2 L 282 34" stroke="rgba(0,0,0,0.12)" strokeWidth="1.5" />

        {/* Specular Cylindrical Glass Glare Highlights */}
        {/* Left Side Main Highlight */}
        <path d="M 20 115 L 20 445" stroke="rgba(255,255,255,0.15)" strokeWidth="7" strokeLinecap="round" />
        <path d="M 20 115 L 20 445" stroke="rgba(255,255,255,0.06)" strokeWidth="16" strokeLinecap="round" />
        {/* Left Shoulder highlight curve */}
        <path d="M 85 65 C 85 75, 20 85, 20 115" stroke="rgba(255,255,255,0.14)" strokeWidth="4" strokeLinecap="round" fill="none" />
        {/* Right Side Shadow and highlight line */}
        <path d="M 360 115 L 360 445" stroke="rgba(0,0,0,0.2)" strokeWidth="8" strokeLinecap="round" />
        <path d="M 358 115 L 358 445" stroke="rgba(255,255,255,0.06)" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export default function TechStack() {
  const [mounted, setMounted] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const categories = ["All", "Languages", "Mobile", "Frontend", "Backend", "Databases", "DevOps", "AI/ML"];

  // Filter skills grid list based on selected category tab
  const filteredSkills = selectedCategory === null || selectedCategory === "All"
    ? skillsData
    : skillsData.filter(s => s.category === selectedCategory);

  return (
    <section id="skills" className="section-container">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
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
            Swirl your cursor inside the glass jar on the left to churn the skill marbles, or filter them by selecting category tabs!
          </p>
        </div>

        {/* Two-Column Layout */}
        <div className="grid md:grid-cols-[1.1fr_1.9fr] gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Glass Apothecary Jar (Sticky on Desktop) */}
          <div className="flex justify-center md:sticky md:top-28 z-20">
            {mounted ? (
              <PhysicsJar
                skills={skillsData}
                hoveredSkill={hoveredSkill}
                setHoveredSkill={setHoveredSkill}
                selectedCategory={selectedCategory === "All" ? null : selectedCategory}
              />
            ) : (
              /* Beaker outline placeholder during SSR */
              <div className="relative w-full h-[450px] md:h-[500px] max-w-[380px] rounded-b-[48px] rounded-t-[12px] bg-white/[0.03] border border-white/10 dark:border-white/5 shadow-2xl backdrop-blur-md">
                <div className="absolute left-[12%] right-[12%] top-0 h-8 bg-amber-800/40 rounded-t-lg rounded-b-sm border-b border-black/40 pointer-events-none" />
                <div className="absolute left-[16%] right-[16%] top-8 h-6 bg-white/5 border-x border-white/10 pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-4 bg-white/10 rounded-b-[46px] pointer-events-none" />
              </div>
            )}
          </div>

          {/* Right Column: Classification Tabs & Active Skill Grid */}
          <div className="space-y-8">
            {/* Category Selection Tabs */}
            <div className="flex flex-wrap gap-2 pb-4 border-b border-border">
              {categories.map((cat) => {
                const isActive = (selectedCategory === null && cat === "All") || selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat === "All" ? null : cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide uppercase transition-all duration-300 border cursor-pointer ${
                      isActive
                        ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                        : "bg-surface text-text-secondary border-border hover:border-white/20 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-2.5">
              {skillsData.map((skill) => {
                const isSelectedCategory = selectedCategory === null || selectedCategory === "All" || skill.category === selectedCategory;
                const isHovered = hoveredSkill === skill.name;
                const isHighlighted = isHovered || (selectedCategory !== null && isSelectedCategory);

                // Opacity states for grid list: highlighted = opaque, other categories active = dimmed, idle = normal
                let opacity = "opacity-85 hover:opacity-100";
                if (selectedCategory !== null) {
                  opacity = isSelectedCategory ? "opacity-100" : "opacity-25";
                }
                if (hoveredSkill !== null) {
                  opacity = isHovered ? "opacity-100 scale-[1.03]" : "opacity-30";
                }

                return (
                  <div
                    key={skill.name}
                    className={`py-2 px-1 flex items-center gap-2.5 transition-all duration-300 cursor-pointer ${opacity}`}
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    {/* Brand Icon (White default, colored when active/hovered) */}
                    <div
                      className="w-4.5 h-4.5 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full transition-colors duration-300 select-none pointer-events-none"
                      style={{ color: isHighlighted ? skill.color : "rgba(255,255,255,0.45)" }}
                    >
                      {getSkillIcon(skill.name, isHighlighted)}
                    </div>
                    
                    {/* Skill Text */}
                    <span
                      className="text-xs font-semibold tracking-tight transition-colors duration-300 select-none pointer-events-none truncate"
                      style={{ color: isHighlighted ? skill.color : "rgba(255,255,255,0.65)" }}
                    >
                      {skill.name}
                    </span>
                   </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}