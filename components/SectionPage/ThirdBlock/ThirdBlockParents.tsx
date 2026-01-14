import { third_block_images } from "@/public/images/SectionsPage/ThirdBlock";
import FrameWrapper from "../../common/FrameWrapper";
import SectionsTextsCustom from "../../common/SectionsTextsCustom";
import TwoFrameButton from "../../common/TwoFrameButton";

const ThirdBlockParents = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-5 pt-0 lg:pt-10 justify-between">
      <div className="flex flex-col w-full lg:w-1/3 gap-5">
        <SectionsTextsCustom
          className="pt-5 lg:pt-0"
          title="Як працює розділ:"
          list={[
            "Виконується робота над розвитком довіри та взаєморозуміння у сім’ї.",
            "Вправи допомагають налагодити емоційний контакт між дитиною і батьками.",
            "Сімейні завдання формують спільний досвід, що зміцнює стосунки.",
            "Психологічна гра виступає як безпечний простір для вираження почуттів та навчання ефективній комунікації.",
          ]}
        />
      </div>
      <div className="flex flex-col lg:flex-row w-full lg:w-1/2 gap-10 lg:items-start items-center">
        <FrameWrapper
          src={third_block_images.MAIN_PARENTS}
          paddingX={13}
          paddingY={13}
          imgWidth={300}
          className="h-fit w-fit hidden lg:block"
        />
        <div className="flex flex-col w-full gap-5">
          <SectionsTextsCustom
            title="Для кого підходить:"
            list={[
              "Для батьків, які прагнуть зміцнити зв’язок із дітьми.",
              "Для сімей, де виникають труднощі у взаєморозумінні та спілкуванні.",
              "Для дітей, яким важлива підтримка та прийняття з боку дорослих.",
              "Для педагогів та фахівців, що працюють з батьками й дітьми.",
            ]}
          />
          <FrameWrapper
            src={third_block_images.SUB_PARENTS}
            className="w-fit h-fit block lg:hidden mx-auto lg:mx-0"
            paddingX={15}
            paddingY={15}
            showOrnaments
          />
          <TwoFrameButton
            variant="one"
            label="Спробувати зараз"
            className="block lg:hidden mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default ThirdBlockParents;
