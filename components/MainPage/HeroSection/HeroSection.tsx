import Image from "next/image";

import CheckItem from "../../common/CheckItem";
import CustomSeal from "../../common/CustomSeal";
import FrameWrapper from "../../common/FrameWrapper";

import { flower_images } from "@/public/images/CommonImages/FlowerImages";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import { CheckItems } from "@/constant/MainPageConstant/heroSectionData";

const HeroSection = () => {
  const { isSmallerThanSm, isXlOrLarger } = useWindowWidth();

  return (
    <section className="relative w-full pb-responsive">
      
      <Image
        className={`
          absolute -top-2 -translate-y-6 sm:translate-0 z-10 select-none pointer-events-none
          w-49 rotate-15 sm:rotate-0 md:-left-5 md:rotate-20 md:z-0 lg:z-10 lg:rotate-0 md:-top-10 sm:w-[180px] md:w-[280px] lg:w-[700px] xl:w-[1200px] 2xl:w[1300px]
          -left-3 scale-x-[-1]
          lg:left-auto lg:-right-5 lg:scale-x-100 lg:top-80 xl:top-70
        `}
        src={flower_images.HERO_FLOWER}
        alt="hero-flower"
        priority
        fetchPriority="high"
      />

      <h5 className="heading-5 text-right relative w-screen left-1/2 right-1/2 -translate-x-1/2 px-0">
        Простір, де психологія поєднується з<br />
        креативом, де вправи стають ключем до
        <br />
        самопізнання, а гра — до нових
        <br />
        можливостей.
      </h5>

      <div className="relative mt-6 sm:mt-10">
        <h2 className="heading-2 flex flex-col relative">
          <div className="max-w-full sm:max-w-[85%] mb:max-w-[90%] lg:max-w-[83%] xl:max-w-[76%] sm:text-right text-end">
            <span className="first-letter uppercase" data-first-letter="р">ок-м</span>
          </div>

          {isSmallerThanSm ? (
            <span className="first-letter text-start block relative" data-first-letter="Р">
              <span className="uppercase">есурсно-</span>
              <span
                className="first-letter block text-right uppercase max-w-full"
                data-first-letter="о"
              >
                рієнтовані
              </span>

              <span className="heading-bg absolute right-10 top-61 mt-1">
                Be Unique
              </span>
            </span>
          ) : isXlOrLarger ? (
            <div className="flex items-center gap-4 h-20">
              <span
                className="first-letter whitespace-nowrap uppercase"
                data-first-letter="р"
              >
                есурсно-орієнтовані
              </span>

              <span className="heading-bg translate-y-5 items-center -translate-x-3 whitespace-nowrap text-[144px] sm:text-[clamp(50px,9vw,144px)]">
                Be Unique
              </span>
            </div>
          ) : (
            <span
              className="first-letter whitespace-nowrap uppercase"
              data-first-letter="р"
            >
              есурсно-орієнтовані
            </span>
          )}

          <span className="first-letter md:text-end block uppercase">
            {isSmallerThanSm ? (
              <>
                <span
                  className="first-letter block text-right uppercase max-w-full"
                  data-first-letter="к"
                >
                  огнітивні
                </span>
                <span className="block text-left">
                  <span
                    className="first-letter uppercase"
                    data-first-letter="м"
                  >
                    етодики
                  </span>
                </span>
              </>
            ) : (
              <>
                когнітивні{" "}
                <span className="first-letter uppercase" data-first-letter="м">
                  етодики
                </span>
              </>
            )}
          </span>
        </h2>

        <p className="heading-4 mt-5 mb-8 sm:mt-8">
          Перший в Україні психологічний сайт,
          <br />
          evidence-based онлайн-каталог із понад
          <br />
          1000 технік, вправ, інтервенцій, практик
          <br />
          спрямований на підтримку психічного
          <br />
          здоров’я та всіх сфер особистості.
        </p>

        <div className="flex flex-col md:flex-row md:items-center lg:items-start justify-between gap-12">
          <div className="flex justify-center md:justify-start order-2 md:order-1">
            <CustomSeal label="ПЕРЕГЛЯНУТИ МЕТОДИКИ" />
          </div>

          <div className="flex justify-center items-center md:justify-end lg:items-start order-1 md:order-2">
            <FrameWrapper
              className="heading-6 font-grava opacity-100 w-auto lg:translate-y-[-130px] xl:translate-y-0"
              paddingX={20}
              paddingY={25}
            >
              <CheckItem items={CheckItems} />
            </FrameWrapper>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left mt-16.5 gap-4 md:gap-0">
          <p className="heading-6 opacity-100 font-grava uppercase text-[clamp(14px,1vw,18px)] max-w-[90%] md:max-w-[70%] mx-auto md:mx-0">
            у старослов'янських мовах «рок» — це фатум,
            <br className="hidden sm:block" />
            невідтворна доля, сила, яка визначає хід подій.
          </p>

          <p className="heading-6 opacity-50 text-center sm:text-right sm:opacity-100 font-grava uppercase text-[clamp(14px,1vw,18px)]">
            by bogdana
            <br className="hidden sm:block" />
            .andreyko <br className="block sm:hidden" />
            be unique
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
