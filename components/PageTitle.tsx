import type { ReactNode } from "react";

// Page headline in the same style as the home page's section titles
// ("Our Live Stats"): bold sans words, then the key word in the italic serif
// with the lime gradient. An optional pill sits above it, like "Live".
export default function PageTitle({
  pill,
  plain,
  accent,
  children,
}: {
  pill?: ReactNode;
  plain: string;
  accent: string;
  children?: ReactNode;
}) {
  return (
    <div>
      {pill && (
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-white/80 backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
          {pill}
        </span>
      )}
      <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
        {plain} <span className="font-serif font-medium italic text-gradient">{accent}</span>
      </h1>
      {children && (
        <p className="mt-4 max-w-2xl text-base text-white/70 sm:text-lg">{children}</p>
      )}
    </div>
  );
}
