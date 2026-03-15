"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import MethodCard from "./MethodCard";
import { CategoriesFrThCarouselData } from "@/constant/common/CategoriesFrThCarouselData";

export default function MethodsSwiper() {
  return (
    <section className="w-full max-w-[360px] sm:max-w-[500px] md:max-w-[750px] lg:max-w-[1050px] xl:max-w-[1300px] mx-auto pb-80 md:pb-100 px-4">
      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        breakpoints={{
          480: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          1300: {
            slidesPerView: 2,
            spaceBetween: 12,
          },
          1440: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        }}
      >
        {CategoriesFrThCarouselData.map((item) => (
          <SwiperSlide key={item.id}>
            <MethodCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
