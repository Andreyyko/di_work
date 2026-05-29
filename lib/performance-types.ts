export type PerformanceRating = "good" | "needs-improvement" | "poor";

export interface PerformanceMetricValues {
  ttfb: number | null;
  fcp: number | null;
  lcp: number | null;
  cls: number | null;
  inp: number | null;
  domContentLoaded: number | null;
  loadEvent: number | null;
  longTasks: number;
}

export interface SlowResourceEntry {
  name: string;
  duration: number;
  transferSize: number | null;
  initiatorType: string;
}

export interface ClientPerformancePayload {
  id: string;
  sessionId: string;
  url: string;
  pathname: string;
  userAgent: string;
  timestamp: string;
  metrics: PerformanceMetricValues;
  rating: PerformanceRating;
  recommendations: string[];
  slowResources: SlowResourceEntry[];
  tags?: string[];
}

export interface StoredClientPerformance extends ClientPerformancePayload {
  receivedAt: string;
  serverEnv: string;
}

export interface PerformanceStats {
  total: number;
  avgLcp: number | null;
  avgCls: number | null;
  avgTtfb: number | null;
  ratingCounts: Record<string, number>;
  timeline: { hour: string; count: number }[];
}

export interface ClientPerformanceListResponse {
  ok: true;
  items: StoredClientPerformance[];
  stats: PerformanceStats;
  storage: "file" | "firestore";
}
