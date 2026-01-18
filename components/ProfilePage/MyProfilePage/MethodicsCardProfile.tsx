"use client";

import { CategoriesFrThCarouselData } from "@/constant/common/CategoriesFrThCarouselData";
import FrameWrapper from "@/components/common/FrameWrapper";
import Link from "next/link";

import { useWindowWidth } from "@/hooks/useWindowWidth";
import TwoFrameButton from "@/components/common/TwoFrameButton";


type MethodCardType = (typeof CategoriesFrThCarouselData)[number];

interface Props {
  item: MethodCardType;
}

export default function MethodicsCardProfile({ item }: Props) {
  const { isSmallerThanMd } = useWindowWidth();
  return (
    <div className="flex flex-col">
      <div className="relative flex items-center justify-center">
        <FrameWrapper
          src={item.metodicSrc}
          alt={item.alt}
          paddingX={isSmallerThanMd ? 23 : 31}
          paddingY={isSmallerThanMd ? 29 : 40}
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="w-full flex justify-center">
          <h3 className="h-15 md:h-28 mt-5 flex text-center justify-center items-center heading-3 w-10/12 md:w-5/6 uppercase">
            {item.title}
          </h3>
        </div>
        <div className="flex items-left w-full md:w-5/6">
        <p className="heading-4 text-left text-[16px] sm:text-[18px] w-full md:w-[90%] mt-5 h-12 opacity-50">
          {item.descriptionPageFaq}
        </p>
        </div>
        <div className="mt-6 md:mt-4 flex justify-between w-full md:w-5/6">
          <Link href={`/sections/${item.slug}`} className="heading-6 underline">
            Дізнатися більше
          </Link>
          <span className="heading-3 text-brand-gray">{item.price}</span>
        </div>
        <div className="flex justify-center mt-6">
          <TwoFrameButton variant="one" label="Придбати" />
        </div>
      </div>
    </div>
  );
}
