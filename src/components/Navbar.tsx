"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, personalInfo } from "@/data/portfolio";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled ? "py-3" : "py-5"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div
          className={`mx-auto max-w-5xl px-6 py-3 rounded-2xl border transition-all duration-700 mx-4 sm:mx-6 lg:mx-auto ${
            scrolled
              ? "bg-white/70 backdrop-blur-2xl border-neutral-200/80 shadow-[0_1px_24px_rgba(0,0,0,0.06)]"
              : "bg-white/30 backdrop-blur-lg border-transparent"
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#"
              className="text-[15px] font-semibold tracking-[-0.01em] text-neutral-900 hover:text-neutral-600 transition-colors duration-300"
              aria-label="Home"
            >
              {personalInfo.name}
              <span className="text-neutral-300 font-light">.</span>
            </a>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[13px] text-neutral-400 hover:text-neutral-900 transition-colors duration-300 font-medium tracking-wide"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden relative w-7 h-5 flex flex-col justify-between items-end focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 rounded"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <motion.span
                animate={
                  menuOpen
                    ? { rotate: 45, y: 8, width: "100%" }
                    : { rotate: 0, y: 0, width: "100%" }
                }
                className="block h-[1.5px] bg-neutral-900 rounded-full origin-center"
                style={{ width: "100%" }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
              />
              <motion.span
                animate={
                  menuOpen
                    ? { opacity: 0, x: 12 }
                    : { opacity: 1, x: 0 }
                }
                className="block h-[1.5px] bg-neutral-900 rounded-full"
                style={{ width: "60%" }}
                transition={{ duration: 0.25 }}
              />
              <motion.span
                animate={
                  menuOpen
                    ? { rotate: -45, y: -8, width: "100%" }
                    : { rotate: 0, y: 0, width: "80%" }
                }
                className="block h-[1.5px] bg-neutral-900 rounded-full origin-center"
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ═══ Mobile full-screen menu ═══ */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 bg-white/[0.97] backdrop-blur-3xl flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-10">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{
                    delay: i * 0.07,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1] as const,
                  }}
                  className="text-[2rem] font-extralight text-neutral-900 tracking-[-0.02em] hover:text-neutral-400 transition-colors duration-300"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            {/* Subtle footer in mobile menu */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-10 text-[11px] text-neutral-300 tracking-widest uppercase"
            >
              {personalInfo.fullName}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
