import CheckItem from "@/components/common/CheckItem";
import FrameWrapper from "@/components/common/FrameWrapper";
import { CheckMediumItems } from "@/constant/MainPageConstant/PlanMediumItems";
import { CheckPremiumItems } from "@/constant/MainPageConstant/PlanPremiumItems";
import { useState } from "react";
import PlanOrderModal from "./PlanOrderModal";

const PlanSection = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative pt-15 flex flex-col gap-20">
      <div className="flex flex-col items-center gap-20 lg:flex-col">
        <FrameWrapper
          paddingX={40}
          paddingY={60}
          className="w-full lg:w-[29%] order-2 lg:order-0"
          showSeal
          sealHideUntilHover={true}
          showOrnaments
          sealResponsiveButton
          sealButtonDesktop="left"
          onSealClick={() => setOpen(true)}
        >
          <div className="flex items-center flex-row justify-between pb-5">
            <h3
              className="heading-plan first-letter-plan uppercase"
              data-first-letter="м"
            >
              едіум
            </h3>
            <span className="heading-bg text-brand-gray text-[clamp(30px,5vw,50px)]">
              (02)
            </span>
          </div>
          <span className="heading-4">
            Доступ до 7 розділів РОК-М, який містить близько 700 методик.
          </span>
          <CheckItem className="heading-4 pb-4" items={CheckMediumItems} />
          <span className="heading-2 text-[clamp(40px,4vw,50px)]">2999 ₴</span>
        </FrameWrapper>

        <FrameWrapper
          paddingX={40}
          paddingY={70}
          paddingBottom={140}
          className="w-full lg:w-[29%] order-4 lg:order-0"
          showSeal
          sealHideUntilHover={true}
          showOrnaments
          sealResponsiveButton
          onSealClick={() => setOpen(true)}
        >
          <div className="flex items-center flex-row justify-between pb-5">
            <h3
              className="heading-plan first-letter-plan uppercase"
              data-first-letter="м"
            >
              АК-картини
            </h3>
          </div>
          <span className="heading-4">
            Повний доступ до всіх авторських МАК-картин “Ресурс SenseDia”
          </span>
          <br />
          <span className="heading-2 text-[clamp(40px,4vw,50px)] block pt-5">
            1999 ₴
          </span>
        </FrameWrapper>
      </div>
      <div
        className="
            flex flex-col items-center gap-20 relative
            lg:flex-row lg:justify-between
            lg:absolute w-full top-1/3
            "
      >
        <FrameWrapper
          paddingX={40}
          paddingY={60}
          paddingBottom={148}
          className="w-full lg:w-[29%] order-1 lg:order-0"
          showSeal
          sealHideUntilHover={true}
          sealResponsiveButton
          sealButtonDesktop="left"
          onSealClick={() => setOpen(true)}
        >
          <div className="flex items-center flex-row justify-between pb-5">
            <h3
              className="heading-plan first-letter-plan uppercase"
              data-first-letter="c"
            >
              тандарт
            </h3>
            <span className="heading-bg text-brand-gray text-[clamp(30px,5vw,50px)]">
              (01)
            </span>
          </div>
          <span className="heading-4">
            Доступ до одного із розділів методик, який містить близько 100
            методик.
          </span>
          <br />
          <span className="heading-2 text-[clamp(40px,4vw,50px)] block pt-5">
            1999 ₴
          </span>
        </FrameWrapper>

        <FrameWrapper
          paddingX={40}
          paddingY={50}
          className="w-full lg:w-[29%] order-3 lg:order-0"
          showSeal
          sealHideUntilHover={true}
          sealResponsiveButton
          sealButtonDesktop="left"
          onSealClick={() => setOpen(true)}
        >
          <div className="flex items-center flex-row justify-between pb-5">
            <h3
              className="heading-plan first-letter-plan uppercase"
              data-first-letter="п"
            >
              реміум
            </h3>
            <span className="heading-bg text-brand-gray text-[clamp(30px,5vw,50px)]">
              (03)
            </span>
          </div>
          <span className="heading-4">Повний доступ до: </span>
          <CheckItem className="heading-4 pb-4" items={CheckPremiumItems} />
          <span className="heading-2 text-[clamp(40px,4vw,50px)]">3999 ₴</span>
        </FrameWrapper>
        <PlanOrderModal
        open={open}
        onClose={() => setOpen(false)}
      />
      </div>
    </div>
    
  );
};

export default PlanSection;
