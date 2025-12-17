"use client";

import React, { useState } from "react";
import TwoFrameButton, { TwoFrameButtonProps } from "./TwoFrameButton";

type GroupButton = Omit<TwoFrameButtonProps, "isActive">;

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
    <div className={` ${className}`}>
      <div className="flex flex-wrap items-center mx-2 justify-center">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 md:gap-6 lg:gap-12.5">
          {buttons.map((btn, index) => (
         
            <TwoFrameButton
              key={index}
              {...btn}
              isActive={activeIndex === index && btn.variant === "two"}
              onActivate={() => {
                if (btn.variant !== "two") return;
                setActiveIndex(index);
                btn.onActivate?.();
              }}
              isFaq
            />
          
          ))}
        </div>
      </div>
    </div>
  );
};

export default TwoFrameButtonGroup;
