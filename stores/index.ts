/** Zustand stores — стан за доменами (auth, МАК-картки). */
export {
  useAuthStore,
  useAuthUser,
  useAuthJwt,
  useIsAuthenticated,
} from "./auth-store";

export {
  useMakFavoritesStore,
  useMakFavoriteIds,
  useMakFavoritesLoaded,
} from "./mak-favorites-store";

export {
  useMakCardsUiStore,
  useMakCardsTab,
  useMakCardsQuery,
  useMakCardsActiveId,
} from "./mak-cards-ui-store";
