"use client";

import { useState, useEffect } from "react";
import gsap from "gsap";

import { faqData } from "@/constant/FaqPageConstant/faqData";
import FaqTabs from "@/components/FaqPage/FaqTabs";
import FaqList from "@/components/FaqPage/FaqList";
import ValidationSection from "@/components/MainPage/ValidationSection/ValidationSection";
import ReviewSection from "@/components/MainPage/ReviewSection/ReviewSection";
import MethodsSwiper from "@/components/FaqPage/FaqPageCarouselMetodic/MethodsSwiper";

export default function FaqPage() {
  const [activeTab, setActiveTab] = useState("methodologies");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-faq-animate]",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power1.out",
          stagger: 0.15,
          clearProps: "opacity,transform",
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="px-2 bg-[url('/images/CatalogMethodicsPage/backgrounds/MethodicsListBackGrounds.svg')]">
      <div
        className="
          absolute
          top-0 left-0
          md:max-w-sm
          max-sm:right-0
          max-sm:text-right
          max-sm:scale-x-[-1]
        "
        data-faq-animate
      >
        <p className="heading-5 opacity-70 max-sm:scale-x-[-1]">
          Запитання — це перший крок
          <br /> до відкриття нових горизонтів,
          <br /> де кожна відповідь — це новий
          <br /> шлях до розуміння.
        </p>
      </div>

      <h1
        className="heading-2 uppercase pb-20 pt-32 text-center"
        data-faq-animate
      >
        <span className="first-letter">FAQ</span> —{" "}
        <span className="first-letter">Часті</span> запитання
      </h1>

      <div data-faq-animate>
        <FaqTabs activeTab={activeTab} onChange={setActiveTab} />
      </div>

      <div data-faq-animate>
        <FaqList items={(faqData as any)[activeTab]} />
      </div>

      {activeTab === "methodologies" && (
        <div className="-pb-50" data-faq-animate>
          <MethodsSwiper />
        </div>
      )}
      {activeTab === "certificates" && (
        <div className="pb-20 md:-pb-50" data-faq-animate>
          <ValidationSection />
        </div>
      )}
      {activeTab === "results" && (
        <div className="-pb-15 md:-pb-50" data-faq-animate>
          <ReviewSection />
        </div>
      )}
    </div>
  );
}
