"use client";

import React, { forwardRef, useMemo } from "react";
import Image, { StaticImageData } from "next/image";
import { ornament_item } from "@/public/images/CommonImages/OrnamentIcon";

export type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";
export type ImgSrc = string | StaticImageData;

export type FrameWrapperForCarouselProps = {
  width: string | number;
  height: string | number;
  borderRadius?: string;
  frameColor?: string;
  frameThickness?: string;
  showOrnaments?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  ornaments?: Ornament[];
  offsetX?: number;
  offsetY?: number;
  defaultOrnamentSrc?: ImgSrc;
};

export type Ornament = {
  src?: ImgSrc;
  position?: Corner;
  offsetX?: number;
  offsetY?: number;
  rotate?: number;
  flipH?: boolean;
  flipV?: boolean;
  width?: number;
  height?: number;
  opacity?: number;
  zIndex?: number;
  pointerEvents?: "auto" | "none";
};

const basePos: React.CSSProperties = {
  position: "absolute",
  zIndex: 2,
};

const cornerStyle = (
  position: Corner,
  offX = 0,
  offY = 0
): React.CSSProperties => {
  switch (position) {
    case "top-left":
      return {
        ...basePos,
        top: 0,
        left: 0,
        transform: `translate(-50%, -50%) translate(${offX}px, ${offY}px)`,
      };
    case "top-right":
      return {
        ...basePos,
        top: 0,
        right: 0,
        transform: `translate(50%, -50%) translate(${offX}px, ${offY}px)`,
      };
    case "bottom-left":
      return {
        ...basePos,
        bottom: 0,
        left: 0,
        transform: `translate(-50%, 50%) translate(${offX}px, ${offY}px)`,
      };
    case "bottom-right":
      return {
        ...basePos,
        bottom: 0,
        right: 0,
        transform: `translate(50%, 50%) translate(${offX}px, ${offY}px)`,
      };
    default:
      return {
        ...basePos,
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -50%) translate(${offX}px, ${offY}px)`,
      };
  }
};

const concatTransforms = (
  ...parts: Array<string | undefined>
): string | undefined => {
  const s = parts.filter(Boolean).join(" ");
  return s || undefined;
};

const FrameWrapperForCarousel = forwardRef<
  HTMLDivElement,
  FrameWrapperForCarouselProps
>(
  (
    {
      width,
      height,
      borderRadius = "0px",
      frameColor = "var(--color-brand-lightgray)",
      frameThickness = "2px",
      showOrnaments = false,
      className,
      style,
      children,
      ornaments,
      defaultOrnamentSrc = ornament_item.ORNAMENT,
    },
    ref
  ) => {
    // Padding when ornaments ON vs OFF
    const paddingValue = showOrnaments
      ? "28px 34px"
      : "17px";

    // DEFAULT ORNAMENTS (top-right flipped to look in other direction)
    const defaultOrnamentsArr: Ornament[] = useMemo(
      () => [
        {
          position: "top-right",
          offsetX: -8,
          offsetY: 16,
          width: 40,
          flipH: true, // ← РОЗВЕРТАЄ В ІНШУ СТОРОНУ
        },
        {
          position: "top-left",
          offsetX: 8,
          offsetY: 16,
          width: 40,
        },
        {
          position: "bottom-right",
          offsetX: -8,
          offsetY: -16,
          width: 40,
          rotate: 180,
        },
        {
          position: "bottom-left",
          offsetX: 8,
          offsetY: -16,
          width: 40,
          flipV: true,
        },
      ],
      []
    );

    const ornamentsToRender = ornaments?.length
      ? ornaments
      : defaultOrnamentsArr;

    return (
      <div
        ref={ref}
        className={className}
        style={{
          position: "relative",
          width,
          height,
          padding: paddingValue,
          ...style,
        }}
      >
        {/* IMAGE AREA */}
        <div
          style={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
            borderRadius,
            position: "relative",
            zIndex: 1,
          }}
        >
          {children}
        </div>

        {/* FRAME BORDER */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            border: `${frameThickness} solid ${frameColor}`,
            borderRadius,
            pointerEvents: "none",
            zIndex: 2,
            boxShadow:
              "2px 2px 1px rgba(224,220,208,1), inset 2px 2px 1px rgba(224,220,208,1)",
          }}
        />

        {/* ORNAMENTS */}
        {showOrnaments &&
          ornamentsToRender.map((o, i) => {
            const pos = o.position ?? "top-right";
            const corner = cornerStyle(
              pos,
              o.offsetX ?? 0,
              o.offsetY ?? 0
            );

            const scaleX = o.flipH ? -1 : 1;
            const scaleY = o.flipV ? -1 : 1;

            const transform = concatTransforms(
              corner.transform as string,
              `scale(${scaleX}, ${scaleY})`,
              `rotate(${o.rotate ?? 0}deg)`
            );

            const ornamentSrc = o.src ?? defaultOrnamentSrc;

            return (
              <Image
                key={i}
                src={ornamentSrc}
                alt=""
                width={o.width ?? 80}
                height={o.height ?? o.width ?? 80}
                style={{
                  ...corner,
                  transform,
                  opacity: o.opacity ?? 0.9,
                  zIndex: o.zIndex ?? 5,
                  pointerEvents: o.pointerEvents ?? "none",
                }}
              />
            );
          })}
      </div>
    );
  }
);

FrameWrapperForCarousel.displayName = "FrameWrapperForCarousel";

export default FrameWrapperForCarousel;
