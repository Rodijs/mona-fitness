"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

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
      className="scroll-mt-20 px-2 py-12 sm:px-3 sm:py-16 lg:scroll-mt-[-40px]"
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

        <div className="relative flex justify-center px-3 pb-[28vw] pt-8 sm:px-6 sm:pb-[26vw] sm:pt-12 lg:px-10 lg:pb-[max(220px,11vw)] lg:pt-[6.5vw]">
          <motion.article
            {...fadeUp}
            transition={{ duration: 0.6 }}
            className="lime-stroke relative w-full max-w-5xl rounded-[28px] bg-[rgba(11,13,15,0.78)] px-5 py-9 backdrop-blur-[14px] sm:rounded-[36px] sm:px-10 sm:py-12 lg:px-14"
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
