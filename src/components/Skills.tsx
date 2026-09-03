"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { skills } from "@/data/portfolio";

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-5 md:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          className="mb-12"
        >
          <span className="text-[11px] tracking-[0.2em] uppercase text-neutral-400 font-medium block mb-2">
            Technologies
          </span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-neutral-900">
            Tools I work with
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-2.5"
        >
          {skills.map((skill, i) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.25 + i * 0.03,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
              className="px-4 py-2 text-[13px] rounded-full border border-neutral-200 text-neutral-600 bg-white hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-300 cursor-default"
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
