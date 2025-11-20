import React from "react";

import { IdentityIntroImages } from "@/public/images/MainPageImages/IdentityIntroImages";

import FrameWrapper from "../../common/FrameWrapper";
import { useWindowWidth } from "@/hooks/useWindowWidth";

const IdentityIntro: React.FC = () => {
  const { width, isSmallerThanSm } = useWindowWidth();

  const showImage = width !== null && width >= 1280;

  return (
    <section className="w-full bg-brand-background pb-6 flex flex-col">
      <div className="text-left sm:whitespace-nowrap">
        <h2 className="heading-2 uppercase tracking-[-4px] sm:tracking-[-0.01em]">
          <span className="first-letter uppercase">перший</span> в україні{" "}
          <br />
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

          <p className="heading-2  text-center sm:text-left sm:whitespace-nowrap">
            <span className="sm:ml-5 xl:ml-0 inline-block uppercase tracking-[-4px] sm:tracking-[-0.01em]">
              психологічний
            </span>
            <br />
            <span className="inline-block uppercase tracking-[-4px] sm:tracking-[-0.01em]">
              <span className="first-letter uppercase">сайт</span>,{" "}
              {isSmallerThanSm && "ЩО"}
              {!isSmallerThanSm && "ЩО ПОЄДНУЄ РІЗНІ"}
            </span>
            {isSmallerThanSm && (
              <>
                <br />
                <span className="tracking-[-4px] sm:tracking-[-0.01em]">ПОЄДНУЄ</span>
              </>
            )}
          </p>
        </div>

        <p className="heading-2 whitespace-nowrap uppercase tracking-[-4px] sm:tracking-[-0.01em]">
          {isSmallerThanSm && "РІЗНІ"} напрямки {isSmallerThanSm && <br />}
          доказової
        </p>

        <div className="flex flex-row items-center w-full justify-end xl:gap-32 md:gap-20 gap-10">
          {!isSmallerThanSm && (
            <p className="heading-3 whitespace-nowrap">
              Ресурсно-орієнтований <br />
              когнітивно проведінковий
            </p>
          )}
          <p className="heading-2 whitespace-nowrap uppercase tracking-[-4px] sm:tracking-[-0.01em]">
            <span className="first-letter">психотерапії</span>,
            <br /> спрямований
          </p>
        </div>

        <p className="heading-2 sm:whitespace-nowrap uppercase tracking-[-4px] sm:tracking-[-0.01em]">
          <span className="sm:first-letter">нa</span> підтримку психічного
        </p>

        <p className="heading-2 text-right w-[92%] sm:whitespace-nowrap uppercase tracking-[-4px] sm:tracking-[-0.01em]">
          <span className="first-letter">здоров'я</span> та{" "}
          <span className={`${!isSmallerThanSm ? "" : "first-letter"}`}>всіх</span>
          сфер
        </p>

        <div className="flex flex-row items-center justify-between ">
          <p className="heading-2 sm:whitespace-nowrap uppercase tracking-[-4px] sm:tracking-[-0.01em]">
            особистості
          </p>

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
