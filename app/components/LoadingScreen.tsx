"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CUBE_SIZE = 42; // Small cube face size
const SPACING = 47; // Distance between centers of sub-cubes

// Monochromatic solved faces: White, Black, and distinct shades of Grey
const SOLVED_COLORS: Record<string, string> = {
  top: "#ffffff", // Pure Crisp White
  front: "#d4d4d8", // Silver / Light Grey (zinc-300)
  right: "#a1a1aa", // Neutral Mid Grey (zinc-400)
  left: "#52525b", // Slate Grey (zinc-600)
  back: "#27272a", // Charcoal Carbon (zinc-800)
  bottom: "#09090b", // Deep Obsidian Black (zinc-950)
};

const SCRAMBLE_PALETTE = [
  "#ffffff", // White
  "#e4e4e7", // Very light grey
  "#a1a1aa", // Mid grey
  "#71717a", // Slate grey
  "#27272a", // Dark charcoal
  "#09090b", // Deep black
];

// Returns face color transitioning from scrambled to solved based on CFOP progress
function getFaceColor(
  x: number,
  y: number,
  z: number,
  face: "front" | "back" | "right" | "left" | "top" | "bottom",
  progress: number
): string {
  const solved = SOLVED_COLORS[face];

  // Layer-by-layer CFOP solve progression:
  // Layer 1 (bottom layer, y = 1): Solved at 35%+
  // Layer 2 (middle layer, y = 0): Solved at 65%+
  // Layer 3 (top layer, y = -1): Solved at 85%+
  let isSolved = false;
  if (y === 1 && progress >= 35) isSolved = true;
  if (y === 0 && progress >= 65) isSolved = true;
  if (y === -1 && progress >= 85) isSolved = true;

  if (isSolved) return solved;

  // Pseudorandom deterministic scramble using monochrome palette
  const hash = Math.abs(
    (x + 2) * 31 + (y + 2) * 53 + (z + 2) * 79 + face.charCodeAt(0) * 19
  );
  return SCRAMBLE_PALETTE[hash % SCRAMBLE_PALETTE.length];
}

interface SubCubeProps {
  x: number;
  y: number;
  z: number;
  leftAngle: number;
  rightAngle: number;
  topAngle: number;
  progress: number;
}

function SubCube({
  x,
  y,
  z,
  leftAngle,
  rightAngle,
  topAngle,
  progress,
}: SubCubeProps) {
  const tx = x * SPACING;
  const ty = y * SPACING;
  const tz = z * SPACING;
  const halfSize = CUBE_SIZE / 2;

  // Apply layer twists depending on which layer is turning
  let transform = `translate3d(${tx}px, ${ty}px, ${tz}px)`;
  if (x === -1) {
    transform = `rotateX(${leftAngle}deg) translate3d(${tx}px, ${ty}px, ${tz}px)`;
  } else if (x === 1) {
    transform = `rotateX(${rightAngle}deg) translate3d(${tx}px, ${ty}px, ${tz}px)`;
  } else if (y === -1) {
    transform = `rotateY(${topAngle}deg) translate3d(${tx}px, ${ty}px, ${tz}px)`;
  }

  const faces = [
    {
      face: "front" as const,
      isOuter: z === 1,
      transform: `rotateY(0deg) translateZ(${halfSize}px)`,
    },
    {
      face: "back" as const,
      isOuter: z === -1,
      transform: `rotateY(180deg) translateZ(${halfSize}px)`,
    },
    {
      face: "right" as const,
      isOuter: x === 1,
      transform: `rotateY(90deg) translateZ(${halfSize}px)`,
    },
    {
      face: "left" as const,
      isOuter: x === -1,
      transform: `rotateY(-90deg) translateZ(${halfSize}px)`,
    },
    {
      face: "top" as const,
      isOuter: y === -1,
      transform: `rotateX(90deg) translateZ(${halfSize}px)`,
    },
    {
      face: "bottom" as const,
      isOuter: y === 1,
      transform: `rotateX(-90deg) translateZ(${halfSize}px)`,
    },
  ];

  return (
    <div
      className="absolute"
      style={{
        width: `${CUBE_SIZE}px`,
        height: `${CUBE_SIZE}px`,
        transformStyle: "preserve-3d",
        transform,
        transition: "transform 0.18s cubic-bezier(0.2, 0.8, 0.25, 1.15)",
      }}
    >
      {faces.map((f, i) => {
        if (!f.isOuter) return null;
        const color = getFaceColor(x, y, z, f.face, progress);

        return (
          <div
            key={i}
            className="absolute inset-0 select-none backface-hidden"
            style={{
              width: `${CUBE_SIZE}px`,
              height: `${CUBE_SIZE}px`,
              transform: f.transform,
              background: color,
              border: "2px solid #000000",
              borderRadius: "6px",
              boxShadow:
                progress >= 95
                  ? "0 0 10px rgba(255,255,255,0.35), inset 0 0 3px rgba(255,255,255,0.2)"
                  : "inset 0 0 5px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.7)",
              transition:
                "background 0.35s ease, box-shadow 0.35s ease, border 0.35s ease",
            }}
          />
        );
      })}
    </div>
  );
}

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Dynamic layer angles during solving sequence
  const [leftAngle, setLeftAngle] = useState(0);
  const [rightAngle, setRightAngle] = useState(0);
  const [topAngle, setTopAngle] = useState(0);

  // Coordinates of 26 subcubes (3x3x3 minus center)
  const positions: [number, number, number][] = [];
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        if (x === 0 && y === 0 && z === 0) continue;
        positions.push([x, y, z]);
      }
    }
  }

  useEffect(() => {
    // Check if user already saw the loader in this session
    const hasSeenLoader = sessionStorage.getItem("portfolio_loader_seen");
    if (hasSeenLoader) {
      setIsLoading(false);
      return;
    }

    const duration = 2600; // 2.6 seconds total solving duration
    const startTime = performance.now();

    const frame = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      // Solve move choreography:
      // 0% - 20%: Twist Right face
      if (pct < 20) {
        const p = pct / 20;
        setRightAngle(p * 90);
        setTopAngle(0);
        setLeftAngle(0);
      }
      // 20% - 40%: Twist Top face
      else if (pct < 40) {
        const p = (pct - 20) / 20;
        setRightAngle(90);
        setTopAngle(-p * 90);
        setLeftAngle(0);
      }
      // 40% - 60%: Twist Left face and undo Right face
      else if (pct < 60) {
        const p = (pct - 40) / 20;
        setLeftAngle(p * 90);
        setRightAngle(90 - p * 90);
        setTopAngle(-90);
      }
      // 60% - 80%: Twist Top face back and align Left
      else if (pct < 80) {
        const p = (pct - 60) / 20;
        setTopAngle(-90 + p * 180);
        setLeftAngle(90 - p * 90);
        setRightAngle(0);
      }
      // 80% - 95%: Final PLL twist to snap top layer into place
      else if (pct < 95) {
        const p = (pct - 80) / 15;
        setTopAngle(90 - p * 90);
        setLeftAngle(0);
        setRightAngle(0);
      }
      // 95% - 100%: All layers 100% aligned and solved!
      else {
        setLeftAngle(0);
        setRightAngle(0);
        setTopAngle(0);
      }

      if (pct < 100) {
        requestAnimationFrame(frame);
      } else {
        // Hold for 400ms on solved state, then dismiss
        setTimeout(() => {
          sessionStorage.setItem("portfolio_loader_seen", "true");
          setIsLoading(false);
        }, 400);
      }
    };

    const animId = requestAnimationFrame(frame);

    // Escape key shortcut to skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        sessionStorage.setItem("portfolio_loader_seen", "true");
        setIsLoading(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSkip = () => {
    sessionStorage.setItem("portfolio_loader_seen", "true");
    setIsLoading(false);
  };

  // Dynamic solve status message
  const getStatusText = () => {
    if (progress < 25) return "Loading ...";
    if (progress < 50) return "Loading Projects...";
    if (progress < 75) return "Loading Certifications...";
    if (progress < 95) return "Loading Skills...";
    return "Opening ...";
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black select-none overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: "blur(12px)",
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
          }}
        >
          {/* Ambient Background Monochrome Glow */}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-white/[0.03] blur-[130px] pointer-events-none" />

          {/* Skip button in top corner */}
          <div className="absolute top-6 right-6">
            <button
              onClick={handleSkip}
              className="px-3.5 py-1.5 rounded-full text-xs font-mono text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
            >
              Skip (Esc)
            </button>
          </div>

          {/* 3D Solving Cube Stage */}
          <div
            className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] flex items-center justify-center relative"
            style={{ perspective: "1000px" }}
          >
            {/* Assembly Container with 3D rotation */}
            <motion.div
              className="relative"
              style={{
                width: "0px",
                height: "0px",
                transformStyle: "preserve-3d",
              }}
              animate={{
                rotateX: [25, 385],
                rotateY: [40, 400],
                rotateZ: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {positions.map(([x, y, z], idx) => (
                <SubCube
                  key={idx}
                  x={x}
                  y={y}
                  z={z}
                  leftAngle={leftAngle}
                  rightAngle={rightAngle}
                  topAngle={topAngle}
                  progress={progress}
                />
              ))}
            </motion.div>
          </div>

          {/* Status & Progress Bar Below Cube */}
          <div className="mt-8 flex flex-col items-center gap-3 w-64 max-w-[85vw]">
            <div className="flex items-center justify-between w-full text-xs font-mono">
              <span className="text-neutral-400 tracking-wider text-[11px] uppercase">
                {getStatusText()}
              </span>
              <span className="font-bold tabular-nums text-white">
                {progress}%
              </span>
            </div>

            {/* Clean Monochrome Progress Track */}
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>

            {/* Author Attribution */}
            <p className="text-[11px] font-mono text-neutral-500 mt-1 tracking-widest uppercase">
              Prasoon Mathur · Portfolio
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

