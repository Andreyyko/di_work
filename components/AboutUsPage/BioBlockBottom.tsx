import { bio_section_images } from "@/public/images/AboutUsPage/BioSection";
import FrameWrapper from "../common/FrameWrapper";
import MakSectionTexts from "../common/MakSectionTexts";

const BioBlockBottom = () => {
  return (
    <div className="flex md:flex-row flex-col pb-20">
      <div className="flex md:flex-row flex-col gap-10 md:w-[80%] w-full items-center md:items-start">
        <FrameWrapper
          className="w-fit"
          paddingX={20}
          paddingY={40}
          src={bio_section_images.BY_TRIBUNE}
        />
        <div className="flex flex-col justify-between md:w-[40%] w-full">
        <MakSectionTexts
          title="Пройдено"
          extra="Близько 1000 годин наукових стажувань у різних методах психотерапії та психології, авторка унікальних практичних психологічних технік і практик."
        />
        <MakSectionTexts
          title="Близько"
          extra="20 років наукової та практичної діяльності у сфері психології та психотерапії.
          Колекціоную рідкісні, маловідомі, ефективні психологічні техніки, вправи, методи, інтервенції."
        />
        </div>
      </div>
      <FrameWrapper
      src={bio_section_images.WITH_MICROPHONE}
      paddingX={20}
      paddingY={30}
      className="w-fit h-fit"
      />
    </div>
  );
};

export default BioBlockBottom;
