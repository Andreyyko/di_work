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
    <div className={`relative inline-flex items-center justify-center ${className}`}>

      <Image
        src={seal_icon.SEAL_IMAGE}
        alt="seal"
        className="select-none pointer-events-none"
      />

      {!disabled && (
        <button
        onClick={onClick}
        className={`
          absolute top-1/2 translate-y-[10%]
          py-2 px-10 rounded-sm shadow-md whitespace-nowrap
          font-kudriashov
          bg-brand-cream text-brand-bordo/50
          hover:bg-brand-bordo hover:text-brand-cream
          transition-all duration-300
          ${position === "right" ? "left-1/2 ml-1" : "right-1/2"}
        `}
      >
        {label}
      </button>
      
      )}
    </div>
  );
}
 export default CustomSeal