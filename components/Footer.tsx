import Link from "next/link";
import Logo from "./Logo";
import { PRIVACY_URL, SUPPORT_EMAIL } from "@/lib/contact";

const SOCIALS = [
  {
    label: "X",
    href: "https://x.com/razm1ro",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/mona.fitness.app/",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-4 w-4"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

// The "·" between footer links, drawn as a small dot in MONA's lime gradient.
function Dot({ wideOnly = false }: { wideOnly?: boolean }) {
  return (
    <span
      aria-hidden
      className={`${wideOnly ? "hidden sm:inline-block" : "inline-block"} h-[5px] w-[5px] shrink-0 rounded-full bg-[linear-gradient(135deg,var(--accent),#eaffb8)] shadow-[0_0_8px_rgba(200,255,61,0.55)]`}
    />
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-border px-5 py-8 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 text-sm text-muted sm:flex-row">
        <Logo className="h-10 w-auto" />

        <div className="flex flex-col items-center gap-1.5 text-center">
          <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <Link href="/support" className="transition-colors hover:text-accent">
              Support
            </Link>
            <Dot />
            <Link href={PRIVACY_URL} className="transition-colors hover:text-accent">
              Privacy Policy
            </Link>
            <Dot />
            {/* A plain link on purpose: /partners is a route handler page, not a Next.js page. */}
            <a href="/partners" className="transition-colors hover:text-accent">
              Partners
            </a>
            {/* On phones the email drops to its own line, so this dot is hidden there. */}
            <Dot wideOnly />
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="basis-full transition-colors hover:text-accent sm:basis-auto"
            >
              {SUPPORT_EMAIL}
            </a>
          </nav>
          <p>&copy; {new Date().getFullYear()} MONA Fitness. All rights reserved.</p>
          <p>
            Made with care in{" "}
            <span role="img" aria-label="Latvia">
              🇱🇻
            </span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          {SOCIALS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent/50 hover:text-accent"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
