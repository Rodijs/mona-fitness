"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Status = "idle" | "loading" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Props = {
  /** "glass" renders a frosted, translucent style for use over a photo background. */
  variant?: "solid" | "glass";
};

export default function EmailForm({ variant = "solid" }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed)) {
      setStatus("error");
      setMessage("Enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMessage(null);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data?.error ?? "Something went wrong. Try again.");
        return;
      }

      setStatus("success");
      setMessage(
        data?.alreadySubscribed
          ? "You're already on the list."
          : "You're on the list! We'll be in touch."
      );
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Check your connection and try again.");
    }
  }

  const isGlass = variant === "glass";

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className={`glow flex w-full max-w-md items-center gap-3 rounded-full border px-5 py-4 text-sm font-medium sm:text-base ${
          isGlass
            ? "border-white/25 bg-white/10 text-white backdrop-blur-md"
            : "border-border bg-surface"
        }`}
      >
        <span className="text-accent">✓</span>
        <span>{message}</span>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col gap-3 sm:flex-row sm:gap-2"
      >
        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full flex-1 rounded-full border px-5 py-4 text-sm outline-none transition-colors focus:border-accent sm:text-base ${
            isGlass
              ? "border-white/25 bg-white/10 text-white placeholder:text-white/60 backdrop-blur-md"
              : "border-border bg-surface text-foreground placeholder:text-muted"
          }`}
        />
        <motion.button
          type="submit"
          disabled={status === "loading"}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="glow shrink-0 rounded-full bg-accent px-6 py-4 text-sm font-semibold text-background transition-opacity disabled:opacity-60 sm:text-base"
        >
          {status === "loading" ? "Joining…" : "Get early access"}
        </motion.button>
      </form>

      <AnimatePresence>
        {status === "error" && message && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-2 px-2 text-sm text-accent-2"
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
