"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import Logo from "./Logo";
import ScrambleText from "./ScrambleText";
import { PUSHUP_CHALLENGE_URL, SUPPORT_EMAIL } from "@/lib/contact";

// The home page's menu, after altitudebev.com: three frosted-glass pills —
// the logo, the section links in the middle, and a round lime-bolt button
// that opens the push-up challenge. Link labels "decode" themselves on hover, a lime
// ring lights up around the links pill, and the section you're looking at is
// lime. The bolt opens the "First Push-ups" challenge in the app. On phones and tablets a MENU pill (it scrambles into CLOSE) opens a
// full-screen menu whose big links rise in one after another.

const LINKS = [
  { id: "about", href: "#features", label: "What is MONA" },
  { id: "story", href: "#story", label: "Our Story" },
  { id: "live-stats", href: "#live-stats", label: "Our Stats" },
] as const;

const SMALL_LINKS = [
  { href: `mailto:${SUPPORT_EMAIL}`, label: SUPPORT_EMAIL, external: false },
  { href: "/support", label: "Support", external: false },
  { href: "/privacy", label: "Privacy", external: false },
  { href: "https://instagram.com/monafitness", label: "Instagram", external: true },
  { href: "https://x.com/razm1ro", label: "X", external: true },
] as const;

/** MONA's bolt (the same shape as in the app). */
function Bolt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"
      />
    </svg>
  );
}

/** Which home-page section is in the middle of the screen. */
function useActiveSection(): string | null {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const els = LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (els.length === 0) return;
    const seen = new Map<string, boolean>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) seen.set(e.target.id, e.isIntersecting);
        setActive(LINKS.find((l) => seen.get(l.id))?.id ?? null);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

/** Scrolls to a section after the full-screen menu has let go of the page. */
function goTo(hash: string) {
  window.setTimeout(() => {
    const el = document.querySelector(hash);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", hash);
  }, 60);
}

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  const [hovers, setHovers] = useState(0);
  return (
    <a
      href={href}
      onMouseEnter={() => setHovers((n) => n + 1)}
      onFocus={() => setHovers((n) => n + 1)}
      aria-current={active ? "location" : undefined}
      className={`relative flex h-full items-center px-5 text-[13px] font-semibold uppercase tracking-[0.1em] transition-colors xl:px-6 ${
        active ? "text-accent" : "text-white/85 hover:text-white"
      }`}
    >
      <ScrambleText text={label} trigger={hovers} />
      <span
        aria-hidden
        className={`absolute bottom-2.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent transition-opacity duration-300 ${
          active ? "opacity-100" : "opacity-0"
        }`}
      />
    </a>
  );
}

const sheet: Variants = {
  closed: { opacity: 0 },
  open: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
};
const bigLink: Variants = {
  closed: { opacity: 0, y: "40%" },
  open: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};
const smallLinks: Variants = {
  closed: { opacity: 0, y: 12 },
  open: { opacity: 1, y: 0, transition: { delay: 0.35, duration: 0.4, ease: "easeOut" } },
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection();
  const reduce = useReducedMotion();

  // While the full-screen menu is open the page behind it doesn't scroll.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Escape closes it; so does widening the window past the phone layout.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    const wide = window.matchMedia("(min-width: 1024px)");
    const onWide = () => wide.matches && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    return () => {
      window.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
    };
  }, [menuOpen]);

  const pill = "glass relative flex h-12 items-center rounded-full sm:h-14";


  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-8 sm:px-4 sm:pt-9">
      <nav className="relative flex items-center justify-between gap-2">
        <a href="#top" onClick={() => setMenuOpen(false)} aria-label="MONA, back to top" className={`${pill} ml-2.5 px-4 text-white sm:px-5`}>
          <Logo className="h-8 w-auto sm:h-9" />
        </a>

        {/* Section links (wide screens). */}
        <div
          className="glass lime-stroke absolute left-1/2 hidden h-14 -translate-x-1/2 items-center rounded-full px-2 before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100 lg:flex"
        >
          {LINKS.map((l) => (
            <NavLink key={l.id} href={l.href} label={l.label} active={active === l.id} />
          ))}
        </div>

        <div className="mr-2.5 flex items-center gap-2">
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            onClick={() => setMenuOpen((v) => !v)}
            className={`${pill} px-5 text-[13px] font-semibold uppercase tracking-[0.1em] text-white lg:hidden`}
          >
            <ScrambleText text={menuOpen ? "Close" : "Menu"} trigger={menuOpen} />
          </button>
          <a
            href={PUSHUP_CHALLENGE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            aria-label="Join the First Push-ups challenge in the MONA app"
            title="Join the First Push-ups challenge"
            className="group relative hidden h-12 w-12 items-center justify-center rounded-full bg-accent text-background shadow-[0_0_30px_-6px_rgba(200,255,61,0.6)] transition-transform duration-300 hover:scale-105 sm:flex sm:h-14 sm:w-14"
          >
            <Bolt className="h-6 w-6 transition-transform duration-500 group-hover:-rotate-12" />
          </a>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="site-menu"
            key="menu"
            variants={sheet}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 -z-10 flex flex-col bg-background/95 px-6 pb-8 pt-32 backdrop-blur-2xl lg:hidden"
          >
            <ul className="flex flex-1 flex-col items-center justify-center gap-3">
              {LINKS.map((l, i) => (
                <li key={l.id} className="overflow-hidden px-2">
                  <motion.a
                    href={l.href}
                    custom={i}
                    variants={reduce ? sheet : bigLink}
                    onClick={(e) => {
                      e.preventDefault();
                      setMenuOpen(false);
                      goTo(l.href);
                    }}
                    className={`block whitespace-nowrap font-serif text-4xl font-medium leading-tight tracking-tight transition-colors min-[360px]:text-5xl sm:text-6xl ${
                      active === l.id ? "text-gradient italic" : "text-white hover:text-accent"
                    }`}
                  >
                    {l.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.ul
              variants={reduce ? sheet : smallLinks}
              className="mx-auto flex max-w-md flex-wrap justify-center gap-2"
            >
              {SMALL_LINKS.map((l) => (
                <li key={l.label}>
                  {l.href.startsWith("/") ? (
                    <Link
                      href={l.href}
                      onClick={() => setMenuOpen(false)}
                      className="glass inline-flex h-10 items-center rounded-full px-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/85 transition-colors hover:text-accent"
                    >
                      {l.label}
                    </Link>
                  ) : (
                    <a
                      href={l.href}
                      {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="glass inline-flex h-10 items-center rounded-full px-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/85 transition-colors hover:text-accent"
                    >
                      {l.label}
                    </a>
                  )}
                </li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
