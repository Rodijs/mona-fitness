"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// The privacy policy's contents, marking the section you're reading in bold
// lime: a sticky list beside the text on wide screens ("list"), and a sticky
// slider of chips at the top on phones and tablets ("bar"), which also
// slides the active chip into view.

type Item = { id: string; title: string };

/** Which section is being read: the last one whose heading has passed a
 *  line near the top of the screen. A section picked from the contents
 *  stays active while the page scrolls to it (and at the very bottom,
 *  where short last sections can't reach the top). */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>(ids[0] ?? "");
  const picked = useRef<{ id: string; until: number } | null>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const wide = window.matchMedia("(min-width: 1024px)").matches;
      const line = wide ? 120 : 150; // below the sticky bar on phones
      let current = ids[0] ?? "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      const p = picked.current;
      if (p && (Date.now() < p.until || atBottom)) {
        const el = document.getElementById(p.id);
        // Keep the picked section while it's on screen.
        if (el && el.getBoundingClientRect().top < window.innerHeight) current = p.id;
      } else {
        picked.current = null;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    // A real scroll by the reader ends the "picked" hold.
    const release = () => {
      if (picked.current) picked.current.until = 0;
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("wheel", release, { passive: true });
    window.addEventListener("touchmove", release, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("wheel", release);
      window.removeEventListener("touchmove", release);
    };
  }, [ids]);

  const pick = useCallback((id: string) => {
    picked.current = { id, until: Date.now() + 1200 };
    setActive(id);
  }, []);

  return { active, pick };
}

/** Bold text without the chip changing width (the slider would jump): an
 *  invisible bold copy holds the width. */
function Label({ text, bold }: { text: string; bold: boolean }) {
  return (
    <span className="grid">
      <span aria-hidden className="invisible col-start-1 row-start-1 font-bold">
        {text}
      </span>
      <span className={`col-start-1 row-start-1 ${bold ? "font-bold" : ""}`}>{text}</span>
    </span>
  );
}

export default function PolicyContents({
  items,
  variant,
}: {
  items: Item[];
  variant: "list" | "bar";
}) {
  const [ids] = useState(() => items.map((i) => i.id));
  const { active, pick } = useActiveSection(ids);
  const barRef = useRef<HTMLDivElement>(null);

  // Phones: slide the active chip to the middle of the slider.
  useEffect(() => {
    if (variant !== "bar") return;
    const bar = barRef.current;
    const chip = bar?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!bar || !chip) return;
    const left = chip.offsetLeft - (bar.clientWidth - chip.offsetWidth) / 2;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    bar.scrollTo({ left, behavior: reduce ? "auto" : "smooth" });
  }, [active, variant]);

  if (variant === "list") {
    return (
      <ol className="mt-4 space-y-1 border-l border-border">
        {items.map((s, i) => {
          const on = s.id === active;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={() => pick(s.id)}
                aria-current={on ? "location" : undefined}
                className={`-ml-px flex gap-1 border-l-2 py-1.5 pl-4 text-sm transition-colors duration-200 ${
                  on
                    ? "border-accent text-accent"
                    : "border-transparent text-white/60 hover:border-white/30 hover:text-white"
                }`}
              >
                <span className={`tabular-nums ${on ? "font-bold text-accent" : "text-white/35"}`}>
                  {i + 1}.
                </span>
                <span className={on ? "font-bold" : ""}>{s.title}</span>
              </a>
            </li>
          );
        })}
      </ol>
    );
  }

  return (
    <div
      ref={barRef}
      className="scrollbar-none flex gap-2 overflow-x-auto scroll-px-5 px-5 py-3 sm:scroll-px-8 sm:px-8"
    >
      {items.map((s, i) => {
        const on = s.id === active;
        return (
          <a
            key={s.id}
            data-id={s.id}
            href={`#${s.id}`}
            onClick={() => pick(s.id)}
            aria-current={on ? "location" : undefined}
            className={`flex shrink-0 gap-1 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs transition-colors duration-200 ${
              on
                ? "border-accent bg-accent/10 text-accent"
                : "border-border bg-surface font-medium text-white/70 hover:border-accent/50 hover:text-white"
            }`}
          >
            <span className={`tabular-nums ${on ? "font-bold" : ""}`}>{i + 1}.</span>
            <Label text={s.title} bold={on} />
          </a>
        );
      })}
    </div>
  );
}
