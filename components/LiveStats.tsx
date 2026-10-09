"use client";

// "Our Live Stats" — real, anonymous community numbers from the MONA app
// (see lib/liveStats.ts), refreshed every minute while the section is on
// screen. If the numbers can't be loaded the section hides itself rather
// than showing zeros.

import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { LiveStats as Stats } from "@/lib/liveStats";

const ACCENT = "#c8ff3d";
const EASE = [0.16, 1, 0.3, 1] as const;
const POLL_MS = 60_000;

// ------------------------------------------------------------------ data

function useLiveStats(active: boolean) {
  const [data, setData] = useState<Stats | null>(null);
  const [failed, setFailed] = useState(false);
  const [fetchedAt, setFetchedAt] = useState<number | null>(null);

  const lastLoad = useRef(0);
  // Component-level (not per-effect) so a skipped duplicate load still
  // receives the result of the request already on its way.
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
    const alive = () => mounted.current;
    const load = () => {
      if (document.visibilityState === "hidden") return;
      // Scrolling in and out shouldn't refetch numbers that are seconds old.
      if (Date.now() - lastLoad.current < POLL_MS / 2) return;
      lastLoad.current = Date.now();
      fetch("/api/live-stats")
        .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
        .then((d: Stats) => {
          if (!alive()) return;
          setData(d);
          setFailed(false);
          setFetchedAt(Date.now());
        })
        .catch(() => {
          lastLoad.current = 0;
          if (alive()) setFailed(true);
        });
    };
    load();
    if (!active)
      return () => {
        mounted.current = false;
      };
    const t = setInterval(load, POLL_MS);
    const onVis = () => document.visibilityState === "visible" && load();
    document.addEventListener("visibilitychange", onVis);
    return () => {
      mounted.current = false;
      clearInterval(t);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [active]);

  return { data, failed, fetchedAt };
}

function useNow(ms: number) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), ms);
    return () => clearInterval(t);
  }, [ms]);
  return now;
}

const fmt = (n: number, digits = 0) =>
  n.toLocaleString("en-US", { maximumFractionDigits: digits, minimumFractionDigits: digits });

// ------------------------------------------------------------------ bits

/** Counts up from 0 the first time it's on screen, then glides to new values. */
function CountUp({ value, digits = 0, start }: { value: number; digits?: number; start: boolean }) {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(0);
  const from = useRef(0);
  useEffect(() => {
    if (!start || reduce) return;
    const controls = animate(from.current, value, {
      duration: from.current === 0 ? 1.6 : 0.9,
      ease: EASE,
      onUpdate: (v) => setShown(v),
      onComplete: () => (from.current = value),
    });
    return () => {
      controls.stop();
      from.current = value;
    };
  }, [value, start, reduce]);
  // Reduced motion: no counting, just the number.
  return <span className="tabular-nums">{fmt(reduce ? value : shown, digits)}</span>;
}

const cardIn: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, delay: 0.08 * i },
  }),
};

/** Site-style glass card with a soft spotlight that follows the pointer. */
function Widget({
  children,
  index,
  className = "",
  label,
  icon,
}: {
  children: ReactNode;
  index: number;
  className?: string;
  label: string;
  icon: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={cardIn}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={`group relative overflow-hidden rounded-2xl border border-white/15 bg-black/40 p-6 backdrop-blur-md transition-colors hover:border-accent/40 ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgba(200,255,61,0.10), transparent 70%)",
        }}
      />
      <div className="relative flex h-full flex-col">
        <div className="mb-4 flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/15 text-accent">
            {icon}
          </span>
          <span className="text-sm font-semibold text-white/80">{label}</span>
        </div>
        {children}
      </div>
    </motion.div>
  );
}

function Big({ children }: { children: ReactNode }) {
  return (
    <div className="text-5xl font-extrabold leading-none tracking-tight text-white sm:text-[56px]">
      {children}
    </div>
  );
}

function Unit({ children }: { children: ReactNode }) {
  return <span className="ml-2 font-serif text-2xl font-medium italic text-accent">{children}</span>;
}

// ------------------------------------------------------------------ icons

const Icon = {
  users: (
    <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]">
      <circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3 19c.6-3 3-4.8 6-4.8s5.4 1.8 6 4.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M16 5.2a3 3 0 0 1 0 5.6M18 14.6c1.6.6 2.7 2 3 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  reps: (
    <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]">
      <path d="M4 12h16M6.5 8v8M17.5 8v8M3 10v4M21 10v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  run: (
    <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]">
      <circle cx="15" cy="4.5" r="1.8" stroke="currentColor" strokeWidth="1.6" />
      <path d="m8 21 3-6 3 2 1 4M6 11l3-3 4 1 2 3 3 1M11 15l2-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  flame: (
    <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]">
      <path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  trophy: (
    <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]">
      <path d="M8 4h8v5a4 4 0 0 1-8 0V4ZM8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8.5 20h7M10 17h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

// ------------------------------------------------------------------ widgets

function UsersWidget({ s, on }: { s: Stats; on: boolean }) {
  const reduce = useReducedMotion();
  const shown = Math.min(s.usersTotal, 40);
  return (
    <Widget index={0} label="Members" icon={Icon.users} className="lg:col-span-2">
      <Big>
        <CountUp value={s.usersTotal} start={on} />
      </Big>
      <p className="mt-2 text-sm text-white/60">
        <span className="font-semibold text-accent">+{fmt(s.usersWeek)}</span> joined this week
      </p>
      {/* One dot per member; lime = moved this week. */}
      <div className="mt-auto flex flex-wrap gap-2 pt-6" aria-hidden>
        {Array.from({ length: shown }, (_, i) => {
          const lit = i < s.activeWeek;
          return (
            <motion.span
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={on ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.05, type: "spring", stiffness: 400, damping: 18 }}
              className="relative h-3.5 w-3.5 rounded-full"
              style={{ background: lit ? ACCENT : "rgba(255,255,255,0.22)" }}
            >
              {lit && !reduce && (
                <span className="absolute inset-0 animate-ping rounded-full bg-accent/60 [animation-duration:2.4s]" />
              )}
            </motion.span>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-white/45">
        <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-accent align-middle" />
        {fmt(s.activeWeek)} moved this week
      </p>
    </Widget>
  );
}

function RepsWidget({ s, on }: { s: Stats; on: boolean }) {
  const reduce = useReducedMotion();
  const max = Math.max(1, ...s.repsDaily);
  const change =
    s.repsPrevWeek > 0 ? Math.round(((s.repsWeek - s.repsPrevWeek) / s.repsPrevWeek) * 100) : null;
  return (
    <Widget index={1} label="Reps this week" icon={Icon.reps} className="sm:col-span-2 lg:col-span-4">
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <div>
          <Big>
            <CountUp value={s.repsWeek} start={on} />
          </Big>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-white/60">
            {change !== null && change !== 0 && (
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-bold ${change > 0 ? "bg-accent/15 text-accent" : "bg-white/10 text-white/70"}`}
              >
                {change > 0 ? "↑" : "↓"} {Math.abs(change)}% vs last week
              </span>
            )}
            <span>{fmt(s.repsTotal)} all time</span>
          </div>
        </div>
        {s.repsToday > 0 && (
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
            <span className="relative flex h-2 w-2">
              {!reduce && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />}
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            +{fmt(s.repsToday)} today
          </span>
        )}
      </div>
      <div className="mt-auto flex h-28 items-end gap-1.5 pt-6 sm:h-32 sm:gap-2" aria-label="Reps per day, last 14 days" role="img">
        {s.repsDaily.map((n, i) => {
          const today = i === s.repsDaily.length - 1;
          const h = n > 0 ? Math.max(8, (n / max) * 100) : 3;
          return (
            <div key={i} className="group/bar relative flex h-full flex-1 items-end">
              <motion.div
                className="w-full origin-bottom rounded-t-md"
                style={{
                  height: `${h}%`,
                  background: today
                    ? `linear-gradient(180deg, #eaffb8, ${ACCENT})`
                    : n > 0
                      ? "rgba(200,255,61,0.55)"
                      : "rgba(255,255,255,0.12)",
                  boxShadow: today && n > 0 ? "0 0 24px -4px rgba(200,255,61,0.8)" : undefined,
                }}
                initial={{ scaleY: 0 }}
                animate={on ? { scaleY: 1 } : {}}
                transition={{ duration: 0.8, ease: EASE, delay: 0.2 + i * 0.045 }}
              />
              <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-white px-1.5 py-0.5 text-[11px] font-bold text-black opacity-0 transition-opacity group-hover/bar:opacity-100">
                {fmt(n)}
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex justify-between text-[11px] text-white/40">
        <span>14 days ago</span>
        <span>Today</span>
      </div>
    </Widget>
  );
}

const MILESTONES = [5, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000, 25000, 50000, 100000];

function RunWidget({ s, on }: { s: Stats; on: boolean }) {
  const reduce = useReducedMotion();
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGGElement>(null);
  const next = MILESTONES.find((m) => m > s.kmTotal) ?? Math.ceil(s.kmTotal / 100000 + 1) * 100000;
  const pct = Math.min(100, (s.kmTotal / next) * 100);

  // A glowing runner dot travelling the trail, looping while on screen.
  useEffect(() => {
    if (!on || reduce) return;
    const path = pathRef.current;
    const dot = dotRef.current;
    if (!path || !dot) return;
    const len = path.getTotalLength();
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = (((t - t0) / 5200) % 1 + 1) % 1;
      const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      const pt = path.getPointAtLength(eased * len);
      dot.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [on, reduce]);

  const d = "M8 70 C 40 70, 46 30, 82 34 S 120 72, 152 56 S 196 12, 232 22";
  return (
    <Widget index={3} label="Distance run" icon={Icon.run} className="lg:col-span-2">
      <Big>
        <CountUp value={s.kmTotal} digits={1} start={on} />
        <Unit>km</Unit>
      </Big>
      <p className="mt-2 text-sm text-white/60">
        {fmt(s.runsTotal)} {s.runsTotal === 1 ? "run" : "runs"} tracked with GPS
      </p>
      <svg viewBox="0 0 240 84" className="mt-5 h-auto w-full overflow-visible" aria-hidden>
        <path d={d} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="6" strokeLinecap="round" />
        <motion.path
          ref={pathRef}
          d={d}
          fill="none"
          stroke={ACCENT}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="1 0"
          initial={{ pathLength: 0 }}
          animate={on ? { pathLength: 1 } : {}}
          transition={{ duration: 2.2, ease: EASE, delay: 0.3 }}
          style={{ filter: "drop-shadow(0 0 6px rgba(200,255,61,0.6))" }}
        />
        <circle cx="8" cy="70" r="4" fill="rgba(255,255,255,0.5)" />
        <circle cx="232" cy="22" r="4" fill={ACCENT} />
        <g ref={dotRef} transform="translate(232 22)">
          <circle r="9" fill="rgba(200,255,61,0.25)" />
          <circle r="4.5" fill="#fff" />
        </g>
      </svg>
      <div className="mt-auto pt-5">
        <div className="mb-1.5 flex justify-between text-xs text-white/50">
          <span>Next community goal</span>
          <span className="font-semibold text-white/80">{fmt(next)} km</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-accent"
            initial={{ width: 0 }}
            animate={on ? { width: `${pct}%` } : {}}
            transition={{ duration: 1.4, ease: EASE, delay: 0.6 }}
          />
        </div>
      </div>
    </Widget>
  );
}

function rigaWeekdays(generatedAt: string): string[] {
  // Labels for the last 7 Riga days, oldest first (data is grouped by Riga day).
  const base = new Date(generatedAt);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(base.getTime() - (6 - i) * 86_400_000);
    return d.toLocaleDateString("en-US", { weekday: "narrow", timeZone: "Europe/Riga" });
  });
}

// The flame from the app's streak card (filled flame, glow, breathing,
// embers drifting up), in the app's fire colours.
const FLAME_PATH =
  "M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4";
const FIRE = "#FF7A2F";
const FIRE_HOT = "#FFB347";

function AppFlame({ on, lit }: { on: boolean; lit: boolean }) {
  const reduce = useReducedMotion();
  const play = on && lit && !reduce;
  return (
    <div className="relative flex h-16 w-16 shrink-0 items-center justify-center" aria-hidden>
      {/* Soft glow behind the flame */}
      <motion.div
        className="absolute inset-1 rounded-full blur-xl"
        style={{ background: "radial-gradient(circle, rgba(255,122,47,0.55), transparent 70%)" }}
        initial={{ opacity: 0 }}
        animate={play ? { opacity: [0.5, 0.95, 0.5], scale: [0.9, 1.1, 0.9] } : { opacity: lit ? 0.5 : 0 }}
        transition={{ duration: 2.4, repeat: play ? Infinity : 0, ease: "easeInOut" }}
      />
      {/* Embers drifting up */}
      {play &&
        [20, 48, 76, 34, 62].map((x, i) => (
          <motion.span
            key={x}
            className="absolute bottom-[45%] h-1.5 w-1.5 rounded-full"
            style={{ left: `${x}%`, background: i % 2 ? FIRE_HOT : FIRE }}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 0.95, 0], y: -40 - i * 6, x: (i % 2 ? 1 : -1) * (3 + i) }}
            transition={{ duration: 2.4 + i * 0.3, delay: 0.8 + i * 0.45, repeat: Infinity, repeatDelay: 1, ease: "easeOut" }}
          />
        ))}
      {/* Flame: pops in, then breathes */}
      <motion.div
        initial={reduce ? false : { scale: 0.4, opacity: 0, y: 6 }}
        animate={on ? { scale: 1, opacity: 1, y: 0 } : {}}
        transition={{ type: "spring", stiffness: 260, damping: 15, delay: 0.2 }}
      >
        <motion.svg
          viewBox="0 0 24 24"
          className="relative h-11 w-11 overflow-visible"
          animate={play ? { scale: [1, 1.1, 1], rotate: [0, -3, 2, 0] } : undefined}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          style={{
            filter: lit
              ? `drop-shadow(0 0 10px ${FIRE}) drop-shadow(0 0 22px rgba(255,122,47,0.5))`
              : "none",
          }}
        >
          <path
            d={FLAME_PATH}
            fill={lit ? FIRE : "none"}
            stroke={lit ? FIRE_HOT : "rgba(255,255,255,0.3)"}
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.div>
    </div>
  );
}

function StreakWidget({ s, on }: { s: Stats; on: boolean }) {
  const live = s.streakBestNow > 0;
  const days = rigaWeekdays(s.generatedAt);
  return (
    <Widget index={2} label={live ? "Longest live streak" : "Streak record"} icon={Icon.flame} className="lg:col-span-2">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Big>
            <CountUp value={live ? s.streakBestNow : s.streakRecord} start={on} />
            <Unit>{(live ? s.streakBestNow : s.streakRecord) === 1 ? "day" : "days"}</Unit>
          </Big>
          <p className="mt-2 text-sm text-white/60">
            {live
              ? `${fmt(s.streakPeople)} ${s.streakPeople === 1 ? "person" : "people"} on a streak now`
              : "Days in a row with a workout"}
          </p>
        </div>
        <AppFlame on={on} lit={live} />
      </div>
      <div className="mt-auto pt-6">
        <div className="grid grid-cols-7 gap-1.5">
          {s.activeDays.map((n, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <motion.div
                className="flex aspect-square w-full max-w-10 items-center justify-center rounded-full"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={on ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4 + i * 0.09, type: "spring", stiffness: 380, damping: 20 }}
                style={{
                  background: n > 0 ? ACCENT : "rgba(255,255,255,0.08)",
                  boxShadow: n > 0 && i === 6 ? "0 0 18px -2px rgba(200,255,61,0.7)" : undefined,
                }}
                title={`${n} ${n === 1 ? "person" : "people"} moved`}
              >
                {n > 0 && (
                  <svg viewBox="0 0 24 24" fill="none" className="h-1/2 w-1/2 text-black" aria-hidden>
                    <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </motion.div>
              <span className={`text-[10px] ${i === 6 ? "font-bold text-white" : "text-white/40"}`}>{days[i]}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-white/45">People moving each day · record {fmt(s.streakRecord)} days</p>
      </div>
    </Widget>
  );
}

function ChallengesWidget({ s, on }: { s: Stats; on: boolean }) {
  const reduce = useReducedMotion();
  const r = 34;
  const c = 2 * Math.PI * r;
  const share = s.challengesTotal > 0 ? s.challengesActive / s.challengesTotal : 0;
  return (
    <Widget index={4} label="Challenges created" icon={Icon.trophy} className="lg:col-span-2">
      <div className="flex items-center justify-between gap-4">
        <div>
          <Big>
            <CountUp value={s.challengesTotal} start={on} />
            <Unit>total</Unit>
          </Big>
          <p className="mt-2 text-sm text-white/60">
            <span className="font-semibold text-accent">+{fmt(s.challengesWeek)}</span> new this week
          </p>
        </div>
        <div className="relative h-24 w-24 shrink-0">
          <svg
            viewBox="0 0 80 80"
            className="h-full w-full -rotate-90 overflow-visible"
            style={{ filter: "drop-shadow(0 0 6px rgba(200,255,61,0.45))" }}
            aria-hidden
          >
            <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="7" />
            <motion.circle
              cx="40"
              cy="40"
              r={r}
              fill="none"
              stroke={ACCENT}
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={c}
              initial={{ strokeDashoffset: c }}
              animate={on ? { strokeDashoffset: c * (1 - share) } : {}}
              transition={{ duration: 1.6, ease: EASE, delay: 0.4 }}
            />
          </svg>
          <motion.div
            className="absolute inset-0 flex items-center justify-center text-accent"
            animate={reduce || !on ? undefined : { rotate: [0, -8, 8, -4, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 3.5 }}
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8">
              <path d="M8 4h8v5a4 4 0 0 1-8 0V4ZM8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8.5 20h7M10 17h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </div>
      </div>
      <div className="mt-auto pt-6">
        <p className="text-sm text-white/70">
          <span className="font-bold text-white">{fmt(s.challengesActive)}</span> active this week
        </p>
        <p className="mt-1 text-xs text-white/45">Push-ups, squats, sit-ups, lunges and runs — with friends</p>
      </div>
    </Widget>
  );
}

// ------------------------------------------------------------------ section

/** Green "Ready to Join?" button: glides up to the waitlist form in the hero
 *  and puts the cursor in the email field. */
function JoinCTA() {
  const reduce = useReducedMotion();
  const go = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById("join");
    if (!target) return; // plain #join link still works
    e.preventDefault();
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
    const email = document.getElementById("email") as HTMLInputElement | null;
    window.setTimeout(() => email?.focus({ preventScroll: true }), reduce ? 0 : 750);
    history.replaceState(null, "", "#join");
  };
  return (
    <motion.div
      className="mt-12 flex justify-center"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <motion.a
        href="#join"
        onClick={go}
        whileHover={reduce ? undefined : { y: -3, scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-accent px-8 py-4 text-base font-extrabold tracking-tight text-black shadow-[0_14px_40px_-12px_rgba(200,255,61,0.75)] outline-none ring-accent/40 focus-visible:ring-4"
      >
        {/* Shine sweeping across every few seconds */}
        {!reduce && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent"
            initial={{ x: "-150%" }}
            animate={{ x: "400%" }}
            transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity, repeatDelay: 3.2 }}
          />
        )}
        <span className="relative">Ready to Join?</span>
        <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-black text-accent transition-transform duration-300 group-hover:-translate-y-0.5">
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
            <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </motion.a>
    </motion.div>
  );
}

function ago(ms: number) {
  const s = Math.max(0, Math.round(ms / 1000));
  if (s < 10) return "just now";
  if (s < 60) return `${s}s ago`;
  return `${Math.round(s / 60)} min ago`;
}

export default function LiveStats() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const visible = useInView(ref, { margin: "200px" });
  const { data, failed, fetchedAt } = useLiveStats(visible);
  const now = useNow(5000);
  const reduce = useReducedMotion();

  // Nothing worth showing: the numbers failed before ever loading.
  if (failed && !data) return null;

  return (
    <section id="live-stats" ref={ref} className="relative overflow-hidden px-5 py-24 sm:px-8" aria-labelledby="live-stats-title">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-10 h-[420px] w-[820px] max-w-[140vw] -translate-x-1/2 rounded-full bg-accent/[0.07] blur-[120px]" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-12 max-w-xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-white/80 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              {!reduce && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />}
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Live {fetchedAt ? `· updated ${ago(now - fetchedAt)}` : ""}
          </span>
          <h2 id="live-stats-title" className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Our <span className="font-serif font-medium italic text-gradient">Live Stats</span>
          </h2>
          <p className="mt-3 text-white/70">
            Real numbers from the MONA app, straight from our first members — updated every minute.
          </p>
        </motion.div>

        {data ? (
          <motion.div
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="grid grid-flow-dense gap-5 sm:grid-cols-2 lg:grid-cols-6"
          >
            <UsersWidget s={data} on={inView} />
            <RepsWidget s={data} on={inView} />
            <StreakWidget s={data} on={inView} />
            <RunWidget s={data} on={inView} />
            <ChallengesWidget s={data} on={inView} />
          </motion.div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6" aria-busy="true">
            {["lg:col-span-2", "sm:col-span-2 lg:col-span-4", "lg:col-span-2", "lg:col-span-2", "lg:col-span-2"].map((c, i) => (
              <div key={i} className={`h-64 animate-pulse rounded-2xl border border-white/10 bg-white/[0.04] ${c}`} />
            ))}
          </div>
        )}
        <p className="mt-6 text-center text-xs text-white/40">
          Community totals only — no names or personal data. Days follow Riga time.
        </p>
        <JoinCTA />
      </div>
    </section>
  );
}
