"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { PUSHUP_CHALLENGE_URL } from "@/lib/contact";

// "Our Story": who makes MONA and why. Same words as the app's Profile →
// About → Our story (move-nation-ai: src/routes/our-story.tsx). Laid out like
// the newsletter on altitudebev.com: a big rounded photo frame — a misty studio
// with one person mid-push-up on the floor — with a frosted-glass
// card in the middle, ringed in a lime gradient.


const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

export default function Story() {
  const reduce = useReducedMotion();

  return (
    <section
      id="story"
      // On wide screens the menu link lands with the card right under the menu.
      className="scroll-mt-20 px-2 pt-12 sm:px-3 sm:pt-16 lg:scroll-mt-[-40px]"
      aria-labelledby="story-title"
    >
      <div className="relative overflow-hidden rounded-[28px] bg-[#111b22] sm:rounded-[44px]">
        {/* A misty studio with a soft light in the middle and one person doing
            push-ups on the floor, bottom right. Wide screens: the photo fills
            the whole frame, the card floats in the light and the person is
            just below its corner. Phones and tablets: the photo sits at the
            bottom, its top fading into the dark. It settles in on scroll. */}
        <motion.div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[120vw] origin-bottom lg:top-0 lg:h-auto"
          initial={reduce ? false : { scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/story/studio-floor.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[88%_100%] lg:object-[85%_100%]"
          />
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#111b22] to-transparent lg:hidden" />
        </motion.div>

        <div className="relative flex justify-center px-3 pb-[28vw] pt-8 sm:px-5 sm:pb-[26vw] sm:pt-12 lg:pb-[max(220px,11vw)] lg:pt-[6.5vw]">
          <motion.article
            {...fadeUp}
            transition={{ duration: 0.6 }}
            className="lime-stroke relative w-full max-w-6xl rounded-[28px] bg-[rgba(11,13,15,0.78)] px-5 py-9 backdrop-blur-[14px] sm:rounded-[36px] sm:px-10 sm:py-12 lg:px-14"
          >
            <div className="text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-white/80">
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

            {/* Phones: one column. Wide screens: the intro beside the quote,
                then the rest of the story in two columns. */}
            <div className="mt-9 grid items-center gap-8 lg:mt-12 lg:grid-cols-2 lg:gap-12">
              <div>
                <div className="flex items-center gap-3">
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
                <p className="mt-5 text-white/75">
                  I&apos;m a husband and a dad. I train in my home gym and run whenever
                  I find the time. Life with a family is busy, but I still wanted to move every day
                  and feel stronger, so I went looking for a simpler way.
                </p>
              </div>
              <motion.figure
                {...fadeUp}
                transition={{ duration: 0.6, delay: reduce ? 0 : 0.1 }}
                className="relative overflow-hidden rounded-[24px] bg-accent p-7 text-background shadow-[0_24px_60px_-28px_rgba(200,255,61,0.55)] sm:p-9"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-7 right-4 font-serif text-[140px] leading-none opacity-15"
                >
                  &ldquo;
                </span>
                <blockquote className="relative text-balance text-lg font-extrabold leading-snug tracking-tight sm:text-xl lg:text-[22px]">
                  What if moving every day was as easy, and as fun, as sending a message to a
                  friend?
                </blockquote>
              </motion.figure>
            </div>

            <div className="mt-8 grid gap-4 text-white/75 lg:mt-10 lg:grid-cols-2 lg:gap-12">
              <p>
                That question became MONA. Prop up your phone, move, and the camera counts every
                rep. Then keep the streak alive with friends.
              </p>
              <p>
                Many of the best ideas came while putting my youngest daughter to sleep. MONA is
                built in those quiet hours, one small step at a time, just like the habit
                it&apos;s meant to help you build.
              </p>
            </div>

            {/* The camera is the big worry with an app like this: answer it here. */}
            <p className="mx-auto mt-8 flex max-w-2xl items-start justify-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-left text-sm text-white/80 sm:items-center">
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                className="mt-0.5 h-4 w-4 shrink-0 text-accent sm:mt-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="4" y="11" width="16" height="10" rx="2" />
                <path d="M8 11V7a4 4 0 0 1 8 0v4" />
              </svg>
              <span>
                <strong className="font-semibold text-white">Private by design.</strong> Reps are
                counted on your phone. No video is recorded or uploaded.
              </span>
            </p>

            <div className="mt-9 flex flex-col items-center gap-5 border-t border-white/10 pt-8">
              {/* Same lettering as "Story" in the title, smaller. */}
              <p className="text-center font-serif text-xl font-medium italic tracking-tight sm:text-2xl">
                <span className="text-gradient">Thank you for moving with us.</span>
              </p>
              <motion.a
                href={PUSHUP_CHALLENGE_URL}
                whileHover={reduce ? undefined : { y: -3, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 rounded-full bg-accent px-7 py-3.5 text-base font-extrabold tracking-tight text-black shadow-[0_14px_40px_-12px_rgba(200,255,61,0.75)] outline-none ring-accent/40 focus-visible:ring-4"
                aria-label="Join the First Push-ups challenge in the MONA app"
                data-testid="story-cta"
              >
                <span className="sm:hidden">Join First Push-ups</span>
                <span className="hidden sm:inline">Join the First Push-ups challenge</span>
                <span aria-hidden>→</span>
              </motion.a>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
