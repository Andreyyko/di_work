'use client'
import { useEffect, useState } from 'react'

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('favorites') || '[]')
    setFavorites(stored)
  }, [])

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const updated = prev.includes(id)
        ? prev.filter(f => f !== id)
        : [...prev, id]

      localStorage.setItem('favorites', JSON.stringify(updated))
      return updated
    })
  }

  const isFavorite = (id: string) => favorites.includes(id)

  return { favorites, toggleFavorite, isFavorite }
}
