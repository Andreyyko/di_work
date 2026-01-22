import FrameWrapper from "@/components/common/FrameWrapper";
import { flower_images } from "@/public/images/CommonImages/FlowerImages";
import Image from "next/image";

const BoxSectionBottom = () => {
  return (
    <div className="flex flex-col md:flex-row gap-5 lg:gap-20 items-end md:pb-70 pb-[150px]">
      <Image
        src={flower_images.ABOUT_PAGE_BOTTOM}
        alt="flower"
        className="absolute z-100 xl:bottom-[58.5%] lg:bottom-[58.5%] xl:w-fit lg:w-[70%] lg:left-0 right-0 lg:scale-x-100 scale-x-[-1] md:bottom-[65%] md:w-[60%] bottom-[71%] translate-x-30 md:translate-x-0 w-[90%]"
      />
      <div className="flex flex-row">
        <FrameWrapper
          className="w-fit md:w-73 lg:w-85 h-fit"
          paddingYDesktop={114}
          paddingXDesktop={40}
          paddingX={20}
          paddingY={80}
        >
          <h3 className="heading-3 uppercase text-center">
            Наш підхід базується на принципах, що кожна людина має власний
            ресурс і унікальність
          </h3>
        </FrameWrapper>
        <h5 className="heading-5 w-40 xl:w-80 hidden lg:block">
          Ми віримо, що кожна людина здатна відновити свій ресурс і знайти
          гармонію — потрібно лише дати їй правильні інструменти
        </h5>
      </div>
      <div className="flex flex-col gap-10">
        <h4 className="heading-4 w-[95%] order-2 md:order-1">
          РОК-М — це унікальний психотерапевтичний онлайн-проект, який об'єднує
          ресурсно-орієнтовані когнітивні методики, перевірені практикою і
          науково обґрунтовані. Сайт надає доступ до ефективних інструментів для
          відновлення внутрішнього балансу, ресурсу та життєстійкості.
        </h4>

        <FrameWrapper
          className="w-fit md:w-[92%] order-1 md:order-2"
          paddingYDesktop={200}
          paddingXDesktop={80}
          paddingX={20}
          paddingY={80}
        >
          <h3 className="heading-3 uppercase text-center">
            Частина методик була апробована та описана у науковому
            дисертаційному дослідженні PhD
          </h3>
        </FrameWrapper>
      </div>
    </div>
  );
};

export default BoxSectionBottom;
