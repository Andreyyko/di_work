import Image from "next/image";
import HeroSection from "./HeroSection";

export default function HeroSectionWrapper() {
  return (
    <section className="relative px-5 overflow-hidden">
      <Image
        src="/images/MainPageImages/backgrounds/hero_section_background.svg"
        alt=""
        fill
        priority
        fetchPriority="high"
        className="object-cover object-center"
      />

      <HeroSection />
    </section>
  );
}
