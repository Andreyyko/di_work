"use client";

import { useEffect } from "react";
import gsap from "gsap";

import HeroSection from "@/components/CatalogMethodicsPage/HeroSection";
import MethodicsListUse from "@/components/CatalogMethodicsPage/MethodicsListUse";
import ChoosePlanSection from "@/components/MainPage/ChoosePlanSection/ChoosePlanSection";
import { white_letter } from "@/public/images/CommonImages/PostCard";
import Image from "next/image";

export default function MethodicsCatalogPage() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-animate-item]",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power1.out",
          stagger: 0.15,
          clearProps: "opacity,transform",
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-brand-background relative overflow-hidden">
      <section
        className="px-5 bg-cover bg-center bg-no-repeat bg-[url('/images/MainPageImages/backgrounds/hero_section_background.svg')]"
        data-animate-item
      >
        <HeroSection />
      </section>

      <section
        className="px-5 bg-[url('/images/CatalogMethodicsPage/backgrounds/MethodicsListBackGrounds.svg')] relative"
        data-animate-item
      >
        <MethodicsListUse />
        <Image
          className="absolute right-0 -translate-y-190 w-110 rotate-15 translate-x-40 hidden md:block"
          src={white_letter.WHITE_POSTCARD}
          alt={"postcard"}
          data-animate-item
        />
      </section>

      <section className="px-5 bg-cover bg-center bg-no-repeat bg-[url('/images/CatalogMethodicsPage/backgrounds/MethodicsListBackGrounds.svg')] pb-6">
        <ChoosePlanSection />
      </section>
    </div>
  );
}
