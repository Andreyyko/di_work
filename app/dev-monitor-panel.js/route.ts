import { serveMonitorAsset } from "@/lib/serve-monitor-asset";

export async function GET() {
  return serveMonitorAsset("dev-monitor-panel.js", "application/javascript; charset=utf-8");
}
