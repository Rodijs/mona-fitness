import { NextResponse } from "next/server";
import { getLiveStats } from "@/lib/liveStats";

// Live community totals for the "Our live stats" section. Reading the
// request keeps this handler dynamic (never baked in at build time); the
// CDN may reuse a response for up to a minute.
export async function GET(request: Request) {
  void request.url;
  const stats = await getLiveStats();
  if (!stats) {
    return NextResponse.json(
      { error: "unavailable" },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
  return NextResponse.json(stats, {
    headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
  });
}
