import FrameWrapper from "@/components/common/FrameWrapper";
import MakSectionTexts from "@/components/common/MakSectionTexts";
import { mak_gallery_images } from "@/public/images/MakGallery";

const EffectComp = () => {
  return (
    <div className="flex flex-col lg:flex-row i pt-20 lg:pt-10">
      <div className="flex flex-col lg:flex-row justify-between gap-10">
        <FrameWrapper
          src={mak_gallery_images.BOY_AND_GIRL}
          paddingX={20}
          paddingY={30}
          width="300px"
          imgWidth={300}
          className="h-fit order-2 lg:order-1 mx-auto lg:mx-0"
        />
        <MakSectionTexts
        className="order-1 lg:order-2"
          title="Терапевтичний ефект:"
          listEffect={[
            "Посилення відчуття контролю над життям;",
            "Розвиток навичок позитивної самооцінки;",
            "Зміцнення віри у власні сили;",
            "Формування внутрішньої опори та стабільності у складних ситуаціях;",
            "Зниження рівня тривожності, емоційної напруги та невпевненості;",
            "Відновлення зв’язку з власними почуттями, тілом і досвідом;",
            "Усвідомлення глибинних емоцій і проживання їх у безпечний спосіб;",
            "Підвищення рівня усвідомленості та емоційного інтелекту;",
            "Формування стійкості (резилієнтності) та здатності до адаптації;",
            "Активізація внутрішніх ресурсів і відновлення енергії для дії;",
            "Підтримка пошуку сенсу, гармонії та життєвої мотивації;",
            "Покращення якості комунікації, емпатії й взаєморозуміння з іншими;",
            "Стимулювання процесів саморефлексії, особистісного зростання та самоактуалізації.",
          ]}
        />
      </div>
      <div>
        <FrameWrapper
          className="right-0 hidden lg:block"
          src={mak_gallery_images.BOOK_PREVIEW}
          showOrnaments
          paddingX={21}
          paddingY={40}
        />
      </div>
    </div>
  );
};

export default EffectComp;
