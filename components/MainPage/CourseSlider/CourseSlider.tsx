"use client";

import { useRef } from "react";
import Image from "next/image";

import TwoFrameButton from "../../common/TwoFrameButton";
import TextSwiper from "./TextSwiper";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import { Swiper as SwiperType } from "swiper";
import ArrowButton from "../../common/ArrowButton";

import { flower_images } from "@/public/images/CommonImages/FlowerImages";

const CourseSlider = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const { isSmallerThanMd, isSmallerThanSm, isSmallerThanLg ,isSmallerThanXl} = useWindowWidth();

  const handleNextSlide = () => {
    swiperRef.current?.slideNext();
  };

  return (
    <section className="relative">
      {!isSmallerThanMd && (
        <h5 className="heading-5 max-w-50 -translate-x-5">
          Він допомагає відкрити нові можливості,
          <br />
          розвиває внутрішні ресурси
          <br />
          та формує впевненість у власних силах
        </h5>
      )}
      <h2 className="heading-2 flex flex-col translate-y-0 sm:translate-y-0 md:translate-y-0 lg:translate-y-0 xl:-translate-y-38">
        {isSmallerThanSm ? (
          <>
            <span className="first-letter uppercase text-end">незалежно</span>
            <span className="text-start uppercase">від віку</span>
          </>
        ) : (
          <span className="max-w-[90%] uppercase first-letter text-end">
            незалежно від віку
          </span>
        )}

        <span className="text-start block uppercase">чи досвіду – цей курс</span>

        <span className="max-w-[90%] first-letter uppercase text-end block">
          підтримує
        </span>

        <div
          className={`w-full ${
            isSmallerThanXl
              ? "flex flex-col gap-0"
              : "flex flex-row justify-between items-center gap-6"
          }`}
        >
          {isSmallerThanSm ? (
            <>
              <span className="first-letter text-end w-[90%] uppercase">на шляху</span>
              <span className="text-start w-fit ">ДО ЗМІН<span className={` 
              ${isSmallerThanSm
              ?"inline heading-bg w-fit leading-1"
              :"hidden"
              }`}
              >
                Mental Healthy
                </span>
                </span>
            </>
          ) : (
            <span className="first-letter text-start w-fit whitespace-nowrap uppercase">
              на шляху до змін
            </span>
          )}

          <span
            className={`heading-3 ${
              isSmallerThanLg
                ? "leading-5 w-full pt-5"
                : "text-start whitespace-nowrap"
            }`}
          >
            Розділи розроблені так, щоб ними могли{" "}
            <br className={`${
                isSmallerThanSm
                ?"hidden" 
                :"block"}`}/>
            користуватись дорослі, діти і колективи
          </span>
        </div>
      </h2>

      {!isSmallerThanMd && (
        <p className="pt-30 -translate-y-4 xl:pt-0 heading-bg text-right max-w-[95%] leading-[0.5] text-[clamp(60px,14vw,190px)]">
          Mental health
        </p>
      )}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex-1 min-w-0 mt-30 sm:mt-30 md:max-w-[60%] translate-0 sm:translate-0 md:-translate-y-20">
          <TextSwiper onSwiper={(swiper) => (swiperRef.current = swiper)} />
        </div>

        <div className="flex items-center translate-0 sm:-translate-y-10 justify-center md:justify-end gap-4 md:max-w-[40%] w-full z-50">
          {!isSmallerThanMd && <ArrowButton onClick={handleNextSlide} />}
          <TwoFrameButton variant="one" label="ОБРАТИ СВОЮ МЕТОДИКУ" />
        </div>
      </div>

      <Image
        className="
          absolute
          top-52 w-80 -right-18
          sm:top-40 sm:-right-10
          md:top-50 md:w-170 md:-right-10
          lg:top-80 lg:w-220 lg:-right-10
          xl:top-50 xl:w-auto xl:-right-10
          select-none pointer-events-none z-10
        "
        src={flower_images.COURSE_SLIDER_FLOWER}
        alt="flower"
      />
    </section>
  );
};

export default CourseSlider;
