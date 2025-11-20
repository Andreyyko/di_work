"use client";

import React, { useMemo, forwardRef } from "react";
import Image, { StaticImageData } from "next/image";
import CustomSeal from "./CustomSeal";
import { ornament_item } from "@/public/images/CommonImages/OrnamentIcon";

export type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";
export type ImgSrc = string | StaticImageData;

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

export type FrameWrapperProps = {
  src?: ImgSrc;
  alt?: string;
  frameColor?: string;
  frameThickness?: string;
  gap?: string;
  paddingX?: number | string;
  paddingY?: number | string;
  borderRadius?: string;
  width?: string;
  height?: string;
  fill?: boolean;
  imgWidth?: number;
  imgHeight?: number;
  objectFit?: React.CSSProperties["objectFit"];
  objectPosition?: React.CSSProperties["objectPosition"];
  shadow?: boolean;
  outerShadowValue?: string;
  innerShadowValue?: string;
  outlineWidth?: string;
  outlineColor?: string;
  outlineInset?: string;
  showSeal?: boolean;
  sealPosition?: Exclude<Corner, "center">;
  sealSize?: number;
  sealOffsetX?: number;
  sealOffsetY?: number;
  sealLabel?: string;
  sealDisabled?: boolean;
  onSealClick?: () => void;
  sealButtonSide?: "right" | "left";
  showOrnaments?: boolean;
  defaultOrnamentSrc?: ImgSrc;
  ornaments?: Ornament[];
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

const toCss = (v?: string | number) =>
  v === undefined ? undefined : typeof v === "number" ? `${v}px` : v;

const basePos: React.CSSProperties = { position: "absolute", zIndex: 2 };

const cornerStyle = (position: Corner, offX = 0, offY = 0): React.CSSProperties => {
  switch (position) {
    case "top-left":
      return { ...basePos, top: 0, left: 0, transform: `translate(-50%, -50%) translate(${offX}px, ${offY}px)` };
    case "top-right":
      return { ...basePos, top: 0, right: 0, transform: `translate(50%, -50%) translate(${offX}px, ${offY}px)` };
    case "bottom-left":
      return { ...basePos, bottom: 0, left: 0, transform: `translate(-50%, 50%) translate(${offX}px, ${offY}px)` };
    case "bottom-right":
      return { ...basePos, bottom: 0, right: 0, transform: `translate(50%, 50%) translate(${offX}px, ${offY}px)` };
    default:
      return { ...basePos, top: "50%", left: "50%", transform: `translate(-50%, -50%) translate(${offX}px, ${offY}px)` };
  }
};

const concatTransforms = (...parts: Array<string | undefined>): string | undefined => {
  const s = parts.filter(Boolean).join(" ");
  return s || undefined;
};

const FrameWrapper = forwardRef<HTMLDivElement, FrameWrapperProps>(
  (
    {
      src,
      alt = "",
      frameColor = "var(--color-brand-lightgray)",
      frameThickness = "2px",
      gap = "10px",
      paddingX,
      paddingY,
      borderRadius = "0px",
      width = "",
      height = "",
      fill = false,
      imgWidth,
      imgHeight,
      objectFit = "cover",
      objectPosition = "50% 50%",
      shadow = true,
      outerShadowValue,
      outlineColor,
      showSeal = false,
      sealPosition = "bottom-right",
      sealSize = 200,
      sealOffsetX = 0,
      sealOffsetY = 0,
      sealLabel = "ОБРАТИ ТАРИФ",
      sealDisabled = false,
      onSealClick,
      sealButtonSide,
      showOrnaments = false,
      defaultOrnamentSrc = ornament_item.ORNAMENT,
      ornaments,
      className,
      style,
      children,
    },
    ref
  ) => {
    const resolvedPaddingY = useMemo(() => toCss(paddingY) ?? gap, [paddingY, gap]);
    const resolvedPaddingX = useMemo(() => toCss(paddingX) ?? gap, [paddingX, gap]);

    const OUTER =
      outerShadowValue ??
      "2px 2px 1px rgba(224,220,208,1), inset 2px 2px 1px rgba(224,220,208,1)";

    const computedButtonSide: "right" | "left" =
      sealButtonSide ?? (sealPosition.includes("left") ? "left" : "right");

    const defaultOrnamentsArr: Ornament[] = useMemo(
      () => [
        { position: "top-right", offsetX: -8, offsetY: 16, width: 40 },
        { position: "top-left", offsetX: 8, offsetY: 16, width: 40 },
        { position: "bottom-right", offsetX: -8, offsetY: -16, width: 40, rotate: 180 },
        { position: "bottom-left", offsetX: 8, offsetY: -16, width: 40, flipV: true },
      ],
      []
    );

    const ornamentsToRender = ornaments?.length ? ornaments : defaultOrnamentsArr;

    const contentBoxStyle: React.CSSProperties = fill
      ? { width: "100%", height: "100%" }
      : imgWidth && imgHeight
      ? { width: imgWidth, height: "auto" }
      : { width: "auto", height: "auto" };

    return (
      <div
        ref={ref}
        style={{
          display: "auto",
          position: "relative",
          padding: `${resolvedPaddingY} ${resolvedPaddingX}`,
          borderRadius: `calc(${borderRadius} + ${frameThickness})`,
          width,
          height,
          ...style,
        }}
        className={className}
      >
        <div
          style={{
            position: "relative",
            zIndex: 1,
            borderRadius,
            boxSizing: "border-box",
            ...contentBoxStyle,
          }}
        >
          {children ? (
            <div style={{ width: "100%", height: "100%" }}>{children}</div>
          ) : src ? (
            fill ? (
              <div style={{ position: "relative", width: "100%", height: "100%" }}>
                <Image
                  src={src}
                  alt={alt}
                  fill
                  style={{ objectFit, objectPosition, borderRadius, position: "absolute" }}
                />
              </div>
            ) : (
              <Image
                src={src}
                alt={alt}
                width={imgWidth}
                height={imgHeight}
                style={{ display: "block", borderRadius }}
              />
            )
          ) : null}
        </div>

        <div
          style={{
            position: "absolute",
            inset: 0,
            border: `${frameThickness} solid ${frameColor}`,
            borderRadius,
            pointerEvents: "none",
            zIndex: 2,
            boxShadow: shadow ? OUTER : "none",
          }}
        />

        {showOrnaments &&
          ornamentsToRender.map((o, i) => {
            const pos = o.position ?? "top-right";
            const corner = cornerStyle(pos, o.offsetX ?? 0, o.offsetY ?? 0);
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

        {showSeal && (
          <div style={{ ...cornerStyle(sealPosition, sealOffsetX, sealOffsetY), zIndex: 6 }}>
            <div style={{ width: sealSize, height: sealSize, position: "relative" }}>
              <CustomSeal label={sealLabel} onClick={onSealClick} disabled={sealDisabled} position={computedButtonSide} />
            </div>
          </div>
        )}
      </div>
    );
  }
);

FrameWrapper.displayName = "FrameWrapper";
export default FrameWrapper;
