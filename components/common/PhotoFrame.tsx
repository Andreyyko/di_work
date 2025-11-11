import { gold_frame } from "@/public/images/GoldFrameImage";
import Image from "next/image";

type Src = string | { src: string } | any;

const toUrl = (x: unknown): string => {
  if (typeof x === "string") return x;
  if (x && typeof x === "object" && "src" in x) {
    const srcVal = (x as any).src;
    if (typeof srcVal === "string") return srcVal;
    if (srcVal && typeof srcVal === "object" && "src" in srcVal && typeof srcVal.src === "string") {
      return srcVal.src;
    }
  }
  if (process.env.NODE_ENV !== "production") {
    console.warn("PhotoFrame: неможливо витягнути URL із значення", x);
  }
  return "";
};

export default function PhotoFrame({
  src,
  alt = "",
  frameAlt = "frame",
  width,
  inset = "12%",
}: {
  src: Src;
  alt?: string;
  frameAlt?: string;
  width?: number | string;
  inset?: string | number;
}) {
  const inCss = typeof inset === "number" ? `${inset}px` : inset;

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        width: width ? (typeof width === "number" ? `${width}px` : width) : "auto",
        maxWidth: "100%",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: inCss,
          left: inCss,
          right: inCss,
          bottom: inCss,
        }}
      >
        <Image
          src={toUrl(src)}
          alt={alt}
          draggable={false}
          style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
        />
      </div>

      <Image
        src={toUrl(gold_frame.GOLD_FRAME)}
        alt={frameAlt}
        draggable={false}
        style={{ display: "block", width: "100%", height: "auto", pointerEvents: "none", userSelect: "none" }}
      />
    </div>
  );
}
