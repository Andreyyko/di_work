"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

import ValidationSection from "@/components/MainPage/ValidationSection/ValidationSection";
import BioSection from "../../components/AboutUsPage/BioSection";
import BoxSectionBottom from "../../components/AboutUsPage/BoxSectionBottom";
import BoxSectionTop from "../../components/AboutUsPage/BoxSectionTop";
import HeroSection from "../../components/AboutUsPage/HeroSection";
import FrameWrapper from "@/components/common/FrameWrapper";
import Image from "next/image";
import { about_us_images } from "@/public/images/MainPageImages/AboutUsImages";
import { bio_section_images } from "@/public/images/AboutUsPage/BioSection";

export default function AboutUs() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-fade]",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          ease: "power1.out",
          stagger: 0.1,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="px-5 relative overflow-hidden bg-[url('/images/MainPageImages/backgrounds/hero_section_background.svg')]"
    >
      <div>
        <HeroSection />
      </div>

      <div data-fade>
        <BoxSectionTop />
      </div>

      <div data-fade>
        <BoxSectionBottom />
      </div>

      <div data-fade>
        <BioSection />
      </div>

      <FrameWrapper
        showOrnaments
        paddingX={10}
        paddingY={10}
        paddingXDesktop={25}
        paddingYDesktop={25}
      >
        <video
          src="/video/AboutUsPage/WalkVideoUniversity.mov"
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          className="w-full h-50 md:h-70 lg:h-150 object-cover"
        ></video>
      </FrameWrapper>

      <div data-fade>
        <h3 className="hidden heading-3 text-[210%] lg:text-[250%] xl:text-[313%] text-black uppercase lg:flex flex-col pt-50">
          <Image src={bio_section_images.PAWS} alt={"paw"} />
          <span className="first-letter-about text-end" data-first-letter="С">
            формуємо нову світлу
          </span>
          <span className="flex flex-row justify-between">
            реальність, знайшовши сенс та унікальність.
            <Image
              src={bio_section_images.PAWS}
              alt={"paw"}
              className="rotate-180 translate-y-5"
            />
          </span>
        </h3>
        <h3 className="lg:hidden heading-3 text-[130%] lg:text-[250%] xl:text-[313%] text-black uppercase flex flex-col pt-50">
          <Image src={bio_section_images.PAWS} alt={"paw"} width={20} />
          <span className="first-letter-plan text-end" data-first-letter="С">
            формуємо
          </span>
          <span className="flex flex-row justify-between">
            нову світлу реальність, знайшовши сенс та унікальність.
            <Image
              src={bio_section_images.PAWS}
              alt={"paw"}
              className="rotate-180 translate-y-5"
              width={20}
            />
          </span>
        </h3>

        <h5 className="heading-5 pb-50 pt-3">
          Omnia vincit amor — все перемагає любов.
        </h5>
      </div>

      <div data-fade>
        <ValidationSection />
      </div>
    </div>
  );
}
