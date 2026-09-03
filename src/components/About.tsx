"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { personalInfo, stats } from "@/data/portfolio";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-5 md:px-8" ref={ref}>
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-12 md:gap-20">
          {/* Left column */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
              className="text-[11px] tracking-[0.2em] uppercase text-neutral-400 font-medium block mb-4"
            >
              About
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
              className="text-3xl md:text-[2.8rem] font-light leading-[1.15] tracking-tight text-neutral-900 mb-8"
            >
              Simple ideas.
              <br />
              <span className="text-neutral-400">Carefully executed.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
              className="text-base text-neutral-500 leading-relaxed font-light max-w-lg"
            >
              {personalInfo.shortBio}
            </motion.p>
          </div>

          {/* Right column — Stats */}
          <div className="flex flex-col justify-end">
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] as const }}
                  className="text-center md:text-left"
                >
                  <div className="text-3xl md:text-4xl font-extralight text-neutral-900 mb-1 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-[11px] tracking-widest uppercase text-neutral-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
