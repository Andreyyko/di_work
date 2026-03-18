import { apiClient } from "./api-client";

export type MakCardFavoritesResponse = {
  favoriteCardIds: string[];
};

type SnakeCaseFavorites = {
  favorite_card_ids?: string[];
};

type WrappedFavorites =
  | MakCardFavoritesResponse
  | SnakeCaseFavorites
  | { data?: MakCardFavoritesResponse | SnakeCaseFavorites }
  | { data?: { favoriteCardIds?: string[]; favorite_card_ids?: string[] } };

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((v) => typeof v === "string");
}

function pickFavoritesFromObject(obj: {
  favoriteCardIds?: string[];
  favorite_card_ids?: string[];
}): string[] | null {
  if (isStringArray(obj.favoriteCardIds)) return obj.favoriteCardIds;
  if (isStringArray(obj.favorite_card_ids)) return obj.favorite_card_ids;
  return null;
}

function parseFavoriteIds(
  data: MakCardFavoritesResponse | SnakeCaseFavorites | WrappedFavorites | string[] | null
): string[] {
  if (data === null) return [];

  if (isStringArray(data)) return data;

  // data is some kind of object wrapper
  const base = data as WrappedFavorites;

  // try top-level fields
  if (pickFavoritesFromObject(base as any)) {
    return pickFavoritesFromObject(base as any) ?? [];
  }

  // try wrapped in data
  if (base && "data" in base && base.data) {
    const inner = base.data as {
      favoriteCardIds?: string[];
      favorite_card_ids?: string[];
    };
    const picked = pickFavoritesFromObject(inner);
    if (picked) return picked;
  }

  return [];
}

/** GET /api/mak-cards/favorites — отримати список id улюблених карток. */
export async function getMakCardFavorites(): Promise<string[]> {
  const res = await apiClient.get("/mak-cards/favorites");
  return parseFavoriteIds(res.data);
}

/** PUT /api/mak-cards/favorites — замінити список улюблених. */
export async function putMakCardFavorites(favoriteCardIds: string[]): Promise<string[]> {
  const res = await apiClient.put("/mak-cards/favorites", {
    favoriteCardIds,
  });
  return parseFavoriteIds(res.data);
}

/** POST /api/mak-cards/favorites/toggle — додати або прибрати одну картку. Повертає поточний список. */
export async function postMakCardFavoritesToggle(cardId: string): Promise<string[]> {
  const res = await apiClient.post("/mak-cards/favorites/toggle", {
    cardId,
    card_id: cardId, // для бекендів з snake_case
  });
  return parseFavoriteIds(res.data);
}
