import { createClient, type RedisClientType } from "redis";

// Redis Set of subscriber emails — gives us both real duplicate-checking
// and an accurate live count, unlike the old local-file approach which
// didn't persist on Vercel's serverless filesystem.
const SUBSCRIBERS_KEY = "mona:subscribers";

// Cache the connected client across warm serverless invocations instead of
// reconnecting on every request.
let clientPromise: Promise<RedisClientType> | null = null;

function getClient(): Promise<RedisClientType> | null {
  const url = process.env.KV_REDIS_URL ?? process.env.REDIS_URL;
  if (!url) return null;

  if (!clientPromise) {
    const client: RedisClientType = createClient({ url });
    client.on("error", (err) => console.error("Redis client error:", err));
    clientPromise = client.connect().then(() => client);
  }

  return clientPromise;
}

export async function addSubscriber(
  email: string
): Promise<{ ok: true; alreadySubscribed: boolean; count: number } | { ok: false }> {
  const pending = getClient();
  if (!pending) return { ok: false };

  try {
    const client = await pending;
    const added = await client.sAdd(SUBSCRIBERS_KEY, email);
    const count = await client.sCard(SUBSCRIBERS_KEY);
    return { ok: true, alreadySubscribed: added === 0, count };
  } catch (err) {
    console.error("Redis addSubscriber failed:", err);
    return { ok: false };
  }
}

export async function getSubscriberCount(): Promise<number | null> {
  const pending = getClient();
  if (!pending) return null;

  try {
    const client = await pending;
    return await client.sCard(SUBSCRIBERS_KEY);
  } catch (err) {
    console.error("Redis getSubscriberCount failed:", err);
    return null;
  }
}
