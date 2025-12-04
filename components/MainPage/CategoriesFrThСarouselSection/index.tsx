"use client";

import Link from "next/link";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import { useCarouselLogic } from "./useCarouselLogic";
import ImageSlots from "./ImageSlots";
import TextBlock from "./TextBlock";
import NavigationButtons from "./NavigationButtons";

export default function CategoriesFrThCarousel() {
  const { breakpoint, isSmallerThanSm } = useWindowWidth();

  const {
    layout,
    activeItem,
    setSlot,
    left,
    right,
    center,
    moveLeft,
    moveRight,
    titleRef,
    descRef,
  } = useCarouselLogic(breakpoint);

  return (
    <section className="relative w-full flex flex-col items-center justify-center py-20">
      <h2 className="heading-2 uppercase text-center md:mb-7 mb-5">
        <span className="first-letter">Розділи</span>{" "}
        <span className="whitespace-nowrap">
          методик <span className="first-letter">для</span>{" "}
        </span>{" "}
        <br />
        <span className="first-letter">різних</span>{" "}
        <span className="first-letter">категорій</span>{" "}
        <span className="first-letter">людей</span>
      </h2>

      <p className="heading-3 text-center">
        Унікальні ресурсно-орієнтовані поведінкові методики, практики,
        {!isSmallerThanSm && <br />} техніки, вправи, інструменти та інтервенції
      </p>

      <NavigationButtons moveLeft={moveLeft} moveRight={moveRight} />

      <div className="relative h-[490px] md:h-[500px] lg:h-[600px] flex items-center justify-center">
        <ImageSlots
          layout={layout}
          left={left}
          right={right}
          center={center}
          setSlot={setSlot}
        />

        <TextBlock
          activeItem={activeItem}
          titleRef={titleRef}
          descRef={descRef}
          isSmallerThanSm={isSmallerThanSm}
        />

        <Link
          href="/methods"
          className="
            absolute 
            md:right-[13%] lg:right-[13%] xl:right-[19%]
            top-[97%] md:top-[7%] lg:top-[8%] xl:top-[1%]
            translate-y-1/2
            heading-6 underline
          "
        >
          Переглянути всі методики
        </Link>
      </div>
    </section>
  );
}
