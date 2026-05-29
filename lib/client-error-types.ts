export type ClientErrorType =
  | "window.onerror"
  | "unhandledrejection"
  | "resource.error"
  | "console.error"
  | "chunk.load"
  | "error";

export type ClientErrorSeverity = "fatal" | "error" | "warning";

export type ClientErrorCategory =
  | "javascript"
  | "promise"
  | "resource"
  | "chunk"
  | "console"
  | "unknown";

export interface ClientErrorBreadcrumb {
  ts: string;
  kind: string;
  message: string;
  meta?: Record<string, string | number | boolean | null>;
}

export interface ClientErrorEnvironment {
  language: string;
  platform: string;
  screen: string;
  viewport: string;
  online: boolean;
  connection?: string | null;
  memory?: string | null;
  referrer: string;
  readyState: string;
  visibility: string;
}

export interface ClientErrorPayload {
  id: string;
  sessionId: string;
  message: string;
  source?: string | null;
  line?: number | null;
  column?: number | null;
  stack?: string | null;
  type: ClientErrorType;
  severity: ClientErrorSeverity;
  category: ClientErrorCategory;
  url: string;
  pathname: string;
  userAgent: string;
  timestamp: string;
  breadcrumbs?: ClientErrorBreadcrumb[];
  environment?: ClientErrorEnvironment;
  tags?: string[];
}

export interface StoredClientError extends ClientErrorPayload {
  receivedAt: string;
  serverEnv: string;
}

export interface ClientErrorStats {
  total: number;
  last24h: number;
  byType: Record<string, number>;
  bySeverity: Record<string, number>;
  byCategory: Record<string, number>;
  byPath: Record<string, number>;
  timeline: { hour: string; count: number }[];
}

export interface ClientErrorsListResponse {
  ok: true;
  items: StoredClientError[];
  stats: ClientErrorStats;
  storage: "file" | "firestore" | "mixed";
}
