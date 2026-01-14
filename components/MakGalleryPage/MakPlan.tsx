import CheckItem from "@/components/common/CheckItem";
import FrameWrapper from "@/components/common/FrameWrapper";
import { MakPlanData } from "@/constant/MakGallaryConstant/MakPlanData";

const MakPlan = () => {
  return (
    <div className="flex gap-20 flex-col lg:flex-row items-center justify-center pb-20 pt-39 lg:pt-0">
      <FrameWrapper
        paddingX={40}
        paddingY={70}
        className="w-full lg:w-[50%] order-4 lg:order-0 leading-0"
        showSeal
        sealHideUntilHover={true}
        showOrnaments
        sealResponsiveButton
        sealLabel="ПРИДБАТИ"
      >
        <div className="flex items-center flex-row justify-between pb-5">
          <h3
            className="heading-plan first-letter-plan uppercase"
            data-first-letter="м"
          >
            АК-картини
          </h3>
          <span className="heading-2 text-[clamp(40px,4vw,50px)] block whitespace-nowrap">
            1999 ₴
          </span>
        </div>
        <span className="heading-4">
          Повний доступ до до 63 авторських
          <br />
          МАК-картин “Ресурс SenseDia”
        </span>
        <CheckItem className="heading-4 pb-4" items={MakPlanData} />
        <span className="heading-4">
          Формат: онлайн-доступ та з можливістю придбати збірку фізично
          (записавшись на консультацію)
        </span>
      </FrameWrapper>
      <FrameWrapper
        paddingX={40}
        paddingY={70}
        className="w-full lg:w-[50%] order-4 lg:order-0 leading-0"
        showSeal
        sealHideUntilHover={true}
        showOrnaments
        sealResponsiveButton
        sealButtonDesktop="left"
        sealLabel="ПРИДБАТИ"
      >
        <div className="flex items-center flex-row justify-between pb-5">
          <h3
            className="heading-plan first-letter-plan uppercase"
            data-first-letter="м"
          >
            АК-картини
          </h3>
          <span className="heading-2 text-[clamp(40px,4vw,50px)] block whitespace-nowrap">
            1999 ₴
          </span>
        </div>
        <span className="heading-4">
          Повний доступ до до 63 авторських
          <br />
          МАК-картин “Ресурс SenseDia”
        </span>
        <CheckItem className="heading-4 pb-4" items={MakPlanData} />
        <span className="heading-4">
          Формат: онлайн-доступ та з можливістю придбати збірку фізично
          (записавшись на консультацію)
        </span>
      </FrameWrapper>
    </div>
  );
};

export default MakPlan;
