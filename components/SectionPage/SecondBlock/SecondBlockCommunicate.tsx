import { second_block_images } from "@/public/images/SectionsPage/SecondBlock";
import FrameWrapper from "../../common/FrameWrapper";
import SectionsTextsCustom from "../../common/SectionsTextsCustom";
import Image from "next/image";
import { text_block_image } from "@/public/images/SectionsPage/TextImageBlock";
import { flower_images } from "@/public/images/CommonImages/FlowerImages";

const SecondBlockCommunicate = () => {
  return (
    <div className="w-full relative">
      <h6 className="heading-bg absolute lg:-top-[338%] lg:right-6 xl:-top-[345%] right-10 hidden lg:block">
        Be Unique
      </h6>
      <Image
        src={flower_images.SECTION_PAGE_FLOWER}
        alt={"flower"}
        className="absolute right-0 lg:-bottom-30 xl:-bottom-[50%] translate-x-5 bottom-[95%] z-100 max-w-[1440px] w-[458px] lg:w-[1040px] xl:w-[1400px] md:w-[700px] md:bottom-[72%]"
      />
      <h5 className="absolute heading-5 lg:-top-[430%] xl:-top-[370%] -right-5 w-90 text-right hidden lg:block">
        Творчість дитини — це не просто гра, це спосіб пізнати себе, висловити
        почуття, віднайти власний голос і навчитися бачити красу у звичайному.
      </h5>
      <div className="flex flex-col gap-10 lg:hidden">
        <FrameWrapper
          src={second_block_images.MAIN_COMMUNICATE}
          paddingX={20}
          paddingY={30}
          className="w-fit mx-auto"
        />

        <SectionsTextsCustom
          title="Основні переваги :"
          list={[
            "Розвиток навичок ефективного спілкування.",
            "Поліпшення психологічного клімату в групі чи колективі.",
            "Підвищення рівня самооцінки та впевненості у власних діях.",
            "Формування емпатії та здатності розуміти інших.",
            "Зменшення конфліктних ситуацій та розвиток навичок мирного вирішення суперечок.",
          ]}
        />

        <SectionsTextsCustom
          title="Рекомендації :"
          list={[
            "Виконувати вправи регулярно для закріплення нових навичок.",
            "Практикувати техніки як у групах, так і в індивідуальному спілкуванні.",
            "Поступово ускладнювати завдання для розвитку впевненості у різних ситуаціях.",
            "Використовувати у школі, колективі, родині чи професійному середовищі.",
          ]}
        />

        <SectionsTextsCustom
          title="Характеристики психічного здоров’я:"
          listmakinside={[
            "Здатність до саморегуляції та подолання стресу.",
            "Емоційна стабільність і врівноваженість.",
            "Розвинена увага, пам’ять та мислення.",
            "Здатність до емпатії та побудови гармонійних стосунків.",
            "Адекватна самооцінка та впевненість у власних діях.",
            "Адаптивність до змін і нових життєвих обставин.",
          ]}
        />
      </div>

      <div className="hidden lg:flex flex-row w-full justify-between gap-10">
        <div className="flex flex-col gap-30 w-1/2">
          <SectionsTextsCustom
            className="w-1/2"
            title="Основні переваги :"
            list={[
              "Розвиток навичок ефективного спілкування.",
              "Поліпшення психологічного клімату в групі чи колективі.",
              "Підвищення рівня самооцінки та впевненості у власних діях.",
              "Формування емпатії та здатності розуміти інших.",
              "Зменшення конфліктних ситуацій та розвиток навичок мирного вирішення суперечок.",
            ]}
          />

          <SectionsTextsCustom
            title="Характеристики психічного здоров’я:"
            listmakinside={[
              "Здатність до саморегуляції та подолання стресу.",
              "Емоційна стабільність і врівноваженість.",
              "Розвинена увага, пам’ять та мислення.",
              "Здатність до емпатії та побудови гармонійних стосунків.",
              "Адекватна самооцінка та впевненість у власних діях.",
              "Адаптивність до змін і нових життєвих обставин.",
            ]}
          />
        </div>

        <div className="flex flex-row gap-10 w-1/2 items-start relative">
          <SectionsTextsCustom
            title="Рекомендації :"
            list={[
              "Виконувати вправи регулярно для закріплення нових навичок.",
              "Практикувати техніки як у групах, так і в індивідуальному спілкуванні.",
              "Поступово ускладнювати завдання для розвитку впевненості у різних ситуаціях.",
              "Використовувати у школі, колективі, родині чи професійному середовищі.",
            ]}
          />

          <FrameWrapper
            src={second_block_images.MAIN_COMMUNICATE}
            paddingX={20}
            paddingY={30}
            imgWidth={700}
            className="h-fit"
          />
          <Image
            src={text_block_image.ABSIGN}
            alt={"sign"}
            className="absolute right-0 -top-15"
          />
          <h5 className="heading-5 absolute w-[50%] -right-5 -bottom-3 text-right">
            Кожен малюнок, кожна вигадана історія чи гра — це маленький крок до
            впевненості, самовираження та розкриття внутрішнього потенціалу.
          </h5>
        </div>
      </div>
    </div>
  );
};

export default SecondBlockCommunicate;
