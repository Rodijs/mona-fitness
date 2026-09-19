import { NextResponse } from "next/server";
import { removeSubscriber } from "@/lib/waitlist";

// TEMPORARY: one-off route to remove the test signup made while verifying
// the Redis integration. Delete this file after use.
export async function GET() {
  const removed = await removeSubscriber("prod-redis-check@example.com");
  return NextResponse.json({ removed });
}
