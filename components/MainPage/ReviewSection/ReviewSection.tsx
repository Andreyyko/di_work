"use client";

import FrameWrapper from "@/components/common/FrameWrapper";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import "swiper/css";
import "swiper/css/navigation";
import ArrowButton from "@/components/common/ArrowButton";
import { feedbacks } from "@/constant/MainPageConstant/FeedBacksRewievData";
import { useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";

const ReviewSection = () => {
  const { isSmallerThanLg } = useWindowWidth();

  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [animate, setAnimate] = useState(false);

  useLayoutEffect(() => {
    if (!sectionRef.current || isSmallerThanLg) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "120px 0px" }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isSmallerThanLg]);

  useLayoutEffect(() => {
    if (!animate || isSmallerThanLg) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".review-anim",
        { opacity: 0, filter: "blur(14px)", willChange: "opacity, filter" },
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.45,
          ease: "power3.out",
          stagger: 0.15,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [animate, isSmallerThanLg]);

  return (
    <section ref={sectionRef} className="relative w-full pb-responsive">
      {isSmallerThanLg && (
        <>
          <h2 className="heading-2 text-center pt-10">
            <span className="first-letter uppercase" data-first-letter="П">
              еревірено
            </span>{" "}
            <span className="first-letter uppercase" data-first-letter="Д">
              освідом і{" "}
              <span className="first-letter" data-first-letter="Д">
                овірою
              </span>
            </span>
          </h2>

          <h3 className="heading-3 text-center pt-4">
            20 років науково-практичної діяльності, сотні клієнтів, наукові
            дослідження
            <br />і сертифікати, які підтверджують ефективність методик
          </h3>

          <div className="relative w-full mt-6 mb-37.5 lg:mb-0">
            <button
              className={`
                swiper-button-prev-custom absolute left-0 top-60 z-20
                transition-opacity duration-300
                ${isAtStart ? "opacity-30 pointer-events-none" : "opacity-100"}
              `}
            >
              <ArrowButton direction="left" />
            </button>

            <button
              className={`
                swiper-button-next-custom absolute right-0 top-60 z-20
                transition-opacity duration-300
                ${isAtEnd ? "opacity-30 pointer-events-none" : "opacity-100"}
              `}
            >
              <ArrowButton direction="right" />
            </button>

            <Swiper
              modules={[Navigation]}
              navigation={{
                prevEl: ".swiper-button-prev-custom",
                nextEl: ".swiper-button-next-custom",
              }}
              spaceBetween={5}
              slidesPerView={1.7}
              grabCursor={true}
              onReachBeginning={() => setIsAtStart(true)}
              onReachEnd={() => setIsAtEnd(true)}
              onFromEdge={() => {
                setIsAtStart(false);
                setIsAtEnd(false);
              }}
              breakpoints={{
                0: { slidesPerView: 1 },
                480: { slidesPerView: 1.2 },
                640: { slidesPerView: 1.5 },
                768: { slidesPerView: 2 },
                900: { slidesPerView: 2.4 },
                1023: { slidesPerView: 3 },
              }}
            >
              {feedbacks.map((fb) => (
                <SwiperSlide key={fb.id}>
                  <div className="mx-auto w-[330px]">
                    <FrameWrapper paddingX={23} paddingY={15}>
                      <Image src={fb.img} alt="feedback" />
                    </FrameWrapper>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      )}

      {!isSmallerThanLg && (
        <>
          <div className="relative z-10 flex flex-wrap justify-center w-full mx-auto">
            {feedbacks.map((fb) => (
              <div
                key={fb.id}
                className="review-anim opacity-0 transition-all duration-300 mx-3 my-3
                  w-[220px] lg:w-[220px] xl:w-[280px] 2xl:w-[270px]"
              >
                <FrameWrapper paddingX={20} paddingY={13}>
                  <Image src={fb.img} alt="feedback" />
                </FrameWrapper>
              </div>
            ))}
          </div>

          <div className="relative w-full">
            <p className="absolute -left-5 -top-20 max-w-[180px] heading-5 hidden md:block">
              Ти вже маєш усе необхідне, аби рухатися вперед. Усвідом власні
              ресурси, довірся собі та зроби перший крок назустріч новому етапу
            </p>

            <p className="absolute -right-5 text-right -top-10 heading-5 hidden md:block">
              Це простір, де є місце
              <br />
              стабільності, здоровим
              <br />
              стосункам і особистому
              <br />
              розвитку. Тут панує
              <br />
              усвідомленість, а твої
              <br />
              рішення працюють на
              <br />
              твоє майбутнє
            </p>
          </div>

          <h2 className="review-anim opacity-0 heading-2 text-center pt-30">
            <span className="first-letter uppercase" data-first-letter="П">
              еревірено
            </span>{" "}
            <span className="first-letter uppercase" data-first-letter="Д">
              освідом і{" "}
              <span className="first-letter" data-first-letter="Д">
                овірою
              </span>
            </span>
          </h2>

          <h3 className="review-anim opacity-0 heading-3 text-center pt-7">
            20 років науково-практичної діяльності, сотні клієнтів, наукові
            дослідження
            <br />і сертифікати, які підтверджують ефективність методик
          </h3>
        </>
      )}
    </section>
  );
};

export default ReviewSection;
