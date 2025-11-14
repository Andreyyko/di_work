"use client";

import HeroSection from "@/components/HeroSection/HeroSection";
import IdentityIntro from "@/components/IdentityIntroSection/IdentityIntro";

export default function Home() {
  return (
    <main
      className="
        bg-brand-background px-5"
    >
      <HeroSection />
      <IdentityIntro />
    </main>

  );
}
