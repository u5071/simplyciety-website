// dataSimplr waitlist storage — Upstash Redis REST API (Vercel Marketplace integration).
// Env: KV_REST_API_URL + KV_REST_API_TOKEN (or UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN).

export { LAUNCH_DATE } from "./launch";

const ZSET = "datasimplr:waitlist";
const detailKey = (email: string) => `datasimplr:waitlist:${email}`;

function redisEnv() {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url, token } : null;
}

export function storageConfigured() {
  return redisEnv() !== null;
}

async function pipeline(commands: (string | number)[][]) {
  const env = redisEnv();
  if (!env) throw new Error("Waitlist storage is not configured");
  const res = await fetch(`${env.url}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${env.token}`, "Content-Type": "application/json" },
    body: JSON.stringify(commands),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Redis pipeline failed: ${res.status}`);
  const out = (await res.json()) as { result?: unknown; error?: string }[];
  const failed = out.find((r) => r.error);
  if (failed) throw new Error(`Redis error: ${failed.error}`);
  return out.map((r) => r.result);
}

export type WaitlistEntry = {
  email: string;
  name?: string;
  company?: string;
  role?: string;
  teamSize?: string;
  dataTypes?: string[];
  aiStage?: string;
  useCases?: string[];
  timeline?: string;
  useCase?: string;
  lang?: string;
  source?: string;
};

/** Adds an entry once per email. Returns 1-based position and whether it was new. */
export async function addToWaitlist(entry: WaitlistEntry) {
  const now = Date.now();
  const [added, rank] = await pipeline([
    ["ZADD", ZSET, "NX", now, entry.email],
    ["ZRANK", ZSET, entry.email],
  ]);
  const isNew = added === 1;
  if (isNew) {
    const fields: (string | number)[] = ["HSET", detailKey(entry.email), "createdAt", new Date(now).toISOString()];
    for (const [k, v] of Object.entries(entry)) {
      if (v === undefined || v === "") continue;
      fields.push(k, Array.isArray(v) ? v.join(",") : v);
    }
    await pipeline([fields]);
  }
  return { position: Number(rank) + 1, isNew };
}

/** All entries in signup order (for the admin CSV export). */
export async function listWaitlist() {
  const [emails] = await pipeline([["ZRANGE", ZSET, 0, -1]]);
  const list = (emails as string[]) ?? [];
  if (list.length === 0) return [];
  const details = await pipeline(list.map((e) => ["HGETALL", detailKey(e)]));
  return list.map((email, i) => {
    const flat = (details[i] as string[]) ?? [];
    const row: Record<string, string> = { position: String(i + 1), email };
    for (let j = 0; j + 1 < flat.length; j += 2) row[flat[j]] = flat[j + 1];
    return row;
  });
}
