const API_URL = process.env.NEXT_PUBLIC_API_URL!;

import { getJwt } from "./auth-api";

export type MakCardsAccessResponse =
  | {
      ok: true;
      status?: "active";
    }
  | {
      ok: true;
      status: "payment_required";
      kind: "mak";
      orderReference: string;
      amount: number;
      currency: string;
      paymentUrl: string;
    }
  | {
      ok: false;
      error: string;
    };

export async function grantMakCardsAccess(): Promise<MakCardsAccessResponse> {
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

  const data = (await res.json().catch(() => ({}))) as {
    status?: string;
    orderReference?: string;
    amount?: number;
    currency?: string;
    paymentUrl?: string;
  };

  if (data?.status === "payment_required" && typeof data.paymentUrl === "string") {
    return {
      ok: true,
      status: "payment_required",
      kind: "mak",
      orderReference: data.orderReference ?? "",
      amount: data.amount ?? 0,
      currency: data.currency ?? "UAH",
      paymentUrl: data.paymentUrl,
    };
  }

  return { ok: true, status: "active" };
}
