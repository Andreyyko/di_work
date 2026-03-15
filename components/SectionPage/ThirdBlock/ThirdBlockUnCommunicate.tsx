import { third_block_images } from "@/public/images/SectionsPage/ThirdBlock";
import FrameWrapper from "../../common/FrameWrapper";
import SectionsTextsCustom from "../../common/SectionsTextsCustom";
import TwoFrameButton from "../../common/TwoFrameButton";

const ThirdBlockUnCommunicate = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-5 pt-0 lg:pt-10 justify-between">
      <div className="flex flex-col w-full lg:w-1/5 gap-5">
        <SectionsTextsCustom
          className="pt-5 lg:pt-0"
          title="Як працює розділ:"
          list={[
            "Застосовуються спеціальні методики, що сприяють подоланню бар’єрів у спілкуванні.",
            "Використовуються вправи для розвитку мовленнєвої активності та розширення словникового запасу.",
            "Практики формують навички невербальної та вербальної взаємодії.",
            "Техніки допомагають підвищити впевненість у спілкуванні та покращити якість комунікації.",
          ]}
        />
      </div>
      <div className="flex flex-col lg:flex-row w-full lg:w-[60%] gap-10 lg:items-start items-center justify-end">
        <FrameWrapper
          src={third_block_images.MAIN_UNCOMMUNICATE}
          paddingX={20}
          paddingY={20}
          className="h-fit w-fit hidden lg:block"
        />
        <div className="flex flex-col w-full lg:w-[50%] gap-5">
          <SectionsTextsCustom
            title="Для кого підходить:"
            list={[
              "Для дітей із затримками або порушеннями мовленнєвого розвитку.",
              "Для дорослих, які мають мовленнєві порушення після хвороб чи травм.",
              "Для сімей, які прагнуть підтримати дитину у розвитку мовлення.",
              "Для педагогів і фахівців, що працюють із дітьми чи дорослими з порушеннями мовлення.",
            ]}
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

export default ThirdBlockUnCommunicate;
