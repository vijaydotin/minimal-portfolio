"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { personalInfo } from "@/data/portfolio";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="contact"
      className="relative py-28 md:py-40 bg-neutral-950 text-white overflow-hidden"
    >
      {/* Subtle animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-20 w-[300px] h-[300px] rounded-full bg-neutral-800/20 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 left-20 w-[250px] h-[250px] rounded-full bg-neutral-800/15 blur-3xl"
        />
      </div>

      <div className="max-w-6xl mx-auto px-5 md:px-8 relative z-10" ref={ref}>
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="text-[11px] tracking-[0.2em] uppercase text-neutral-500 font-medium block mb-6"
        >
          Get in touch
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
          className="text-3xl md:text-5xl lg:text-6xl font-extralight leading-[1.1] tracking-tight mb-12 max-w-2xl"
        >
          Let&apos;s make something
          <br />
          <span className="text-neutral-500">worth remembering.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] as const }}
          className="mb-14"
        >
          <a
            href={`mailto:${personalInfo.email}`}
            className="group inline-flex items-center gap-3 text-xl md:text-2xl lg:text-3xl font-light text-white hover:text-neutral-400 transition-colors duration-300"
          >
            {personalInfo.email}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
          className="flex items-center gap-6"
        >
          {[
            { href: personalInfo.github, label: "GitHub" },
            { href: personalInfo.linkedin, label: "LinkedIn" },
            { href: `mailto:${personalInfo.email}`, label: "Email" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.label !== "Email" ? "_blank" : undefined}
              rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
              className="text-[13px] text-neutral-500 hover:text-white transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
