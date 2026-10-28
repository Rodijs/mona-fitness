"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

// "Our Story": who makes MONA and why. Same words as the app's Profile →
// About → Our story (move-nation-ai: src/routes/our-story.tsx). Laid out like
// the newsletter on altitudebev.com: a big rounded photo frame — a misty studio
// with one person mid-push-up under a round light — with a wide frosted-glass
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
      // On wide screens the menu link lands just above the person, with the
      // card in view, rather than on the empty top of the photo.
      className="scroll-mt-20 px-2 py-12 sm:px-3 sm:py-16 lg:scroll-mt-[-110px]"
      aria-labelledby="story-title"
    >
      <div className="relative overflow-hidden rounded-[28px] bg-[#0b0d0f] sm:rounded-[44px]">
        {/* The photo fills the top of the frame and runs on under the card,
            fading into the dark. The person stays in view just above the card.
            It gently settles in as it scrolls into view. */}
        <motion.div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[80vw] origin-top lg:h-[min(62vw,640px)]"
          initial={reduce ? false : { scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/story/studio-pushup.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[60%_30%]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent from-60% to-[#0b0d0f]" />
        </motion.div>
        {/* Darken the edges so the card and text stay easy to read. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,transparent_35%,rgba(0,0,0,0.45)_85%)]"
        />

        <div className="relative flex justify-center px-3 pb-10 pt-[56vw] sm:px-6 sm:pb-12 lg:px-10 lg:pb-14 lg:pt-[min(46vw,470px)]">
          <motion.article
            {...fadeUp}
            transition={{ duration: 0.6 }}
            className="lime-stroke relative w-full max-w-6xl rounded-[28px] bg-[rgba(11,13,15,0.6)] px-5 py-9 backdrop-blur-[14px] sm:rounded-[36px] sm:px-10 sm:py-12 lg:px-14"
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
                <div className="mt-5 space-y-4 text-white/75">
                  <p>
                    I&apos;m a husband, a dad, and someone who believes that staying active should
                    be part of everyday life. I train in my home gym and go for runs whenever I can
                    find the time.
                  </p>
                  <p>
                    Life is busy, especially with a family. But I still wanted to move, feel
                    stronger, and make time for myself. I started looking for a simpler way to make
                    movement part of everyday life.
                  </p>
                </div>
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
                <blockquote className="relative text-xl font-extrabold leading-snug tracking-tight sm:text-2xl">
                  What if moving every day was as easy, and as fun, as sending a message to a
                  friend?
                </blockquote>
              </motion.figure>
            </div>

            <div className="mt-8 grid gap-4 text-white/75 lg:mt-10 lg:grid-cols-2 lg:gap-12">
              <p>
                That question became MONA. Prop your phone up, do your push-ups, squats or
                lunges, and the camera counts every rep, no gadgets, no gym. Then see how your
                friends are doing and keep the streak alive together.
              </p>
              <p>
                Many of the best ideas came at the end of long days, some of them while putting
                my youngest daughter to sleep. MONA is built in those quiet hours, one small step
                at a time. Just like the habit it&apos;s meant to help you build.
              </p>
            </div>

            <p className="mt-9 border-t border-white/10 pt-7 text-center text-xl font-extrabold tracking-tight text-white sm:text-2xl">
              Thank you for moving with us.
            </p>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
