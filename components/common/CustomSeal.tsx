import Image from "next/image";
import { seal_icon } from "@/public/images/CommonImages/SealIcon";

interface CustomSealProps {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  position?: "right" | "left";
  sealSize?: string;
  smallButton?: boolean;
}

const CustomSeal = ({
  label = "",
  onClick,
  disabled = false,
  className = "",
  position = "right",
  sealSize = "",
  smallButton = false,
}: CustomSealProps) => {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <Image
        src={seal_icon.SEAL_IMAGE}
        alt="seal"
        className={`select-none pointer-events-none w-40 sm:w-[200px] md:w-60 lg:w-[216px] h-auto ${sealSize}`}
        priority
      />

      {!disabled && (
        <button
          onClick={onClick}
          className={`
            absolute top-1/2 translate-y-[10%] wrap-break-word sm:whitespace-nowrap
            ${
              smallButton
                ? "md:py-2 lg:py-4 md:px-4 lg:px-6 md:text-[clamp(6px,1vw,12px)] lg:text-[clamp(14px,1.25vw,18px)]"
                : "py-2 sm:py-3 md:py-2.5 lg:py-4 px-7 sm:px-4 md:px-6 lg:px-6 text-[clamp(14px,1.25vw,18px)]"
            }
            rounded-sm shadow-md cursor-pointer
            font-kudriashov uppercase 
            bg-brand-cream text-brand-bordo/60
            text-center leading-3 -tracking-[1px]
            ${position === "right" ? "left-1/2 ml-1" : "right-1/2"}
          `}
        >
          {label}
        </button>
      )}
    </div>
  );
};

export default CustomSeal;
