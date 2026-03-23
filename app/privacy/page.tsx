"use client";

import { useEffect } from "react";
import gsap from "gsap";

import PrivacySection from "@/components/common/PrivacySection";
import { footer_images } from "@/public/images/CommonImages/FooterImages";
import Image from "next/image";
import {
  PravicyData,
  copyrightData,
} from "@/constant/PrivacyConstant/privacyData";
import { white_letter } from "@/public/images/CommonImages/PostCard";

export default function PrivacyPage() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-privacy-animate]",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power1.out",
          stagger: 0.15,
          clearProps: "opacity, transform",
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="px-5 bg-[url('/images/CatalogMethodicsPage/backgrounds/MethodicsListBackGrounds.svg')] relative overflow-hidden">
      <Image
        className="absolute right-0 translate-y-250 w-90 lg:w-130 lg:translate-y-290 rotate-15 translate-x-40 hidden md:block"
        src={white_letter.WHITE_POSTCARD}
        alt={"postcard"}
      />

      <h5 className="heading-5 -translate-x-5" data-privacy-animate>
        Ваша довіра — наш
        <br />
        найцінніший ресурс, і ми
        <br />
        оберігаємо її з повагою та
        <br />
        турботою
      </h5>

      <h2
        className="heading-privacy text-center flex flex-col uppercase -tracking-widest pt-13 lg:pt-22 pb-37.5 lg:pb-94.5"
        data-privacy-animate
      >
        <span className="first-letter-privacy" data-first-letter="П">
          олітика
        </span>
        <span className="first-letter-privacy" data-first-letter="К">
          онфіденційності
        </span>
      </h2>

      {PravicyData.map((block, index) => (
        <PrivacySection key={index} {...block} data-privacy-animate />
      ))}

      <div data-privacy-animate>
        {copyrightData.map((block, index) => (
          <PrivacySection
            key={index}
            {...block}
            className={index === copyrightData.length - 1 ? "mb-20" : "mb-8"}
          />
        ))}
      </div>
    </section>
  );
}
