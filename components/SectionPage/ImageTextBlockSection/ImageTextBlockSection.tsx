import { StaticImageData } from "next/image";
import FrameWrapper from "../../common/FrameWrapper";
import { TextImageBlockData } from "@/constant/SectionsPage/ImageTextBlock";
import Image from "next/image";
import { text_block_image } from "@/public/images/SectionsPage/TextImageBlock";

function renderLine(text?: string) {
  return text && <span className=" w-full">{text}</span>;
}

function renderMobile(mobile_image?: StaticImageData) {
  return (
    mobile_image && (
      <div>
        <FrameWrapper
          src={mobile_image}
          className="w-fit h-fit block lg:hidden relative"
          paddingX={15}
          paddingY={15}
        />
        <Image
          src={text_block_image.ABSIGN}
          alt={"sign"}
          className="absolute right-5 sm:right-30 md:right-60 block lg:hidden"
        />
      </div>
    )
  );
}

function renderImage(sub_image?: StaticImageData) {
  return (
    sub_image && (
      <div className="">
        <FrameWrapper
          src={sub_image}
          className="w-fit h-fit relative"
          paddingX={15}
          paddingY={15}
        />
        <Image
          src={text_block_image.ABSIGN}
          alt={"sign"}
          className="absolute right-15 sm:right-30 md:right-60 block lg:hidden"
        />
      </div>
    )
  );
}

const ImageTextBlockSection = ({
  image,
  title,
  line1,
  line2,
  line3,
  sub_image,
  highlight,
  highlight1,
  highlight2,
  sub_text,
  mobile_image,
}: TextImageBlockData) => {
  return (
    <div className="px-5 flex lg:flex-row flex-col gap-5  lg:pt-62.5 pb-127 lg:pb-168.75 relative bg-[url('/images/MainPageImages/backgrounds/Section_Slider_BackGround.svg')]">
      <h5 className="heading-5 absolute text-[20px] lg:text-[50px] w-[70%] md:w-[30%] lg:w-[40%] bottom-70 md:right-20 lg:right-30 -right-10">
        {sub_text}
      </h5>
      <div className="flex lg:flex-row flex-col gap-10 lg:gap-5.5 items-center lg:items-start">
        <FrameWrapper
          src={image}
          showOrnaments
          className="w-fit h-fit"
          paddingX={20}
          paddingY={35}
        />
        <div className="flex flex-col w-full lg:w-[41%] tracking-tight heading-4 gap-5">
          <div className="heading-3 uppercase">{renderLine(title)}</div>
          {renderLine(line1)}
          {renderLine(line2)}
          {renderLine(line3)}
        </div>
      </div>
      <div className="tracking-tight heading-4 gap-5 lg:w-[110%] w-full">
        <div className="flex flex-col w-full gap-5 lg:items-end items-center">
          {renderLine(highlight)}
          {renderLine(highlight1)}
          {renderLine(highlight2)}
          {renderImage(sub_image)}
          {renderMobile(mobile_image)}
        </div>
      </div>
    </div>
  );
};

export default ImageTextBlockSection;
