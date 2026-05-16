"use client";

import { usePricing } from "@/hooks/usePricing";
import { formatPrice } from "@/lib/formatPrice";

export type PriceKind = "section" | "medium" | "premium" | "mak";

type Props = {
  kind: PriceKind;
  className?: string;
};

function amountForKind(
  kind: PriceKind,
  pricing: NonNullable<ReturnType<typeof usePricing>["pricing"]>
): number {
  switch (kind) {
    case "section":
      return pricing.sectionPrice;
    case "medium":
      return pricing.mediumPrice;
    case "premium":
      return pricing.premiumPrice;
    case "mak":
      return pricing.makCardsPrice;
  }
}

export default function PriceLabel({ kind, className }: Props) {
  const { pricing, isLoading } = usePricing();

  if (isLoading || !pricing) {
    return <span className={className} aria-hidden="true" />;
  }

  return (
    <span className={className}>
      {formatPrice(amountForKind(kind, pricing), pricing.currency)}
    </span>
  );
}
