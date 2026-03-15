import { third_block_images } from "@/public/images/SectionsPage/ThirdBlock";
import FrameWrapper from "../../common/FrameWrapper";
import SectionsTextsCustom from "../../common/SectionsTextsCustom";
import TwoFrameButton from "../../common/TwoFrameButton";

const ThirdBlockCommunicate = () => {
  return (
    <div className="w-full pt-5 lg:pt-20">
      <div className="flex flex-col gap-8 lg:hidden">
        <TwoFrameButton
          variant="one"
          label="Спробувати зараз"
          className="mx-auto"
        />

        <FrameWrapper
          className="w-fit mx-auto"
          src={third_block_images.SUB_COMMUNICATE}
          paddingX={15}
          paddingY={15}
        />

        <SectionsTextsCustom
          title="Як працює розділ:"
          list={[
            "Використовуються вправи та техніки, що сприяють розвитку ефективної комунікації.",
            "Розвивається здатність взаємодіяти в колективі, покращується групова динаміка.",
            "Техніки формують адекватну самооцінку та сприяють розвитку емпатії.",
            "Практики допомагають зменшити конфліктність та підвищити психологічний комфорт у групі чи сім’ї.",
          ]}
        />

        <SectionsTextsCustom
          title="Для кого підходить:"
          list={[
            "Для дітей, які вчаться взаємодіяти з однолітками та дорослими.",
            "Для підлітків і дорослих, які прагнуть покращити свої комунікативні навички.",
            "Для колективів, груп чи сімей, де важливий здоровий психологічний клімат.",
            "Для людей, які хочуть підвищити рівень емпатії та впевненості у спілкуванні.",
          ]}
        />
      </div>

      <div className="hidden lg:flex flex-row gap-10">
        <div className="w-1/2">
          <FrameWrapper
            src={third_block_images.MAIN_COMMUNICATE}
            paddingX={20}
            paddingY={35}
            className="w-fit"
          />
        </div>

        <div className="flex flex-col gap-10">
          <div className="flex flex-row justify-end gap-30 items-start">
            <SectionsTextsCustom
              className="w-[38%]"
              title="Як працює розділ:"
              list={[
                "Використовуються вправи та техніки, що сприяють розвитку ефективної комунікації.",
                "Розвивається здатність взаємодіяти в колективі, покращується групова динаміка.",
                "Техніки формують адекватну самооцінку та сприяють розвитку емпатії.",
                "Практики допомагають зменшити конфліктність та підвищити психологічний комфорт у групі чи сім’ї.",
              ]}
            />

            <FrameWrapper
              src={third_block_images.SUB_COMMUNICATE}
              paddingX={15}
              paddingY={15}
              className="w-fit h-fit"
            />
          </div>

          <div className="flex flex-row justify-end gap-25 items-center">
            <SectionsTextsCustom
              className="w-[38%]"
              title="Для кого підходить:"
              list={[
                "Для дітей, які вчаться взаємодіяти з однолітками та дорослими.",
                "Для підлітків і дорослих, які прагнуть покращити свої комунікативні навички.",
                "Для колективів, груп чи сімей, де важливий здоровий психологічний клімат.",
                "Для людей, які хочуть підвищити рівень емпатії та впевненості у спілкуванні.",
              ]}
            />

            <TwoFrameButton
              variant="one"
              label="Спробувати зараз"
              className="w-70"
            />
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThirdBlockCommunicate;
