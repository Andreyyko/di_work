"use client";

import { useState } from "react";

import { faqData } from "@/constant/FaqPageConstant/faqData";
import FaqTabs from "@/components/FaqPage/FaqTabs";
import FaqList from "@/components/FaqPage/FaqList";
import ValidationSection from "@/components/MainPage/ValidationSection/ValidationSection";
import ReviewSection from "@/components/MainPage/ReviewSection/ReviewSection";
import MethodsSwiper from "@/components/FaqPage/FaqPageCarouselMetodic/MethodsSwiper";

export default function FaqPage() {
  const [activeTab, setActiveTab] = useState("methodologies");

  return (
    <div className="">
      <div className="absolute top-0 left-0 max-w-sm">
        <p className="heading-5 opacity-70">
          Запитання — це перший крок
          <br /> до відкриття нових горизонтів,
          <br /> де кожна відповідь — це новий
          <br /> шлях до розуміння.
        </p>
      </div>      
      <h1 className="heading-2 uppercase mb-20 mt-32 text-center">
        <span className="first-letter">FAQ</span> —{" "}
        <span className="first-letter">Часті</span> запитання
      </h1>
      
      <FaqTabs
  activeTab={activeTab}
  onChange={setActiveTab}
/>

      <FaqList items={(faqData as any)[activeTab]} />
      {activeTab === "methodologies" && (
        <div className="-mb-50">
          {" "}
          <MethodsSwiper />{" "}
        </div>
      )}
      {activeTab === "certificates" && (
        <div className="-mb-50">
          <ValidationSection />{" "}
        </div>
      )}
      {activeTab === "results" && (
        <div className="-mb-50">
          <ReviewSection />{" "}
        </div>
      )}
    </div>
  );
}
