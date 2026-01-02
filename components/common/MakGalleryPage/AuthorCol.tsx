import FrameWrapper from "@/components/common/FrameWrapper";
import MakSectionTexts from "@/components/common/MakSectionTexts";
import { mak_gallery_images } from "@/public/images/MakGallery";

const AuthorCol = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start pt-10">
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10">
        <FrameWrapper
          src={mak_gallery_images.GIRL_WINDOW}
          paddingX={20}
          paddingY={40}
          width="360px"
          imgWidth={350}
          className="h-fit"
        />
        <MakSectionTexts
          title="Авторська збірка"
          extra={
            <>
              РОК МАК be unique «Ресурс SenseDia».
              <br />
              Авторська збірка метафоричних асоціативних картин, проективний
              інструмент та унікальна методологія, створена для роботи з
              емоціями, ресурсами, сенсами, життєздатністю та внутрішнім світом
              людини.
            </>
          }
          extra_one="Головна унікальність МАК “Ресурс SenseDia” полягає в тому, що на звороті кожної карти розміщено запитання, які ведуть людину від усвідомлення та рефлексії до конкретних поведінкових кроків. Це не просто образи для роздумів — це практичний міст від сенсу до дії та змін."
          extra_two="РОК МАК be unique «Ресурс SenseDia» — твій ключ до емоційної рівноваги, життя в ресурсному стані, та дій які приводять до мотивації жити, творити, і просто любити себе та навколишній світ. Бо кожна людина унікальна. Це формування нової реальності."
          extra_three="Метафоричні картини “Ресурс SenseDia” — це унікальний авторський інструмент доктора філософії Богдани Андрейко, психотерапевтки з понад 20-річним досвідом практичної роботи, авторки близько 60 фахових публікацій у міжнародних виданнях та засновниці першої в Україні Evidence-Based платформи «По психічному здоров’ю», яка містить понад 1000 ресурсно-орієнтованих технік, методик, практик."
        />
      </div>
      <div>
        <FrameWrapper
          className="right-0"
          src={mak_gallery_images.FAMILY}
          width="330px"
          showOrnaments
          paddingX={20}
          paddingY={40}
        />
      </div>
    </div>
  );
};

export default AuthorCol;
