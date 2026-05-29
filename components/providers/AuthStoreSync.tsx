"use client";

import { useEffect } from "react";
import { getJwt } from "@/api/auth-api";
import { syncJwtCookie } from "@/lib/auth-cookie";
import { useAuthStore } from "@/stores/auth-store";

/** Гідратує Zustand auth-store з localStorage після завантаження клієнта. */
export default function AuthStoreSync() {
  const hydrateFromStorage = useAuthStore((s) => s.hydrateFromStorage);

  useEffect(() => {
    hydrateFromStorage();
    const jwt = getJwt();
    if (jwt) syncJwtCookie(jwt);
  }, [hydrateFromStorage]);

  return null;
}
