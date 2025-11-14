"use client";

import { useRef } from "react";
import Image from "next/image";
import TwoFrameButton from "../common/TwoFrameButton";
import TextSwiper from "./TextSwiper";
import { flower_images } from "@/public/images/FlowerImages";
import { Swiper as SwiperType } from "swiper";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import ArrowButton from "../common/ArrowButton";

const CourseSlider = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const { isSmallerThanMd } = useWindowWidth();

  const handleNextSlide = () => {
    swiperRef.current?.slideNext();
  };

  return (
    <section className="relative pb-responsive">
      
      {!isSmallerThanMd && (
        <h5 className="heading-5 max-w-50 -translate-x-5">
          Він допомагає відкрити нові можливості,<br />
          розвиває внутрішні ресурси<br />
          та формує впевненість у власних силах
        </h5>
      )}

      <h2 className="heading-2 flex flex-col">
        <span className="max-w-[90%] first-letter-hero text-end">
          НЕЗАЛЕЖНО ВІД ВІКУ
        </span>
        <span className="text-start block">ЧИ ДОСВІДУ – ЦЕЙ КУРС</span>
        <span className="max-w-[90%] first-letter-hero text-end block">
          ПІДТРИМУЄ
        </span>

        <div
          className={`w-full ${
            isSmallerThanMd ? "flex flex-col" : "flex flex-row items-center"
          }`}
        >
          <span className="first-letter-hero text-start w-[70%]">
            НА ШЛЯХУ ДО ЗМІН
          </span>

          <h3
            className={`heading-3 ${
              isSmallerThanMd
                ? "max-w-full  text-[18px] leading-none"
                : "max-w-[30%] text-[22px]"
            }`}
          >
            Розділи розроблені так, щоб ними могли користуватись дорослі, діти і колективи
          </h3>
        </div>
      </h2>

      
      {!isSmallerThanMd && (
        <p className="pt-20 heading-bg text-right max-w-[95%] leading-[1.1] text-[clamp(60px,14vw,190px)]">
          Mental health
        </p>
      )}

      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-10 gap-6">
        
        <div className="flex-1 min-w-0 md:max-w-[60%]">
          <TextSwiper onSwiper={(swiper) => (swiperRef.current = swiper)} />
        </div>

        
        <div className="flex items-center justify-center md:justify-end gap-4 md:max-w-[40%] w-full">
          {!isSmallerThanMd && <ArrowButton onClick={handleNextSlide} />}
          <TwoFrameButton variant="one" label="ОБЕРІТЬ СВОЮ МЕТОДИКУ" />
        </div>
      </div>

      <Image
  className="
    absolute
    top-63 -right-5
    sm:bottom-0 sm:-right-5
    md:bottom-0 md:-right-5 
    [@media(min-width:1025px)]:top-140
    xl:top-150

    w-[220px]        
    sm:w-[340px]     
    md:w-[520px]     
    [@media(min-width:1025px)]:w-auto
    
    select-none pointer-events-none z-10
  "
  src={flower_images.COURSE_SLIDER_FLOWER}
  alt="flower"
/>



    </section>
  );
};

export default CourseSlider;
