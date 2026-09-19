"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo";
import AnimatedCTA from "./AnimatedCTA";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <a href="#top" className="flex items-center text-white">
          <Logo className="h-12 w-auto sm:h-14" />
        </a>

        <AnimatedCTA href="#features" className="hidden md:inline-flex">
          Read More
        </AnimatedCTA>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-white/15 bg-black/30 backdrop-blur-md md:hidden"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="h-0.5 w-5 bg-white"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="h-0.5 w-5 bg-white"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="h-0.5 w-5 bg-white"
          />
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 top-[65px] z-40 bg-background/95 backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col gap-2 px-6 py-8">
              <motion.li
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05, duration: 0.25 }}
                className="pt-2"
              >
                <AnimatedCTA href="#features" onClick={() => setMenuOpen(false)}>
                  Read More
                </AnimatedCTA>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
