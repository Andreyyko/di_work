"use client";

import TwoFrameButton from "../../common/TwoFrameButton";
import Image from "next/image";
import { flower_images } from "@/public/images/CommonImages/FlowerImages";

const MakMethodicInfo = () => {
  return (
    <section className="pb-responsive w-full relative pt-20 z-3">

      <Image
        src={flower_images.BackGroundImagesMobile}
        alt="background flower mobile"
        className="
          absolute top-[23%] -left-5 -translate-y-1/2 w-[1000px] h-[1500px]
          pointer-events-none select-none z-1
          max-[470px]:block hidden
        "
        priority
      />

      <Image
        src={flower_images.BackGroundImages}
        alt="background flower"
        className="
          absolute top-[30%] sm:top-[40%] -left-5 -translate-y-1/2 2xl:w-[1900px]
          pointer-events-none select-none z-1
          hidden max-[470px]:hidden sm:block
        "
        priority
      />

      <div className="relative">
        <div className="flex flex-row justify-between items-start mb-10">

          <div className="hidden lg:flex flex-col max-w-[55%] z-2">
            <h3 className="heading-3 mb-5 uppercase">картини (мак)</h3>
            <p className="heading-4 md:max-w-[55%] lg:max-w-[44%]">
              На платформі психічного здоров’я Evidence Based представлено
              унікальний підхід до роботи з метафоричними асоціативними
              картинами (МАК) як сучасним інструментом розвитку
              усвідомленості, внутрішніх ресурсів, пошуку сенсів, знаходження
              рішень і психологічної стійкості.
            </p>
          </div>

          <div className="hidden lg:flex flex-col items-end text-right max-w-[35%]">
            <span className="heading-5 translate-x-5">
              Додаткові ресурси, що
              <br /> поглиблюють досвід: <br />
              тренінги для практики, <br />
              музика для гармонізації <br /> стану,
              <br />
              література для <br /> саморозвитку
            </span>
          </div>
        </div>

        <div className="mb-3 sm:mb-[25px] z-3 relative">
          <h2 className="heading-2 uppercase text-center tracking-[-6px] sm:tracking-[-0.01em]">
            <span className="whitespace-nowrap -ml-3 sm:translate-x-0">
              {" "}
              <span className="first-letter" data-first-letter="м">ак</span>,{" "}
            </span>
            <br className="block sm:hidden" />
            <span className="first-letter" data-first-letter="м">узичний</span>
            <br />
            <span className="first-letter" data-first-letter="с">упровід</span> та список
            використаної <span className="first-letter" data-first-letter="л">ітератури</span>
            <br className="hidden sm:block" /> до{" "}
            <span className="first-letter" data-first-letter="м">етодик</span>
          </h2>
        </div>

        <div className="flex flex-col items-end text-right mb-7 sm:hidden">
          <span className="heading-5 translate-x-5">
            Додаткові ресурси, що поглиблюють досвід:
            <br /> тренінги для практики,
            <br />
            музика для гармонізації стану,
            <br /> література для саморозвитку
          </span>
        </div>

        <div className="flex flex-col items-center sm:items-end sm:mb-10">
          <div className="lg:hidden flex flex-col z-3">
            <h3 className="heading-3 mb-5 uppercase">картини (мак)</h3>
            <p className="heading-4 mb-[30px] sm:w-1/2 md:w-1/3">
              На платформі психічного здоров’я Evidence Based представлено
              унікальний підхід до роботи з метафоричними асоціативними
              картинами (МАК) як сучасним інструментом розвитку
              усвідомленості, внутрішніх ресурсів, пошуку сенсів, знаходження
              рішень і психологічної стійкості.
            </p>
          </div>

          <div className="w-full sm:max-w-[40%] md:max-w-[35%] lg:max-w-[28%] z-3">
            <h3 className="heading-3 mb-5 uppercase text-left">Музичний супровід</h3>
            <p className="heading-4 mb-[30px]">
              Для підтримки психоемоційного стану учасників кожна практика
              супроводжується заспокійливими звуками природи та релаксаційною
              музикою.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center sm:flex-row w-full">

          <div className="flex flex-row justify-between">
            <span className="hidden lg:block heading-5 -translate-x-5 relative -z-1">
              Практика, що оживає
              <br /> у тренінгах,
              <br /> музика, яка підтримує
              <br /> внутрішній баланс,
              <br /> та книги, що
              <br /> відкривають нові <br />
              горизонти знань
            </span>

            <div className="w-full md:w-11/12 lg:w-8/12 lg:mt-4 xl:mt-11">
              <h3 className="heading-3 mb-5 uppercase text-left">
                список використаної літератури
              </h3>
              <p className="heading-4 sm:w-3/5 mb-5">
                Ми надаємо детальний список бібліографічних посилань на авторів
                рекомендованої та використаної літератури до методик.
              </p>
              <p className="heading-4 mb-[50px] sm:mb-0">
                *Тренінги будуть бонусом як
                <br className="hidden sm:block" /> оновлення щомісяця для учасників.
              </p>
            </div>
          </div>

          <div className="-mt-3">
            <TwoFrameButton variant="one" label="ПЕРЕГЛЯНУТИ МАК КАРТИНИ" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MakMethodicInfo;
