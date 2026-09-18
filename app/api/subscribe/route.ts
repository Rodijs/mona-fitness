import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// Route Handler is not cached — every POST runs fresh, which is what we
// want for a mutation like this.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "subscribers.json");

type Subscriber = {
  email: string;
  subscribedAt: string;
};

async function readSubscribers(): Promise<Subscriber[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw) as Subscriber[];
  } catch {
    return [];
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

  const subscribers = await readSubscribers();

  if (subscribers.some((s) => s.email === email)) {
    // Already on the list — treat as success so the UI doesn't feel broken.
    return NextResponse.json({ ok: true, alreadySubscribed: true });
  }

  subscribers.push({ email, subscribedAt: new Date().toISOString() });

  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(subscribers, null, 2), "utf-8");

  // TODO: send to email provider once one is chosen (Mailchimp / ConvertKit /
  // Beehiiv / etc). This is the only place that needs to change — swap the
  // block above for an API call to the provider's "add subscriber" endpoint.
  // Example (Mailchimp):
  //   await fetch(`https://<dc>.api.mailchimp.com/3.0/lists/<list_id>/members`, {
  //     method: "POST",
  //     headers: {
  //       Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ email_address: email, status: "subscribed" }),
  //   });

  return NextResponse.json({ ok: true, alreadySubscribed: false });
}
