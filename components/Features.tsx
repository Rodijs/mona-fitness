"use client";

import Image from "next/image";
import { motion } from "framer-motion";

function ScanIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M4 8V6a2 2 0 0 1 2-2h2M20 8V6a2 2 0 0 0-2-2h-2M4 16v2a2 2 0 0 0 2 2h2M20 16v2a2 2 0 0 1-2 2h-2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function FlameIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M12 3s4 3.5 4 8a4 4 0 1 1-8 0c0-1.2.6-2 1.2-2.8.3 1 1.1 1.3 1.5.8C11.2 8 10 6.8 10 5c1 .5 1.6 0 2-2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SlidersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path d="M4 6h9M17 6h3M4 12h3M9 12h11M4 18h13M21 18h-1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="13" cy="6" r="2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="6" cy="12" r="2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17" cy="18" r="2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

const FEATURES = [
  {
    number: "01",
    title: "AI Movement Tracking",
    lead: "Your camera becomes your coach.",
    description:
      "MONA recognizes exercises and automatically counts your reps and tracks your movement.",
    icon: ScanIcon,
  },
  {
    number: "02",
    title: "Daily Challenges",
    lead: "Small challenges. Real progress.",
    description:
      "Build consistency with daily movement goals, challenges, streaks and measurable progress.",
    icon: FlameIcon,
  },
  {
    number: "03",
    title: "Personalised Fitness",
    lead: "Training that adapts to you.",
    description:
      "MONA learns from your workouts and helps you train at the right intensity for your goals.",
    icon: SlidersIcon,
  },
];

export default function Features() {
  return (
    <section id="about" className="relative overflow-hidden px-5 py-24 sm:px-8">
      <Image
        src="/features-forest.jpg"
        alt="Sunbeams filtering through a mossy forest trail"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-black/70 to-background" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-14 max-w-xl text-center"
        >
          <h2 id="features" className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            What is{" "}
            <span className="font-serif italic font-medium text-gradient">Mona</span>?
          </h2>
          <p className="mt-3 text-white/70">
            MONA uses AI-powered movement tracking to recognize exercises,
            count repetitions, track workouts, and help users stay motivated
            through daily challenges and progress tracking.
          </p>
          <p className="mt-5 text-base font-semibold tracking-tight text-accent sm:text-lg">
            Move every day. Move better. Move together.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-white/15 bg-black/40 p-6 backdrop-blur-md transition-colors hover:border-accent/40"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <feature.icon />
                </div>
                <span className="text-xs font-semibold tracking-wide text-white/40">
                  {feature.number}
                </span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">
                {feature.title}
              </h3>
              <p className="mb-2 text-sm font-semibold text-white/90">
                {feature.lead}
              </p>
              <p className="text-sm leading-relaxed text-white/70">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
