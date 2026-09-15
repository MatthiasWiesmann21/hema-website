/**
 * Simple in-memory rate limiter using a sliding window.
 * Works without external dependencies — suitable for single-instance deployments.
 * For multi-instance deployments, replace with @upstash/ratelimit + Redis.
 */

type RateLimitEntry = {
  timestamps: number[];
};

const stores = new Map<string, Map<string, RateLimitEntry>>();

function getStore(name: string): Map<string, RateLimitEntry> {
  let store = stores.get(name);
  if (!store) {
    store = new Map();
    stores.set(name, store);
  }
  return store;
}

// Clean up old entries periodically to prevent memory leaks
const CLEANUP_INTERVAL = 60_000; // 1 minute
setInterval(() => {
  const now = Date.now();
  for (const store of stores.values()) {
    for (const [key, entry] of store) {
      entry.timestamps = entry.timestamps.filter((t) => now - t < 120_000);
      if (entry.timestamps.length === 0) store.delete(key);
    }
  }
}, CLEANUP_INTERVAL).unref?.();

/**
 * Check if a request is within the rate limit.
 *
 * @param limiterName  A name to namespace different limiters (e.g. "contact", "analytics").
 * @param key          A unique key for the client (e.g. IP address).
 * @param maxRequests  Maximum number of requests allowed in the window.
 * @param windowMs     The sliding window duration in milliseconds.
 * @returns `true` if the request is allowed, `false` if rate-limited.
 */
export function checkRateLimit(
  limiterName: string,
  key: string,
  maxRequests: number,
  windowMs: number,
): boolean {
  const store = getStore(limiterName);
  const now = Date.now();
  const entry = store.get(key) ?? { timestamps: [] };

  // Remove timestamps outside the window
  entry.timestamps = entry.timestamps.filter((t) => now - t < windowMs);

  if (entry.timestamps.length >= maxRequests) {
    return false;
  }

  entry.timestamps.push(now);
  store.set(key, entry);
  return true;
}
