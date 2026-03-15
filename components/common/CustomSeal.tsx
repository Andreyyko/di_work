import Image from "next/image";
import { seal_icon } from "@/public/images/CommonImages/SealIcon";

interface CustomSealProps {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;

  position?: "right" | "left";       
  desktopPosition?: "right" | "left";

  sealSize?: string;
  smallButton?: boolean;
  hideButtonUntilHover?: boolean;
  responsiveButtonStyle?: boolean;
}

const CustomSeal = ({
  label = "",
  onClick,
  disabled = false,
  className = "",
  position = "right",

  desktopPosition,

  sealSize = "",
  smallButton = false,
  hideButtonUntilHover = false,
  responsiveButtonStyle = false,
}: CustomSealProps) => {

  const oldMobilePos =
    position === "right"
      ? "left-1/2 ml-1"
      : "right-1/2";

  const oldPadding = smallButton
    ? "md:py-2 lg:py-4 md:px-4 lg:px-6 whitespace-normal lg:whitespace-nowrap"
    : "py-2 sm:py-3 md:py-2.5 lg:py-4 px-7 sm:px-4 md:px-6 lg:px-12 whitespace-normal lg:whitespace-nowrap";

  const newMobilePos = "px-15 py-3 left-1/2 -translate-x-[100%] whitespace-nowrap"; 

  const newDesktopPos =
    desktopPosition === "left"
      ? "sm:px-20 md:px-20 lg:left-1/2 lg:-translate-x-[120%]"
      : "sm:px-20 md:px-20 lg:left-1/2 lg:translate-x-[20%]";

  const finalMobilePos = responsiveButtonStyle ? newMobilePos : oldMobilePos;
  const finalDesktopPos = responsiveButtonStyle ? newDesktopPos : "";

  const padding = oldPadding;

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className} ${
        hideButtonUntilHover ? "group" : ""
      }`}
    >
      <Image
        src={seal_icon.SEAL_IMAGE}
        alt="seal"
        className={`select-none pointer-events-none w-39 sm:w-[200px] md:w-40 lg:w-[170px] h-auto ${sealSize}`}
        priority
      />

      {!disabled && (
        <button
          onClick={onClick}
          className={`
            absolute top-1/2 translate-y-[10%]
            ${
              hideButtonUntilHover
                ? "opacity-100 2xl:opacity-0 lg:group-hover:opacity-100 transition-all duration-300"
                : ""
            }
            ${padding}
            font-kudriashov uppercase 
            bg-brand-cream text-brand-bordo
            rounded-sm cursor-pointer leading-3 -tracking-[1px]
            ${finalMobilePos}
            ${finalDesktopPos}
          `}
        >
          {label}
        </button>
      )}
    </div>
  );
};

export default CustomSeal;
