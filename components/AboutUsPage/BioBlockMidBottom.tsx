import { bio_section_images } from "@/public/images/AboutUsPage/BioSection";
import FrameWrapper from "../common/FrameWrapper";
import MakSectionTexts from "../common/MakSectionTexts";

const BioBlockMidBottom = () => {
  return (
    <div className="flex flex-col md:flex-row lg:gap-30 gap-0">
      <div className="md:w-[50%] w-full order-2 md:order-1">
        <MakSectionTexts
          title="досвід та навчання"
          extra={
            <>
              З 2003 ПО 2004 РОКИ
              <br />
              Проходила курс навчання на освітньо-практичному семінарі з
              підготовки волонтерів телефонного консультування.
            </>
          }
          extra_one={
            <>
              У 2007 РОЦІ
              <br />
              Отримала диплом магістра з відзнакою, вступила в аспірантуру
              Львівського національного університету імені Івана Франка.
              Захистила дисертаційне дослідження у сфері психології, отримала
              ступінь доктора філософії зі спеціальності психологія.
            </>
          }
          extra_two={
            <>
              У 2016–2019 рр
              <br />
              Навчалась у Польському інституті Короткострокової терапії,
              сфокусованої на пошуку рішень (BSFT), отримала диплом
              психотерапевта. Описала метод BSFT у дисертації та статтях.
            </>
          }
          extra_three={
            <>
              У 2019–2021 рр
              <br />
              Навчалась на травмпсихотерапевта KIM (Konzept Integrative
              Methoden) в Інституті психосоматики Брауншвайга, Німеччина.
            </>
          }
        />
      </div>

      <div className="flex flex-col md:flex-row gap-10 order-1 md:order-2 items-center md:items-start">
        <FrameWrapper
          src={bio_section_images.WITH_LAPTOP}
          paddingY={40}
          paddingX={20}
          className="w-fit h-fit order-1"
        />

        <div className="flex flex-col md:w-[60%] w-full md:gap-10 gap-0 order-3">
          <MakSectionTexts
            title="З 2007–2016 РОКІВ"
            extra="Працювала на кафедрі психології, згодом на кафедрі спеціальної освіти."
          />
          <MakSectionTexts
            title="У 2024 РОЦІ"
            extra="Виконувала обов’язки завідувачки кафедри."
          />
          <MakSectionTexts
            title="У ПЕРІОД 2015–2016 РОКІВ"
            extra="Вела перші в Україні групи взаємодопомоги для батьків дітей з особливими потребами."
          />
        </div>
      </div>
    </div>
  );
};

export default BioBlockMidBottom;
