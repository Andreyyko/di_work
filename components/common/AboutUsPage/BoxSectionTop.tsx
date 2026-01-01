import FrameWrapper from "@/components/common/FrameWrapper";

const BoxSection = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between gap-5 pb-5 md:pb-23">
        <div className="flex flex-col gap-15">
          <h5 className="heading-5 w-80 -translate-x-5 hidden lg:block">
            Творчість — це шлях, на якому кожен крок відкриває нові горизонти
            для самовираження і розуміння світу.
          </h5>
          <FrameWrapper className="w-full lg:w-fit" paddingXDesktop={120} paddingX={20} paddingY={80}>
            <h3 className="heading-3 uppercase text-center w-full lg:w-85 xl:w-110">
              Авторські методики, перевірені у роботі з клієнтами, студентами та
              учнями
            </h3>
          </FrameWrapper>
        </div>
        <FrameWrapper
          className="w-fit h-fit"
          paddingX={20}
          paddingY={88}
        >
          <h3 className="heading-3 uppercase text-center w-full md:w-80">
            20 років практики в психотерапії та викладацькій діяльності у різних
            країнах світу
          </h3>
        </FrameWrapper>
      </div>
    </div>
  );
};

export default BoxSection;
