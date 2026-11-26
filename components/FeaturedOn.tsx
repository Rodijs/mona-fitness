// "Featured on" badge row shown directly above the footer on the homepage.
// To add a badge, add another <li> with the same class names: the row wraps
// and stays centered on narrow screens.

const BADGE_ITEM =
  "opacity-60 grayscale transition-[opacity,filter] duration-200 hover:opacity-100 hover:grayscale-0 focus-within:opacity-100 focus-within:grayscale-0";

export default function FeaturedOn() {
  return (
    <section aria-labelledby="featured-on" className="px-5 pb-8 pt-2 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3">
        <h2
          id="featured-on"
          className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted"
        >
          Featured on
        </h2>
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <li className={`${BADGE_ITEM} [&_img]:h-7 [&_img]:w-auto`}>
            {/* Badge markup is the provider's, kept unchanged. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <a href="https://startupfa.me/s/mona?utm_source=mona.fitness" target="_blank"><img src="https://startupfa.me/badges/featured-badge-small.webp" alt="MONA - Featured on Startup Fame" width="224" height="36" /></a>
          </li>
          <li className={`${BADGE_ITEM} [&_img]:!h-9 [&_img]:!w-auto`}>
            {/* Launch Llama's badge, with its inline styles turned into JSX. */}
            <span style={{ display: "inline-block", textAlign: "center", fontFamily: "system-ui,sans-serif", lineHeight: 1 }}>
              <a href="https://tools.launchllama.co/products/mona-fitness" target="_blank" rel="noopener noreferrer" style={{ display: "block", lineHeight: 0 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://tools.launchllama.co/featured-badge.png?v=2" alt="Launch Llama Tools" width="200" height="52" style={{ display: "block", border: 0 }} />
              </a>
              <a href="https://mcpshelf.co/?utm_source=badge&utm_medium=referral" target="_blank" rel="noopener noreferrer" style={{ display: "block", marginTop: "-2px", paddingTop: 0, fontSize: "7px", fontWeight: 600, color: "#888", textDecoration: "none", lineHeight: 1, letterSpacing: "0.02em" }}>
                Launch your MCP
              </a>
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}
