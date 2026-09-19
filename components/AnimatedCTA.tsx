"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

/**
 * A pill button with a thin conic-gradient ring that continuously rotates
 * around its edge. The outer element clips (overflow-hidden) an oversized
 * rotating gradient down to a 1.5px ring — the inner solid pill covers
 * everything except that ring, so only a moving highlight is visible.
 */
export default function AnimatedCTA({ href, children, className = "", onClick }: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <a
      href={href}
      onClick={onClick}
      className={`group relative inline-flex shrink-0 overflow-hidden rounded-full p-[1.5px] ${className}`}
    >
      <motion.span
        aria-hidden
        className="absolute inset-[-60%]"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, var(--accent) 35deg, transparent 90deg, transparent 360deg)",
        }}
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }}
      />
      <span className="relative z-10 inline-flex w-full items-center justify-center rounded-full bg-black/70 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition-colors group-hover:bg-black/55">
        {children}
      </span>
    </a>
  );
}
