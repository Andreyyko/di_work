import Image from "next/image";
import { seal_icon } from "@/public/images/SealIcon";

interface CustomSealProps {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  position?: "right" | "left";
}

const CustomSeal = ({
  label = "",
  onClick,
  disabled = false,
  className = "",
  position = "right",
}: CustomSealProps) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
    >
      <Image
        src={seal_icon.SEAL_IMAGE}
        alt="seal"
        className="select-none pointer-events-none w-40 sm:w-[200px] md:w-60 lg:w-[216px] h-auto"
        priority
      />

      {!disabled && (
        <button
          onClick={onClick}
          className={`
            absolute top-1/2 translate-y-[10%]
            py-1.5 sm:py-2 md:py-2.5
            px-2 sm:px-4 md:px-6 lg:px-8
            rounded-sm shadow-md cursor-pointer
            font-kudriashov text-[10px] sm:text-[12px] md:text-[14px]
            bg-brand-cream text-brand-bordo/60
            text-center leading-tight
            wrap-break-word sm:whitespace-nowrap
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
