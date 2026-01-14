import { second_block_images } from "@/public/images/SectionsPage/SecondBlock";
import FrameWrapper from "../../common/FrameWrapper";
import TwoFrameButton from "../../common/TwoFrameButton";
import { text_block_image } from "@/public/images/SectionsPage/TextImageBlock";
import Image from "next/image";
import { flower_images } from "@/public/images/CommonImages/FlowerImages";
import { white_letter } from "@/public/images/CommonImages/PostCard";

const SecondBlockFamily = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full">
      <h6 className="heading-bg absolute top-100 hidden lg:block">Be Unique</h6>
      <Image
        src={flower_images.SECTION_PAGE_FLOWER}
        alt={"flower"}
        className="absolute right-0 lg:bottom-[35%] xl:bottom-[31.5%] bottom-[56%] z-100 max-w-[1440px] w-[458px] lg:w-[1040px] xl:w-[1440px] md:w-[700px] md:bottom-[52%]"
      />
      <Image
        src={white_letter.WHITE_POSTCARD}
        alt="letter"
        className="absolute top-50 -right-30 w-[28%] -rotate-15 hidden lg:block"
      />
      <div className="flex flex-col w-full lg:hidden gap-6 items-center lg:items-start">
        <FrameWrapper
          src={second_block_images.MAIN_FAMILY}
          paddingX={20}
          paddingY={30}
          imgHeight={550}
        />

        <h4 className="heading-4">
          Теоретичною основою розділу є підходи M. Bowen (Family Therapy in
          Clinical Practice), S. de Shazer і I. K. Berg (Brief Solution-Focused
          Therapy), а також напрацювання A. Lowen, P. Ogden і J. Kabat-Zinn, що
          поєднують тілесно-орієнтований, усвідомлений та
          розв’язально-орієнтований підходи. Водночас у розділі відображені
          принципи позитивної психології (M. E. P. Seligman), арт-терапії,
          наративної терапії, системної сімейної терапії,
          когнітивно-поведінкової терапії (КПТ), екзистенційної,
          гештальт-терапії, гуманістичної та психодинамічної терапії, які
          сприяють розвитку ресурсності, довіри, емоційної стабільності та
          глибшого розуміння сімейної взаємодії.
        </h4>

        <h4 className="heading-4">
          Також у розділі подано авторські розробки Богдани Андрейко, що
          спрямовані на поглиблення сімейної емпатії, партнерської довіри та
          створення безпечного емоційного простору, у якому кожен член родини
          відчуває прийняття, підтримку й належність.
        </h4>

        <TwoFrameButton variant="one" label="Спробувати зараз" />

        <FrameWrapper
          src={second_block_images.SUB_FAMILY}
          paddingX={18}
          paddingY={18}
          showOrnaments
          className="w-fit mt-40 lg:mt-0"
        />
      </div>

      <div className="hidden lg:flex w-full justify-between gap-10">
        <div className="flex gap-10 w-[50%]">
          <div className="flex flex-col gap-10 w-[80%]">
            <h4 className="heading-4">
              Теоретичною основою розділу є підходи M. Bowen (Family Therapy in
              Clinical Practice), S. de Shazer і I. K. Berg (Brief
              Solution-Focused Therapy), а також напрацювання A. Lowen, P. Ogden
              і J. Kabat-Zinn, що поєднують тілесно-орієнтований, усвідомлений
              та розв’язально-орієнтований підходи. Водночас у розділі
              відображені принципи позитивної психології (M. E. P. Seligman),
              арт-терапії, наративної терапії, системної сімейної терапії,
              когнітивно-поведінкової терапії (КПТ), екзистенційної,
              гештальт-терапії, гуманістичної та психодинамічної терапії, які
              сприяють розвитку ресурсності, довіри, емоційної стабільності та
              глибшого розуміння сімейної взаємодії.
            </h4>
            <TwoFrameButton variant="one" label="Спробувати зараз" />
          </div>

          <FrameWrapper
            src={second_block_images.SUB_FAMILY}
            paddingX={18}
            paddingY={18}
            showOrnaments
            className="h-fit"
          />
        </div>

        <div className="flex gap-5 w-[50%] items-end relative">
          <h4 className="heading-4 w-[45%]">
            Також у розділі подано авторські розробки Богдани Андрейко, що
            спрямовані на поглиблення сімейної емпатії, партнерської довіри та
            створення безпечного емоційного простору, у якому кожен член родини
            відчуває прийняття, підтримку й належність.
          </h4>

          <FrameWrapper
            src={second_block_images.MAIN_FAMILY}
            paddingX={20}
            paddingY={30}
            imgHeight={550}
          />
          <h5 className="heading-5 absolute w-[43%] right-[50%] top-0 text-right">
            Методики, що допомагають партнерам чути одне одного, долати
            конфлікти та
            <br />
            зміцнювати емоційний
            <br />
            зв’язок.
          </h5>
          <Image
            src={text_block_image.ABSIGN}
            alt={"sign"}
            className="absolute right-0 -top-15"
          />
        </div>
      </div>
    </div>
  );
};

export default SecondBlockFamily;
