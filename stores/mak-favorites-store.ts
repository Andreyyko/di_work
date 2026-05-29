import { create } from "zustand";

type MakFavoritesState = {
  favorites: string[];
  loaded: boolean;
  setFavorites: (ids: string[]) => void;
  setLoaded: (loaded: boolean) => void;
  toggleOptimistic: (id: string) => string[];
};

export const useMakFavoritesStore = create<MakFavoritesState>((set, get) => ({
  favorites: [],
  loaded: false,

  setFavorites: (ids) => set({ favorites: ids, loaded: true }),

  setLoaded: (loaded) => set({ loaded }),

  toggleOptimistic: (id) => {
    const prev = get().favorites;
    const next = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id];
    set({ favorites: next });
    return next;
  },
}));

export const useMakFavoriteIds = () => useMakFavoritesStore((s) => s.favorites);
export const useMakFavoritesLoaded = () => useMakFavoritesStore((s) => s.loaded);
