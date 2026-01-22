import FrameWrapper from "@/components/common/FrameWrapper";
import { flower_images } from "@/public/images/CommonImages/FlowerImages";
import { white_letter } from "@/public/images/CommonImages/PostCard";
import Image from "next/image";

const BoxSection = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between gap-5 pb-5 md:pb-23">
        <Image
          src={flower_images.ABOUT_PAGE_TOP}
          alt="flower"
          loading="eager"
          fetchPriority="high"
          className="absolute xl:top-110 left-0 z-100 xl:w-fit lg:top-120 lg:w-[70%] md:w-[50%] md:top-140 top-210 -translate-x-20 md:translate-x-0 lg:left-90 scale-x-[-1] lg:scale-x-100"
        />
        <div className="flex flex-col gap-15 relative">
          <h5 className="heading-5 w-80 -translate-x-5 hidden lg:block">
            Творчість — це шлях, на якому кожен крок відкриває нові горизонти
            для самовираження і розуміння світу.
          </h5>
          <FrameWrapper
            className="w-full lg:w-fit"
            paddingXDesktop={120}
            paddingX={20}
            paddingY={80}
          >
            <h3 className="heading-3 uppercase text-center w-full lg:w-85 xl:w-110">
              Авторські методики, перевірені у роботі з клієнтами, студентами та
              учнями
            </h3>
          </FrameWrapper>
          <Image
            src={white_letter.WHITE_POSTCARD}
            alt="letter"
            className="absolute w-40 -rotate-15 md:left-0 right-0 -bottom-70 md:-bottom-40 md:w-70 lg:w-90 md:rotate-15 z-100 md:-translate-x-30 translate-x-15"
          />
        </div>
        <FrameWrapper className="w-fit h-fit" paddingX={20} paddingY={88}>
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
