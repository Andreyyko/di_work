import React from "react";

import { IdentityIntroImages } from "@/public/images/IdentityIntroImages";

import FrameWrapper from "../common/FrameWrapper";
import { useWindowWidth } from "@/hooks/useWindowWidth";

const IdentityIntro: React.FC = () => {
  const { width, isSmallerThanSm } = useWindowWidth();

  const showImage = width !== null && width >= 1280;

  return (
    <section className="w-full bg-brand-background pb-12 flex flex-col">
      <div className="text-left sm:whitespace-nowrap">
        <h2 className="heading-2">
          <span className="first-letter-hero">П</span>
          ЕРШИЙ В УКРАЇНІ <br />
        </h2>

        <div className="flex flex-row items-center justify-between max-w-[95%]">
          {showImage && (
            <div className="flex items-center justify-center">
              <FrameWrapper
                src={IdentityIntroImages.OpenBookImages}
                alt="open book"
              />
            </div>
          )}

          <p className="heading-2 sm:leading-16 text-center sm:text-left sm:whitespace-nowrap">
            <span className="sm:ml-5 xl:ml-0 inline-block">ПСИХОЛОГІЧНИЙ</span>
            <br />
            <span className="inline-block">
              <span className="first-letter-hero">С</span>АЙТ,{" "}
              {isSmallerThanSm && "ЩО"}
              {!isSmallerThanSm && "ЩО ПОЄДНУЄ РІЗНІ"}
            </span>
            {isSmallerThanSm && (
              <>
                <br />
                ПОЄДНУЄ
              </>
            )}
          </p>
        </div>

        <p className="heading-2 whitespace-nowrap">
          {isSmallerThanSm && "РІЗНІ"} НАПРЯМКИ {isSmallerThanSm && <br />}
          ДОКАЗОВОЇ
        </p>

        <div className="flex flex-row items-center w-full justify-end xl:gap-32 md:gap-20 gap-10">
          {!isSmallerThanSm && (
            <p className="heading-3 whitespace-nowrap">
              Ресурсно-орієнтований <br />
              когнітивно проведінковий
            </p>
          )}
          <p className="heading-2 whitespace-nowrap">
            <span className="first-letter-hero">П</span>СИХОТЕРАПІЇ,
            <br /> СПРЯМОВАНИЙ
          </p>
        </div>

        <p className="heading-2 sm:whitespace-nowrap">
          <span className="sm:first-letter-hero">Н</span>А ПІДТРИМКУ ПСИХІЧНОГО
        </p>

        <p className="heading-2 text-right w-[92%] sm:whitespace-nowrap">
          <span className="first-letter-hero">З</span>ДОРОВ’Я ТА ВСІХ СФЕР
        </p>

        <div className="flex flex-row items-center justify-between">
          <p className="heading-2 sm:whitespace-nowrap">ОСОБИСТОСТІ</p>

          {!isSmallerThanSm && (
            <p className="heading-bg sm:whitespace-nowrap">
              by Bo<span className="mr-1">g</span>
              <span>d</span>ana A<span className="mr-1">n</span>
              <span>d</span>reyko
            </p>
          )}
        </div>
        {isSmallerThanSm && (
          <p className="heading-3 whitespace-nowrap mt-5">
            Ресурсно-орієнтований <br />
            когнітивно проведінковий
          </p>
        )}
      </div>
    </section>
  );
};

export default IdentityIntro;
