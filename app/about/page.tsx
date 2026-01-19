"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

import ValidationSection from "@/components/MainPage/ValidationSection/ValidationSection";
import BioSection from "../../components/AboutUsPage/BioSection";
import BoxSectionBottom from "../../components/AboutUsPage/BoxSectionBottom";
import BoxSectionTop from "../../components/AboutUsPage/BoxSectionTop";
import HeroSection from "../../components/AboutUsPage/HeroSection";
import FrameWrapper from "@/components/common/FrameWrapper";

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

      <FrameWrapper showOrnaments />

      <div data-fade>
        <h3 className="heading-3 text-[250%] text-black uppercase flex flex-col pt-50">
          <span>“</span>
          <span className="first-letter-plan text-end" data-first-letter="С">
            формуємо нову світлу
          </span>
          <span>
            реальність, знайшовши сенс та унікальність.<span> „</span>
          </span>
        </h3>

        <h5 className="heading-5 pb-50">
          Omnia vincit amor — все перемагає любов.
        </h5>
      </div>

      <div data-fade>
        <ValidationSection />
      </div>
    </div>
  );
}
