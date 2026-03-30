"use client";

import { Heart, Baby, BookOpen } from "lucide-react";

export type Tab = "all" | "favorites" | "child" | "instruction";

export default function Tabs({
  active,
  onChange,
}: {
  active: Tab;
  onChange: (tab: Tab) => void;
}) {
  return (
    <div className="flex flex-wrap gap-4">
      <button
        onClick={() => onChange("all")}
        className={`py-2 px-4 transition cursor-pointer 
        ${active === "all" ? " text-brand-gray" : " text-brand-gray/50"}`}
      >
        <div className="flex flex-col items-center">
          <p>All</p>
          <p>Для дорослих</p>
        </div>
      </button>

      <button
        onClick={() => onChange("favorites")}
        className={`py-2 px-4 transition cursor-pointer 
        ${
          active === "favorites"
            ? "opacity-100 text-brand-gray"
            : "opacity-50 text-brand-gray/50"
        }`}
      >
        <Heart size={28} color="#67161f" strokeWidth={1.25} fill="#67161f" />
      </button>

      <button
        onClick={() => onChange("child")}
        className={`py-2 px-4 transition cursor-pointer 
        ${active === "child" ? " text-brand-gray" : " text-brand-gray/50"}`}
      >
        <div className="flex flex-col items-center">
          <Baby size={28} strokeWidth={1.25} />
          <p>Для дітей</p>
        </div>
      </button>
      <button
        onClick={() => onChange("instruction")}
        className={`py-2 px-4 transition cursor-pointer 
        ${active === "instruction" ? " text-brand-gray" : " text-brand-gray/50"}`}
      >
        <div className="flex flex-col items-center text-center leading-tight">
          <BookOpen size={28} strokeWidth={1.25} />
          <p>Інструкція</p>
        </div>
      </button>
    </div>
  );
}
