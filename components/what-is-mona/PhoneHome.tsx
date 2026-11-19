"use client";

import { motion } from "framer-motion";
import { useId } from "react";
import { appDisplay, appSans } from "@/app/fonts/app-fonts";
import { EASE_OUT, fmt, useAfter, useCountUp } from "./motion";
import { Activity, Bell, ChevronRight, Footprints, Heart, Lock, Pencil, Plus, PushUp, Settings } from "./icons";

// MONA's Home screen, drawn at true iPhone points (393 wide) and scaled to
// the phone's width. Values follow the App Store screenshots (test user
// Emma): a 12-day move streak, 9,840 of 15,000 steps, today's activity at
// 100 of 150, Breathe, and the "100 Push-ups a Day" challenge.
//
// When `active` turns on, the screen settles in: the streak's last day
// lights and its number rolls 11 → 12, the step count and both bars fill,
// and the challenge ring closes to its share of today.

const SCREEN_W = 393;
const LIME = "#C8FF8F";

function Bar({ pct, active, delay = 0, track = "rgba(13,18,12,0.08)" }: { pct: number; active: boolean; delay?: number; track?: string }) {
  return (
    <div className="h-[8px] w-full overflow-hidden rounded-full" style={{ background: track }}>
      <motion.div
        className="h-full rounded-full"
        style={{ background: LIME, transformOrigin: "0% 50%" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: active ? pct / 100 : 0 }}
        transition={{ duration: 1.3, delay, ease: EASE_OUT }}
      />
    </div>
  );
}

function StreakCard({ active }: { active: boolean }) {
  const day7 = useAfter(active, 900);
  const flame = `flame-${useId().replace(/:/g, "")}`;
  return (
    <div
      className="relative flex aspect-square w-[42%] shrink-0 flex-col justify-between overflow-hidden rounded-[28px] p-[14px] text-white"
      style={{
        background: "radial-gradient(120% 90% at 30% 0%, #1d2a17 0%, #0d120c 60%)",
        boxShadow: `0 0 0 1px rgba(200,255,143,0.55), 0 0 22px -4px rgba(200,255,143,0.45), inset 0 0 22px rgba(200,255,143,0.14)`,
      }}
    >
      <div className="flex items-start justify-between">
        <span className={`${appDisplay.className} relative block h-[50px] overflow-hidden text-[54px] font-bold leading-none tracking-tight tabular-nums`}>
          <motion.span
            className="block"
            initial={false}
            animate={{ y: day7 ? -54 : 0 }}
            transition={{ duration: 0.55, ease: EASE_OUT }}
          >
            <span className="block h-[54px]">11</span>
            <span className="block h-[54px]">12</span>
          </motion.span>
        </span>
        <motion.span
          className="-mr-1 -mt-1 block"
          animate={day7 ? { scale: [1, 1.18, 1] } : { scale: 1 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          <svg width="34" height="40" viewBox="0 0 34 40" aria-hidden>
            <defs>
              <radialGradient id={flame} cx="0.5" cy="0.78" r="0.75">
                <stop offset="0" stopColor="#fff8d9" />
                <stop offset="0.38" stopColor="#ffd25a" />
                <stop offset="0.8" stopColor="#c6ef6a" />
                <stop offset="1" stopColor="#8bd04a" />
              </radialGradient>
            </defs>
            <path fill={`url(#${flame})`} d="M18 3c1 7 11 12 11 23 0 8-5.5 12-12 12S5 34 5 27c0-6 4-9.5 6-14 1 4 3 6 5 6.5C15 13.5 16 8 18 3z" />
          </svg>
        </motion.span>
      </div>
      <div>
        <p className="text-[13px] font-medium leading-tight">days</p>
        <p className="truncate text-[11px] leading-tight text-white/50">move streak</p>
        <div className="mt-2 flex h-[20px] gap-[4px]" aria-hidden>
          {Array.from({ length: 7 }, (_, i) => {
            const lit = i < 6 || day7;
            return (
              <span
                key={i}
                className="flex-1 rounded-full transition-[background-color,box-shadow] duration-500"
                style={{
                  background: lit ? LIME : "rgba(255,255,255,0.12)",
                  boxShadow: lit ? "0 0 10px rgba(200,255,143,0.55)" : "none",
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StepsCard({ active }: { active: boolean }) {
  const steps = useCountUp(9840, active, { duration: 1400, delay: 150 });
  return (
    <div className="flex min-w-0 flex-1 flex-col justify-between rounded-[28px] bg-white p-[16px] shadow-[0_10px_30px_-12px_rgba(13,18,12,0.25)]">
      <div className="flex items-center justify-between text-[#0d120c]/60">
        <span className="flex items-center gap-[6px] text-[13px]">
          <Footprints size={16} /> Daily Steps
        </span>
        <Pencil size={15} />
      </div>
      <div>
        <p className={`${appDisplay.className} text-[30px] font-semibold leading-none tracking-tight text-[#0d120c] tabular-nums`}>{fmt(steps)}</p>
        <p className="mt-[4px] text-[12px] text-[#0d120c]/50">of 15,000 steps</p>
      </div>
      <Bar pct={65} active={active} delay={0.15} />
      <p className="text-[12px] text-[#0d120c]/50">
        <span className="font-semibold text-[#0d120c]/80">65%</span>&nbsp;&nbsp;5,160 to go
      </p>
    </div>
  );
}

function ChallengeCard({ title, progress, active, delay }: { title: string; progress: number; active: boolean; delay: number }) {
  const r = 27;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex items-center gap-[16px] rounded-[30px] bg-[#0d120c] py-[16px] pl-[18px] pr-[14px] text-white">
      <div className="relative h-[66px] w-[66px] shrink-0">
        <svg width="66" height="66" viewBox="0 0 66 66" className="-rotate-90" aria-hidden>
          <circle cx="33" cy="33" r={r} fill="#1a2119" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
          <motion.circle
            cx="33"
            cy="33"
            r={r}
            fill="none"
            stroke={LIME}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            animate={{ strokeDashoffset: active ? c * (1 - progress) : c }}
            transition={{ duration: 1.3, delay, ease: EASE_OUT }}
          />
        </svg>
        <PushUp size={26} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white/90" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] uppercase tracking-[0.14em] text-white/55">Daily · Made by me</p>
        <p className="mt-[2px] truncate text-[19px] font-medium leading-tight">{title}</p>
        <p className="mt-[2px] text-[13px] text-white/55">17 days left</p>
      </div>
      <div className="flex shrink-0 flex-col gap-[6px]">
        {[Heart, Lock, Settings].map((I, i) => (
          <span key={i} className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white/10 text-white/80">
            <I size={15} />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function PhoneHome({ width, active }: { width: number; active: boolean }) {
  const bezel = Math.round(width * 0.037);
  const inner = width - bezel * 2;
  const s = inner / SCREEN_W;
  const screenH = 852;
  const activity = useCountUp(100, active, { from: 0, duration: 1200, delay: 300 });

  return (
    <div
      className="relative"
      style={{
        width,
        // the phone runs off the bottom: only the top of it is drawn, and
        // its lower edge dissolves into the section
        height: Math.round((screenH * 0.86) * s + bezel),
        maskImage: "linear-gradient(to bottom, #000 72%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, #000 72%, transparent 100%)",
      }}
      role="img"
      aria-label="MONA's Home screen: a 12-day move streak, 9,840 daily steps, today's activity, Breathe and the 100 Push-ups a Day challenge"
    >
      {/* bezel */}
      <div
        className="absolute inset-x-0 top-0 rounded-[56px] bg-[#0b0d0b]"
        style={{
          height: screenH * s + bezel * 2,
          borderRadius: 56 * s + bezel,
          boxShadow: "0 0 0 1.5px #3a3f38, inset 0 0 0 1.5px #1c201b, 0 50px 100px -30px rgba(0,0,0,0.85), 0 0 80px -10px rgba(200,255,61,0.18)",
        }}
      />
      {/* screen at true points */}
      <div
        className="absolute overflow-hidden"
        style={{ left: bezel, top: bezel, width: inner, height: screenH * s, borderRadius: 48 * s }}
      >
        <div
          className={`${appSans.className} absolute left-0 top-0 origin-top-left text-[#0d120c]`}
          style={{ width: SCREEN_W, height: screenH, transform: `scale(${s})`, background: "linear-gradient(180deg,#f1f8ec 0%,#e9f4e3 100%)" }}
        >
          {/* status bar + island */}
          <div className="absolute left-1/2 top-[11px] h-[37px] w-[124px] -translate-x-1/2 rounded-full bg-black" />
          <div className="absolute left-[34px] right-[30px] top-[17px] flex items-center justify-between text-[16px] font-semibold">
            <span>9:41</span>
            <span className="flex items-center gap-[6px]">
              <svg width="18" height="12" viewBox="0 0 18 12" aria-hidden>
                <rect x="0" y="8" width="3" height="4" rx="1" fill="#0d120c" />
                <rect x="5" y="5.5" width="3" height="6.5" rx="1" fill="#0d120c" />
                <rect x="10" y="3" width="3" height="9" rx="1" fill="#0d120c" />
                <rect x="15" y="0" width="3" height="12" rx="1" fill="#0d120c" />
              </svg>
              <svg width="26" height="12" viewBox="0 0 26 12" aria-hidden>
                <rect x="0.5" y="0.5" width="22" height="11" rx="3.5" fill="none" stroke="#0d120c" strokeOpacity="0.4" />
                <rect x="2.5" y="2.5" width="18" height="7" rx="2" fill="#0d120c" />
                <rect x="23.5" y="4" width="1.8" height="4" rx="0.9" fill="#0d120c" fillOpacity="0.4" />
              </svg>
            </span>
          </div>

          <div className="absolute inset-x-[24px] top-[70px] flex flex-col gap-[14px]">
            {/* header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[12px]">
                <span className={`${appDisplay.className} flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[#0d120c] text-[16px] text-white`}>E</span>
                <div>
                  <p className="text-[14px] text-[#0d120c]/50">Hello,</p>
                  <p className={`${appDisplay.className} mt-[2px] text-[30px] font-medium leading-none`}>Emma</p>
                </div>
              </div>
              <span className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[#0d120c]/[0.06] text-[#0d120c]/80">
                <Bell size={20} />
              </span>
            </div>

            <div className="mt-[6px] flex gap-[12px]">
              <StreakCard active={active} />
              <StepsCard active={active} />
            </div>

            {/* today's activity */}
            <div className="rounded-[24px] border border-[#0d120c]/[0.06] bg-[#0d120c]/[0.04] px-[18px] py-[14px]">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-[8px] text-[11px] font-medium uppercase tracking-[0.16em] text-[#0d120c]/60">
                  <Activity size={15} /> Today&rsquo;s activity
                </span>
                <span className="flex items-center gap-[8px] text-[13px] text-[#0d120c]/70">
                  <span className="tabular-nums">{activity} / 150</span>
                  <span className="rounded-full bg-[#C8FF8F]/60 px-[8px] py-[2px] text-[12px] font-semibold text-[#0d120c]">67%</span>
                </span>
              </div>
              <div className="mt-[12px]">
                <Bar pct={67} active={active} delay={0.3} />
              </div>
            </div>

            {/* Breathe */}
            <div className="relative flex h-[66px] items-center gap-[14px] overflow-hidden rounded-[30px] px-[18px] text-white" style={{ background: "linear-gradient(90deg,#122016 0%,#0d120c 55%,#0b0e0b 100%)" }}>
              <motion.span
                className="h-[34px] w-[34px] shrink-0 rounded-full"
                style={{ background: "radial-gradient(circle at 38% 32%, #f3ffd9, #c8ff8f 55%, #8fd352)", boxShadow: "0 0 18px rgba(200,255,143,0.55)" }}
                animate={active ? { scale: [1, 1.14, 1] } : { scale: 1 }}
                transition={{ duration: 4, repeat: active ? Infinity : 0, ease: "easeInOut" }}
              />
              <span className={`${appDisplay.className} text-[24px] font-medium`}>Breathe</span>
              <span className="absolute left-[62%] top-[14px] h-[6px] w-[6px] rounded-full bg-white/80" aria-hidden />
              <span className="ml-auto flex h-[38px] w-[38px] items-center justify-center rounded-full bg-white/10">
                <ChevronRight size={18} />
              </span>
            </div>

            {/* challenges */}
            <div className="mt-[10px] flex items-center justify-between">
              <p className={`${appDisplay.className} text-[22px] font-medium`}>Today&rsquo;s Challenges</p>
              <Plus size={24} className="text-[#0d120c]/50" />
            </div>
            <p className="-mt-[6px] text-[13px] text-[#0d120c]/50">Tip: press and hold a card to move it up or down.</p>
            <ChallengeCard title="100 Push-ups a Day" progress={0.62} active={active} delay={0.45} />
            <ChallengeCard title="Squat Builder" progress={0.4} active={active} delay={0.55} />
          </div>
        </div>
      </div>
    </div>
  );
}
