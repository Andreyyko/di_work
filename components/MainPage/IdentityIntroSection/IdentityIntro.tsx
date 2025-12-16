"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

import { IdentityIntroImages } from "@/public/images/MainPageImages/IdentityIntroImages";
import FrameWrapper from "../../common/FrameWrapper";
import { useWindowWidth } from "@/hooks/useWindowWidth";

const IdentityIntro: React.FC = () => {
  const { width } = useWindowWidth();
  const showImage = width !== null && width >= 640;

  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".identity-item");

      gsap.set(items, { opacity: 0, yPercent: 20 });

      gsap.to(items, {
        opacity: 1,
        yPercent: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full pb-6 flex flex-col">
      <div className="text-left sm:whitespace-nowrap">
        <h2 className="identity-item heading-2 uppercase tracking-[-4px] sm:tracking-[-0.01em]">
          <span className="first-letter uppercase">перший</span> в україні <br />
        </h2>

        <div className="identity-item flex flex-row items-center justify-between max-w-[95%]">
          {showImage && (
            <div className="flex items-center justify-center w-[450px]">
              <FrameWrapper
                src={IdentityIntroImages.OpenBookImages}
                alt="open book"
              />
            </div>
          )}

          <p className="heading-2 text-center sm:text-left sm:whitespace-nowrap">
            <span className="sm:ml-5 xl:ml-0 inline-block uppercase tracking-[-4px] sm:tracking-[-0.01em]">
              психологічний
            </span>
            <br />
            <span className="inline-block uppercase tracking-[-4px] sm:tracking-[-8px]">
              <span className="first-letter uppercase">сайт</span>,{" "}
              <span className="sm:hidden">ЩО</span>
              <span className="hidden sm:inline">ЩО ПОЄДНУЄ РІЗНІ</span>
            </span>

            <span className="sm:hidden ">
              <br />
              <span className="first-letter tracking-[-4px]" data-first-letter="П">ОЄДНУЄ</span>
            </span>
          </p>
        </div>

        <p className="identity-item heading-2 whitespace-nowrap uppercase tracking-[-4px] sm:tracking-[-0.01em]">
          <span className="sm:hidden">РІЗНІ </span>напрямки{" "}
          <span className="sm:hidden block" /> доказової
        </p>

        <div className="identity-item flex flex-row items-center w-full justify-end xl:gap-32 md:gap-20 gap-10">
          <p className="hidden sm:block heading-3 whitespace-nowrap">
            Ресурсно-орієнтований <br />
            когнітивно проведінковий
          </p>

          <p className="heading-2 whitespace-nowrap uppercase tracking-[-4px] sm:tracking-[-0.01em]">
            <span className="first-letter">психотерапії</span>,
            <br /> спрямований
          </p>
        </div>

        <p className="identity-item heading-2 sm:whitespace-nowrap uppercase tracking-[-4px] sm:tracking-[-0.01em]">
          <span className="sm:first-letter">нa</span> підтримку психічного
        </p>

        <p className="identity-item heading-2 text-right w-[92%] sm:whitespace-nowrap uppercase tracking-[-4px] sm:tracking-[-0.01em]">
          <span className="first-letter">здоров'я</span> та{" "}
          <span className="sm:first-letter">всіх</span> сфер
        </p>

        <div className="identity-item flex flex-row items-center justify-between">
          <p className="heading-2 sm:whitespace-nowrap uppercase tracking-[-4px] sm:tracking-[-0.01em]">
            особистості
          </p>

          <p className="hidden sm:block heading-bg sm:whitespace-nowrap">
            by Bo<span className="mr-1">g</span>
            <span>d</span>ana A<span className="mr-1">n</span>
            <span>d</span>reyko
          </p>
        </div>

        <p className="identity-item heading-3 whitespace-nowrap mt-5 sm:hidden">
          Ресурсно-орієнтований <br />
          когнітивно проведінковий
        </p>
      </div>
    </section>
  );
};

export default IdentityIntro;
