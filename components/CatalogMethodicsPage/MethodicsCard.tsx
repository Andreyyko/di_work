"use client";

import { useEffect, useState } from "react";
import { CategoriesFrThCarouselData } from "@/constant/common/CategoriesFrThCarouselData";
import FrameWrapper from "@/components/common/FrameWrapper";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useWindowWidth } from "@/hooks/useWindowWidth";
import TwoFrameButton from "@/components/common/TwoFrameButton";
import { assignMethodSectionToUser } from "@/api/user-method-sections";
import { grantMakCardsAccess } from "@/api/mind-maps-api";
import { saveOrderReference } from "@/lib/paymentOrderReference";

type MethodCardType = (typeof CategoriesFrThCarouselData)[number];
type MethodCardWithFlags = MethodCardType & { isMakCards?: boolean; owned?: boolean };

interface Props {
  item: MethodCardWithFlags;
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

  const isMakCards = item.isMakCards === true;

  // якщо користувач уже має цей розділ / МАК-карти – вважаємо, що "Придбано"
  const owned = item.owned === true;

  useEffect(() => {
    setIsAssigned(owned);
  }, [owned]);

  const handleAssignClick = async () => {
    if (isAssigning) return;
    // Для МАК-карток — окрема логіка купівлі/доступу
    if (isMakCards) {
      setAssignError(null);
      setIsAssigning(true);
      try {
        // Якщо вже є доступ – просто відкриваємо МАК-карти
        if (owned) {
          router.push("/mak-cards");
          return;
        }

        const makAccessResult = await grantMakCardsAccess();
        const error =
          "error" in makAccessResult ? makAccessResult.error : undefined;
        if (error) {
          if (error === "Необхідно увійти в систему") {
            router.push("/auth/sign-in");
            return;
          }
          setAssignError(error);
          return;
        }
        if (makAccessResult.ok) {
          if (
            "status" in makAccessResult &&
            makAccessResult.status === "payment_required" &&
            typeof makAccessResult.paymentUrl === "string"
          ) {
            saveOrderReference("mak", makAccessResult.orderReference);
            window.location.href = makAccessResult.paymentUrl;
            return;
          }
          setIsAssigned(true);
          router.push("/mak-cards");
        }
      } catch (e) {
        const msg =
          e instanceof Error ? e.message : "Не вдалося відкрити МАК-карти";
        setAssignError(msg);
      } finally {
        setIsAssigning(false);
      }
      return;
    }

    // Звичайний розділ: якщо вже куплений – просто відкриваємо
    if (owned) {
      router.push(
        `/payment-return?kind=section&category=${encodeURIComponent(item.slug)}`
      );
      return;
    }

    if (!methodSectionId) return;
    setAssignError(null);
    setIsAssigning(true);
    try {
      const result = await assignMethodSectionToUser(methodSectionId, {
        categorySlug: item.slug,
      });
      if (
        "status" in result &&
        result.status === "payment_required" &&
        "orderReference" in result &&
        typeof result.orderReference === "string" &&
        "paymentUrl" in result &&
        typeof result.paymentUrl === "string"
      ) {
        saveOrderReference("section", result.orderReference);
        window.location.href = result.paymentUrl;
        return;
      }
      setIsAssigned(true);
      router.push(
        `/payment-return?kind=section&category=${encodeURIComponent(item.slug)}`
      );
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
    (!isMakCards && !owned && !methodSectionId) ||
    isLoadingSectionId ||
    isAssigning;

  const isOwnedOrAssigned = owned || isAssigned;

  const buttonLabel = isOwnedOrAssigned
    ? isMakCards
      ? "Відкрити МАК-карти"
      : "Відкрити розділ"
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
          <h3 className="h-15 md:h-28 mt-10 flex text-center justify-center items-center heading-3 w-10/12 md:w-11/12 uppercase">
            {item.title}
          </h3>
        </div>
        <div className="flex items-left w-full">
          <p className="heading-4 text-left text-[16px] sm:text-[18px] w-[80%] mt-10 h-12 opacity-50">
            {item.descriptionPageFaq}
          </p>
        </div>
        <div className="mt-6 md:mt-4 flex justify-between w-full">
          <Link
            href={isMakCards ? "/mak-gallery" : `/sections/${item.slug}`}
            className="heading-6 underline"
          >
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
