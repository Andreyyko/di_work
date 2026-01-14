import { third_block_images } from "@/public/images/SectionsPage/ThirdBlock";
import FrameWrapper from "../../common/FrameWrapper";
import SectionsTextsCustom from "../../common/SectionsTextsCustom";
import TwoFrameButton from "../../common/TwoFrameButton";

const ThirdBlockPscyho = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between gap-5 lg:gap-0 pt-12">
      <div className="flex flex-col w-full lg:w-[27%] gap-5 lg:gap-15">
        <SectionsTextsCustom
          title="Як працює розділ:"
          list={[
            "Використовуються методи, які знижують рівень тривожності та емоційного напруження.",
            "Техніки допомагають стабілізувати психоемоційний стан і відновити внутрішній баланс.",
            "Заняття сприяють подоланню наслідків стресових подій та психотравм.",
            "Практики формують нові навички саморегуляції, що зменшують прояви панічних атак і ПТСР.",
          ]}
        />
        <SectionsTextsCustom
          title="Основні переваги :"
          list={[
            "Зменшення рівня тривоги та стресу.",
            "Зниження інтенсивності або повне подолання панічних атак.",
            "Поступове відновлення після психотравм та ПТСР.",
            "Підвищення рівня емоційної стабільності.",
            "Формування здорових стратегій подолання труднощів.",
          ]}
        />
      </div>
      <div className="flex flex-col lg:flex-row w-full lg:w-[70%] gap-10 justify-end lg:items-start items-center">
        <FrameWrapper
          src={third_block_images.MAIN_PSCYHO}
          paddingX={20}
          paddingY={30}
          className="h-fit w-fit hidden lg:block"
        />
        <div className="flex flex-col w-full lg:w-[40%] gap-5 lg:gap-30 xl:gap-35">
          <SectionsTextsCustom
            title="Для кого підходить:"
            list={[
              "Для людей, які переживають високий рівень тривожності чи стресу.",
              "Для тих, хто стикається з панічними атаками.",
              "Для осіб, які мають досвід психотравм чи наслідки ПТСР.",
              "Для всіх, хто прагне зміцнити психічне здоров’я та емоційну стійкість.",
            ]}
          />
          <SectionsTextsCustom
            title="Рекомендації :"
            list={[
              "Регулярність: систематичне застосування технік підсилює їхню ефективність.",
              "Безпечний простір: вправи бажано виконувати у комфортних умовах.",
              "Поступовість: робота з психотравмами потребує делікатного підходу.",
              "За потреби — поєднувати із супроводом психолога чи психотерапевта.",
            ]}
          />
          <TwoFrameButton variant="one" label="Спробувати зараз" className="block lg:hidden mx-auto"/>
        </div>
      </div>
    </div>
  );
};

export default ThirdBlockPscyho;
