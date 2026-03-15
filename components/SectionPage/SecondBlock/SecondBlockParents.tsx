import { second_block_images } from "@/public/images/SectionsPage/SecondBlock";
import { text_block_image } from "@/public/images/SectionsPage/TextImageBlock";
import FrameWrapper from "../../common/FrameWrapper";
import SectionsTextsCustom from "../../common/SectionsTextsCustom";
import TwoFrameButton from "../../common/TwoFrameButton";
import Image from "next/image";
import { flower_images } from "@/public/images/CommonImages/FlowerImages";
import { white_letter } from "@/public/images/CommonImages/PostCard";

const SecondBlockParents = () => {
  return (
    <div className="w-full">
      <h6 className="heading-bg absolute xl:top-141 lg:top-142 hidden lg:block">Be Unique</h6>
      <Image
        src={flower_images.SECTION_PAGE_FLOWER}
        alt={"flower"}
        className="absolute right-0 lg:bottom-[35%] xl:bottom-[27%] bottom-[50%] z-100 max-w-[1440px] w-[458px] lg:w-[1040px] xl:w-[1440px] md:w-[700px] md:bottom-[48%]"
      />
      <Image
        src={white_letter.WHITE_POSTCARD}
        alt="letter"
        className="absolute top-30 -right-30 w-[25%] lg:w-[20%] lg:-right-15 -rotate-15 hidden lg:block"
      />
      <div className="flex flex-col gap-6 lg:hidden lg:items-start">
        <FrameWrapper
          src={second_block_images.MAIN_PARENTS}
          paddingX={20}
          paddingY={35}
          className="w-fit mx-auto"
        />

        <SectionsTextsCustom
          title="Основні переваги :"
          listEffect={[
            "Покращення дитячо-батьківських стосунків.",
            "Формування навичок ефективного сімейного спілкування.",
            "Зміцнення емоційного зв’язку між дітьми та дорослими.",
            "Зниження конфліктності у сім’ї.",
            "Розвиток усвідомленого підходу до виховання.",
          ]}
        />

        <div className="flex flex-col gap-3">
          <SectionsTextsCustom
            title="Рекомендації :"
            listmakinside={[
              "Виконувати завдання регулярно у сімейному колі.",
              "Залучати дитину до процесу як рівноправного учасника.",
              "Поєднувати вправи з елементами гри для кращого результату.",
              "Обговорювати досвід після виконання вправ, зміцнюючи сімейний діалог.",
            ]}
          />
        </div>
      </div>

      <div className="hidden lg:flex flex-row">
        <div className="flex flex-col w-1/1">
          <div className="flex flex-row lg:pb-20 pb-0 w-full gap-40">
            <SectionsTextsCustom
              className="w-[35%]"
              title="Основні переваги :"
              list={[
                "Покращення дитячо-батьківських стосунків.",
                "Формування навичок ефективного сімейного спілкування.",
                "Зміцнення емоційного зв’язку між дітьми та дорослими.",
                "Зниження конфліктності у сім’ї.",
                "Розвиток усвідомленого підходу до виховання.",
              ]}
            />
            <FrameWrapper
              src={second_block_images.SUB_PARENTS}
              showOrnaments
              paddingX={15}
              paddingY={15}
              className="h-fit"
            />
          </div>

          <div className="flex flex-row items-end gap-10">
            <TwoFrameButton variant="one" label="Спробувати зараз" />
            <div className="flex flex-col gap-5">
              <SectionsTextsCustom
                className="lg:w-[65%] w-full"
                title="Рекомендації :"
                listmakinside={[
                  "Виконувати завдання регулярно у сімейному колі.",
                  "Залучати дитину до процесу як рівноправного учасника.",
                  "Поєднувати вправи з елементами гри для кращого результату.",
                  "Обговорювати досвід після виконання вправ, зміцнюючи сімейний діалог.",
                ]}
              />
            </div>
          </div>
        </div>

        <div className="w-[40%] flex justify-end relative">
          <FrameWrapper
            src={second_block_images.MAIN_PARENTS}
            paddingX={20}
            paddingY={35}
            imgWidth={230}
            className="h-fit"
          />
          <Image
            src={text_block_image.ABSIGN}
            alt={"sign"}
            className="absolute right-0 -top-15"
          />
          <h5 className="heading-5 absolute w-[75%] right-[50%] text-right">
            Усвідомлені батьки не ліплять дитину — вони допомагають їй
            розквітнути.
          </h5>
        </div>
      </div>
    </div>
  );
};

export default SecondBlockParents;
