import type { Metadata } from "next";
import Link from "next/link";
import PageTitle from "@/components/PageTitle";
import { PRIVACY_URL, SUPPORT_EMAIL } from "@/lib/contact";

// mona.fitness/support — the App Store "Support URL": how to reach us, plus
// answers to the questions people ask most.
export const metadata: Metadata = {
  title: "Support — MONA",
  description: `Questions about MONA? Email ${SUPPORT_EMAIL}.`,
  alternates: { canonical: "/support" },
};

const FAQ: { q: string; a: string }[] = [
  {
    q: "Does the camera record me?",
    a: "No. The camera only counts your reps, and the video never leaves your phone. MONA saves just the rep count and how long you trained.",
  },
  {
    q: "How do I delete my account?",
    a: "In the app, open Profile and tap Delete account at the bottom. Your account and your workout history are deleted for good.",
  },
  {
    q: "The rep counter missed some reps. What can I do?",
    a: "Step back until your whole body is in view, in good light; the app tells you when it can't see you. If it still miscounts, email us which exercise and phone you use and we'll look into it.",
  },
  {
    q: "Is MONA free?",
    a: "Yes. Challenges with friends, the rep counter, runs and Mind are all free.",
  },
];

export default function SupportPage() {
  return (
    <>
      <main className="flex-1 px-5 pb-20 pt-10 sm:px-8 sm:pt-16">
        <div className="mx-auto max-w-2xl">
          <PageTitle pill="Help & contact" plain="MONA" accent="Support">
            Questions, problems or ideas? Write to us, a real person reads every email.
          </PageTitle>

          <a
            href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("MONA support")}`}
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-accent px-6 py-3.5 font-semibold text-background transition-opacity hover:opacity-90"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
              <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
              <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            {SUPPORT_EMAIL}
          </a>

          <h2 className="mt-16 text-xl font-bold tracking-tight text-white">Common questions</h2>
          <div className="mt-6 divide-y divide-border rounded-3xl border border-border bg-surface">
            {FAQ.map((item) => (
              <details key={item.q} className="group px-6 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                  {item.q}
                  <span
                    aria-hidden
                    className="text-xl leading-none text-muted transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-muted">{item.a}</p>
              </details>
            ))}
          </div>

          <p className="mt-10 text-sm text-muted">
            Read how MONA handles your data in our{" "}
            <Link
              href={PRIVACY_URL}
              className="text-foreground underline underline-offset-4 hover:text-accent"
            >
              privacy policy
            </Link>
            .
          </p>
        </div>
      </main>
    </>
  );
}
