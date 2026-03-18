const API_URL =
  typeof window !== "undefined"
    ? (process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337/api")
    : process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337/api";

import { getJwt } from "./auth-api";

export async function grantMakCardsAccess(): Promise<{
  ok: boolean;
  error?: string;
}> {
  const jwt = getJwt();
  if (!jwt) {
    return { ok: false, error: "Необхідно увійти в систему" };
  }

  const res = await fetch(`${API_URL}/mak-cards/access`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });

  if (res.status === 401) {
    return { ok: false, error: "Необхідно увійти в систему" };
  }
  if (!res.ok) {
    return { ok: false, error: "Не вдалося надати доступ. Спробуйте пізніше." };
  }

  // Тіло не обов'язкове, важливий факт успішного статусу
  return { ok: true };
}
