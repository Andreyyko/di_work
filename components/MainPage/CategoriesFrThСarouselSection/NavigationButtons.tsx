"use client";

import ArrowButton from "@/components/common/ArrowButton";

// Props type for NavigationButtons
interface NavigationButtonsProps {
  moveLeft: () => void;
  moveRight: () => void;
}

export default function NavigationButtons({
  moveLeft,
  moveRight,
}: NavigationButtonsProps) {
  return (
    <>
      <ArrowButton
        direction="left"
        onClick={moveLeft}
        className="absolute left-[1%] sm:left-[15%] md:left-[21%] top-11/12  md:top-8/12 lg:top-7/12 xl:top-6/12 -translate-y-1/2 z-50"
      />

      <ArrowButton
        direction="right"
        onClick={moveRight}
        className="absolute right-[1%] sm:right-[15%] md:right-[21%] top-11/12 md:top-8/12 lg:top-7/12 xl:top-6/12  -translate-y-1/2 z-50"
      />
    </>
  );
}
