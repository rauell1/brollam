/**
 * In-memory sliding window rate limiter.
 *
 * Suitable for a single instance deployment. For multi-region serverless,
 * swap the store for Upstash Redis or similar; the interface stays the same.
 */

interface Bucket {
  timestamps: number[];
}

const store = new Map<string, Bucket>();

// Prevent unbounded growth of the map in long lived processes.
setInterval(() => {
  const cutoff = Date.now() - 60 * 60 * 1000;
  for (const [key, bucket] of store) {
    bucket.timestamps = bucket.timestamps.filter((t) => t > cutoff);
    if (bucket.timestamps.length === 0) store.delete(key);
  }
}, 10 * 60 * 1000).unref?.();

export interface RateLimitResult {
  allowed: boolean;
  retryAfterSeconds: number;
}

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  const bucket = store.get(key) ?? { timestamps: [] };
  bucket.timestamps = bucket.timestamps.filter((t) => t > now - windowMs);
  if (bucket.timestamps.length >= limit) {
    const oldest = bucket.timestamps[0];
    store.set(key, bucket);
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((oldest + windowMs - now) / 1000)),
    };
  }
  bucket.timestamps.push(now);
  store.set(key, bucket);
  return { allowed: true, retryAfterSeconds: 0 };
}
