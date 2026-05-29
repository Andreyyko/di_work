import { serveMonitorAsset } from "@/lib/serve-monitor-asset";

export async function GET() {
  return serveMonitorAsset("performance-monitor.js", "application/javascript; charset=utf-8");
}
