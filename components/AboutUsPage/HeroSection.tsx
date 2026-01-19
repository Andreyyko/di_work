"use client";

import { useEffect } from "react";
import gsap from "gsap";

import CustomSeal from "@/components/common/CustomSeal";
import FrameWrapper from "@/components/common/FrameWrapper";
import { HeroSectionImage } from "@/public/images/AboutUsPage/HeroSection";

const HeroSection = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-hero-item]",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.7,
          ease: "power1.out",
          stagger: 0.12,
          clearProps: "opacity",
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="pb-37 lg:pb-[242px]" data-hero>
      <h5
        className="heading-5 -translate-x-5 absolute"
        data-hero-item
      >
        Життя — це не
        <br />
        про ідеальність, а<br />
        про вміння
        <br />
        відновлювати
        <br />
        баланс, знаходити
        <br />
        сенс у кожному
        <br />
        моменті і йти
        <br />
        вперед, навіть коли
        <br />
        шлях здається
        <br />
        важким.
      </h5>

      <h2
        className="heading-2 uppercase text-center flex flex-col pt-35 whitespace-nowrap -translate-x-7 sm:translate-0 -tracking-widest sm:tracking-normal"
        data-hero-item
      >
        <span className="first-letter" data-first-letter="Р">
          ОК-М — 20 років
        </span>
        <span
          className="first-letter translate-x-6 sm:translate-x-0"
          data-first-letter="п"
        >
          рактики
        </span>
      </h2>

      <div className="flex flex-col md:flex-row justify-between items-center pt-10 gap-10">
        <h4
          className="heading-4 w-full md:max-w-[23%] order-2 md:order-1"
          data-hero-item
        >
          Перший в Україні психотерапевтичний сайт, evidence-based
          онлайн-каталог із понад 1000 технік, вправ, інтервенцій, практик
          спрямований на підтримку психічного здоров’я, відновлення ресурсу та
          всіх сфер особистості.
        </h4>

        <div
          className="order-1 md:order-2 relative"
          data-hero-item
        >
          <FrameWrapper
            className="w-90 translate-0 lg:-translate-x-12"
            src={HeroSectionImage.BOHDANA_STAY}
            alt="human-stay"
            showOrnaments
            paddingX={25}
            paddingY={25}
          />

          <h5 className="heading-5 absolute bottom-0 -right-50 hidden lg:block lg:-right-30 xl:-right-45">
            Твоя життєздатність
            <br />
            та унікальність
          </h5>
        </div>

        <div
          className="hidden md:block order-3"
          data-hero-item
        >
          <CustomSeal label="Переглянути методики" position="left" />
        </div>

        <div
          className="block md:hidden order-3"
          data-hero-item
        >
          <CustomSeal label="Переглянути методики" position="right" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
