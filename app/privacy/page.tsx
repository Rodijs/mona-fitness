import type { Metadata } from "next";
import Footer from "@/components/Footer";
import PageTitle from "@/components/PageTitle";
import SubpageHeader from "@/components/SubpageHeader";
import {
  PRIVACY_CONTACT,
  PRIVACY_UPDATED,
  PRIVACY_VERSION,
  SECTIONS,
  SUMMARY,
  type PolicyBlock,
} from "@/lib/privacy";

// mona.fitness/privacy — MONA's privacy policy (the App Store "Privacy Policy
// URL"). The text lives in lib/privacy.ts and matches the app's copy.
export const metadata: Metadata = {
  title: "Privacy Policy — MONA",
  description:
    "How MONA handles your data: the camera only counts reps on your phone, run routes stay on your phone, no ads and no selling of data.",
  alternates: { canonical: "/privacy" },
};

function Email() {
  return (
    <a
      href={`mailto:${PRIVACY_CONTACT}`}
      className="text-white underline decoration-accent/60 underline-offset-4 transition-colors hover:text-accent"
    >
      {PRIVACY_CONTACT}
    </a>
  );
}

/** A paragraph, with "{email}" turned into the contact link. */
function Paragraph({ text, lead }: { text: string; lead?: string }) {
  const [before, after] = text.split("{email}");
  return (
    <p className="mt-4 leading-relaxed text-white/70">
      {lead && <strong className="font-semibold text-white">{lead} </strong>}
      {before}
      {after !== undefined && (
        <>
          <Email />
          {after}
        </>
      )}
    </p>
  );
}

function Block({ b }: { b: PolicyBlock }) {
  if (b.t === "p") return <Paragraph text={b.text} lead={b.lead} />;
  return (
    <ul className="mt-4 space-y-2.5">
      {b.items.map((item) => (
        <li key={item} className="flex gap-3 leading-relaxed text-white/70">
          <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <SubpageHeader />

      <main className="flex-1 px-5 pb-20 pt-10 sm:px-8 sm:pt-16">
        <div className="mx-auto max-w-6xl">
          <PageTitle
            pill={`Version ${PRIVACY_VERSION} · Updated ${PRIVACY_UPDATED}`}
            plain="Privacy"
            accent="Policy"
          >
            How MONA handles your data, in plain words.
          </PageTitle>

          <div className="mt-12 lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
            {/* Contents: a sticky list beside the text on wide screens. */}
            <nav aria-label="Contents" className="hidden lg:block">
              <div className="sticky top-8 max-h-[calc(100dvh-4rem)] overflow-y-auto pb-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                  Contents
                </p>
                <ol className="mt-4 space-y-1 border-l border-border">
                  {SECTIONS.map((s, i) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="-ml-px block border-l border-transparent py-1.5 pl-4 text-sm text-white/60 transition-colors hover:border-accent hover:text-white"
                      >
                        <span className="tabular-nums text-white/35">{i + 1}.</span> {s.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </nav>

            <article className="min-w-0 max-w-3xl text-[15px] sm:text-base">
              <section
                aria-labelledby="in-short"
                className="rounded-3xl border border-accent/20 bg-surface p-6 sm:p-8"
              >
                <h2
                  id="in-short"
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-accent"
                >
                  In short
                </h2>
                <ul className="mt-4 space-y-3">
                  {SUMMARY.map((item) => (
                    <li key={item} className="flex gap-3 leading-snug text-white/85">
                      <span className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Contents on phones and tablets: tap a chip to jump. */}
              <nav aria-label="Contents" className="mt-8 flex flex-wrap gap-2 lg:hidden">
                {SECTIONS.map((s, i) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-white/70 transition-colors hover:border-accent/50 hover:text-accent"
                  >
                    {i + 1}. {s.title}
                  </a>
                ))}
              </nav>

              {SECTIONS.map((s, i) => (
                <section key={s.id} id={s.id} className="mt-12 scroll-mt-8">
                  <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                    <span className="tabular-nums text-white/35">{i + 1}.</span> {s.title}
                  </h2>
                  {s.body.map((b, j) => (
                    <Block key={j} b={b} />
                  ))}
                </section>
              ))}

              <div className="mt-16 flex flex-col items-start gap-5 rounded-3xl border border-border bg-surface p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                <div>
                  <p className="text-lg font-bold tracking-tight text-white">
                    Questions about your data?
                  </p>
                  <p className="mt-1 text-white/60">Write to us from the email you use for MONA. We reply within one month.</p>
                </div>
                <a
                  href={`mailto:${PRIVACY_CONTACT}?subject=${encodeURIComponent("MONA privacy question")}`}
                  className="inline-flex shrink-0 items-center gap-3 rounded-full bg-accent px-6 py-3.5 font-semibold text-background transition-opacity hover:opacity-90"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
                    <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
                    <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                  {PRIVACY_CONTACT}
                </a>
              </div>
            </article>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
