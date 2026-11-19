"use client";

import { useEffect, useState } from "react";

// Shared motion values for "What is MONA?". One ease for every arrival so
// the section moves as one system: a fast start that settles softly.
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
export const EASE_TRAVEL = [0.45, 0, 0.1, 1] as const;

/** True once the media query matches; false on the server and first paint. */
export function useMedia(query: string) {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    const m = window.matchMedia(query);
    const on = () => setMatch(m.matches);
    on();
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, [query]);
  return match;
}

/** Counts from `from` to `to` once `active` turns true. */
export function useCountUp(to: number, active: boolean, opts: { from?: number; duration?: number; delay?: number } = {}) {
  const { from = 0, duration = 1200, delay = 0 } = opts;
  const [value, setValue] = useState(from);
  useEffect(() => {
    if (!active) return;
    // reduced motion: land on the final number at once
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dur = still ? 0 : duration;
    let raf = 0;
    let start = 0;
    const timer = window.setTimeout(() => {
      const step = (t: number) => {
        if (!start) start = t;
        const p = dur ? Math.min(1, (t - start) / dur) : 1;
        // ease-out cubic: quick at first, landing gently on the number
        const e = 1 - Math.pow(1 - p, 3);
        setValue(Math.round(from + (to - from) * e));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, still ? 0 : delay);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [active, from, to, duration, delay]);
  return active ? value : from;
}

/** Flips to true `delay` ms after `active` does. */
export function useAfter(active: boolean, delay: number) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (!active) return;
    const t = window.setTimeout(() => setOn(true), delay);
    return () => window.clearTimeout(t);
  }, [active, delay]);
  return on;
}

export const fmt = (n: number) => n.toLocaleString("en-US");
