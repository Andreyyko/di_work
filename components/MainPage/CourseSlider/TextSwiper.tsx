"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { TextSwiperSliders } from "@/constant/MainPageConstant/TextSwiperData";

type TextSwiperProps = {
  onSwiper?: (swiper: any) => void;
};

const TextSwiper = ({ onSwiper }: TextSwiperProps) => {
  const slides = TextSwiperSliders.slides;

  return (
    <>
      <div className="flex flex-col gap-10 max-w-[570px] md:hidden">
        {slides.map((slide, index) => (
          <div key={index} className="relative flex flex-col justify-center p-2">
            <span className="heading-bg text-brand-gray absolute -top-1 text-[clamp(36px,6vw,70px)]">
              ({String(index + 1).padStart(2, "0")})
            </span>
            <h2 className="heading-3 mt-7 sm:mt-10 text-[18px] sm:text-[25px]">
              {slide.title}
            </h2>
            <p className="mt-4 heading-4 font-light text-[14px] sm:text-[20px]">
              {slide.description}
            </p>
          </div>
        ))}
      </div>

      <div className="max-w-[570px] w-full relative hidden md:block">
        <Swiper
          modules={[EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={800}
          loop
          allowTouchMove={false}
          onSwiper={onSwiper}
          className="select-none"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative flex flex-col justify-center h-[400px]">
                <span className="heading-bg text-brand-gray absolute top-5 text-[clamp(26px,6vw,70px)]">
                  ({String(index + 1).padStart(2, "0")})
                </span>
                <h2 className="heading-3 text-[25px]">{slide.title}</h2>
                <p className="mt-4 heading-4 font-light max-w-[60%] text-[20px]">
                  {slide.description}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default TextSwiper;
