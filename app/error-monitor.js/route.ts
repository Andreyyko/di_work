import { serveMonitorAsset } from "@/lib/serve-monitor-asset";

export async function GET() {
  return serveMonitorAsset("error-monitor.js", "application/javascript; charset=utf-8");
}
