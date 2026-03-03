"use client";
import { useEffect, useState } from "react";

export default function SearchBar({
  onSearch,
}: {
  onSearch: (value: string) => void;
}) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const t = setTimeout(() => onSearch(value), 300);
    return () => clearTimeout(t);
  }, [value]);

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Пошук..."
      className="sm:w-1/3 w-full bg-transparent border-b opacity-100 border-black outline-none py-2 heading-6"
    />
  );
}
