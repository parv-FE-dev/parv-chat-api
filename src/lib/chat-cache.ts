interface CacheEntry {
  response: string;
  timestamp: number;
}

const cache = new Map<string, CacheEntry>();

const TTL = 7 * 24 * 60 * 60 * 1000; // 7 days
const MAX_ENTRIES = 500;

function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return hash.toString(36);
}

export function getCacheKey(query: string): string {
  return simpleHash(query.toLowerCase().trim());
}

export function getCached(query: string): string | null {
  const key = getCacheKey(query);
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > TTL) {
    cache.delete(key);
    return null;
  }
  return entry.response;
}

export function setCache(query: string, response: string): void {
  if (cache.size >= MAX_ENTRIES) {
    const firstKey = cache.keys().next().value;
    if (firstKey !== undefined) cache.delete(firstKey);
  }
  cache.set(getCacheKey(query), { response, timestamp: Date.now() });
}
