import { motion } from "framer-motion";

export default function Background() {
  return (
    <>
      {/* Blob 1 */}
      <motion.div
        className="bg-blob blob1"
        animate={{
          x: [0, 40, 0],
          y: [0, 80, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Blob 2 */}
      <motion.div
        className="bg-blob blob2"
        animate={{
          x: [0, -60, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Blob 3 */}
      <motion.div
        className="bg-blob blob3"
        animate={{
          x: [0, -20, 0],
          y: [0, 60, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </>
  );
}
