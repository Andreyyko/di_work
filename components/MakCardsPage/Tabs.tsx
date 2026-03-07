'use client'

import { Heart, Baby } from "lucide-react"

export type Tab = 'all' | 'favorites' | 'child'

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
        className={`py-2 px-4 transition cursor-pointer 
        ${active === 'all'
          ? ' text-brand-gray'
          : ' text-brand-gray/50'
        }`}
      >
        <div className="flex flex-col items-center"><p>All</p><p>Для дорослих</p></div>
      </button>

      <button
        onClick={() => onChange('favorites')}
        className={`py-2 px-4 transition cursor-pointer 
        ${active === 'favorites'
          ? 'opacity-100 text-brand-gray'
          : 'opacity-50 text-brand-gray/50'
        }`}
      >
        <Heart size={28} color="#67161f" strokeWidth={1.25} fill="#67161f" />
      </button>

      <button
        onClick={() => onChange('child')}
        className={`py-2 px-4 transition cursor-pointer 
        ${active === 'child'
          ? ' text-brand-gray'
          : ' text-brand-gray/50'
        }`}
      >
        <div className="flex flex-col items-center"><Baby size={28} strokeWidth={1.25} /><p>Для дітей</p></div>
      </button>

    </div>
  )
}
