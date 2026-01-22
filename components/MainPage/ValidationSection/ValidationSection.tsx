"use client";

import Image from "next/image";
import { ValidationSectionImages } from "@/public/images/MainPageImages/ValidationSectionImages";
import CustomSeal from "@/components/common/CustomSeal";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ValidationSection = () => {
  const letterDesktopRef = useRef<HTMLImageElement>(null);
  const letterMobileRef = useRef<HTMLImageElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!wrapperRef.current) return;

    if (letterDesktopRef.current) {
      gsap.fromTo(
        letterDesktopRef.current,
        { x: -900, opacity: 0 },
        {
          x: -70,
          opacity: 1,
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: letterDesktopRef.current,
            start: "top 90%",
            once: true,
          },
        }
      );
    }

    if (letterMobileRef.current) {
      const animateMobile = () => {
        gsap.fromTo(
          letterMobileRef.current!,
          { y: 150, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: letterMobileRef.current,
              start: "top 90%",
              once: true,
            },
          }
        );
      };
      if (letterMobileRef.current.complete) {
        animateMobile();
      } else {
        letterMobileRef.current.onload = animateMobile;
      }
    }
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="w-full flex md:flex-row lg:justify-start flex-col-reverse xl:justify-between items-center pb-5 pb-responsive"
    >
      <div className="md:w-[50%] w-full md:-translate-x-5 md:px-0 justify-center 2xl:justify-start -mx-5 hidden md:flex">
        <div className="relative w-fit h-fit">
          <Image
            src={ValidationSectionImages.CONVERT}
            alt="Envelope"
            className="relative rotate-90 -translate-x-35 2xl:w-11/12"
          />
          <div className="absolute inset-0 flex pointer-events-none">
            <Image
              ref={letterDesktopRef}
              src={ValidationSectionImages.LETTER}
              alt="Letter"
              className="rotate-90 w-[85%] xl:w-11/12 -translate-x-35"
            />
          </div>
          <div className="absolute inset-0 pointer-events-none">
            <Image
              src={ValidationSectionImages.FOTTER_CONVERT}
              alt="Envelope top"
              className="rotate-90 2xl:w-11/12 md:-translate-x-60 lg:-translate-x-70 xl:-translate-x-83 translate-y-[35.5%]"
            />
          </div>
        </div>
      </div>

      <div className="md:hidden w-screen sm:w-10/12 relative ml-[-50vw] sm:ml-0 sm:mr-0 mr-[-50vw]">
        <div className="relative w-fit h-fit">
          <Image
            src={ValidationSectionImages.CONVERT}
            alt="Envelope"
            className="relative"
          />
          <div className="absolute inset-0 flex pointer-events-none">
            <Image
              ref={letterMobileRef}
              src={ValidationSectionImages.LETTER}
              alt="Letter"
              className="w-[90%] xl:w-11/12 translate-x-[6%] -translate-y-[2%]"
            />
          </div>
          <div className="absolute inset-0 pointer-events-none">
            <Image
              src={ValidationSectionImages.FOTTER_CONVERT}
              alt="Envelope top"
              className="2xl:w-11/12 translate-y-[85%]"
            />
          </div>
        </div>
        <div className="absolute top-[75%] sm:top-[75%] left-1/2 -translate-x-1/2 -translate-y-1/2">
          <CustomSeal label="Переглянути методики" />
        </div>
      </div>

      <div className="md:w-[50%]">
        <div>
          <h2 className="heading-2 uppercase flex flex-col mb-3 sm:mb-0">
            <span className="sm:leading-loose md:leading-10 lg:leading-[50px] xl:leading-[50px] sm:tracking-[-3px] md:tracking-[-1px] lg:tracking-[-4px]">
              <span className="whitespace-nowrap">
                <span className="first-letter" data-first-letter="у">
                  сі
                </span>{" "}
                методики
              </span>{" "}
              пройшли
            </span>
            <span className="text-right block w-full leading-12 md:leading-12 lg:leading-20">
              <span className="first-letter" data-first-letter="п">
                рактичну
              </span>
            </span>
            <span className="md:leading-12 lg:leading-1">
              <span className="first-letter" data-first-letter="п">
                еревірку
              </span>
            </span>
          </h2>
          <div className="flex flex-col">
            <p className="heading-4 md:w-[70%] lg:w-[46%] mt-10 lg:mt-12">
              В особистій психотерапевтичній практиці та збирались протягом 20
              років в різних країнах світу, в роботі з клієнтами, студентами,
              учнями, під час викладацької та наукової діяльності.
            </p>
            <p className="heading-4 md:w-[70%] lg:w-[46%] mt-5">
              Окремі методики апробовані та описані у успішно захищеному
              дисертаційному досліджені на звання доктора філософії з
              спеціальності спеціальна психологія. Сертифікований психотерапевт
              в трьох країнах світу.
            </p>
          </div>
        </div>
        <div className="mt-6 lg:mt-12 2xl:mt-60 flex justify-between">
          <span className="hidden md:block heading-5">
            Усі техніки та <br /> вправи перевірені на <br /> ефективнісь в{" "}
            <br /> науково-практичній <br /> діяльності.
          </span>
          <div className="hidden md:block">
            <CustomSeal
              label="Переглянути методики"
              position="left"
              className="-mt-6 lg:-mt-13"
              smallButton={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidationSection;
