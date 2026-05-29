import { NextResponse } from "next/server";
import { isFirebaseConfigured, testFirestoreConnection } from "@/lib/firebase-admin-app";

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { ok: false, error: "Not available in production" },
      { status: 404 }
    );
  }

  const result = await testFirestoreConnection();
  return NextResponse.json(result);
}
