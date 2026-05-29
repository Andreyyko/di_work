import { serveMonitorAsset } from "@/lib/serve-monitor-asset";

export async function GET() {
  return serveMonitorAsset("dev-monitor-panel.css", "text/css; charset=utf-8");
}
