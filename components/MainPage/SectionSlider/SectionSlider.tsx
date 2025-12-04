"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/effect-fade";

import FrameWrapper from "@/components/common/FrameWrapper";
import ArrowButton from "@/components/common/ArrowButton";
import { section_slider_images } from "@/public/images/MainPageImages/SectionSliderImages";
import Image from "next/image";
import { white_letter } from "@/public/images/CommonImages/PostCard";
import { section_slides } from "@/constant/MainPageConstant/SlidesSectionSlider";

const SectionSlider = () => {
    const swiperRef = useRef<SwiperType | null>(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
  
    return (
      <section className="relative w-full bg-brand-background pb-responsive">
  
        <div className="hidden lg:flex justify-between items-start w-full relative z-10">
          <FrameWrapper
            src={section_slider_images.BOHDANA_STAYING}
            paddingX={20}
            paddingY={35}
            className="lg:max-w-[200px] xl:max-w-[360px]"
            showOrnaments
          />
          <FrameWrapper
            src={section_slider_images.CHAIR_BOOKS}
            paddingX={20}
            paddingY={20}
            className="lg:max-w-60 xl:max-w-[340px]"
            showOrnaments
          />
        </div>
  
        <h2 className="hidden lg:block heading-2 uppercase text-right absolute w-full top-[21%]">
          <span className="first-letter block -translate-x-[27%]">Що ви</span>
          <span className="first-letter block">Отримаєте завдяки цим</span>
          <span className="first-letter block -translate-x-[18%]">Розділам</span>
          <Image
            src={white_letter.WHITE_POSTCARD}
            alt="letter"
            className="absolute right-0 -rotate-30 top-35 translate-x-25 z-20"
          />
        </h2>
  
        <h2 className="lg:hidden heading-2 uppercase  mt-10 mb-6 px-0 md:px-40">
          <span className="first-letter text-start">Що ви</span>
          <span className="first-letter block text-end">Отримаєте</span>
          <span className="block text-start">завдяки цим</span>
          <span className="first-letter block text-end">Розділам</span>
        </h2>
  
        <div className="lg:hidden flex justify-center mb-6">
          <FrameWrapper
            src={section_slider_images.BOHDANA_STAYING}
            paddingX={20}
            paddingY={35}
            className="max-w-[300px]"
            showOrnaments
          />
        </div>
  
        <div className="relative lg:max-w-3xl xl:max-w-5xl mt-15">
  
          <Swiper
            effect="fade"
            fadeEffect={{ crossFade: true }}
            modules={[EffectFade]}
            speed={500}
            allowTouchMove={false}
            loop={false}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            onSlideChange={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            className="w-full"
          >
            {section_slides.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="min-h-[380px] lg:min-h-[220px] mt-5">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 md:gap-15 lg:gap-20ʼ">
                    <div>
                      <h3 className="heading-3 mb-4">{item.leftTitle}</h3>
                      <p className="heading-4 max-w-[90%]">{item.leftText}</p>
                    </div>
                    <div>
                      <h3 className="heading-3 mb-4">{item.rightTitle}</h3>
                      <p className="heading-4 max-w-[90%]">{item.rightText}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
  
          <div className="hidden lg:flex items-center absolute right-0 top-1/2 lg:translate-x-50 xl:translate-x-55 z-50">
            <ArrowButton
              direction="left"
              onClick={() => swiperRef.current?.slidePrev()}
              className={`${isBeginning ? "opacity-20 pointer-events-none" : ""} mr-6`}
            />
            <ArrowButton
              onClick={() => swiperRef.current?.slideNext()}
              className={`${isEnd ? "opacity-20 pointer-events-none" : ""}`}
            />
          </div>
  
          <div className="lg:hidden flex relative justify-center gap-40 mt-8 -translate-y-10 sm:-translate-y-40 z-40">
          <ArrowButton
              direction="left"
              onClick={() => swiperRef.current?.slidePrev()}
              className={`${isBeginning ? "opacity-20 pointer-events-none" : ""} mr-6`}
            />
            <ArrowButton
              onClick={() => swiperRef.current?.slideNext()}
              className={`${isEnd ? "opacity-20 pointer-events-none" : ""}`}
            />
          </div>
  
        </div>
      </section>
    );
  };
  
  export default SectionSlider;