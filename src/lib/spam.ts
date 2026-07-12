/**
 * Server-side spam protection for the public contact form.
 *
 * - In-memory rate limiter (Map<IP, {count, firstAt}>): 3 submissions per 10 min window.
 *   NOTE: in-memory state is per-process; on serverless hosts the limit is per-instance.
 *   For production use a shared store (Upstash Redis, KV, etc.).
 * - Honeypot: a hidden field named `website` must be empty.
 * - Optional Cloudflare Turnstile verification — only if TURNSTILE_SECRET env is set.
 * - Sanitizer: trims and strips HTML tags from name/company/message.
 */

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_PER_WINDOW = 3;

type Bucket = { count: number; firstAt: number };
const buckets = new Map<string, Bucket>();

// Periodic cleanup (every 5 minutes) so the Map doesn't grow unbounded.
let lastSweep = Date.now();
function sweep() {
  const now = Date.now();
  if (now - lastSweep < 5 * 60 * 1000) return;
  lastSweep = now;
  for (const [ip, b] of buckets) {
    if (now - b.firstAt > WINDOW_MS) buckets.delete(ip);
  }
}

export function rateLimitCheck(ip: string): { ok: boolean; retryAfterMs?: number } {
  sweep();
  const now = Date.now();
  const b = buckets.get(ip);
  if (!b) {
    buckets.set(ip, { count: 1, firstAt: now });
    return { ok: true };
  }
  if (now - b.firstAt > WINDOW_MS) {
    // Window expired — reset.
    buckets.set(ip, { count: 1, firstAt: now });
    return { ok: true };
  }
  if (b.count >= MAX_PER_WINDOW) {
    return { ok: false, retryAfterMs: WINDOW_MS - (now - b.firstAt) };
  }
  b.count += 1;
  return { ok: true };
}

/** Honeypot field must be empty (or absent). */
export function honeypotFailed(value: unknown): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

/** Strip HTML tags + trim. Use for name/company/message before storage. */
export function sanitizeText(input: unknown): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/<[^>]*>/g, "") // strip HTML tags
    .replace(/\s+/g, " ") // collapse whitespace
    .trim();
}

/**
 * Verify Cloudflare Turnstile token server-side.
 * Returns true if TURNSTILE_SECRET is not configured (Turnstile optional).
 */
export async function verifyTurnstile(token: unknown, ip?: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET;
  if (!secret) return true; // Turnstile optional
  if (typeof token !== "string" || !token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret,
        response: token,
        ...(ip ? { remoteip: ip } : {}),
      }),
    });
    const data = (await res.json()) as { success?: boolean };
    return !!data.success;
  } catch (err) {
    console.error("[spam] Turnstile verification failed:", err);
    return false;
  }
}

/** Extract a best-effort client IP from request headers. */
export function getClientIP(req: Request): string {
  const h = req.headers;
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    h.get("cf-connecting-ip") ||
    "unknown"
  );
}
