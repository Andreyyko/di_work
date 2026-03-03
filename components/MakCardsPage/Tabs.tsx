'use client'

import { Heart } from "lucide-react"

type Tab = 'all' | 'favorites'

export default function Tabs({
  active,
  onChange
}: {
  active: Tab
  onChange: (tab: Tab) => void
}) {
  return (
    <div className="flex gap-4">
      <button
        onClick={() => onChange('all')}
        className={`py-2 transition cursor-pointer
          ${active === 'all'
            ? 'border-brand-gray text-brand-gray'
            : 'border-brand-gray/30 text-brand-gray/50'
          }`}
      >
        All
      </button>

      <button
        onClick={() => onChange('favorites')}
        className={`px-4 py-2 transition cursor-pointer
          ${active === 'favorites'
            ? 'border-brand-gray text-brand-gray opacity-100'
            : 'border-brand-gray/30 text-brand-gray/50 opacity-50'
          }`}
      >
        <Heart size={32} color="#67161f" strokeWidth={1.25} fill="#67161f"/>
      </button>
      
    </div>
  )
}
