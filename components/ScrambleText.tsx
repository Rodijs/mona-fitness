"use client";

import { useEffect, useRef, useState } from "react";

// Text that "decodes" itself: for a moment its letters turn into random
// characters, then settle back left to right. Plays when `trigger` changes
// (hover, or a new `text`), like the menu labels on altitudebev.com.
// Monospace fonts keep the width steady while it plays. Off with Reduce Motion.

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=";
const DURATION_MS = 420;

export default function ScrambleText({
  text,
  trigger,
  className,
}: {
  text: string;
  /** Any value; the effect plays each time it changes. */
  trigger: unknown;
  className?: string;
}) {
  const [shown, setShown] = useState(text);
  const frame = useRef(0);
  const first = useRef(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // No effect on the first render: the label just appears.
    if (first.current || reduce) {
      first.current = false;
      setShown(text);
      return;
    }
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION_MS);
      const settled = Math.floor(t * text.length);
      setShown(
        text
          .split("")
          .map((ch, i) =>
            i < settled || ch === " " ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          )
          .join(""),
      );
      if (t < 1) frame.current = requestAnimationFrame(tick);
      else setShown(text);
    };
    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [text, trigger]);

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>{shown}</span>
    </span>
  );
}
