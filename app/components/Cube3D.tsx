"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useTransform, animate } from "framer-motion";

// Configuration for the larger 3D cube
const CUBE_SIZE = 54; // size of each small cube face in px
const SPACING = 60; // spacing between centers of sub-cubes

interface FaceProps {
  transform: string;
  color: "white" | "black";
}

// Sticker configuration for high-contrast black/white Rubik's cube
function SubCubeFace({ transform, color }: FaceProps) {
  const isWhite = color === "white";
  return (
    <div
      className="absolute inset-0 select-none backface-hidden"
      style={{
        width: `${CUBE_SIZE}px`,
        height: `${CUBE_SIZE}px`,
        transform,
        background: isWhite
          ? "linear-gradient(135deg, #ffffff 0%, #eaeaea 60%, #cfcfcf 100%)"
          : "linear-gradient(135deg, #1c1c1e 0%, #0d0d0f 60%, #050505 100%)",
        border: isWhite
          ? "2.5px solid #000000"
          : "2.5px solid #333338",
        borderRadius: "8px",
        boxShadow: isWhite
          ? "inset 0 0 5px rgba(0, 0, 0, 0.15), 0 1px 4px rgba(0, 0, 0, 0.4)"
          : "inset 0 0 5px rgba(255, 255, 255, 0.05), 0 1px 4px rgba(0, 0, 0, 0.9)",
      }}
    />
  );
}

interface SubCubeProps {
  x: number;
  y: number;
  z: number;
  leftAngle: number;
  rightAngle: number;
  topAngle: number;
}

function SubCube({ x, y, z, leftAngle, rightAngle, topAngle }: SubCubeProps) {
  const tx = x * SPACING;
  const ty = y * SPACING;
  const tz = z * SPACING;

  const halfSize = CUBE_SIZE / 2;

  // Define 3D transformation for each of the 6 faces
  const faces = [
    { transform: `rotateY(0deg) translateZ(${halfSize}px)` }, // Front
    { transform: `rotateY(180deg) translateZ(${halfSize}px)` }, // Back
    { transform: `rotateY(90deg) translateZ(${halfSize}px)` }, // Right
    { transform: `rotateY(-90deg) translateZ(${halfSize}px)` }, // Left
    { transform: `rotateX(90deg) translateZ(${halfSize}px)` }, // Top
    { transform: `rotateX(-90deg) translateZ(${halfSize}px)` }, // Bottom
  ];

  // Apply rotation depending on which layer is currently twisting
  let transform = `translate3d(${tx}px, ${ty}px, ${tz}px)`;
  if (x === -1) {
    // Left layer rotates around X axis
    transform = `rotateX(${leftAngle}deg) translate3d(${tx}px, ${ty}px, ${tz}px)`;
  } else if (x === 1) {
    // Right layer rotates around X axis
    transform = `rotateX(${rightAngle}deg) translate3d(${tx}px, ${ty}px, ${tz}px)`;
  } else if (y === -1) {
    // Top layer rotates around Y axis
    transform = `rotateY(${topAngle}deg) translate3d(${tx}px, ${ty}px, ${tz}px)`;
  }

  return (
    <div
      className="absolute"
      style={{
        width: `${CUBE_SIZE}px`,
        height: `${CUBE_SIZE}px`,
        transformStyle: "preserve-3d",
        transform,
        transition: "transform 0.18s cubic-bezier(0.25, 0.8, 0.25, 1.15)", // realistic mechanical springy snap
      }}
    >
      {faces.map((face, index) => {
        const isOuter =
          (index === 0 && z === 1) || // Front
          (index === 1 && z === -1) || // Back
          (index === 2 && x === 1) || // Right
          (index === 3 && x === -1) || // Left
          (index === 4 && y === -1) || // Top
          (index === 5 && y === 1); // Bottom

        if (!isOuter) return null;

        // Scramble pattern of white stickers and black plastic faces
        const isWhite = ((x + 2) * 17 + (y + 2) * 7 + (z + 2) * 31 + index * 13) % 2 === 0;

        return (
          <SubCubeFace
            key={index}
            transform={face.transform}
            color={isWhite ? "white" : "black"}
          />
        );
      })}
    </div>
  );
}

export default function Cube3D() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Layer rotation angles driven by independent loop animations
  const [leftAngle, setLeftAngle] = useState(0);
  const [rightAngle, setRightAngle] = useState(0);
  const [topAngle, setTopAngle] = useState(0);

  // Mouse tilt variables mapped to smooth springs
  const mouseX = useSpring(0, { stiffness: 100, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 100, damping: 20 });

  // Map mouse positions to rotational degrees
  const tiltX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const tiltY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

  // Generate Rubik's cube sub-cube coordinates (3x3x3 grid minus center)
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
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const x = (e.clientX - rect.left) / width - 0.5;
      const y = (e.clientY - rect.top) / height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    containerRef.current?.addEventListener("mouseleave", handleMouseLeave);

    // Synchronized loop animations for the layer twists
    // 12-second period representing a complex scramble/solve sequence
    const leftAnim = animate(0, 1, {
      duration: 12,
      repeat: Infinity,
      ease: "linear",
      onUpdate: (latest) => {
        // Twist 1 (0s - 1.5s)
        if (latest < 0.125) {
          const p = latest / 0.125;
          if (p < 0.2) setLeftAngle(0);
          else if (p < 0.5) setLeftAngle(((p - 0.2) / 0.3) * 90);
          else if (p < 0.8) setLeftAngle(90 - ((p - 0.5) / 0.3) * 90);
          else setLeftAngle(0);
        }
        // Twist 2 (4.5s - 6.0s)
        else if (latest >= 0.375 && latest < 0.5) {
          const p = (latest - 0.375) / 0.125;
          if (p < 0.2) setLeftAngle(0);
          else if (p < 0.5) setLeftAngle(((p - 0.2) / 0.3) * -90);
          else if (p < 0.8) setLeftAngle(-90 - ((p - 0.5) / 0.3) * -90);
          else setLeftAngle(0);
        } else {
          setLeftAngle(0);
        }
      }
    });

    const rightAnim = animate(0, 1, {
      duration: 12,
      repeat: Infinity,
      ease: "linear",
      onUpdate: (latest) => {
        // Twist 1 (1.5s - 3.0s)
        if (latest >= 0.125 && latest < 0.25) {
          const p = (latest - 0.125) / 0.125;
          if (p < 0.2) setRightAngle(0);
          else if (p < 0.5) setRightAngle(((p - 0.2) / 0.3) * -90);
          else if (p < 0.8) setRightAngle(-90 - ((p - 0.5) / 0.3) * -90);
          else setRightAngle(0);
        }
        // Twist 2 (6.0s - 7.5s)
        else if (latest >= 0.5 && latest < 0.625) {
          const p = (latest - 0.5) / 0.125;
          if (p < 0.2) setRightAngle(0);
          else if (p < 0.5) setRightAngle(((p - 0.2) / 0.3) * 90);
          else if (p < 0.8) setRightAngle(90 - ((p - 0.5) / 0.3) * 90);
          else setRightAngle(0);
        } else {
          setRightAngle(0);
        }
      }
    });

    const topAnim = animate(0, 1, {
      duration: 12,
      repeat: Infinity,
      ease: "linear",
      onUpdate: (latest) => {
        // Twist 1 (3.0s - 4.5s)
        if (latest >= 0.25 && latest < 0.375) {
          const p = (latest - 0.25) / 0.125;
          if (p < 0.2) setTopAngle(0);
          else if (p < 0.5) setTopAngle(((p - 0.2) / 0.3) * 90);
          else if (p < 0.8) setTopAngle(90 - ((p - 0.5) / 0.3) * 90);
          else setTopAngle(0);
        }
        // Twist 2 (7.5s - 9.0s)
        else if (latest >= 0.625 && latest < 0.75) {
          const p = (latest - 0.625) / 0.125;
          if (p < 0.2) setTopAngle(0);
          else if (p < 0.5) setTopAngle(((p - 0.2) / 0.3) * -90);
          else if (p < 0.8) setTopAngle(-90 - ((p - 0.5) / 0.3) * -90);
          else setTopAngle(0);
        } else {
          setTopAngle(0);
        }
      }
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      containerRef.current?.removeEventListener("mouseleave", handleMouseLeave);
      leftAnim.stop();
      rightAnim.stop();
      topAnim.stop();
    };
  }, [mouseX, mouseY]);

  if (!mounted) {
    return (
      <div className="w-full h-[350px] md:h-[450px] flex items-center justify-center">
        <div className="w-24 h-24 rounded-2xl bg-surface-elevated animate-pulse border border-border" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-[350px] md:h-[450px] flex items-center justify-center relative cursor-grab active:cursor-grabbing overflow-hidden"
      style={{
        perspective: "1200px",
      }}
    >
      {/* Background Glow behind the cube */}
      <div className="absolute w-[350px] h-[350px] rounded-full bg-white/[0.02] blur-[90px] pointer-events-none" />

      {/* Assembly Container with mouse tilt */}
      <motion.div
        className="relative"
        style={{
          width: "0px",
          height: "0px",
          transformStyle: "preserve-3d",
          rotateX: tiltX,
          rotateY: tiltY,
        }}
      >
        {/* Continuous auto-rotation container */}
        <motion.div
          style={{
            transformStyle: "preserve-3d",
          }}
          animate={{
            rotateX: [35, 395],
            rotateY: [45, 405],
            rotateZ: [0, 360],
          }}
          transition={{
            duration: 35,
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
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
