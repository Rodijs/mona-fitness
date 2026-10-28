"use client";

import { motion, useReducedMotion } from "framer-motion";

// "Our Story": who makes MONA and why. Same words as the app's Profile →
// About → Our story (move-nation-ai: src/routes/our-story.tsx), in the
// website's style. Signed "Rod" only; the full name is in the privacy policy.

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

export default function Story() {
  const reduce = useReducedMotion();

  return (
    <section id="story" className="relative px-5 py-24 sm:px-8" aria-labelledby="story-title">
      <div className="mx-auto max-w-6xl">
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-14 max-w-xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-white/80 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
            Why MONA exists
          </span>
          <h2
            id="story-title"
            className="mt-5 scroll-mt-28 text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
          >
            Our <span className="font-serif font-medium italic text-gradient">Story</span>
          </h2>
        </motion.div>

        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-3">
              <motion.span
                aria-hidden
                className="inline-block origin-[70%_80%] text-4xl"
                initial={{ rotate: 0 }}
                whileInView={reduce ? undefined : { rotate: [0, 18, -8, 14, 0] }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: 0.3 }}
              >
                👋
              </motion.span>
              <h3 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Hi, I&apos;m Rod.
              </h3>
            </div>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-white/70 sm:text-lg">
              <p>
                I&apos;m a husband, a dad, and someone who believes that staying active should be
                part of everyday life. I train in my home gym and go for runs whenever I can find
                the time.
              </p>
              <p>
                Life is busy, especially with a family. But I still wanted to move, feel stronger,
                and make time for myself. I started looking for a simpler way to make movement part
                of everyday life.
              </p>
            </div>
          </motion.div>

          <motion.figure
            {...fadeUp}
            transition={{ duration: 0.6, delay: reduce ? 0 : 0.1 }}
            className="relative overflow-hidden rounded-[28px] bg-accent p-8 text-background shadow-[0_30px_80px_-30px_rgba(200,255,61,0.45)] sm:p-10"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -top-8 right-5 font-serif text-[160px] leading-none opacity-15"
            >
              &ldquo;
            </span>
            <blockquote className="relative text-2xl font-extrabold leading-snug tracking-tight sm:text-3xl">
              What if moving every day was as easy, and as fun, as sending a message to a friend?
            </blockquote>
          </motion.figure>
        </div>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5 }}
          className="mx-auto mt-14 max-w-3xl space-y-4 text-base leading-relaxed text-white/70 sm:text-lg"
        >
          <p>
            That question became MONA. Prop your phone up, do your push-ups, squats or lunges, and
            the camera counts every rep, no gadgets, no gym. Then see how your friends are doing
            and keep the streak alive together.
          </p>
          <p>
            Many of the best ideas came at the end of long days, some of them while putting my
            youngest daughter to sleep. MONA is built in those quiet hours, one small step at a
            time. Just like the habit it&apos;s meant to help you build.
          </p>
        </motion.div>

        <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="mt-14 text-center">
          <p className="text-2xl font-extrabold tracking-tight text-white">
            Thank you for moving with us.
          </p>
          <p className="mt-2 font-serif text-2xl font-medium italic text-gradient">Rod</p>
          <p className="mt-6 text-xs uppercase tracking-[0.2em] text-white/40">
            Made with care in Latvia 🇱🇻
          </p>
        </motion.div>
      </div>
    </section>
  );
}
