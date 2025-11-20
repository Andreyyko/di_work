import Image from "next/image";
import { ValidationSectionImages } from "@/public/images/MainPageImages/ValidationSectionImages";

import CustomSeal from "@/components/common/CustomSeal";
import { useWindowWidth } from "@/hooks/useWindowWidth";

const ValidationSection = () => {
  const { width, isSmallerThanSm, isSmallerThanLg, isbiggerThanMd } =
    useWindowWidth();

  const isMdToLg = !isSmallerThanSm && isSmallerThanLg;

  return (
    <div className="w-full flex md:flex-row flex-col-reverse lg:justify-between items-center pb-5">
      <div className="md:w-[50%] w-full md:-translate-x-5 md:px-0 flex justify-center -mx-5">
        {isbiggerThanMd && (
          <Image
            src={ValidationSectionImages.letterСertificate}
            alt="Paper certificate in an open envelope"
          />
        )}
        {!isbiggerThanMd && (
          <div className="w-screen sm:w-10/12 relative ml-[-50vw] sm:ml-0 sm:mr-0 mr-[-50vw]">
            <Image
              src={ValidationSectionImages.letterСertificateMobile}
              alt="Paper certificate in an open envelope"
              className="w-full h-auto"
            />
          </div>
        )}
      </div>
      <div className="md:w-[50%]">
        <div>
          <h2 className="heading-2 uppercase flex flex-col mb-3 sm:mb-0">
            <span className="md:whitespace-nowrap  sm:leading-loose md:leading-loose lg:leading-loose">
              <span className="first-letter"><span className="whitespace-nowrap">Усі методики</span> пройшли</span>
            </span>

            <span className="text-right block w-full leading-12 lg:leading-15">
              <span className="first-letter">Практичну</span>
            </span>

            <span className="md:leading-normal">
              <span className="first-letter">Перевірку</span>
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
        <div className="mt-6 lg:mt-12 flex justify-between">
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
