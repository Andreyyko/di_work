import { NextResponse } from "next/server";
import type {
  ClientErrorCategory,
  ClientErrorPayload,
  ClientErrorSeverity,
  ClientErrorType,
} from "@/lib/client-error-types";
import {
  isDashboardAccessAllowed,
  listRecentClientErrors,
  persistClientError,
} from "@/lib/error-log-storage";
import { randomUUID } from "crypto";

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function parseSeverity(value: unknown): ClientErrorSeverity {
  if (value === "fatal" || value === "warning" || value === "error") return value;
  return "error";
}

function parseCategory(value: unknown): ClientErrorCategory {
  const allowed: ClientErrorCategory[] = [
    "javascript",
    "promise",
    "resource",
    "chunk",
    "console",
    "unknown",
  ];
  return allowed.includes(value as ClientErrorCategory)
    ? (value as ClientErrorCategory)
    : "unknown";
}

function parseType(value: unknown): ClientErrorType {
  const allowed: ClientErrorType[] = [
    "window.onerror",
    "unhandledrejection",
    "resource.error",
    "console.error",
    "chunk.load",
    "error",
  ];
  return allowed.includes(value as ClientErrorType) ? (value as ClientErrorType) : "error";
}

function parsePayload(body: unknown): ClientErrorPayload | null {
  if (!body || typeof body !== "object") {
    return null;
  }

  const data = body as Record<string, unknown>;

  if (!isNonEmptyString(data.message)) {
    return null;
  }

  if (!isNonEmptyString(data.url) || !isNonEmptyString(data.userAgent)) {
    return null;
  }

  if (!isNonEmptyString(data.timestamp)) {
    return null;
  }

  const line = data.line;
  const column = data.column;
  let pathname = typeof data.pathname === "string" ? data.pathname : "/";
  if (!pathname.startsWith("/")) {
    try {
      pathname = new URL(data.url as string).pathname;
    } catch {
      pathname = "/";
    }
  }

  return {
    id: isNonEmptyString(data.id) ? data.id.trim() : randomUUID(),
    sessionId: isNonEmptyString(data.sessionId) ? data.sessionId.trim() : "unknown",
    message: data.message.trim(),
    source: typeof data.source === "string" ? data.source : null,
    line: typeof line === "number" ? line : null,
    column: typeof column === "number" ? column : null,
    stack: typeof data.stack === "string" ? data.stack : null,
    type: parseType(data.type),
    severity: parseSeverity(data.severity),
    category: parseCategory(data.category),
    url: data.url.trim(),
    pathname,
    userAgent: data.userAgent.trim(),
    timestamp: data.timestamp.trim(),
    breadcrumbs: Array.isArray(data.breadcrumbs) ? (data.breadcrumbs as ClientErrorPayload["breadcrumbs"]) : [],
    environment:
      data.environment && typeof data.environment === "object"
        ? (data.environment as ClientErrorPayload["environment"])
        : undefined,
    tags: Array.isArray(data.tags)
      ? data.tags.filter((t): t is string => typeof t === "string")
      : [],
  };
}

export async function GET(request: Request) {
  if (!isDashboardAccessAllowed(request)) {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  const url = new URL(request.url);
  const limit = Number(url.searchParams.get("limit") || "100");

  try {
    const data = await listRecentClientErrors(limit);
    return NextResponse.json(data);
  } catch (error) {
    console.error("[log-error] Failed to list errors:", error);
    return NextResponse.json({ ok: false, error: "Read failed" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const payload = parsePayload(body);

  if (!payload) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields: message, url, userAgent, timestamp" },
      { status: 400 }
    );
  }

  try {
    const storage = await persistClientError(payload);
    return NextResponse.json({ ok: true, storage, id: payload.id });
  } catch (error) {
    console.error("[log-error] Failed to persist error:", error);
    return NextResponse.json({ ok: false, error: "Storage failed" }, { status: 500 });
  }
}
