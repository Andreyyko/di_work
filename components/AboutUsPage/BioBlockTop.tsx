import { about_us_images } from "@/public/images/MainPageImages/AboutUsImages";
import FrameWrapper from "../common/FrameWrapper";
import { bio_section_images } from "@/public/images/AboutUsPage/BioSection";
import MakSectionTexts from "../common/MakSectionTexts";

const BioBlockTop = () => {
  return (
    <div className="flex flex-col md:flex-row pt-5 md:pt-[50px] pb-5 md:pb-50">
      <div className="flex flex-col md:flex-row gap-5 justify-center items-center md:justify-start md:items-start relative">
        <FrameWrapper
          src={bio_section_images.UNIVERSITY}
          className="w-69 h-fit"
          paddingX={20}
          paddingY={20}
        />
        <h5 className="heading-5 absolute -bottom-18 hidden lg:block">
        Відкрий у собі силу. Знайди<br/>внутрішній баланс. Побудуй новий<br/>простір для життя – стабільного,<br/>гармонійного, усвідомленого.
        </h5>
        <div className="w-full md:w-[60%]">
        <MakSectionTexts
          title="Психолог і психотерапевт"
          extra="Доктор філософії зі спеціальності психологія, індивідуальний та сімейний психолог, клінічний психолог, психотерапевт Brief Solution-Focused Therapy (у перекладі — Короткострокова терапія, сфокусована на пошуку рішень).
        Апробувала метод у дисертаційному дослідженні, науковець, авторка близько 60 фахових публікацій, психотерапевт у напрямі травмпсихотерапії KIM (Konzept Integrative Methoden) Інституту психосоматики Брауншвайга, Німеччина."
          extra_one="Володіє багатьма терапевтичними методами та методиками."
          extra_two="Ph.D (Psychology, Doctor of Philosophy)Associate Professor Ivan Franko National University, Lviv Certified psychotherapist (Ukraine, Poland, Germany)."
        />
        </div>
      </div>
      <div className="w-full md:w-[160%]">
        <MakSectionTexts
          title="Львівська поетеса"
          extra="(псевдонім Богдана Галицька, пишу вірші і твори з дитинства)."
          extra_one="Працювала довгий час із сім’ями дітей з особливими потребами, на основі апробованих методів супроводу і досліджень написала дисертацію. Авторка збірки поезії “Omnia vincit amor – Все перемагає любов”."
        />
      </div>
    </div>
  );
};

export default BioBlockTop;
