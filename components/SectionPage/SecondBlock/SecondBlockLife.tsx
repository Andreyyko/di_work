import { second_block_images } from "@/public/images/SectionsPage/SecondBlock";
import FrameWrapper from "../../common/FrameWrapper";
import TwoFrameButton from "../../common/TwoFrameButton";
import SectionsTextsCustom from "../../common/SectionsTextsCustom";
import { text_block_image } from "@/public/images/SectionsPage/TextImageBlock";
import Image from "next/image";
import { flower_images } from "@/public/images/CommonImages/FlowerImages";

const SecondBlockLife = () => {
  return (
    <div className="w-full">
      <h6 className="heading-bg absolute top-100 hidden lg:block lg:left-20 xl:left-60">Be Unique</h6>
      <Image
        src={flower_images.SECTION_PAGE_FLOWER}
        alt={"flower"}
        className="absolute right-0 lg:bottom-[35%] xl:bottom-[29%] bottom-[48%] z-100 max-w-[1440px] w-[458px] lg:w-[1040px] xl:w-[1440px] md:w-[700px] md:bottom-[43%]"
      />
      <h5 className="absolute heading-5 top-55 right-0 w-90 text-right hidden lg:block">
        Ресурси живуть у спокої, у русі, у диханні. Тут ти навчишся їх помічати,
        живити себе енергією життя і відчувати власну унікальність.
      </h5>
      <div className="flex flex-col gap-6 lg:hidden items-center lg:items-start">
        <FrameWrapper
          src={second_block_images.MAIN_LIFE}
          paddingX={20}
          paddingY={35}
          className="w-fit"
        />

        <SectionsTextsCustom
          title="Основні переваги :"
          listEffect={[
            "Поглиблене самопізнання та усвідомлення власних можливостей.",
            "Відновлення внутрішніх сил і підвищення життєстійкості.",
            "Пошук нових шляхів досягнення цілей і гармонії в особистому житті.",
          ]}
        />

        <div className="flex flex-col gap-3">
          <h3 className="heading-3 uppercase">Рекомендації :</h3>
          <h4 className="heading-4">
            Регулярне виконання вправ і технік дозволяє поступово розвивати
            внутрішній потенціал, формувати навички стресостійкості та
            відкривати нові можливості для особистісного зростання.
          </h4>
        </div>

        <TwoFrameButton variant="one" label="Спробувати зараз" />
      </div>

      <div className="hidden lg:flex flex-row w-full">
        <div className="flex flex-col w-[70%] gap-10">
          <div className="flex flex-row gap-10 lg:pb-20 pb-0">
            <SectionsTextsCustom
              title="Основні переваги :"
              listEffect={[
                "Поглиблене самопізнання та усвідомлення власних можливостей.",
                "Відновлення внутрішніх сил і підвищення життєстійкості.",
                "Пошук нових шляхів досягнення цілей і гармонії в особистому житті.",
              ]}
            />
            <FrameWrapper
              src={second_block_images.SUB_LIFE}
              showOrnaments
              paddingX={15}
              paddingY={15}
              className="h-fit"
            />
          </div>

          <div className="flex flex-row items-end gap-10">
            <TwoFrameButton variant="one" label="Спробувати зараз" />
            <div className="flex flex-col gap-5">
              <h3 className="heading-3 uppercase">Рекомендації :</h3>
              <h4 className="heading-4">
                Регулярне виконання вправ і технік дозволяє поступово розвивати
                внутрній потенціал, формувати навички стресостійкості та
                відкривати нові можливості для особистісного зростання.
              </h4>
            </div>
          </div>
        </div>

        <div className="w-[50%] flex justify-end relative">
          <FrameWrapper
            src={second_block_images.MAIN_LIFE}
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
            Мотивація не приходить — <br />
            її відкривають усередині.
            <br />
            Цей розділ — про силу, що народжується
            <br /> з усвідомлення, прийняття
            <br />
            та любові до себе.
          </h5>
        </div>
      </div>
    </div>
  );
};

export default SecondBlockLife;
