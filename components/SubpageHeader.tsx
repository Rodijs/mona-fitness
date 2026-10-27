"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Logo from "./Logo";

// Top bar for the inner pages (Support, Privacy): the logo back home, a
// Support / Privacy switch whose lime pill slides to the page you're on, and
// a Home link. On phones the switch gets its own full-width row.

const TABS = [
  { href: "/support", label: "Support" },
  { href: "/privacy", label: "Privacy" },
] as const;

function Switch({ id, className }: { id: string; className?: string }) {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Support and privacy"
      className={`relative grid grid-cols-2 rounded-full border border-border bg-surface p-1 ${className ?? ""}`}
    >
      {TABS.map((t) => {
        const on = pathname === t.href;
        return (
          <Link
            key={t.href}
            href={t.href}
            aria-current={on ? "page" : undefined}
            className={`relative rounded-full px-5 py-2 text-center text-sm font-semibold transition-colors ${
              on ? "text-background" : "text-white/70 hover:text-white"
            }`}
          >
            {on && (
              <motion.span
                layoutId={id}
                aria-hidden
                className="absolute inset-0 rounded-full bg-accent"
                transition={{ type: "spring", stiffness: 420, damping: 36 }}
              />
            )}
            <span className="relative">{t.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export default function SubpageHeader() {
  return (
    <header className="px-4 py-4 sm:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <Link href="/" aria-label="MONA home" className="flex shrink-0 items-center text-white">
          <Logo className="h-11 w-auto sm:h-14" />
        </Link>
        <Switch id="info-switch-wide" className="hidden sm:grid" />
        <Link
          href="/"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:border-accent/50 hover:text-accent"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Home
        </Link>
      </div>
      <Switch id="info-switch-phone" className="mx-auto mt-4 max-w-sm sm:hidden" />
    </header>
  );
}
