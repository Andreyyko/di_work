import { second_block_images } from "@/public/images/SectionsPage/SecondBlock";
import FrameWrapper from "../../common/FrameWrapper";
import SectionsTextsCustom from "../../common/SectionsTextsCustom";
import TwoFrameButton from "../../common/TwoFrameButton";
import { text_block_image } from "@/public/images/SectionsPage/TextImageBlock";
import Image from "next/image";
import { flower_images } from "@/public/images/CommonImages/FlowerImages";
import { white_letter } from "@/public/images/CommonImages/PostCard";

const SecondBlockKids = () => {
  return (
    <div className="w-full">
      <h6 className="heading-bg absolute lg:top-140 xl:top-145 hidden lg:block">Be Unique</h6>
      <Image
        src={flower_images.SECTION_PAGE_FLOWER}
        alt={"flower"}
        className="absolute right-0 lg:bottom-[35%] xl:bottom-[25%] bottom-[50%] z-100 max-w-[1440px] w-[458px] lg:w-[1040px] xl:w-[1440px] md:w-[700px] md:bottom-[45%]"
      />
      <Image
        src={white_letter.WHITE_POSTCARD}
        alt="letter"
        className="absolute top-55 -left-20 w-[20%] rotate-15 hidden lg:block"
      />
      <div className="flex flex-col gap-6 lg:hidden lg:items-start">
        <FrameWrapper
          src={second_block_images.MAIN_KIDS}
          paddingX={20}
          paddingY={35}
          className="w-fit mx-auto"
        />

        <SectionsTextsCustom
          title="Основні переваги :"
          listEffect={[
            "Розвиток творчих здібностей і креативності.",
            "Підвищення концентрації уваги, покращення пам’яті та мислення.",
            "Розвиток уяви як основи творчої діяльності.",
            "Формування здатності знаходити нові рішення та підходи до завдань.",
            "Створення позитивного досвіду творчої активності.",
          ]}
        />

        <div className="flex flex-col gap-3">
          <SectionsTextsCustom
            title="Рекомендації :"
            listmakinside={[
              "Регулярність занять: систематичне виконання вправ підсилює результат.",
              "Підтримка дорослих: важливо заохочувати дитину проявляти власні ідеї та творчі підходи.",
              "Використання ігор у різних умовах — вдома, у школі, на гуртках.",
              "Застосування технік у навчанні для підвищення інтересу та результативності.",
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
                "Розвиток творчих здібностей і креативності.",
                "Підвищення концентрації уваги, покращення пам’яті та мислення.",
                "Розвиток уяви як основи творчої діяльності.",
                "Формування здатності знаходити нові рішення та підходи до завдань.",
                "Створення позитивного досвіду творчої активності.",
              ]}
            />
            <FrameWrapper
              src={second_block_images.SUB_KIDS}
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
                title="Рекомендації :"
                listmakinside={[
                  "Регулярність занять: систематичне виконання вправ підсилює результат.",
                  "Підтримка дорослих: важливо заохочувати дитину проявляти власні ідеї та творчі підходи.",
                  "Використання ігор у різних умовах — вдома, у школі, на гуртках.",
                  "Застосування технік у навчанні для підвищення інтересу та результативності.",
                ]}
              />
            </div>
          </div>
        </div>

        <div className="w-[40%] flex justify-end relative">
          <FrameWrapper
            src={second_block_images.MAIN_KIDS}
            paddingX={20}
            paddingY={35}
            className=""
          />
          <Image
            src={text_block_image.ABSIGN}
            alt={"sign"}
            className="absolute right-0 -top-15"
          />
          <h5 className="heading-5 absolute w-[65%] right-[50%] text-right">
            Тут фантазія оживає в кольорах і рухах, а кожне завдання
            перетворюється на пригоду. Дитина творить, відчуває, мріє — і росте
            разом зі своєю уявою.
          </h5>
        </div>
      </div>
    </div>
  );
};

export default SecondBlockKids;
