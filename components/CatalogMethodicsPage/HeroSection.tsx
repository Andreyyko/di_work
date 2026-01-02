"use client";

import { CheckItems } from "@/constant/MainPageConstant/heroSectionData";
import CheckItem from "../common/CheckItem";
import FrameWrapper from "../common/FrameWrapper";

const HeroSection = () => {
  return (
    <section className="pb-0 md:pb-62.5">
      <h5 className="heading-5 text-left -translate-x-5">
        Не важливо, як саме ти
        <br />
        говориш — важливо, що твої
        <br />
        думки мають значення.
      </h5>
      <h2 className="heading-2 text-center pt-15 hidden lg:block">
        <div className="">
          <span className="first-letter" data-first-letter="Р">
            ОК-М, BEUNIQUE.HEALTH —
          </span>
          <span>
            ПЕРША{" "}
            <span className="first-letter" data-first-letter="У">
              КРАЇНСЬКА
            </span>{" "}
            EVIDENCE-BASED ОНЛАЙН-ПЛАТФОРМА{" "}
          </span>
          <span className="first-letter">З</span>
          <span className="first-letter" data-first-letter="П">
            ОНАД ТИСЯЧУ
          </span>
          <br />
          ТЕРАПЕВТИЧНИХ <span className="first-letter">ТЕХНІК І</span>
          <br />
          <span className="first-letter" data-first-letter="М">
            ЕТОДИК
          </span>
        </div>
      </h2>

      <h2 className="heading-2 text-center pt-10 flex flex-col items-center -tracking-widest lg:hidden">
        <div>
          <span className="first-letter" data-first-letter="Р">
            ОК-М,
          </span>{" "}
          BEUNIQUE.HEALTH
        </div>

        <div>— ПЕРША</div>

        <div>
          <span className="first-letter" data-first-letter="У">
            УКРАЇНСЬКА
          </span>
        </div>

        <div>EVIDENCE-BASED</div>

        <div>
          ОНЛАЙН-ПЛАТФОРМА <span className="first-letter">З</span>
        </div>

        <div className="tracking-[-0.12em]">
          <span className="first-letter" data-first-letter="П">
            ОНАД
          </span>{" "}
          ТИСЯЧУ
        </div>

        <div>ТЕРАПЕВТИЧНИХ</div>

        <div>
          <span className="first-letter" data-first-letter="Т">
            ЕХНІК І{" "}
            <span className="first-letter" data-first-letter="М">
              ЕТОДИК
            </span>
          </span>
        </div>
      </h2>

      <div className="pt-0 md:pt-15 flex flex-col md:flex-row md:items-center lg:items-start justify-between gap-2">
        <p className="heading-4 mt-5 flex items-center w-[97%] md:w-[50%] lg:w-[27%] mb-8 sm:mt-8">
          Практичні техніки, вправи, ігри та тренінги, що підходять для
          дорослих, дітей, сімей і команд, що поєднують практичність
          (структуровані інструкції) і
          наукову достовірність (посилання на літературу й авторів методик).
        </p>

        <div className="flex justify-center items-center md:justify-end lg:items-start order-1 md:order-2 relative">
          <FrameWrapper
            className="heading-6 font-grava opacity-100 w-auto "
            paddingX={20}
            paddingY={25}
          >
            <CheckItem items={CheckItems} />
          </FrameWrapper>
          <h6 className="heading-bg absolute -top-8 right-[30%] block md:hidden">Be Unique</h6>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
