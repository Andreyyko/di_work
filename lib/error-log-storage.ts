import { appendFile, mkdir, readFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import type {
  ClientErrorPayload,
  ClientErrorStats,
  ClientErrorsListResponse,
  StoredClientError,
} from "./client-error-types";

const LOG_DIR = path.join(process.cwd(), "logs");
const LOG_FILE = path.join(LOG_DIR, "client-errors.jsonl");

function isFirebaseConfigured(): boolean {
  return Boolean(
    process.env.FIREBASE_PROJECT_ID &&
      process.env.FIREBASE_CLIENT_EMAIL &&
      process.env.FIREBASE_PRIVATE_KEY
  );
}

function normalizePayload(payload: ClientErrorPayload): ClientErrorPayload {
  return {
    ...payload,
    id: payload.id || randomUUID(),
    sessionId: payload.sessionId || "unknown",
    pathname: payload.pathname || "/",
    severity: payload.severity || "error",
    category: payload.category || "unknown",
    type: payload.type || "error",
    breadcrumbs: Array.isArray(payload.breadcrumbs) ? payload.breadcrumbs.slice(-25) : [],
    environment: payload.environment,
    tags: Array.isArray(payload.tags) ? payload.tags : [],
  };
}

async function saveToFirestore(payload: ClientErrorPayload): Promise<void> {
  const { cert, getApps, initializeApp } = await import("firebase-admin/app");
  const { getFirestore, FieldValue } = await import("firebase-admin/firestore");

  if (getApps().length === 0) {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
      }),
    });
  }

  const db = getFirestore();
  const record: StoredClientError = {
    ...normalizePayload(payload),
    receivedAt: new Date().toISOString(),
    serverEnv: process.env.NODE_ENV ?? "unknown",
  };

  await db.collection("client_errors").add({
    ...record,
    createdAt: FieldValue.serverTimestamp(),
  });
}

async function saveToFile(payload: ClientErrorPayload): Promise<void> {
  await mkdir(LOG_DIR, { recursive: true });

  const record: StoredClientError = {
    ...normalizePayload(payload),
    receivedAt: new Date().toISOString(),
    serverEnv: process.env.NODE_ENV ?? "unknown",
  };

  await appendFile(LOG_FILE, `${JSON.stringify(record)}\n`, "utf8");
}

export async function persistClientError(
  payload: ClientErrorPayload
): Promise<"firestore" | "file"> {
  const normalized = normalizePayload(payload);

  if (isFirebaseConfigured()) {
    try {
      await saveToFirestore(normalized);
      return "firestore";
    } catch (error) {
      console.error("[log-error] Firestore write failed, falling back to file:", error);
    }
  }

  await saveToFile(normalized);
  return "file";
}

function parseJsonlLine(line: string): StoredClientError | null {
  try {
    const parsed = JSON.parse(line) as StoredClientError;
    if (!parsed.message || !parsed.timestamp) return null;
    return parsed;
  } catch {
    return null;
  }
}

export async function readErrorsFromFile(limit: number): Promise<StoredClientError[]> {
  try {
    const content = await readFile(LOG_FILE, "utf8");
    const lines = content.split("\n").filter(Boolean);
    const items = lines
      .map(parseJsonlLine)
      .filter((item): item is StoredClientError => item !== null);

    return items.slice(-limit).reverse();
  } catch {
    return [];
  }
}

async function readErrorsFromFirestore(limit: number): Promise<StoredClientError[]> {
  const { cert, getApps, initializeApp } = await import("firebase-admin/app");
  const { getFirestore } = await import("firebase-admin/firestore");

  if (getApps().length === 0) {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
      }),
    });
  }

  const db = getFirestore();
  const snapshot = await db
    .collection("client_errors")
    .orderBy("receivedAt", "desc")
    .limit(limit)
    .get();

  return snapshot.docs.map((doc) => doc.data() as StoredClientError);
}

export function computeClientErrorStats(items: StoredClientError[]): ClientErrorStats {
  const now = Date.now();
  const dayAgo = now - 24 * 60 * 60 * 1000;

  const byType: Record<string, number> = {};
  const bySeverity: Record<string, number> = {};
  const byCategory: Record<string, number> = {};
  const byPath: Record<string, number> = {};
  const timelineMap: Record<string, number> = {};

  let last24h = 0;

  for (const item of items) {
    const type = item.type || "error";
    const severity = item.severity || "error";
    const category = item.category || "unknown";
    const pathname = item.pathname || "/";

    byType[type] = (byType[type] || 0) + 1;
    bySeverity[severity] = (bySeverity[severity] || 0) + 1;
    byCategory[category] = (byCategory[category] || 0) + 1;
    byPath[pathname] = (byPath[pathname] || 0) + 1;

    const ts = new Date(item.timestamp || item.receivedAt).getTime();
    if (!Number.isNaN(ts) && ts >= dayAgo) last24h += 1;

    const hourKey = (item.timestamp || item.receivedAt || "").slice(0, 13) + ":00";
    if (hourKey.length > 5) {
      timelineMap[hourKey] = (timelineMap[hourKey] || 0) + 1;
    }
  }

  const timeline = Object.entries(timelineMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-24)
    .map(([hour, count]) => ({ hour, count }));

  return {
    total: items.length,
    last24h,
    byType,
    bySeverity,
    byCategory,
    byPath,
    timeline,
  };
}

export async function listRecentClientErrors(limit = 100): Promise<ClientErrorsListResponse> {
  const cappedLimit = Math.min(Math.max(limit, 1), 500);

  let items: StoredClientError[] = [];
  let storage: ClientErrorsListResponse["storage"] = "file";

  if (isFirebaseConfigured()) {
    try {
      items = await readErrorsFromFirestore(cappedLimit);
      storage = "firestore";
    } catch (error) {
      console.error("[log-error] Firestore read failed, falling back to file:", error);
      items = await readErrorsFromFile(cappedLimit);
      storage = "file";
    }
  } else {
    items = await readErrorsFromFile(cappedLimit);
  }

  return {
    ok: true,
    items,
    stats: computeClientErrorStats(items),
    storage,
  };
}

export function isDashboardAccessAllowed(request: Request): boolean {
  if (process.env.NODE_ENV !== "production") return true;

  const key = process.env.ERROR_MONITOR_DASHBOARD_KEY;
  if (!key) return false;

  const headerKey = request.headers.get("x-error-monitor-key");
  const url = new URL(request.url);
  const queryKey = url.searchParams.get("key");

  return headerKey === key || queryKey === key;
}
