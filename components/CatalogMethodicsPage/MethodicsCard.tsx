"use client";

import { useState } from "react";
import { CategoriesFrThCarouselData } from "@/constant/common/CategoriesFrThCarouselData";
import FrameWrapper from "@/components/common/FrameWrapper";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useWindowWidth } from "@/hooks/useWindowWidth";
import TwoFrameButton from "@/components/common/TwoFrameButton";
import { assignMethodSectionToUser } from "@/api/user-method-sections";

type MethodCardType = (typeof CategoriesFrThCarouselData)[number];

interface Props {
  item: MethodCardType;
  methodSectionId?: number;
  isLoadingSectionId?: boolean;
}

export default function MethodCard({
  item,
  methodSectionId,
  isLoadingSectionId,
}: Props) {
  const router = useRouter();
  const { isSmallerThanMd } = useWindowWidth();
  const [isAssigning, setIsAssigning] = useState(false);
  const [assignError, setAssignError] = useState<string | null>(null);
  const [isAssigned, setIsAssigned] = useState(false);

  const handleAssignClick = async () => {
    if (!methodSectionId || isAssigning) return;
    setAssignError(null);
    setIsAssigning(true);
    try {
      await assignMethodSectionToUser(methodSectionId);
      setIsAssigned(true);
      router.push(`/methodics-sections/${item.slug}`);
    } catch (error) {
      const msg =
        error instanceof Error
          ? error.message
          : "Не вдалося придбати розділ";
      setAssignError(msg);
    } finally {
      setIsAssigning(false);
    }
  };

  const isButtonDisabled =
    !methodSectionId || isLoadingSectionId || isAssigning || isAssigned;

  const buttonLabel = isAssigned
    ? "Придбано"
    : isAssigning
    ? "Оформлення..."
    : "Придбати";

  return (
    <div className="flex flex-col mx-0.5">
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
          <h3 className="h-15 md:h-28 mt-5 flex text-center justify-center items-center heading-3 w-10/12 md:w-11/12 uppercase">
            {item.title}
          </h3>
        </div>
        <div className="flex items-left w-full">
          <p className="heading-4 text-left text-[16px] sm:text-[18px] w-[80%] mt-5 h-12 opacity-50">
            {item.descriptionPageFaq}
          </p>
        </div>
        <div className="mt-6 md:mt-4 flex justify-between w-full">
          <Link href={`/sections/${item.slug}`} className="heading-6 underline">
            Дізнатися більше
          </Link>
          <span className="heading-3 text-brand-gray">{item.price}</span>
        </div>
        <div className="flex flex-col items-center mt-6 w-full">
          <TwoFrameButton
            variant="one"
            label={buttonLabel}
            disabled={isButtonDisabled}
            onActivate={handleAssignClick}
          />
        </div>
      </div>
    </div>
  );
}
