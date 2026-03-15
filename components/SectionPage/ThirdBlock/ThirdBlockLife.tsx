import { third_block_images } from "@/public/images/SectionsPage/ThirdBlock";
import FrameWrapper from "../../common/FrameWrapper";
import SectionsTextsCustom from "../../common/SectionsTextsCustom";

const ThirdBlockLife = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between gap-5 lg:gap-0 pt-12">
      <div className="flex flex-col w-full lg:w-1/3 gap-5">
        <FrameWrapper
          src={third_block_images.SUB_LIFE}
          className="w-fit h-fit block lg:hidden mx-auto lg:mx-0"
          paddingX={20}
          paddingY={20}
          showOrnaments
        />
        <SectionsTextsCustom
          className="pt-5 lg:pt-0"
          title="Як працює розділ:"
          list={[
            "Виконання індивідуальних завдань для самопізнання та пошуку особистих ресурсів.",
            "Використання групових вправ, що підтримують взаємодію, комунікацію та обмін досвідом.",
            "Методи для формування мотивації, цілеспрямованості та внутрішньої стійкості.",
          ]}
        />
        <h4 className="heading-4 w-full lg:w-[90%]">
          Ресурсно-орієнтовані методики  застосовуються у роботі з підлітками,
          дорослими та сім’ями для подолання апатії, тривожності, втрати
          мотивації чи сенсу. Вони поєднують емпіричну базу сучасної
          психотерапії, психології з глибоким гуманістичним баченням цілісної,
          творчої та здатної до відновлення особистості.
        </h4>
      </div>
      <div className="flex flex-col lg:flex-row w-full lg:w-1/2 gap-10  lg:items-start items-center">
        <FrameWrapper
          src={third_block_images.MAIN_LIFE}
          paddingX={20}
          paddingY={30}
          className="h-fit w-fit hidden lg:block"
        />
        <div className="flex flex-col w-full lg:w-[60%] gap-5">
          <SectionsTextsCustom
            title="Для кого підходить:"
            list={[
              "Для людей, які хочуть краще зрозуміти себе й відкрити власний потенціал сенсовний досвід.",
              "Для тих, хто прагне відновити енергію та знайти нові джерела мотивації.",
              "Для учасників групових занять і тренінгів, що цінують спільну підтримку та розвиток.",
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default ThirdBlockLife;
