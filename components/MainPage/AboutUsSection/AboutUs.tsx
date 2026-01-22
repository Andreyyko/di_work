"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

import { about_us_images } from "@/public/images/MainPageImages/AboutUsImages";
import FrameWrapper from "../../common/FrameWrapper";
import TwoFrameButton from "../../common/TwoFrameButton";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import { white_letter } from "@/public/images/CommonImages/PostCard";
import Link from "next/link";

const AboutUs = () => {
  const { isLgOrLarger, width, isSmallerThanSm } = useWindowWidth();
  const showBr = (width ?? 0) > 768 && (width ?? 0) < 885;

  const sectionRef = useRef<HTMLElement | null>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldAnimate(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0,
        rootMargin: "200px 0px -10% 0px",
      }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (!shouldAnimate) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".about-item");

      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldAnimate]);

  return (
    <section ref={sectionRef} className="w-full pb-responsive">
      <div className="flex flex-col md:flex-row items-center md:justify-between md:mb-[50px] about-item opacity-0 translate-y-[30px]">
        {isSmallerThanSm && (
          <p className="heading-bg sm:whitespace-nowrap leading-6 translate-y-5 z-50 about-item opacity-0">
            by Bo<span className="mr-1">g</span>
            <span>d</span>ana A<span className="mr-1">n</span>
            <span>d</span>reyko
          </p>
        )}

        <div className="relative about-item opacity-0 translate-y-[30px]">
          <FrameWrapper
            src={about_us_images.bogdanaReadBook}
            alt="Photo"
            showOrnaments
            paddingX={20}
            paddingY={36}
            width="285px"
            height="487px"
            objectFit="none"
            className="shrink-0 w-[285px] h-[487px] min-w-[285px] min-h-[487px] mb-[50px] md:mb-0"
          />

          <img
            src={white_letter.WHITE_POSTCARD.src}
            alt="white postcard"
            className="absolute bottom-10 md:-bottom-7 -left-20 md:-left-[102px] w-[170px] h-[120px] md:w-[245px] md:h-[175px] rotate-15 drop-shadow-md z-20 about-item"
          />
        </div>

        <div className="flex flex-col sm:w-[80%] md:ml-3">
          <div className="flex flex-col md:flex-row justify-between md:max-h-[300px] lg:max-h-[230px] md:mb-14">
            <div className="flex flex-col md:max-w-[280px] lg:max-w-[500px] xl:max-w-[630px] about-item opacity-0 translate-y-[30px]">
              <h3 className="heading-3 mb-5 uppercase">
                сайт включає {showBr && <br />} в себе
              </h3>
              <p className="heading-4 md:w-full lg:w-[69%] mb-[30px] md:mb-0">
                Поведінкові, ресурсні, когнітивні психологічні методики,
                практики, техніки, вправи, інтервенції, психологічні завдання,
                унікальні авторські психологічні ігри, які орієнтовані на пошук
                життєздатності людини, відновлення ресурсів, знаходження та
                досягнення цілей, мотивації, енергії та внутрішнього потенціалу
                людини. Пошук сенсу через власну унікальність за принципом
                резилієнтності.
              </p>
            </div>

            <div className="flex flex-col sm:w-[400px] about-item opacity-0 translate-y-[30px]">
              <h3 className="heading-3 mb-5 uppercase">усі методики пройшли</h3>
              <p className="heading-4 w-full sm:w-[90%] xl:w-[99%] mb-[30px] md:mb-0">
                Практичну перевірку в особистій психотерапевтичній практиці та
                збирались протягом 20 років в різних країнах світу, в роботі з
                клієнтами, студентами, учнями, під час викладацької та наукової
                діяльності.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-end lg:max-h-52 xl:max-h-60">
            <div className="sm:max-w-[460px] xl:max-w-[390px] flex flex-col justify-end about-item opacity-0 translate-y-[30px]">
              <h3 className="heading-3 mb-5 uppercase">окремі методики</h3>
              <p className="heading-4 mb-[30px] md:mb-0 text-left md:text-left">
                Апробовані та описані у успішно захищеному дисертаційному
                дослідженні на звання доктора філософії зі спеціальності
                спеціальна психологія. Сертифікований психотерапевт в трьох
                країнах світу.
              </p>
            </div>

            {isLgOrLarger && (
              <FrameWrapper
                src={about_us_images.bogdana}
                alt="Photo"
                showOrnaments
                paddingX={19}
                paddingY={17}
                width="269px"
                height="235px"
                objectFit="none"
                className="shrink-0 w-[269px] h-[235px] min-w-[269px] min-h-[235px] about-item"
              />
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start sm:items-center md:flex-row justify-between">
        <div className="flex flex-col sm:flex-row sm:w-[75%] md:w-full">
          {isLgOrLarger && (
            <span className="heading-5 -translate-x-4 flex items-end lg:w-[26%] 2xl:w-[25%] text-left translate-y-0 2xl:-translate-20">
              Гармонія починається <br /> зсередини. Коли думки, <br /> емоції
              та дії узгоджені — <br /> з’являється спокій і<br /> впевненість у
              кожному дні
            </span>
          )}

          <div className="flex flex-col justify-end sm:-ml-4 md:ml-0 lg:w-[355px] xl:w-[420px] 2xl:w-[520px] translate-y-0 2xl:-translate-y-20 about-item">
            <h3 className="heading-3 mb-5 text-left uppercase">
              кожна з методик містить
            </h3>
            <p className="heading-4 mb-[30px] md:mb-0">
              Наукову бібліографію, унікальну інструкцію та рекомендації щодо
              застосування для психологів, психотерапевтів, освітян, коучів,
              батьків та людей. Перша українська evidence-based онлайн-платформа
              з понад тисячу терапевтичних технік і вправ. Ресурс поєднує
              практичність (структуровані інструкції) і наукову достовірність
              (посилання на літературу й авторів методик). Платформа створена
              психологинею, психотерапевткою, доктором філософії Богданою
              Андрейко, щоб зробити сучасні інструменти підтримки психічного
              здоров’я доступними фахівцям і людям, які прагнуть власного
              розвитку.
            </p>
          </div>
        </div>

        <Link
          href="/about"
          className="flex items-end justify-center w-full md:w-auto sm:mt-6 md:mt-0 translate-y-[30px]"
        >
          <TwoFrameButton variant="one" label="ДІЗНАТИСЯ БІЛЬШЕ" />
        </Link>
      </div>
    </section>
  );
};

export default AboutUs;
