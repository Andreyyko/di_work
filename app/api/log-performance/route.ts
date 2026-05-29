import { NextResponse } from "next/server";
import type { ClientPerformancePayload } from "@/lib/performance-types";
import {
  isDashboardAccessAllowed,
  listRecentClientPerformance,
  persistClientPerformance,
} from "@/lib/performance-log-storage";
import { randomUUID } from "crypto";

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

function parsePayload(body: unknown): ClientPerformancePayload | null {
  if (!body || typeof body !== "object") return null;
  const data = body as Record<string, unknown>;

  if (!isNonEmptyString(data.url) || !isNonEmptyString(data.userAgent)) return null;
  if (!isNonEmptyString(data.timestamp)) return null;
  if (!data.metrics || typeof data.metrics !== "object") return null;

  const m = data.metrics as Record<string, unknown>;
  const num = (v: unknown) => (typeof v === "number" && !Number.isNaN(v) ? v : null);

  return {
    id: isNonEmptyString(data.id) ? data.id.trim() : randomUUID(),
    sessionId: isNonEmptyString(data.sessionId) ? data.sessionId.trim() : "unknown",
    url: data.url.trim(),
    pathname:
      typeof data.pathname === "string" && data.pathname.startsWith("/")
        ? data.pathname
        : "/",
    userAgent: data.userAgent.trim(),
    timestamp: data.timestamp.trim(),
    metrics: {
      ttfb: num(m.ttfb),
      fcp: num(m.fcp),
      lcp: num(m.lcp),
      cls: num(m.cls),
      inp: num(m.inp),
      domContentLoaded: num(m.domContentLoaded),
      loadEvent: num(m.loadEvent),
      longTasks: typeof m.longTasks === "number" ? m.longTasks : 0,
    },
    rating:
      data.rating === "good" || data.rating === "needs-improvement" || data.rating === "poor"
        ? data.rating
        : "needs-improvement",
    recommendations: Array.isArray(data.recommendations)
      ? data.recommendations.filter((r): r is string => typeof r === "string")
      : [],
    slowResources: Array.isArray(data.slowResources) ? (data.slowResources as ClientPerformancePayload["slowResources"]) : [],
    tags: Array.isArray(data.tags)
      ? data.tags.filter((t): t is string => typeof t === "string")
      : [],
  };
}

export async function GET(request: Request) {
  if (!isDashboardAccessAllowed(request)) {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  const limit = Number(new URL(request.url).searchParams.get("limit") || "100");

  try {
    return NextResponse.json(await listRecentClientPerformance(limit));
  } catch (error) {
    console.error("[log-performance] read failed:", error);
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
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  try {
    const storage = await persistClientPerformance(payload);
    return NextResponse.json({ ok: true, storage, id: payload.id });
  } catch (error) {
    console.error("[log-performance] persist failed:", error);
    return NextResponse.json({ ok: false, error: "Storage failed" }, { status: 500 });
  }
}
