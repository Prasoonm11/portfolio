"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

// Configuration for the 3D cube
const CUBE_SIZE = 34; // size of each small cube face in px
const SPACING = 38; // spacing between centers of sub-cubes

interface FaceProps {
  transform: string;
}

function SubCubeFace({ transform }: FaceProps) {
  return (
    <div
      className="absolute inset-0 select-none backface-hidden"
      style={{
        width: `${CUBE_SIZE}px`,
        height: `${CUBE_SIZE}px`,
        transform,
        background: "linear-gradient(135deg, #1f1f2e 0%, #08080c 50%, #121217 100%)",
        border: "1.5px solid rgba(255, 255, 255, 0.12)",
        borderRadius: "4px",
        boxShadow: "inset 0 0 10px rgba(255, 255, 255, 0.05), 0 0 5px rgba(0, 0, 0, 0.8)",
      }}
    />
  );
}

function SubCube({ x, y, z }: { x: number; y: number; z: number }) {
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

  return (
    <div
      className="absolute"
      style={{
        width: `${CUBE_SIZE}px`,
        height: `${CUBE_SIZE}px`,
        transformStyle: "preserve-3d",
        transform: `translate3d(${tx}px, ${ty}px, ${tz}px)`,
      }}
    >
      {faces.map((face, index) => (
        <SubCubeFace key={index} transform={face.transform} />
      ))}
    </div>
  );
}

export default function Cube3D() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      containerRef.current?.removeEventListener("mouseleave", handleMouseLeave);
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
      className="w-full h-[350px] md:h-[450px] flex items-center justify-center relative cursor-grab active:cursor-grabbing"
      style={{
        perspective: "1200px",
      }}
    >
      {/* Background Glow behind the cube */}
      <div className="absolute w-[300px] h-[300px] rounded-full bg-white/[0.02] blur-[80px] pointer-events-none" />

      {/* Assembly Container with continuous auto-rotation + mouse tilt */}
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
            <SubCube key={idx} x={x} y={y} z={z} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
