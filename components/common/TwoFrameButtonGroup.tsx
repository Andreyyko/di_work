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
      <div className="grid  lg:grid-cols-1   gap-4">
        <div className="flex flex-wrap items-center  justify-center">
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
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TwoFrameButtonGroup;
