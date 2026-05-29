"use client";

import { useEffect, useCallback } from "react";
import { getJwt } from "@/api/auth-api";
import {
  getMakCardFavorites,
  postMakCardFavoritesToggle,
} from "@/api/mak-cards-favorites-api";
import { useMakFavoritesStore } from "@/stores/mak-favorites-store";

const STORAGE_KEY = "favorites";

function getStoredFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setStoredFavorites(ids: string[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

export function useFavorites() {
  const favorites = useMakFavoritesStore((s) => s.favorites);
  const setFavorites = useMakFavoritesStore((s) => s.setFavorites);
  const toggleOptimistic = useMakFavoritesStore((s) => s.toggleOptimistic);

  useEffect(() => {
    const jwt = getJwt();
    if (jwt) {
      getMakCardFavorites()
        .then((ids) => {
          const list = Array.isArray(ids) ? ids : [];
          setFavorites(list);
          setStoredFavorites(list);
        })
        .catch(() => setFavorites(getStoredFavorites()));
    } else {
      setFavorites(getStoredFavorites());
    }
  }, [setFavorites]);

  const toggleFavorite = useCallback(
    (id: string) => {
      const jwt = getJwt();
      if (jwt) {
        const next = toggleOptimistic(id);
        postMakCardFavoritesToggle(id)
          .then((ids) => {
            if (!Array.isArray(ids)) return;
            setFavorites(ids.length === 0 && next.includes(id) ? next : ids);
            setStoredFavorites(Array.isArray(ids) ? ids : next);
          })
          .catch(() => setStoredFavorites(next));
      } else {
        const updated = favorites.includes(id)
          ? favorites.filter((f) => f !== id)
          : [...favorites, id];
        setFavorites(updated);
        setStoredFavorites(updated);
      }
    },
    [favorites, setFavorites, toggleOptimistic]
  );

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites]
  );

  return { favorites, toggleFavorite, isFavorite };
}
