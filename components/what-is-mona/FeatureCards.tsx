"use client";

import { motion } from "framer-motion";
import { useId, useRef } from "react";
import { appDisplay, appSans } from "@/app/fonts/app-fonts";
import { EASE_OUT, EASE_TRAVEL, fmt, useAfter, useCountUp } from "./motion";
import { ArrowUp, Check, Flame, Heart, Route, Scan, ShieldCheck, Users } from "./icons";

// The feature cards around the phone. Each one carries a small piece of the
// real app and plays its own short story once it has landed: the rep ring
// closes on the goal, You pass Jonas, the streak's last day lights, the run
// route draws. Numbers match MONA's App Store screenshots.

const LIME = "#C8FF8F";

// Same card as the widgets in Our Stats: a thin white stroke that turns
// lime on hover, a lime light that follows the pointer, and a small lift.
function CardShell({ icon, label, title, children }: { icon: React.ReactNode; label: string; title: string; children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  return (
    <motion.article
      ref={ref}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group relative w-full overflow-hidden rounded-2xl border border-white/15 bg-black/40 p-5 shadow-[0_30px_60px_-24px_rgba(0,0,0,0.8)] backdrop-blur-md transition-colors hover:border-accent/40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgba(200,255,61,0.10), transparent 70%)" }}
      />
      <div className="relative">
        <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/15">{icon}</span>
          {label}
        </p>
        <h3 className="mt-3 text-[17px] font-semibold leading-snug text-white">{title}</h3>
        <div className={`${appSans.className} mt-4`}>{children}</div>
      </div>
    </motion.article>
  );
}

/* 1 · The camera counts every rep */
export function RepCard({ active }: { active: boolean }) {
  const reps = useCountUp(100, active, { from: 62, duration: 1600 });
  const done = reps >= 100;
  const r = 38;
  const c = 2 * Math.PI * r;
  return (
    <CardShell icon={<Scan size={13} />} label="AI rep counting" title="Your camera counts every rep.">
      <div className="flex items-center gap-4">
        <div className="relative h-[92px] w-[92px] shrink-0">
          <svg width="92" height="92" viewBox="0 0 92 92" className="-rotate-90" aria-hidden>
            <circle cx="46" cy="46" r={r} fill="rgba(10,14,9,0.8)" stroke="rgba(255,255,255,0.12)" strokeWidth="6" />
            <circle
              cx="46"
              cy="46"
              r={r}
              fill="none"
              stroke={LIME}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={c}
              style={{ strokeDashoffset: c * (1 - Math.min(1, reps / 100)), filter: "drop-shadow(0 0 6px rgba(200,255,143,0.55))" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[26px] font-semibold leading-none text-white tabular-nums">{reps}</span>
            <span className="mt-1 grid text-[10px] leading-none">
              <span className="col-start-1 row-start-1 justify-self-center text-white/55 transition-opacity duration-300" style={{ opacity: done ? 0 : 1 }}>
                / 100
              </span>
              <span className="col-start-1 row-start-1 flex items-center gap-[5px] justify-self-center text-[#C8FF8F] transition-opacity duration-300" style={{ opacity: done ? 1 : 0 }}>
                <Check size={10} strokeWidth={3} /> goal
              </span>
            </span>
          </div>
        </div>
        <ul className="grid flex-1 grid-cols-2 gap-[6px] text-[12px] text-white/80">
          {["Push-ups", "Squats", "Sit-ups", "Lunges"].map((x) => (
            <li key={x} className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-2 py-[5px] text-center">
              {x}
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-4 flex items-center gap-2 text-[12px] text-white/55">
        <ShieldCheck size={15} className="text-[#C8FF8F]" /> Form checked by AI
      </p>
    </CardShell>
  );
}

/* 2 · Daily challenges with friends */
export function LeaderCard({ active }: { active: boolean }) {
  const you = useCountUp(1150, active, { from: 1060, duration: 1700, delay: 200 });
  const lead = you > 1080;
  const ROW = 50;
  const rows = [
    { id: "you", name: "You", reps: you, at: lead ? 0 : 1 },
    { id: "jonas", name: "Jonas", reps: 1080, at: lead ? 1 : 0 },
    { id: "liva", name: "Liva", reps: 940, at: 2 },
  ];
  return (
    <CardShell icon={<Users size={13} />} label="Challenges with friends" title="Race your friends every day.">
      <div className="relative" style={{ height: ROW * 3 - 6 }}>
        {rows.map((row) => {
          const isYou = row.id === "you";
          const isLiva = row.id === "liva";
          return (
            <motion.div
              key={row.id}
              className="absolute inset-x-0 top-0 flex h-[44px] items-center gap-3 rounded-[16px] px-3"
              style={{
                zIndex: isYou ? 2 : 1,
                background: isYou ? LIME : isLiva ? "#fbf6e9" : "rgba(255,255,255,0.07)",
                color: isYou ? "#0d120c" : isLiva ? "#d9690c" : "#fff",
              }}
              initial={false}
              animate={{ y: row.at * ROW }}
              transition={{ duration: 0.75, ease: EASE_TRAVEL }}
            >
              <span
                className="flex h-[26px] w-[26px] items-center justify-center rounded-full text-[12px] font-semibold"
                style={{ background: isYou ? "rgba(13,18,12,0.1)" : isLiva ? "#ece5d6" : "rgba(255,255,255,0.1)" }}
              >
                {row.at + 1}
              </span>
              <span className="text-[14px] font-semibold">{row.name}</span>
              <span className="ml-auto text-[13px] font-semibold tabular-nums">{fmt(row.reps)} reps</span>
            </motion.div>
          );
        })}
      </div>
      <p className="mt-3 flex items-center gap-2 whitespace-nowrap text-[12px] text-white/55">
        <motion.span
          className="flex h-5 w-5 items-center justify-center rounded-full bg-[#C8FF8F] text-[#0d120c]"
          initial={false}
          animate={{ scale: lead ? 1 : 0.6, opacity: lead ? 1 : 0 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
        >
          <ArrowUp size={12} strokeWidth={3} />
        </motion.span>
        Rep by rep, climb the leaderboard
      </p>
    </CardShell>
  );
}

/* 3 · Streaks and The PAPER */
export function StreakCard({ active }: { active: boolean }) {
  const lit = useCountUp(7, active, { from: 0, duration: 1100, delay: 100 });
  const paper = useAfter(active, 1300);
  const star = `star-${useId().replace(/:/g, "")}`;
  return (
    <CardShell icon={<Flame size={13} />} label="Streaks & awards" title="Keep the streak. Win The PAPER.">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className={`${appDisplay.className} text-[44px] font-bold leading-none text-white tabular-nums`}>12</p>
          <p className="mt-1 text-[12px] text-white/55">day move streak</p>
        </div>
        <div className="mb-1 flex h-[18px] flex-1 gap-[4px]" aria-hidden>
          {Array.from({ length: 7 }, (_, i) => (
            <span
              key={i}
              className="flex-1 rounded-full transition-[background-color,box-shadow] duration-300"
              style={{ background: i < lit ? LIME : "rgba(255,255,255,0.1)", boxShadow: i < lit ? "0 0 10px rgba(200,255,143,0.5)" : "none" }}
            />
          ))}
        </div>
      </div>
      <motion.div
        className="mt-4 flex items-center gap-3 rounded-[18px] border border-[#e6cf86]/70 px-3 py-[10px] text-[#22261d]"
        style={{ background: "linear-gradient(140deg,#f6f1df 0%,#efe6c8 60%,#e6efc9 100%)" }}
        initial={false}
        animate={{ y: paper ? 0 : 12, opacity: paper ? 1 : 0 }}
        transition={{ duration: 0.7, ease: EASE_OUT }}
      >
        <svg width="34" height="34" viewBox="0 0 100 100" aria-hidden>
          <defs>
            <linearGradient id={star} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#fff2b0" />
              <stop offset=".45" stopColor="#e3b23c" />
              <stop offset="1" stopColor="#a8761c" />
            </linearGradient>
          </defs>
          <polygon fill={`url(#${star})`} points="50,4 61,37 96,37 68,58 78,92 50,71 22,92 32,58 4,37 39,37" />
        </svg>
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7b7a66]">The Paper</p>
          <p className="truncate text-[14px] font-semibold">Core Crush 30</p>
        </div>
        <span className="ml-auto shrink-0 rounded-full border border-[#e9c55a] bg-[#f6dc8b] px-3 py-1 text-[12px] font-semibold">1st of 14</span>
      </motion.div>
    </CardShell>
  );
}

/* 4 · Runs and Apple Health */
export function RunCard({ active }: { active: boolean }) {
  const km = useCountUp(42, active, { from: 0, duration: 1500, delay: 200 });
  const grid = `grid-${useId().replace(/:/g, "")}`;
  return (
    <CardShell icon={<Route size={13} />} label="Runs & Apple Health" title="Track every run with GPS.">
      <div className="relative overflow-hidden rounded-[20px] bg-[#0d120c]" style={{ height: 132 }}>
        <svg viewBox="0 0 280 132" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
          <defs>
            <pattern id={grid} width="28" height="28" patternUnits="userSpaceOnUse">
              <path d="M28 0H0V28" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="280" height="132" fill={`url(#${grid})`} />
          <path d="M-10 70 C 80 52, 160 30, 290 22" stroke="rgba(255,255,255,0.07)" strokeWidth="14" fill="none" />
          <motion.path
            d="M150 112 C 158 72, 170 30, 206 22 C 248 14, 270 48, 260 80 C 252 106, 216 112, 192 96"
            stroke={LIME}
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            style={{ filter: "drop-shadow(0 0 6px rgba(200,255,143,0.6))" }}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: active ? 1 : 0 }}
            transition={{ duration: 1.6, delay: 0.2, ease: EASE_OUT }}
          />
          <circle cx="150" cy="112" r="7" fill="#0d120c" stroke={LIME} strokeWidth="3.5" />
          <motion.circle
            cx="192"
            cy="96"
            r="6"
            fill={LIME}
            initial={{ scale: 0 }}
            animate={{ scale: active ? 1 : 0 }}
            transition={{ duration: 0.4, delay: 1.7, ease: EASE_OUT }}
          />
        </svg>
        <div className="absolute bottom-3 left-4">
          <p className="leading-none">
            <span className={`${appDisplay.className} text-[30px] font-semibold text-[#C8FF8F] tabular-nums`}>{(km / 10).toFixed(1)}</span>
            <span className="text-[14px] text-white/80"> km</span>
          </p>
          <p className="mt-1 text-[12px] text-white/70">24:38 · 5:52 /km</p>
        </div>
      </div>
      <p className="mt-4 flex items-center gap-2 text-[12px] text-white/55">
        <Heart size={15} className="fill-[#ff3b5c] text-[#ff3b5c]" /> Steps and runs sync with Apple Health
      </p>
    </CardShell>
  );
}

/* The chip under the phone: who is in the challenge */
export function PeopleChip() {
  const people = [
    { l: "J", c: "#5b8cff" },
    { l: "L", c: "#ff8a3d" },
    { l: "M", c: "#ef5da8" },
    { l: "P", c: "#9b6bff" },
  ];
  return (
    <div className={`${appSans.className} flex items-center gap-3 rounded-full border border-white/12 bg-[#0c100b]/80 py-2 pl-2 pr-4 text-white shadow-[0_20px_40px_-16px_rgba(0,0,0,0.8)] backdrop-blur-xl`}>
      <span className="flex">
        {people.map((p, i) => (
          <span
            key={p.l}
            className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#0c100b] text-[12px] font-semibold"
            style={{ background: p.c, marginLeft: i ? -10 : 0 }}
          >
            {p.l}
          </span>
        ))}
      </span>
      <span className="whitespace-nowrap text-[12px] font-medium leading-tight">5 people in this challenge</span>
    </div>
  );
}
