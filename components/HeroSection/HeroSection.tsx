import Image from "next/image";
import CheckItem from "../common/CheckItem";
import CustomSeal from "../common/CustomSeal";
import FrameWrapper from "../common/FrameWrapper";
import { flower_images } from "@/public/images/FlowerImages";
import { useWindowWidth } from "@/hooks/useWindowWidth";

const HeroSection = () => {
  const { isSmallerThanSm } = useWindowWidth();

  return (
    <section className="relative w-full">
      <h5 className="heading-5 text-right relative w-screen left-1/2 right-1/2 -translate-x-1/2 px-0">
        Простір, де психологія поєднується з<br />
        креативом, де вправи стають ключем до<br />
        самопізнання, а гра — до нових<br />
        можливостей.
      </h5>

      <Image
        className={`
          absolute top-0 z-10 select-none pointer-events-none
          w-40 sm:w-[420px] md:w-[220px] lg:w-[700px] xl:w-[1180px]
          -left-5 scale-x-[-1]
          lg:left-auto lg:-right-5 lg:scale-x-100 lg:top-90
        `}
        src={flower_images.HERO_FLOWER}
        alt="hero-flower"
        priority
      />

      <div className="relative mt-6 sm:mt-10">
        <h2 className="heading-2 flex flex-col relative">
          <div className="lg:max-w-[76%] sm:max-w-[90%] sm:text-right text-end">
            <span className="first-letter-hero">РОК-М</span>
          </div>

          {isSmallerThanSm ? (
            <span className="first-letter-hero text-start block">
              РЕСУРСНО-
              <span className="first-letter-hero">ОРІЄНТОВАНІ</span>
            </span>
          ) : (
            <span className="first-letter-hero text-start block">
              РЕСУРСНО-ОРІЄНТОВАНІ
            </span>
          )}

          <span className="first-letter-hero text-center md:text-end">
            КОГНІТИВНІ <span className="first-letter-hero">МЕТОДИКИ</span>
          </span>

          <p
            className={`
              heading-bg absolute right-0 font-alexandra
              bottom-20 lg:bottom-10
              top-115 md:top-70 lg:top-auto
            `}
          >
            Be Unique
          </p>
        </h2>

        <h4 className="heading-4 mb-8 mt-8">
          Перший в Україні психологічний сайт,<br />
          evidence-based онлайн-каталог із понад<br />
          1000 технік, вправ, інтервенцій, практик<br />
          спрямований на підтримку психічного<br />
          здоров’я та всіх сфер особистості.
        </h4>

        <div className="flex flex-col md:flex-row md:items-center lg:items-start justify-between gap-12">
          <div className="flex justify-center md:justify-start">
            <CustomSeal label="ПЕРЕГЛЯНУТИ МЕТОДИКИ" />
          </div>

          <div className="flex justify-center items-center md:justify-end lg:items-start">
            <FrameWrapper
              className="
                heading-6 font-grava opacity-100
                md:w-[420px] lg:w-[480px] xl:w-[540px] 2xl:w-[600px]
                lg:translate-y-[-130px] xl:translate-y-0
              "
              paddingX={24}
              paddingY={36}
            >
              <CheckItem>20 років психотерапевтичної практики</CheckItem>
              <CheckItem>Авторські методики</CheckItem>
              <CheckItem>Наукова апробація (PhD)</CheckItem>
              <CheckItem>Структуровані інструкції</CheckItem>
              <CheckItem>Наукова достовірність, бібліографія</CheckItem>
            </FrameWrapper>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left mt-20 gap-4 md:gap-0">
          <h6 className="heading-6 opacity-100 font-grava text-[clamp(14px,1vw,18px)] max-w-[90%] md:max-w-[70%] mx-auto md:mx-0">
            У СТАРОСЛОВʼЯНСЬКИХ МОВАХ «РОК» — ЦЕ ФАТУМ,<br />
            НЕВІДВОРОТНА ДОЛЯ, СИЛА, ЯКА ВИЗНАЧАЄ ХІД ПОДІЙ.
          </h6>

          <h6 className="heading-6 opacity-100 font-grava text-[clamp(14px,1vw,18px)]">
            BY BOGDANA<br />.ANDREYKO BE UNIQUE
          </h6>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
