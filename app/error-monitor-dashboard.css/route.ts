import { serveMonitorAsset } from "@/lib/serve-monitor-asset";

export async function GET() {
  return serveMonitorAsset("error-monitor-dashboard.css", "text/css; charset=utf-8");
}
