import { apiClient } from "./api-client";

export interface ActivateTariffLegacyResponse<TItem = unknown> {
  items: TItem[];
  createdCount: number;
  alreadyHadCount: number;
  upgradedCount: number;
  totalMethodSections: number;
}

export interface ActivateTariffPaymentRequiredResponse {
  status: "payment_required";
  access: "medium" | "premium";
  kind: "medium" | "premium";
  orderReference: string;
  amount: number;
  currency: string;
  paymentUrl: string;
}

export type ActivateTariffResponse<TItem = unknown> =
  | ActivateTariffLegacyResponse<TItem>
  | ActivateTariffPaymentRequiredResponse;

/**
 * POST /api/tariffs/medium/activate
 * Бекенд не читає поля body, тому передаємо порожній обʼєкт.
 */
export async function activateMediumTariff(): Promise<ActivateTariffResponse> {
  const res = await apiClient.post("/tariffs/medium/activate", {});
  return res.data as ActivateTariffResponse;
}

/**
 * POST /api/tariffs/premium/activate
 * Бекенд не читає поля body, тому передаємо порожній обʼєкт.
 */
export async function activatePremiumTariff(): Promise<ActivateTariffResponse> {
  const res = await apiClient.post("/tariffs/premium/activate", {});
  return res.data as ActivateTariffResponse;
}

