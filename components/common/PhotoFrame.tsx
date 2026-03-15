import Image, { StaticImageData } from "next/image";
import { gold_frame } from "@/public/images/CommonImages/GoldFrameImage";
import { white_letter } from "@/public/images/CommonImages/PostCard";


type Src = string | StaticImageData;

export default function PhotoFrame({
  src,
  alt = "inner image",
  frameAlt = "frame",
  width,

  padding = "10%",
  paddingTop = "13%",
  paddingBottom = "13%",
  paddingLeft,
  paddingRight,
}: {
  src: Src;
  alt?: string;
  frameAlt?: string;
  width?: number | string;

  padding?: string | number;
  paddingTop?: string | number;
  paddingBottom?: string | number;
  paddingLeft?: string | number;
  paddingRight?: string | number;
}) {
  const convert = (v?: string | number) =>
    typeof v === "number" ? `${v}px` : v;

  const padTop =
    paddingTop !== undefined ? convert(paddingTop) : convert(padding);
  const padBottom =
    paddingBottom !== undefined ? convert(paddingBottom) : convert(padding);
  const padLeft =
    paddingLeft !== undefined ? convert(paddingLeft) : convert(padding);
  const padRight =
    paddingRight !== undefined ? convert(paddingRight) : convert(padding);

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        width: width
          ? typeof width === "number"
            ? `${width}px`
            : width
          : "auto",
        maxWidth: "100%",
      }}
    >
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

      <div
        style={{
          position: "absolute",
          top: padTop,
          left: padLeft,
          right: padRight,
          bottom: padBottom,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          draggable={false}
          className="object-contain object-center"
          style={{
            userSelect: "none",
            pointerEvents: "none",
          }}
        />
      </div>

      <div className="-rotate-25 block lg:hidden"
        style={{
          position: "absolute",
          width: "140px",
          height: "140px",
          top: "60%",
          left: "65%",
          zIndex: 10,
        }}
      >
        <Image
          src={white_letter.WHITE_POSTCARD}
          alt="decor corner"
          fill
          style={{
            objectFit: "contain",
            pointerEvents: "none",
            userSelect: "none",
          }}
        />
      </div>
    </div>
  );
}
