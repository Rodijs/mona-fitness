import { NextResponse } from "next/server";
import { getSubscriberCount } from "@/lib/waitlist";

// Not cached — always return the current count.
export async function GET() {
  const count = await getSubscriberCount();
  return NextResponse.json({ count });
}
