"use client";

import { getImageProps } from "next/image";
import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import EmailForm from "./EmailForm";

function badgeText(count: number | null) {
  if (!count || count <= 0) {
    return "Now we are building the waitlist for early access.";
  }
  const noun = count === 1 ? "member" : "members";
  return `Now we are building the waitlist for early access — join ${count} ${noun} already on the list.`;
}

// Hero photo. Phones and tablets get the original photo. Large landscape
// screens (laptops, desktops) get a wider copy — soft, out-of-focus
// scenery added on the left — anchored right, so the runner sits beside
// the centred text instead of behind it. Squarer screens (e.g. iPad
// landscape) keep the original, where the wide copy would crop him badly.
const WIDE_MEDIA = "(min-width: 1024px) and (min-aspect-ratio: 3/2)";
const HERO_ALT = "A trail runner striding along a misty mountain ridge";
const {
  props: { srcSet: heroWide },
} = getImageProps({
  alt: HERO_ALT,
  src: "/hero-trail-wide-v2.jpg",
  width: 3380,
  height: 1600,
  sizes: "100vw",
  quality: 75,
});
const {
  props: { srcSet: heroMobile, ...heroRest },
} = getImageProps({
  alt: HERO_ALT,
  src: "/hero-trail.jpg",
  width: 2400,
  height: 1600,
  sizes: "100vw",
  quality: 75,
  loading: "eager",
  fetchPriority: "high",
});

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/waitlist-count")
      .then((res) => res.json())
      .then((data) => {
        if (typeof data?.count === "number") setCount(data.count);
      })
      .catch(() => {
        // Leave count as null — badge falls back to generic copy.
      });
  }, []);

  return (
    <section id="top" className="px-2 pt-2 sm:px-3 sm:pt-3">
      <div className="relative min-h-[92svh] overflow-hidden rounded-[24px] sm:min-h-[94svh] sm:rounded-[36px]">
        {/* background photo with slow ken-burns drift */}
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <picture>
            <source media={WIDE_MEDIA} srcSet={heroWide} />
            <img
              {...heroRest}
              srcSet={heroMobile}
              alt={HERO_ALT}
              className="absolute inset-0 h-full w-full object-cover object-[68%_42%] [@media(min-width:1024px)_and_(min-aspect-ratio:3/2)]:object-right"
            />
          </picture>
        </motion.div>

        {/* legibility gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/25 to-black/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-black/20 to-black/55 [@media(min-width:1024px)_and_(min-aspect-ratio:3/2)]:to-black/25" />

        {/* content, centered */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 flex min-h-[92svh] flex-col items-center justify-center px-5 py-28 text-center sm:min-h-[94svh] sm:px-8"
        >
          <motion.span
            variants={item}
            className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white/90 backdrop-blur-md"
          >
            {badgeText(count)}
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-6 max-w-3xl text-3xl font-extrabold uppercase leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            Move &amp; Build
            <br />
            <span className="font-serif text-[2.75rem] italic font-medium normal-case leading-[1.1] tracking-normal text-accent sm:text-7xl md:text-[5.5rem]">
              Consistency
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-md text-sm text-white/75 sm:text-base lg:max-w-none"
            data-testid="hero-intro"
          >
            MONA turns everyday movement into a habit.{" "}
            <br className="hidden lg:block" />
            Track your reps with AI, take on daily challenges, and see your
            progress — one workout at a time.
          </motion.p>

          <motion.div
            variants={item}
            id="join"
            className="mt-8 flex w-full flex-col items-center gap-3"
          >
            <EmailForm variant="glass" onSubscribed={setCount} />
            <p className="text-xs text-white/60">
              No spam. Just one email when we launch.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
