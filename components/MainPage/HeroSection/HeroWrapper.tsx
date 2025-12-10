"use client";

import Image from "next/image";

export default function HeroWrapper({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative w-full px-5 overflow-hidden min-h-[600px]">
      <Image
        src="/images/MainPageImages/backgrounds/hero_section_background.svg"
        alt="hero background"
        fill
        priority
        fetchPriority="high"
        className="object-cover object-center"
      />
      {children}
    </section>
  );
}
