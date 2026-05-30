import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import type {
  ClientErrorPayload,
  ClientErrorStats,
  ClientErrorsListResponse,
  StoredClientError,
} from "./client-error-types";
import { getFirestoreDb, isFirebaseConfigured } from "./firebase-admin-app";

const LOG_DIR = path.join(process.cwd(), "logs");
const LOG_FILE = path.join(LOG_DIR, "client-errors.jsonl");
/** Максимум записів у файлі fallback (pretty JSON array). */
const MAX_FILE_ENTRIES = 200;

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
  const { FieldValue } = await import("firebase-admin/firestore");
  const db = await getFirestoreDb();
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

function isStoredClientError(value: unknown): value is StoredClientError {
  if (!value || typeof value !== "object") return false;
  const row = value as StoredClientError;
  return typeof row.message === "string" && typeof row.timestamp === "string";
}

function parseJsonlLine(line: string): StoredClientError | null {
  try {
    const parsed = JSON.parse(line) as StoredClientError;
    return isStoredClientError(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

async function readAllFromLogFile(): Promise<StoredClientError[]> {
  try {
    const content = await readFile(LOG_FILE, "utf8");
    const trimmed = content.trim();
    if (!trimmed) return [];

    if (trimmed.startsWith("[")) {
      const parsed = JSON.parse(trimmed) as unknown;
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(isStoredClientError);
    }

    return trimmed
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map(parseJsonlLine)
      .filter((item): item is StoredClientError => item !== null);
  } catch {
    return [];
  }
}

async function writeAllToLogFile(items: StoredClientError[]): Promise<void> {
  await mkdir(LOG_DIR, { recursive: true });
  const capped = items.slice(-MAX_FILE_ENTRIES);
  await writeFile(LOG_FILE, `${JSON.stringify(capped, null, 2)}\n`, "utf8");
}

async function saveToFile(payload: ClientErrorPayload): Promise<void> {
  const record: StoredClientError = {
    ...normalizePayload(payload),
    receivedAt: new Date().toISOString(),
    serverEnv: process.env.NODE_ENV ?? "unknown",
  };

  const items = await readAllFromLogFile();
  items.push(record);
  await writeAllToLogFile(items);
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

export async function readErrorsFromFile(limit: number): Promise<StoredClientError[]> {
  const items = await readAllFromLogFile();
  return items.slice(-limit).reverse();
}

async function readErrorsFromFirestore(limit: number): Promise<StoredClientError[]> {
  const db = await getFirestoreDb();
  try {
    const snapshot = await db
      .collection("client_errors")
      .orderBy("receivedAt", "desc")
      .limit(limit)
      .get();
    return snapshot.docs.map((doc) => doc.data() as StoredClientError);
  } catch {
    const snapshot = await db.collection("client_errors").limit(limit).get();
    return snapshot.docs
      .map((doc) => doc.data() as StoredClientError)
      .sort((a, b) => (b.receivedAt || "").localeCompare(a.receivedAt || ""))
      .slice(0, limit);
  }
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
