"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { experience } from "@/data/portfolio";

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="experience" className="py-24 md:py-32 bg-neutral-50/50">
      <div className="max-w-6xl mx-auto px-5 md:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          className="mb-14"
        >
          <span className="text-[11px] tracking-[0.2em] uppercase text-neutral-400 font-medium block mb-2">
            Experience
          </span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-neutral-900">
            Journey so far
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[7px] md:left-[9px] top-2 bottom-2 w-[1px] bg-neutral-200" />

          <div className="space-y-12 md:space-y-16">
            {experience.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.2 + i * 0.15,
                  ease: [0.22, 1, 0.36, 1] as const,
                }}
                className="relative pl-8 md:pl-10"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-1.5 w-[15px] h-[15px] md:w-[19px] md:h-[19px] rounded-full border-2 border-neutral-300 bg-white flex items-center justify-center">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-neutral-900" />
                </div>

                <div className="text-[11px] tracking-[0.15em] uppercase text-neutral-400 font-medium mb-2">
                  {item.year}
                </div>

                <h3 className="text-lg md:text-xl font-normal text-neutral-900 mb-1 tracking-tight">
                  {item.role}
                </h3>

                <p className="text-[13px] text-neutral-400 mb-3">{item.company}</p>

                <p className="text-sm text-neutral-500 leading-relaxed font-light max-w-lg">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
