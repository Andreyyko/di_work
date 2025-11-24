import Image from "next/image";
import { ValidationSectionImages } from "@/public/images/MainPageImages/ValidationSectionImages";

import CustomSeal from "@/components/common/CustomSeal";
import { useWindowWidth } from "@/hooks/useWindowWidth";

const ValidationSection = () => {
  const { width, isSmallerThanSm, isSmallerThanLg, isbiggerThanMd } =
    useWindowWidth();

  const isMdToLg = !isSmallerThanSm && isSmallerThanLg;

  return (
    <div className="w-full flex md:flex-row flex-col-reverse lg:justify-between items-center pb-5 pb-responsive">
      <div className="md:w-[50%] w-full md:-translate-x-5 md:px-0 flex justify-center 2xl:justify-start -mx-5">
        {isbiggerThanMd && (
          <Image
            src={ValidationSectionImages.letterСertificate}
            alt="Paper certificate in an open envelope"
            className="2xl:w-11/12"
          />
        )}
        {!isbiggerThanMd && (
          <div className="w-screen sm:w-10/12 relative ml-[-50vw] sm:ml-0 sm:mr-0 mr-[-50vw]">
            <Image
              src={ValidationSectionImages.letterСertificateMobile}
              alt="Paper certificate in an open envelope"
              className="w-full h-auto"
            />
              <div className="absolute top-[75%] sm:top-[75%] md: left-1/2 -translate-x-1/2 -translate-y-1/2">
              <CustomSeal label="Переглянути методики" />
            </div>
          </div>
        )}
      </div>
      <div className="md:w-[50%]">
        <div>
          <h2 className="heading-2 uppercase flex flex-col mb-3 sm:mb-0">
            <span className=" sm:leading-loose md:leading-10 lg:leading-[50px] xl:leading-[50px] sm:tracking-[-3px] md:tracking-[-1px] lg:tracking-[-4px]">
              <span className="whitespace-nowrap">
                {" "}
                <span className="first-letter" data-first-letter="у">сі</span> методики{" "}
              </span>{" "}
              пройшли
            </span>

            <span className="text-right block w-full leading-12 md:leading-12 lg:leading-20">
              <span className="first-letter" data-first-letter="п">рактичну</span>
            </span>

            <span className="md:leading-12 lg:leading-1">
              <span className="first-letter" data-first-letter="п">еревірку</span>
            </span>
          </h2>
          <div className="flex flex-col">
            <p className="heading-4 md:w-[70%] lg:w-[46%] mt-10 lg:mt-12">
              В особистій психотерапевтичній практиці та збирались протягом 20
              років в різних країнах світу, в роботі з клієнтами, студентами,
              учнями , під час викладацької та наукової діяльності.
            </p>
            <p className="heading-4 md:w-[70%] lg:w-[46%] mt-5">
              Окремі методики апробовані та описані у успішно захищеному
              дисертаційному досліджені на звання доктора філософії з
              спеціальності спеціальна психологія. Сертифікований психотерапевт
              в трьох країнах світу.
            </p>
          </div>
        </div>
        <div className="mt-6 lg:mt-12 2xl:mt-60 flex justify-between">
          {isbiggerThanMd && (
            <span className="heading-5">
              Усі техніки та
              <br /> вправи перевірені на
              <br /> ефективнісь в<br /> науково-практичній
              <br />
              діяльності.
            </span>
          )}
          {isbiggerThanMd && (
            <CustomSeal
              label="Переглянути методики"
              position="left"
              className={`-mt-6 lg:-mt-13 ${isMdToLg ? "w-[120px]" : ""}`}
              smallButton={true}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ValidationSection;
