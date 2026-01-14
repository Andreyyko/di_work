"use client";

import React, { useState } from "react";
import Image from "next/image";

import redButton from "@/public/images/CommonImages/FramesButton/RedButton.svg";
import redButtonFrame from "@/public/images/CommonImages/FramesButton/RedButtonFrame.svg";
import goldButton from "@/public/images/CommonImages/FramesButton/GoldButton.svg";
import modalButton from "@/public/images/CommonImages/FramesButton/ButtonModal.svg";

type Variant = "one" | "two" | "three";

export type TwoFrameButtonProps = {
  variant: Variant;
  label: string;
  isActive?: boolean;
  isFaq?: boolean;
  onActivate?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit";
};

const TwoFrameButton: React.FC<TwoFrameButtonProps> = ({
  variant,
  label,
  isActive = false,
  isFaq = false,
  onActivate,
  disabled = false,
  type = "button",
  className = "",
}) => {
  const [hover, setHover] = useState(false);
  const [pressed, setPressed] = useState(false);

  const interactive = !disabled && (hover || isActive);

  const scale = disabled ? 1 : pressed ? 0.985 : interactive ? 1.015 : 1;
  const translateY = disabled ? 0 : pressed ? 0.5 : interactive ? -1.5 : 0;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={() => !disabled && onActivate?.()}
      onMouseEnter={() => !disabled && setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setPressed(false);
      }}
      onMouseDown={() => !disabled && setPressed(true)}
      onMouseUp={() => setPressed(false)}
      className={`relative inline-block ${className}`}
      style={{
        border: "none",
        background: "transparent",
        padding: 0,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      <div
        className={`relative ${
          isFaq ? " overflow-hidden h-23 sm:h-auto" : ""
        }  w-[324px] max-w-full`}
        style={{
          aspectRatio: "324 / 213",
          transform: `translateY(${translateY}px) scale(${scale})`,
          transition: "transform 620ms cubic-bezier(0.25, 0.8, 0.25, 1)",
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

            <div
              className="absolute inset-0 grid place-items-center font-kudriashov uppercase leading-4 text-[clamp(12px,4vw,19px)] transition-colors duration-400"
              style={{
                color: interactive ? "#8C6A4D" : "#9E7557",
              }}
            >
              {typeof label === "string"
                ? (() => {
                    const words = label.split(" ");
                    return (
                      <>
                        {words[0]}
                        <br />
                        {words.slice(1).join(" ")}
                      </>
                    );
                  })()
                : label}
            </div>
          </>
        )}

        {variant === "two" && (
          <>
            <Image
              src={interactive ? redButtonFrame : redButton}
              alt="red button"
              fill
              className="absolute object-contain pointer-events-none transition-opacity duration-400"
            />

            <div
              className={`absolute inset-[8%] grid place-items-center uppercase leading-4 md:leading-6 md:tracking-[-2px] font-kudriashov transition-colors duration-400 ${
                isFaq
                  ? "text-[14px] sm:text-[20px] md:text-[22px] lg:text-[25px]"
                  : "text-[clamp(12px,4vw,18px)]"
              }`}
              style={{
                color: interactive ? "white" : "#67161F",
              }}
            >
              {label}
            </div>
          </>
        )}

        {variant === "three" && (
          <>
            <Image
              src={modalButton}
              alt="red button"
              fill
              className="absolute object-contain pointer-events-none transition-opacity duration-400"
            />

            <div
              className={`absolute inset-[8%] grid place-items-center uppercase leading-4 md:leading-6 md:tracking-[-2px] font-kudriashov transition-colors duration-400 ${
                isFaq
                  ? "text-[14px] sm:text-[20px] md:text-[22px] lg:text-[25px]"
                  : "text-[clamp(12px,4vw,18px)]"
              }`}
              style={{
                color: interactive ? "white" : "white",
              }}
            >
              {label}
            </div>
          </>
        )}
      </div>
    </button>
  );
};

export default TwoFrameButton;
