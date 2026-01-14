import { third_block_images } from "@/public/images/SectionsPage/ThirdBlock";
import FrameWrapper from "../../common/FrameWrapper";
import SectionsTextsCustom from "../../common/SectionsTextsCustom";

const ThirdBlockFamily = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between gap-5 lg:gap-0 pt-12">
      <div className="flex flex-col w-full lg:w-1/3 gap-5 lg:gap-28">
        <SectionsTextsCustom
          title="Як працює розділ:"
          list={[
            "Використання технік, які допомагають подолати непорозуміння та налагодити конструктивний діалог.",
            "Вправи для відновлення емоційної близькості між партнерами.",
            "Методи, що підтримують розвиток здорових форм спілкування та допомагають уникати повторюваних конфліктів.",
          ]}
        />
        <SectionsTextsCustom
          title="Для кого підходить:"
          list={[
            "Для пар, які прагнуть покращити спілкування та взаєморозуміння.",
            "Для тих, хто хоче подолати конфлікти та зміцнити емоційну близькість.",
            "Для подружніх пар, що переживають кризові моменти у стосунках.",
          ]}
        />
      </div>
      <div className="flex flex-col lg:flex-row w-full lg:w-1/2 gap-10  lg:items-start items-center">
        <FrameWrapper
          src={third_block_images.MAIN_FAMILY}
          paddingX={20}
          paddingY={30}
          className="h-fit w-fit hidden lg:block"
        />
        <div className="flex flex-col w-full lg:w-1/2 gap-5 lg:gap-30 xl:gap-45">
          <SectionsTextsCustom
            title="Основні переваги :"
            list={[
              "Зниження рівня конфліктності у стосунках.",
              "Відновлення довіри та теплоти у відносинах.",
              "Підтримка емоційної близькості та взаємної поваги.",
            ]}
          />
          <div className="flex flex-col gap-5">
            <h3 className="heading-3 uppercase">Рекомендації :</h3>
            <h4 className="heading-4">
              Регулярне застосування методик допомагає поступово зменшити
              напруження, навчитися чути одне одного та відчувати підтримку у
              парі.
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThirdBlockFamily;
