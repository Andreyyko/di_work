"use client";

import React, { useState } from "react";
import Image from "next/image";

import redButton from "@/public/images/CommonImages/FramesButton/RedButton.svg";
import redButtonFrame from "@/public/images/CommonImages/FramesButton/RedButtonFrame.svg";
import goldButton from "@/public/images/CommonImages/FramesButton/GoldButton.svg";

type Variant = "one" | "two";

export type TwoFrameButtonProps = {
  variant: Variant;
  label: string;
  isActive?: boolean;
  onActivate?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit";
};

const TwoFrameButton: React.FC<TwoFrameButtonProps> = ({
  variant,
  label,
  isActive = false,
  onActivate,
  disabled = false,
  type = "button",
  className = "",
}) => {
  const [hover, setHover] = useState(false);

  const showHover = !disabled && (hover || isActive);

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={() => !disabled && onActivate?.()}
      onMouseEnter={() => !disabled && setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`relative block w-full max-w-[324px] aspect-324/213 ${className}`}
      style={{
        border: "none",
        background: "transparent",
        padding: 0,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {variant === "one" && (
        <>
          <Image
            src={goldButton}
            alt="gold button"
            fill
            className="absolute object-contain pointer-events-none"
          />

          <div className="absolute inset-0 grid place-items-center font-kudriashov uppercase text-[#9E7557] text-[clamp(12px,4vw,19px)]">
            {label}
          </div>
        </>
      )}

      {variant === "two" && (
        <>
          <Image
            src={showHover ? redButtonFrame : redButton}
            alt="button"
            fill
            className="absolute object-contain pointer-events-none transition-all duration-150"
          />

          <div
            className="absolute inset-[8%] grid place-items-center uppercase font-kudriashov text-[clamp(12px,4vw,18px)] transition-colors duration-150"
            style={{
              color: showHover ? "white" : "#67161F",
            }}
          >
            {label}
          </div>
        </>
      )}
    </button>
  );
};

export default TwoFrameButton;
