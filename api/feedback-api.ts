const API_URL = process.env.NEXT_PUBLIC_API_URL!;

function getErrorMessage(
  data: unknown,
  fallback = "Не вдалося надіслати повідомлення"
): string {
  if (data && typeof data === "object") {
    const obj = data as Record<string, unknown>;

    if (typeof obj.message === "string" && obj.message.trim()) {
      return obj.message;
    }

    if (obj.error && typeof obj.error === "object") {
      const message = (obj.error as Record<string, unknown>).message;
      if (typeof message === "string" && message.trim()) {
        return message;
      }
    }
  }

  return fallback;
}

export interface SubmitFeedbackPayload {
  name: string;
  email: string;
  message: string;
  tariff?: string;
}

export interface SubmitFeedbackResponse {
  ok: true;
  message: string;
}

export async function submitFeedback(
  body: SubmitFeedbackPayload
): Promise<SubmitFeedbackResponse> {
  const res = await fetch(`${API_URL}/feedback`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok || data?.ok !== true) {
    throw new Error(getErrorMessage(data));
  }

  return {
    ok: true,
    message:
      typeof data.message === "string" && data.message.trim()
        ? data.message
        : "Повідомлення збережено",
  };
}
