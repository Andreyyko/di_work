import FrameWrapper from "@/components/common/FrameWrapper";

const BoxSectionBottom = () => {
  return (
    <div className="flex flex-col md:flex-row gap-5 lg:gap-20 items-end md:pb-60 pb-[150px]">
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
