"use client";

import Image from "next/image";
import { useRef } from "react";
import { MotionConfig, motion, useInView, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import PhoneHome from "./what-is-mona/PhoneHome";
import { LeaderCard, PeopleChip, RepCard, RunCard, StreakCard } from "./what-is-mona/FeatureCards";
import { EASE_OUT, useAfter, useMedia } from "./what-is-mona/motion";

// "What is MONA?": MONA's real Home screen on a phone in the middle, with
// the features that make MONA around it, each card carrying a small piece of
// the app. On scroll the phone rises into place, the cards slide out from
// behind it, and every card then plays its own short story. On wide screens
// the cards also drift at slightly different speeds while you scroll.
// Reduced motion: things appear without travelling, counts show their final
// numbers, and the cards stop drifting.

type Side = "left" | "right";

function Arrive({
  shown,
  side,
  order,
  drift,
  reduce,
  children,
}: {
  shown: boolean;
  side: Side;
  order: number;
  drift: MotionValue<number> | number;
  reduce: boolean;
  children: (active: boolean) => React.ReactNode;
}) {
  // a card's own story starts once it has landed
  const landed = useAfter(shown, reduce ? 0 : 650 + order * 140);
  return (
    <motion.div style={{ y: drift }}>
      <motion.div
        initial={{ opacity: 0, x: side === "left" ? 90 : -90, y: 24, scale: 0.9, filter: "blur(10px)" }}
        animate={shown || reduce ? { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" } : undefined}
        transition={{ duration: 0.95, delay: 0.35 + order * 0.14, ease: EASE_OUT }}
      >
        {children(landed || !!reduce)}
      </motion.div>
    </motion.div>
  );
}

function Stacked({ reduce, children }: { reduce: boolean; children: (active: boolean) => React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.5 });
  const active = useAfter(seen, reduce ? 0 : 450);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.8, ease: EASE_OUT }}
    >
      {children(active || reduce)}
    </motion.div>
  );
}

const CARDS: { side: Side; render: (a: boolean) => React.ReactNode }[] = [
  { side: "left", render: (a) => <RepCard active={a} /> },
  { side: "left", render: (a) => <LeaderCard active={a} /> },
  { side: "right", render: (a) => <StreakCard active={a} /> },
  { side: "right", render: (a) => <RunCard active={a} /> },
];

export default function Features() {
  const reduce = !!useReducedMotion();
  const wide = useMedia("(min-width: 1280px)");
  const stage = useRef<HTMLDivElement>(null);
  const shown = useInView(stage, { once: true, amount: 0.25 });
  const phoneOn = useAfter(shown, reduce ? 0 : 700);

  const { scrollYProgress } = useScroll({ target: stage, offset: ["start end", "end start"] });
  const still = reduce || !wide;
  const phoneDrift = useTransform(scrollYProgress, [0, 1], still ? [0, 0] : [50, -50]);
  const driftA = useTransform(scrollYProgress, [0, 1], still ? [0, 0] : [90, -90]);
  const driftB = useTransform(scrollYProgress, [0, 1], still ? [0, 0] : [30, -30]);
  const drifts = [driftA, driftB, driftB, driftA];

  const lines = ["What is", "Mona?"];

  return (
    <MotionConfig reducedMotion="user">
    <section id="about" className="relative overflow-hidden px-5 py-24 sm:px-8 lg:py-32">
      <Image
        src="/features-forest.jpg"
        alt="Sunbeams filtering through a mossy forest trail"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-black/75 to-background" />
      {/* a soft lime light behind the phone */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[44%] h-[620px] w-[620px] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(200,255,61,0.18), rgba(200,255,61,0) 70%)" }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* heading */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="text-xs font-semibold uppercase tracking-[0.28em] text-accent"
          >
            MONA · Movement Nation
          </motion.p>
          <h2 id="features" className="mt-4 scroll-mt-28 text-4xl font-extrabold tracking-tight text-white sm:scroll-mt-32 sm:text-5xl">
            {lines.map((line, i) => (
              <motion.span
                key={line}
                className={`inline-block ${i === 1 ? "pl-[0.25em]" : ""}`}
                initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: 0.1 + i * 0.12, ease: EASE_OUT }}
              >
                {i === 1 ? (
                  <>
                    <span className="font-serif font-medium italic text-gradient">Mona</span>?
                  </>
                ) : (
                  line
                )}
              </motion.span>
            ))}
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE_OUT }}
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
          >
            A fitness app that makes moving every day simple, social and hard to skip. Your phone counts the reps.
            Your friends keep you going.
          </motion.p>
        </div>

        {/* stage */}
        <div ref={stage} className="relative mt-16 lg:mt-20">
          {/* wide screens (1280+): cards on both sides of the phone */}
          <div className="hidden grid-cols-[minmax(0,1fr)_360px_minmax(0,1fr)] items-start gap-14 xl:grid">
              <div className="flex flex-col items-end gap-6 pt-10">
                {CARDS.filter((c) => c.side === "left").map((c, i) => (
                  <div key={i} className="w-full max-w-[330px]">
                    <Arrive shown={shown} side="left" order={i * 2} drift={drifts[i]} reduce={reduce}>
                      {c.render}
                    </Arrive>
                  </div>
                ))}
              </div>

              <motion.div style={{ y: phoneDrift }} className="relative">
                <motion.div
                  initial={{ opacity: 0, y: 110, scale: 0.92 }}
                  animate={shown || reduce ? { opacity: 1, y: 0, scale: 1 } : undefined}
                  transition={{ duration: 1.1, ease: EASE_OUT }}
                >
                  <PhoneHome width={360} active={phoneOn} />
                </motion.div>
                <Chip shown={shown} reduce={reduce} className="absolute -bottom-4 left-1/2 w-max -translate-x-1/2" from="below" delay={1.25}>
                  <PeopleChip />
                </Chip>
              </motion.div>

              <div className="flex flex-col items-start gap-6 pt-28">
                {CARDS.filter((c) => c.side === "right").map((c, i) => (
                  <div key={i} className="w-full max-w-[330px]">
                    <Arrive shown={shown} side="right" order={i * 2 + 1} drift={drifts[i + 2]} reduce={reduce}>
                      {c.render}
                    </Arrive>
                  </div>
                ))}
              </div>
          </div>

          {/* phones and tablets: the phone, then the cards in a grid */}
          <div className="flex flex-col items-center xl:hidden">
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, y: 80, scale: 0.94 }}
                  animate={shown || reduce ? { opacity: 1, y: 0, scale: 1 } : undefined}
                  transition={{ duration: 1, ease: EASE_OUT }}
                >
                  <PhoneHome width={300} active={phoneOn} />
                </motion.div>
                <Chip shown={shown} reduce={reduce} className="absolute -bottom-4 left-1/2 w-max -translate-x-1/2" from="below" delay={1.05}>
                  <PeopleChip />
                </Chip>
              </div>
              <div className="mt-10 grid w-full max-w-[680px] gap-4 sm:grid-cols-2">
                {CARDS.map((c, i) => (
                  <Stacked key={i} reduce={reduce}>
                    {c.render}
                  </Stacked>
                ))}
              </div>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="mt-14 text-center text-base font-semibold tracking-tight text-accent sm:text-lg"
        >
          Move every day. Move better. Move together.
        </motion.p>
      </div>
    </section>
    </MotionConfig>
  );
}

function Chip({
  shown,
  reduce,
  className,
  from,
  delay,
  children,
}: {
  shown: boolean;
  reduce: boolean;
  className: string;
  from: Side | "below";
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <div className={`z-10 ${className}`}>
    <motion.div
      initial={{ opacity: 0, x: from === "left" ? 40 : from === "right" ? -40 : 0, y: from === "below" ? 30 : 0, scale: 0.85 }}
      animate={shown || reduce ? { opacity: 1, x: 0, y: 0, scale: 1 } : undefined}
      transition={{ duration: 0.8, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
    </div>
  );
}
