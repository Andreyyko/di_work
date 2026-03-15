import { apiClient } from "./api-client";

const DEFAULT_ERROR_MESSAGE = "Сталася помилка під час запиту до серверу";

type ApiErrorDetail = {
  message?: string;
};

type ApiErrorPayload = {
  error?: string | ApiErrorDetail;
  message?: string;
};

type AxiosLikeResponse = {
  data?: ApiErrorPayload;
};

type AxiosLikeError = {
  response?: AxiosLikeResponse;
};

function isAxiosLikeError(error: Error | AxiosLikeError | null | undefined): error is AxiosLikeError {
  return Boolean(
    error &&
      typeof error === "object" &&
      "response" in error
  );
}

function getErrorMessage(
  error: Error | AxiosLikeError | null | undefined,
  fallback = DEFAULT_ERROR_MESSAGE
): string {
  if (isAxiosLikeError(error) && error.response && error.response.data) {
    const data = error.response.data;

    if (typeof data.error === "string") {
      return data.error;
    }

    if (data.error && typeof data.error === "object" && data.error.message) {
      return data.error.message;
    }

    if (typeof data.message === "string") {
      return data.message;
    }
  }

  if (error instanceof Error && typeof error.message === "string" && error.message.length > 0) {
    return error.message;
  }

  return fallback;
}

// Типи відповіді можуть бути уточнені під фактичну структуру Strapi,
// зараз залишаємо як generic-обгортки.

export interface UserMethodSectionRelation<TMethodSection = {}> {
  id: number;
  method_section: TMethodSection | null;
  // Дозволяємо додаткові поля, але без any
  [key: string]: string | number | boolean | null | TMethodSection | undefined;
}

/**
 * POST /api/user-method-sections/assign
 * Прив'язати розділ методик до поточного користувача.
 */
export async function assignMethodSectionToUser(
  methodSectionId: number
): Promise<UserMethodSectionRelation> {
  try {
    const res = await apiClient.post("/user-method-sections/assign", {
      methodSectionId,
    });
    return res.data;
  } catch (error) {
    const typedError = error as Error | AxiosLikeError | null | undefined;
    const message = getErrorMessage(
      typedError,
      "Не вдалося привʼязати розділ методик"
    );
    throw new Error(message);
  }
}

/**
 * GET /api/user-method-sections/me
 * Отримати всі розділи методик, прив'язані до поточного користувача.
 */
export async function getMyMethodSections<TMethodSection = {}>(): Promise<
  UserMethodSectionRelation<TMethodSection>[]
> {
  try {
    const res = await apiClient.get("/user-method-sections/me");
    return res.data;
  } catch (error) {
    const typedError = error as Error | AxiosLikeError | null | undefined;
    const message = getErrorMessage(
      typedError,
      "Не вдалося завантажити розділи користувача"
    );
    throw new Error(message);
  }
}

