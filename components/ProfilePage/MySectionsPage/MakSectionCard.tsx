"use client";

import FrameWrapper from "@/components/common/FrameWrapper";
import Link from "next/link";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import TwoFrameButton from "@/components/common/TwoFrameButton";
import makBoxPreview from "@/public/images/MakGallery/book_preview.svg";

export default function MakSectionCard() {
  const { isSmallerThanMd } = useWindowWidth();

  return (
    <div className="flex flex-col">
      <div className="relative flex items-center justify-center">
        <FrameWrapper
          src={makBoxPreview}
          alt="РОК МАК be unique «Ресурс SenseDia»"
          paddingX={isSmallerThanMd ? 23 : 31}
          paddingY={isSmallerThanMd ? 29 : 40}
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="w-full flex justify-center">
          <h3 className="h-15 md:h-28 mt-5 flex text-center justify-center items-center heading-3 w-10/12 md:w-5/6 uppercase">
            РОК МАК be unique «Ресурс SenseDia»
          </h3>
        </div>
        <div className="flex items-left w-full md:w-5/6">
          <p className="heading-4 text-left text-[16px] sm:text-[18px] w-full md:w-[90%] mt-5 h-12 opacity-50">
            Авторська збірка метафоричних асоціативних картин для роботи з
            емоціями та ресурсами.
          </p>
        </div>
        <div className="mt-6 md:mt-4 flex justify-start w-full md:w-5/6">
          <Link href="/mak-gallery" className="heading-6 underline">
            Дізнатися більше
            <span className="sr-only"> про РОК МАК be unique «Ресурс SenseDia»</span>
          </Link>
        </div>
        <div className="flex justify-center mt-6">
          <Link href="/mak-cards" className="block">
            <TwoFrameButton variant="one" label="Відкрити МАК карти" />
          </Link>
        </div>
      </div>
    </div>
  );
}
