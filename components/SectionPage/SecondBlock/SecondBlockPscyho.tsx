import { second_block_images } from "@/public/images/SectionsPage/SecondBlock";
import FrameWrapper from "../../common/FrameWrapper";
import TwoFrameButton from "../../common/TwoFrameButton";
import Image from "next/image";
import { text_block_image } from "@/public/images/SectionsPage/TextImageBlock";
import { white_letter } from "@/public/images/CommonImages/PostCard";
import { flower_images } from "@/public/images/CommonImages/FlowerImages";

const SecondBlockPscyho = () => {
  return (
    <div className="w-full">
      <h6 className="heading-bg absolute top-120 hidden xl:right-80 lg:top-123 lg:right-40 lg:block">Be Unique</h6>
      <Image
        src={flower_images.SECTION_PAGE_FLOWER}
        alt={"flower"}
        className="absolute right-0 lg:bottom-420 xl:bottom-[33%] bottom-[50%] z-100 max-w-[1440px] w-[458px] lg:w-[1040px] xl:w-[1440px] md:w-[700px] md:bottom-[43%]"
      />
      <h5 className="absolute heading-5 lg:top-[10%] xl:top-[8.5%] -right-5 w-90 text-right hidden lg:block">
        Відновлення — це не повернення до того, що було, а створення нового
        стану рівноваги всередині себе.
      </h5>
      <div className="flex flex-col gap-8 lg:hidden items-center">
        <FrameWrapper
          src={second_block_images.MAIN_PSCYHO}
          paddingX={20}
          paddingY={30}
          className="w-fit"
        />

        <h4 className="heading-4">
          У розділі застосовуються методики когнітивно-поведінкової терапії
          (КПТ), арт-терапії, наративного підходу, майндфулнес, соматично
          орієнтованої терапії, психоедукації, позитивної терапії,
          гештальт-підходу та Brief Solution-Focused Therapy (BSFT). Вони
          допомагають людині усвідомити власні емоції, знайти безпечні шляхи їх
          вираження та перетворити деструктивну енергію на ресурсну.
        </h4>

        <h4 className="heading-4">
          Авторські методики Б. Андрейко, представлені в цьому розділі,
          поєднують роботу з тілом, образом, словом і символом, сприяючи
          зціленню психоемоційної сфери, зниженню тривожності, нормалізації сну,
          відновленню внутрішньої опори та відчуття гармонії.
        </h4>
      </div>

      <div className="hidden lg:flex flex-row justify-between">
        <div className="flex flex-col gap-37.5 lg:w-1/1 xl:w-1/2">
          <h4 className="heading-4 w-[50%]">
            У розділі застосовуються методики когнітивно-поведінкової терапії
            (КПТ), арт-терапії, наративного підходу, майндфулнес, соматично
            орієнтованої терапії, психоедукації, позитивної терапії,
            гештальт-підходу та Brief Solution-Focused Therapy (BSFT). Вони
            допомагають людині усвідомити власні емоції, знайти безпечні шляхи
            їх вираження та перетворити деструктивну енергію на ресурсну.
          </h4>

          <div className="flex flex-row items-center gap-10">
            <TwoFrameButton variant="one" label="Спробувати зараз" />
            <h4 className="heading-4 w-[50%]">
              Авторські методики Б. Андрейко, представлені в цьому розділі,
              поєднують роботу з тілом, образом, словом і символом, сприяючи
              зціленню психоемоційної сфери, зниженню тривожності, нормалізації
              сну, відновленню внутрішньої опори та відчуття гармонії.
            </h4>
          </div>
        </div>

        <div className="w-1/4 relative">
          <FrameWrapper
            src={second_block_images.MAIN_PSCYHO}
            paddingX={20}
            paddingY={30}
          />

          <Image
            src={text_block_image.ABSIGN}
            alt="sign"
            className="absolute right-0 -top-15"
          />

          <Image
            src={white_letter.WHITE_POSTCARD}
            alt="letter"
            className="absolute xl:-left-30 lg:-left-20 lg:bottom-40 xl:bottom-15 w-[80%] rotate-15 z-100"
          />

          <h5 className="heading-5 absolute w-[85%] right-[80%] top-0 text-right">
            Іноді найкраща терапія — це тиша, спокій і чесність із власними
            почуттями.
          </h5>
        </div>
      </div>
    </div>
  );
};

export default SecondBlockPscyho;
