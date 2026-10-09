// Live community totals from the MONA app, for the "Our live stats" section.
//
// Source: the app's public `get_public_stats` database function, which only
// returns anonymous aggregates (no names, emails or per-person rows). The
// URL and publishable key below are the app's public client values — the
// same ones shipped inside the app — and can be overridden with env vars.

const SUPABASE_URL =
  process.env.MONA_SUPABASE_URL ?? "https://ziylpnicahlwzeffgrsr.supabase.co";
const SUPABASE_KEY =
  process.env.MONA_SUPABASE_PUBLISHABLE_KEY ??
  "sb_publishable_QHrDOUMsqJjc1DUO9W11Rw_LB_viaII";

export type LiveStats = {
  usersTotal: number;
  usersWeek: number;
  activeWeek: number;
  repsToday: number;
  repsWeek: number;
  repsPrevWeek: number;
  repsTotal: number;
  /** Reps per day, oldest first, last 14 days (today last). */
  repsDaily: number[];
  kmTotal: number;
  kmWeek: number;
  runsTotal: number;
  /** Longest streak still going (active today or yesterday), in days. */
  streakBestNow: number;
  /** People on a streak of 2+ days right now. */
  streakPeople: number;
  streakRecord: number;
  /** People active on each of the last 7 days, oldest first. */
  activeDays: number[];
  challengesTotal: number;
  challengesActive: number;
  challengesWeek: number;
  generatedAt: string;
};

const num = (v: unknown): number => {
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) && n >= 0 ? n : 0;
};
const numList = (v: unknown, len: number): number[] => {
  const arr = Array.isArray(v) ? v : [];
  return Array.from({ length: len }, (_, i) => num(arr[i]));
};

export function parseLiveStats(raw: unknown): LiveStats | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  if (r.users_total === undefined || r.reps_7d === undefined) return null;
  return {
    usersTotal: num(r.users_total),
    usersWeek: num(r.users_7d),
    activeWeek: num(r.active_7d),
    repsToday: num(r.reps_today),
    repsWeek: num(r.reps_7d),
    repsPrevWeek: num(r.reps_prev_7d),
    repsTotal: num(r.reps_total),
    repsDaily: numList(r.reps_daily, 14),
    kmTotal: num(r.km_total),
    kmWeek: num(r.km_7d),
    runsTotal: num(r.runs_total),
    streakBestNow: num(r.streak_best_now),
    streakPeople: num(r.streak_people),
    streakRecord: num(r.streak_record),
    activeDays: numList(r.active_week, 7),
    challengesTotal: num(r.challenges_total),
    challengesActive: num(r.challenges_active),
    challengesWeek: num(r.challenges_7d),
    generatedAt: typeof r.generated_at === "string" ? r.generated_at : new Date().toISOString(),
  };
}

// One fetch per minute per server instance, however many visitors.
const TTL_MS = 60_000;
let cached: { at: number; data: LiveStats } | null = null;
let inflight: Promise<LiveStats | null> | null = null;

export async function getLiveStats(): Promise<LiveStats | null> {
  if (cached && Date.now() - cached.at < TTL_MS) return cached.data;
  if (inflight) return inflight;
  inflight = (async () => {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/get_public_stats`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_KEY,
          "Content-Type": "application/json",
        },
        body: "{}",
        cache: "no-store",
        signal: AbortSignal.timeout(6000),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = parseLiveStats(await res.json());
      if (!data) throw new Error("Unexpected response");
      cached = { at: Date.now(), data };
      return data;
    } catch (err) {
      console.error("Live stats fetch failed:", err);
      // Serve the last good numbers rather than nothing.
      return cached?.data ?? null;
    } finally {
      inflight = null;
    }
  })();
  return inflight;
}
