import Image, { StaticImageData } from "next/image";
import CustomSeal from "./CustomSeal";
import { ornament_item } from "@/public/images/OrnamentIcon";

type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";
type ImgSrc = string | StaticImageData;

type Ornament = {
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

type FrameWrapperProps = {
  src?: ImgSrc;
  alt?: string;

  frameColor?: string;
  frameThickness?: string;
  gap?: string;
  borderRadius?: string;

  width?: string;
  height?: string;

  fill?: boolean;    
  
  shadow?: boolean;

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
  children?: React.ReactNode;
};

const FrameWrapper: React.FC<FrameWrapperProps> = ({
  src,
  alt = "",

  frameColor = "#E9E7E1",
  frameThickness = "4px",
  gap = "20px",
  borderRadius = "0px",

  width = "auto",
  height = "auto",

  fill = false,
  
  shadow = true,

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

  children,
}) => {
  const shadowStyle = shadow
    ? `${frameThickness} 2px 10px rgba(224, 220, 208, 1)`
    : "none";

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

  const computedButtonSide: "right" | "left" =
    sealButtonSide ??
    (sealPosition === "top-right" || sealPosition === "bottom-right" ? "right" : "right");

  const defaultOrnamentsArr: Ornament[] = [
    { position: "top-right",    offsetX: -8,  offsetY: 16,  width: 40, rotate:   0, flipH: true,  flipV: false, opacity: 1 },
    { position: "top-left",     offsetX:  8,  offsetY: 16,  width: 40, rotate:   0, flipH: false, flipV: false, opacity: 1 },
    { position: "bottom-right", offsetX: -8,  offsetY: -16, width: 40, rotate: 180, flipH: false, flipV: false, opacity: 1 },
    { position: "bottom-left",  offsetX:  8,  offsetY: -16, width: 40, rotate:   0, flipH: false, flipV: true,  opacity: 1 },
  ];

  const setOrnaments = ornaments?.length ? ornaments : defaultOrnamentsArr;

  return (
    <div
      style={{
        display: "inline-block",
        position: "relative",
        padding: gap,
        borderRadius: `calc(${borderRadius} + ${frameThickness})`,
        width,
        height,
      }}
    >
      <div
        style={{
          position: "relative",
          zIndex: 1,
          borderRadius,
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
        }}
      >
        {children ? (
          <div style={{ width: "100%", height: "100%" }}>{children}</div>
        ) : src ? (
          fill ? (
            <div style={{ position: "relative" }}>
              <Image
                src={src}
                alt={alt}
                fill
                style={{
                  objectFit: "cover",
                  borderRadius,
                  position: "absolute",
                  inset: 0,
                }}
                priority={false}
              />
            </div>
          ) : (
            <Image
              src={src}
              alt={alt}
              style={{
                display: "block",
                height: "auto",
                borderRadius,
                position: "relative",
              }}
              priority={false}
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
          boxShadow: shadowStyle,
        }}
      />

      {showOrnaments &&
        setOrnaments.map((o, i) => {
          const pos = o.position ?? "top-right";
          const style = cornerStyle(pos, o.offsetX ?? 0, o.offsetY ?? 0);
          const scaleX = o.flipH ? -1 : 1;
          const scaleY = o.flipV ? -1 : 1;
          const rotate = ` rotate(${o.rotate ?? 0}deg)`;
          const extraTransform = (style.transform ?? "") + ` scale(${scaleX}, ${scaleY})` + rotate;
          const ornamentSrc = o.src ?? defaultOrnamentSrc;

          return (
            <Image
              key={i}
              src={ornamentSrc}
              alt=""
              width={o.width ?? 80}
              height={o.height ?? (o.width ?? 80)}
              style={{
                ...style,
                transform: extraTransform,
                opacity: o.opacity ?? 0.9,
                zIndex: o.zIndex ?? 3,
                pointerEvents: o.pointerEvents ?? "none",
                height: "auto",
                filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.05))",
              }}
              priority={false}
            />
          );
        })}
      {showSeal && (
        <div style={{ ...cornerStyle(sealPosition, sealOffsetX, sealOffsetY), zIndex: 4 }}>
          <div style={{ width: sealSize, height: sealSize, position: "relative" }}>
            <CustomSeal
              label={sealLabel}
              onClick={onSealClick}
              disabled={sealDisabled}
              className=""
              position={computedButtonSide}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FrameWrapper;
