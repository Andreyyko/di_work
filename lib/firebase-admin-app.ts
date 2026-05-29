/**
 * Спільна ініціалізація Firebase Admin (Firestore) для підсистем моніторингу.
 */
import { readFile } from "fs/promises";
import path from "path";

type FirebaseCredentials = {
  projectId: string;
  clientEmail: string;
  privateKey: string;
};

let cachedCreds: FirebaseCredentials | null | undefined;

async function loadServiceAccountJson(
  filePath: string
): Promise<FirebaseCredentials | null> {
  try {
    const abs = path.isAbsolute(filePath)
      ? filePath
      : path.join(process.cwd(), filePath);
    const raw = await readFile(abs, "utf8");
    const json = JSON.parse(raw) as {
      project_id?: string;
      client_email?: string;
      private_key?: string;
    };
    if (!json.project_id || !json.client_email || !json.private_key) return null;
    return {
      projectId: json.project_id,
      clientEmail: json.client_email,
      privateKey: json.private_key,
    };
  } catch {
    return null;
  }
}

export async function resolveFirebaseCredentials(): Promise<FirebaseCredentials | null> {
  if (cachedCreds !== undefined) return cachedCreds;

  const projectId = process.env.FIREBASE_PROJECT_ID?.trim();
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL?.trim();
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n").trim();

  if (projectId && clientEmail && privateKey) {
    cachedCreds = { projectId, clientEmail, privateKey };
    return cachedCreds;
  }

  const jsonPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH?.trim();
  if (jsonPath) {
    cachedCreds = await loadServiceAccountJson(jsonPath);
    return cachedCreds;
  }

  cachedCreds = null;
  return null;
}

export function isFirebaseConfigured(): boolean {
  const projectId = process.env.FIREBASE_PROJECT_ID?.trim();
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL?.trim();
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.trim();
  if (projectId && clientEmail && privateKey) return true;
  return Boolean(process.env.FIREBASE_SERVICE_ACCOUNT_PATH?.trim());
}

export async function getFirestoreDb() {
  const creds = await resolveFirebaseCredentials();
  if (!creds) {
    throw new Error("Firebase credentials not configured");
  }

  const { cert, getApps, initializeApp } = await import("firebase-admin/app");
  const { getFirestore } = await import("firebase-admin/firestore");

  if (getApps().length === 0) {
    initializeApp({
      credential: cert({
        projectId: creds.projectId,
        clientEmail: creds.clientEmail,
        privateKey: creds.privateKey,
      }),
    });
  }

  return getFirestore();
}

/** Перевірка з’єднання (диплом / dev). */
export async function testFirestoreConnection(): Promise<{
  ok: boolean;
  configured: boolean;
  projectId?: string;
  collections?: string[];
  error?: string;
  hint?: string;
  envCheck?: {
    projectId: boolean;
    clientEmail: boolean;
    privateKey: boolean;
    serviceAccountPath: boolean;
  };
}> {
  const envCheck = {
    projectId: Boolean(process.env.FIREBASE_PROJECT_ID?.trim()),
    clientEmail: Boolean(process.env.FIREBASE_CLIENT_EMAIL?.trim()),
    privateKey: Boolean(process.env.FIREBASE_PRIVATE_KEY?.trim()),
    serviceAccountPath: Boolean(process.env.FIREBASE_SERVICE_ACCOUNT_PATH?.trim()),
  };

  if (!isFirebaseConfigured()) {
    return {
      ok: false,
      configured: false,
      envCheck,
      hint:
        "Збережіть .env.local (Cmd+S) і перезапустіть pnpm dev. Або вкажіть FIREBASE_SERVICE_ACCOUNT_PATH=./your-key.json",
      error: "Firebase env not configured",
    };
  }

  try {
    const creds = await resolveFirebaseCredentials();
    const db = await getFirestoreDb();
    await db.collection("_health").doc("ping").set({
      checkedAt: new Date().toISOString(),
      source: "rok-m-client",
    });
    return {
      ok: true,
      configured: true,
      projectId: creds?.projectId,
      collections: ["client_errors", "client_performance", "_health"],
      envCheck,
    };
  } catch (e) {
    const creds = await resolveFirebaseCredentials();
    return {
      ok: false,
      configured: true,
      projectId: creds?.projectId ?? process.env.FIREBASE_PROJECT_ID,
      envCheck,
      error: e instanceof Error ? e.message : String(e),
    };
  }
}
