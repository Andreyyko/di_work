"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { flower_images } from "@/public/images/CommonImages/FlowerImages";
import FrameWrapper from "./FrameWrapper";

const LoadingScreen = () => {
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    let current = 1;

    const interval = setInterval(() => {
      current += 1;
      if (current > 100) {
        clearInterval(interval);

        document.body.style.overflow = "auto";
      } else {
        setProgress(current);
      }
    }, 20);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-9999 bg-brand-background bg-[url('/images/CatalogMethodicsPage/backgrounds/MethodicsListBackGrounds.svg')] flex items-center justify-center overflow-hidden">

      <h5 className="absolute top-0 heading-5 text-right right-0">
        Простір, де психологія поєднується з <br />креативом,
        де вправи стають ключем до<br />
        самопізнання, а гра — до нових<br />
        можливостей.
      </h5>

      <h5 className="absolute bottom-0 heading-5 text-left left-0">
        Гармонія починається зсередини.<br />
        Коли думки, емоції та дії<br />
        узгоджені — з’являється спокій і<br />
        впевненість у кожному дні
      </h5>

      <Image
        src={flower_images.LOADING_LEFT}
        alt="Flower left"
        className="absolute left-0 w-80 top-38 sm:w-100 sm:top-50 md:w-120 md:top-60 lg:w-130 xl:w-140 xl:top-65 -translate-y-1/2 pointer-events-none"
      />

      <Image
        src={flower_images.LOADING_RIGHT}
        alt="Flower right"
        className="absolute right-0 w-80 bottom-0 sm:w-100 sm:bottom-0 md:w-120 md:bottom-0 lg:w-130 xl:w-auto xl:bottom-0 pointer-events-none"
      />

      <FrameWrapper borderRadius="282px" frameThickness="5px">
        <div className="flex flex-col items-center gap-2 px-20 py-15 xl:px-50 xl:py-25">
          <span className="heading-2 w-[150px] text-center">
            {progress < 10 ? `0${progress}%` : `${progress}%`}
          </span>
          <span className="text-[25px] heading-2">LOADING...</span>
        </div>
      </FrameWrapper>
    </div>
  );
};

export default LoadingScreen;
