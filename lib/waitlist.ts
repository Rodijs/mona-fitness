import { Redis } from "@upstash/redis";

// Redis Set of subscriber emails — gives us both real duplicate-checking
// and an accurate live count, unlike the old local-file approach which
// didn't persist on Vercel's serverless filesystem.
const SUBSCRIBERS_KEY = "mona:subscribers";

let cachedRedis: Redis | null | undefined;

function getRedis(): Redis | null {
  if (cachedRedis !== undefined) return cachedRedis;

  // Vercel's Redis marketplace integrations have used a few different env
  // var prefixes over time (KV_* for the legacy "Vercel KV" product,
  // UPSTASH_REDIS_* for the newer Upstash marketplace listing). Try both.
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

  cachedRedis = url && token ? new Redis({ url, token }) : null;
  return cachedRedis;
}

export async function addSubscriber(
  email: string
): Promise<{ ok: true; alreadySubscribed: boolean; count: number } | { ok: false }> {
  const redis = getRedis();
  if (!redis) return { ok: false };

  try {
    const added = await redis.sadd(SUBSCRIBERS_KEY, email);
    const count = await redis.scard(SUBSCRIBERS_KEY);
    return { ok: true, alreadySubscribed: added === 0, count };
  } catch (err) {
    console.error("Redis addSubscriber failed:", err);
    return { ok: false };
  }
}

export async function getSubscriberCount(): Promise<number | null> {
  const redis = getRedis();
  if (!redis) return null;

  try {
    return await redis.scard(SUBSCRIBERS_KEY);
  } catch (err) {
    console.error("Redis getSubscriberCount failed:", err);
    return null;
  }
}
