"use client";

import React, { useState } from "react";
import TwoFrameButton, { TwoFrameButtonProps } from "./TwoFrameButton";

type GroupButton = Omit<TwoFrameButtonProps, "isActive" | "onActivate">;

export type TwoFrameButtonGroupProps = {
  buttons: GroupButton[];
  className?: string;
};

const TwoFrameButtonGroup: React.FC<TwoFrameButtonGroupProps> = ({
  buttons,
  className = "",
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className={`flex gap-4 ${className}`}>
      {buttons.map((btn, index) => (
        <TwoFrameButton
          key={index}
          {...btn}
          isActive={activeIndex === index && btn.variant === "two"}
          onActivate={() => btn.variant === "two" && setActiveIndex(index)}
        />
      ))}
    </div>
  );
};

export default TwoFrameButtonGroup;
