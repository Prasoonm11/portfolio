import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Certifications from "./components/Certifications";
import TechStatus from "./components/TechStatus";
import TechStack from "./components/TechStack";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Prasoon Mathur | Full Stack Developer",
  description: "Full Stack Developer portfolio showcasing projects, experience, skills, and certifications. Open for opportunities.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${fraunces.variable} font-sans min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1">
          <Hero />
          <About />
          <Projects />
          <Experience />
          <Education />
          <Certifications />
          <TechStatus />
          <TechStack />
          <Contact />
        </main>
        <Footer />
      </body>
    </html>
  );
}