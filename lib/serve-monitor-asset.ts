import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

const MONITORS_DIR = path.join(process.cwd(), "utils/monitors");

const NO_STORE = "no-store, must-revalidate";

export async function serveMonitorAsset(
  filename: string,
  contentType: string
): Promise<NextResponse> {
  try {
    const body = await readFile(path.join(MONITORS_DIR, filename), "utf8");
    return new NextResponse(body, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": NO_STORE,
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
