"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

// "Our Story": who makes MONA and why. Same words as the app's Profile →
// About → Our story (move-nation-ai: src/routes/our-story.tsx). Laid out like
// the newsletter on altitudebev.com: a big rounded photo frame — here a
// black-and-white mosaic of people moving (the app's challenge photos) — with
// a frosted-glass card in the middle, ringed in a lime gradient. Signed "Rod"
// only; the full name is in the privacy policy.

const PHOTOS = [
  "/story/pushups.jpg",
  "/story/squats.jpg",
  "/story/run.jpg",
  "/story/lunges.jpg",
  "/story/situps.jpg",
  "/story/walk-run.jpg",
];

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

export default function Story() {
  const reduce = useReducedMotion();

  return (
    <section id="story" className="scroll-mt-20 px-2 py-12 sm:px-3 sm:py-16" aria-labelledby="story-title">
      <div className="relative overflow-hidden rounded-[28px] sm:rounded-[44px]">
        {/* Photo mosaic: 2 columns on phones, 3 on wide screens. */}
        <div aria-hidden className="absolute inset-0 grid grid-cols-2 grid-rows-3 lg:grid-cols-3 lg:grid-rows-2">
          {PHOTOS.map((src, i) => (
            <motion.div
              key={src}
              className="relative overflow-hidden"
              initial={reduce ? false : { scale: 1.12 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(min-width: 1024px) 34vw, 50vw"
                className="object-cover grayscale"
              />
            </motion.div>
          ))}
        </div>
        {/* Darken the photos so the card and text stay easy to read. */}
        <div aria-hidden className="absolute inset-0 bg-black/55" />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,255,61,0.10),transparent_60%)]"
        />

        <div className="relative flex justify-center px-3 py-16 sm:px-6 sm:py-24 lg:py-28">
          <motion.article
            {...fadeUp}
            transition={{ duration: 0.6 }}
            className="glass lime-stroke relative w-full max-w-3xl rounded-[28px] px-5 py-10 sm:rounded-[36px] sm:px-10 sm:py-14 lg:px-14"
          >
            <div className="text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-white/80">
                <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
                Why MONA exists
              </span>
              <h2
                id="story-title"
                className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
              >
                Our <span className="font-serif font-medium italic text-gradient">Story</span>
              </h2>
            </div>

            <div className="mt-10 flex items-center gap-3">
              <motion.span
                aria-hidden
                className="inline-block origin-[70%_80%] text-3xl"
                initial={{ rotate: 0 }}
                whileInView={reduce ? undefined : { rotate: [0, 18, -8, 14, 0] }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: 0.4 }}
              >
                👋
              </motion.span>
              <h3 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Hi, I&apos;m Rod.
              </h3>
            </div>
            <div className="mt-5 space-y-4 text-white/75">
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

            <motion.figure
              {...fadeUp}
              transition={{ duration: 0.6, delay: reduce ? 0 : 0.1 }}
              className="relative my-9 overflow-hidden rounded-[24px] bg-accent p-7 text-background shadow-[0_24px_60px_-28px_rgba(200,255,61,0.55)] sm:p-9"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -top-7 right-4 font-serif text-[140px] leading-none opacity-15"
              >
                &ldquo;
              </span>
              <blockquote className="relative text-xl font-extrabold leading-snug tracking-tight sm:text-2xl">
                What if moving every day was as easy, and as fun, as sending a message to a friend?
              </blockquote>
            </motion.figure>

            <div className="space-y-4 text-white/75">
              <p>
                That question became MONA. Prop your phone up, do your push-ups, squats or lunges,
                and the camera counts every rep, no gadgets, no gym. Then see how your friends are
                doing and keep the streak alive together.
              </p>
              <p>
                Many of the best ideas came at the end of long days, some of them while putting my
                youngest daughter to sleep. MONA is built in those quiet hours, one small step at a
                time. Just like the habit it&apos;s meant to help you build.
              </p>
            </div>

            <div className="mt-10 border-t border-white/10 pt-8 text-center">
              <p className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
                Thank you for moving with us.
              </p>
              <p className="mt-1 font-serif text-2xl font-medium italic text-gradient">Rod</p>
              <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
                Made with care in Latvia 🇱🇻
              </p>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
