"use client";

import { useEffect, useState, useCallback } from "react";
import { getJwt } from "@/api/auth-api";
import {
  getMakCardFavorites,
  postMakCardFavoritesToggle,
} from "@/api/mak-cards-favorites-api";

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
  const [favorites, setFavorites] = useState<string[]>([]);

  // При завантаженні — один GET, стейт тільки з відповіді (масив)
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
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    const jwt = getJwt();
    if (jwt) {
      // Оптимістичний стан рахуємо з поточного; API викликаємо один раз зовні (не всередині setState),
      // щоб у React Strict Mode не було подвійного виклику toggle
      const next = favorites.includes(id)
        ? favorites.filter((f) => f !== id)
        : [...favorites, id];
      setFavorites(next);
      postMakCardFavoritesToggle(id)
        .then((ids) => {
          setFavorites((current) => {
            if (!Array.isArray(ids)) return current;
            if (ids.length === 0 && current.includes(id)) return current;
            return ids;
          });
          setStoredFavorites(Array.isArray(ids) ? ids : next);
        })
        .catch(() => {
          setStoredFavorites(next);
        });
    } else {
      setFavorites((prev) => {
        const updated = prev.includes(id)
          ? prev.filter((f) => f !== id)
          : [...prev, id];
        setStoredFavorites(updated);
        return updated;
      });
    }
  }, [favorites]);

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id), // перевірка по всьому масиву
    [favorites]
  );

  return { favorites, toggleFavorite, isFavorite };
}
