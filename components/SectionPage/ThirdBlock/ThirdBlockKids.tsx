import { third_block_images } from "@/public/images/SectionsPage/ThirdBlock";
import FrameWrapper from "../../common/FrameWrapper";
import SectionsTextsCustom from "../../common/SectionsTextsCustom";
import TwoFrameButton from "../../common/TwoFrameButton";

const ThirdBlockKids = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between gap-5 pt-0 lg:pt-15">
      <div className="flex flex-col w-full lg:w-1/4 gap-5">
        <SectionsTextsCustom
          className="pt-5 lg:pt-0"
          title="Як працює розділ:"
          list={[
            "Арттерапевтичні завдання, вправи та ігри розвивають увагу, пам’ять, уяву, мислення й креативність.",
            "Інтерактивні техніки формують нестандартне мислення та гнучкість.",
            "Практичні вправи підвищують упевненість у власних ідеях.",
          ]}
        />
      </div>
      <div className="flex flex-col lg:flex-row w-full lg:w-1/2 gap-10  lg:items-start items-center">
        <FrameWrapper
          src={third_block_images.MAIN_KIDS}
          paddingX={20}
          paddingY={15}
          className="h-fit w-fit hidden lg:block"
        />
        <div className="flex flex-col w-full lg:w-[60%] gap-5">
          <SectionsTextsCustom
            title="Для кого підходить:"
            list={[
              "Для дітей, які проявляють інтерес до творчості та потребують розвитку здібностей.",
              "Для тих, хто має труднощі з увагою, пам’яттю, уявою та іншими психічними процесами.",
              "Для школярів, яким важливо розвивати креативне й нестандартне мислення.",
              "Для дітей, що прагнуть розкрити свій потенціал і розвинути уяву.",
            ]}
          />
          <FrameWrapper
          src={third_block_images.SUB_KIDS}
          className="w-fit h-fit block lg:hidden mx-auto lg:mx-0"
          paddingX={20}
          paddingY={20}
          showOrnaments
        />
          <TwoFrameButton variant="one" label="Спробувати зараз" className="block lg:hidden mx-auto"/>
        </div>
      </div>
    </div>
  );
};

export default ThirdBlockKids;
