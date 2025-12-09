type Props = {
    className?: string;
    size?: "default" | "xl" | "sm";
  };
  
  const InitialsCircle = ({ className, size = "default" }: Props) => {
    const isXL = size === "xl";
    const isSM = size === "sm";
  
    return (
      <div
        className={`
          flex flex-col items-center justify-center text-center
          rounded-full bg-brand-bordo text-white
          ${
            isXL
              ? "w-[170px] h-[170px]"
              : isSM
              ? "w-[60px] h-[60px]"
              : "w-[clamp(40px,8vw,100px)] h-[clamp(40px,8vw,100px)]"
          }
          ${className ?? ""}
        `}
      >
        <span
          className={`
            font-kudriashov uppercase
            ${
              isXL
                ? "text-[52px] leading-[52px]"
                : isSM
                ? "text-[18px] leading-5"
                : "text-[clamp(13.2px,2vw,32px)] leading-[clamp(16px,2.5vw,30px)]"
            }
          `}
        >
          ab
        </span>
  
        <span
          className={`
            font-kudriashov uppercase -translate-y-0.5 -tracking-tighter
            ${
              isXL
                ? "text-[20px] leading-5"
                : isSM
                ? "text-[7px] leading-2.5"
                : "text-[clamp(5px,1vw,13px)] leading-[clamp(4px,1.2vw,13px)]"
            }
          `}
        >
          andreyko
        </span>
      </div>
    );
  };
  
  export default InitialsCircle;