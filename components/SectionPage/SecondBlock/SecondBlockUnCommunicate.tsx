"use client";

import { second_block_images } from "@/public/images/SectionsPage/SecondBlock";
import { text_block_image } from "@/public/images/SectionsPage/TextImageBlock";
import FrameWrapper from "../../common/FrameWrapper";
import SectionsTextsCustom from "../../common/SectionsTextsCustom";
import TwoFrameButton from "../../common/TwoFrameButton";
import Image from "next/image";
import { flower_images } from "@/public/images/CommonImages/FlowerImages";
import { white_letter } from "@/public/images/CommonImages/PostCard";
import { useState, useEffect } from "react";

const SecondBlockUnCommunicate = () => {
  const [isWide, setIsWide] = useState(false);

  useEffect(() => {
    const checkWidth = () => setIsWide(window.innerWidth > 1433);
    checkWidth();

    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  return (
    <div className="w-full">
      <h6 className="heading-bg absolute top-100 hidden lg:block lg:top-105 xl:left-60 lg:left-20">
        Be Unique
      </h6>
      <Image
        src={flower_images.SECTION_PAGE_FLOWER}
        alt={"flower"}
        className="absolute right-0 lg:bottom-[35%] xl:bottom-[26.5%] bottom-[46%] z-100 max-w-[1440px] w-[458px] lg:w-[1040px] xl:w-[1440px] md:w-[700px] md:bottom-[40%]"
      />
      <Image
        src={white_letter.WHITE_POSTCARD}
        alt="letter"
        className="absolute hidden lg:block"
        style={{
          top: isWide ? "720px" : "810px",
          right: isWide ? "290px" : "290px",
          width: isWide ? "25%" : "27%",
          transform: isWide ? "rotate(-15deg)" : "rotate(-15deg)",
        }}
      />
      <h5 className="absolute heading-5 lg:top-[10%] xl:top-[8.5%] -right-5 w-70 text-right hidden lg:block">
        Говорити — це не лише вимовляти звуки, а відчувати, що тебе чують.
      </h5>
      <div className="flex flex-col gap-6 lg:hidden lg:items-start">
        <FrameWrapper
          src={second_block_images.MAIN_UNCOMMUNICATE}
          paddingX={20}
          paddingY={35}
          className="w-fit mx-auto"
        />

        <SectionsTextsCustom
          title="Основні переваги :"
          listEffect={[
            "Розвиток мовленнєвих та комунікативних компетенцій.",
            "Зниження бар’єрів у соціальній взаємодії.",
            "Підвищення впевненості у власних мовленнєвих можливостях.",
            "Розвиток альтернативних способів комунікації (жести, міміка, символи).",
            "Формування позитивного досвіду спілкування.",
          ]}
        />

        <div className="flex flex-col gap-3">
          <SectionsTextsCustom
            title="Рекомендації :"
            listmakinside={[
              "Виконувати вправи поступово та систематично.",
              "Поєднувати індивідуальні та групові форми роботи.",
              "Використовувати ігрові елементи для підвищення мотивації.",
              "За потреби — поєднувати із супроводом логопеда чи дефектолога.",
            ]}
          />
        </div>
      </div>

      <div className="hidden lg:flex flex-row w-full">
        <div className="flex flex-col w-[60%] ">
          <div className="flex flex-row lg:pb-20 pb-0">
            <SectionsTextsCustom
              title="Основні переваги :"
              listEffect={[
                "Розвиток мовленнєвих та комунікативних компетенцій.",
                "Зниження бар’єрів у соціальній взаємодії.",
                "Підвищення впевненості у власних мовленнєвих можливостях.",
                "Розвиток альтернативних способів комунікації (жести, міміка, символи).",
                "Формування позитивного досвіду спілкування.",
              ]}
            />
          </div>

          <div className="flex flex-row items-end gap-10">
            <TwoFrameButton variant="one" label="Спробувати зараз" />
            <div className="flex flex-col gap-5">
              <SectionsTextsCustom
                title="Рекомендації :"
                listmakinside={[
                  "Виконувати вправи поступово та систематично.",
                  "Поєднувати індивідуальні та групові форми роботи.",
                  "Використовувати ігрові елементи для підвищення мотивації.",
                  "За потреби — поєднувати із супроводом логопеда чи дефектолога.",
                ]}
              />
            </div>
          </div>
        </div>

        <div className="w-[40%] flex justify-end relative">
          <FrameWrapper
            src={second_block_images.MAIN_UNCOMMUNICATE}
            paddingX={20}
            paddingY={35}
            className=""
          />
          <Image
            src={text_block_image.ABSIGN}
            alt={"sign"}
            className="absolute right-0 -top-15"
          />
          <h5 className="heading-5 absolute w-[45%] right-[55%] text-right">
            Іноді мовчання говорить більше, ніж голос, якщо у ньому — розуміння.
          </h5>
        </div>
      </div>
    </div>
  );
};

export default SecondBlockUnCommunicate;
