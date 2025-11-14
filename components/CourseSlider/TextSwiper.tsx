"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { useWindowWidth } from "@/hooks/useWindowWidth";

type TextSwiperProps = {
  onSwiper?: (swiper: any) => void;
};

const slides = [
  {
    title: "ДЛЯ СЕБЕ",
    description:
      "Якщо ви відчуваєте втрату ресурсу, життєздатності, мотивації, втому, стрес та тривогу. Пізнання себе, відкриття самоцінності, унікальності і знаходження сенсу. Досягнення цілей через призму власних ресурсів.",
  },
  {
    title: "ДЛЯ СІМЕЙНИХ ПАР",
    description:
      "Втрата психоемоційного зв’язку, близькості та сумісності, відсутність взаєморозуміння, поваги один до одного. Щоб відновити гармонію, зменшити конфлікти та стати ближчими.",
  },
  {
    title: "ДЛЯ ДІТЕЙ І ПІДЛІТКІВ",
    description:
      "Відсутність відчуття унікальності, мотивації, дисципліни та системності, хронічна втома, стрес тривога, нерозуміння сенсів та цінностей, страх майбутнього. Розвиток комунікації, самооцінки, емпатії та творчих здібностей.",
  },
  {
    title: "ДЛЯ БАТЬКІВ І ДІТЕЙ",
    description:
      "Втрата емоційного зв’язку та спілкування з дитиною, проблеми з сепарацією, ненормована та неконтрольована поведінка дітей та підлітків. Усвідомлене виховання, покращення дитячо-батьківських стосунків та гармонійного співіснування в сім’ї.",
  },
  {
    title: "ДЛЯ ОСВІТНЬОГО СЕРЕДОВИЩА",
    description:
      "Відсутність комунікації в колективі, субардинації, емпатії, взаєморозуміння та поваги, неконструктивне спілкування, мобінг і булінг. Покращення психологічного клімату, комунікації та продуктивності.",
  },
  {
    title: "ДЛЯ РОБОТИ З ТРАВМОЮ",
    description:
      "Ознаки ПТСР, емоційна відстороненність, проблеми зі сном, дратівливість, флешбеки, проблеми у стосунках, нездатність довіряти, ізоляція, емоційна нестабільність, часті спалахи гніву, смутку, паніки, втрата унікальності. Покращення стану при страху, панічних атаках, ПТСР, агресії.",
  },
];

const TextSwiper = ({ onSwiper }: TextSwiperProps) => {
  const { isSmallerThanMd } = useWindowWidth();

  if (isSmallerThanMd) {
    return (
      <div className="flex flex-col gap-10 max-w-[570px]">
        {slides.map((slide, index) => (
          <div key={index} className="relative flex flex-col justify-center p-2">
            <span className="heading-bg text-brand-gray absolute top-0 text-[clamp(36px,6vw,70px)] ">
              ({String(index + 1).padStart(2, "0")})
            </span>
            <h2 className="heading-3 mt-10 text-[22px] sm:text-[25px]">
              {slide.title}
            </h2>
            <p className="mt-4 heading-4 font-light text-[18px] sm:text-[20px]">
              {slide.description}
            </p>
          </div>
        ))}
      </div>
    );
  }

  // на десктопах — слайдер
  return (
    <div className="max-w-[570px] w-full relative">
      <Swiper
        modules={[EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={800}
        loop
        allowTouchMove={false}
        onSwiper={onSwiper}
        className="select-none"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative flex flex-col justify-center h-[400px]">
              <span className="heading-bg text-brand-gray absolute top-5 text-[clamp(26px,6vw,70px)]">
                ({String(index + 1).padStart(2, "0")})
              </span>
              <h2 className="heading-3 text-[25px]">{slide.title}</h2>
              <p className="mt-4 heading-4 font-light max-w-[60%] text-[20px]">
                {slide.description}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TextSwiper;
