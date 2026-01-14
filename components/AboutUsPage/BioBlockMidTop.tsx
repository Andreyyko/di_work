import { bio_section_images } from "@/public/images/AboutUsPage/BioSection";
import FrameWrapper from "../common/FrameWrapper";
import MakSectionTexts from "../common/MakSectionTexts";

const BioBlockMidTop = () => {
  return (
    <div className="flex flex-col md:flex-row pb-0 md:pb-15">
      <div className="w-fit md:w-[130%] order-2 md:order-1">
        <MakSectionTexts
          title="багаторічний шлях"
          extra={
            <>
              У 2001 РОЦІ
              <br />
              Вступаю на філософський факультет, спеціальність «психологія» у
              Львівському національному університеті імені Івана Франка.
            </>
          }
          extra_one={
            <>
              У 2003 РОЦІ
              <br />
              Навчалась на психолога-консультанта у напрямі психотерапії
              «Символдрама», отримала сертифікат, який дає право використовувати
              метод «Символдрама» у роботі практичного психолога-консультанта.
            </>
          }
        />
      </div>

      <div className="flex flex-col md:flex-row items-center md:items-start order-1 md:order-2">
        <FrameWrapper
          className="lg:w-[45%] w-fit h-fit order-1 md:order-2 translate-0 lg:-translate-y-15"
          paddingX={20}
          paddingY={20}
          src={bio_section_images.IN_UNIVERSITY}
        />
        <MakSectionTexts
          className="order-2 md:order-1 pt-5 md:pt-0"
          title="Навчання"
          extra={
            <>
              У 2004 РОЦІ
              <br />
              Завершила навчання з «Індивідуального та сімейного психологічного
              консультування» при Українському науково-методичному центрі
              практичної психології і соціальної роботи та Інституті психології
              ім. Г.С. Костюка АПН України.
            </>
          }
          extra_one={
            <>
              У 2003 РОЦІ
              <br />
              Стала лауреатом Другого Всеукраїнського конкурсу наукових робіт на
              тему гуманізму.
            </>
          }
        />
      </div>
    </div>
  );
};

export default BioBlockMidTop;
