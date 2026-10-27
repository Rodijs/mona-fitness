import Link from "next/link";
import Logo from "./Logo";

// Top bar for the inner pages (Support, Privacy): the logo back to the
// home page, and a quiet "Home" link for people who don't know the logo does it.
export default function SubpageHeader() {
  return (
    <header className="px-4 py-4 sm:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/" aria-label="MONA home" className="flex items-center text-white">
          <Logo className="h-12 w-auto sm:h-14" />
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:border-accent/50 hover:text-accent"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Home
        </Link>
      </div>
    </header>
  );
}
