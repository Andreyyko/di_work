import Image from "next/image";
import CheckItem from "../common/CheckItem";
import CustomSeal from "../common/CustomSeal";
import FrameWrapper from "../common/FrameWrapper";
import { flower_images } from "@/public/images/FlowerImages";

const HeroSection = () => {
  return (
    <section className="">
      <h5 className="heading-5 text-right">
        Простір, де психологія поєднується з<br />
        креативом, де вправи стають ключем до<br />
        самопізнання, а гра — до нових<br />
        можливостей.
      </h5>

      <div className="p-2">
        <h2 className="heading-2 flex flex-col relative">
          <span className="first-letter-hero text-end w-[180px] sm:w-[500px] md:w-[800px] lg:w-[1060px]">
            РОК-М
          </span>

          <span className="first-letter-hero text-start">
            РЕСУРСНО-ОРІЄНТОВАНІ
          </span>

          <span className="first-letter-hero text-end">
            КОГНІТИВНІ <span className="first-letter-hero">МЕТОДИКИ</span>
          </span>

          <p className="heading-bg absolute bottom-10 right-0 translate-x-2">Be Unique</p>
        </h2>

        <h4 className="heading-4 mb-8">
          Перший в Україні психологічний сайт,<br />
          evidence-based онлайн-каталог із понад<br />
          1000 технік, вправ, інтервенцій, практик<br />
          спрямований на підтримку психічного<br />
          здоров’я та всіх сфер особистості.
        </h4>
          <Image 
          className="absolute right-0 top-60"
          src={flower_images.HERO_FLOWER} 
          alt={"hero-frower"}/>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <CustomSeal label="ПЕРЕГЛЯНУТИ МЕТОДИКИ" />

          <FrameWrapper
            className="heading-6 font-grava opacity-100 -mt-[30px] md:mt-0"
            paddingX={20}
            paddingY={30}
          >
            <CheckItem>20 років психотерапевтичної практики</CheckItem>
            <CheckItem>Авторські методики</CheckItem>
            <CheckItem>Наукова апробація (PhD)</CheckItem>
            <CheckItem>Структуровані інструкції</CheckItem>
            <CheckItem>Наукова достовірність, бібліографія</CheckItem>
          </FrameWrapper>
        </div>

        <div className="flex justify-between mt-20">
          <h6 className="heading-6 opacity-100 font-grava text-[16px]">
            У СТАРОСЛОВʼЯНСЬКИХ МОВАХ «РОК» — ЦЕ ФАТУМ,<br/>
            НЕВІДВОРОТНА ДОЛЯ, СИЛА, ЯКА ВИЗНАЧАЄ ХІД ПОДІЙ.
          </h6>
          <h6 className="heading-6 opacity-100 font-grava text-[16px]">
            BY BOGDANA<br/>.ANDREYKO BE UNIQUE
          </h6>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
