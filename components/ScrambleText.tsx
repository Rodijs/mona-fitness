"use client";

import { useEffect, useRef, useState } from "react";

// Text that "decodes" itself: for a moment its letters turn into random
// characters, then settle back left to right. Plays when `trigger` changes
// (hover, or a new `text`), like the menu labels on altitudebev.com.
// An invisible copy of the real text holds the width, so nothing around it
// shifts while it plays. Off with Reduce Motion.

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
    <span className={`inline-grid ${className ?? ""}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="invisible col-start-1 row-start-1 whitespace-nowrap">
        {text}
      </span>
      <span aria-hidden className="col-start-1 row-start-1 whitespace-nowrap">
        {shown}
      </span>
    </span>
  );
}
