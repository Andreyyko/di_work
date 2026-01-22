"use client";

import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

import TwoFrameButton from "../../common/TwoFrameButton";
import TextSwiper from "./TextSwiper";
import ArrowButton from "../../common/ArrowButton";

import { useWindowWidth } from "@/hooks/useWindowWidth";
import { Swiper as SwiperType } from "swiper";
import { flower_images } from "@/public/images/CommonImages/FlowerImages";
import Link from "next/link";

const CourseSlider = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [animate, setAnimate] = useState(false);

  const { isSmallerThanMd, isSmallerThanSm, isSmallerThanXl } =
    useWindowWidth();

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
        rootMargin: "120px 0px",
      }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (!animate) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".course-anim",
        {
          opacity: 0,
          filter: "blur(14px) drop-shadow(0px 12px 16px rgba(0,0,0,0.15))",
          willChange: "opacity, filter",
        },
        {
          opacity: 1,
          filter: "blur(0px) drop-shadow(0px 0px 0px rgba(0,0,0,0))",
          duration: 1.15,
          ease: "power3.out",
          stagger: 0.12,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [animate]);

  const handleNextSlide = () => {
    swiperRef.current?.slideNext();
  };

  return (
    <section ref={sectionRef} className="relative">
      {!isSmallerThanMd && (
        <p className="heading-5 max-w-50 -translate-x-5">
          Він допомагає відкрити нові можливості,
          <br />
          розвиває внутрішні ресурси
          <br />
          та формує впевненість у власних силах
        </p>
      )}

      <h2 className="course-anim opacity-0 heading-2 flex flex-col xl:-translate-y-38">
        {isSmallerThanSm ? (
          <>
            <span
              className="first-letter uppercase text-end"
              data-first-letter="н"
            >
              езалежно
            </span>
            <span className="text-start uppercase">від віку</span>
          </>
        ) : (
          <span
            className="max-w-[90%] uppercase first-letter text-end"
            data-first-letter="н"
          >
            езалежно від віку
          </span>
        )}

        <span className="text-start block uppercase">
          чи досвіду – цей курс
        </span>

        <span
          className="max-w-full sm:max-w-[90%] first-letter uppercase text-end block"
          data-first-letter="п"
        >
          ідтримує
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
              <span
                className="first-letter text-end w-[95%] uppercase"
                data-first-letter="н"
              >
                а шляху
              </span>

              <span className="relative w-fit text-start block">
                ДО ЗМІН
                <span
                  className="
                    absolute inset-0 -z-10 translate-x-40 -translate-y-1
                    heading-bg whitespace-nowrap text-[clamp(50px,14vw,190px)]
                  "
                >
                  Mental Health
                </span>
              </span>
            </>
          ) : (
            <span
              className="first-letter text-start w-fit whitespace-nowrap uppercase"
              data-first-letter="н"
            >
              а шляху до змін
            </span>
          )}
        </div>

        <span
          className={`heading-3 ${
            isSmallerThanXl
              ? "leading-5 text-start w-full pt-5"
              : "text-start max-w-[95%] lg:translate-x-230 xl:translate-x-230 2xl:translate-x-300 -translate-y-15 whitespace-nowrap"
          }`}
        >
          Розділи розроблені так, щоб ними могли{" "}
          <br className={`${isSmallerThanSm ? "hidden" : "block"}`} />
          користуватись дорослі, діти і колективи
        </span>
      </h2>

      {!isSmallerThanMd && (
        <p className="course-anim opacity-0 pt-30 -translate-y-4 xl:pt-0 heading-bg text-right max-w-[95%] leading-[0.5] text-[clamp(60px,14vw,190px)]">
          Mental health
        </p>
      )}

      <div className="course-anim opacity-0 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex-1 min-w-0 mt-30 sm:mt-30 md:max-w-[60%] md:-translate-y-20">
          <TextSwiper onSwiper={(swiper) => (swiperRef.current = swiper)} />
        </div>

        <div className="flex items-center sm:-translate-y-10 justify-center md:justify-end gap-4 md:max-w-[40%] w-full z-50">
          {!isSmallerThanMd && <ArrowButton onClick={handleNextSlide} />}
          <Link href="/catalog-methodics">
            <TwoFrameButton variant="one" label="ОБРАТИ СВОЮ МЕТОДИКУ" />
          </Link>
        </div>
      </div>

      <Image
        className="
          course-anim opacity-0
          absolute
          top-65 w-80 -right-18
          sm:top-40 sm:-right-10
          md:top-50 md:w-170 md:-right-10
          lg:top-90 lg:w-220 lg:-right-5
          xl:top-55 xl:w-300 xl:-right-10
          2xl:top-60 2xl:w-350 2xl:-right-10
          select-none pointer-events-none z-10
        "
        src={flower_images.COURSE_SLIDER_FLOWER}
        alt="flower"
      />
    </section>
  );
};

export default CourseSlider;
