import { apiClient } from "./api-client";

export interface PaymentStatusResponse {
  paid: boolean;
}

function isPaidLike(data: unknown): boolean {
  if (!data || typeof data !== "object") return false;
  const obj = data as Record<string, unknown>;

  if (typeof obj.paid === "boolean") return obj.paid;
  if (typeof obj.paid === "string") {
    const v = obj.paid.toLowerCase();
    if (v === "true" || v === "1" || v === "yes") return true;
  }

  const statusRaw = obj.status;
  if (typeof statusRaw === "string") {
    const status = statusRaw.toLowerCase();
    if (
      status === "paid" ||
      status === "success" ||
      status === "approved" ||
      status === "completed"
    ) {
      return true;
    }
  }

  return false;
}

export async function getPaymentStatus(
  orderReference: string
): Promise<PaymentStatusResponse> {
  const res = await apiClient.get("/payments/status", {
    params: { orderReference },
  });
  return { paid: isPaidLike(res.data) };
}
