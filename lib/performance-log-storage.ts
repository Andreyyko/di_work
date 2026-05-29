import { appendFile, mkdir, readFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import type {
  ClientPerformanceListResponse,
  ClientPerformancePayload,
  PerformanceStats,
  StoredClientPerformance,
} from "./performance-types";
import { isDashboardAccessAllowed } from "./error-log-storage";
import { getFirestoreDb, isFirebaseConfigured } from "./firebase-admin-app";

export { isDashboardAccessAllowed };

const LOG_DIR = path.join(process.cwd(), "logs");
const LOG_FILE = path.join(LOG_DIR, "client-performance.jsonl");

function normalizePayload(payload: ClientPerformancePayload): ClientPerformancePayload {
  return {
    ...payload,
    id: payload.id || randomUUID(),
    sessionId: payload.sessionId || "unknown",
    pathname: payload.pathname || "/",
    recommendations: Array.isArray(payload.recommendations) ? payload.recommendations : [],
    slowResources: Array.isArray(payload.slowResources) ? payload.slowResources : [],
    tags: Array.isArray(payload.tags) ? payload.tags : [],
  };
}

async function saveToFile(payload: ClientPerformancePayload): Promise<void> {
  await mkdir(LOG_DIR, { recursive: true });
  const record: StoredClientPerformance = {
    ...normalizePayload(payload),
    receivedAt: new Date().toISOString(),
    serverEnv: process.env.NODE_ENV ?? "unknown",
  };
  await appendFile(LOG_FILE, `${JSON.stringify(record)}\n`, "utf8");
}

async function saveToFirestore(payload: ClientPerformancePayload): Promise<void> {
  const { FieldValue } = await import("firebase-admin/firestore");
  const db = await getFirestoreDb();
  const record: StoredClientPerformance = {
    ...normalizePayload(payload),
    receivedAt: new Date().toISOString(),
    serverEnv: process.env.NODE_ENV ?? "unknown",
  };

  await db.collection("client_performance").add({
    ...record,
    createdAt: FieldValue.serverTimestamp(),
  });
}

export async function persistClientPerformance(
  payload: ClientPerformancePayload
): Promise<"firestore" | "file"> {
  if (isFirebaseConfigured()) {
    try {
      await saveToFirestore(payload);
      return "firestore";
    } catch (error) {
      console.error("[log-performance] Firestore failed, fallback to file:", error);
    }
  }
  await saveToFile(payload);
  return "file";
}

function parseLine(line: string): StoredClientPerformance | null {
  try {
    const parsed = JSON.parse(line) as StoredClientPerformance;
    if (!parsed.pathname || !parsed.timestamp) return null;
    return parsed;
  } catch {
    return null;
  }
}

export async function readPerformanceFromFile(
  limit: number
): Promise<StoredClientPerformance[]> {
  try {
    const content = await readFile(LOG_FILE, "utf8");
    return content
      .split("\n")
      .filter(Boolean)
      .map(parseLine)
      .filter((x): x is StoredClientPerformance => x !== null)
      .slice(-limit)
      .reverse();
  } catch {
    return [];
  }
}

export function computePerformanceStats(items: StoredClientPerformance[]): PerformanceStats {
  const ratingCounts: Record<string, number> = {};
  const timelineMap: Record<string, number> = {};
  let lcpSum = 0;
  let lcpCount = 0;
  let clsSum = 0;
  let clsCount = 0;
  let ttfbSum = 0;
  let ttfbCount = 0;

  for (const item of items) {
    ratingCounts[item.rating] = (ratingCounts[item.rating] || 0) + 1;
    const hourKey = item.timestamp.slice(0, 13) + ":00";
    timelineMap[hourKey] = (timelineMap[hourKey] || 0) + 1;

    if (item.metrics.lcp != null) {
      lcpSum += item.metrics.lcp;
      lcpCount += 1;
    }
    if (item.metrics.cls != null) {
      clsSum += item.metrics.cls;
      clsCount += 1;
    }
    if (item.metrics.ttfb != null) {
      ttfbSum += item.metrics.ttfb;
      ttfbCount += 1;
    }
  }

  return {
    total: items.length,
    avgLcp: lcpCount ? Math.round(lcpSum / lcpCount) : null,
    avgCls: clsCount ? Number((clsSum / clsCount).toFixed(3)) : null,
    avgTtfb: ttfbCount ? Math.round(ttfbSum / ttfbCount) : null,
    ratingCounts,
    timeline: Object.entries(timelineMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-24)
      .map(([hour, count]) => ({ hour, count })),
  };
}

async function readPerformanceFromFirestore(
  limit: number
): Promise<StoredClientPerformance[]> {
  const db = await getFirestoreDb();
  try {
    const snapshot = await db
      .collection("client_performance")
      .orderBy("receivedAt", "desc")
      .limit(limit)
      .get();
    return snapshot.docs.map((doc) => doc.data() as StoredClientPerformance);
  } catch {
    const snapshot = await db.collection("client_performance").limit(limit).get();
    return snapshot.docs
      .map((doc) => doc.data() as StoredClientPerformance)
      .sort((a, b) => (b.receivedAt || "").localeCompare(a.receivedAt || ""))
      .slice(0, limit);
  }
}

export async function listRecentClientPerformance(
  limit = 100
): Promise<ClientPerformanceListResponse> {
  const capped = Math.min(Math.max(limit, 1), 500);
  let items: StoredClientPerformance[] = [];
  let storage: ClientPerformanceListResponse["storage"] = "file";

  if (isFirebaseConfigured()) {
    try {
      items = await readPerformanceFromFirestore(capped);
      storage = "firestore";
    } catch (error) {
      console.error("[log-performance] Firestore read failed, fallback to file:", error);
      items = await readPerformanceFromFile(capped);
    }
  } else {
    items = await readPerformanceFromFile(capped);
  }

  return {
    ok: true,
    items,
    stats: computePerformanceStats(items),
    storage,
  };
}
