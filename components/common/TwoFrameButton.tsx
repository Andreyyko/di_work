"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import { frames_buttons } from "@/public/images/CommonImages/FramesButton";

type Variant = "one" | "two";

type TwoFrameButtonProps = {
  variant: Variant;
  label: string;

  width?: number;
  height?: number;
  inset?: number | string;

  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit"; // ⭐ додано

  alt?: string;
  className?: string;

  textClassOne?: string;
  textClassTwo?: string;
  textClassTwoHover?: string;
};

const FRAMES: Record<Variant, StaticImageData> = {
  one: frames_buttons.GOLD_BUTTON,
  two: frames_buttons.RED_BUTTON,
};

const FRAMES_HOVER: Partial<Record<Variant, StaticImageData>> = {
  two: frames_buttons.RED_BUTTON_HOVER,
};

const toCss = (v?: number | string) =>
  v === undefined ? undefined : typeof v === "number" ? `${v}px` : v;

const TwoFrameButton: React.FC<TwoFrameButtonProps> = ({
  variant,
  label,
  width = 324,
  height = 213,
  inset = "8%",
  onClick,
  disabled = false,
  type = "button", // ⭐ дефолт

  alt = "button frame",
  className = "",

  textClassOne = "heading-4 text-brand-gold tracking-tighter w-[70%] uppercase font-kudriashov text-[clamp(14px,2vw,19px)]",
  textClassTwo = "heading-4 text-red-800 font-kudriashov uppercase text-[clamp(14px,2vw,19px)]",
  textClassTwoHover = "heading-4 text-white font-kudriashov uppercase text-[clamp(14px,2vw,19px)]",
}) => {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);

  const baseSrc = FRAMES[variant];
  const hoverSrc = FRAMES_HOVER[variant];

  const isHoverLike =
    !disabled && variant === "two" && (hover || active);

  const currentSrc = isHoverLike && hoverSrc ? hoverSrc : baseSrc;
  const insetCss = toCss(inset) ?? "0";

  const textClass =
    variant === "one"
      ? textClassOne
      : isHoverLike
      ? textClassTwoHover
      : textClassTwo;

  const handleClick = () => {
    if (disabled) return;
    if (variant === "two") setActive((v) => !v);
    onClick?.();
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
    if (disabled) return;
    if (variant !== "two") return;

    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      setActive((v) => !v);
      onClick?.();
    }
  };

  return (
    <button
      type={type} 
      disabled={disabled}
      aria-disabled={disabled}
      aria-pressed={variant === "two" ? active : undefined}
      data-state={active ? "active" : "inactive"}
      className={className}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => !disabled && setHover(true)}
      onMouseLeave={() => !disabled && setHover(false)}
      onTouchStart={() => !disabled && setHover(true)}
      onTouchEnd={() => !disabled && setHover(false)}
      style={{
        position: "relative",
        display: "inline-block",
        lineHeight: 0,
        cursor: disabled ? "not-allowed" : "pointer",
        width: `${width}px`,
        height: "auto",
        maxWidth: "100%",
        opacity: disabled ? 0.5 : 1,
        background: "transparent",
        border: "none",
        padding: 0,
        transition: "opacity 0.2s ease",
        pointerEvents: disabled ? "none" : "auto",
      }}
    >
      <Image
        src={currentSrc}
        alt={alt}
        width={width}
        height={height}
        style={{
          display: "block",
          width: "100%",
          height: "auto",
          userSelect: "none",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: insetCss,
          left: insetCss,
          right: insetCss,
          bottom: insetCss,
          display: "grid",
          placeItems: "center",
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        <span className={textClass}>{label}</span>
      </div>
    </button>
  );
};

export default TwoFrameButton;
