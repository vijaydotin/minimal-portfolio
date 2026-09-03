"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolio";
import dynamic from "next/dynamic";

const HeroVisual = dynamic(() => import("@/components/HeroVisual3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-36 h-36 bg-neutral-100/60 rounded-full animate-pulse" />
    </div>
  ),
});

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.18 + i * 0.08, duration: 0.75, ease },
  }),
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex items-center overflow-hidden pt-20 md:pt-0"
    >
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">

        {/* ════════════════ DESKTOP COMPOSITION ════════════════ */}
        <div className="hidden md:grid md:grid-cols-[1.2fr_0.9fr] lg:grid-cols-[1.25fr_0.85fr] gap-4 items-center min-h-[100svh]">

          {/* Left Column — Primary Focal Point (Typography) */}
          <div className="z-10 py-16">
            <motion.p
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-[11px] lg:text-[12px] tracking-[0.28em] uppercase text-neutral-400 mb-5 font-semibold"
            >
              Developer & Designer
            </motion.p>

            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-[clamp(3.2rem,6vw,5.5rem)] leading-[1.02] tracking-[-0.035em] text-neutral-900 mb-6"
            >
              <span className="font-extralight text-neutral-800">Hello, I&apos;m</span>
              <br />
              <span className="font-semibold text-neutral-950">Vijay.</span>
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-[15px] lg:text-[16px] text-neutral-500 leading-[1.75] max-w-[440px] mb-8 font-light"
            >
              {personalInfo.description}
            </motion.p>

            {/* Social Pill Links */}
            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-3 mb-14"
            >
              <SocialLinks />
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-3 text-neutral-400"
            >
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className="w-[18px] h-[30px] rounded-full border border-neutral-300 flex items-start justify-center pt-[6px]"
              >
                <div className="w-[3px] h-[5px] bg-neutral-400 rounded-full" />
              </motion.div>
              <span className="text-[10px] tracking-[0.22em] uppercase font-medium">
                Scroll to explore
              </span>
            </motion.div>
          </div>

          {/* Right Column — Supporting 3D Laptop Object (Smaller, Higher, Further Right) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 1.1, ease }}
            className="relative h-[480px] lg:h-[540px] xl:h-[580px] translate-x-4 -translate-y-4 flex items-center justify-center pointer-events-none"
          >
            <HeroVisual />
          </motion.div>
        </div>

        {/* ════════════════ MOBILE COMPOSITION ════════════════ */}
        <div className="md:hidden flex flex-col pt-12 pb-8 min-h-[100svh]">

          {/* Category Tag */}
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-[10px] tracking-[0.28em] uppercase text-neutral-400 mb-4 font-semibold"
          >
            Developer & Designer
          </motion.p>

          {/* Main Headline */}
          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-[2.75rem] leading-[1.05] tracking-[-0.03em] text-neutral-900 mb-4"
          >
            <span className="font-extralight text-neutral-800">Hello,</span>
            <br />
            <span className="font-extralight text-neutral-800">I&apos;m </span>
            <span className="font-semibold text-neutral-950">Vijay.</span>
          </motion.h1>

          {/* Bio Description */}
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-[14px] text-neutral-500 leading-[1.7] mb-6 font-light max-w-[340px]"
          >
            A passionate developer crafting modern digital experiences with clean code and thoughtful design.
          </motion.p>

          {/* Social Links */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-2.5 mb-6"
          >
            <SocialLinks />
          </motion.div>

          {/* 3D Laptop — Scaled and Positioned Below Introduction */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.45, duration: 0.9, ease }}
            className="relative h-[250px] sm:h-[290px] w-full max-w-[340px] mx-auto my-auto pointer-events-none"
          >
            <HeroVisual />
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            custom={5}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-center gap-2 text-neutral-400 mt-4"
          >
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-4 h-6 rounded-full border border-neutral-300 flex items-start justify-center pt-1"
            >
              <div className="w-[2px] h-1 bg-neutral-400 rounded-full" />
            </motion.div>
            <span className="text-[9px] tracking-[0.2em] uppercase font-medium">
              Scroll to explore
            </span>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

/* ─── Social link buttons (shared between layouts) ─── */
function SocialLinks() {
  const links = [
    {
      href: personalInfo.linkedin,
      label: "LinkedIn",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      href: personalInfo.github,
      label: "GitHub",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      href: `mailto:${personalInfo.email}`,
      label: "Email",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M22 4L12 13L2 4" />
        </svg>
      ),
    },
  ];

  return (
    <>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target={link.label !== "Email" ? "_blank" : undefined}
          rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
          aria-label={link.label}
          className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-neutral-900 hover:border-neutral-400 hover:bg-neutral-50 transition-all duration-300 hover:scale-105 active:scale-95"
        >
          {link.icon}
        </a>
      ))}
    </>
  );
}
