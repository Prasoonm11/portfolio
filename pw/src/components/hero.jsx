import { useEffect, useState } from "react";
import { motion } from "framer-motion";


const phrases = [
  "clean portfolio websites.",
  "interactive user interfaces.",
  "smooth, modern web experiences."
];

export default function Hero() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [char, setChar] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[index];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, char + 1));
        setChar(char + 1);
        if (char + 1 === current.length) setDeleting(true);
      } else {
        setText(current.slice(0, char - 1));
        setChar(char - 1);
        if (char === 0) {
          setDeleting(false);
          setIndex((index + 1) % phrases.length);
        }
      }
    }, deleting ? 60 : 90);

    return () => clearTimeout(timeout);
  }, [char, deleting, index]);

  return (
    <section id="hero" className="hero">
      <p className="hero-tag">Hi, I’m</p>
      <h2 className="hero-name">Prasoon</h2>
      <h3 className="hero-roles">
        I build <span id="hero-typing">{text}</span>
      </h3>
      <p className="hero-text">
        A web developer crafting clean, interactive, and modern web experiences.
      </p>
    </section>
  );
}
