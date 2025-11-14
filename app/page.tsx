"use client";

import AboutUs from "@/components/AboutUsSection/AboutUs";
import HeroSection from "@/components/HeroSection/HeroSection";
import IdentityIntro from "@/components/IdentityIntroSection/IdentityIntro";

export default function Home() {
  return (
    <main
      className="
        bg-brand-background px-5 flex flex-col"
        // space-y-[50px] sm:space-y-[150px] md:space-y-[150px] lg:space-y-[150px] xl:space-y-[350px]
    >
      <HeroSection />
      <IdentityIntro />
      <AboutUs />
    </main>
  );
}
