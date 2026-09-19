import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { Resend } from "resend";
import { addSubscriber } from "@/lib/waitlist";

// Route Handler is not cached — every POST runs fresh, which is what we
// want for a mutation like this.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "subscribers.json");

// Where signup notifications get sent. Change this if the inbox changes.
const NOTIFY_EMAIL = "rodijs.razmus@gmail.com";

type Subscriber = {
  email: string;
  subscribedAt: string;
};

async function readLocalSubscribers(): Promise<Subscriber[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw) as Subscriber[];
  } catch {
    // No file yet, or (in production, e.g. Vercel) a read-only filesystem.
    return [];
  }
}

async function persistSubscriberLocally(subscribers: Subscriber[], email: string) {
  try {
    subscribers.push({ email, subscribedAt: new Date().toISOString() });
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(subscribers, null, 2), "utf-8");
  } catch {
    // Read-only filesystem in production — expected there, Redis is the
    // real source of truth in that case (see addSubscriber).
  }
}

async function sendNotificationEmail(subscriberEmail: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY not set — skipping signup notification email.");
    return;
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "Mona Fitness <onboarding@resend.dev>",
      to: NOTIFY_EMAIL,
      subject: "New Mona waitlist signup",
      text: `New signup: ${subscriberEmail}`,
    });
  } catch (err) {
    // Don't fail the request just because the notification email failed —
    // the visitor's signup should still succeed from their point of view.
    console.error("Failed to send signup notification email:", err);
  }
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email =
    typeof body === "object" && body !== null && "email" in body
      ? String((body as { email?: unknown }).email ?? "").trim().toLowerCase()
      : "";

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  // Redis is the real source of truth (persists in production). Local file
  // storage is a best-effort fallback for local dev when Redis isn't set up.
  const redisResult = await addSubscriber(email);

  let alreadySubscribed: boolean;
  let count: number | null;

  if (redisResult.ok) {
    alreadySubscribed = redisResult.alreadySubscribed;
    count = redisResult.count;
  } else {
    const subscribers = await readLocalSubscribers();
    alreadySubscribed = subscribers.some((s) => s.email === email);
    if (!alreadySubscribed) {
      // Mutates `subscribers` in place (pushes the new entry), so its
      // length already reflects the new total afterward.
      await persistSubscriberLocally(subscribers, email);
    }
    count = subscribers.length;
  }

  if (!alreadySubscribed) {
    await sendNotificationEmail(email);
  }

  return NextResponse.json({ ok: true, alreadySubscribed, count });
}
