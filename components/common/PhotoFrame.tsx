import Image, { StaticImageData } from "next/image";
import { gold_frame } from "@/public/images/CommonImages/GoldFrameImage";

type Src = string | StaticImageData;

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
          src={src}                 
          alt={alt}
          fill                      
          sizes="100vw"             
          draggable={false}
          style={{
            objectFit: "contain",
            display: "block",
            userSelect: "none",
            pointerEvents: "none",
          }}
        />
      </div>

      <Image
        src={gold_frame.GOLD_FRAME}
        alt={frameAlt}
        draggable={false}
        style={{
          display: "block",
          width: "100%",
          height: "auto",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />
    </div>
  );
}
