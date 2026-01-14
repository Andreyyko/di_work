import CheckItem from "@/components/common/CheckItem";
import FrameWrapper from "@/components/common/FrameWrapper";
import { CheckMediumItems } from "@/constant/MainPageConstant/PlanMediumItems";
import { CheckPremiumItems } from "@/constant/MainPageConstant/PlanPremiumItems";
import { useState } from "react";
import PlanOrderModal from "./PlanOrderModal";

const PlanSectionMobile = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-14.25">
      <FrameWrapper
        paddingX={40}
        paddingY={60}
        paddingBottom={148}
        showSeal
        sealHideUntilHover={true}
        sealResponsiveButton
        sealButtonDesktop="left"
        onSealClick={() => setOpen(true)}
      >
        <div className="flex justify-between pb-5">
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

        <span className="heading-2 text-[clamp(40px,4vw,50px)] pt-5 block">
          1999 ₴
        </span>
      </FrameWrapper>

      <FrameWrapper
        paddingX={40}
        paddingY={60}
        showSeal
        showOrnaments
        sealHideUntilHover={true}
        sealResponsiveButton
        sealButtonDesktop="left"
        onSealClick={() => setOpen(true)}
      >
        <div className="flex justify-between pb-5">
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
        paddingY={50}
        showSeal
        sealHideUntilHover={true}
        sealResponsiveButton
        sealButtonDesktop="left"
        onSealClick={() => setOpen(true)}
      >
        <div className="flex justify-between pb-5">
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

        <span className="heading-4">Повний доступ до:</span>

        <CheckItem className="heading-4 pb-4" items={CheckPremiumItems} />

        <span className="heading-2 text-[clamp(40px,4vw,50px)]">3999 ₴</span>
      </FrameWrapper>

      <FrameWrapper
        paddingX={40}
        paddingY={70}
        paddingBottom={148}
        showSeal
        showOrnaments
        sealHideUntilHover={true}
        sealResponsiveButton
        sealButtonDesktop="left"
        onSealClick={() => setOpen(true)}
      >
        <div className="flex justify-between pb-5">
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

        <span className="heading-2 text-[clamp(40px,4vw,50px)] block pt-5">
          1999 ₴
        </span>
      </FrameWrapper>
      <PlanOrderModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
};

export default PlanSectionMobile;
