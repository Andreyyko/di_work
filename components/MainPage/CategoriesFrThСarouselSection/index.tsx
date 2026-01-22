"use client";

import Link from "next/link";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import { useCarouselLogic } from "./useCarouselLogic";
import ImageSlots from "./ImageSlots";
import TextBlock from "./TextBlock";
import NavigationButtons from "./NavigationButtons";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

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

  const sectionRef = useRef<HTMLElement | null>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldAnimate(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0,
        rootMargin: "200px 0px -10% 0px",
      }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (!shouldAnimate) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".carousel-anim");

      gsap.to(items, {
        opacity: 1,
        yPercent: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldAnimate]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full flex flex-col items-center justify-center pb-responsive"
    >
      <h2 className="carousel-anim opacity-0 translate-y-[18%] heading-2 uppercase text-center md:mb-7 mb-5">
        <span className="first-letter">Розділи</span>{" "}
        <span className="whitespace-nowrap">
          методик <span className="first-letter">для</span>{" "}
        </span>{" "}
        <br />
        <span className="first-letter">різних</span>{" "}
        <span className="first-letter">категорій</span>{" "}
        <span className="first-letter">людей</span>
      </h2>

      <p className="carousel-anim opacity-0 translate-y-[18%] py-4 heading-3 text-center">
        Унікальні ресурсно-орієнтовані поведінкові методики, практики,
        {!isSmallerThanSm && <br />} техніки, вправи, інструменти та інтервенції
      </p>

      <div>
        <NavigationButtons moveLeft={moveLeft} moveRight={moveRight} />
      </div>

      <div className="carousel-anim opacity-0 relative h-[490px] md:h-[500px] lg:h-[600px] 2xl:h-[850px] flex items-center justify-center">
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
          href="/catalog-methodics"
          className="
            opacity-40 translate-y-[18%]
            absolute 
            md:right-[13%] lg:right-[13%] xl:right-[19%] 2xl:right-[25%]
            top-[93%] md:top-[7%] lg:top-[8%] xl:top-[1%] 2xl:top-[10%]
            heading-6 underline
          "
        >
          Переглянути всі методики
        </Link>
      </div>
    </section>
  );
}
