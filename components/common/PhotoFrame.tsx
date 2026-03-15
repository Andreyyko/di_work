import Image, { StaticImageData } from "next/image";
import { gold_frame } from "@/public/images/CommonImages/GoldFrameImage";
import { white_letter } from "@/public/images/CommonImages/PostCard";

type Src = string | StaticImageData;
type LetterVariant = "default" | "large" | "none";

type Props = {
  src: Src;
  alt?: string;
  frameAlt?: string;

  width?: number | string;
  mobileWidth?: number | string;

  padding?: string | number;
  paddingTop?: string | number;
  paddingBottom?: string | number;
  paddingLeft?: string | number;
  paddingRight?: string | number;

  letterVariant?: LetterVariant;
};

export default function PhotoFrame({
  src,
  alt = "inner image",
  frameAlt = "frame",

  width,
  mobileWidth,

  padding = "10%",
  paddingTop = "13%",
  paddingBottom = "13%",
  paddingLeft,
  paddingRight,

  letterVariant = "default",
}: Props) {
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

  const renderContent = () => (
    <>
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

      {letterVariant !== "none" && (
        <div
          className={`absolute block md:hidden ${
            letterVariant === "default" ? "-rotate-25" : "rotate-15"
          }`}
          style={{
            width: letterVariant === "default" ? "140px" : "250px",
            height: letterVariant === "default" ? "140px" : "200px",
            top: letterVariant === "default" ? "60%" : "65%",
            left: letterVariant === "default" ? "65%" : "60%",
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
      )}
    </>
  );

  return (
    <>
      <div
        className="relative inline-block max-w-full sm:hidden"
        style={{
          width: mobileWidth
            ? convert(mobileWidth)
            : width
            ? convert(width)
            : "auto",
        }}
      >
        {renderContent()}
      </div>

      <div
        className="relative hidden md:inline-block max-w-full"
        style={{
          width: width ? convert(width) : "auto",
        }}
      >
        {renderContent()}
      </div>
    </>
  );
}
