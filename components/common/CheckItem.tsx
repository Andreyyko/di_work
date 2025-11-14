import Image, { StaticImageData } from "next/image";
import { check_icon } from "@/public/images/CheckItemIcon";

type CheckItemProps = {
  items?: Array<React.ReactNode>;
  children?: React.ReactNode;
  size?: number;
  className?: string;
  icon?: StaticImageData | string;
};

const CheckItem = ({
  items,
  children,
  size = 18,
  className = "",
  icon,
}: CheckItemProps) => {
  const ICON = icon ?? check_icon.CHECK;

  if (items && items.length > 0) {
    return (
      <div className={`${className}`}>
        {items.map((item, idx) => (
          <p key={idx} className="flex items-start gap-3 leading-tight">
            <Image
              src={ICON}
              alt=""
              width={size}
              height={size}
              className="shrink-0 mt-[3px]"
            />
            {item}
          </p>
        ))}
      </div>
    );
  }

  return (
    <p className={`flex items-start gap-3 leading-tight ${className}`}>
      <Image
        src={ICON}
        alt=""
        width={size}
        height={size}
        className="shrink-0 mt-[3px]"
      />
      {children}
    </p>
  );
};

export default CheckItem;
