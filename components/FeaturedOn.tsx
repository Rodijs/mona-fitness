// "Featured on" badge row shown directly above the footer on the homepage.
// To add a badge, add another <li> with the same class names: the row wraps
// and stays centered on narrow screens.

const BADGE_ITEM =
  "opacity-60 grayscale transition-[opacity,filter] duration-200 hover:opacity-100 hover:grayscale-0 focus-within:opacity-100 focus-within:grayscale-0";

export default function FeaturedOn() {
  return (
    <section aria-labelledby="featured-on" className="px-5 pb-10 pt-4 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4">
        <h2
          id="featured-on"
          className="text-xs font-semibold uppercase tracking-[0.2em] text-muted"
        >
          Featured on
        </h2>
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <li className={BADGE_ITEM}>
            {/* Badge markup is the provider's, kept unchanged. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <a href="https://startupfa.me/s/mona?utm_source=mona.fitness" target="_blank"><img src="https://startupfa.me/badges/featured-badge-small.webp" alt="MONA - Featured on Startup Fame" width="224" height="36" /></a>
          </li>
        </ul>
      </div>
    </section>
  );
}
