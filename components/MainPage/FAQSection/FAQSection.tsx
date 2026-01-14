"use client";

import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";

import FAQItem from "@/components/common/FAQItem";
import { faqList } from "@/constant/MainPageConstant/FAQQuestion";
import { flower_images } from "@/public/images/CommonImages/FlowerImages";
import { white_letter } from "@/public/images/CommonImages/PostCard";
import Image from "next/image";

const FAQSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [animate, setAnimate] = useState(false);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimate(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "120px 0px" }
    );

    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (!animate) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".faq-anim",
        {
          opacity: 0,
          filter: "blur(14px)",
          willChange: "opacity, filter",
        },
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.15,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [animate]);

  return (
    <section ref={sectionRef} className="relative pt-20">

      <Image
        className="faq-anim opacity-0 absolute w-40 sm:w-60 right-0 -rotate-30 -top-20 translate-x-21 lg:left-0 lg:rotate-15 lg:-translate-x-21 lg:top-30 lg:w-75"
        src={white_letter.WHITE_POSTCARD}
        alt="postcard"
      />

      <Image
        className="faq-anim opacity-0 hidden lg:block absolute lg:translate-x-5 lg:w-150 lg:right-0 lg:-top-60 xl:w-auto xl:-top-140"
        src={flower_images.FAQ_FLOWER}
        alt="flower"
      />

      <p className="heading-5 hidden lg:block absolute right-0 text-right -top-35 translate-x-5">
        Тут ви знайдете пояснення ключових <br />
        моментів, відповіді на часті <br />
        запитання<br />та підказки для комфортного<br />
        використання методик.
      </p>

      <h2 className="faq-anim opacity-0 heading-2 uppercase md:-translate-y-10 mb-10 md:text-left -tracking-widest">
        <span className="first-letter left-5 md:left-10" data-first-letter="в">
          ідповіді
        </span>
        <br />
        <span className="first-letter" data-first-letter="н">
          а ваші
        </span>
        <br />

        <span className="uppercase relative left-15 sm:left-30 md:left-40 lg:left-58 xl:left-78 inline-block">
          запитанн<span className="first-letter" data-first-letter="я"></span>
        </span>
      </h2>

      <h3 className="faq-anim opacity-0 heading-3 text-left lg:text-left lg:translate-x-56 xl:hidden mt-3 mb-10">
        Ми зібрали найпоширеніші питання,
        <br />
        щоб вам було легше зробити вибір
      </h3>

      <div className="mx-auto max-w-full sm:max-w-full md:max-w-full lg:max-w-[55%] xl:max-w-[55%]">
        {faqList.map((item, i) => (
          <div key={i} className="faq-anim opacity-0">
            <FAQItem
              question={item.question}
              answer={item.answer}
              defaultOpen={i < 2}
            />
          </div>
        ))}
      </div>

      <p className="heading-5 hidden lg:block absolute left-0 -translate-x-5 -translate-y-42">
        Ми зібрали
        <br />
        найважливіше,
        <br />
        щоб ви швидко
        <br />
        знайшли те, що
        <br />
        потрібно.
      </p>

      <h3 className=" heading-3 text-right -translate-y-25 hidden xl:block">
        Ми зібрали найпоширеніші
        <br />
        питання, щоб вам було
        <br />
        легше зробити вибір
      </h3>
    </section>
  );
};

export default FAQSection;
