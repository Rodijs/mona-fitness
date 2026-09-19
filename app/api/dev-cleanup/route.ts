import { NextResponse } from "next/server";
import { createClient, type RedisClientType } from "redis";

// TEMPORARY: one-off diagnostic route to figure out why removing a test
// signup wasn't working. Delete this file after use.
export async function GET() {
  const url = process.env.KV_REDIS_URL ?? process.env.REDIS_URL;
  if (!url) {
    return NextResponse.json({ error: "no url", hasKvRedisUrl: false });
  }

  const client: RedisClientType = createClient({ url });
  try {
    await client.connect();
    const members = await client.sMembers("mona:subscribers");
    const removed = await client.sRem(
      "mona:subscribers",
      "prod-redis-check@example.com"
    );
    const membersAfter = await client.sMembers("mona:subscribers");
    return NextResponse.json({ membersBefore: members, removed, membersAfter });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  } finally {
    await client.quit().catch(() => {});
  }
}
