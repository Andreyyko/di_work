"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

import PlanSectionMobile from "./PlanSectionMobile";
import PlanSection from "./PlansSection";

const ChoosePlanSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [animate, setAnimate] = useState(false);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

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
  }, []);

  useLayoutEffect(() => {
    if (!animate) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".plan-anim",
        {
          opacity: 0,
          scale: 0.985,
          filter: "blur(12px)",
        },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.15,
          ease: "power2.out",
          stagger: 0.12,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [animate]);

  return (
    <section ref={sectionRef} className="pb-responsive">

      <div className="flex flex-row">
        <p className="hidden lg:block heading-5 left-0 -translate-x-5">
          Найзручніший формат
          <br />
          для старту:
          <br />
          поєднання ключових
          <br />
          матеріалів,
          <br />
          додаткової підтримки
          <br />
          та можливості
          <br />
          отримати результат
          <br />
          вже зараз
        </p>

        <h2 className="heading-2 pb-5 translate-x-1 md:translate-none plan-anim opacity-0">
          <span
            className="first-letter uppercase text-start"
            data-first-letter="о"
          >
            бирайте формат, що
          </span>
          <br />
          <span
            className="first-letter absolute uppercase whitespace-normal w-[95%] lg:w-[67%] text-start lg:text-end lg:whitespace-nowrap right-5"
            data-first-letter="п"
          >
            ідходить саме{" "}
          </span>
          <br />
          <span
            className="first-letter uppercase block text-center translate-y-1 md:translate-y-0"
            data-first-letter="в"
          >
            ам
          </span>
        </h2>
      </div>

      <span className="heading-3 relative md:absolute md:right-15 md:-translate-y-14 leading-tighter lg:-translate-y-17 plan-anim opacity-0">
        Три рівні: від одного розділу
        <br className="hidden md:block" />
        методик до повного доступу
      </span>

      <div className="hidden lg:block plan-anim opacity-0">
        <PlanSection />
      </div>

      <div className="block lg:hidden plan-anim opacity-0">
        <PlanSectionMobile />
      </div>

    </section>
  );
};

export default ChoosePlanSection;
